// lib/empleados.ts
// Lecturas de empleados y departamentos para las pantallas del panel.
// Solo se usa desde el servidor (Server Components y Server Actions).
import type { RowDataPacket } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import pool from "@root/lib/db";

export type EstadoFiltro = "activos" | "bajas" | "todos";

export interface EmpleadoResumen {
  id: number;
  numero_empleado: string;
  nombre: string;
  apellidos: string;
  email: string;
  puesto: string;
  departamento: string | null;
  fecha_ingreso: string; // YYYY-MM-DD
  activo: boolean;
}

export interface Empleado extends EmpleadoResumen {
  telefono: string | null;
  departamento_id: number | null;
  salario: number | null;
}

export interface Departamento {
  id: number;
  nombre: string;
}

/** DATE de MySQL → "YYYY-MM-DD". El pool usa zona UTC, así que no se corre el día. */
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "").slice(0, 10);
}

function mapResumen(r: RowDataPacket): EmpleadoResumen {
  return {
    id: Number(r.id),
    numero_empleado: r.numero_empleado,
    nombre: r.nombre,
    apellidos: r.apellidos,
    email: r.email,
    puesto: r.puesto,
    departamento: r.departamento ?? null,
    fecha_ingreso: toDateString(r.fecha_ingreso),
    activo: Boolean(r.activo),
  };
}

export async function listEmpleados(filtros: {
  q?: string;
  estado?: EstadoFiltro;
  departamentoId?: number;
}): Promise<EmpleadoResumen[]> {
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  const q = filtros.q?.trim();
  if (q) {
    conditions.push(
      "(CONCAT(e.nombre, ' ', e.apellidos) LIKE ? OR e.numero_empleado LIKE ? OR e.email LIKE ? OR e.puesto LIKE ?)"
    );
    const like = `%${q}%`;
    values.push(like, like, like, like);
  }
  if (filtros.estado === "activos") conditions.push("e.activo = 1");
  if (filtros.estado === "bajas") conditions.push("e.activo = 0");
  if (filtros.departamentoId) {
    conditions.push("e.departamento_id = ?");
    values.push(filtros.departamentoId);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT e.id, e.numero_empleado, e.nombre, e.apellidos, e.email, e.puesto,
            e.fecha_ingreso, e.activo, d.nombre AS departamento
       FROM empleados e
       LEFT JOIN departamentos d ON d.id = e.departamento_id
       ${where}
      ORDER BY e.activo DESC, e.nombre, e.apellidos`,
    values
  );
  return rows.map(mapResumen);
}

/** Cuántos hay en cada pestaña (sin aplicar los demás filtros). */
export async function countEmpleados(): Promise<Record<EstadoFiltro, number>> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COALESCE(SUM(activo = 1), 0) AS activos,
            COALESCE(SUM(activo = 0), 0) AS bajas,
            COUNT(*) AS todos
       FROM empleados`
  );
  const r = rows[0];
  return { activos: Number(r.activos), bajas: Number(r.bajas), todos: Number(r.todos) };
}

export async function getEmpleado(id: number): Promise<Empleado | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT e.*, d.nombre AS departamento
       FROM empleados e
       LEFT JOIN departamentos d ON d.id = e.departamento_id
      WHERE e.id = ?`,
    [id]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    ...mapResumen(r),
    telefono: r.telefono ?? null,
    departamento_id: r.departamento_id === null ? null : Number(r.departamento_id),
    salario: r.salario === null ? null : Number(r.salario),
  };
}

export async function listDepartamentos(): Promise<Departamento[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, nombre FROM departamentos ORDER BY nombre"
  );
  return rows.map((r) => ({ id: Number(r.id), nombre: r.nombre }));
}

/**
 * Siguiente número de empleado (EMP-0001, EMP-0002…). Lo asigna el sistema al
 * dar de alta; nunca lo escribe el usuario. Se llama dentro de la transacción
 * del alta: FOR UPDATE bloquea la lectura para que dos altas simultáneas no
 * tomen el mismo número (y el índice único lo garantiza de todos modos).
 */
export async function nextNumeroEmpleado(conn: Pick<PoolConnection, "query">): Promise<string> {
  const [rows] = await conn.query<RowDataPacket[]>(
    `SELECT MAX(CAST(SUBSTRING(numero_empleado, 5) AS UNSIGNED)) AS ultimo
       FROM empleados
      WHERE numero_empleado REGEXP '^EMP-[0-9]+$'
        FOR UPDATE`
  );
  const siguiente = Number(rows[0]?.ultimo ?? 0) + 1;
  return `EMP-${String(siguiente).padStart(4, "0")}`;
}
