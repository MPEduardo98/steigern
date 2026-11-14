// app/admin/_components/AdminUserButton.tsx
// Botón de cuenta de la barra superior: avatar con inicial, nombre y menú.
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { logoutAction } from "@/[locale]/_actions/auth";
import type { UserRole } from "@root/types/auth";

const ROLE_LABEL: Record<UserRole, string> = {
  administrador: "Administrador",
  empleado: "Empleado",
};

interface Props {
  user: { name: string; email: string; role: UserRole };
}

export default function AdminUserButton({ user }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const initial = user.name.trim().charAt(0).toUpperCase() || "?";
  const firstName = user.name.trim().split(/\s+/)[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="erp-chip erp-chip-user"
        aria-label="Cuenta"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="erp-avatar" aria-hidden="true">{initial}</span>
        <span className="erp-user-name">{firstName}</span>
        <svg aria-hidden="true" className="erp-user-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-60 origin-top-right overflow-hidden rounded-xl border border-[#ebebeb] bg-white text-[#0a0a0a] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.16),0_2px_6px_rgba(0,0,0,0.04)]"
          >
            <div className="px-3.5 py-3">
              <p className="truncate text-[13px] font-medium">{user.name}</p>
              <p className="truncate text-[12px] text-[#737373]">{user.email}</p>
              <span className="mt-2 inline-block rounded-full bg-[#fdecec] px-2 py-0.5 text-[11px] font-medium text-[#a51515]">
                {ROLE_LABEL[user.role]}
              </span>
            </div>

            <div className="border-t border-[#f5f5f5] p-1">
              <Link
                href="/admin/cuenta"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex h-8 items-center rounded-md px-2.5 text-[13px] text-[#262626] hover:bg-[#f5f5f5]"
              >
                Mi cuenta
              </Link>
              <Link
                href="/"
                target="_blank"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex h-8 items-center rounded-md px-2.5 text-[13px] text-[#262626] hover:bg-[#f5f5f5]"
              >
                Ver sitio web
              </Link>
            </div>

            <form action={logoutAction} className="border-t border-[#f5f5f5] p-1">
              <button
                type="submit"
                role="menuitem"
                className="flex h-8 w-full cursor-pointer items-center rounded-md px-2.5 text-left text-[13px] text-[#c41a1a] hover:bg-[#fdecec]"
              >
                Cerrar sesión
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
