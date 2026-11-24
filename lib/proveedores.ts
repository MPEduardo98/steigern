// lib/proveedores.ts
// Lecturas de proveedores y sus categorías para las pantallas del panel (solo servidor).
import type { RowDataPacket } from "mysql2";
import pool from "@root/lib/db";
import type { EstatusProveedor, Moneda } from "@root/lib/socios-reglas";
import { toIso } from "@root/lib/socios";

export type FiltroProveedor = EstatusProveedor | "todos";

export interface ProveedorResumen {
  id: number;
  codigo: string;
  razon_social: string;
  nombre_comercial: string | null;
  rfc: string | null;
  ciudad: string | null;
  estado: string | null;
  categoria: string | null;
  dias_credito: number;
  estatus: EstatusProveedor;
  contacto: string | null;
}

export interface Proveedor extends Omit<ProveedorResumen, "contacto"> {
  regimen_fiscal: string | null;
  email: string | null;
  telefono: string | null;
  pais: string;
  direccion: string | null;
  codigo_postal: string | null;
  sitio_web: string | null;
  categoria_id: number | null;
  moneda: Moneda;
  notas: string | null;
  created_at: string;
}

export interface CategoriaProveedor {
  id: number;
  nombre: string;
}

function mapBase(r: RowDataPacket) {
  return {
    id: Number(r.id),
    codigo: r.codigo_proveedor,
    razon_social: r.razon_social,
    nombre_comercial: r.nombre_comercial ?? null,
    rfc: r.rfc ?? null,
    ciudad: r.ciudad ?? null,
    estado: r.estado ?? null,
    categoria: r.categoria ?? null,
    dias_credito: Number(r.dias_credito),
    estatus: r.estatus as EstatusProveedor,
  };
}

export async function listProveedores(filtros: {
  q?: string;
  estatus?: FiltroProveedor;
  categoriaId?: number;
}): Promise<ProveedorResumen[]> {
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  const q = filtros.q?.trim();
  if (q) {
    conditions.push(
      "(p.razon_social LIKE ? OR p.nombre_comercial LIKE ? OR p.rfc LIKE ? OR p.codigo_proveedor LIKE ? OR p.ciudad LIKE ?)"
    );
    const like = `%${q}%`;
    values.push(like, like, like, like, like);
  }
  if (filtros.estatus && filtros.estatus !== "todos") {
    conditions.push("p.estatus = ?");
    values.push(filtros.estatus);
  }
  if (filtros.categoriaId) {
    conditions.push("p.categoria_id = ?");
    values.push(filtros.categoriaId);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT p.id, p.codigo_proveedor, p.razon_social, p.nombre_comercial, p.rfc,
            p.ciudad, p.estado, p.dias_credito, p.estatus, c.nombre AS categoria,
            (SELECT k.nombre FROM contactos_proveedor k
              WHERE k.proveedor_id = p.id ORDER BY k.es_principal DESC, k.id LIMIT 1) AS contacto
       FROM proveedores p
       LEFT JOIN categorias_proveedor c ON c.id = p.categoria_id
       ${where}
      ORDER BY p.razon_social`,
    values
  );
  return rows.map((r) => ({ ...mapBase(r), contacto: r.contacto ?? null }));
}

/** Cuántos hay en cada pestaña (sin aplicar los demás filtros). */
export async function countProveedores(): Promise<Record<FiltroProveedor, number>> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COALESCE(SUM(estatus = 'en_revision'), 0) AS en_revision,
            COALESCE(SUM(estatus = 'activo'), 0)      AS activo,
            COALESCE(SUM(estatus = 'inactivo'), 0)    AS inactivo,
            COALESCE(SUM(estatus = 'bloqueado'), 0)   AS bloqueado,
            COUNT(*) AS todos
       FROM proveedores`
  );
  const r = rows[0];
  return {
    en_revision: Number(r.en_revision),
    activo: Number(r.activo),
    inactivo: Number(r.inactivo),
    bloqueado: Number(r.bloqueado),
    todos: Number(r.todos),
  };
}

export async function getProveedor(id: number): Promise<Proveedor | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT p.*, c.nombre AS categoria
       FROM proveedores p
       LEFT JOIN categorias_proveedor c ON c.id = p.categoria_id
      WHERE p.id = ?`,
    [id]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    ...mapBase(r),
    regimen_fiscal: r.regimen_fiscal ?? null,
    email: r.email ?? null,
    telefono: r.telefono ?? null,
    pais: r.pais,
    direccion: r.direccion ?? null,
    codigo_postal: r.codigo_postal ?? null,
    sitio_web: r.sitio_web ?? null,
    categoria_id: r.categoria_id === null ? null : Number(r.categoria_id),
    moneda: r.moneda as Moneda,
    notas: r.notas ?? null,
    created_at: toIso(r.created_at),
  };
}

export async function listCategoriasProveedor(): Promise<CategoriaProveedor[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT id, nombre FROM categorias_proveedor ORDER BY nombre");
  return rows.map((r) => ({ id: Number(r.id), nombre: r.nombre }));
}
