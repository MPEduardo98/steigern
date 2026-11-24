// app/admin/cuenta/actions.ts
// Cambio de la contraseña propia desde Mi cuenta. El cambio obligatorio tras
// una contraseña temporal no pasa por aquí: se hace en el login, antes de
// entrar al panel (ver app/[locale]/_actions/auth.ts).
"use server";

import { signIn, signOut } from "@root/auth";
import { getActionUser } from "@root/lib/session";
import { cambiarPasswordPropia, type ErrorCampoPassword } from "@root/lib/password-propia";
import { PASSWORD_MIN } from "@root/lib/usuarios";

export interface PasswordFormState {
  ok?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const TEXTOS: Record<ErrorCampoPassword, string> = {
  actual_requerida: "Escribe tu contraseña actual",
  actual_incorrecta: "La contraseña actual no es correcta",
  nueva_corta: `Mínimo ${PASSWORD_MIN} caracteres`,
  nueva_larga: "Es demasiado larga",
  nueva_igual: "Debe ser distinta de la actual",
  nueva_correo: "No uses tu correo como contraseña",
  no_coincide: "No coincide con la nueva contraseña",
};

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

export async function cambiarMiPassword(_prev: PasswordFormState, formData: FormData): Promise<PasswordFormState> {
  const user = await getActionUser();
  if (!user) return { error: "Tu sesión terminó. Vuelve a iniciar sesión." };

  const nueva = str(formData, "nueva");
  const r = await cambiarPasswordPropia(user, str(formData, "actual"), nueva, str(formData, "confirmar"));
  if (!r.ok) {
    if ("general" in r) {
      return { error: r.general === "cuenta_inactiva" ? "Tu cuenta ya no está activa." : "No se pudo cambiar la contraseña. Intenta de nuevo." };
    }
    const fieldErrors = Object.fromEntries(Object.entries(r.campos).map(([k, v]) => [k, TEXTOS[v]]));
    return { error: "Revisa los campos marcados.", fieldErrors };
  }

  // Esta sesión también quedó con la versión vieja: se emite un token nuevo.
  try {
    await signIn("credentials", { email: user.email, password: nueva, redirect: false });
  } catch (err) {
    console.error("[cambiarMiPassword] no se pudo renovar la sesión", err);
    await signOut({ redirectTo: "/login" });
  }
  return { ok: true };
}
