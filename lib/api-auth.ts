// lib/api-auth.ts
// Guard de sesión para los Route Handlers de /api.
// proxy.ts excluye /api de su matcher, así que cada handler debe verificar
// la sesión por su cuenta (ver guía de autenticación de Next.js).
import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { auth } from "@root/auth";
import type { UserRole } from "@root/types/auth";

type Guard =
  | { session: Session; denied: null }
  | { session: null; denied: NextResponse };

/**
 * Verifica que haya sesión y, opcionalmente, que el rol esté permitido.
 *
 * Uso:
 *   const { denied } = await requireApiSession(["administrador"]);
 *   if (denied) return denied;
 */
export async function requireApiSession(allowedRoles?: UserRole[]): Promise<Guard> {
  const session = await auth();

  if (!session?.user) {
    return {
      session: null,
      denied: NextResponse.json({ ok: false, error: "No autenticado" }, { status: 401 }),
    };
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    return {
      session: null,
      denied: NextResponse.json({ ok: false, error: "Sin permisos" }, { status: 403 }),
    };
  }

  return { session, denied: null };
}
