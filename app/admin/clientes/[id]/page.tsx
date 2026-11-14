// app/admin/clientes/[id]/page.tsx
// Ficha del cliente: resumen arriba y pestañas debajo (datos generales y contactos).
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminPage } from "@root/lib/session";
import { getCliente } from "@root/lib/clientes";
import { listContactos } from "@root/lib/socios";
import { ESTATUS_CLIENTE, regimenLabel, usoCfdiLabel } from "@root/lib/socios-reglas";
import ClienteForm from "../_components/ClienteForm";
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
  const cliente = await getCliente(id);
  if (!cliente) notFound();
  return cliente;
}

export async function generateMetadata({ params }: Props) {
  await requireAdminPage();
  const c = await load((await params).id);
  return { title: c.nombre_comercial ?? c.razon_social };
}

export default async function ClientePage({ params, searchParams }: Props) {
  await requireAdminPage();
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const tab: Tab = TABS.some((t) => t.value === sp.tab) ? (sp.tab as Tab) : "general";
  const cliente = await load(id);
  const contactos = await listContactos("cliente", cliente.id);
  const estatus = ESTATUS_CLIENTE.find((e) => e.value === cliente.estatus);
  const nombre = cliente.nombre_comercial ?? cliente.razon_social;
  const fiscal = [regimenLabel(cliente.regimen_fiscal), usoCfdiLabel(cliente.uso_cfdi) && `Uso ${usoCfdiLabel(cliente.uso_cfdi)}`]
    .filter(Boolean)
    .join(" · ");

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
            <span className="font-mono text-[12px]">{cliente.codigo}</span>
            {cliente.nombre_comercial && ` · ${cliente.razon_social}`}
            {cliente.rfc && (
              <>
                {" · "}
                <span className="font-mono text-[12px]">{cliente.rfc}</span>
              </>
            )}
            {` · Crédito: ${formatCredito(cliente.dias_credito)}`}
            {cliente.limite_credito != null && `, hasta $${cliente.limite_credito.toLocaleString("es-MX", { minimumFractionDigits: 2 })} ${cliente.moneda}`}
          </p>
          {estatus && cliente.estatus !== "activo" && (
            <p className="mt-1 text-[12.5px] text-[#a3a3a3]">{estatus.description}</p>
          )}
          {fiscal && <p className="mt-1 text-[12.5px] text-[#a3a3a3]">{fiscal}</p>}
        </div>
      </div>

      <nav className="erp-tabs" aria-label="Secciones del cliente">
        {TABS.map((t) => (
          <Link
            key={t.value}
            href={t.value === "general" ? `/admin/clientes/${cliente.id}` : `/admin/clientes/${cliente.id}?tab=${t.value}`}
            aria-current={tab === t.value ? "page" : undefined}
            className="erp-tab"
            scroll={false}
          >
            {t.label}
            {t.value === "contactos" && <small>{contactos.length}</small>}
          </Link>
        ))}
      </nav>

      {tab === "general" && <ClienteForm key={cliente.id} cliente={cliente} />}
      {tab === "contactos" && <ContactosCard tipo="cliente" socioId={cliente.id} contactos={contactos} />}
    </div>
  );
}
