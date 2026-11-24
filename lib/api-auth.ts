// lib/api-auth.ts
// Guard de sesión para los Route Handlers de /api.
// proxy.ts excluye /api de su matcher, así que cada handler debe verificar
// la sesión por su cuenta (ver guía de autenticación de Next.js).
import { NextResponse } from "next/server";
import type { UserRole } from "@root/types/auth";
import { getSessionState, type CurrentUser } from "@root/lib/session";

type Guard =
  | { session: { user: CurrentUser }; denied: null }
  | { session: null; denied: NextResponse };

/**
 * Verifica que haya sesión vigente (cuenta activa y no revocada) y,
 * opcionalmente, que el rol esté permitido.
 *
 * Uso:
 *   const { denied } = await requireApiSession(["administrador"]);
 *   if (denied) return denied;
 */
export async function requireApiSession(allowedRoles?: UserRole[]): Promise<Guard> {
  const estado = await getSessionState();

  if (estado.status !== "ok") {
    return {
      session: null,
      denied: NextResponse.json({ ok: false, error: "No autenticado" }, { status: 401 }),
    };
  }

  const { user } = estado;
  if (user.mustChangePassword || (allowedRoles && !allowedRoles.includes(user.role))) {
    return {
      session: null,
      denied: NextResponse.json({ ok: false, error: "Sin permisos" }, { status: 403 }),
    };
  }

  return { session: { user }, denied: null };
}
