// app/components/Globalpresence.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function GlobalPresence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full py-20 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200" />
      <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020]" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <img
              src="From_Mexico_To_The_World.png"
              alt="From Mexico To The World | STEIGERN"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Presencia Global
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 font-black text-[clamp(1.8rem,3.2vw,3.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-6"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              From Mexico
              <br />
              <span className="text-[#E02020]">To The World</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-zinc-500 text-sm leading-relaxed mb-8"
            >
              En STEIGERN llevamos la innovación mexicana a los mercados
              internacionales, entregando calidad y diseño industrial de clase mundial.
              Nuestro compromiso trasciende fronteras para conectar con clientes y
              proyectos en todo el planeta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-8 pt-8 border-t border-zinc-200"
            >
              {[
                { value: "60+", label: "Países Atendidos" },
                { value: "3", label: "Continentes" },
                { value: "100%", label: "Hecho en México" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-zinc-900">{value}</div>
                  <div className="text-xs text-zinc-400 tracking-[0.12em] uppercase mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}