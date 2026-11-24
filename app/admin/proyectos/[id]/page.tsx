// app/admin/proyectos/[id]/page.tsx
// Ficha del proyecto: resumen, números (cotizado contra costo real) y
// formulario de edición.
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import { getProyecto, listClientesParaProyecto, listResponsables } from "@root/lib/proyectos";
import { ESTADOS_CERRADOS, estadoProyecto, formatMonto } from "@root/lib/proyectos-reglas";
import ProyectoForm from "../_components/ProyectoForm";
import { EstatusBadge } from "../../_components/socios/comunes";
import { formatFecha, hoyMexico } from "../../empleados/_components/format";

interface Props {
  params: Promise<{ id: string }>;
}

async function load(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const proyecto = await getProyecto(id);
  if (!proyecto) notFound();
  return proyecto;
}

export async function generateMetadata({ params }: Props) {
  await requireAdminPage();
  const p = await load((await params).id);
  return { title: p.nombre };
}

function Dato({ label, valor, nota, tono }: { label: string; valor: string; nota: string; tono?: "muted" | "danger" }) {
  return (
    <div className="px-5 py-4">
      <p className="text-[12px] text-[#a3a3a3]">{label}</p>
      <p
        className={`mt-1 text-[18px] font-semibold tabular-nums tracking-tight ${
          tono === "muted" ? "text-[#a3a3a3]" : tono === "danger" ? "text-[#c41a1a]" : ""
        }`}
      >
        {valor}
      </p>
      <p className="mt-0.5 text-[12px] text-[#a3a3a3]">{nota}</p>
    </div>
  );
}

export default async function ProyectoPage({ params }: Props) {
  await requireAdminPage();
  const proyecto = await load((await params).id);
  const [clientes, responsables] = await Promise.all([
    listClientesParaProyecto(proyecto.cliente_id),
    listResponsables(proyecto.responsable_id),
  ]);
  const hoy = hoyMexico();
  const estado = estadoProyecto(proyecto.estado);
  const cerrado = ESTADOS_CERRADOS.includes(proyecto.estado);
  const atrasado = !cerrado && proyecto.fecha_entrega !== null && proyecto.fecha_entrega < hoy;
  const monto = formatMonto(proyecto.monto_cotizado, proyecto.moneda);
  const anticipo = formatMonto(proyecto.anticipo, proyecto.moneda);
  const pctAnticipo =
    proyecto.anticipo !== null && proyecto.monto_cotizado
      ? Math.round((proyecto.anticipo / proyecto.monto_cotizado) * 100)
      : null;

  return (
    <div className="erp-page mx-auto max-w-5xl space-y-4">
      <div className="erp-card erp-entrar flex flex-wrap items-center gap-4 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0a0a] text-white">
          <FontAwesomeIcon icon={faDiagramProject} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[17px] font-semibold tracking-tight">{proyecto.nombre}</h2>
            <EstatusBadge estatus={estado} />
          </div>
          <p className="mt-0.5 text-[13px] text-[#737373]">
            <span className="font-mono text-[12px]">{proyecto.codigo}</span>
            {" · Cliente: "}
            <Link href={`/admin/clientes/${proyecto.cliente_id}`} className="erp-row-link">
              {proyecto.cliente}
            </Link>
            {proyecto.responsable && ` · Responsable: ${proyecto.responsable}`}
          </p>
          <p className="mt-1 text-[12.5px] text-[#a3a3a3]">
            Cotizado el {formatFecha(proyecto.fecha_cotizacion)}
            {proyecto.fecha_inicio && ` · Inicio ${formatFecha(proyecto.fecha_inicio)}`}
            {proyecto.fecha_entrega && (
              <span className={atrasado ? "font-medium text-[#c41a1a]" : undefined}>
                {` · Entrega ${formatFecha(proyecto.fecha_entrega)}`}
                {atrasado && " (atrasado)"}
              </span>
            )}
            {proyecto.fecha_cierre &&
              ` · ${proyecto.estado === "cancelado" ? "Cancelado" : "Entregado"} el ${formatFecha(proyecto.fecha_cierre)}`}
          </p>
        </div>
      </div>

      <div className="erp-card erp-entrar grid divide-y divide-[#ebebeb] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <Dato label="Monto cotizado" valor={monto ?? "—"} nota="Precio de venta, sin IVA" tono={monto ? undefined : "muted"} />
        <Dato
          label="Anticipo pactado"
          valor={anticipo ?? "—"}
          nota={pctAnticipo !== null ? `${pctAnticipo}% del monto cotizado` : "Sin anticipo registrado"}
          tono={anticipo ? undefined : "muted"}
        />
        <Dato
          label="Costo real"
          valor="—"
          nota="Se calculará con las órdenes de compra"
          tono="muted"
        />
      </div>

      <ProyectoForm
        key={proyecto.id}
        proyecto={proyecto}
        clientes={clientes}
        responsables={responsables}
        hoy={hoy}
      />
    </div>
  );
}
