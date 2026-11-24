// app/[locale]/_actions/auth.ts
"use server";

import type { RowDataPacket } from "mysql2";
import { signIn, signOut } from "@root/auth";
import { AuthError } from "next-auth";
import { getTranslations } from "next-intl/server";
import pool from "@root/lib/db";
import { getSessionState } from "@root/lib/session";
import { cambiarPasswordPropia } from "@root/lib/password-propia";
import { PASSWORD_MIN } from "@root/lib/usuarios-reglas";

export interface LoginState {
  error?: string;
  success?: boolean;
  /** Entró con contraseña temporal: falta el paso "crea tu contraseña". */
  mustChangePassword?: boolean;
}

export interface CrearPasswordState {
  error?: string;
  fieldErrors?: Record<string, string>;
  success?: boolean;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const t = await getTranslations("Login");

  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: t("error_required") };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // La cookie recién emitida aún no se lee en esta misma petición: se
    // consulta la cuenta directamente para saber si la contraseña es temporal.
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT debe_cambiar_password FROM usuarios_portal WHERE email = ? AND activo = 1",
      [email]
    );
    return { success: true, mustChangePassword: Boolean(rows[0]?.debe_cambiar_password) };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: t("error_invalid") };
        default:
          return { error: t("error_auth") };
      }
    }
    return { error: t("error_server") };
  }
}

/**
 * Segundo paso del login cuando la contraseña es temporal: se crea la nueva
 * antes de entrar al panel. La sesión ya existe, pero el panel no deja pasar
 * hasta que este paso termina (lib/session.ts manda de vuelta al login).
 */
export async function crearPasswordAction(
  _prev: CrearPasswordState,
  formData: FormData
): Promise<CrearPasswordState> {
  const t = await getTranslations("Login");
  const str = (k: string) => {
    const v = formData.get(k);
    return typeof v === "string" ? v : "";
  };

  const estado = await getSessionState();
  if (estado.status !== "ok") return { error: t("error_session") };
  const { user } = estado;

  const nueva = str("nueva");
  const r = await cambiarPasswordPropia(user, str("actual"), nueva, str("confirmar"));
  if (!r.ok) {
    if ("general" in r) return { error: t(r.general === "cuenta_inactiva" ? "error_inactive" : "error_change") };
    const fieldErrors = Object.fromEntries(
      Object.entries(r.campos).map(([k, code]) => [k, t(`err_${code}`, { min: PASSWORD_MIN })])
    );
    return { fieldErrors };
  }

  // El cambio subió la versión de sesión: se emite un token nuevo.
  try {
    await signIn("credentials", { email: user.email, password: nueva, redirect: false });
  } catch (err) {
    console.error("[crearPasswordAction] no se pudo renovar la sesión", err);
    return { error: t("error_session") };
  }
  return { success: true };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

