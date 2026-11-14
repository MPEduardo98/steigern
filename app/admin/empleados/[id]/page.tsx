// app/admin/empleados/[id]/page.tsx
// Ficha del empleado: resumen arriba y pestañas debajo
// (datos generales, expediente y bitácora de accesos al expediente).
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminPage } from "@root/lib/session";
import { getEmpleado, listDepartamentos } from "@root/lib/empleados";
import {
  getDatosLegalesResumen,
  listBitacora,
  listContratos,
  listDocumentos,
  type AccionBitacora,
} from "@root/lib/expediente";
import { TIPOS_DOCUMENTO } from "@root/lib/expediente-reglas";
import EmpleadoForm from "../_components/EmpleadoForm";
import EstadoEmpleadoButton from "../_components/EstadoEmpleadoButton";
import DatosLegalesCard from "../_components/expediente/DatosLegalesCard";
import DocumentosCard from "../_components/expediente/DocumentosCard";
import ContratosCard from "../_components/expediente/ContratosCard";
import { CardHeader } from "../_components/expediente/comunes";
import { formatFecha, formatFechaHora, hoyMexico, iniciales } from "../_components/format";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

const TABS = [
  { value: "general", label: "Datos generales" },
  { value: "expediente", label: "Expediente" },
  { value: "bitacora", label: "Bitácora" },
] as const;
type Tab = (typeof TABS)[number]["value"];

const ACCIONES: Record<AccionBitacora, string> = {
  ver_datos: "Vio los datos legales",
  editar_datos: "Editó los datos legales",
  subir_documento: "Subió un documento",
  descargar_documento: "Abrió un documento",
  quitar_documento: "Quitó un documento",
  registrar_contrato: "Registró un contrato",
};

async function load(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const empleado = await getEmpleado(id);
  if (!empleado) notFound();
  return empleado;
}

export async function generateMetadata({ params }: Props) {
  await requireAdminPage();
  const e = await load((await params).id);
  return { title: `${e.nombre} ${e.apellidos}` };
}

export default async function EmpleadoPage({ params, searchParams }: Props) {
  await requireAdminPage();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const tab: Tab = TABS.some((t) => t.value === sp.tab) ? (sp.tab as Tab) : "general";
  const empleado = await load(id);
  const nombre = `${empleado.nombre} ${empleado.apellidos}`;

  // Los documentos se leen siempre: el aviso de pendientes va en la cabecera.
  const documentos = await listDocumentos(empleado.id);
  const requeridos = TIPOS_DOCUMENTO.filter((t) => t.requerido);
  const faltantes = requeridos.filter((t) => !documentos.some((d) => d.tipo === t.value)).length;
  const vencidos = documentos.filter((d) => d.vigencia === "vencido").length;
  const porVencer = documentos.filter((d) => d.vigencia === "por_vencer").length;

  return (
    <div className="erp-page mx-auto max-w-5xl space-y-4">
      <div className="erp-card erp-entrar flex flex-wrap items-center gap-4 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-[15px] font-semibold text-white">
          {iniciales(empleado.nombre, empleado.apellidos)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[17px] font-semibold tracking-tight">{nombre}</h2>
            <span className={`erp-badge ${empleado.activo ? "erp-badge-ok" : "erp-badge-off"}`}>
              {empleado.activo ? "Activo" : "Baja"}
            </span>
          </div>
          <p className="mt-0.5 text-[13px] text-[#737373]">
            <span className="font-mono text-[12px]">{empleado.numero_empleado}</span>
            {" · "}
            {empleado.puesto}
            {empleado.departamento && ` · ${empleado.departamento}`}
            {" · "}
            Ingresó el {formatFecha(empleado.fecha_ingreso)}
          </p>
        </div>
        <EstadoEmpleadoButton id={empleado.id} nombre={empleado.nombre} activo={empleado.activo} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="erp-tabs" aria-label="Secciones del empleado">
          {TABS.map((t) => (
            <Link
              key={t.value}
              href={t.value === "general" ? `/admin/empleados/${empleado.id}` : `/admin/empleados/${empleado.id}?tab=${t.value}`}
              aria-current={tab === t.value ? "page" : undefined}
              className="erp-tab"
              scroll={false}
            >
              {t.label}
              {t.value === "expediente" && faltantes > 0 && <small>{faltantes} pendientes</small>}
            </Link>
          ))}
        </nav>
        {(vencidos > 0 || porVencer > 0) && (
          <div className="flex flex-wrap gap-2">
            {vencidos > 0 && (
              <span className="erp-badge erp-badge-danger">
                {vencidos} {vencidos === 1 ? "documento vencido" : "documentos vencidos"}
              </span>
            )}
            {porVencer > 0 && (
              <span className="erp-badge erp-badge-warn">{porVencer} por vencer</span>
            )}
          </div>
        )}
      </div>

      {tab === "general" && (
        <EmpleadoForm key={empleado.id} empleado={empleado} departamentos={await listDepartamentos()} fechaHoy={hoyMexico()} />
      )}

      {tab === "expediente" && (
        <ExpedienteTab empleadoId={empleado.id} fechaIngreso={empleado.fecha_ingreso} documentos={documentos} />
      )}

      {tab === "bitacora" && <BitacoraTab empleadoId={empleado.id} />}
    </div>
  );
}

async function ExpedienteTab({
  empleadoId,
  fechaIngreso,
  documentos,
}: {
  empleadoId: number;
  fechaIngreso: string;
  documentos: Awaited<ReturnType<typeof listDocumentos>>;
}) {
  const [resumen, contratos] = await Promise.all([getDatosLegalesResumen(empleadoId), listContratos(empleadoId)]);
  const documentosContrato = documentos
    .filter((d) => d.tipo === "contrato")
    .map(({ id, nombre_original, created_at }) => ({ id, nombre_original, created_at }));

  return (
    <>
      <DatosLegalesCard empleadoId={empleadoId} resumen={resumen} />
      <DocumentosCard empleadoId={empleadoId} documentos={documentos} />
      <ContratosCard
        empleadoId={empleadoId}
        contratos={contratos}
        documentosContrato={documentosContrato}
        fechaIngreso={fechaIngreso}
      />
    </>
  );
}

async function BitacoraTab({ empleadoId }: { empleadoId: number }) {
  const entradas = await listBitacora(empleadoId, 100);
  return (
    <section className="erp-card erp-entrar">
      <CardHeader
        title="Bitácora del expediente"
        description="Quién vio, descargó o cambió datos legales y documentos. Últimos 100 movimientos."
      />
      {entradas.length === 0 ? (
        <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">Sin movimientos todavía.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Acción</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((e) => (
                <tr key={e.id}>
                  <td className="whitespace-nowrap text-[#525252]">{formatFechaHora(e.created_at)}</td>
                  <td className="text-[#525252]">{e.usuario ?? <span className="text-[#a3a3a3]">—</span>}</td>
                  <td className="whitespace-nowrap">{ACCIONES[e.accion]}</td>
                  <td className="text-[#525252]">{e.detalle ?? <span className="text-[#a3a3a3]">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
