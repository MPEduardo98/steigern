// app/admin/cuenta/actions.ts
// Cambio de la contraseña propia (también el obligatorio tras una temporal).
"use server";

import type { RowDataPacket } from "mysql2";
import { compare, hash } from "bcryptjs";
import pool from "@root/lib/db";
import { signIn, signOut } from "@root/auth";
import { getSessionState } from "@root/lib/session";
import { PASSWORD_MAX, PASSWORD_MIN, registrarBitacoraUsuario } from "@root/lib/usuarios";

export interface PasswordFormState {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

export async function cambiarMiPassword(_prev: PasswordFormState, formData: FormData): Promise<PasswordFormState> {
  // Aquí sí se admite la contraseña temporal pendiente: es justo para cambiarla.
  const estado = await getSessionState();
  if (estado.status !== "ok") return { error: "Tu sesión terminó. Vuelve a iniciar sesión." };
  const { user } = estado;

  const actual = str(formData, "actual");
  const nueva = str(formData, "nueva");
  const confirmar = str(formData, "confirmar");

  const fieldErrors: Record<string, string> = {};
  if (!actual) fieldErrors.actual = "Escribe tu contraseña actual";
  // Los límites cuentan bytes: bcrypt ignora lo que pase de 72 bytes.
  const bytes = Buffer.byteLength(nueva, "utf8");
  if (nueva.length < PASSWORD_MIN) fieldErrors.nueva = `Mínimo ${PASSWORD_MIN} caracteres`;
  else if (bytes > PASSWORD_MAX) fieldErrors.nueva = "Es demasiado larga";
  else if (nueva === actual) fieldErrors.nueva = "Debe ser distinta de la actual";
  else if (nueva.toLowerCase() === user.email.toLowerCase()) fieldErrors.nueva = "No uses tu correo como contraseña";
  if (!fieldErrors.nueva && confirmar !== nueva) fieldErrors.confirmar = "No coincide con la nueva contraseña";
  if (Object.keys(fieldErrors).length) return { error: "Revisa los campos marcados.", fieldErrors };

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT password_hash FROM usuarios_portal WHERE id = ? AND activo = 1 FOR UPDATE",
      [user.id]
    );
    if (!rows[0]) {
      await conn.rollback();
      return { error: "Tu cuenta ya no está activa." };
    }
    if (!(await compare(actual, String(rows[0].password_hash)))) {
      await conn.rollback();
      return { error: "Revisa los campos marcados.", fieldErrors: { actual: "La contraseña actual no es correcta" } };
    }

    // Subir la versión cierra las sesiones abiertas en otros dispositivos.
    await conn.query(
      `UPDATE usuarios_portal
          SET password_hash = ?, debe_cambiar_password = 0,
              sesion_version = sesion_version + 1, password_cambiada_at = NOW()
        WHERE id = ?`,
      [await hash(nueva, 12), user.id]
    );
    await registrarBitacoraUsuario(conn, user.id, user.id, "cambiar_password");
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    console.error("[cambiarMiPassword]", err);
    return { error: "No se pudo cambiar la contraseña. Intenta de nuevo." };
  } finally {
    conn.release();
  }

  // Esta sesión también quedó con la versión vieja: se emite un token nuevo.
  try {
    await signIn("credentials", { email: user.email, password: nueva, redirect: false });
  } catch (err) {
    // La contraseña ya cambió; la sesión vieja quedó revocada: se cierra y se
    // entra de nuevo con la nueva.
    console.error("[cambiarMiPassword] no se pudo renovar la sesión", err);
    await signOut({ redirectTo: "/login" });
  }
  return { ok: true };
}
