// lib/expediente.ts
// Expediente del empleado: lecturas, almacenamiento de archivos y bitácora.
// Solo servidor. Los datos legales completos nunca salen de aquí sin pasar por
// una acción que deja registro (ver `revelarDatosLegales` en las acciones).
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { RowDataPacket } from "mysql2";
import { headers } from "next/headers";
import pool from "@root/lib/db";
import {
  DIAS_AVISO_VENCIMIENTO,
  bancoDeClabe,
  enmascarar,
  type EstadoCivil,
  type Jornada,
  type TipoContrato,
} from "@root/lib/expediente-reglas";

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface DatosLegales {
  curp: string | null;
  rfc: string | null;
  nss: string | null;
  fecha_nacimiento: string | null;
  sexo: "H" | "M" | "X" | null;
  estado_civil: EstadoCivil | null;
  nacionalidad: string | null;
  calle: string | null;
  numero_exterior: string | null;
  numero_interior: string | null;
  colonia: string | null;
  municipio: string | null;
  estado: string | null;
  codigo_postal: string | null;
  emergencia_nombre: string | null;
  emergencia_parentesco: string | null;
  emergencia_telefono: string | null;
  clabe: string | null;
  credito_infonavit: string | null;
  credito_fonacot: string | null;
}

/** Lo que la ficha muestra sin pedir permiso: identificadores enmascarados. */
export interface DatosLegalesResumen {
  capturados: boolean;
  curp: string | null;
  rfc: string | null;
  nss: string | null;
  clabe: string | null;
  banco: string | null;
  fecha_nacimiento: string | null;
  sexo: "H" | "M" | "X" | null;
  estado_civil: EstadoCivil | null;
  nacionalidad: string | null;
  /** Domicilio en una línea, sin calle ni número. */
  ubicacion: string | null;
  emergencia: string | null;
  credito_infonavit: boolean;
  credito_fonacot: boolean;
  updated_at: string | null;
}

export type EstadoVigencia = "vigente" | "por_vencer" | "vencido" | null;

export interface Documento {
  id: number;
  tipo: string;
  nombre_original: string;
  mime: string;
  tamano: number;
  fecha_vencimiento: string | null;
  vigencia: EstadoVigencia;
  notas: string | null;
  subido_por: string | null;
  created_at: string;
}

export interface Contrato {
  id: number;
  tipo: TipoContrato;
  fecha_inicio: string;
  fecha_fin: string | null;
  jornada: Jornada;
  salario_diario: number | null;
  sdi: number | null;
  documento_id: number | null;
  notas: string | null;
  vigencia: EstadoVigencia;
  created_at: string;
}

export type AccionBitacora =
  | "ver_datos"
  | "editar_datos"
  | "subir_documento"
  | "descargar_documento"
  | "quitar_documento"
  | "registrar_contrato";

export interface EntradaBitacora {
  id: number;
  accion: AccionBitacora;
  detalle: string | null;
  usuario: string | null;
  created_at: string;
}

// ── Utilidades ───────────────────────────────────────────────────────────────

function fecha(value: unknown): string | null {
  if (value == null) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function fechaHora(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

/** Hoy en México como "YYYY-MM-DD". */
function hoy(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date());
}

export function vigencia(fechaFin: string | null): EstadoVigencia {
  if (!fechaFin) return null;
  const h = hoy();
  if (fechaFin < h) return "vencido";
  const limite = new Date(`${h}T00:00:00Z`);
  limite.setUTCDate(limite.getUTCDate() + DIAS_AVISO_VENCIMIENTO);
  return fechaFin <= limite.toISOString().slice(0, 10) ? "por_vencer" : "vigente";
}

// ── Datos legales ────────────────────────────────────────────────────────────

export const COLUMNAS_LEGALES = [
  "curp", "rfc", "nss", "fecha_nacimiento", "sexo", "estado_civil", "nacionalidad",
  "calle", "numero_exterior", "numero_interior", "colonia", "municipio", "estado",
  "codigo_postal", "emergencia_nombre", "emergencia_parentesco", "emergencia_telefono",
  "clabe", "credito_infonavit", "credito_fonacot",
] as const satisfies readonly (keyof DatosLegales)[];

async function leerFilaLegal(empleadoId: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM empleados_datos_legales WHERE empleado_id = ?",
    [empleadoId]
  );
  return rows[0] ?? null;
}

/** Datos completos. Solo para acciones que ya registraron el acceso. */
export async function getDatosLegales(empleadoId: number): Promise<DatosLegales | null> {
  const r = await leerFilaLegal(empleadoId);
  if (!r) return null;
  const out = {} as Record<string, unknown>;
  for (const c of COLUMNAS_LEGALES) out[c] = c === "fecha_nacimiento" ? fecha(r[c]) : (r[c] ?? null);
  return out as unknown as DatosLegales;
}

export async function getDatosLegalesResumen(empleadoId: number): Promise<DatosLegalesResumen> {
  const r = await leerFilaLegal(empleadoId);
  if (!r) {
    return {
      capturados: false, curp: null, rfc: null, nss: null, clabe: null, banco: null,
      fecha_nacimiento: null, sexo: null, estado_civil: null, nacionalidad: null,
      ubicacion: null, emergencia: null, credito_infonavit: false, credito_fonacot: false,
      updated_at: null,
    };
  }
  const ubicacion = [r.colonia, r.municipio, r.estado, r.codigo_postal && `C.P. ${r.codigo_postal}`]
    .filter(Boolean)
    .join(", ");
  const emergencia = r.emergencia_nombre
    ? `${r.emergencia_nombre}${r.emergencia_parentesco ? ` (${r.emergencia_parentesco})` : ""}`
    : null;
  return {
    capturados: true,
    curp: enmascarar(r.curp, 4, 2),
    rfc: enmascarar(r.rfc, 4, 0),
    nss: enmascarar(r.nss, 0, 4),
    clabe: enmascarar(r.clabe, 0, 4),
    banco: bancoDeClabe(r.clabe),
    fecha_nacimiento: fecha(r.fecha_nacimiento),
    sexo: r.sexo ?? null,
    estado_civil: r.estado_civil ?? null,
    nacionalidad: r.nacionalidad ?? null,
    ubicacion: ubicacion || null,
    emergencia,
    credito_infonavit: Boolean(r.credito_infonavit),
    credito_fonacot: Boolean(r.credito_fonacot),
    updated_at: r.updated_at ? fechaHora(r.updated_at) : null,
  };
}

// ── Documentos ───────────────────────────────────────────────────────────────

export async function listDocumentos(empleadoId: number): Promise<Documento[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT d.id, d.tipo, d.nombre_original, d.mime, d.tamano, d.fecha_vencimiento,
            d.notas, d.created_at, u.email AS subido_por
       FROM empleado_documentos d
       LEFT JOIN usuarios_portal u ON u.id = d.subido_por
      WHERE d.empleado_id = ? AND d.eliminado_at IS NULL
      ORDER BY d.created_at DESC, d.id DESC`,
    [empleadoId]
  );
  return rows.map((r) => {
    const venc = fecha(r.fecha_vencimiento);
    return {
      id: Number(r.id),
      tipo: r.tipo,
      nombre_original: r.nombre_original,
      mime: r.mime,
      tamano: Number(r.tamano),
      fecha_vencimiento: venc,
      vigencia: vigencia(venc),
      notas: r.notas ?? null,
      subido_por: r.subido_por ?? null,
      created_at: fechaHora(r.created_at),
    };
  });
}

/** Para la descarga: incluye el nombre interno del archivo. */
export async function getDocumentoArchivo(empleadoId: number, documentoId: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, tipo, archivo, nombre_original, mime
       FROM empleado_documentos
      WHERE id = ? AND empleado_id = ? AND eliminado_at IS NULL`,
    [documentoId, empleadoId]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    id: Number(r.id),
    tipo: String(r.tipo),
    archivo: String(r.archivo),
    nombre_original: String(r.nombre_original),
    mime: String(r.mime),
  };
}

// ── Contratos ────────────────────────────────────────────────────────────────

export async function listContratos(empleadoId: number): Promise<Contrato[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM empleado_contratos
      WHERE empleado_id = ?
      ORDER BY fecha_inicio DESC, id DESC`,
    [empleadoId]
  );
  return rows.map((r) => {
    const fin = fecha(r.fecha_fin);
    return {
      id: Number(r.id),
      tipo: r.tipo,
      fecha_inicio: fecha(r.fecha_inicio)!,
      fecha_fin: fin,
      jornada: r.jornada,
      salario_diario: r.salario_diario == null ? null : Number(r.salario_diario),
      sdi: r.sdi == null ? null : Number(r.sdi),
      documento_id: r.documento_id == null ? null : Number(r.documento_id),
      notas: r.notas ?? null,
      vigencia: vigencia(fin),
      created_at: fechaHora(r.created_at),
    };
  });
}

// ── Bitácora ─────────────────────────────────────────────────────────────────

export async function registrarBitacora(
  empleadoId: number,
  usuarioId: string | number | undefined,
  accion: AccionBitacora,
  detalle?: string
): Promise<void> {
  let ip: string | null = null;
  try {
    const h = await headers();
    ip = (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "").trim().slice(0, 45) || null;
  } catch {
    // Fuera de una petición (no debería pasar): se registra sin IP.
  }
  await pool.query(
    `INSERT INTO expediente_bitacora (empleado_id, usuario_id, accion, detalle, ip)
     VALUES (?, ?, ?, ?, ?)`,
    [empleadoId, usuarioId ? Number(usuarioId) || null : null, accion, detalle?.slice(0, 255) ?? null, ip]
  );
}

export async function listBitacora(empleadoId: number, limite = 50): Promise<EntradaBitacora[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT b.id, b.accion, b.detalle, b.created_at, u.email AS usuario
       FROM expediente_bitacora b
       LEFT JOIN usuarios_portal u ON u.id = b.usuario_id
      WHERE b.empleado_id = ?
      ORDER BY b.created_at DESC, b.id DESC
      LIMIT ?`,
    [empleadoId, limite]
  );
  return rows.map((r) => ({
    id: Number(r.id),
    accion: r.accion,
    detalle: r.detalle ?? null,
    usuario: r.usuario ?? null,
    created_at: fechaHora(r.created_at),
  }));
}

// ── Almacenamiento de archivos ───────────────────────────────────────────────
// Carpeta privada en el disco del servidor, fuera de /public: no hay URL que
// lleve directo al archivo; solo se baja por la ruta que revisa la sesión.

function carpetaExpedientes(): string {
  return path.resolve(process.env.EXPEDIENTES_DIR || path.join(process.cwd(), "storage", "expedientes"));
}

/** Tipo real del archivo por sus primeros bytes (no se confía en la extensión). */
export function detectarTipoArchivo(bytes: Uint8Array): { mime: string; ext: string } | null {
  const empieza = (...firma: number[]) => firma.every((b, i) => bytes[i] === b);
  if (empieza(0x25, 0x50, 0x44, 0x46, 0x2d)) return { mime: "application/pdf", ext: "pdf" }; // %PDF-
  if (empieza(0xff, 0xd8, 0xff)) return { mime: "image/jpeg", ext: "jpg" };
  if (empieza(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return { mime: "image/png", ext: "png" };
  if (empieza(0x52, 0x49, 0x46, 0x46) && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50)
    return { mime: "image/webp", ext: "webp" };
  return null;
}

/** Guarda el archivo con un nombre aleatorio y devuelve ese nombre. */
export async function guardarArchivo(empleadoId: number, bytes: Uint8Array, ext: string): Promise<string> {
  const nombre = `${empleadoId}/${randomUUID()}.${ext}`;
  const destino = path.join(carpetaExpedientes(), nombre);
  await mkdir(path.dirname(destino), { recursive: true });
  await writeFile(destino, bytes, { flag: "wx" });
  return nombre;
}

export async function leerArchivo(nombre: string): Promise<Buffer> {
  const base = carpetaExpedientes();
  const ruta = path.resolve(base, nombre);
  // El nombre sale de la base de datos, pero se comprueba que no se salga de la carpeta.
  if (!ruta.startsWith(base + path.sep)) throw new Error("Ruta de archivo no válida");
  return readFile(ruta);
}
