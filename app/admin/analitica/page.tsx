// app/admin/analitica/page.tsx
// Tablero de analítica del sitio público: cuántos visitan, de dónde llegan
// (buscadores, IA, redes…), qué páginas leen y qué botones usan.
// Los datos los junta app/_shared/analitica/Rastreador.tsx.
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import { getTablero, RANGOS, type Rango } from "@root/lib/analitica";
import {
  CANALES,
  ETIQUETA_DISPOSITIVO,
  ETIQUETA_TIPO_ELEMENTO,
  etiquetaCanal,
} from "@root/lib/analitica-reglas";
import { ListaVacia } from "../_components/socios/comunes";
import { GraficaDiaria, Indicador, ListaBarras, Tarjeta, fmtDuracion, fmtNum } from "./_components/graficas";

export const metadata = { title: "Analítica" };

interface Props {
  searchParams: Promise<{ dias?: string }>;
}

const IDIOMAS: Record<string, string> = { es: "Español", en: "Inglés", de: "Alemán" };
const paisNombre = (() => {
  const nombres = new Intl.DisplayNames(["es-MX"], { type: "region" });
  return (codigo: string) => {
    try {
      return nombres.of(codigo) ?? codigo;
    } catch {
      return codigo;
    }
  };
})();

const ESTILO_TIPO: Record<string, string> = {
  whatsapp: "erp-badge-ok",
  telefono: "erp-badge-ok",
  correo: "erp-badge-ok",
  externo: "erp-badge-warn",
  interno: "erp-badge-off",
  boton: "erp-badge-off",
};

export default async function AnaliticaPage({ searchParams }: Props) {
  await requireAdminPage();

  const sp = await searchParams;
  const rango: Rango = RANGOS.some((r) => r.value === sp.dias) ? (sp.dias as Rango) : "30";
  const dias = Number(rango);
  const t = await getTablero(dias);

  const filtros = (
    <nav className="erp-tabs" aria-label="Periodo">
      {RANGOS.map((r) => (
        <Link
          key={r.value}
          href={r.value === "30" ? "/admin/analitica" : `/admin/analitica?dias=${r.value}`}
          replace
          scroll={false}
          aria-current={rango === r.value ? "page" : undefined}
          className="erp-tab"
        >
          {r.label}
        </Link>
      ))}
    </nav>
  );

  if (!t) {
    return (
      <div className="erp-page">
        <div className="erp-page-head">
          <p className="erp-page-desc">Qué hacen los visitantes en el sitio web y de dónde llegan.</p>
          {filtros}
        </div>
        <p className="erp-card border-l-[3px] !border-l-[#e02020] px-4 py-3 text-[13px] text-[#525252]">
          No se pudieron leer los datos de analítica. Revisa la conexión con la base de datos y que la migración
          <code className="mx-1 font-mono text-[12px]">006-analitica.sql</code>
          esté aplicada.
        </p>
      </div>
    );
  }

  const { actual, anterior } = t;
  const totalEntradas = t.canales.reduce((s, c) => s + c.visitas, 0);
  const sinDatos = actual.visitas === 0;

  // Los canales siempre en el mismo orden, aunque alguno tenga cero.
  const canales = CANALES.map((c) => ({
    ...c,
    visitas: t.canales.find((x) => x.clave === c.value)?.visitas ?? 0,
  })).filter((c) => c.visitas > 0 || ["buscador", "ia", "social", "directo"].includes(c.value));

  return (
    <div className="erp-page space-y-4">
      <div className="erp-page-head !mb-2">
        <p className="erp-page-desc">
          Qué hacen los visitantes en el sitio web y de dónde llegan. Datos propios, sin cookies.
        </p>
        {filtros}
      </div>

      {sinDatos && (
        <div className="erp-card">
          <ListaVacia
            icon={<FontAwesomeIcon icon={faChartLine} className="h-4 w-4" />}
            titulo={`Sin visitas en los últimos ${dias} días.`}
            detalle="El sitio público registra cada visita en automático; los datos aparecerán aquí en cuanto alguien entre."
          />
        </div>
      )}

      <section aria-label="Indicadores" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Indicador
          label="Visitas"
          valor={fmtNum(actual.visitas)}
          nota={`${fmtNum(actual.visitantes)} visitantes distintos`}
          actual={actual.visitas}
          anterior={anterior.visitas}
          delay={40}
        />
        <Indicador
          label="Páginas vistas"
          valor={fmtNum(actual.paginas)}
          nota={`${actual.visitas ? (actual.paginas / actual.visitas).toFixed(1) : "0"} páginas por visita`}
          actual={actual.paginas}
          anterior={anterior.paginas}
          delay={80}
        />
        <Indicador
          label="Tiempo por visita"
          valor={fmtDuracion(actual.tiempoPorVisita)}
          nota="Tiempo con la página en pantalla"
          actual={actual.tiempoPorVisita}
          anterior={anterior.tiempoPorVisita}
          delay={120}
        />
        <Indicador
          label="Rebote"
          valor={`${Math.round(actual.rebote)} %`}
          nota="Vieron una página y se fueron sin hacer clic"
          actual={actual.rebote}
          anterior={anterior.rebote}
          menosEsMejor
          delay={160}
        />
        <Indicador
          label="Intentos de contacto"
          valor={fmtNum(actual.contactos)}
          nota="Clics en WhatsApp, teléfono o correo"
          actual={actual.contactos}
          anterior={anterior.contactos}
          delay={200}
        />
      </section>

      <Tarjeta titulo="Visitas por día" subtitulo="Pasa el mouse sobre una barra para ver el detalle" delay={220}>
        <div className="px-5 pb-4 pt-6">
          <GraficaDiaria serie={t.serie} />
        </div>
      </Tarjeta>

      <div className="grid gap-4 lg:grid-cols-2">
        <Tarjeta titulo="¿De dónde llegan?" subtitulo="Visitas según el canal de origen" delay={260}>
          <ListaBarras
            total={totalEntradas}
            vacio="Todavía no hay visitas."
            filas={canales.map((c) => ({
              key: c.value,
              label: c.label,
              detalle: c.descripcion,
              valor: c.visitas,
            }))}
          />
        </Tarjeta>

        <Tarjeta titulo="Sitios de origen" subtitulo="Buscador, IA, red social o página que los mandó" delay={300}>
          <ListaBarras
            total={totalEntradas}
            vacio="Aún no hay visitas desde otros sitios."
            filas={t.fuentes.map((f) => ({
              key: `${f.canal}-${f.fuente}`,
              label: f.fuente,
              detalle: etiquetaCanal(f.canal),
              valor: f.visitas,
            }))}
          />
        </Tarjeta>
      </div>

      <Tarjeta titulo="Botones y enlaces más usados" subtitulo="Cada clic en el sitio, agrupado por el texto del botón" delay={340}>
        {t.clics.length === 0 ? (
          <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">Aún no hay clics registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Botón o enlace</th>
                  <th>Tipo</th>
                  <th>Lleva a</th>
                  <th>Dónde se usó</th>
                  <th className="text-right">Clics</th>
                  <th className="text-right">Visitas</th>
                </tr>
              </thead>
              <tbody>
                {t.clics.map((c, i) => (
                  <tr key={i}>
                    <td className="max-w-[260px] truncate font-medium" title={c.elemento}>
                      {c.elemento}
                    </td>
                    <td>
                      <span className={`erp-badge ${ESTILO_TIPO[c.tipo] ?? "erp-badge-off"}`}>
                        {ETIQUETA_TIPO_ELEMENTO[c.tipo] ?? c.tipo}
                      </span>
                    </td>
                    <td className="max-w-[240px] truncate font-mono text-[12px] text-[#525252]" title={c.destino ?? ""}>
                      {c.destino ?? "—"}
                    </td>
                    <td className="max-w-[240px] truncate font-mono text-[12px] text-[#737373]" title={c.paginas}>
                      {c.paginas}
                    </td>
                    <td className="text-right tabular-nums">{fmtNum(c.clics)}</td>
                    <td className="text-right tabular-nums text-[#525252]">{fmtNum(c.visitas)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Tarjeta>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Tarjeta titulo="Páginas más vistas" subtitulo="Cuánto se leen y hasta dónde bajan" delay={380}>
          {t.paginas.length === 0 ? (
            <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">Aún no hay páginas vistas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="erp-table">
                <thead>
                  <tr>
                    <th>Página</th>
                    <th className="text-right">Vistas</th>
                    <th className="text-right">Visitas</th>
                    <th className="text-right">Tiempo medio</th>
                    <th className="text-right">Scroll medio</th>
                  </tr>
                </thead>
                <tbody>
                  {t.paginas.map((p) => (
                    <tr key={p.ruta}>
                      <td className="max-w-[300px] truncate font-mono text-[12.5px]" title={p.ruta}>
                        {p.ruta}
                      </td>
                      <td className="text-right tabular-nums">{fmtNum(p.vistas)}</td>
                      <td className="text-right tabular-nums text-[#525252]">{fmtNum(p.visitas)}</td>
                      <td className="whitespace-nowrap text-right tabular-nums text-[#525252]">{fmtDuracion(p.tiempo)}</td>
                      <td className="text-right tabular-nums text-[#525252]">
                        {p.scroll === null ? "—" : `${Math.round(p.scroll)} %`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Tarjeta>

        <Tarjeta titulo="Páginas de entrada" subtitulo="La primera página que ven al llegar" delay={420}>
          <ListaBarras
            total={totalEntradas}
            vacio="Todavía no hay visitas."
            filas={t.entradas.map((e) => ({
              key: e.clave ?? "-",
              label: <span className="font-mono text-[12.5px]">{e.clave}</span>,
              valor: e.visitas,
            }))}
          />
        </Tarjeta>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Tarjeta titulo="Dispositivos" delay={460}>
          <ListaBarras
            total={totalEntradas}
            vacio="Sin datos."
            filas={t.dispositivos.map((d) => ({
              key: d.clave ?? "-",
              label: ETIQUETA_DISPOSITIVO[d.clave ?? ""] ?? "Desconocido",
              valor: d.visitas,
            }))}
          />
        </Tarjeta>
        <Tarjeta titulo="Navegadores" delay={480}>
          <ListaBarras
            total={totalEntradas}
            vacio="Sin datos."
            filas={t.navegadores.map((d) => ({ key: d.clave ?? "-", label: d.clave ?? "Desconocido", valor: d.visitas }))}
          />
        </Tarjeta>
        <Tarjeta titulo="Idioma del sitio" delay={500}>
          <ListaBarras
            total={totalEntradas}
            vacio="Sin datos."
            filas={t.idiomas.map((d) => ({
              key: d.clave ?? "-",
              label: IDIOMAS[d.clave ?? ""] ?? "Desconocido",
              valor: d.visitas,
            }))}
          />
        </Tarjeta>
        <Tarjeta titulo="Países" subtitulo="Solo si el servidor informa el país" delay={520}>
          <ListaBarras
            total={totalEntradas}
            vacio="El servidor no informa el país de los visitantes."
            filas={t.paises
              .filter((d) => d.clave)
              .map((d) => ({ key: d.clave!, label: paisNombre(d.clave!), valor: d.visitas }))}
          />
        </Tarjeta>
      </div>

      {t.campanas.length > 0 && (
        <Tarjeta titulo="Campañas" subtitulo="Enlaces con utm_campaign (anuncios, publicaciones, correos)" delay={540}>
          <ListaBarras
            total={totalEntradas}
            vacio=""
            filas={t.campanas.map((c) => ({
              key: c.campana,
              label: c.campana,
              detalle: c.fuente ?? undefined,
              valor: c.visitas,
            }))}
          />
        </Tarjeta>
      )}

      <p className="px-1 text-[11.5px] leading-relaxed text-[#a3a3a3]">
        Una visita termina tras 30 minutos sin actividad. Los visitantes se cuentan por día con un identificador
        anónimo que no usa cookies. Los porcentajes son sobre {fmtNum(totalEntradas)} visitas del periodo.
      </p>
    </div>
  );
}
