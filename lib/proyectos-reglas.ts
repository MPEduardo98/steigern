// lib/proyectos-reglas.ts
// Catálogos y formatos del módulo de proyectos. Sin dependencias de servidor:
// también los usan los formularios (componentes cliente).

export type EstadoProyecto = "cotizacion" | "aprobado" | "en_proceso" | "terminado" | "cancelado";

type Badge = "ok" | "off" | "warn" | "danger";

export const ESTADOS_PROYECTO: { value: EstadoProyecto; label: string; description: string; badge: Badge }[] = [
  { value: "cotizacion", label: "Cotización", description: "Se le envió precio al cliente; falta que lo apruebe.", badge: "warn" },
  { value: "aprobado", label: "Aprobado", description: "El cliente aceptó; todavía no arranca el trabajo.", badge: "ok" },
  { value: "en_proceso", label: "En proceso", description: "Se está fabricando o instalando.", badge: "ok" },
  { value: "terminado", label: "Terminado", description: "Entregado al cliente.", badge: "off" },
  { value: "cancelado", label: "Cancelado", description: "No se hizo; se conserva su historial.", badge: "danger" },
];

/** Estados que ya no cambian: llevan fecha de cierre. */
export const ESTADOS_CERRADOS: EstadoProyecto[] = ["terminado", "cancelado"];

export const estadoProyecto = (value: string) => ESTADOS_PROYECTO.find((e) => e.value === value);

/** Montos de venta: hasta 2 decimales. */
export const MONTO_REGEX = /^\d{1,12}(\.\d{1,2})?$/;

export const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** 125000 → "$125,000.00 MXN". */
export function formatMonto(monto: number | null, moneda: string): string | null {
  if (monto === null) return null;
  const texto = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: moneda,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(monto);
  return `${texto} ${moneda}`;
}
