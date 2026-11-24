// lib/usuarios.ts
// Lecturas y utilidades de las cuentas del panel (usuarios_portal).
// Solo servidor. Las cuentas las da de alta un administrador: no hay registro.
import { randomInt } from "node:crypto";
import { headers } from "next/headers";
import type { RowDataPacket } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import pool from "@root/lib/db";
import type { UserRole } from "@root/types/auth";

export type EstadoUsuarioFiltro = "activos" | "desactivados" | "todos";

export { ROLES, rolLabel, PASSWORD_MIN, PASSWORD_MAX } from "@root/lib/usuarios-reglas";

export interface UsuarioResumen {
  id: number;
  email: string;
  /** Nombre del empleado vinculado o, si no hay, el de la cuenta. */
  nombre: string | null;
  rol: UserRole;
  empleado_id: number | null;
  numero_empleado: string | null;
  activo: boolean;
  debe_cambiar_password: boolean;
  ultimo_acceso: string | null; // ISO
  created_at: string; // ISO
}

export interface Usuario extends UsuarioResumen {
  /** Nombre propio de la cuenta (solo se usa si no hay empleado vinculado). */
  nombre_cuenta: string | null;
  password_cambiada_at: string | null;
  creado_por: string | null;
}

export interface EmpleadoSinCuenta {
  id: number;
  nombre: string;
  email: string;
  numero_empleado: string;
}

export type AccionUsuario =
  | "crear"
  | "editar"
  | "cambiar_rol"
  | "desactivar"
  | "reactivar"
  | "restablecer_password"
  | "cambiar_password";

export interface EntradaBitacoraUsuario {
  id: number;
  accion: AccionUsuario;
  detalle: string | null;
  actor: string | null;
  created_at: string;
}

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value);
}
const isoONull = (v: unknown) => (v == null ? null : iso(v));

const SELECT_USUARIO = `
  SELECT up.id, up.email, up.nombre AS nombre_cuenta, up.rol, up.empleado_id, up.activo,
         up.debe_cambiar_password, up.ultimo_acceso, up.created_at, up.password_cambiada_at,
         e.numero_empleado, c.email AS creado_por,
         COALESCE(CONCAT(e.nombre, ' ', e.apellidos), up.nombre) AS nombre
    FROM usuarios_portal up
    LEFT JOIN empleados e ON e.id = up.empleado_id
    LEFT JOIN usuarios_portal c ON c.id = up.created_by`;

function mapResumen(r: RowDataPacket): UsuarioResumen {
  return {
    id: Number(r.id),
    email: r.email,
    nombre: r.nombre ?? null,
    rol: r.rol as UserRole,
    empleado_id: r.empleado_id === null ? null : Number(r.empleado_id),
    numero_empleado: r.numero_empleado ?? null,
    activo: Boolean(r.activo),
    debe_cambiar_password: Boolean(r.debe_cambiar_password),
    ultimo_acceso: isoONull(r.ultimo_acceso),
    created_at: iso(r.created_at),
  };
}

export async function listUsuarios(filtros: {
  q?: string;
  estado?: EstadoUsuarioFiltro;
  rol?: UserRole;
}): Promise<UsuarioResumen[]> {
  const conditions: string[] = [];
  const values: string[] = [];

  const q = filtros.q?.trim();
  if (q) {
    conditions.push(
      "(up.email LIKE ? OR up.nombre LIKE ? OR CONCAT(e.nombre, ' ', e.apellidos) LIKE ? OR e.numero_empleado LIKE ?)"
    );
    const like = `%${q}%`;
    values.push(like, like, like, like);
  }
  if (filtros.estado === "activos") conditions.push("up.activo = 1");
  if (filtros.estado === "desactivados") conditions.push("up.activo = 0");
  if (filtros.rol) {
    conditions.push("up.rol = ?");
    values.push(filtros.rol);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.query<RowDataPacket[]>(
    `${SELECT_USUARIO}
     ${where}
     ORDER BY up.activo DESC,
              COALESCE(CONCAT(e.nombre, ' ', e.apellidos), up.nombre) IS NULL,
              COALESCE(CONCAT(e.nombre, ' ', e.apellidos), up.nombre),
              up.email`,
    values
  );
  return rows.map(mapResumen);
}

export async function countUsuarios(): Promise<Record<EstadoUsuarioFiltro, number>> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COALESCE(SUM(activo = 1), 0) AS activos,
            COALESCE(SUM(activo = 0), 0) AS desactivados,
            COUNT(*) AS todos
       FROM usuarios_portal`
  );
  const r = rows[0];
  return { activos: Number(r.activos), desactivados: Number(r.desactivados), todos: Number(r.todos) };
}

export async function getUsuario(id: number): Promise<Usuario | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `${SELECT_USUARIO} WHERE up.id = ?`,
    [id]
  );
  const r = rows[0];
  if (!r) return null;
  return {
    ...mapResumen(r),
    nombre_cuenta: r.nombre_cuenta ?? null,
    password_cambiada_at: isoONull(r.password_cambiada_at),
    creado_por: r.creado_por ?? null,
  };
}

/**
 * Empleados activos que todavía no tienen cuenta, para vincular en el alta.
 * `incluir` agrega al empleado ya vinculado a la cuenta que se edita.
 */
export async function listEmpleadosSinCuenta(incluir?: number | null): Promise<EmpleadoSinCuenta[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT e.id, CONCAT(e.nombre, ' ', e.apellidos) AS nombre, e.email, e.numero_empleado
       FROM empleados e
      WHERE (e.activo = 1 AND NOT EXISTS (SELECT 1 FROM usuarios_portal up WHERE up.empleado_id = e.id))
         OR e.id = ?
      ORDER BY e.nombre, e.apellidos`,
    [incluir ?? 0]
  );
  return rows.map((r) => ({
    id: Number(r.id),
    nombre: r.nombre,
    email: r.email,
    numero_empleado: r.numero_empleado,
  }));
}

export async function listBitacoraUsuario(usuarioId: number, limite = 50): Promise<EntradaBitacoraUsuario[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT b.id, b.accion, b.detalle, b.created_at, a.email AS actor
       FROM usuarios_bitacora b
       LEFT JOIN usuarios_portal a ON a.id = b.actor_id
      WHERE b.usuario_id = ?
      ORDER BY b.created_at DESC, b.id DESC
      LIMIT ?`,
    [usuarioId, limite]
  );
  return rows.map((r) => ({
    id: Number(r.id),
    accion: r.accion as AccionUsuario,
    detalle: r.detalle ?? null,
    actor: r.actor ?? null,
    created_at: iso(r.created_at),
  }));
}

export async function registrarBitacoraUsuario(
  conn: Pick<PoolConnection, "query">,
  usuarioId: number,
  actorId: number | null,
  accion: AccionUsuario,
  detalle?: string
): Promise<void> {
  let ip: string | null = null;
  try {
    const h = await headers();
    ip = (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "").trim().slice(0, 45) || null;
  } catch {
    // Fuera de una petición: se registra sin IP.
  }
  await conn.query(
    `INSERT INTO usuarios_bitacora (usuario_id, actor_id, accion, detalle, ip)
     VALUES (?, ?, ?, ?, ?)`,
    [usuarioId, actorId, accion, detalle?.slice(0, 255) ?? null, ip]
  );
}

/**
 * Cuántos administradores activos hay, bloqueando esas filas hasta el final de
 * la transacción: así dos cambios simultáneos no pueden dejar al sistema sin
 * ningún administrador.
 */
export async function contarAdminsActivos(conn: Pick<PoolConnection, "query">): Promise<number> {
  const [rows] = await conn.query<RowDataPacket[]>(
    "SELECT id FROM usuarios_portal WHERE rol = 'administrador' AND activo = 1 FOR UPDATE"
  );
  return rows.length;
}

// Sin caracteres que se confunden al dictarla o copiarla a mano (0/O, 1/l/I).
const LETRAS = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ";
const DIGITOS = "23456789";
const ALFABETO = LETRAS + DIGITOS;

/**
 * Contraseña temporal aleatoria (crypto), en tres bloques: "Hq7m-xK2p-9Tbw".
 * ~70 bits de entropía; se pide cambiarla en el primer acceso.
 */
export function generarPasswordTemporal(): string {
  const bloque = () => Array.from({ length: 4 }, () => ALFABETO[randomInt(ALFABETO.length)]).join("");
  for (;;) {
    const pwd = [bloque(), bloque(), bloque()].join("-");
    // Que siempre lleve al menos una letra y un dígito.
    if (/\d/.test(pwd) && /[a-zA-Z]/.test(pwd)) return pwd;
  }
}
