// app/_shared/header/UserDropdown.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@root/i18n/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import MX from "country-flag-icons/react/3x2/MX";
import US from "country-flag-icons/react/3x2/US";
import DE from "country-flag-icons/react/3x2/DE";

const LANGUAGES = [
  { code: "es", label: "Español", Flag: MX },
  { code: "en", label: "English", Flag: US },
  { code: "de", label: "Deutsch", Flag: DE },
];

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);

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

  function changeLang(code: string) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      {/* ── Trigger ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Seleccionar idioma"
        className={`flex items-center gap-2 px-3 py-2 border transition-colors duration-200 ${
          open
            ? "border-[#E02020] text-[#E02020]"
            : "border-zinc-200 text-zinc-500 hover:border-zinc-400"
        }`}
      >
        <current.Flag title={current.label} className="w-4 h-auto rounded-[1px] shrink-0" />

        <span className="text-xs font-bold tracking-[0.1em] uppercase">
          {current.code.toUpperCase()}
        </span>

        <svg
          width="10" height="10" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-56 bg-white border border-zinc-200 shadow-md py-1"
          >
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
