// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale viene del segmento [locale] de la URL
  let locale = await requestLocale;

  // Si no hay locale o no es uno soportado, usar el default
  if (!locale || !routing.locales.includes(locale as "es" | "en" | "de")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});