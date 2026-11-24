// app/admin/_components/AdminSidebar.tsx
// Menú lateral del ERP. El elemento activo lleva una "píldora" que se desliza
// entre opciones (layoutId de framer-motion). Los módulos sin pantallas se
// muestran deshabilitados con la etiqueta "Pronto".
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { UserRole } from "@root/types/auth";
import { navForRole, type NavItem } from "./nav";

const RESORTE = { type: "spring", stiffness: 500, damping: 38, mass: 0.8 } as const;

const ROLE_LABEL: Record<UserRole, string> = {
  administrador: "Administrador",
  empleado: "Empleado",
};

function isActive(item: NavItem, pathname: string) {
  if (!item.href) return false;
  if (item.href === "/admin") return pathname.replace(/\/$/, "") === "/admin";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export default function AdminSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const groups = navForRole(role);

  return (
    <aside className="erp-sidebar flex h-full shrink-0 flex-col overflow-y-auto">
      {/* Marca */}
      <div className="erp-sidebar-brand flex h-16 shrink-0 items-center px-5">
        <Link href="/admin" aria-label="Inicio del panel">
          <Image
            src="/logos/Logo_White.png"
            alt="STEIGERN"
            width={1920}
            height={368}
            priority
            className="h-[32px] w-auto"
          />
          <span className="erp-sidebar-mark text-[18px] font-bold leading-none">S</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 pb-4 pt-1">
        {groups.map((group) => (
          <div key={group.title} className="mt-5 first:mt-0">
            <p className="erp-hide-compact px-2.5 pb-2 text-[11px] font-medium opacity-75">
              {group.title}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item, pathname);
                const content = (
                  <>
                    {active && (
                      <motion.span layoutId="erp-nav-activo" transition={RESORTE} className="erp-nav-pill" />
                    )}
                    <FontAwesomeIcon icon={item.icon} className="relative h-[15px] w-[15px] shrink-0" />
                    <span className="erp-hide-compact relative truncate">{item.label}</span>
                    {!item.href && <span className="erp-nav-badge erp-hide-compact relative">Pronto</span>}
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="erp-nav-link"
                        aria-current={active ? "page" : undefined}
                        title={item.label}
                      >
                        {content}
                      </Link>
                    ) : (
                      <span className="erp-nav-link" aria-disabled="true" title={`${item.label} · en construcción`}>
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="erp-sidebar-line erp-hide-compact shrink-0 border-t px-5 py-4">
        <p className="text-[11px] font-semibold">STEIGERN ERP</p>
        <p className="text-[11px] opacity-75">{ROLE_LABEL[role]}</p>
      </div>
    </aside>
  );
}
