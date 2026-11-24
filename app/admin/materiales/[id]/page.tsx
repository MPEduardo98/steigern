// app/admin/materiales/[id]/page.tsx
// Ficha del material: resumen arriba y formulario de edición debajo.
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import { getMaterial, listCategoriasMaterial, listProveedoresParaMaterial } from "@root/lib/materiales";
import { ESTATUS_MATERIAL, UNIDADES, formatCosto } from "@root/lib/materiales-reglas";
import MaterialForm from "../_components/MaterialForm";
import { EstatusBadge } from "../../_components/socios/comunes";

interface Props {
  params: Promise<{ id: string }>;
}

async function load(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const material = await getMaterial(id);
  if (!material) notFound();
  return material;
}

export async function generateMetadata({ params }: Props) {
  await requireAdminPage();
  const m = await load((await params).id);
  return { title: m.descripcion };
}

export default async function MaterialPage({ params }: Props) {
  await requireAdminPage();
  const material = await load((await params).id);
  const [categorias, proveedores] = await Promise.all([
    listCategoriasMaterial(),
    listProveedoresParaMaterial(material.proveedor_id),
  ]);
  const estatus = ESTATUS_MATERIAL.find((e) => e.value === material.estatus);
  const unidad = UNIDADES.find((u) => u.value === material.unidad)?.label ?? material.unidad;
  const costo = formatCosto(material.ultimo_costo, material.moneda);

  return (
    <div className="erp-page mx-auto max-w-5xl space-y-4">
      <div className="erp-card erp-entrar flex flex-wrap items-center gap-4 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0a0a] text-white">
          <FontAwesomeIcon icon={faCubes} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[17px] font-semibold tracking-tight">{material.descripcion}</h2>
            <EstatusBadge estatus={estatus} />
          </div>
          <p className="mt-0.5 text-[13px] text-[#737373]">
            <span className="font-mono text-[12px]">{material.codigo}</span>
            {material.categoria && ` · ${material.categoria}`}
            {` · Se compra por ${unidad.toLowerCase()}`}
            {costo && ` · Último costo: ${costo}`}
          </p>
          {material.proveedor && material.proveedor_id && (
            <p className="mt-1 text-[12.5px] text-[#a3a3a3]">
              Proveedor habitual:{" "}
              <Link href={`/admin/proveedores/${material.proveedor_id}`} className="erp-row-link">
                {material.proveedor}
              </Link>
            </p>
          )}
          {estatus && material.estatus !== "activo" && (
            <p className="mt-1 text-[12.5px] text-[#a3a3a3]">{estatus.description}</p>
          )}
        </div>
      </div>

      <MaterialForm key={material.id} material={material} categorias={categorias} proveedores={proveedores} />
    </div>
  );
}
