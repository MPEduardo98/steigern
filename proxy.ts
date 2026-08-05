// proxy.ts  (raÃ­z del proyecto)
// Encadena NextAuth (guard de rutas privadas) + next-intl (routing de locale).
// Las rutas privadas (login, admin) viven FUERA del
// segmento [locale]; las pÃºblicas dentro de [locale].
import createMiddleware from "next-intl/middleware";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);
const { auth: nextAuthMiddleware } = NextAuth(authConfig);

// Rutas privadas â€” gestionadas por NextAuth, sin prefijo de locale.
// El login vive dentro de [locale] (/login, /en/login, /de/login) y lo
// gestiona next-intl, por eso NO va aquí.
const AUTH_ROUTES = [
  /^\/admin(\/.*)?$/,
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
  // `opengraph-image` y `twitter-image` se excluyen a mano: no llevan extensión,
  // así que el patrón de archivos no los cubre y el routing de locale los
  // convertía en 404 (por eso el og:image no cargaba en redes sociales).
  matcher: ["/((?!api|_next|_vercel|opengraph-image|twitter-image|.*\\..*).*)"],
};

