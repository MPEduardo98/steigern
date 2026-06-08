// i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales:       ["es", "en", "de"],
  defaultLocale: "es",
  localePrefix:  "as-needed", // /es omitido, /en y /de con prefijo
});