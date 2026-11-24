// app/admin/usuarios/_components/UsuariosFiltros.tsx
// Pestañas de estado, búsqueda y rol. Los filtros viven en la URL.
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { EstadoUsuarioFiltro } from "@root/lib/usuarios";
import PanelSelect from "../../_components/PanelSelect";

interface Props {
  q: string;
  estado: EstadoUsuarioFiltro;
  rol: string;
  counts: Record<EstadoUsuarioFiltro, number>;
}

const TABS: { value: EstadoUsuarioFiltro; label: string }[] = [
  { value: "activos", label: "Activos" },
  { value: "desactivados", label: "Desactivados" },
  { value: "todos", label: "Todos" },
];

export default function UsuariosFiltros({ q, estado, rol, counts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [texto, setTexto] = useState(q);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function url(next: { q?: string; estado?: EstadoUsuarioFiltro; rol?: string }) {
    const params = new URLSearchParams();
    const v = { q, estado, rol, ...next };
    if (v.q) params.set("q", v.q);
    if (v.estado !== "activos") params.set("estado", v.estado);
    if (v.rol) params.set("rol", v.rol);
    const s = params.toString();
    return s ? `${pathname}?${s}` : pathname;
  }

  function go(next: Parameters<typeof url>[0]) {
    startTransition(() => router.replace(url(next), { scroll: false }));
  }

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
          placeholder="Buscar por nombre, correo o número"
          aria-label="Buscar usuarios"
          className="erp-input min-w-0 flex-1 sm:w-72 sm:flex-none"
        />
        <PanelSelect
          value={rol}
          onChange={(value) => go({ rol: value })}
          aria-label="Rol"
          className="w-full sm:w-48"
          options={[
            { value: "", label: "Todos los roles" },
            { value: "administrador", label: "Administrador" },
            { value: "empleado", label: "Empleado" },
          ]}
        />
        {pending && <span className="text-[12px] text-[#a3a3a3]" role="status">Cargando…</span>}
      </div>
    </div>
  );
}
