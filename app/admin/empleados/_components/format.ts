// app/admin/empleados/_components/format.ts
// Formatos compartidos por la lista y la ficha de empleados.

/** "2026-03-04" → "4 mar 2026" (sin pasar por zona horaria). */
export function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function iniciales(nombre: string, apellidos: string): string {
  return `${nombre.trim().charAt(0)}${apellidos.trim().charAt(0)}`.toUpperCase();
}

/** Hoy en México como "YYYY-MM-DD", para la fecha de ingreso por defecto. */
export function hoyMexico(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date());
}

/** 1536 → "1.5 KB". */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Fecha y hora en México: "12 nov 2026, 14:05". */
export function formatFechaHora(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Mexico_City",
  });
}

/** "1234.5" → "$1,234.50". */
export function formatMoneda(n: number): string {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}
