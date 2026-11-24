// lib/analitica-reglas.ts
// Reglas puras de la analítica: de dónde viene una visita (canal y fuente) y
// qué dispositivo/navegador usa. Sin acceso a la base, se puede usar donde sea.

export type Canal = "buscador" | "ia" | "social" | "directo" | "referido" | "campana" | "correo";

export const CANALES: { value: Canal; label: string; descripcion: string }[] = [
  { value: "buscador", label: "Buscadores", descripcion: "Google, Bing, DuckDuckGo…" },
  { value: "ia", label: "Asistentes de IA", descripcion: "ChatGPT, Perplexity, Gemini, Claude…" },
  { value: "social", label: "Redes sociales", descripcion: "LinkedIn, Facebook, Instagram, WhatsApp…" },
  { value: "directo", label: "Directo", descripcion: "Escribieron la dirección o usaron un favorito" },
  { value: "referido", label: "Otros sitios", descripcion: "Enlaces desde otras páginas web" },
  { value: "campana", label: "Campañas", descripcion: "Enlaces con utm de anuncios o publicaciones" },
  { value: "correo", label: "Correo", descripcion: "Enlaces en correos electrónicos" },
];

export function etiquetaCanal(canal: string | null): string {
  return CANALES.find((c) => c.value === canal)?.label ?? "Sin clasificar";
}

/** Dominio → [canal, nombre legible]. Se compara por sufijo del host. */
const FUENTES: [string, Canal, string][] = [
  // Asistentes de IA (van antes que los buscadores: gemini.google.com ≠ google)
  ["chatgpt.com", "ia", "ChatGPT"],
  ["chat.openai.com", "ia", "ChatGPT"],
  ["openai.com", "ia", "ChatGPT"],
  ["perplexity.ai", "ia", "Perplexity"],
  ["gemini.google.com", "ia", "Gemini"],
  ["bard.google.com", "ia", "Gemini"],
  ["claude.ai", "ia", "Claude"],
  ["copilot.microsoft.com", "ia", "Copilot"],
  ["copilot.cloud.microsoft", "ia", "Copilot"],
  ["deepseek.com", "ia", "DeepSeek"],
  ["grok.com", "ia", "Grok"],
  ["meta.ai", "ia", "Meta AI"],
  ["you.com", "ia", "You.com"],
  ["phind.com", "ia", "Phind"],
  ["mistral.ai", "ia", "Mistral"],
  // Buscadores
  ["google.", "buscador", "Google"],
  ["bing.com", "buscador", "Bing"],
  ["duckduckgo.com", "buscador", "DuckDuckGo"],
  ["search.yahoo.com", "buscador", "Yahoo"],
  ["yahoo.com", "buscador", "Yahoo"],
  ["ecosia.org", "buscador", "Ecosia"],
  ["yandex.", "buscador", "Yandex"],
  ["baidu.com", "buscador", "Baidu"],
  ["search.brave.com", "buscador", "Brave Search"],
  ["qwant.com", "buscador", "Qwant"],
  ["startpage.com", "buscador", "Startpage"],
  // Redes sociales
  ["linkedin.com", "social", "LinkedIn"],
  ["lnkd.in", "social", "LinkedIn"],
  ["facebook.com", "social", "Facebook"],
  ["fb.com", "social", "Facebook"],
  ["fb.me", "social", "Facebook"],
  ["instagram.com", "social", "Instagram"],
  ["t.co", "social", "X (Twitter)"],
  ["x.com", "social", "X (Twitter)"],
  ["twitter.com", "social", "X (Twitter)"],
  ["youtube.com", "social", "YouTube"],
  ["youtu.be", "social", "YouTube"],
  ["tiktok.com", "social", "TikTok"],
  ["pinterest.", "social", "Pinterest"],
  ["reddit.com", "social", "Reddit"],
  ["whatsapp.com", "social", "WhatsApp"],
  ["wa.me", "social", "WhatsApp"],
  ["threads.net", "social", "Threads"],
  ["telegram.org", "social", "Telegram"],
  ["t.me", "social", "Telegram"],
  // Correo web
  ["mail.google.com", "correo", "Gmail"],
  ["outlook.live.com", "correo", "Outlook"],
  ["outlook.office.com", "correo", "Outlook"],
  ["mail.yahoo.com", "correo", "Yahoo Mail"],
];

// El orden importa: los correos web y las IA de Google/Yahoo deben ganar.
const FUENTES_ORDENADAS = [...FUENTES].sort((a, b) => {
  const peso = (c: Canal) => (c === "correo" ? 0 : c === "ia" ? 1 : 2);
  return peso(a[1]) - peso(b[1]);
});

function buscarFuente(texto: string): { canal: Canal; fuente: string } | null {
  const t = texto.toLowerCase().replace(/^www\./, "");
  for (const [dominio, canal, nombre] of FUENTES_ORDENADAS) {
    if (dominio.endsWith(".")) {
      // "google." cubre google.com, google.com.mx…
      if (t.startsWith(dominio) || t.includes(`.${dominio}`)) return { canal, fuente: nombre };
    } else if (t === dominio || t.endsWith(`.${dominio}`)) {
      return { canal, fuente: nombre };
    }
  }
  return null;
}

export interface Origen {
  canal: Canal;
  fuente: string | null;
}

/**
 * Clasifica el origen de una visita.
 * 1. Si trae utm_source se respeta (ChatGPT, p. ej., agrega utm_source=chatgpt.com).
 * 2. Si no, se usa el referente.
 * 3. Sin referente: directo.
 */
export function clasificarOrigen(input: {
  referente?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  hostPropio?: string | null;
}): Origen {
  const utm = input.utmSource?.trim();
  const medio = input.utmMedium?.trim().toLowerCase() ?? "";
  if (utm) {
    const conocida = buscarFuente(utm) ?? buscarFuente(`${utm}.com`);
    if (conocida) return conocida;
    if (/^(e-?mail|correo|newsletter)$/.test(medio)) return { canal: "correo", fuente: utm };
    if (/^(social|social-media|rrss)$/.test(medio)) return { canal: "social", fuente: utm };
    return { canal: "campana", fuente: utm };
  }

  let host: string | null = null;
  try {
    host = input.referente ? new URL(input.referente).hostname.toLowerCase() : null;
  } catch {
    host = null;
  }
  if (!host) return { canal: "directo", fuente: null };
  if (input.hostPropio && host.replace(/^www\./, "") === input.hostPropio.replace(/^www\./, "")) {
    return { canal: "directo", fuente: null };
  }
  return buscarFuente(host) ?? { canal: "referido", fuente: host.replace(/^www\./, "") };
}

// ── Navegador y dispositivo ───────────────────────────────────────────────

export const ES_BOT =
  /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|pagespeed|gtmetrix|curl|wget|python|axios|node-fetch|go-http|java\/|httpclient|monitor|uptime/i;

export function leerAgente(ua: string): {
  dispositivo: "movil" | "tablet" | "escritorio";
  navegador: string;
  so: string;
} {
  const dispositivo = /ipad|tablet|(android(?!.*mobile))/i.test(ua)
    ? "tablet"
    : /mobi|iphone|ipod|android/i.test(ua)
      ? "movil"
      : "escritorio";

  const navegador = /edg\//i.test(ua)
    ? "Edge"
    : /opr\/|opera/i.test(ua)
      ? "Opera"
      : /samsungbrowser/i.test(ua)
        ? "Samsung Internet"
        : /firefox|fxios/i.test(ua)
          ? "Firefox"
          : /chrome|crios/i.test(ua)
            ? "Chrome"
            : /safari/i.test(ua)
              ? "Safari"
              : "Otro";

  const so = /windows/i.test(ua)
    ? "Windows"
    : /iphone|ipad|ipod/i.test(ua)
      ? "iOS"
      : /android/i.test(ua)
        ? "Android"
        : /mac os x|macintosh/i.test(ua)
          ? "macOS"
          : /linux/i.test(ua)
            ? "Linux"
            : "Otro";

  return { dispositivo, navegador, so };
}

export const ETIQUETA_DISPOSITIVO: Record<string, string> = {
  movil: "Celular",
  tablet: "Tableta",
  escritorio: "Computadora",
};

export const ETIQUETA_TIPO_ELEMENTO: Record<string, string> = {
  whatsapp: "WhatsApp",
  telefono: "Teléfono",
  correo: "Correo",
  externo: "Enlace externo",
  interno: "Enlace interno",
  boton: "Botón",
};

/** Tipos de clic que cuentan como intento de contacto. */
export const TIPOS_CONTACTO = ["whatsapp", "telefono", "correo"] as const;
