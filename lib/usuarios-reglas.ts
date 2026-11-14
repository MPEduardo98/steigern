// lib/usuarios-reglas.ts
// Constantes de cuentas del panel que también usan los componentes cliente
// (sin dependencias de servidor; lo de base de datos vive en lib/usuarios.ts).
import type { UserRole } from "@root/types/auth";

export const ROLES: { value: UserRole; label: string; description: string }[] = [
  {
    value: "administrador",
    label: "Administrador",
    description: "Acceso total: empleados, expedientes, usuarios y configuración.",
  },
  {
    value: "empleado",
    label: "Empleado",
    description: "Solo los módulos de operación del día a día.",
  },
];

export const rolLabel = (rol: UserRole) => ROLES.find((r) => r.value === rol)?.label ?? rol;

/** Mismos límites que el login (auth.ts): bcrypt solo usa los primeros 72 bytes. */
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 72;
