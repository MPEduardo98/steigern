// app/api/analitica/route.ts
// Recibe los eventos del rastreador del sitio público (app/_shared/analitica).
// Es público a propósito (lo llama cualquier visitante), así que valida todo,
// recorta tamaños, ignora bots y limita cuántos eventos acepta por IP.
// Responde siempre 204: el rastreador no hace nada con la respuesta.
import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import { z } from "zod";
import pool from "@root/lib/db";
import { ES_BOT, clasificarOrigen, leerAgente } from "@root/lib/analitica-reglas";

const texto = (max: number) =>
  z
    .string()
    .trim()
    .transform((v) => v.slice(0, max))
    .nullish();

const Evento = z.object({
  tipo: z.enum(["vista", "clic", "salida"]),
  sesion: z.string().regex(/^[a-z0-9]{16}$/),
  ruta: z.string().trim().min(1).max(300).startsWith("/"),
  idioma: z.enum(["es", "en", "de"]).nullish(),
  entrada: z.boolean().optional(),
  referente: texto(500),
  utmSource: texto(120),
  utmMedium: texto(120),
  utmCampaign: texto(120),
  elemento: texto(160),
  destino: texto(500),
  tipoElemento: z.enum(["whatsapp", "telefono", "correo", "externo", "interno", "boton"]).nullish(),
  duracionMs: z.number().int().min(0).max(6 * 60 * 60 * 1000).nullish(),
  scrollPct: z.number().int().min(0).max(100).nullish(),
});

const vacio = () => new Response(null, { status: 204 });

// Límite sencillo en memoria: suficiente para frenar abusos de un solo origen.
const LIMITE_POR_MINUTO = 120;
const contadores = new Map<string, { n: number; desde: number }>();
function excedeLimite(ip: string): boolean {
  const ahora = Date.now();
  const c = contadores.get(ip);
  if (!c || ahora - c.desde > 60_000) {
    if (contadores.size > 5000) contadores.clear();
    contadores.set(ip, { n: 1, desde: ahora });
    return false;
  }
  c.n += 1;
  return c.n > LIMITE_POR_MINUTO;
}

/** Hash anónimo que cambia cada día: cuenta visitantes sin poder seguirlos. */
function visitanteDelDia(ip: string, ua: string): string {
  const dia = new Date().toISOString().slice(0, 10);
  const sal = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "steigern";
  return createHash("sha256").update(`${sal}|${dia}|${ip}|${ua}`).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || ES_BOT.test(ua)) return vacio();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";
  if (excedeLimite(ip)) return vacio();

  let datos: unknown;
  try {
    const cuerpo = await req.text();
    if (cuerpo.length > 4000) return vacio();
    datos = JSON.parse(cuerpo);
  } catch {
    return vacio();
  }
  const parsed = Evento.safeParse(datos);
  if (!parsed.success) return vacio();
  const e = parsed.data;

  // El origen solo importa en la primera página de la visita.
  const origen = e.entrada
    ? clasificarOrigen({
        referente: e.referente,
        utmSource: e.utmSource,
        utmMedium: e.utmMedium,
        hostPropio: req.headers.get("host"),
      })
    : null;
  const agente = leerAgente(ua);
  const pais =
    req.headers.get("cf-ipcountry") ?? req.headers.get("x-vercel-ip-country") ?? req.headers.get("x-country-code");

  try {
    await pool.query(
      `INSERT INTO analitica_eventos
         (tipo, sesion_id, visitante_id, ruta, idioma, es_entrada, canal, fuente, referente,
          utm_source, utm_medium, utm_campaign, elemento, destino, tipo_elemento,
          duracion_ms, scroll_pct, dispositivo, navegador, so, pais)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        e.tipo,
        e.sesion,
        visitanteDelDia(ip, ua),
        e.ruta,
        e.idioma ?? null,
        e.tipo === "vista" && e.entrada ? 1 : 0,
        origen?.canal ?? null,
        origen?.fuente ?? null,
        e.entrada ? (e.referente ?? null) : null,
        e.entrada ? (e.utmSource ?? null) : null,
        e.entrada ? (e.utmMedium ?? null) : null,
        e.entrada ? (e.utmCampaign ?? null) : null,
        e.tipo === "clic" ? (e.elemento ?? null) : null,
        e.tipo === "clic" ? (e.destino ?? null) : null,
        e.tipo === "clic" ? (e.tipoElemento ?? "boton") : null,
        e.tipo === "salida" ? (e.duracionMs ?? null) : null,
        e.tipo === "salida" ? (e.scrollPct ?? null) : null,
        agente.dispositivo,
        agente.navegador,
        agente.so,
        pais && /^[A-Z]{2}$/.test(pais) && pais !== "XX" ? pais : null,
      ]
    );
  } catch (err) {
    console.error("[analitica] No se pudo guardar el evento", err);
  }
  return vacio();
}
