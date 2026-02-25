"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const solutions = [
  {
    num: "01",
    title: "Industrial Automation",
    desc: "End-to-end automation systems that optimize throughput, reduce downtime, and integrate seamlessly with existing infrastructure.",
    tags: ["PLC Systems", "SCADA", "MES Integration"],
  },
  {
    num: "02",
    title: "Precision Robotics",
    desc: "Custom-engineered robotic cells for assembly, welding, and material handling with sub-millimeter accuracy.",
    tags: ["Collaborative Robots", "Vision Systems", "Force Sensing"],
  },
  {
    num: "03",
    title: "Machine Engineering",
    desc: "From concept to commissioning — bespoke machinery designed around your production needs and floor constraints.",
    tags: ["Custom Builds", "Retrofitting", "Line Balancing"],
  },
  {
    num: "04",
    title: "Digital Twin & IIoT",
    desc: "Real-time monitoring, predictive maintenance, and digital simulation of your entire production ecosystem.",
    tags: ["OPC-UA", "Edge Computing", "Analytics"],
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
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Solutions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="solutions"
      className="relative w-full py-28 bg-white dark:bg-zinc-900 overflow-hidden"
    >
      {/* Accent stripe */}
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
                What We Build
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 dark:text-white font-black text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Engineering
              <br />
              Solutions
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-sm text-base leading-relaxed"
          >
            Every challenge demands a precise answer. Our engineering teams design systems that perform — day in, day out.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-700"
        >
          {solutions.map((s) => (
            <motion.div
              key={s.num}
              variants={item}
              className="group bg-white dark:bg-zinc-900 p-10 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[#E02020] text-xs font-black tracking-[0.2em]">
                  {s.num}
                </span>
                <motion.div
                  whileHover={{ x: 4, y: -4 }}
                  className="w-8 h-8 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center group-hover:border-[#E02020] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" className="text-zinc-400 group-hover:text-[#E02020] transition-colors" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-zinc-900 dark:text-white font-bold text-xl mb-3 tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400"
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