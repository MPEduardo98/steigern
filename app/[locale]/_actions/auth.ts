// app/[locale]/_actions/auth.ts
"use server";

import { signIn, signOut } from "@root/auth";
import { AuthError } from "next-auth";
import { getTranslations } from "next-intl/server";
import type { UserRole } from "@root/auth";

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const t = await getTranslations("Login");

  const email    = formData.get("email")    as string;
  const password = formData.get("password") as string;
  const role     = formData.get("role")     as UserRole;

  if (!email || !password || !role) {
    return { error: t("error_required") };
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
          return { error: t("error_invalid") };
        default:
          return { error: t("error_auth") };
      }
    }
    return { error: t("error_server") };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}

