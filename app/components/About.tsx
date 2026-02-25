"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  { title: "Precision First", desc: "Tolerances measured in microns. Quality built into every process." },
  { title: "Built to Last", desc: "Machines engineered for decades of reliable, high-load operation." },
  { title: "Client Embedded", desc: "Our engineers work on your floor, not just in our workshop." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full py-28 bg-white dark:bg-zinc-900 overflow-hidden"
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
                Our Foundation
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 dark:text-white font-black text-[clamp(2.2rem,4vw,4rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Forged in
              <br />
              <span className="text-[#E02020]">Industry</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-5"
            >
              STEIGERN was founded by engineers who believed that manufacturing deserved better — more reliable machines, smarter integration, and partners who stay for the long haul.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed mb-10"
            >
              From our headquarters in Munich to production floors across six continents, we deliver engineering solutions that keep the world's most demanding operations running at full capacity.
            </motion.p>

            {/* Values */}
            <div className="space-y-6">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="flex gap-5 items-start"
                >
                  <div className="w-px h-12 bg-[#E02020] shrink-0 mt-1" />
                  <div>
                    <div className="text-zinc-900 dark:text-white font-bold text-sm mb-1">{v.title}</div>
                    <div className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: visual block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            {/* Main block */}
            <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden">
              {/* Industrial lines decoration */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-full h-px bg-zinc-900 dark:bg-zinc-100" />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="text-[7rem] font-black text-zinc-900/10 dark:text-white/10 tracking-[-0.05em] uppercase leading-none select-none" style={{ fontFamily: "var(--font-display)" }}>
                    40+
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-black text-zinc-900 dark:text-white tracking-[-0.03em]" style={{ fontFamily: "var(--font-display)" }}>40+</div>
                      <div className="text-xs text-zinc-500 tracking-[0.2em] uppercase mt-2">Years of Excellence</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Red corner */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-[#E02020]" />
            </div>

            {/* Small stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -bottom-6 -right-6 bg-zinc-950 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 p-6"
            >
              <div className="text-3xl font-black text-white tracking-[-0.03em]">Munich</div>
              <div className="text-xs text-zinc-500 tracking-[0.15em] uppercase mt-1">Headquarters</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}