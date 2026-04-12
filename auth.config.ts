// auth.config.ts  (raíz del proyecto)
// ⚠️  NO importar nada de Node.js (mysql2, bcryptjs, fs, stream…)
//     Solo Web APIs. Único archivo que el middleware puede importar.
import type { NextAuthConfig, Session } from "next-auth";
import type { UserRole, AuthUser } from "@/types/auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error:  "/login",
  },

  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },

  callbacks: {
    // authorized() corre en Edge — verifica el JWT, no toca la BD.
    authorized({ auth, request: { nextUrl } }: {
      auth:    Session | null;
      request: { nextUrl: URL };
    }) {
      // auth puede ser null — extraemos role de forma segura sin cast peligroso
      const user     = (auth?.user ?? null) as AuthUser | null;
      const role     = user?.role;
      const pathname = nextUrl.pathname;

      // ── Rutas /admin ───────────────────────────────────────────────
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

      // ── Rutas /portal-proveedores ──────────────────────────────────
      if (pathname.startsWith("/portal-proveedores")) {
        if (!user) {
          return Response.redirect(
            new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, nextUrl)
          );
        }
        if (role !== "proveedor") {
          return new Response("Acceso denegado", { status: 403 });
        }
      }

      // ── Usuario ya autenticado intenta ir a /login ─────────────────
      if (pathname === "/login" && user) {
        const dest: string =
          role === "administrador" || role === "empleado"
            ? "/admin"
            : "/portal-proveedores";
        return Response.redirect(new URL(dest, nextUrl));
      }

      return true;
    },
  },

  providers: [], // vacío — los providers con Node.js van solo en auth.ts
};