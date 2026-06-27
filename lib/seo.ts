// lib/seo.ts
// Utilidades SEO compartidas: URLs absolutas, canonical y hreflang por idioma.
// Centraliza la lógica para que homepage, nosotros, contacto, soluciones y el
// sitemap construyan los mismos alternates de forma consistente.
import type { Metadata } from "next";
import { routing } from "@root/i18n/routing";

export const SITE = "https://steigern.com.mx";

/** Imagen Open Graph generada dinámicamente en /opengraph-image. */
export const OG_IMAGE = "/opengraph-image";

/** Idiomas soportados, derivados del routing de next-intl. */
export type AppLocale = (typeof routing.locales)[number];

/** Mapa de locale de la app -> locale Open Graph (BCP-47 con región). */
const OG_LOCALE: Record<string, string> = {
  es: "es_MX",
  en: "en_US",
  de: "de_DE",
};

/**
 * Prefijo de URL para un idioma.
 * localePrefix "as-needed": el español (default) va sin prefijo; en/de con prefijo.
 */
export function localePrefix(locale: string): string {
  return locale === routing.defaultLocale ? "" : `/${locale}`;
}

/** URL absoluta de un path interno para un idioma concreto. */
export function localizedUrl(locale: string, path = ""): string {
  return `${SITE}${localePrefix(locale)}${path}`;
}

/** URL absoluta a partir de un path (sin tener en cuenta el idioma). */
export function absoluteUrl(path = ""): string {
  return `${SITE}${path}`;
}

/**
 * Mapa de alternates hreflang para un path SIN prefijo de locale.
 * Ej. hreflangAlternates("/soluciones") -> { es, en, de, "x-default" }.
 */
export function hreflangAlternates(path = ""): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, path);
  }
  // x-default apunta a la versión por defecto (español, sin prefijo).
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return languages;
}

/** Locale Open Graph para un idioma de la app. */
export function ogLocale(locale: string): string {
  return OG_LOCALE[locale] ?? OG_LOCALE[routing.defaultLocale];
}

/** Locales Open Graph alternativos (todos menos el actual). */
export function ogAlternateLocales(locale: string): string[] {
  return routing.locales.filter((l) => l !== locale).map((l) => ogLocale(l));
}

/**
 * Construye el bloque `alternates` (canonical + languages) para un path.
 * Úsalo en cada generateMetadata para evitar canonicals duplicados entre idiomas.
 */
export function buildAlternates(locale: string, path = ""): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, path),
    languages: hreflangAlternates(path),
  };
}
