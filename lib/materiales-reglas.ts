// lib/materiales-reglas.ts
// Catálogos del módulo de materiales. Sin dependencias de servidor: también
// los usan los formularios (componentes cliente).

/** Cómo se compra el material. `value` se guarda en la base. */
export const UNIDADES = [
  { value: "pieza", label: "Pieza", corta: "pza" },
  { value: "metro", label: "Metro", corta: "m" },
  { value: "tramo", label: "Tramo", corta: "tramo" },
  { value: "kg", label: "Kilogramo", corta: "kg" },
  { value: "litro", label: "Litro", corta: "L" },
  { value: "hoja", label: "Hoja / placa", corta: "hoja" },
  { value: "rollo", label: "Rollo", corta: "rollo" },
  { value: "caja", label: "Caja", corta: "caja" },
  { value: "paquete", label: "Paquete", corta: "paq" },
  { value: "juego", label: "Juego", corta: "jgo" },
] as const;
export type Unidad = (typeof UNIDADES)[number]["value"];

export const unidadCorta = (u: string) => UNIDADES.find((x) => x.value === u)?.corta ?? u;

export type EstatusMaterial = "activo" | "inactivo";

export const ESTATUS_MATERIAL: {
  value: EstatusMaterial;
  label: string;
  description: string;
  badge: "ok" | "off";
}[] = [
  { value: "activo", label: "Activo", description: "Se puede pedir en compras.", badge: "ok" },
  { value: "inactivo", label: "Inactivo", description: "Ya no se usa; se conserva su historial.", badge: "off" },
];

/** Costo unitario: hasta 4 decimales (tornillería cuesta centavos). */
export const COSTO_REGEX = /^\d{1,10}(\.\d{1,4})?$/;

/** "12.5" → "$12.50 MXN"; muestra hasta 4 decimales si los tiene. */
export function formatCosto(costo: number | null, moneda: string): string | null {
  if (costo === null) return null;
  const texto = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: moneda,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(costo);
  return `${texto} ${moneda}`;
}
