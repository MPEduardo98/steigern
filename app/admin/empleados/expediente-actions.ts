// app/admin/empleados/expediente-actions.ts
// Acciones del expediente: datos legales, documentos y contratos.
// Todas revisan que quien llama sea administrador y dejan registro en la bitácora.
"use server";

import { revalidatePath } from "next/cache";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import { getActionUser } from "@root/lib/session";
import pool from "@root/lib/db";
import {
  COLUMNAS_LEGALES,
  detectarTipoArchivo,
  getDatosLegales,
  guardarArchivo,
  registrarBitacora,
  type DatosLegales,
} from "@root/lib/expediente";
import {
  ESTADOS_CIVILES,
  JORNADAS,
  MAX_DOCUMENTO_BYTES,
  TIPOS_CONTRATO,
  datosDeCurp,
  tipoDocumento,
  validarClabe,
  validarCurp,
  validarNss,
  validarRfc,
} from "@root/lib/expediente-reglas";

export interface ExpedienteFormState {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
  /** Cambia en cada envío correcto, para que el cliente reaccione una sola vez. */
  stamp?: number;
}

async function adminSession() {
  const user = await getActionUser(["administrador"]);
  return user ? { user } : null;
}

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

function idValido(v: unknown): number | null {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function rutaFicha(empleadoId: number) {
  return `/admin/empleados/${empleadoId}`;
}

function erroresDe(issues: z.core.$ZodIssue[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) fieldErrors[String(issue.path[0])] ??= issue.message;
  return fieldErrors;
}

const fechaOpcional = z.string().refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Fecha no válida");
const textoOpcional = (max: number) => z.string().trim().max(max, `Máximo ${max} caracteres`);

// ── Datos legales ────────────────────────────────────────────────────────────

/** Devuelve los datos completos (sin enmascarar) y deja registro de quién los vio. */
export async function revelarDatosLegales(
  empleadoIdRaw: number
): Promise<{ ok: true; datos: DatosLegales | null } | { ok: false; error: string }> {
  const session = await adminSession();
  if (!session) return { ok: false, error: "No tienes permisos para esta acción." };
  const empleadoId = idValido(empleadoIdRaw);
  if (!empleadoId) return { ok: false, error: "Empleado no válido." };

  try {
    const datos = await getDatosLegales(empleadoId);
    if (datos) await registrarBitacora(empleadoId, session.user.id, "ver_datos");
    return { ok: true, datos };
  } catch (err) {
    console.error("[revelarDatosLegales]", err);
    return { ok: false, error: "No se pudieron cargar los datos. Intenta de nuevo." };
  }
}

/** Mayúsculas y sin espacios: así se escriben CURP, RFC, NSS y CLABE. */
const identificador = z.string().transform((v) => v.replace(/[\s-]/g, "").toUpperCase());
/** Identificador opcional que, si viene, pasa por su validador (formato + dígito verificador). */
const conValidador = (validar: (v: string) => string | null) =>
  identificador.superRefine((v, ctx) => {
    const mensaje = v ? validar(v) : null;
    if (mensaje) ctx.addIssue({ code: "custom", message: mensaje });
  });

const legalSchema = z
  .object({
    curp: conValidador(validarCurp),
    rfc: conValidador(validarRfc),
    nss: conValidador(validarNss),
    clabe: conValidador(validarClabe),
    estado_civil: z.enum(["", ...ESTADOS_CIVILES.map((e) => e.value)], "Estado civil no válido"),
    nacionalidad: textoOpcional(60),
    calle: textoOpcional(160),
    numero_exterior: textoOpcional(20),
    numero_interior: textoOpcional(20),
    colonia: textoOpcional(120),
    municipio: textoOpcional(120),
    estado: textoOpcional(80),
    codigo_postal: z.string().trim().regex(/^(\d{5})?$/, "El código postal tiene 5 dígitos"),
    emergencia_nombre: textoOpcional(160),
    emergencia_parentesco: textoOpcional(60),
    emergencia_telefono: textoOpcional(40),
    credito_infonavit: textoOpcional(20),
    credito_fonacot: textoOpcional(20),
  })
  .superRefine((d, ctx) => {
    // Los 10 primeros caracteres del RFC son los mismos que los de la CURP.
    if (d.curp.length === 18 && d.rfc.length === 13 && d.curp.slice(0, 10) !== d.rfc.slice(0, 10)) {
      ctx.addIssue({ code: "custom", path: ["rfc"], message: "El RFC no corresponde a la CURP (los primeros 10 caracteres deben coincidir)" });
    }
  });

const CAMPOS_FORM_LEGAL = [
  "curp", "rfc", "nss", "clabe", "estado_civil", "nacionalidad", "calle", "numero_exterior",
  "numero_interior", "colonia", "municipio", "estado", "codigo_postal", "emergencia_nombre",
  "emergencia_parentesco", "emergencia_telefono", "credito_infonavit", "credito_fonacot",
] as const;

const NOMBRES_CAMPO: Partial<Record<keyof DatosLegales, string>> = {
  curp: "CURP", rfc: "RFC", nss: "NSS", clabe: "CLABE", estado_civil: "estado civil",
  nacionalidad: "nacionalidad", codigo_postal: "domicilio", calle: "domicilio",
  numero_exterior: "domicilio", numero_interior: "domicilio", colonia: "domicilio",
  municipio: "domicilio", estado: "domicilio", emergencia_nombre: "contacto de emergencia",
  emergencia_parentesco: "contacto de emergencia", emergencia_telefono: "contacto de emergencia",
  credito_infonavit: "Infonavit", credito_fonacot: "Fonacot",
};

export async function guardarDatosLegales(
  _prev: ExpedienteFormState,
  formData: FormData
): Promise<ExpedienteFormState> {
  const session = await adminSession();
  if (!session) return { error: "No tienes permisos para esta acción." };
  const empleadoId = idValido(str(formData, "empleado_id"));
  if (!empleadoId) return { error: "Empleado no válido." };

  const values = Object.fromEntries(CAMPOS_FORM_LEGAL.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const parsed = legalSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Revisa los campos marcados.", fieldErrors: erroresDe(parsed.error.issues), values };
  }
  const d = parsed.data;
  const deCurp = d.curp ? datosDeCurp(d.curp) : null;

  const fila: Record<keyof DatosLegales, string | null> = {
    curp: d.curp || null,
    rfc: d.rfc || null,
    nss: d.nss || null,
    fecha_nacimiento: deCurp?.fechaNacimiento ?? null,
    sexo: deCurp?.sexo ?? null,
    estado_civil: d.estado_civil || null,
    nacionalidad: d.nacionalidad || null,
    calle: d.calle || null,
    numero_exterior: d.numero_exterior || null,
    numero_interior: d.numero_interior || null,
    colonia: d.colonia || null,
    municipio: d.municipio || null,
    estado: d.estado || null,
    codigo_postal: d.codigo_postal || null,
    emergencia_nombre: d.emergencia_nombre || null,
    emergencia_parentesco: d.emergencia_parentesco || null,
    emergencia_telefono: d.emergencia_telefono || null,
    clabe: d.clabe || null,
    credito_infonavit: d.credito_infonavit || null,
    credito_fonacot: d.credito_fonacot || null,
  };

  try {
    const antes = await getDatosLegales(empleadoId);
    const cols = COLUMNAS_LEGALES;
    await pool.query(
      `INSERT INTO empleados_datos_legales (empleado_id, ${cols.join(", ")}, updated_by)
       VALUES (?, ${cols.map(() => "?").join(", ")}, ?)
       ON DUPLICATE KEY UPDATE ${cols.map((c) => `${c} = VALUES(${c})`).join(", ")}, updated_by = VALUES(updated_by)`,
      [empleadoId, ...cols.map((c) => fila[c]), Number(session.user.id) || null]
    );

    // En la bitácora va qué cambió, nunca los valores.
    const cambiados = new Set<string>();
    for (const c of cols) {
      if ((antes?.[c] ?? null) !== fila[c] && NOMBRES_CAMPO[c]) cambiados.add(NOMBRES_CAMPO[c]!);
    }
    await registrarBitacora(
      empleadoId,
      session.user.id,
      "editar_datos",
      cambiados.size ? `Cambió: ${[...cambiados].join(", ")}` : "Sin cambios"
    );

    revalidatePath(rutaFicha(empleadoId));
    return { ok: true, stamp: Date.now() };
  } catch (err) {
    const e = err as { code?: string; sqlMessage?: string };
    if (e.code === "ER_DUP_ENTRY") {
      const campo = ["curp", "rfc", "nss"].find((c) => e.sqlMessage?.includes(`uq_datos_legales_${c}`));
      if (campo) {
        return {
          error: "Ese dato ya está registrado en otro empleado.",
          fieldErrors: { [campo]: `Este ${campo.toUpperCase()} ya pertenece a otro empleado` },
          values,
        };
      }
    }
    if (e.code === "ER_NO_REFERENCED_ROW_2") return { error: "Este empleado ya no existe.", values };
    console.error("[guardarDatosLegales]", err);
    return { error: "No se pudo guardar. Intenta de nuevo.", values };
  }
}

// ── Documentos ───────────────────────────────────────────────────────────────

export async function subirDocumento(
  _prev: ExpedienteFormState,
  formData: FormData
): Promise<ExpedienteFormState> {
  const session = await adminSession();
  if (!session) return { error: "No tienes permisos para esta acción." };
  const empleadoId = idValido(str(formData, "empleado_id"));
  if (!empleadoId) return { error: "Empleado no válido." };

  const values = {
    tipo: str(formData, "tipo"),
    fecha_vencimiento: str(formData, "fecha_vencimiento"),
    notas: str(formData, "notas"),
  };
  const fieldErrors: Record<string, string> = {};
  const tipo = tipoDocumento(values.tipo);
  if (!tipo) fieldErrors.tipo = "Elige el tipo de documento";
  if (!fechaOpcional.safeParse(values.fecha_vencimiento).success) fieldErrors.fecha_vencimiento = "Fecha no válida";
  const notas = values.notas.trim();
  if (notas.length > 300) fieldErrors.notas = "Máximo 300 caracteres";

  const archivo = formData.get("archivo");
  let bytes: Uint8Array | null = null;
  let detectado: ReturnType<typeof detectarTipoArchivo> = null;
  if (!(archivo instanceof File) || archivo.size === 0) {
    fieldErrors.archivo = "Elige un archivo";
  } else if (archivo.size > MAX_DOCUMENTO_BYTES) {
    fieldErrors.archivo = "El archivo pesa más de 10 MB";
  } else {
    bytes = new Uint8Array(await archivo.arrayBuffer());
    detectado = detectarTipoArchivo(bytes);
    if (!detectado) fieldErrors.archivo = "Solo se aceptan PDF, JPG, PNG o WEBP";
  }
  if (Object.keys(fieldErrors).length) return { error: "Revisa los campos marcados.", fieldErrors, values };

  try {
    const [existe] = await pool.query<RowDataPacket[]>("SELECT id FROM empleados WHERE id = ?", [empleadoId]);
    if (!existe.length) return { error: "Este empleado ya no existe.", values };

    const nombreOriginal = (archivo as File).name.replace(/[\r\n"\\/]/g, "_").slice(0, 255) || `documento.${detectado!.ext}`;
    const nombreInterno = await guardarArchivo(empleadoId, bytes!, detectado!.ext);
    await pool.query(
      `INSERT INTO empleado_documentos
         (empleado_id, tipo, archivo, nombre_original, mime, tamano, fecha_vencimiento, notas, subido_por)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        empleadoId, tipo!.value, nombreInterno, nombreOriginal, detectado!.mime, bytes!.byteLength,
        values.fecha_vencimiento || null, notas || null, Number(session.user.id) || null,
      ]
    );
    await registrarBitacora(empleadoId, session.user.id, "subir_documento", `${tipo!.label}: ${nombreOriginal}`);
    revalidatePath(rutaFicha(empleadoId));
    return { ok: true, stamp: Date.now() };
  } catch (err) {
    console.error("[subirDocumento]", err);
    return { error: "No se pudo subir el documento. Intenta de nuevo.", values };
  }
}

/** Lo quita del expediente. El archivo y el registro se conservan (no se borra nada). */
export async function quitarDocumento(
  empleadoIdRaw: number,
  documentoIdRaw: number
): Promise<{ ok: boolean; error?: string }> {
  const session = await adminSession();
  if (!session) return { ok: false, error: "No tienes permisos para esta acción." };
  const empleadoId = idValido(empleadoIdRaw);
  const documentoId = idValido(documentoIdRaw);
  if (!empleadoId || !documentoId) return { ok: false, error: "Documento no válido." };

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT tipo, nombre_original FROM empleado_documentos WHERE id = ? AND empleado_id = ? AND eliminado_at IS NULL",
      [documentoId, empleadoId]
    );
    if (!rows[0]) return { ok: false, error: "Este documento ya no está en el expediente." };

    await pool.query<ResultSetHeader>(
      "UPDATE empleado_documentos SET eliminado_at = NOW(), eliminado_por = ? WHERE id = ?",
      [Number(session.user.id) || null, documentoId]
    );
    const label = tipoDocumento(rows[0].tipo)?.label ?? rows[0].tipo;
    await registrarBitacora(empleadoId, session.user.id, "quitar_documento", `${label}: ${rows[0].nombre_original}`);
    revalidatePath(rutaFicha(empleadoId));
    return { ok: true };
  } catch (err) {
    console.error("[quitarDocumento]", err);
    return { ok: false, error: "No se pudo quitar el documento. Intenta de nuevo." };
  }
}

// ── Contratos ────────────────────────────────────────────────────────────────

const monto = z
  .string()
  .trim()
  .refine((v) => v === "" || (/^\d+(\.\d{1,2})?$/.test(v) && Number(v) < 1e8), "Monto no válido");

/** Tipos que necesitan fecha de término (la obra determinada puede no tenerla). */
const REQUIEREN_FIN = new Set(["determinado", "prueba", "capacitacion"]);

const contratoSchema = z
  .object({
    tipo: z.enum(TIPOS_CONTRATO.map((t) => t.value), "Elige el tipo de contrato"),
    fecha_inicio: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha no válida"),
    fecha_fin: fechaOpcional,
    jornada: z.enum(JORNADAS.map((j) => j.value), "Elige la jornada"),
    salario_diario: monto,
    sdi: monto,
    documento_id: z.string().regex(/^\d*$/, "Documento no válido"),
    notas: textoOpcional(300),
  })
  .superRefine((d, ctx) => {
    if (REQUIEREN_FIN.has(d.tipo) && !d.fecha_fin) {
      ctx.addIssue({ code: "custom", path: ["fecha_fin"], message: "Este tipo de contrato necesita fecha de término" });
    }
    if (d.tipo === "indeterminado" && d.fecha_fin) {
      ctx.addIssue({ code: "custom", path: ["fecha_fin"], message: "Un contrato indeterminado no lleva fecha de término" });
    }
    if (d.fecha_fin && d.fecha_fin < d.fecha_inicio) {
      ctx.addIssue({ code: "custom", path: ["fecha_fin"], message: "Debe ser posterior a la fecha de inicio" });
    }
    if (d.salario_diario && d.sdi && Number(d.sdi) < Number(d.salario_diario)) {
      ctx.addIssue({ code: "custom", path: ["sdi"], message: "El SDI no puede ser menor que el salario diario" });
    }
  });

export async function registrarContrato(
  _prev: ExpedienteFormState,
  formData: FormData
): Promise<ExpedienteFormState> {
  const session = await adminSession();
  if (!session) return { error: "No tienes permisos para esta acción." };
  const empleadoId = idValido(str(formData, "empleado_id"));
  if (!empleadoId) return { error: "Empleado no válido." };

  const keys = ["tipo", "fecha_inicio", "fecha_fin", "jornada", "salario_diario", "sdi", "documento_id", "notas"] as const;
  const values = Object.fromEntries(keys.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const parsed = contratoSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Revisa los campos marcados.", fieldErrors: erroresDe(parsed.error.issues), values };
  }
  const d = parsed.data;

  try {
    const documentoId = d.documento_id ? Number(d.documento_id) : null;
    if (documentoId) {
      const [doc] = await pool.query<RowDataPacket[]>(
        "SELECT id FROM empleado_documentos WHERE id = ? AND empleado_id = ? AND eliminado_at IS NULL",
        [documentoId, empleadoId]
      );
      if (!doc.length) {
        return { error: "Revisa los campos marcados.", fieldErrors: { documento_id: "Ese documento ya no está en el expediente" }, values };
      }
    }

    await pool.query(
      `INSERT INTO empleado_contratos
         (empleado_id, tipo, fecha_inicio, fecha_fin, jornada, salario_diario, sdi, documento_id, notas, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        empleadoId, d.tipo, d.fecha_inicio, d.fecha_fin || null, d.jornada,
        d.salario_diario || null, d.sdi || null, documentoId, d.notas || null, Number(session.user.id) || null,
      ]
    );
    const label = TIPOS_CONTRATO.find((t) => t.value === d.tipo)!.label;
    await registrarBitacora(empleadoId, session.user.id, "registrar_contrato", `${label} desde ${d.fecha_inicio}`);
    revalidatePath(rutaFicha(empleadoId));
    return { ok: true, stamp: Date.now() };
  } catch (err) {
    if ((err as { code?: string }).code === "ER_NO_REFERENCED_ROW_2") return { error: "Este empleado ya no existe.", values };
    console.error("[registrarContrato]", err);
    return { error: "No se pudo registrar el contrato. Intenta de nuevo.", values };
  }
}
