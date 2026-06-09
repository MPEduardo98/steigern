// auth.config.ts  (raÃ­z del proyecto)
// âš ï¸  NO importar nada de Node.js (mysql2, bcryptjs, fs, streamâ€¦)
//     Solo Web APIs. Ãšnico archivo que el middleware puede importar.
import type { NextAuthConfig, Session } from "next-auth";
import type { UserRole, AuthUser } from "./types/auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error:  "/login",
  },

  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },

  callbacks: {
    // authorized() corre en Edge â€” verifica el JWT, no toca la BD.
    authorized({ auth, request: { nextUrl } }: {
      auth:    Session | null;
      request: { nextUrl: URL };
    }) {
      // auth puede ser null â€” extraemos role de forma segura sin cast peligroso
      const user     = (auth?.user ?? null) as AuthUser | null;
      const role     = user?.role;
      const pathname = nextUrl.pathname;

      // â”€â”€ Rutas /admin â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      if (pathname.startsWith("/admin")) {
        if (!user) {
          return Response.redirect(
            new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl)
          );
        }
        if (role !== "administrador" && role !== "empleado") {
          return new Response("Acceso denegado", { status: 403 });
        }
      }

      // â”€â”€ Usuario ya autenticado intenta ir a /login â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
      if (pathname === "/login" && user) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
  },

  providers: [], // vacÃ­o â€” los providers con Node.js van solo en auth.ts
};

