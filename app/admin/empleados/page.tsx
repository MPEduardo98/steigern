// app/admin/empleados/page.tsx
// Lista de empleados con búsqueda, estado y departamento (filtros en la URL).
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import {
  countEmpleados,
  listDepartamentos,
  listEmpleados,
  type EstadoFiltro,
} from "@root/lib/empleados";
import EmpleadosFiltros from "./_components/EmpleadosFiltros";
import NuevoEmpleadoButton from "./_components/NuevoEmpleadoButton";
import { formatFecha, hoyMexico, iniciales } from "./_components/format";

export const metadata = { title: "Empleados" };

interface Props {
  searchParams: Promise<{ q?: string; estado?: string; depto?: string }>;
}

const ESTADOS: EstadoFiltro[] = ["activos", "bajas", "todos"];

export default async function EmpleadosPage({ searchParams }: Props) {
  await requireAdminPage();

  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const estado: EstadoFiltro = ESTADOS.includes(sp.estado as EstadoFiltro)
    ? (sp.estado as EstadoFiltro)
    : "activos";
  const departamentoId = Number(sp.depto) || undefined;

  const [empleados, counts, departamentos] = await Promise.all([
    listEmpleados({ q, estado, departamentoId }),
    countEmpleados(),
    listDepartamentos(),
  ]);
  const filtrando = Boolean(q || departamentoId);

  return (
    <div className="erp-page">
      <div className="erp-page-head">
        <p className="erp-page-desc">Personal de la empresa, sus puestos y departamentos.</p>
        <NuevoEmpleadoButton departamentos={departamentos} fechaHoy={hoyMexico()} />
      </div>

      <div className="erp-card erp-entrar overflow-hidden">
        <EmpleadosFiltros
          q={q}
          estado={estado}
          depto={departamentoId ? String(departamentoId) : ""}
          counts={counts}
          departamentos={departamentos}
        />

        {empleados.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] text-[#a3a3a3]">
              <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[14px] font-medium">
              {filtrando ? "Ningún empleado coincide con la búsqueda." : "Todavía no hay empleados aquí."}
            </p>
            <p className="mt-1 text-[13px] text-[#a3a3a3]">
              {filtrando
                ? "Prueba con otro nombre, número o departamento."
                : estado === "bajas"
                  ? "Los empleados dados de baja aparecerán en esta pestaña."
                  : "Da de alta al primero para empezar."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Número</th>
                  <th>Puesto</th>
                  <th>Departamento</th>
                  <th>Ingreso</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {empleados.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-[11px] font-semibold text-white">
                          {iniciales(e.nombre, e.apellidos)}
                        </span>
                        <div className="min-w-0">
                          <Link href={`/admin/empleados/${e.id}`} className="erp-row-link block truncate font-medium">
                            {e.nombre} {e.apellidos}
                          </Link>
                          <p className="truncate text-[12px] text-[#a3a3a3]">{e.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-[12px] text-[#525252]">{e.numero_empleado}</td>
                    <td>{e.puesto}</td>
                    <td className="text-[#525252]">{e.departamento ?? <span className="text-[#a3a3a3]">—</span>}</td>
                    <td className="whitespace-nowrap text-[#525252]">{formatFecha(e.fecha_ingreso)}</td>
                    <td>
                      <span className={`erp-badge ${e.activo ? "erp-badge-ok" : "erp-badge-off"}`}>
                        {e.activo ? "Activo" : "Baja"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
