// lib/password-propia.ts
// Cambio de la contraseña propia, compartido por el paso "crea tu contraseña"
// del login y por Mi cuenta. Devuelve códigos, no textos: cada pantalla los
// traduce (el login está en tres idiomas; el panel solo en español).
import type { RowDataPacket } from "mysql2";
import { compare, hash } from "bcryptjs";
import pool from "@root/lib/db";
import { PASSWORD_MAX, PASSWORD_MIN, registrarBitacoraUsuario } from "@root/lib/usuarios";
import type { CurrentUser } from "@root/lib/session";

export type ErrorCampoPassword =
  | "actual_requerida"
  | "actual_incorrecta"
  | "nueva_corta"
  | "nueva_larga"
  | "nueva_igual"
  | "nueva_correo"
  | "no_coincide";

export type ResultadoPassword =
  | { ok: true }
  | { ok: false; campos: Partial<Record<"actual" | "nueva" | "confirmar", ErrorCampoPassword>> }
  | { ok: false; general: "cuenta_inactiva" | "error" };

export async function cambiarPasswordPropia(
  user: Pick<CurrentUser, "id" | "email">,
  actual: string,
  nueva: string,
  confirmar: string
): Promise<ResultadoPassword> {
  const campos: Partial<Record<"actual" | "nueva" | "confirmar", ErrorCampoPassword>> = {};
  if (!actual) campos.actual = "actual_requerida";
  // Los límites cuentan bytes: bcrypt ignora lo que pase de 72 bytes.
  if (nueva.length < PASSWORD_MIN) campos.nueva = "nueva_corta";
  else if (Buffer.byteLength(nueva, "utf8") > PASSWORD_MAX) campos.nueva = "nueva_larga";
  else if (nueva === actual) campos.nueva = "nueva_igual";
  else if (nueva.toLowerCase() === user.email.toLowerCase()) campos.nueva = "nueva_correo";
  if (!campos.nueva && confirmar !== nueva) campos.confirmar = "no_coincide";
  if (Object.keys(campos).length) return { ok: false, campos };

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [rows] = await conn.query<RowDataPacket[]>(
      "SELECT password_hash FROM usuarios_portal WHERE id = ? AND activo = 1 FOR UPDATE",
      [user.id]
    );
    if (!rows[0]) {
      await conn.rollback();
      return { ok: false, general: "cuenta_inactiva" };
    }
    if (!(await compare(actual, String(rows[0].password_hash)))) {
      await conn.rollback();
      return { ok: false, campos: { actual: "actual_incorrecta" } };
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
    return { ok: true };
  } catch (err) {
    await conn.rollback();
    console.error("[cambiarPasswordPropia]", err);
    return { ok: false, general: "error" };
  } finally {
    conn.release();
  }
}
