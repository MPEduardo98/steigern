// lib/session.ts
// Sesión del panel validada contra la base de datos.
//
// La sesión es un JWT que dura 8 h: por sí solo seguiría sirviendo aunque el
// administrador desactive la cuenta, le cambie el rol o le restablezca la
// contraseña. Por eso cada verificación del servidor lee la cuenta en
// usuarios_portal y compara `sesion_version`; si la cuenta ya no está activa o
// la versión cambió, la sesión se da por cerrada. El rol y el nombre también se
// toman de la base, no del token, para que un cambio aplique en el acto.
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import type { RowDataPacket } from "mysql2";
import { auth } from "@root/auth";
import pool from "@root/lib/db";
import type { UserRole } from "@root/auth";

export interface CurrentUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  empleadoId: number | null;
  /** La contraseña es temporal: hay que cambiarla antes de usar el panel. */
  mustChangePassword: boolean;
}

type Estado =
  | { status: "sin_sesion" }
  /** Hay token pero la cuenta se desactivó o su sesión fue revocada. */
  | { status: "revocada" }
  | { status: "ok"; user: CurrentUser };

/** Una sola lectura por petición, aunque layout, página y acción la pidan. */
const resolver = cache(async (): Promise<Estado> => {
  const session = await auth();
  const id = Number(session?.user?.id);
  if (!session?.user || !Number.isInteger(id) || id <= 0) return { status: "sin_sesion" };

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT up.id, up.email, up.rol, up.empleado_id, up.activo, up.sesion_version,
              up.debe_cambiar_password,
              COALESCE(CONCAT(e.nombre, ' ', e.apellidos), up.nombre) AS name
         FROM usuarios_portal up
         LEFT JOIN empleados e ON e.id = up.empleado_id
        WHERE up.id = ?`,
      [id]
    );
    const r = rows[0];
    if (!r || !r.activo || Number(r.sesion_version) !== session.user.sesionVersion) {
      return { status: "revocada" };
    }
    return {
      status: "ok",
      user: {
        id,
        email: r.email,
        name: r.name || r.email,
        role: r.rol as UserRole,
        empleadoId: r.empleado_id === null ? null : Number(r.empleado_id),
        mustChangePassword: Boolean(r.debe_cambiar_password),
      },
    };
  } catch (err) {
    // Sin base de datos el panel no funciona de todos modos; se usa el token
    // para poder mostrar el aviso de conexión en vez de una página rota.
    console.error("[session] No se pudo validar la cuenta", err);
    return {
      status: "ok",
      user: {
        id,
        email: session.user.email ?? "",
        name: session.user.name ?? session.user.email ?? "Usuario",
        role: session.user.role,
        empleadoId: session.user.empleadoId ?? null,
        mustChangePassword: false,
      },
    };
  }
});

/** Ruta que borra la cookie de una sesión revocada (ver app/admin/salir/route.ts). */
export const RUTA_SESION_REVOCADA = "/admin/salir";
/** Con contraseña temporal se manda al login: ahí se pide la nueva. */
export const RUTA_CAMBIO_OBLIGATORIO = "/login";

/**
 * Para páginas y layouts del panel. Sin sesión manda al login; con la sesión
 * revocada la cierra; con contraseña temporal manda al login a cambiarla.
 */
export async function requireSession(allowedRoles?: UserRole[]): Promise<{ user: CurrentUser }> {
  const estado = await resolver();
  if (estado.status === "sin_sesion") redirect("/login");
  if (estado.status === "revocada") redirect(RUTA_SESION_REVOCADA);

  const { user } = estado;
  if (user.mustChangePassword) redirect(RUTA_CAMBIO_OBLIGATORIO);
  if (allowedRoles && !allowedRoles.includes(user.role)) redirect("/login");
  return { user };
}

/**
 * Para páginas del panel solo para administradores: sin sesión manda al login;
 * un empleado con sesión recibe 404 (no se le revela que la página existe).
 */
export async function requireAdminPage() {
  const session = await requireSession(["administrador", "empleado"]);
  if (session.user.role !== "administrador") notFound();
  return session;
}

/**
 * Para Server Actions y Route Handlers: devuelve el usuario solo si la sesión
 * sigue vigente, ya cambió su contraseña temporal y tiene uno de los roles.
 */
export async function getActionUser(allowedRoles?: UserRole[]): Promise<CurrentUser | null> {
  const estado = await resolver();
  if (estado.status !== "ok" || estado.user.mustChangePassword) return null;
  if (allowedRoles && !allowedRoles.includes(estado.user.role)) return null;
  return estado.user;
}

/** Estado crudo de la sesión, sin redirigir. */
export async function getSessionState() {
  return resolver();
}
