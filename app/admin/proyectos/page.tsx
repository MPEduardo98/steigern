// app/admin/proyectos/page.tsx
// Lista de proyectos con pestañas por estado, búsqueda y cliente (filtros en la URL).
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiagramProject } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import {
  countProyectos,
  listClientesConProyectos,
  listClientesParaProyecto,
  listProyectos,
  listResponsables,
  type FiltroProyecto,
} from "@root/lib/proyectos";
import { ESTADOS_CERRADOS, estadoProyecto, formatMonto } from "@root/lib/proyectos-reglas";
import SociosFiltros from "../_components/socios/SociosFiltros";
import { EstatusBadge, ListaVacia, Vacio } from "../_components/socios/comunes";
import { formatFecha, hoyMexico } from "../empleados/_components/format";
import NuevoProyectoButton from "./_components/NuevoProyectoButton";

export const metadata = { title: "Proyectos" };

interface Props {
  searchParams: Promise<{ q?: string; estatus?: string; cliente?: string }>;
}

const FILTROS: { value: FiltroProyecto; label: string }[] = [
  { value: "abiertos", label: "Abiertos" },
  { value: "terminado", label: "Terminados" },
  { value: "cancelado", label: "Cancelados" },
  { value: "todos", label: "Todos" },
];

export default async function ProyectosPage({ searchParams }: Props) {
  await requireAdminPage();

  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const filtro: FiltroProyecto = FILTROS.some((f) => f.value === sp.estatus)
    ? (sp.estatus as FiltroProyecto)
    : "abiertos";
  const clienteId = Number(sp.cliente) || undefined;
  const hoy = hoyMexico();

  const [proyectos, counts, clientesFiltro, clientes, responsables] = await Promise.all([
    listProyectos({ q, filtro, clienteId }),
    countProyectos(),
    listClientesConProyectos(),
    listClientesParaProyecto(),
    listResponsables(),
  ]);
  const filtrando = Boolean(q || clienteId);

  return (
    <div className="erp-page">
      <div className="erp-page-head">
        <p className="erp-page-desc">Trabajos a pedido de cada cliente: cotización, precio, fechas y avance.</p>
        <NuevoProyectoButton clientes={clientes} responsables={responsables} hoy={hoy} />
      </div>

      <div className="erp-card erp-entrar overflow-hidden">
        <SociosFiltros
          q={q}
          estatus={filtro}
          estatusPorDefecto="abiertos"
          tabs={FILTROS.map((f) => ({ ...f, count: counts[f.value] }))}
          placeholder="Buscar por nombre, código o cliente"
          extra={{
            param: "cliente",
            value: clienteId ? String(clienteId) : "",
            label: "Cliente",
            options: [
              { value: "", label: "Todos los clientes" },
              ...clientesFiltro.map((c) => ({ value: String(c.id), label: c.nombre })),
            ],
          }}
        />

        {proyectos.length === 0 ? (
          <ListaVacia
            icon={<FontAwesomeIcon icon={faDiagramProject} className="h-4 w-4" />}
            titulo={filtrando ? "Ningún proyecto coincide con la búsqueda." : "No hay proyectos en esta pestaña."}
            detalle={
              filtrando
                ? "Prueba con otra palabra, código o cliente."
                : counts.todos === 0
                  ? "Da de alta el primero para empezar."
                  : "Revisa las otras pestañas."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Proyecto</th>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Responsable</th>
                  <th className="text-right">Monto cotizado</th>
                  <th>Entrega</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.map((p) => {
                  const atrasado =
                    p.fecha_entrega !== null && p.fecha_entrega < hoy && !ESTADOS_CERRADOS.includes(p.estado);
                  return (
                    <tr key={p.id}>
                      <td>
                        <Link href={`/admin/proyectos/${p.id}`} className="erp-row-link block max-w-[300px] truncate font-medium">
                          {p.nombre}
                        </Link>
                      </td>
                      <td className="font-mono text-[12px] text-[#525252]">{p.codigo}</td>
                      <td className="max-w-[220px] truncate text-[#525252]">{p.cliente}</td>
                      <td className="max-w-[180px] truncate text-[#525252]">{p.responsable ?? <Vacio />}</td>
                      <td className="whitespace-nowrap text-right tabular-nums text-[#525252]">
                        {formatMonto(p.monto_cotizado, p.moneda) ?? <Vacio />}
                      </td>
                      <td className="whitespace-nowrap">
                        {p.fecha_entrega ? (
                          <span className={atrasado ? "font-medium text-[#c41a1a]" : "text-[#525252]"}>
                            {formatFecha(p.fecha_entrega)}
                            {atrasado && " · atrasado"}
                          </span>
                        ) : (
                          <Vacio />
                        )}
                      </td>
                      <td>
                        <EstatusBadge estatus={estadoProyecto(p.estado)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
