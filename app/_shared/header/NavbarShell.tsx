// app/_shared/header/NavbarShell.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import UserDropdown from "./UserDropdown";

const solutionLinks = [
  { label: "Perfil Estructural de Aluminio", href: "/soluciones/perfil-de-aluminio" },
  { label: "Sistemas de Transporte",          href: "/soluciones/conveyors" },
  { label: "Estaciones de Trabajo",           href: "/soluciones/estaciones-de-trabajo" },
  { label: "Dispositivos Asistidos por Co-Bots", href: "/soluciones/dispositivos-asistidos-por-cobots" },
  { label: "Elevación y Guías Lineales",      href: "/soluciones/elevacion-y-guias-lineales" },
  { label: "Soluciones Lean",                 href: "/soluciones/soluciones-lean" },
  { label: "Desarrollo de Proyectos",         href: "/soluciones/desarrollo-de-proyectos" },
];

const aboutLinks = [
  { label: "Quiénes Somos",     href: "/nosotros#quienes-somos" },
  { label: "Misión y Visión",   href: "/nosotros#mision-vision" },
  { label: "Valores",           href: "/nosotros#valores" },
];

export default function NavbarShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Bloquear scroll del body mientras el sidebar está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links: { label: string; href: string; sub?: { label: string; href: string }[] }[] = [
    { label: "Inicio",     href: "/" },
    { label: "Soluciones", href: "/soluciones", sub: solutionLinks },
    { label: "Nosotros",   href: "/nosotros",   sub: aboutLinks },
    { label: "Bolsa de Trabajo", href: "/bolsa-de-trabajo" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-200 shadow-sm"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/logos/Logo.png"
            alt="STEIGERN Design In Motion"
            width={1920}
            height={368}
            priority
            className="h-7 md:h-9 w-auto"
          />
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

      {/* Mobile sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/50"
            />

            {/* Panel deslizante de derecha a izquierda */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="md:hidden fixed top-0 right-0 z-50 h-full w-[80%] max-w-xs bg-white shadow-2xl flex flex-col"
            >
              {/* Cabecera del panel */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-100">
                <Image
                  src="/logos/Logo.png"
                  alt="STEIGERN Design In Motion"
                  width={1920}
                  height={368}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-2 text-zinc-900"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col px-6 py-6 gap-4 flex-1 overflow-y-auto">
                {links.map((link) =>
                  link.sub ? (
                    <div key={link.href} className="flex flex-col">
                      <button
                        onClick={() => setOpenSection((v) => (v === link.href ? null : link.href))}
                        aria-expanded={openSection === link.href}
                        className="flex items-center justify-between text-zinc-700 text-sm font-semibold tracking-[0.05em] uppercase hover:text-[#E02020] transition-colors duration-200"
                      >
                        {link.label}
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className={`transition-transform duration-200 ${openSection === link.href ? "rotate-180" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSection === link.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pl-3 mt-3 border-l border-zinc-200">
                              {link.sub.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setMenuOpen(false)}
                                  className="text-zinc-500 text-xs font-medium tracking-[0.03em] hover:text-[#E02020] transition-colors duration-200"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-zinc-700 text-sm font-semibold tracking-[0.05em] uppercase hover:text-[#E02020] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  )
                )}

                <Link
                  href="/contacto"
                  className="text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[#E02020] text-white text-center mt-auto"
                  onClick={() => setMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

