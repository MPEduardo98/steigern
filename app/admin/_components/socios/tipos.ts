// app/admin/_components/socios/tipos.ts
// Tipos que comparten los formularios de clientes y proveedores.

export interface SocioFormState {
  ok?: boolean;
  id?: number;
  /** Código asignado en el alta (CLI-0001, PRV-0001…). */
  codigo?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  /** Lo que se envió, para no perderlo si hay errores. */
  values?: Record<string, string>;
}
