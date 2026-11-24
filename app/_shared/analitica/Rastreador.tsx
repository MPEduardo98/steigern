// app/_shared/analitica/Rastreador.tsx
// Rastreador del sitio público: manda a /api/analitica cada página vista, cada
// clic en botones y enlaces, y cuánto tiempo y hasta dónde se leyó cada página.
// No usa cookies: solo guarda en localStorage el id de la visita en curso, que
// caduca tras 30 min sin actividad. El panel lo muestra en /admin/analitica.
//
// Para darle un nombre fijo a un botón en el panel (en vez de su texto, que
// cambia con el idioma), agrégale `data-track="Nombre"`.
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const ENDPOINT = "/api/analitica";
const CLAVE_SESION = "stg_visita";
const SESION_MAX_INACTIVA = 30 * 60 * 1000;
const RUTAS_EXCLUIDAS = /^\/(?:(?:en|de)\/)?login(?:\/|$)/;

type Evento = Record<string, string | number | boolean | null | undefined>;

function enviar(evento: Evento) {
  const cuerpo = JSON.stringify(evento);
  try {
    if (navigator.sendBeacon?.(ENDPOINT, cuerpo)) return;
  } catch {
    /* se intenta con fetch */
  }
  fetch(ENDPOINT, { method: "POST", body: cuerpo, keepalive: true }).catch(() => {});
}

function nuevoId() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Id de la visita para clics y salidas: nunca abre una visita nueva (eso solo
 * lo hace una página vista, que es la que lleva el origen). Si la visita ya
 * caducó, el evento se queda con el id viejo.
 */
function sesionExistente(): string {
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE_SESION) ?? "null") as { id: string; t: number } | null;
    if (guardada && /^[a-z0-9]{16}$/.test(guardada.id)) {
      if (Date.now() - guardada.t < SESION_MAX_INACTIVA) {
        localStorage.setItem(CLAVE_SESION, JSON.stringify({ id: guardada.id, t: Date.now() }));
      }
      return guardada.id;
    }
  } catch {
    // Sin almacenamiento: la visita vive en memoria de la pestaña.
    return sesion().id;
  }
  return nuevoId();
}

/** Devuelve la visita en curso y si es nueva (= esta es la página de entrada). */
function sesion(): { id: string; nueva: boolean } {
  const ahora = Date.now();
  try {
    const guardada = JSON.parse(localStorage.getItem(CLAVE_SESION) ?? "null") as { id: string; t: number } | null;
    if (guardada && /^[a-z0-9]{16}$/.test(guardada.id) && ahora - guardada.t < SESION_MAX_INACTIVA) {
      localStorage.setItem(CLAVE_SESION, JSON.stringify({ id: guardada.id, t: ahora }));
      return { id: guardada.id, nueva: false };
    }
    const id = nuevoId();
    localStorage.setItem(CLAVE_SESION, JSON.stringify({ id, t: ahora }));
    return { id, nueva: true };
  } catch {
    // Sin almacenamiento (modo privado estricto): una visita por pestaña.
    const w = window as unknown as { __stgVisita?: string };
    const nueva = !w.__stgVisita;
    w.__stgVisita ??= nuevoId();
    return { id: w.__stgVisita, nueva };
  }
}

function idiomaDe(ruta: string) {
  const m = ruta.match(/^\/(en|de)(?:\/|$)/);
  return m ? m[1] : "es";
}

function etiquetaDe(el: HTMLElement): string {
  const fija = el.dataset.track || el.getAttribute("aria-label") || el.getAttribute("title");
  if (fija) return fija.trim();
  const textoVisible = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
  if (textoVisible) return textoVisible.slice(0, 160);
  const img = el.querySelector("img[alt]")?.getAttribute("alt");
  return img?.trim() || "(sin texto)";
}

function clasificarEnlace(a: HTMLAnchorElement): { tipo: string; destino: string } {
  const href = a.getAttribute("href") ?? "";
  if (href.startsWith("tel:")) return { tipo: "telefono", destino: href };
  if (href.startsWith("mailto:")) return { tipo: "correo", destino: href.split("?")[0] };
  try {
    const url = new URL(a.href, location.href);
    if (/(^|\.)wa\.me$|whatsapp\.com$/.test(url.hostname)) return { tipo: "whatsapp", destino: url.origin + url.pathname };
    if (url.host !== location.host) return { tipo: "externo", destino: url.origin + url.pathname };
    return { tipo: "interno", destino: url.pathname + url.hash };
  } catch {
    return { tipo: "interno", destino: href };
  }
}

export default function Rastreador() {
  const pathname = usePathname();
  // Medición de la página actual: tiempo visible acumulado y scroll máximo.
  const pagina = useRef({ ruta: "", visibleDesde: 0, acumulado: 0, scroll: 0 });

  // Página vista (y cierre de la anterior) en cada cambio de ruta.
  useEffect(() => {
    if (!pathname || RUTAS_EXCLUIDAS.test(pathname)) return;
    // En desarrollo (Strict Mode) el efecto corre dos veces: no duplicar la vista.
    const w = window as unknown as { __stgUltimaVista?: { ruta: string; t: number } };
    const repetida = w.__stgUltimaVista?.ruta === pathname && Date.now() - w.__stgUltimaVista.t < 1000;
    w.__stgUltimaVista = { ruta: pathname, t: Date.now() };
    const { id, nueva } = sesion();
    const params = new URLSearchParams(location.search);
    if (!repetida) enviar({
      tipo: "vista",
      sesion: id,
      ruta: pathname,
      idioma: idiomaDe(pathname),
      entrada: nueva,
      referente: nueva ? document.referrer || null : null,
      utmSource: nueva ? params.get("utm_source") : null,
      utmMedium: nueva ? params.get("utm_medium") : null,
      utmCampaign: nueva ? params.get("utm_campaign") : null,
    });
    pagina.current = { ruta: pathname, visibleDesde: Date.now(), acumulado: 0, scroll: 0 };

    const salida = () => {
      const p = pagina.current;
      if (!p.ruta) return;
      const duracion = p.acumulado + (p.visibleDesde ? Date.now() - p.visibleDesde : 0);
      if (duracion < 500 && p.scroll === 0) return;
      enviar({
        tipo: "salida",
        sesion: sesionExistente(),
        ruta: p.ruta,
        idioma: idiomaDe(p.ruta),
        duracionMs: Math.round(duracion),
        scrollPct: p.scroll,
      });
      // Lo ya enviado no se vuelve a contar si la pestaña regresa.
      p.acumulado = 0;
      p.visibleDesde = 0;
    };
    // Al cambiar de ruta, el cleanup cierra esta página.
    return salida;
  }, [pathname]);

  // Scroll, visibilidad y clics: una sola vez.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const alto = doc.scrollHeight - window.innerHeight;
      const pct = alto <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / alto) * 100));
      if (pct > pagina.current.scroll) pagina.current.scroll = pct;
    };

    const onVisibilidad = () => {
      const p = pagina.current;
      if (!p.ruta) return;
      if (document.visibilityState === "hidden") {
        // En celulares "pagehide" no siempre llega: se cierra aquí.
        const duracion = p.acumulado + (p.visibleDesde ? Date.now() - p.visibleDesde : 0);
        if (duracion >= 500) {
          enviar({
            tipo: "salida",
            sesion: sesionExistente(),
            ruta: p.ruta,
            idioma: idiomaDe(p.ruta),
            duracionMs: Math.round(duracion),
            scrollPct: p.scroll,
          });
        }
        p.acumulado = 0;
        p.visibleDesde = 0;
      } else {
        p.visibleDesde = Date.now();
      }
    };

    const onClic = (ev: MouseEvent) => {
      const ruta = location.pathname;
      if (RUTAS_EXCLUIDAS.test(ruta)) return;
      const el = (ev.target as Element | null)?.closest<HTMLElement>(
        "a[href], button, [data-track], [role='button'], input[type='submit']"
      );
      if (!el) return;
      const enlace = el.closest<HTMLAnchorElement>("a[href]");
      const { tipo, destino } = enlace ? clasificarEnlace(enlace) : { tipo: "boton", destino: null };
      enviar({
        tipo: "clic",
        sesion: sesionExistente(),
        ruta,
        idioma: idiomaDe(ruta),
        elemento: etiquetaDe(enlace ?? el),
        destino,
        tipoElemento: tipo,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibilidad);
    document.addEventListener("click", onClic, { capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibilidad);
      document.removeEventListener("click", onClic, { capture: true });
    };
  }, []);

  return null;
}
