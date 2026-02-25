"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Industrial grid background - light */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Red accent bar — left */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        style={{ originY: 0 }}
        className="absolute left-0 top-0 w-1 h-full bg-[#E02020]"
      />

      {/* Large background text */}
      <motion.div
        style={{ y, opacity }}
        className="absolute right-0 bottom-8 pointer-events-none select-none overflow-hidden"
      >
        <span
          className="text-[22vw] font-black tracking-[-0.05em] leading-none text-zinc-900/[0.04] uppercase"
          style={{ fontFamily: "var(--font-display)" }}
        >
          STEIGERN
        </span>
      </motion.div>

      {/* Diagonal accent decoration */}
      <div className="absolute top-0 right-0 w-[40%] h-full overflow-hidden pointer-events-none">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute inset-0 bg-[#E02020]/[0.04]"
          style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-[1440px] mx-auto w-full px-8 lg:px-20 pt-24 pb-16"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-[#E02020]" />
          <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
            Excelencia Industrial
          </span>
        </motion.div>

        {/* Headline — slogan stays in English per brand guidelines */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="text-zinc-900 font-black text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.03em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We Enjoy
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
            className="text-[#E02020] font-black text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] tracking-[-0.03em] uppercase"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Making Machines
          </motion.h1>
        </div>

        {/* Sub + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row sm:items-end gap-8 max-w-2xl"
        >
          <p className="text-zinc-500 text-lg leading-relaxed flex-1">
            Soluciones de ingeniería de precisión y automatización industrial que transforman 
            las operaciones de manufactura. Construido para rendir. Diseñado para durar.
          </p>
          <div className="flex gap-3 shrink-0">
            <a
              href="#solutions"
              className="text-xs font-bold tracking-[0.12em] uppercase px-6 py-3.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200"
            >
              Ver Soluciones
            </a>
            <a
              href="#about"
              className="text-xs font-bold tracking-[0.12em] uppercase px-6 py-3.5 border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors duration-200"
            >
              Nuestra Historia
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex flex-wrap gap-12 mt-20 pt-10 border-t border-zinc-200"
        >
          {[
            { value: "40+", label: "Años de Ingeniería" },
            { value: "1,200+", label: "Máquinas Instaladas" },
            { value: "98%", label: "Garantía de Disponibilidad" },
            { value: "60+", label: "Países Atendidos" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-black text-zinc-900 tracking-[-0.03em]">{value}</div>
              <div className="text-xs text-zinc-400 tracking-[0.12em] uppercase mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}