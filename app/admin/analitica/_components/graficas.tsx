// app/admin/analitica/_components/graficas.tsx
// Piezas visuales del tablero: indicador con comparación, gráfica diaria y
// listas de barras. Todo en Server Components; el detalle al pasar el mouse
// se resuelve con CSS (group-hover), sin JavaScript.
import type { ReactNode } from "react";
import type { PuntoDia } from "@root/lib/analitica";

export const fmtNum = (n: number) => Math.round(n).toLocaleString("es-MX");

export function fmtDuracion(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  return `${m} min ${String(s % 60).padStart(2, "0")} s`;
}

export function fmtPct(n: number, total: number) {
  return total ? `${Math.round((n / total) * 100)} %` : "0 %";
}

export function Indicador({
  label,
  valor,
  nota,
  actual,
  anterior,
  menosEsMejor = false,
  delay = 0,
}: {
  label: string;
  valor: string;
  nota: string;
  actual: number;
  anterior: number;
  menosEsMejor?: boolean;
  delay?: number;
}) {
  let cambio: ReactNode = <span className="text-[#a3a3a3]">Sin datos del periodo anterior</span>;
  if (anterior > 0) {
    const pct = ((actual - anterior) / anterior) * 100;
    const bueno = menosEsMejor ? pct < 0 : pct > 0;
    const igual = Math.abs(pct) < 0.5;
    cambio = (
      <span className={igual ? "text-[#737373]" : bueno ? "text-[#15803d]" : "text-[#c41a1a]"}>
        {igual ? "Igual" : `${pct > 0 ? "▲" : "▼"} ${Math.abs(Math.round(pct))} %`}
        <span className="text-[#a3a3a3]"> vs. periodo anterior</span>
      </span>
    );
  }
  return (
    <div className="erp-card erp-entrar p-5" style={{ animationDelay: `${delay}ms` }}>
      <p className="text-[13px] text-[#737373]">{label}</p>
      <p className="mt-3 text-[28px] font-semibold leading-none tracking-tight tabular-nums">{valor}</p>
      <p className="mt-3 text-[12px]">{cambio}</p>
      <p className="mt-1 text-[11.5px] text-[#a3a3a3]">{nota}</p>
    </div>
  );
}

function fechaCorta(dia: string, conDiaSemana = false) {
  const d = new Date(`${dia}T12:00:00Z`);
  return d.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    ...(conDiaSemana ? { weekday: "short" } : {}),
    timeZone: "UTC",
  });
}

/** Visitas por día: barras verticales con detalle al pasar el mouse. */
export function GraficaDiaria({ serie }: { serie: PuntoDia[] }) {
  const max = Math.max(1, ...serie.map((p) => p.visitas));
  // Escala "redonda" para la línea guía superior.
  const paso = max <= 5 ? 1 : max <= 20 ? 5 : max <= 100 ? 20 : max <= 500 ? 100 : 500;
  const tope = Math.ceil(max / paso) * paso;
  const etiquetas = serie.length <= 7 ? 1 : serie.length <= 31 ? 5 : 15;

  return (
    <div>
      <div className="relative h-[180px]">
        {[1, 0.5, 0].map((f) => (
          <div key={f} className="absolute inset-x-0 border-t border-dashed border-[#ebebeb]" style={{ bottom: `${f * 100}%` }}>
            <span className="absolute -top-2.5 left-0 bg-white pr-1.5 text-[10.5px] tabular-nums text-[#a3a3a3]">
              {fmtNum(tope * f)}
            </span>
          </div>
        ))}
        <ol className="absolute inset-y-0 left-8 right-0 flex items-end gap-[2px]" aria-label="Visitas por día">
          {serie.map((p) => (
            <li key={p.dia} className="group relative flex h-full flex-1 items-end justify-center">
              <span
                className="w-full max-w-[28px] rounded-t-[4px] bg-[#e02020] transition-opacity group-hover:opacity-80"
                style={{ height: `${(p.visitas / tope) * 100}%`, minHeight: p.visitas ? 2 : 0 }}
              />
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0a0a0a] px-2.5 py-1.5 text-[11.5px] leading-tight text-white shadow-lg group-hover:block">
                <span className="block text-[#a3a3a3]">{fechaCorta(p.dia, true)}</span>
                <span className="block tabular-nums">
                  {fmtNum(p.visitas)} visitas · {fmtNum(p.paginas)} páginas
                </span>
              </span>
              <span className="sr-only">
                {fechaCorta(p.dia)}: {p.visitas} visitas
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="ml-8 mt-2 flex gap-[2px]" aria-hidden>
        {serie.map((p, i) => (
          <span key={p.dia} className="flex-1 overflow-visible whitespace-nowrap text-center text-[10.5px] text-[#a3a3a3]">
            {(serie.length - 1 - i) % etiquetas === 0 ? fechaCorta(p.dia) : ""}
          </span>
        ))}
      </div>
    </div>
  );
}

export interface FilaBarra {
  key: string;
  label: ReactNode;
  detalle?: ReactNode;
  valor: number;
}

/** Lista con barra horizontal proporcional al total. */
export function ListaBarras({ filas, total, vacio }: { filas: FilaBarra[]; total: number; vacio: string }) {
  if (filas.length === 0) return <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">{vacio}</p>;
  const max = Math.max(1, ...filas.map((f) => f.valor));
  return (
    <ul className="space-y-3 px-5 py-4">
      {filas.map((f) => (
        <li key={f.key}>
          <div className="flex items-baseline justify-between gap-3 text-[13px]">
            <span className="min-w-0 truncate">
              {f.label}
              {f.detalle && <span className="ml-1.5 text-[11.5px] text-[#a3a3a3]">{f.detalle}</span>}
            </span>
            <span className="shrink-0 tabular-nums text-[#525252]">
              {fmtNum(f.valor)} <span className="text-[11.5px] text-[#a3a3a3]">· {fmtPct(f.valor, total)}</span>
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#f5f5f5]">
            <div className="h-full rounded-full bg-[#e02020]" style={{ width: `${(f.valor / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Tarjeta({
  titulo,
  subtitulo,
  children,
  className = "",
  delay = 0,
}: {
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <section className={`erp-card erp-entrar min-w-0 overflow-hidden ${className}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="border-b border-[#ebebeb] px-5 pb-3 pt-4">
        <h2 className="text-[14px] font-semibold">{titulo}</h2>
        {subtitulo && <p className="text-[12px] text-[#a3a3a3]">{subtitulo}</p>}
      </div>
      {children}
    </section>
  );
}
