// app/admin/empleados/_components/EmpleadosFiltros.tsx
// Barra de filtros de la lista. Escribe los filtros en la URL; la página
// (Server Component) vuelve a consultar con ellos.
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Departamento, EstadoFiltro } from "@root/lib/empleados";
import PanelSelect from "../../_components/PanelSelect";

interface Props {
  q: string;
  estado: EstadoFiltro;
  depto: string;
  counts: Record<EstadoFiltro, number>;
  departamentos: Departamento[];
}

const TABS: { value: EstadoFiltro; label: string }[] = [
  { value: "activos", label: "Activos" },
  { value: "bajas", label: "Bajas" },
  { value: "todos", label: "Todos" },
];

export default function EmpleadosFiltros({ q, estado, depto, counts, departamentos }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [texto, setTexto] = useState(q);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function url(next: { q?: string; estado?: EstadoFiltro; depto?: string }) {
    const params = new URLSearchParams();
    const v = { q, estado, depto, ...next };
    if (v.q) params.set("q", v.q);
    if (v.estado !== "activos") params.set("estado", v.estado);
    if (v.depto) params.set("depto", v.depto);
    const s = params.toString();
    return s ? `${pathname}?${s}` : pathname;
  }

  function go(next: Parameters<typeof url>[0]) {
    startTransition(() => router.replace(url(next), { scroll: false }));
  }

  // La búsqueda se aplica al dejar de escribir.
  function onSearch(value: string) {
    setTexto(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => go({ q: value.trim() }), 300);
  }
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-[#ebebeb] p-3">
      <nav className="erp-tabs" aria-label="Estado">
        {TABS.map((t) => (
          <Link
            key={t.value}
            href={url({ estado: t.value })}
            replace
            scroll={false}
            aria-current={estado === t.value ? "page" : undefined}
            className="erp-tab"
          >
            {t.label} <small>{counts[t.value]}</small>
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex flex-1 flex-wrap items-center justify-end gap-2 sm:flex-none">
        <input
          type="search"
          value={texto}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar por nombre, número o correo"
          aria-label="Buscar empleados"
          className="erp-input min-w-0 flex-1 sm:w-72 sm:flex-none"
        />
        <PanelSelect
          value={depto}
          onChange={(value) => go({ depto: value })}
          aria-label="Departamento"
          className="w-full sm:w-56"
          options={[
            { value: "", label: "Todos los departamentos" },
            ...departamentos.map((d) => ({ value: String(d.id), label: d.nombre })),
          ]}
        />
        {pending && <span className="text-[12px] text-[#a3a3a3]" role="status">Cargando…</span>}
      </div>
    </div>
  );
}
