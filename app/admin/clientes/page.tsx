// app/admin/clientes/page.tsx
// Lista de clientes con estatus y búsqueda (filtros en la URL).
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import { countClientes, listClientes, type FiltroCliente } from "@root/lib/clientes";
import { ESTATUS_CLIENTE } from "@root/lib/socios-reglas";
import SociosFiltros from "../_components/socios/SociosFiltros";
import {
  EstatusBadge,
  ListaVacia,
  Vacio,
  formatCredito,
  inicialesEmpresa,
  ubicacion,
} from "../_components/socios/comunes";
import NuevoClienteButton from "./_components/NuevoClienteButton";

export const metadata = { title: "Clientes" };

interface Props {
  searchParams: Promise<{ q?: string; estatus?: string }>;
}

const FILTROS: FiltroCliente[] = ["activo", "inactivo", "bloqueado", "todos"];

export default async function ClientesPage({ searchParams }: Props) {
  await requireAdminPage();

  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const estatus: FiltroCliente = FILTROS.includes(sp.estatus as FiltroCliente)
    ? (sp.estatus as FiltroCliente)
    : "activo";

  const [clientes, counts] = await Promise.all([listClientes({ q, estatus }), countClientes()]);
  const etiqueta = (value: FiltroCliente) =>
    value === "todos" ? "Todos" : ESTATUS_CLIENTE.find((e) => e.value === value)!.label;

  return (
    <div className="erp-page">
      <div className="erp-page-head">
        <p className="erp-page-desc">A quién le vendes: datos para facturar, crédito y contactos.</p>
        <NuevoClienteButton />
      </div>

      <div className="erp-card erp-entrar overflow-hidden">
        <SociosFiltros
          q={q}
          estatus={estatus}
          estatusPorDefecto="activo"
          tabs={FILTROS.map((f) => ({ value: f, label: etiqueta(f), count: counts[f] }))}
          placeholder="Buscar por nombre, RFC, código o ciudad"
        />

        {clientes.length === 0 ? (
          <ListaVacia
            icon={<FontAwesomeIcon icon={faHandshake} className="h-4 w-4" />}
            titulo={q ? "Ningún cliente coincide con la búsqueda." : "No hay clientes en esta pestaña."}
            detalle={
              q ? "Prueba con otro nombre, RFC o código." : counts.todos === 0 ? "Da de alta al primero para empezar." : "Revisa las otras pestañas."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Código</th>
                  <th>RFC</th>
                  <th>Ubicación</th>
                  <th>Crédito</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0a0a0a] text-[11px] font-semibold text-white">
                          {inicialesEmpresa(c.nombre_comercial ?? c.razon_social)}
                        </span>
                        <div className="min-w-0">
                          <Link href={`/admin/clientes/${c.id}`} className="erp-row-link block max-w-[280px] truncate font-medium">
                            {c.nombre_comercial ?? c.razon_social}
                          </Link>
                          <p className="max-w-[280px] truncate text-[12px] text-[#a3a3a3]">
                            {c.nombre_comercial ? c.razon_social : c.contacto ?? "Sin contacto"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-[12px] text-[#525252]">{c.codigo}</td>
                    <td className="font-mono text-[12px] text-[#525252]">{c.rfc ?? <Vacio />}</td>
                    <td className="text-[#525252]">{ubicacion(c.ciudad, c.estado) ?? <Vacio />}</td>
                    <td className="whitespace-nowrap text-[#525252]">{formatCredito(c.dias_credito)}</td>
                    <td>
                      <EstatusBadge estatus={ESTATUS_CLIENTE.find((e) => e.value === c.estatus)} />
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
