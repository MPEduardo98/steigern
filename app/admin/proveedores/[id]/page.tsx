// app/admin/proveedores/[id]/page.tsx
// Ficha del proveedor: resumen arriba y pestañas debajo (datos generales y contactos).
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminPage } from "@root/lib/session";
import { getProveedor, listCategoriasProveedor } from "@root/lib/proveedores";
import { listContactos } from "@root/lib/socios";
import { ESTATUS_PROVEEDOR, regimenLabel } from "@root/lib/socios-reglas";
import ProveedorForm from "../_components/ProveedorForm";
import ContactosCard from "../../_components/socios/ContactosCard";
import { EstatusBadge, formatCredito, inicialesEmpresa } from "../../_components/socios/comunes";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

const TABS = [
  { value: "general", label: "Datos generales" },
  { value: "contactos", label: "Contactos" },
] as const;
type Tab = (typeof TABS)[number]["value"];

async function load(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const proveedor = await getProveedor(id);
  if (!proveedor) notFound();
  return proveedor;
}

export async function generateMetadata({ params }: Props) {
  await requireAdminPage();
  const p = await load((await params).id);
  return { title: p.nombre_comercial ?? p.razon_social };
}

export default async function ProveedorPage({ params, searchParams }: Props) {
  await requireAdminPage();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const tab: Tab = TABS.some((t) => t.value === sp.tab) ? (sp.tab as Tab) : "general";
  const proveedor = await load(id);
  const contactos = await listContactos("proveedor", proveedor.id);
  const estatus = ESTATUS_PROVEEDOR.find((e) => e.value === proveedor.estatus);
  const nombre = proveedor.nombre_comercial ?? proveedor.razon_social;

  return (
    <div className="erp-page mx-auto max-w-5xl space-y-4">
      <div className="erp-card erp-entrar flex flex-wrap items-center gap-4 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0a0a0a] text-[15px] font-semibold text-white">
          {inicialesEmpresa(nombre)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[17px] font-semibold tracking-tight">{nombre}</h2>
            <EstatusBadge estatus={estatus} />
          </div>
          <p className="mt-0.5 text-[13px] text-[#737373]">
            <span className="font-mono text-[12px]">{proveedor.codigo}</span>
            {proveedor.nombre_comercial && ` · ${proveedor.razon_social}`}
            {proveedor.rfc && (
              <>
                {" · "}
                <span className="font-mono text-[12px]">{proveedor.rfc}</span>
              </>
            )}
            {proveedor.categoria && ` · ${proveedor.categoria}`}
            {` · Crédito: ${formatCredito(proveedor.dias_credito)} en ${proveedor.moneda}`}
          </p>
          {estatus && proveedor.estatus !== "activo" && (
            <p className="mt-1 text-[12.5px] text-[#a3a3a3]">{estatus.description}</p>
          )}
          {proveedor.regimen_fiscal && (
            <p className="mt-1 text-[12.5px] text-[#a3a3a3]">{regimenLabel(proveedor.regimen_fiscal)}</p>
          )}
        </div>
      </div>

      <nav className="erp-tabs" aria-label="Secciones del proveedor">
        {TABS.map((t) => (
          <Link
            key={t.value}
            href={t.value === "general" ? `/admin/proveedores/${proveedor.id}` : `/admin/proveedores/${proveedor.id}?tab=${t.value}`}
            aria-current={tab === t.value ? "page" : undefined}
            className="erp-tab"
            scroll={false}
          >
            {t.label}
            {t.value === "contactos" && <small>{contactos.length}</small>}
          </Link>
        ))}
      </nav>

      {tab === "general" && (
        <ProveedorForm key={proveedor.id} proveedor={proveedor} categorias={await listCategoriasProveedor()} />
      )}
      {tab === "contactos" && <ContactosCard tipo="proveedor" socioId={proveedor.id} contactos={contactos} />}
    </div>
  );
}
