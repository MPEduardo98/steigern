"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const brands = [
  { name: "Siemens", src: "/marcas/simens.webp" },
  { name: "RK Rose+Krieger", src: "/marcas/rkrose.webp" },
  { name: "Minitec", src: "/marcas/minitec.webp" },
  { name: "Festo", src: "/marcas/festo.webp" },
  { name: "Cognex", src: "/marcas/cognex.webp" },
  { name: "Bosch Rexroth", src: "/marcas/bosch_rexroth.webp" },
];

const brandsDup = [...brands, ...brands];

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full py-28 bg-white dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Tecnología de Clase Mundial
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2rem,4vw,4rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Integrando con las
              <br />
              <span className="text-[#E02020]">Mejores Marcas</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed"
          >
            Integramos componentes de las marcas más reconocidas en automatización y
            control industrial, asegurando soluciones confiables, eficientes y
            personalizadas para cada proyecto.
          </motion.p>
        </div>
      </div>

      {/* Infinite scroll carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative w-full overflow-hidden border-y border-zinc-100 dark:border-zinc-800"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div
          className="flex gap-0"
          style={{ animation: "brands-scroll 28s linear infinite", width: "max-content" }}
        >
          {brandsDup.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center px-14 py-10 border-r border-zinc-100 dark:border-zinc-800 shrink-0"
              style={{ minWidth: "200px" }}
            >
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                className="h-10 w-auto object-contain grayscale opacity-40 dark:opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes brands-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 mt-6">
        <p className="text-[11px] text-zinc-400 dark:text-zinc-600 text-center leading-relaxed">
          *Todas las marcas y logotipos mostrados son propiedad de sus respectivos titulares.
          Usados únicamente con fines informativos para mostrar compatibilidad y experiencia tecnológica.
        </p>
      </div>
    </section>
  );
}