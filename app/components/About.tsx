"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const industries = [
  {
    id: "automotive",
    label: "Automotriz",
    desc: "Líneas de ensamblaje de alto volumen, automatización de carrocería y sistemas de prueba de final de línea utilizados por proveedores Tier 1 en todo el mundo.",
    stat: "320+ líneas",
  },
  {
    id: "aerospace",
    label: "Aeroespacial",
    desc: "Celdas de mecanizado de precisión, manejo de compuestos y sistemas de trazabilidad que cumplen con los más estrictos estándares de calidad aeroespacial.",
    stat: "Certificado AS9100D",
  },
  {
    id: "pharma",
    label: "Farma y Alimentos",
    desc: "Automatización compatible con GMP para llenado, empaquetado e inspección en entornos limpios regulados.",
    stat: "ISO Clase 5–8",
  },
  {
    id: "energy",
    label: "Energía e Industria Pesada",
    desc: "Fabricación de gran formato, gestión de tuberías y equipos certificados para zonas peligrosas en entornos exigentes.",
    stat: "ATEX / IECEx",
  },
  {
    id: "electronics",
    label: "Electrónica",
    desc: "Automatización SMT, microensamblaje y sistemas de manipulación seguros contra ESD para la fabricación de placas de alta densidad.",
    stat: "IPC-A-610",
  },
  {
    id: "logistics",
    label: "Intrologística",
    desc: "Almacenamiento y recuperación automatizados, integración de transportadores y conectividad WMS para centros de distribución modernos.",
    stat: "99.7% de precisión",
  },
];

export default function Industries() {
  const [active, setActive] = useState("automotive");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const activeData = industries.find((i) => i.id === active)!;

  return (
    <section
      id="industries"
      className="relative w-full py-28 bg-white dark:bg-zinc-950 overflow-hidden transition-colors duration-300"
    >
      <div ref={ref} className="relative max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Sectores que Atendemos
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Industrias
              <br />
              que Servimos
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: selector */}
          <div className="flex flex-col gap-0 border-t border-zinc-200 dark:border-zinc-800">
            {industries.map((ind, i) => (
              <motion.button
                key={ind.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onClick={() => setActive(ind.id)}
                className={`flex items-center justify-between py-5 border-b border-zinc-200 dark:border-zinc-800 text-left transition-all duration-200 group ${
                  active === ind.id ? "pl-4 border-l-2 border-l-[#E02020]" : "pl-0"
                }`}
              >
                <span
                  className={`font-black uppercase tracking-[-0.01em] text-lg transition-colors duration-200 ${
                    active === ind.id
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                  }`}
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  {ind.label}
                </span>
                <span className={`text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-200 ${
                  active === ind.id ? "text-[#E02020]" : "text-zinc-300 dark:text-zinc-700"
                }`}>
                  {ind.stat}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right: detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="w-12 h-1 bg-[#E02020] mb-8" />
            <h3
              className="text-zinc-900 dark:text-zinc-100 font-black text-3xl uppercase tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              {activeData.label}
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-8">
              {activeData.desc}
            </p>
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.2em] uppercase">
                {activeData.stat}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}