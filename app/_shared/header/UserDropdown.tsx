// app/_shared/header/UserDropdown.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@root/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightToBracket,
  faRightFromBracket,
  faTableColumns,
  faGlobe,
  faShield,
  faBriefcase,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { logoutAction } from "@/[locale]/_actions/auth";
import type { UserRole } from "@root/auth";
import MX from "country-flag-icons/react/3x2/MX";
import US from "country-flag-icons/react/3x2/US";
import DE from "country-flag-icons/react/3x2/DE";

interface Props {
  user: {
    name?:  string | null;
    email?: string | null;
    role?:  UserRole;
  } | null;
}

const ROLE_LABEL: Record<UserRole, string> = {
  administrador: "Administrador",
  empleado:      "Empleado",
  proveedor:     "Proveedor",
};

const ROLE_ICON: Record<UserRole, typeof faShield> = {
  administrador: faShield,
  empleado:      faBriefcase,
  proveedor:     faTruck,
};

const ROLE_PORTAL: Record<UserRole, string> = {
  administrador: "/admin",
  empleado:      "/admin",
  proveedor:     "/portal-proveedores",
};

const LANGUAGES = [
  { code: "es", label: "Español", Flag: MX },
  { code: "en", label: "English", Flag: US },
  { code: "de", label: "Deutsch", Flag: DE },
];

export default function UserDropdown({ user }: Props) {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);

  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleLogout() {
    setLoading(true);
    await logoutAction();
  }

  function changeLang(code: string) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  const isGuest    = !user;
  const firstName  = user?.name?.split(" ")[0] ?? "Usuario";

  return (
    <div ref={ref} className="relative">
      {/* â”€â”€ Trigger â”€â”€ */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Menú de usuario"
        className={`flex items-center gap-2 px-3 py-2 border transition-colors duration-200 ${
          open
            ? "border-[#E02020] text-[#E02020]"
            : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
        }`}
      >
        <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
          isGuest ? "bg-zinc-100 text-zinc-400" : "bg-[#E02020] text-white"
        }`}>
          {isGuest
            ? <FontAwesomeIcon icon={faUser} className="w-2.5 h-2.5" />
            : <span className="text-xs font-bold leading-none">{user.name?.charAt(0).toUpperCase() ?? "U"}</span>
          }
        </span>

        <span className="text-xs font-bold tracking-[0.1em] uppercase">
          {isGuest ? "Invitado" : firstName}
        </span>

        <svg
          width="10" height="10" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* â”€â”€ Panel â”€â”€ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-56 bg-white border border-zinc-200 shadow-md py-1"
          >

            {/* â”€â”€ Bloque usuario â”€â”€ */}
            {isGuest ? (
              <div className="px-4 py-3 border-b border-zinc-100">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-zinc-400" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Invitado</p>
                    <p className="text-[10px] text-zinc-400">Sin sesión activa</p>
                  </div>
                </div>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-[#E02020] text-white text-xs font-bold tracking-[0.1em] uppercase hover:bg-[#c41a1a] transition-colors duration-200"
                >
                  <FontAwesomeIcon icon={faRightToBracket} className="w-3 h-3" />
                  Iniciar Sesión
                </Link>
              </div>
            ) : (
              <div className="border-b border-zinc-100">
                <div className="px-4 py-3 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-[#E02020] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name?.charAt(0).toUpperCase() ?? "U"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-900 truncate">{user.name}</p>
                    <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
                    {user.role && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <FontAwesomeIcon icon={ROLE_ICON[user.role]} className="w-2 h-2 text-[#E02020]" />
                        <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#E02020]">
                          {ROLE_LABEL[user.role]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {user.role && (
                  <Link
                    href={ROLE_PORTAL[user.role]}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold tracking-[0.08em] uppercase text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors duration-150"
                  >
                    <FontAwesomeIcon icon={faTableColumns} className="w-3 h-3 text-zinc-400" />
                    Mi Portal
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold tracking-[0.08em] uppercase text-zinc-500 hover:text-[#E02020] hover:bg-red-50 transition-colors duration-150 disabled:opacity-50"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} className="w-3 h-3" />
                  {loading ? "Cerrando..." : "Cerrar Sesión"}
                </button>
              </div>
            )}

            {/* â”€â”€ Bloque idioma â”€â”€ */}
            <div className="px-4 py-2.5">
              <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.18em] uppercase text-zinc-400 mb-2">
                <FontAwesomeIcon icon={faGlobe} className="w-2.5 h-2.5" />
                Idioma
              </p>
              <div className="flex gap-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => changeLang(l.code)}
                    className={`flex items-center gap-1 px-2 py-1 text-xs font-bold tracking-[0.08em] uppercase border transition-colors duration-150 ${
                      locale === l.code
                        ? "border-[#E02020] text-[#E02020]"
                        : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
                    }`}
                  >
                    <l.Flag title={l.label} className="w-4 h-auto rounded-[1px] shrink-0" />
                    {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


