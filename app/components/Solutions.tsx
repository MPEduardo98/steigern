// app/components/Solutions.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featured = [
  {
    num: "01",
    title: "Perfil Estructural de Aluminio",
    desc: "Los perfiles estructurales de aluminio para aplicaciones en entornos de trabajo son más eficientes cuando se adaptan individualmente a su propósito específico.",
    tags: ["Modular", "Ligero", "Adaptable"],
    href: "/soluciones/perfil-de-aluminio",
    img: "/assets/images/soluciones/perfil.png",
  },
  {
    num: "02",
    title: "Sistemas de Transporte",
    desc: "Desde el desarrollo temprano del concepto hasta el estudio detallado de factibilidad, incluidos proyectos para la manipulación de materiales.",
    tags: ["Conveyors", "Manejo de Materiales", "Logística"],
    href: "/soluciones/conveyors",
    img: "/assets/images/soluciones/conveyors.png",
  },
  {
    num: "03",
    title: "Estaciones de Trabajo",
    desc: "Diseño ergonómico óptimo que adapta el lugar de trabajo considerando la iluminación, el entorno y las capacidades del operario.",
    tags: ["Ergonomía", "Seguridad", "Productividad"],
    href: "/soluciones/estaciones-de-trabajo",
    img: "/assets/images/soluciones/estaciones.png",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function SolutionsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="solutions" className="relative w-full py-20 bg-zinc-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Lo Que Construimos
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 font-black text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Soluciones de
              <br />
              Ingeniería
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-3 items-start lg:items-end"
          >
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed lg:text-right">
              Diseñamos e integramos dispositivos para el ensamble de componentes industriales,
              automatizando procesos manuales y líneas de manufactura.
            </p>
            <a
              href="/soluciones"
              className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-zinc-900 hover:text-[#E02020] transition-colors duration-200 group"
            >
              Ver todas las soluciones
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* 3 featured cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200"
        >
          {featured.map((s) => (
            <motion.a
              key={s.num}
              href={s.href}
              variants={item}
              className="bg-white group hover:bg-zinc-50 transition-colors duration-300 flex flex-col"
            >
              <div className="overflow-hidden bg-zinc-100 aspect-[4/3]">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                  <div className="w-5 h-px bg-zinc-200 group-hover:bg-[#E02020] transition-colors duration-300 mt-2" />
                </div>
                <h3
                  className="text-zinc-900 font-black text-base uppercase tracking-[-0.02em] mb-2"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-200 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-px bg-zinc-200"
        >
          <a
            href="/soluciones"
            className="flex items-center justify-between px-8 py-5 bg-white hover:bg-zinc-50 transition-colors duration-300 group"
          >
            <span
              className="text-zinc-900 font-black text-sm uppercase tracking-[0.06em]"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Ver las 6 soluciones de ingeniería
            </span>
            <div className="flex items-center gap-2 text-[#E02020] text-xs font-bold tracking-[0.15em] uppercase">
              <span>Ver todas</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}