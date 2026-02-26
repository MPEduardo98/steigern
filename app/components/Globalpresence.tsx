"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function GlobalPresence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-28 bg-zinc-900 dark:bg-zinc-950 overflow-hidden transition-colors duration-300"
    >
      {/* Always dark section — minimal border adjustment */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020]" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#E02020] opacity-[0.04]" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-px border border-zinc-700" />
            <img
              src="/assets/images/logos/From_Mexico_To_The_World.webp"
              alt="From Mexico To The World | STEIGERN"
              loading="lazy"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#E02020]" />
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
                Presencia Global
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white font-black text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-8"
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
              className="text-zinc-400 text-base leading-relaxed mb-10"
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
              className="flex flex-wrap gap-10 pt-10 border-t border-zinc-800"
            >
              {[
                { value: "60+", label: "Países Atendidos" },
                { value: "3", label: "Continentes" },
                { value: "100%", label: "Hecho en México" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-white">{value}</div>
                  <div className="text-xs text-zinc-500 tracking-[0.12em] uppercase mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}