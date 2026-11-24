// lib/analitica.ts
// Consultas del tablero de analítica (/admin/analitica) sobre analitica_eventos.
// Las fechas se guardan en UTC; los días se agrupan en hora del centro de
// México (UTC-6, sin horario de verano desde 2022).
import type { RowDataPacket } from "mysql2";
import pool from "@root/lib/db";

export const RANGOS = [
  { value: "7", label: "7 días" },
  { value: "30", label: "30 días" },
  { value: "90", label: "90 días" },
] as const;
export type Rango = (typeof RANGOS)[number]["value"];

const TZ = "'-06:00'";
const DIA_LOCAL = `DATE(CONVERT_TZ(creado_en, '+00:00', ${TZ}))`;

/** Condición de periodo: los últimos `dias` días, desplazado `atras` periodos. */
function periodo(dias: number, atras = 0) {
  return {
    sql: "creado_en >= UTC_TIMESTAMP() - INTERVAL ? DAY AND creado_en < UTC_TIMESTAMP() - INTERVAL ? DAY",
    params: [dias * (atras + 1), dias * atras],
  };
}

export interface Resumen {
  visitas: number;
  visitantes: number;
  paginas: number;
  /** Milisegundos de lectura por visita. */
  tiempoPorVisita: number;
  /** % de visitas que vieron una sola página y no hicieron clic. */
  rebote: number;
  contactos: number;
}

async function resumenDe(dias: number, atras: number): Promise<Resumen> {
  const p = periodo(dias, atras);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT
       COUNT(DISTINCT CASE WHEN tipo = 'vista' THEN sesion_id END)    AS visitas,
       COUNT(DISTINCT CASE WHEN tipo = 'vista' THEN visitante_id END) AS visitantes,
       SUM(tipo = 'vista')                                            AS paginas,
       COALESCE(SUM(CASE WHEN tipo = 'salida' THEN duracion_ms END), 0) AS duracion,
       SUM(tipo = 'clic' AND tipo_elemento IN ('whatsapp','telefono','correo')) AS contactos
     FROM analitica_eventos
     WHERE ${p.sql}`,
    p.params
  );
  const [rebote] = await pool.query<RowDataPacket[]>(
    `SELECT COUNT(*) AS sesiones, SUM(vistas = 1 AND clics = 0) AS rebotes
       FROM (SELECT sesion_id, SUM(tipo = 'vista') AS vistas, SUM(tipo = 'clic') AS clics
               FROM analitica_eventos
              WHERE ${p.sql}
              GROUP BY sesion_id
             HAVING vistas > 0) s`,
    p.params
  );
  const r = rows[0];
  const visitas = Number(r.visitas ?? 0);
  const sesiones = Number(rebote[0].sesiones ?? 0);
  return {
    visitas,
    visitantes: Number(r.visitantes ?? 0),
    paginas: Number(r.paginas ?? 0),
    tiempoPorVisita: visitas ? Number(r.duracion) / visitas : 0,
    rebote: sesiones ? (Number(rebote[0].rebotes ?? 0) / sesiones) * 100 : 0,
    contactos: Number(r.contactos ?? 0),
  };
}

export interface PuntoDia {
  dia: string; // YYYY-MM-DD
  visitas: number;
  paginas: number;
}

async function serieDiaria(dias: number): Promise<PuntoDia[]> {
  const p = periodo(dias);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT DATE_FORMAT(${DIA_LOCAL}, '%Y-%m-%d') AS dia,
            COUNT(DISTINCT sesion_id) AS visitas, COUNT(*) AS paginas
       FROM analitica_eventos
      WHERE tipo = 'vista' AND ${p.sql}
      GROUP BY dia`,
    p.params
  );
  const porDia = new Map(rows.map((r) => [String(r.dia), r]));
  // Rellena los días sin visitas para que la gráfica no se salte fechas.
  const hoyLocal = new Date(Date.now() - 6 * 60 * 60 * 1000);
  return Array.from({ length: dias }, (_, i) => {
    const d = new Date(hoyLocal);
    d.setUTCDate(d.getUTCDate() - (dias - 1 - i));
    const dia = d.toISOString().slice(0, 10);
    const r = porDia.get(dia);
    return { dia, visitas: Number(r?.visitas ?? 0), paginas: Number(r?.paginas ?? 0) };
  });
}

export interface Conteo {
  clave: string | null;
  visitas: number;
}

/** Agrupa las visitas (página de entrada) por una columna. */
async function porEntrada(columna: string, dias: number, limite = 12): Promise<Conteo[]> {
  const p = periodo(dias);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT ${columna} AS clave, COUNT(DISTINCT sesion_id) AS visitas
       FROM analitica_eventos
      WHERE tipo = 'vista' AND es_entrada = 1 AND ${p.sql}
      GROUP BY ${columna}
      ORDER BY visitas DESC
      LIMIT ${limite}`,
    p.params
  );
  return rows.map((r) => ({ clave: r.clave === null ? null : String(r.clave), visitas: Number(r.visitas) }));
}

export interface Fuente {
  canal: string | null;
  fuente: string;
  visitas: number;
}

async function fuentes(dias: number): Promise<Fuente[]> {
  const p = periodo(dias);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT canal, fuente, COUNT(DISTINCT sesion_id) AS visitas
       FROM analitica_eventos
      WHERE tipo = 'vista' AND es_entrada = 1 AND fuente IS NOT NULL AND ${p.sql}
      GROUP BY canal, fuente
      ORDER BY visitas DESC
      LIMIT 15`,
    p.params
  );
  return rows.map((r) => ({ canal: r.canal, fuente: String(r.fuente), visitas: Number(r.visitas) }));
}

export interface Pagina {
  ruta: string;
  vistas: number;
  visitas: number;
  entradas: number;
  /** Milisegundos de lectura promedio por vista. */
  tiempo: number;
  scroll: number | null;
}

async function paginas(dias: number): Promise<Pagina[]> {
  const p = periodo(dias);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT ruta,
            SUM(tipo = 'vista') AS vistas,
            COUNT(DISTINCT CASE WHEN tipo = 'vista' THEN sesion_id END) AS visitas,
            SUM(es_entrada) AS entradas,
            COALESCE(SUM(CASE WHEN tipo = 'salida' THEN duracion_ms END), 0) AS duracion,
            AVG(CASE WHEN tipo = 'salida' THEN scroll_pct END) AS scroll
       FROM analitica_eventos
      WHERE tipo IN ('vista','salida') AND ${p.sql}
      GROUP BY ruta
     HAVING vistas > 0
      ORDER BY vistas DESC
      LIMIT 15`,
    p.params
  );
  return rows.map((r) => ({
    ruta: String(r.ruta),
    vistas: Number(r.vistas),
    visitas: Number(r.visitas),
    entradas: Number(r.entradas),
    tiempo: Number(r.vistas) ? Number(r.duracion) / Number(r.vistas) : 0,
    scroll: r.scroll === null ? null : Number(r.scroll),
  }));
}

export interface Clic {
  elemento: string;
  tipo: string;
  destino: string | null;
  clics: number;
  visitas: number;
  paginas: string;
}

async function clics(dias: number): Promise<Clic[]> {
  const p = periodo(dias);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COALESCE(elemento, '(sin texto)') AS elemento, COALESCE(tipo_elemento, 'boton') AS tipo, destino,
            COUNT(*) AS clics, COUNT(DISTINCT sesion_id) AS visitas,
            SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT ruta ORDER BY ruta SEPARATOR '  ·  '), '  ·  ', 3) AS paginas
       FROM analitica_eventos
      WHERE tipo = 'clic' AND ${p.sql}
      GROUP BY elemento, tipo_elemento, destino
      ORDER BY clics DESC
      LIMIT 20`,
    p.params
  );
  return rows.map((r) => ({
    elemento: String(r.elemento),
    tipo: String(r.tipo),
    destino: r.destino,
    clics: Number(r.clics),
    visitas: Number(r.visitas),
    paginas: String(r.paginas ?? ""),
  }));
}

export interface Campana {
  campana: string;
  fuente: string | null;
  visitas: number;
}

async function campanas(dias: number): Promise<Campana[]> {
  const p = periodo(dias);
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT utm_campaign AS campana, MAX(utm_source) AS fuente, COUNT(DISTINCT sesion_id) AS visitas
       FROM analitica_eventos
      WHERE tipo = 'vista' AND es_entrada = 1 AND utm_campaign IS NOT NULL AND ${p.sql}
      GROUP BY utm_campaign
      ORDER BY visitas DESC
      LIMIT 10`,
    p.params
  );
  return rows.map((r) => ({ campana: String(r.campana), fuente: r.fuente, visitas: Number(r.visitas) }));
}

export interface Tablero {
  actual: Resumen;
  anterior: Resumen;
  serie: PuntoDia[];
  canales: Conteo[];
  fuentes: Fuente[];
  paginas: Pagina[];
  entradas: Conteo[];
  clics: Clic[];
  dispositivos: Conteo[];
  navegadores: Conteo[];
  idiomas: Conteo[];
  paises: Conteo[];
  campanas: Campana[];
}

/** Todo el tablero de un rango. Devuelve null si la base no responde. */
export async function getTablero(dias: number): Promise<Tablero | null> {
  try {
    const [actual, anterior, serie, canales, fs, pgs, entradas, cls, dispositivos, navegadores, idiomas, paises, cps] =
      await Promise.all([
        resumenDe(dias, 0),
        resumenDe(dias, 1),
        serieDiaria(dias),
        porEntrada("canal", dias),
        fuentes(dias),
        paginas(dias),
        porEntrada("ruta", dias, 10),
        clics(dias),
        porEntrada("dispositivo", dias),
        porEntrada("navegador", dias, 6),
        porEntrada("idioma", dias),
        porEntrada("pais", dias, 8),
        campanas(dias),
      ]);
    return {
      actual,
      anterior,
      serie,
      canales,
      fuentes: fs,
      paginas: pgs,
      entradas,
      clics: cls,
      dispositivos,
      navegadores,
      idiomas,
      paises,
      campanas: cps,
    };
  } catch (err) {
    console.error("[analitica] No se pudo leer el tablero", err);
    return null;
  }
}
