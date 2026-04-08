"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Soluciones", href: "#solutions" },
  { label: "Industrias", href: "#industries" },
  { label: "Nosotros", href: "#about" },
  { label: "Contacto", href: "#contact" },
];

const languages = [
  { code: "es", label: "Español", flag: "🇲🇽" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("es");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span
            className="text-[#E02020] text-3xl leading-none"
            style={{
              fontFamily: "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            STEIGERN
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold tracking-[0.08em] uppercase text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: CTA + User */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200"
          >
            Comenzar
          </a>

          {/* User dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              aria-label="Menú de usuario"
              className={`flex items-center gap-2 px-3 py-2 border transition-colors duration-200 ${
                userOpen
                  ? "border-[#E02020] text-zinc-900 dark:text-zinc-100"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
            >
              {/* User icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="text-xs font-semibold tracking-[0.08em]">Invitado</span>
              <motion.svg
                animate={{ rotate: userOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl z-50"
                >
                  {/* Guest info */}
                  <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-[0.08em]">Invitado</p>
                        <p className="text-[10px] text-zinc-400 tracking-[0.05em]">Sin sesión activa</p>
                      </div>
                    </div>
                  </div>

                  {/* Portal de Proveedores */}
                  <div className="px-2 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <a
                      href="/portal-proveedores"
                      className="flex items-center gap-3 px-3 py-2.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-150 group"
                      onClick={() => setUserOpen(false)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#E02020] transition-colors">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      <div>
                        <p className="text-xs font-semibold tracking-[0.06em] uppercase">Portal de Proveedores</p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Iniciar sesión requerido</p>
                      </div>
                    </a>
                  </div>

                  {/* Language selector */}
                  <div className="px-2 py-2">
                    <p className="text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase px-3 mb-2">Idioma</p>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setSelectedLang(lang.code); setUserOpen(false); }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors duration-150 ${
                          selectedLang === lang.code
                            ? "bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span className="text-xs font-semibold tracking-[0.06em] uppercase">{lang.label}</span>
                        {selectedLang === lang.code && (
                          <svg className="ml-auto" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E02020" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Abrir menú"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-colors"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-colors"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-zinc-900 dark:bg-zinc-100 transition-colors"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold tracking-[0.08em] uppercase text-zinc-600 dark:text-zinc-300 hover:text-[#E02020] dark:hover:text-[#E02020] transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex flex-col gap-3">
                <a
                  href="/portal-proveedores"
                  className="flex items-center gap-2 text-sm font-semibold tracking-[0.06em] uppercase text-zinc-500 dark:text-zinc-400 hover:text-[#E02020] transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                  Portal de Proveedores
                </a>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang.code)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-semibold uppercase tracking-[0.06em] transition-colors ${
                        selectedLang === lang.code
                          ? "border-[#E02020] text-[#E02020]"
                          : "border-zinc-200 dark:border-zinc-700 text-zinc-400"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <a
                href="#contact"
                className="text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[#E02020] text-white text-center mt-2"
              >
                Comenzar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}