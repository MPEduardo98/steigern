// proxy.ts  (raÃ­z del proyecto)
// Encadena NextAuth (guard de rutas privadas) + next-intl (routing de locale).
// Las rutas privadas (login, admin, portal-proveedores) viven FUERA del
// segmento [locale]; las pÃºblicas dentro de [locale].
import createMiddleware from "next-intl/middleware";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);
const { auth: nextAuthMiddleware } = NextAuth(authConfig);

// Rutas privadas â€” gestionadas por NextAuth, sin prefijo de locale.
const AUTH_ROUTES = [
  /^\/admin(\/.*)?$/,
  /^\/portal-proveedores(\/.*)?$/,
  /^\/login$/,
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_ROUTES.some((r) => r.test(pathname))) {
    // @ts-expect-error â€” NextAuth acepta NextRequest internamente
    return nextAuthMiddleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  // Excluye API completa, _next, archivos estÃ¡ticos y rutas de auth de next-intl.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

