// app/admin/usuarios/actions.ts
// Alta, edición, desactivación y restablecimiento de contraseña de las cuentas
// del panel. Solo administradores. Reglas que protegen al sistema:
//   - Nadie se desactiva, se quita el rol ni se restablece la contraseña a sí mismo.
//   - Siempre queda al menos un administrador activo.
//   - Desactivar o restablecer la contraseña cierra las sesiones abiertas de esa cuenta.
"use server";

import { revalidatePath } from "next/cache";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { hash } from "bcryptjs";
import { z } from "zod";
import pool from "@root/lib/db";
import { getActionUser } from "@root/lib/session";
import {
  contarAdminsActivos,
  generarPasswordTemporal,
  registrarBitacoraUsuario,
  rolLabel,
} from "@root/lib/usuarios";
import type { UserRole } from "@root/types/auth";

const BCRYPT_ROUNDS = 12;
const SIN_PERMISOS = "No tienes permisos para esta acción.";

export interface UsuarioFormState {
  ok?: boolean;
  id?: number;
  /** Contraseña temporal del alta. Se muestra una sola vez. */
  password?: string;
  email?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
}

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

function idValido(v: unknown): number | null {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function revalidar(id?: number) {
  revalidatePath("/admin/usuarios");
  if (id) revalidatePath(`/admin/usuarios/${id}`);
}

const schema = z
  .object({
    email: z.string().trim().toLowerCase().max(190, "Máximo 190 caracteres").pipe(z.email("Correo no válido")),
    nombre: z.string().trim().max(160, "Máximo 160 caracteres"),
    rol: z.enum(["administrador", "empleado"], "Elige un rol"),
    empleado: z.string().regex(/^\d*$/, "Empleado no válido"),
  })
  .superRefine((d, ctx) => {
    // Sin empleado vinculado, la cuenta necesita su propio nombre.
    if (!d.empleado && !d.nombre) {
      ctx.addIssue({ code: "custom", path: ["nombre"], message: "Escribe el nombre o vincula un empleado" });
    }
  });

/** Crea la cuenta, o la actualiza si el formulario trae `id`. */
export async function saveUsuario(_prev: UsuarioFormState, formData: FormData): Promise<UsuarioFormState> {
  const actor = await getActionUser(["administrador"]);
  if (!actor) return { error: SIN_PERMISOS };

  const keys = ["email", "nombre", "rol", "empleado"] as const;
  const values = Object.fromEntries(keys.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const id = idValido(str(formData, "id"));

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return { error: "Revisa los campos marcados.", fieldErrors, values };
  }
  const d = parsed.data;
  const empleadoId = d.empleado ? Number(d.empleado) : null;
  // Con empleado vinculado el nombre sale de su ficha.
  const nombre = empleadoId ? null : d.nombre.replace(/\s+/g, " ");

  if (id === actor.id && d.rol !== actor.role) {
    return {
      error: "No puedes cambiar tu propio rol.",
      fieldErrors: { rol: "Pídeselo a otro administrador" },
      values,
    };
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    if (empleadoId) {
      const [emp] = await conn.query<RowDataPacket[]>("SELECT activo FROM empleados WHERE id = ?", [empleadoId]);
      if (!emp[0]) {
        await conn.rollback();
        return { error: "El empleado elegido ya no existe.", fieldErrors: { empleado: "Elige otro" }, values };
      }
    }

    if (id) {
      const [prevRows] = await conn.query<RowDataPacket[]>(
        `SELECT up.email, up.nombre, up.rol, up.empleado_id, up.activo
           FROM usuarios_portal up WHERE up.id = ? FOR UPDATE`,
        [id]
      );
      const prev = prevRows[0];
      if (!prev) {
        await conn.rollback();
        return { error: "Esta cuenta ya no existe.", values };
      }

      // Quitarle el rol al último administrador activo dejaría el panel sin dueño.
      if (prev.rol === "administrador" && d.rol !== "administrador" && prev.activo) {
        if ((await contarAdminsActivos(conn)) <= 1) {
          await conn.rollback();
          return {
            error: "Es el único administrador activo.",
            fieldErrors: { rol: "Primero nombra a otro administrador" },
            values,
          };
        }
      }

      await conn.query(
        "UPDATE usuarios_portal SET email = ?, nombre = ?, rol = ?, empleado_id = ? WHERE id = ?",
        [d.email, nombre, d.rol, empleadoId, id]
      );

      const cambios: string[] = [];
      if (prev.email !== d.email) cambios.push(`correo: ${prev.email} → ${d.email}`);
      if ((prev.nombre ?? null) !== nombre) cambios.push("nombre");
      if ((prev.empleado_id === null ? null : Number(prev.empleado_id)) !== empleadoId) {
        cambios.push(empleadoId ? "empleado vinculado" : "se desvinculó el empleado");
      }
      if (cambios.length) await registrarBitacoraUsuario(conn, id, actor.id, "editar", cambios.join(", "));
      if (prev.rol !== d.rol) {
        await registrarBitacoraUsuario(
          conn, id, actor.id, "cambiar_rol",
          `${rolLabel(prev.rol as UserRole)} → ${rolLabel(d.rol)}`
        );
      }

      await conn.commit();
      revalidar(id);
      return { ok: true, id };
    }

    // Alta: contraseña temporal aleatoria que se pide cambiar al entrar.
    const password = generarPasswordTemporal();
    const passwordHash = await hash(password, BCRYPT_ROUNDS);
    const [res] = await conn.query<ResultSetHeader>(
      `INSERT INTO usuarios_portal
         (email, nombre, password_hash, debe_cambiar_password, rol, empleado_id, activo, created_by)
       VALUES (?, ?, ?, 1, ?, ?, 1, ?)`,
      [d.email, nombre, passwordHash, d.rol, empleadoId, actor.id]
    );
    await registrarBitacoraUsuario(conn, res.insertId, actor.id, "crear", `Rol: ${rolLabel(d.rol)}`);

    await conn.commit();
    revalidar();
    return { ok: true, id: res.insertId, password, email: d.email };
  } catch (err) {
    await conn.rollback();
    const e = err as { code?: string; sqlMessage?: string };
    if (e.code === "ER_DUP_ENTRY" && e.sqlMessage?.includes("uq_usuarios_portal_email")) {
      return {
        error: "Ya existe una cuenta con ese correo.",
        fieldErrors: { email: "Este correo ya tiene cuenta" },
        values,
      };
    }
    if (e.code === "ER_DUP_ENTRY" && e.sqlMessage?.includes("uq_usuarios_portal_empleado")) {
      return {
        error: "Ese empleado ya tiene una cuenta.",
        fieldErrors: { empleado: "Ya tiene cuenta" },
        values,
      };
    }
    console.error("[saveUsuario]", err);
    return { error: "No se pudo guardar. Intenta de nuevo.", values };
  } finally {
    conn.release();
  }
}

type Resultado = { ok: true } | { ok: false; error: string };

/** Desactiva o reactiva. No se borra: su historial y bitácoras se conservan. */
export async function setUsuarioActivo(id: number, activo: boolean): Promise<Resultado> {
  const actor = await getActionUser(["administrador"]);
  if (!actor) return { ok: false, error: SIN_PERMISOS };
  if (!idValido(id)) return { ok: false, error: "Cuenta no válida." };
  if (id === actor.id) return { ok: false, error: "No puedes desactivar tu propia cuenta." };

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT rol, activo FROM usuarios_portal WHERE id = ? FOR UPDATE",
      [id]
    );
    const u = rows[0];
    if (!u) {
      await conn.rollback();
      return { ok: false, error: "Esta cuenta ya no existe." };
    }
    if (Boolean(u.activo) === activo) {
      await conn.rollback();
      return { ok: true };
    }
    if (!activo && u.rol === "administrador" && (await contarAdminsActivos(conn)) <= 1) {
      await conn.rollback();
      return { ok: false, error: "Es el único administrador activo." };
    }

    // Al desactivar se sube la versión de sesión: sus sesiones abiertas se cierran.
    await conn.query(
      `UPDATE usuarios_portal
          SET activo = ?, sesion_version = sesion_version + ?
        WHERE id = ?`,
      [activo ? 1 : 0, activo ? 0 : 1, id]
    );
    await registrarBitacoraUsuario(conn, id, actor.id, activo ? "reactivar" : "desactivar");
    await conn.commit();
    revalidar(id);
    return { ok: true };
  } catch (err) {
    await conn.rollback();
    console.error("[setUsuarioActivo]", err);
    return { ok: false, error: "No se pudo actualizar. Intenta de nuevo." };
  } finally {
    conn.release();
  }
}

/**
 * Genera una contraseña temporal nueva, cierra las sesiones abiertas de la
 * cuenta y le pide cambiarla al entrar. La contraseña se devuelve una sola vez.
 */
export async function restablecerPassword(
  id: number
): Promise<{ ok: true; password: string; email: string } | { ok: false; error: string }> {
  const actor = await getActionUser(["administrador"]);
  if (!actor) return { ok: false, error: SIN_PERMISOS };
  if (!idValido(id)) return { ok: false, error: "Cuenta no válida." };
  if (id === actor.id) return { ok: false, error: "Cambia tu contraseña desde Mi cuenta." };

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT email FROM usuarios_portal WHERE id = ? FOR UPDATE",
      [id]
    );
    if (!rows[0]) {
      await conn.rollback();
      return { ok: false, error: "Esta cuenta ya no existe." };
    }

    const password = generarPasswordTemporal();
    await conn.query(
      `UPDATE usuarios_portal
          SET password_hash = ?, debe_cambiar_password = 1,
              sesion_version = sesion_version + 1, password_cambiada_at = NOW()
        WHERE id = ?`,
      [await hash(password, BCRYPT_ROUNDS), id]
    );
    await registrarBitacoraUsuario(conn, id, actor.id, "restablecer_password");
    await conn.commit();
    revalidar(id);
    return { ok: true, password, email: String(rows[0].email) };
  } catch (err) {
    await conn.rollback();
    console.error("[restablecerPassword]", err);
    return { ok: false, error: "No se pudo restablecer. Intenta de nuevo." };
  } finally {
    conn.release();
  }
}
