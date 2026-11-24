// app/admin/materiales/page.tsx
// Catálogo de materiales con estatus, búsqueda y categoría (filtros en la URL).
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import {
  countMateriales,
  listCategoriasMaterial,
  listMateriales,
  listProveedoresParaMaterial,
  type FiltroMaterial,
} from "@root/lib/materiales";
import { ESTATUS_MATERIAL, formatCosto, unidadCorta } from "@root/lib/materiales-reglas";
import SociosFiltros from "../_components/socios/SociosFiltros";
import { EstatusBadge, ListaVacia, Vacio } from "../_components/socios/comunes";
import NuevoMaterialButton from "./_components/NuevoMaterialButton";

export const metadata = { title: "Materiales" };

interface Props {
  searchParams: Promise<{ q?: string; estatus?: string; cat?: string }>;
}

const FILTROS: FiltroMaterial[] = ["activo", "inactivo", "todos"];

export default async function MaterialesPage({ searchParams }: Props) {
  await requireAdminPage();

  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const estatus: FiltroMaterial = FILTROS.includes(sp.estatus as FiltroMaterial)
    ? (sp.estatus as FiltroMaterial)
    : "activo";
  const categoriaId = Number(sp.cat) || undefined;

  const [materiales, counts, categorias, proveedores] = await Promise.all([
    listMateriales({ q, estatus, categoriaId }),
    countMateriales(),
    listCategoriasMaterial(),
    listProveedoresParaMaterial(),
  ]);
  const filtrando = Boolean(q || categoriaId);
  const etiqueta = (value: FiltroMaterial) =>
    value === "todos" ? "Todos" : ESTATUS_MATERIAL.find((e) => e.value === value)!.label;

  return (
    <div className="erp-page">
      <div className="erp-page-head">
        <p className="erp-page-desc">Lo que compras para los proyectos: tornillería, perfilería, aluminio y demás.</p>
        <NuevoMaterialButton categorias={categorias} proveedores={proveedores} />
      </div>

      <div className="erp-card erp-entrar overflow-hidden">
        <SociosFiltros
          q={q}
          estatus={estatus}
          estatusPorDefecto="activo"
          tabs={FILTROS.map((f) => ({ value: f, label: etiqueta(f), count: counts[f] }))}
          placeholder="Buscar por descripción, código o número de parte"
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

        {materiales.length === 0 ? (
          <ListaVacia
            icon={<FontAwesomeIcon icon={faCubes} className="h-4 w-4" />}
            titulo={filtrando ? "Ningún material coincide con la búsqueda." : "No hay materiales en esta pestaña."}
            detalle={
              filtrando
                ? "Prueba con otra palabra, código o categoría."
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
                  <th>Material</th>
                  <th>Código</th>
                  <th>Categoría</th>
                  <th>Unidad</th>
                  <th className="text-right">Último costo</th>
                  <th>Proveedor habitual</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <Link href={`/admin/materiales/${m.id}`} className="erp-row-link block max-w-[320px] truncate font-medium">
                        {m.descripcion}
                      </Link>
                      {m.numero_parte && (
                        <p className="max-w-[320px] truncate font-mono text-[11.5px] text-[#a3a3a3]">{m.numero_parte}</p>
                      )}
                    </td>
                    <td className="font-mono text-[12px] text-[#525252]">{m.codigo}</td>
                    <td className="text-[#525252]">{m.categoria ?? <Vacio />}</td>
                    <td className="text-[#525252]">{unidadCorta(m.unidad)}</td>
                    <td className="whitespace-nowrap text-right tabular-nums text-[#525252]">
                      {formatCosto(m.ultimo_costo, m.moneda) ?? <Vacio />}
                    </td>
                    <td className="max-w-[220px] truncate text-[#525252]">{m.proveedor ?? <Vacio />}</td>
                    <td>
                      <EstatusBadge estatus={ESTATUS_MATERIAL.find((e) => e.value === m.estatus)} />
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
