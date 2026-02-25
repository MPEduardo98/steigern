"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const industries = [
  {
    id: "automotive",
    label: "Automotive",
    desc: "High-volume assembly lines, body shop automation, and end-of-line testing systems trusted by Tier 1 suppliers worldwide.",
    stat: "320+ lines",
  },
  {
    id: "aerospace",
    label: "Aerospace",
    desc: "Precision machining cells, composite handling, and traceability systems meeting the strictest aerospace quality standards.",
    stat: "AS9100D Certified",
  },
  {
    id: "pharma",
    label: "Pharma & Food",
    desc: "GMP-compliant automation for filling, packaging, and inspection in regulated clean environments.",
    stat: "ISO Class 5–8",
  },
  {
    id: "energy",
    label: "Energy & Heavy",
    desc: "Large-format fabrication, pipeline management, and hazardous-area certified equipment for demanding environments.",
    stat: "ATEX / IECEx",
  },
  {
    id: "electronics",
    label: "Electronics",
    desc: "SMT automation, micro-assembly, and ESD-safe handling systems for high-density circuit board manufacturing.",
    stat: "IPC-A-610",
  },
  {
    id: "logistics",
    label: "Intralogistics",
    desc: "Automated storage and retrieval, conveyor integration, and WMS connectivity for modern distribution centers.",
    stat: "99.7% accuracy",
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
      className="relative w-full py-28 bg-zinc-950 overflow-hidden"
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

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
                Sectors We Serve
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white font-black text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Industries
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 border border-zinc-800">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-800">
            {industries.map((ind, i) => (
              <motion.button
                key={ind.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 + 0.3 }}
                onClick={() => setActive(ind.id)}
                className={`w-full text-left px-7 py-5 flex items-center justify-between transition-all duration-200 border-b border-zinc-800 last:border-b-0 ${
                  active === ind.id
                    ? "bg-[#E02020] text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <span className="text-sm font-bold tracking-[0.08em] uppercase">
                  {ind.label}
                </span>
                {active === ind.id && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="white" strokeWidth="1.5" />
                  </svg>
                )}
              </motion.button>
            ))}
          </div>

          {/* Detail */}
          <div className="flex-1 p-10 lg:p-16 flex flex-col justify-between min-h-[320px]">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <h3 className="text-white font-black text-3xl lg:text-4xl tracking-[-0.03em] mb-5 uppercase" style={{ fontFamily: "var(--font-display)" }}>
                {activeData.label}
              </h3>
              <p className="text-zinc-400 text-base leading-relaxed max-w-xl mb-8">
                {activeData.desc}
              </p>
              <div className="inline-block border border-zinc-700 px-4 py-2">
                <span className="text-[#E02020] text-xs font-bold tracking-[0.2em] uppercase">
                  {activeData.stat}
                </span>
              </div>
            </motion.div>
            <div className="mt-10 pt-8 border-t border-zinc-800 flex items-center gap-4">
              <a href="#contact" className="text-xs font-bold tracking-[0.12em] uppercase text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
                Discuss your project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}