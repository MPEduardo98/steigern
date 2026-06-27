import type { MetadataRoute } from "next";
import { routing } from "@root/i18n/routing";
import { localizedUrl, hreflangAlternates } from "@root/lib/seo";
import { solutions } from "./[locale]/(soluciones)/soluciones/_data/solutions";

// Genera una entrada por idioma para cada ruta, con sus alternates hreflang.
// Google usa estos alternates para servir la versión correcta por región/idioma.
type RouteDef = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const routes: RouteDef[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/soluciones", changeFrequency: "weekly", priority: 0.9 },
  { path: "/nosotros", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contacto", changeFrequency: "monthly", priority: 0.7 },
  ...solutions.map((s) => ({
    path: `/soluciones/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) => {
    const languages = hreflangAlternates(route.path);
    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });
}
