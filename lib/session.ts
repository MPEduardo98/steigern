// lib/session.ts
import { auth }     from "@root/auth";
import { redirect } from "next/navigation";
import type { UserRole } from "@root/auth";

/** Devuelve la sesión activa o redirige a /login */
export async function requireSession(allowedRoles?: UserRole[]) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    redirect("/login");
  }

  return session;
}

/** Solo devuelve la sesión, sin redirigir */
export async function getSession() {
  return auth();
}