import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/portal-proveedores/"],
      },
    ],
    sitemap: "https://steigern.com.mx/sitemap.xml",
    host: "https://steigern.com.mx",
  };
}