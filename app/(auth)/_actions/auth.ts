// app/(auth)/_actions/auth.ts
"use server";

import { signIn, signOut } from "@root/auth";
import { AuthError } from "next-auth";
import type { UserRole } from "@root/auth";

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const role     = formData.get("role")     as UserRole;

  if (!email || !password || !role) {
    return { error: "Todos los campos son requeridos." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      role,
      redirect: false,
    });

    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Correo, contraseÃ±a o perfil incorrectos." };
        default:
          return { error: "Error de autenticaciÃ³n. Intenta de nuevo." };
      }
    }
    return { error: "Error interno del servidor." };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

