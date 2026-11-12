// app/admin/_components/AdminShell.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoutAction } from "@/[locale]/_actions/auth";
import type { UserRole } from "@root/types/auth";
import { navForRole } from "./nav";

interface Props {
  user: { name: string; email: string; role: UserRole };
  children: React.ReactNode;
}

const ROLE_LABEL: Record<UserRole, string> = {
  administrador: "Administrador",
  empleado: "Empleado",
};

export default function AdminShell({ user, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const groups = navForRole(user.role);

  return (
    <div className="min-h-screen bg-zinc-100 lg:pl-64">
      {/* Fondo oscuro al abrir el menú en móvil */}
      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      {/* ── Menú lateral ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-zinc-950 text-zinc-300 transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute left-0 top-0 h-full w-[3px] bg-accent" />

        <div className="flex h-16 shrink-0 items-center justify-between px-6">
          <Link href="/admin" onClick={() => setOpen(false)}>
            <Image
              src="/logos/Logo_White.png"
              alt="STEIGERN"
              width={1920}
              height={368}
              priority
              className="h-6 w-auto"
            />
          </Link>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="p-1 text-zinc-400 hover:text-white lg:hidden"
          >
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {groups.map((group) => (
            <div key={group.title} className="mt-6 first:mt-2">
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.href === pathname;
                  const base = "flex items-center gap-3 px-3 py-2 text-sm font-semibold";

                  if (!item.href) {
                    return (
                      <li key={item.label}>
                        <span
                          className={`${base} cursor-not-allowed text-zinc-600`}
                          title="Módulo en construcción"
                        >
                          <FontAwesomeIcon icon={item.icon} className="h-3.5 w-3.5 shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-700">
                            Pronto
                          </span>
                        </span>
                      </li>
                    );
                  }

                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`${base} transition-colors duration-150 ${
                          active
                            ? "bg-white/10 text-white"
                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={`h-3.5 w-3.5 shrink-0 ${active ? "text-accent" : ""}`}
                        />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/10 px-6 py-4">
          <p className="truncate text-sm font-semibold text-white">{user.name}</p>
          <p className="truncate text-xs text-zinc-500">{user.email}</p>
        </div>
      </aside>

      {/* ── Barra superior ── */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen(true)}
            className="p-2 text-zinc-600 hover:text-zinc-900 lg:hidden"
          >
            <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
          </button>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            Sistema ERP
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden border border-zinc-200 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500 sm:inline">
            {ROLE_LABEL[user.role]}
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-zinc-500 transition-colors hover:text-accent"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="h-3.5 w-3.5" />
              Salir
            </button>
          </form>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
