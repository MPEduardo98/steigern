// app/admin/_components/AdminTopbar.tsx
// Barra superior: título de la página, búsqueda de módulos (atajo "/") y cuenta.
"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { UserRole } from "@root/types/auth";
import { navForRole, pageTitle, searchNav } from "./nav";
import AdminUserButton from "./AdminUserButton";

interface Props {
  user: { name: string; email: string; role: UserRole };
}

export default function AdminTopbar({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const search = useRef<HTMLDivElement>(null);
  const listId = useId();
  const results = searchNav(navForRole(user.role), query);

  // Al cambiar de página se cierra y limpia la búsqueda.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target;
      if (
        event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey ||
        (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable]:not([contenteditable=false])"))
      ) return;
      event.preventDefault();
      input.current?.focus();
      setOpen(true);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !search.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    setActive(0);
    input.current?.blur();
    router.push(href);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const target = results[active];
    if (open && target?.href) go(target.href);
    else setOpen(true);
  }

  function onSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActive((current) =>
        results.length ? (current + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length : 0
      );
    }
  }

  return (
    <header className="erp-topbar">
      <h1 className="erp-topbar-title">{pageTitle(pathname)}</h1>

      <div
        ref={search}
        className="erp-search"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <form role="search" onSubmit={onSubmit} className="erp-search-field">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" />
          </svg>
          <input
            ref={input}
            type="text"
            role="combobox"
            value={query}
            aria-label="Buscar en el panel"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
            autoComplete="off"
            placeholder="Buscar en el panel…"
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            onKeyDown={onSearchKey}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
              setOpen(true);
            }}
          />
          <kbd aria-hidden="true">/</kbd>
        </form>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="results"
              className="erp-search-popover"
              initial={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reducedMotion ? 0 : -4 }}
              transition={{ duration: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="erp-search-caption">{query.trim() ? "Resultados" : "Ir a un módulo"}</p>
              <ul id={listId} role="listbox" aria-label="Módulos del panel">
                {results.map((item, index) => (
                  <li key={item.label} role="presentation">
                    <button
                      id={`${listId}-${index}`}
                      type="button"
                      role="option"
                      aria-selected={active === index}
                      aria-disabled={!item.href}
                      tabIndex={-1}
                      className="erp-search-result"
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => item.href && go(item.href)}
                    >
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>
                      <span aria-hidden="true">{item.href ? "↗" : "Pronto"}</span>
                    </button>
                  </li>
                ))}
              </ul>
              {results.length === 0 && (
                <p role="status" className="erp-search-empty">
                  No encontramos módulos. Prueba con “compras”, “inventario” o “proveedores”.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="erp-topbar-actions">
        <Link href="/" target="_blank" aria-label="Ver sitio web (abre en otra pestaña)" className="erp-chip erp-chip-site">
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          </svg>
          <span>Ver sitio</span>
          <svg aria-hidden="true" className="erp-chip-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
        </Link>
        <AdminUserButton user={user} />
      </div>
    </header>
  );
}
