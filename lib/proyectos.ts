// lib/proyectos.ts
// Lecturas de proyectos para las pantallas del panel (solo servidor).
import type { RowDataPacket } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import pool from "@root/lib/db";
import type { EstadoProyecto } from "@root/lib/proyectos-reglas";
import type { Moneda } from "@root/lib/socios-reglas";
import { toIso } from "@root/lib/socios";

/** Pestañas de la lista. "abiertos" = cotización, aprobado y en proceso. */
export type FiltroProyecto = "abiertos" | "terminado" | "cancelado" | "todos";

export interface ProyectoResumen {
  id: number;
  codigo: string;
  nombre: string;
  cliente_id: number;
  cliente: string;
  responsable_id: number | null;
  responsable: string | null;
  estado: EstadoProyecto;
  monto_cotizado: number | null;
  moneda: Moneda;
  fecha_entrega: string | null;
}

export interface Proyecto extends ProyectoResumen {
  descripcion: string | null;
  anticipo: number | null;
  fecha_cotizacion: string;
  fecha_inicio: string | null;
  fecha_cierre: string | null;
  notas: string | null;
  created_at: string;
}

export interface Opcion {
  id: number;
  nombre: string;
  codigo: string;
}

const SELECT = `
  SELECT p.*,
         COALESCE(c.nombre_comercial, c.razon_social) AS cliente,
         CONCAT(e.nombre, ' ', e.apellidos) AS responsable
    FROM proyectos p
    JOIN clientes c ON c.id = p.cliente_id
    LEFT JOIN empleados e ON e.id = p.responsable_id`;

/** DATE → "YYYY-MM-DD" (el pool usa UTC, así que no se corre el día). */
function fecha(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));

function mapResumen(r: RowDataPacket): ProyectoResumen {
  return {
    id: Number(r.id),
    codigo: r.codigo_proyecto,
    nombre: r.nombre,
    cliente_id: Number(r.cliente_id),
    cliente: r.cliente,
    responsable_id: num(r.responsable_id),
    responsable: r.responsable ?? null,
    estado: r.estado as EstadoProyecto,
    monto_cotizado: num(r.monto_cotizado),
    moneda: r.moneda as Moneda,
    fecha_entrega: fecha(r.fecha_entrega),
  };
}

export async function listProyectos(filtros: {
  q?: string;
  filtro?: FiltroProyecto;
  clienteId?: number;
}): Promise<ProyectoResumen[]> {
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  const q = filtros.q?.trim();
  if (q) {
    for (const palabra of q.split(/\s+/).slice(0, 6)) {
      conditions.push(
        "(p.nombre LIKE ? OR p.codigo_proyecto LIKE ? OR c.razon_social LIKE ? OR c.nombre_comercial LIKE ?)"
      );
      const like = `%${palabra}%`;
      values.push(like, like, like, like);
    }
  }
  if (filtros.filtro === "abiertos") {
    conditions.push("p.estado IN ('cotizacion','aprobado','en_proceso')");
  } else if (filtros.filtro && filtros.filtro !== "todos") {
    conditions.push("p.estado = ?");
    values.push(filtros.filtro);
  }
  if (filtros.clienteId) {
    conditions.push("p.cliente_id = ?");
    values.push(filtros.clienteId);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  // Los más recientes primero; el código crece con cada alta.
  const [rows] = await pool.query<RowDataPacket[]>(`${SELECT} ${where} ORDER BY p.id DESC`, values);
  return rows.map(mapResumen);
}

export async function countProyectos(): Promise<Record<FiltroProyecto, number>> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COALESCE(SUM(estado IN ('cotizacion','aprobado','en_proceso')), 0) AS abiertos,
            COALESCE(SUM(estado = 'terminado'), 0) AS terminado,
            COALESCE(SUM(estado = 'cancelado'), 0) AS cancelado,
            COUNT(*) AS todos
       FROM proyectos`
  );
  const r = rows[0];
  return {
    abiertos: Number(r.abiertos),
    terminado: Number(r.terminado),
    cancelado: Number(r.cancelado),
    todos: Number(r.todos),
  };
}

export async function getProyecto(id: number): Promise<Proyecto | null> {
  const [rows] = await pool.query<RowDataPacket[]>(`${SELECT} WHERE p.id = ?`, [id]);
  const r = rows[0];
  if (!r) return null;
  return {
    ...mapResumen(r),
    descripcion: r.descripcion ?? null,
    anticipo: num(r.anticipo),
    fecha_cotizacion: fecha(r.fecha_cotizacion) ?? "",
    fecha_inicio: fecha(r.fecha_inicio),
    fecha_cierre: fecha(r.fecha_cierre),
    notas: r.notas ?? null,
    created_at: toIso(r.created_at),
  };
}

/** Clientes a los que se les puede abrir un proyecto (activos), más el que ya tenga. */
export async function listClientesParaProyecto(incluirId?: number | null): Promise<Opcion[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, codigo_cliente, COALESCE(nombre_comercial, razon_social) AS nombre
       FROM clientes
      WHERE estatus = 'activo' OR id = ?
      ORDER BY nombre`,
    [incluirId ?? 0]
  );
  return rows.map((r) => ({ id: Number(r.id), nombre: r.nombre, codigo: r.codigo_cliente }));
}

/** Clientes que ya tienen proyectos, para el filtro de la lista. */
export async function listClientesConProyectos(): Promise<Opcion[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT DISTINCT c.id, c.codigo_cliente, COALESCE(c.nombre_comercial, c.razon_social) AS nombre
       FROM clientes c
       JOIN proyectos p ON p.cliente_id = c.id
      ORDER BY nombre`
  );
  return rows.map((r) => ({ id: Number(r.id), nombre: r.nombre, codigo: r.codigo_cliente }));
}

/** Empleados activos que pueden ser responsables, más el que ya lo sea. */
export async function listResponsables(incluirId?: number | null): Promise<Opcion[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, numero_empleado, CONCAT(nombre, ' ', apellidos) AS nombre
       FROM empleados
      WHERE activo = 1 OR id = ?
      ORDER BY nombre`,
    [incluirId ?? 0]
  );
  return rows.map((r) => ({ id: Number(r.id), nombre: r.nombre, codigo: r.numero_empleado }));
}

/** Estatus actual del cliente, para no abrir proyectos a uno inactivo o bloqueado. */
export async function estatusCliente(conn: Pick<PoolConnection, "query">, id: number): Promise<string | null> {
  const [rows] = await conn.query<RowDataPacket[]>("SELECT estatus FROM clientes WHERE id = ?", [id]);
  return rows[0] ? String(rows[0].estatus) : null;
}

/** Siguiente código PRY-0001. FOR UPDATE evita que dos altas tomen el mismo. */
export async function siguienteCodigoProyecto(conn: Pick<PoolConnection, "query">): Promise<string> {
  const [rows] = await conn.query<RowDataPacket[]>(
    `SELECT MAX(CAST(SUBSTRING(codigo_proyecto, 5) AS UNSIGNED)) AS ultimo
       FROM proyectos
      WHERE codigo_proyecto REGEXP '^PRY-[0-9]+$'
        FOR UPDATE`
  );
  const siguiente = Number(rows[0]?.ultimo ?? 0) + 1;
  return `PRY-${String(siguiente).padStart(4, "0")}`;
}
