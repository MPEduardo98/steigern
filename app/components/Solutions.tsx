"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const solutions = [
  {
    num: "01",
    title: "Automatización Industrial",
    desc: "Sistemas de automatización de extremo a extremo que optimizan el rendimiento, reducen el tiempo de inactividad y se integran perfectamente con la infraestructura existente.",
    tags: ["Sistemas PLC", "SCADA", "Integración MES"],
  },
  {
    num: "02",
    title: "Robótica de Precisión",
    desc: "Celdas robóticas diseñadas a medida para ensamblaje, soldadura y manejo de materiales con precisión submilimétrica.",
    tags: ["Robots Colaborativos", "Sistemas de Visión", "Detección de Fuerza"],
  },
  {
    num: "03",
    title: "Ingeniería de Máquinas",
    desc: "Desde el concepto hasta la puesta en marcha: maquinaria personalizada diseñada en torno a sus necesidades de producción y restricciones de planta.",
    tags: ["Fabricación a Medida", "Modernización", "Balanceo de Línea"],
  },
  {
    num: "04",
    title: "Gemelo Digital e IIoT",
    desc: "Monitoreo en tiempo real, mantenimiento predictivo y simulación digital de todo su ecosistema de producción.",
    tags: ["OPC-UA", "Cómputo en el Borde", "Analítica"],
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
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
      className="relative w-full py-28 bg-zinc-50 overflow-hidden"
    >
      {/* Accent stripe */}
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200" />

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
              className="text-zinc-900 font-black text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
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
            className="text-zinc-500 max-w-sm text-base leading-relaxed"
          >
            Cada desafío exige una respuesta precisa. Nuestros equipos de ingeniería diseñan sistemas que rinden, día tras día.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200"
        >
          {solutions.map((s) => (
            <motion.div
              key={s.num}
              variants={item}
              className="bg-white p-10 group hover:bg-zinc-50 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                <div className="w-6 h-px bg-zinc-200 group-hover:bg-[#E02020] transition-colors duration-300 mt-2" />
              </div>
              <h3
                className="text-zinc-900 font-black text-2xl uppercase tracking-[-0.02em] mb-4"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                {s.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 border border-zinc-200 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}