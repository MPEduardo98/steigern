// lib/clientes.ts
// Lecturas de clientes para las pantallas del panel (solo servidor).
import type { RowDataPacket } from "mysql2";
import pool from "@root/lib/db";
import type { EstatusCliente, Moneda } from "@root/lib/socios-reglas";
import { toIso } from "@root/lib/socios";

export type FiltroCliente = EstatusCliente | "todos";

export interface ClienteResumen {
  id: number;
  codigo: string;
  razon_social: string;
  nombre_comercial: string | null;
  rfc: string | null;
  ciudad: string | null;
  estado: string | null;
  dias_credito: number;
  estatus: EstatusCliente;
  contacto: string | null;
}

export interface Cliente extends Omit<ClienteResumen, "contacto"> {
  regimen_fiscal: string | null;
  uso_cfdi: string | null;
  email: string | null;
  telefono: string | null;
  pais: string;
  direccion: string | null;
  codigo_postal: string | null;
  sitio_web: string | null;
  limite_credito: number | null;
  moneda: Moneda;
  notas: string | null;
  created_at: string;
}

function mapBase(r: RowDataPacket) {
  return {
    id: Number(r.id),
    codigo: r.codigo_cliente,
    razon_social: r.razon_social,
    nombre_comercial: r.nombre_comercial ?? null,
    rfc: r.rfc ?? null,
    ciudad: r.ciudad ?? null,
    estado: r.estado ?? null,
    dias_credito: Number(r.dias_credito),
    estatus: r.estatus as EstatusCliente,
  };
}

export async function listClientes(filtros: { q?: string; estatus?: FiltroCliente }): Promise<ClienteResumen[]> {
  const conditions: string[] = [];
  const values: string[] = [];

  const q = filtros.q?.trim();
  if (q) {
    conditions.push(
      "(c.razon_social LIKE ? OR c.nombre_comercial LIKE ? OR c.rfc LIKE ? OR c.codigo_cliente LIKE ? OR c.ciudad LIKE ?)"
    );
    const like = `%${q}%`;
    values.push(like, like, like, like, like);
  }
  if (filtros.estatus && filtros.estatus !== "todos") {
    conditions.push("c.estatus = ?");
    values.push(filtros.estatus);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT c.id, c.codigo_cliente, c.razon_social, c.nombre_comercial, c.rfc,
            c.ciudad, c.estado, c.dias_credito, c.estatus,
            (SELECT k.nombre FROM contactos_cliente k
              WHERE k.cliente_id = c.id ORDER BY k.es_principal DESC, k.id LIMIT 1) AS contacto
       FROM clientes c
       ${where}
      ORDER BY c.razon_social`,
    values
  );
  return rows.map((r) => ({ ...mapBase(r), contacto: r.contacto ?? null }));
}

/** Cuántos hay en cada pestaña (sin aplicar la búsqueda). */
export async function countClientes(): Promise<Record<FiltroCliente, number>> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COALESCE(SUM(estatus = 'activo'), 0)    AS activo,
            COALESCE(SUM(estatus = 'inactivo'), 0)  AS inactivo,
            COALESCE(SUM(estatus = 'bloqueado'), 0) AS bloqueado,
            COUNT(*) AS todos
       FROM clientes`
  );
  const r = rows[0];
  return {
    activo: Number(r.activo),
    inactivo: Number(r.inactivo),
    bloqueado: Number(r.bloqueado),
    todos: Number(r.todos),
  };
}

export async function getCliente(id: number): Promise<Cliente | null> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM clientes WHERE id = ?", [id]);
  const r = rows[0];
  if (!r) return null;
  return {
    ...mapBase(r),
    regimen_fiscal: r.regimen_fiscal ?? null,
    uso_cfdi: r.uso_cfdi ?? null,
    email: r.email ?? null,
    telefono: r.telefono ?? null,
    pais: r.pais,
    direccion: r.direccion ?? null,
    codigo_postal: r.codigo_postal ?? null,
    sitio_web: r.sitio_web ?? null,
    limite_credito: r.limite_credito === null ? null : Number(r.limite_credito),
    moneda: r.moneda as Moneda,
    notas: r.notas ?? null,
    created_at: toIso(r.created_at),
  };
}
