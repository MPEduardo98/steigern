"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  { title: "Precisión Ante Todo", desc: "Tolerancias medidas en micrones. Calidad incorporada en cada proceso." },
  { title: "Construido para Durar", desc: "Máquinas diseñadas para décadas de operación fiable con alta carga." },
  { title: "Integrado al Cliente", desc: "Nuestros ingenieros trabajan en su planta, no solo en nuestro taller." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full py-28 bg-zinc-50 overflow-hidden"
    >
      {/* Red corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#E02020] opacity-[0.06]" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Nuestra Base
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 font-black text-[clamp(2.2rem,4vw,4rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-8"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Forjados en la
              <br />
              <span className="text-[#E02020]">Industria</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-zinc-600 text-base leading-relaxed mb-5"
            >
              STEIGERN fue fundada por ingenieros que creían que la manufactura merecía más: máquinas más fiables, integración más inteligente y socios que se mantienen a largo plazo.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-zinc-600 text-base leading-relaxed mb-10"
            >
              Con sede en Múnich y con operaciones en tres continentes, hemos diseñado más de 1,200 sistemas de producción para algunas de las empresas manufactureras más exigentes del mundo.
            </motion.p>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col gap-6"
            >
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-1 bg-[#E02020] shrink-0 mt-1" style={{ height: "calc(100% - 4px)" }} />
                  <div>
                    <div
                      className="text-zinc-900 font-black text-sm uppercase tracking-[0.05em] mb-1"
                      style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                    >
                      {v.title}
                    </div>
                    <div className="text-zinc-500 text-sm leading-relaxed">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-zinc-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[12vw] lg:text-[8vw] font-black text-zinc-200 uppercase tracking-[-0.05em] select-none"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  1984
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-100 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-zinc-900 font-black text-5xl tracking-[-0.04em]" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>40</div>
                <div className="text-zinc-500 text-xs tracking-[0.2em] uppercase">Años de excelencia en ingeniería</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#E02020]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}