// lib/expediente-reglas.ts
// Reglas del expediente que sirven igual en servidor y navegador: catálogos,
// validación de CURP / RFC / NSS / CLABE y cómo enmascarar datos sensibles.
// No importa nada del servidor, así que se puede usar en componentes cliente.

// ── Documentos ───────────────────────────────────────────────────────────────

export interface TipoDocumento {
  value: string;
  label: string;
  /** Forma parte del expediente mínimo de alta. */
  requerido: boolean;
  /** Suele tener fecha de vencimiento (se pide en el formulario). */
  vence: boolean;
}

export const TIPOS_DOCUMENTO: TipoDocumento[] = [
  { value: "identificacion", label: "Identificación oficial (INE o pasaporte)", requerido: true, vence: true },
  { value: "acta_nacimiento", label: "Acta de nacimiento", requerido: true, vence: false },
  { value: "curp", label: "Constancia de CURP", requerido: true, vence: false },
  { value: "csf", label: "Constancia de situación fiscal (SAT)", requerido: true, vence: false },
  { value: "nss", label: "Documento con NSS (IMSS)", requerido: true, vence: false },
  { value: "comprobante_domicilio", label: "Comprobante de domicilio", requerido: true, vence: false },
  { value: "contrato", label: "Contrato firmado", requerido: true, vence: true },
  { value: "aviso_privacidad", label: "Aviso de privacidad firmado", requerido: true, vence: false },
  { value: "estudios", label: "Comprobante de estudios", requerido: false, vence: false },
  { value: "cv", label: "Currículum", requerido: false, vence: false },
  { value: "dc3", label: "Constancia de capacitación (DC-3)", requerido: false, vence: false },
  { value: "incapacidad", label: "Incapacidad (IMSS)", requerido: false, vence: false },
  { value: "acta_administrativa", label: "Acta administrativa", requerido: false, vence: false },
  { value: "baja", label: "Renuncia o finiquito", requerido: false, vence: false },
  { value: "otro", label: "Otro", requerido: false, vence: false },
];

export function tipoDocumento(value: string): TipoDocumento | undefined {
  return TIPOS_DOCUMENTO.find((t) => t.value === value);
}

/** Tamaño máximo por archivo. next.config.mjs deja un poco más de margen. */
export const MAX_DOCUMENTO_BYTES = 10 * 1024 * 1024;
export const EXTENSIONES_DOCUMENTO = ".pdf,.jpg,.jpeg,.png,.webp";

/** Días antes del vencimiento en que se avisa "por vencer". */
export const DIAS_AVISO_VENCIMIENTO = 30;

// ── Contratos ────────────────────────────────────────────────────────────────

export const TIPOS_CONTRATO = [
  { value: "indeterminado", label: "Tiempo indeterminado" },
  { value: "determinado", label: "Tiempo determinado" },
  { value: "obra", label: "Obra determinada" },
  { value: "prueba", label: "Periodo de prueba" },
  { value: "capacitacion", label: "Capacitación inicial" },
] as const;
export type TipoContrato = (typeof TIPOS_CONTRATO)[number]["value"];

export const JORNADAS = [
  { value: "diurna", label: "Diurna" },
  { value: "nocturna", label: "Nocturna" },
  { value: "mixta", label: "Mixta" },
] as const;
export type Jornada = (typeof JORNADAS)[number]["value"];

export const ESTADOS_CIVILES = [
  { value: "soltero", label: "Soltero(a)" },
  { value: "casado", label: "Casado(a)" },
  { value: "union_libre", label: "Unión libre" },
  { value: "divorciado", label: "Divorciado(a)" },
  { value: "viudo", label: "Viudo(a)" },
] as const;
export type EstadoCivil = (typeof ESTADOS_CIVILES)[number]["value"];

// ── CURP ─────────────────────────────────────────────────────────────────────

const ENTIDADES_CURP =
  "AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE";
const CURP_RE = new RegExp(
  `^[A-Z][AEIOUX][A-Z]{2}\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])[HMX](${ENTIDADES_CURP})[B-DF-HJ-NP-TV-Z]{3}[A-Z\\d]\\d$`
);

/** Revisa formato y dígito verificador. Devuelve el mensaje de error o null. */
export function validarCurp(curp: string): string | null {
  if (!CURP_RE.test(curp)) return "La CURP no tiene un formato válido (18 caracteres)";
  const dic = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let suma = 0;
  for (let i = 0; i < 17; i++) suma += dic.indexOf(curp[i]) * (18 - i);
  const digito = (10 - (suma % 10)) % 10;
  if (digito !== Number(curp[17])) return "La CURP no es válida (revisa que esté bien escrita)";
  if (!datosDeCurp(curp)) return "La fecha de nacimiento de la CURP no existe";
  return null;
}

/** Fecha de nacimiento ("YYYY-MM-DD") y sexo que vienen dentro de la CURP. */
export function datosDeCurp(curp: string): { fechaNacimiento: string; sexo: "H" | "M" | "X" } | null {
  const yy = Number(curp.slice(4, 6));
  const mm = Number(curp.slice(6, 8));
  const dd = Number(curp.slice(8, 10));
  // Posición 17: dígito = nacido antes de 2000, letra = desde 2000.
  const siglo = /\d/.test(curp[16]) ? 1900 : 2000;
  const fecha = new Date(Date.UTC(siglo + yy, mm - 1, dd));
  if (fecha.getUTCMonth() !== mm - 1 || fecha.getUTCDate() !== dd) return null;
  return { fechaNacimiento: fecha.toISOString().slice(0, 10), sexo: curp[10] as "H" | "M" | "X" };
}

// ── RFC (persona física, con homoclave) ──────────────────────────────────────

const RFC_RE = /^[A-ZÑ&]{4}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{2}[A\d]$/;

export function validarRfc(rfc: string): string | null {
  if (!RFC_RE.test(rfc)) return "El RFC debe tener 13 caracteres (persona física con homoclave)";
  const dic = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ";
  let suma = 0;
  for (let i = 0; i < 12; i++) suma += dic.indexOf(rfc[i]) * (13 - i);
  const r = 11 - (suma % 11);
  const digito = r === 11 ? "0" : r === 10 ? "A" : String(r);
  if (digito !== rfc[12]) return "El RFC no es válido (revisa la homoclave)";
  return null;
}

// ── NSS (IMSS): 11 dígitos, el último por Luhn ───────────────────────────────

export function validarNss(nss: string): string | null {
  if (!/^\d{11}$/.test(nss)) return "El NSS debe tener 11 dígitos";
  let suma = 0;
  for (let i = 0; i < 10; i++) {
    let d = Number(nss[i]) * (i % 2 === 0 ? 1 : 2);
    if (d > 9) d -= 9;
    suma += d;
  }
  if ((10 - (suma % 10)) % 10 !== Number(nss[10])) return "El NSS no es válido (revisa los dígitos)";
  return null;
}

// ── CLABE: 18 dígitos, pesos 3-7-1 ───────────────────────────────────────────

const BANCOS_CLABE: Record<string, string> = {
  "002": "Banamex",
  "012": "BBVA",
  "014": "Santander",
  "021": "HSBC",
  "030": "BanBajío",
  "036": "Inbursa",
  "044": "Scotiabank",
  "058": "Banregio",
  "072": "Banorte",
  "127": "Banco Azteca",
  "137": "BanCoppel",
};

export function validarClabe(clabe: string): string | null {
  if (!/^\d{18}$/.test(clabe)) return "La CLABE debe tener 18 dígitos";
  const pesos = [3, 7, 1];
  let suma = 0;
  for (let i = 0; i < 17; i++) suma += (Number(clabe[i]) * pesos[i % 3]) % 10;
  if ((10 - (suma % 10)) % 10 !== Number(clabe[17])) return "La CLABE no es válida (revisa los dígitos)";
  return null;
}

/** Nombre del banco a partir de la CLABE, si es uno de los conocidos. */
export function bancoDeClabe(clabe: string | null): string | null {
  if (!clabe) return null;
  return BANCOS_CLABE[clabe.slice(0, 3)] ?? null;
}

// ── Enmascarado ──────────────────────────────────────────────────────────────

/** Deja ver solo el principio y/o el final: "GOMA850101HDFRRN09" → "GOMA••••••••••••09". */
export function enmascarar(valor: string | null, inicio: number, fin: number): string | null {
  if (!valor) return null;
  if (valor.length <= inicio + fin) return "•".repeat(valor.length);
  return valor.slice(0, inicio) + "•".repeat(valor.length - inicio - fin) + valor.slice(valor.length - fin);
}
