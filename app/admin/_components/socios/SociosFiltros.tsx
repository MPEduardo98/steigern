// app/admin/_components/socios/SociosFiltros.tsx
// Barra de filtros de las listas de clientes y proveedores: pestañas por
// estatus, búsqueda y (opcional) un select extra. Todo vive en la URL; la
// página (Server Component) vuelve a consultar con ello.
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import PanelSelect, { type SelectOption } from "../PanelSelect";

interface Props {
  q: string;
  estatus: string;
  /** Pestaña que no se escribe en la URL. */
  estatusPorDefecto: string;
  tabs: { value: string; label: string; count: number }[];
  placeholder: string;
  /** Select adicional (p. ej. categoría), guardado en la URL con `param`. */
  extra?: { param: string; value: string; label: string; options: SelectOption[] };
}

export default function SociosFiltros({ q, estatus, estatusPorDefecto, tabs, placeholder, extra }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [texto, setTexto] = useState(q);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function url(next: { q?: string; estatus?: string; extra?: string }) {
    const v = { q, estatus, extra: extra?.value ?? "", ...next };
    const params = new URLSearchParams();
    if (v.q) params.set("q", v.q);
    if (v.estatus !== estatusPorDefecto) params.set("estatus", v.estatus);
    if (extra && v.extra) params.set(extra.param, v.extra);
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
      <nav className="erp-tabs max-w-full overflow-x-auto" aria-label="Estatus">
        {tabs.map((t) => (
          <Link
            key={t.value}
            href={url({ estatus: t.value })}
            replace
            scroll={false}
            aria-current={estatus === t.value ? "page" : undefined}
            className="erp-tab"
          >
            {t.label} <small>{t.count}</small>
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex flex-1 flex-wrap items-center justify-end gap-2 sm:flex-none">
        <input
          type="search"
          value={texto}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="erp-input min-w-0 flex-1 sm:w-72 sm:flex-none"
        />
        {extra && (
          <PanelSelect
            value={extra.value}
            onChange={(value) => go({ extra: value })}
            aria-label={extra.label}
            className="w-full sm:w-52"
            options={extra.options}
          />
        )}
        {pending && <span className="text-[12px] text-[#a3a3a3]" role="status">Cargando…</span>}
      </div>
    </div>
  );
}
