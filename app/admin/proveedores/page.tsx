// app/admin/proveedores/page.tsx
// Lista de proveedores con estatus, búsqueda y categoría (filtros en la URL).
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckField } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import {
  countProveedores,
  listCategoriasProveedor,
  listProveedores,
  type FiltroProveedor,
} from "@root/lib/proveedores";
import { ESTATUS_PROVEEDOR } from "@root/lib/socios-reglas";
import SociosFiltros from "../_components/socios/SociosFiltros";
import {
  EstatusBadge,
  ListaVacia,
  Vacio,
  formatCredito,
  inicialesEmpresa,
  ubicacion,
} from "../_components/socios/comunes";
import NuevoProveedorButton from "./_components/NuevoProveedorButton";

export const metadata = { title: "Proveedores" };

interface Props {
  searchParams: Promise<{ q?: string; estatus?: string; cat?: string }>;
}

const FILTROS: FiltroProveedor[] = ["activo", "en_revision", "inactivo", "bloqueado", "todos"];

export default async function ProveedoresPage({ searchParams }: Props) {
  await requireAdminPage();

  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const estatus: FiltroProveedor = FILTROS.includes(sp.estatus as FiltroProveedor)
    ? (sp.estatus as FiltroProveedor)
    : "activo";
  const categoriaId = Number(sp.cat) || undefined;

  const [proveedores, counts, categorias] = await Promise.all([
    listProveedores({ q, estatus, categoriaId }),
    countProveedores(),
    listCategoriasProveedor(),
  ]);
  const filtrando = Boolean(q || categoriaId);
  const etiqueta = (value: FiltroProveedor) =>
    value === "todos" ? "Todos" : ESTATUS_PROVEEDOR.find((e) => e.value === value)!.label;

  return (
    <div className="erp-page">
      <div className="erp-page-head">
        <p className="erp-page-desc">A quién le compras: datos fiscales, condiciones de pago y contactos.</p>
        <NuevoProveedorButton categorias={categorias} />
      </div>

      <div className="erp-card erp-entrar overflow-hidden">
        <SociosFiltros
          q={q}
          estatus={estatus}
          estatusPorDefecto="activo"
          tabs={FILTROS.map((f) => ({ value: f, label: etiqueta(f), count: counts[f] }))}
          placeholder="Buscar por nombre, RFC, código o ciudad"
          extra={{
            param: "cat",
            value: categoriaId ? String(categoriaId) : "",
            label: "Categoría",
            options: [
              { value: "", label: "Todas las categorías" },
              ...categorias.map((c) => ({ value: String(c.id), label: c.nombre })),
            ],
          }}
        />

        {proveedores.length === 0 ? (
          <ListaVacia
            icon={<FontAwesomeIcon icon={faTruckField} className="h-4 w-4" />}
            titulo={filtrando ? "Ningún proveedor coincide con la búsqueda." : "No hay proveedores en esta pestaña."}
            detalle={
              filtrando
                ? "Prueba con otro nombre, RFC o categoría."
                : counts.todos === 0
                  ? "Da de alta al primero para empezar."
                  : "Revisa las otras pestañas."
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Proveedor</th>
                  <th>Código</th>
                  <th>RFC</th>
                  <th>Categoría</th>
                  <th>Ubicación</th>
                  <th>Crédito</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0a0a0a] text-[11px] font-semibold text-white">
                          {inicialesEmpresa(p.nombre_comercial ?? p.razon_social)}
                        </span>
                        <div className="min-w-0">
                          <Link href={`/admin/proveedores/${p.id}`} className="erp-row-link block max-w-[280px] truncate font-medium">
                            {p.nombre_comercial ?? p.razon_social}
                          </Link>
                          <p className="max-w-[280px] truncate text-[12px] text-[#a3a3a3]">
                            {p.nombre_comercial ? p.razon_social : p.contacto ?? "Sin contacto"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-[12px] text-[#525252]">{p.codigo}</td>
                    <td className="font-mono text-[12px] text-[#525252]">{p.rfc ?? <Vacio />}</td>
                    <td className="text-[#525252]">{p.categoria ?? <Vacio />}</td>
                    <td className="text-[#525252]">{ubicacion(p.ciudad, p.estado) ?? <Vacio />}</td>
                    <td className="whitespace-nowrap text-[#525252]">{formatCredito(p.dias_credito)}</td>
                    <td>
                      <EstatusBadge estatus={ESTATUS_PROVEEDOR.find((e) => e.value === p.estatus)} />
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
