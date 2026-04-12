// types/auth.ts
// Tipos compartidos entre auth.config.ts (Edge) y auth.ts (Node.js).
// Este archivo NO puede importar nada con deps de Node.js.

export type UserRole = "administrador" | "empleado" | "proveedor";

export interface AuthUser {
  id?:         string;
  name?:       string | null;
  email?:      string | null;
  image?:      string | null;
  role?:       UserRole;
  empleadoId?: number | null;
}