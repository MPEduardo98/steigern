// proxy.ts  (raíz del proyecto — reemplaza al anterior)
// ✅  Encadena next-intl (locale routing) + NextAuth (auth guard)
//     Solo Web APIs — Edge-safe.
import createMiddleware from "next-intl/middleware";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { routing } from "@/i18n/routing";
import type { NextRequest } from "next/server";

// ── next-intl: maneja prefijos de locale (/en/..., /de/...) ──────────────
const intlMiddleware = createMiddleware(routing);

// ── NextAuth: solo verifica JWT, no toca BD ──────────────────────────────
const { auth: nextAuthMiddleware } = NextAuth(authConfig);

// Rutas que requieren protección de auth (sin prefijo de locale)
const AUTH_ROUTES = [
  /^(\/[a-z]{2})?\/admin(\/.*)?$/,
  /^(\/[a-z]{2})?\/portal-proveedores(\/.*)?$/,
  /^(\/[a-z]{2})?\/login$/,
];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const needsAuth = AUTH_ROUTES.some((r) => r.test(pathname));

  if (needsAuth) {
    // @ts-expect-error — NextAuth middleware acepta NextRequest internamente
    return nextAuthMiddleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Todas las rutas excepto _next, api/auth y archivos estáticos
    "/((?!_next|api/auth|.*\\..*).*)",
  ],
};