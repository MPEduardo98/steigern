// lib/socios-reglas.ts
// Catálogos y reglas que comparten clientes y proveedores. Sin dependencias de
// servidor: también los usan los formularios (componentes cliente).

/** Catálogo c_RegimenFiscal del SAT (CFDI 4.0). `fisica`/`moral` = a quién aplica. */
export const REGIMENES_FISCALES: { value: string; label: string; fisica: boolean; moral: boolean }[] = [
  { value: "601", label: "General de Ley Personas Morales", fisica: false, moral: true },
  { value: "603", label: "Personas Morales con Fines no Lucrativos", fisica: false, moral: true },
  { value: "605", label: "Sueldos y Salarios e Ingresos Asimilados a Salarios", fisica: true, moral: false },
  { value: "606", label: "Arrendamiento", fisica: true, moral: false },
  { value: "607", label: "Régimen de Enajenación o Adquisición de Bienes", fisica: true, moral: false },
  { value: "608", label: "Demás ingresos", fisica: true, moral: false },
  { value: "610", label: "Residentes en el Extranjero sin Establecimiento Permanente en México", fisica: true, moral: true },
  { value: "611", label: "Ingresos por Dividendos (socios y accionistas)", fisica: true, moral: false },
  { value: "612", label: "Personas Físicas con Actividades Empresariales y Profesionales", fisica: true, moral: false },
  { value: "614", label: "Ingresos por intereses", fisica: true, moral: false },
  { value: "615", label: "Régimen de los ingresos por obtención de premios", fisica: true, moral: false },
  { value: "616", label: "Sin obligaciones fiscales", fisica: true, moral: false },
  { value: "620", label: "Sociedades Cooperativas de Producción que optan por diferir sus ingresos", fisica: false, moral: true },
  { value: "621", label: "Incorporación Fiscal", fisica: true, moral: false },
  { value: "622", label: "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras", fisica: false, moral: true },
  { value: "623", label: "Opcional para Grupos de Sociedades", fisica: false, moral: true },
  { value: "624", label: "Coordinados", fisica: false, moral: true },
  { value: "625", label: "Actividades Empresariales con ingresos a través de Plataformas Tecnológicas", fisica: true, moral: false },
  { value: "626", label: "Régimen Simplificado de Confianza", fisica: true, moral: true },
];

/** Catálogo c_UsoCFDI del SAT (los de uso común en una empresa). */
export const USOS_CFDI: { value: string; label: string }[] = [
  { value: "G01", label: "Adquisición de mercancías" },
  { value: "G02", label: "Devoluciones, descuentos o bonificaciones" },
  { value: "G03", label: "Gastos en general" },
  { value: "I01", label: "Construcciones" },
  { value: "I02", label: "Mobiliario y equipo de oficina por inversiones" },
  { value: "I03", label: "Equipo de transporte" },
  { value: "I04", label: "Equipo de cómputo y accesorios" },
  { value: "I05", label: "Dados, troqueles, moldes, matrices y herramental" },
  { value: "I08", label: "Otra maquinaria y equipo" },
  { value: "S01", label: "Sin efectos fiscales" },
  { value: "CP01", label: "Pagos" },
];

export const MONEDAS = [
  { value: "MXN", label: "Peso mexicano (MXN)" },
  { value: "USD", label: "Dólar estadounidense (USD)" },
  { value: "EUR", label: "Euro (EUR)" },
] as const;
export type Moneda = (typeof MONEDAS)[number]["value"];

/** RFC de persona moral (12) o física (13). Admite Ñ y &. */
export const RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;
/** RFC genéricos del SAT: se pueden repetir entre registros. */
export const RFC_GENERICOS = ["XAXX010101000", "XEXX010101000"];

export const esRfcGenerico = (rfc: string) => RFC_GENERICOS.includes(rfc);

export const regimenLabel = (clave: string | null) =>
  clave ? `${clave} · ${REGIMENES_FISCALES.find((r) => r.value === clave)?.label ?? "Desconocido"}` : null;

export const usoCfdiLabel = (clave: string | null) =>
  clave ? `${clave} · ${USOS_CFDI.find((u) => u.value === clave)?.label ?? "Desconocido"}` : null;

// ── Estatus ────────────────────────────────────────────────────────────────

export type EstatusCliente = "activo" | "inactivo" | "bloqueado";
export type EstatusProveedor = "en_revision" | "activo" | "inactivo" | "bloqueado";

type Badge = "ok" | "off" | "warn" | "danger";

export const ESTATUS_CLIENTE: { value: EstatusCliente; label: string; description: string; badge: Badge }[] = [
  { value: "activo", label: "Activo", description: "Se le puede cotizar y vender.", badge: "ok" },
  { value: "inactivo", label: "Inactivo", description: "Ya no compra; se conserva su historial.", badge: "off" },
  { value: "bloqueado", label: "Bloqueado", description: "No se le vende (adeudos, problemas de pago).", badge: "danger" },
];

export const ESTATUS_PROVEEDOR: { value: EstatusProveedor; label: string; description: string; badge: Badge }[] = [
  { value: "en_revision", label: "En revisión", description: "Dado de alta, falta validarlo antes de comprarle.", badge: "warn" },
  { value: "activo", label: "Activo", description: "Se le pueden hacer órdenes de compra.", badge: "ok" },
  { value: "inactivo", label: "Inactivo", description: "Ya no se le compra; se conserva su historial.", badge: "off" },
  { value: "bloqueado", label: "Bloqueado", description: "No se le compra (calidad, incumplimiento).", badge: "danger" },
];
