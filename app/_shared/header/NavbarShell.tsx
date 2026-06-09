// app/_shared/header/NavbarShell.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import UserDropdown from "./UserDropdown";
import type { UserRole } from "@root/auth";

interface Props {
  user: {
    name?:       string | null;
    email?:      string | null;
    role?:       UserRole;
    empleadoId?: number | null;
  } | null;
}

export default function NavbarShell({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-200 shadow-sm"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col items-start leading-none group">
          <span
            className="text-[#E02020] text-3xl leading-none"
            style={{
              fontFamily:    "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
              fontWeight:    300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            STEIGERN
          </span>
          <span
            className="text-[14.2px] text-zinc-500 mt-1"
            style={{
              fontFamily:    "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
              fontWeight:    700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Design In Motion
          </span>
        </Link>

        {/* Right side: CTA + UserDropdown */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contacto"
            className="text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200"
          >
            Contacto
          </Link>

          <UserDropdown />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`w-5 h-px bg-zinc-900 transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`w-5 h-px bg-zinc-900 transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-px bg-zinc-900 transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-zinc-100"
          >
            <nav className="flex flex-col px-6 py-6 gap-4">
              {[
                { label: "Inicio",     href: "/" },
                { label: "Soluciones", href: "/soluciones" },
                { label: "Nosotros",   href: "/nosotros" },
                { label: "Blog",       href: "/blog" },
                { label: "Contacto",   href: "/contacto" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-zinc-700 text-sm font-semibold tracking-[0.05em] uppercase hover:text-[#E02020] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}

              {/* User mobile */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#E02020] flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-zinc-900 leading-none">{user.name}</p>
                      <p className="text-[10px] text-zinc-400 capitalize">{user.role}</p>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-xs font-bold tracking-[0.1em] uppercase text-zinc-600 hover:text-[#E02020] transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>

              <Link
                href="/contacto"
                className="text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[#E02020] text-white text-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

