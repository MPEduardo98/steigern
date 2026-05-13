// middleware.ts  (raíz del proyecto)
// ✅  Solo importa auth.config.ts — cero dependencias de Node.js → Edge-safe
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware;

export const config = {
  matcher: [
    "/admin/:path*",
    "/portal-proveedores/:path*",
    "/login",
  ],
};