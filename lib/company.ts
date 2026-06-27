// lib/company.ts
// Datos de la empresa que cambian con el tiempo. Centralizados para que los
// "años de experiencia" suban solos cada año sin tocar textos a mano.

/** Año de fundación de STEIGERN. */
export const FOUNDING_YEAR = 2010;

/** Años de experiencia calculados a la fecha actual (sube automáticamente). */
export function yearsOfExperience(date = new Date()): number {
  return date.getFullYear() - FOUNDING_YEAR;
}

/**
 * Sustituye el token {years} por los años de experiencia actuales.
 * Útil para textos estáticos (datos de soluciones) que no pasan por next-intl.
 */
export function withYears(text: string, date = new Date()): string {
  return text.replaceAll("{years}", String(yearsOfExperience(date)));
}
