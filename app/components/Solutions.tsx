"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const solutions = [
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
    desc: "Desde el desarrollo temprano del concepto hasta el estudio detallado de factibilidad, incluidos proyectos para la manipulación de materiales que consideran la logística de forma integral.",
    tags: ["Conveyors", "Manejo de Materiales", "Logística"],
    href: "/soluciones/conveyors",
    img: "/assets/images/soluciones/conveyors.JPG",
  },
  {
    num: "03",
    title: "Estaciones de Trabajo",
    desc: "Diseño ergonómico óptimo que adapta el lugar de trabajo considerando la iluminación, el entorno y las capacidades del operario. Protección y seguridad avanzada.",
    tags: ["Ergonomía", "Seguridad", "Productividad"],
    href: "/soluciones/estaciones-de-trabajo",
    img: "/assets/images/soluciones/estaciones.png",
  },
  {
    num: "04",
    title: "Dispositivos Asistidos por Co-Bots",
    desc: "Integración de robots colaborativos para asistir y potenciar las capacidades del operario en líneas de ensamble, reduciendo errores y mejorando tiempos de ciclo.",
    tags: ["Cobots", "Ensamble", "Automatización"],
    href: "/soluciones/dispositivos-asistidos-por-cobots",
    img: "/assets/images/soluciones/cobots.png",
  },
  {
    num: "05",
    title: "Elevación y Guías Lineales",
    desc: "Sistemas de elevación y guías lineales de precisión para el movimiento controlado de componentes y subconjuntos dentro de líneas de manufactura y ensamblaje.",
    tags: ["Guías Lineales", "Elevadores", "Precisión"],
    href: "/soluciones/elevacion-y-guias-lineales",
    img: "/assets/images/soluciones/elevacion.webp",
  },
  {
    num: "06",
    title: "Soluciones Lean",
    desc: "Estructuras básicas industriales y soluciones orientadas a la manufactura esbelta, eliminando desperdicios y optimizando cada etapa del proceso productivo.",
    tags: ["Lean Manufacturing", "Mejora Continua", "Eficiencia"],
    href: "/soluciones/soluciones-lean",
    img: "/assets/images/soluciones/estructuras.png",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Solutions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="solutions"
      className="relative w-full py-28 bg-zinc-50 dark:bg-zinc-900 overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
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
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Soluciones de
              <br />
              Ingeniería
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-sm text-base leading-relaxed"
          >
            Diseñamos e integramos dispositivos para el ensamble de componentes industriales, automatizando procesos manuales y líneas de manufactura en todos los niveles.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800"
        >
          {solutions.map((s) => (
            <motion.a
              key={s.num}
              href={s.href}
              variants={item}
              className="bg-white dark:bg-zinc-900 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-[4/3]">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                  <div className="w-6 h-px bg-zinc-200 dark:bg-zinc-700 group-hover:bg-[#E02020] transition-colors duration-300 mt-2" />
                </div>
                <h3
                  className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 border border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}