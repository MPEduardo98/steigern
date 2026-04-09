"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full py-28 bg-white dark:bg-zinc-950 overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800 z-10 pointer-events-none" />
            <img
              src="/assets/images/corporativo.webp"
              alt="STEIGERN Corporativo Querétaro"
              loading="lazy"
              className="w-full h-full object-cover min-h-[360px]"
            />
            <div className="absolute bottom-0 left-0 w-10 h-10 bg-[#E02020] z-10" />
          </motion.div>

          {/* Right: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Nuestra Historia
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-8"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Quiénes
              <br />
              <span className="text-[#E02020]">Somos</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-6"
            >
              Somos una empresa mexicana comprometida con el <span className="text-zinc-800 dark:text-zinc-200 font-semibold">desarrollo tecnológico industrial</span>, mediante servicios y productos vanguardistas acorde a las exigencias a nivel mundial.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10"
            >
              Con <span className="text-zinc-800 dark:text-zinc-200 font-semibold">13 años de experiencia</span>, nos hemos convertido en un socio comercial confiable en dispositivos de ensamble para componentes de automoción, exportando desde México al mundo.
            </motion.p>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap gap-10 pt-8 border-t border-zinc-200 dark:border-zinc-800 mb-10"
            >
              {[
                { value: "13+", label: "Años de Experiencia" },
                { value: "MX→USA", label: "Exportando desde 2020" },
                { value: "QRO", label: "Corporativo en Querétaro" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 tracking-[0.12em] uppercase mt-1">{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              href="/nosotros"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-zinc-900 dark:text-zinc-100 hover:text-[#E02020] dark:hover:text-[#E02020] transition-colors duration-200 group"
            >
              Conocer nuestra historia completa
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}