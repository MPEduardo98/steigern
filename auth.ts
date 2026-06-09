// auth.ts  (raÃ­z del proyecto)
// âœ…  Este archivo corre SOLO en Node.js (servidor). Nunca en Edge/middleware.
//     Importa authConfig (Edge-safe) y le aÃ±ade el provider con bcrypt + mysql2.
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "./lib/db";
import type { RowDataPacket } from "mysql2";
import { authConfig } from "./auth.config";
import type { UserRole } from "./types/auth";

export type { UserRole };

// â”€â”€ Augmentation segÃºn doc oficial authjs.dev/getting-started/typescript â”€â”€
declare module "next-auth" {
  interface User {
    role: UserRole;
    empleadoId: number | null;
  }
  interface Session {
    user: {
      role: UserRole;
      empleadoId: number | null;
    } & DefaultSession["user"]; // conserva id, name, email, image base
  }
}

// JWT vive en su propio submodule â€” authjs.dev/getting-started/typescript
import type { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    empleadoId: number | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,  // hereda pages, session strategy, y el authorized() callback
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email:    { label: "Email",      type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // ValidaciÃ³n server-side con zod â€” recomendado por authjs.dev
        const { z } = await import("zod");
        const schema = z.object({
          email:    z.string().email(),
          password: z.string().min(8).max(72),
        });

        const parsed = schema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // â”€â”€ Empleado / Administrador â€” el rol se deduce de la cuenta â”€â”€
        const [rows] = await pool.query<RowDataPacket[]>(
          `SELECT up.id, up.email, up.password_hash, up.rol,
                  up.empleado_id,
                  CONCAT(e.nombre, ' ', e.apellidos) AS name
           FROM   usuarios_portal up
           LEFT   JOIN empleados e ON e.id = up.empleado_id
           WHERE  up.email = ? AND up.activo = 1`,
          [email]
        );
        const user = rows[0];
        if (!user) return null;

        const valid = await compare(password, user.password_hash as string);
        if (!valid) return null;

        await pool.query(
          "UPDATE usuarios_portal SET ultimo_acceso = NOW() WHERE id = ?",
          [user.id]
        );

        return {
          id:         String(user.id),
          email:      user.email as string,
          name:       (user.name as string) || (user.email as string),
          role:       user.rol   as UserRole,
          empleadoId: user.empleado_id as number | null,
        };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role       = (user as { role: UserRole }).role;
        token.empleadoId = (user as { empleadoId: number | null }).empleadoId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id         = token.sub!;
      session.user.role       = token.role;
      session.user.empleadoId = token.empleadoId;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error:  "/login",
  },

  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
});

