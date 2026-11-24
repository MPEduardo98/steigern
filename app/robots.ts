import type { MetadataRoute } from "next";

// Bots de IA permitidos de forma explícita (búsqueda y entrenamiento).
// Un bot que coincide con un grupo propio ignora el grupo "*", por eso cada
// grupo repite los disallow.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

const DISALLOW = ["/api/", "/admin/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW },
    ],
    sitemap: "https://steigern.com.mx/sitemap.xml",
    host: "https://steigern.com.mx",
  };
}
