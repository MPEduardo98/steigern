// app/global/header/Header.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const languages = [
  { code: "es", label: "Español", flag: "🇲🇽" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("es");
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      className="fixed top-0 left-0 w-full z-50 bg-white border-b border-zinc-200 shadow-sm"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
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
        </Link>

        {/* Right side: CTA + User */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contacto"
            className="text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200"
          >
            Comenzar
          </Link>

          {/* Language dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              aria-label="Seleccionar idioma"
              className={`flex items-center gap-2 px-3 py-2 border transition-colors duration-200 ${
                userOpen
                  ? "border-[#E02020] text-[#E02020]"
                  : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
              }`}
            >
              <span className="text-sm">
                {languages.find((l) => l.code === selectedLang)?.flag}
              </span>
              <span className="text-xs font-bold tracking-[0.1em] uppercase">
                {selectedLang}
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <AnimatePresence>
              {userOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1 w-36 bg-white border border-zinc-200 shadow-md py-1"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLang(lang.code); setUserOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-[0.08em] uppercase transition-colors duration-150 ${
                        selectedLang === lang.code
                          ? "text-[#E02020]"
                          : "text-zinc-500 hover:text-zinc-900"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                { label: "Inicio", href: "/" },
                { label: "Soluciones", href: "/soluciones" },
                { label: "Nosotros", href: "/nosotros" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contacto" },
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

              {/* Language selector mobile */}
              <div className="flex gap-2 pt-2 border-t border-zinc-100 flex-wrap">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold tracking-[0.1em] uppercase border transition-colors duration-150 ${
                      selectedLang === lang.code
                        ? "border-[#E02020] text-[#E02020]"
                        : "border-zinc-200 text-zinc-400"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <Link
                href="/contacto"
                className="text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 bg-[#E02020] text-white text-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Comenzar
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}