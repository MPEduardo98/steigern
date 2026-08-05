// app/[locale]/(homepage)/_components/Hero.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { yearsOfExperience } from "@root/lib/company";

const headingStyle = {
  fontFamily: "var(--font-heading), 'Bebas Neue', Impact, sans-serif",
  letterSpacing: "0.01em",
  textTransform: "uppercase" as const,
};

export default function Hero() {
  const t = useTranslations("Hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const years = yearsOfExperience();
  const stats = [
    { value: t("stat1_value", { years }), label: t("stat1_label") },
    { value: t("stat2_value"), label: t("stat2_label") },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-white"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-[1440px] mx-auto w-full px-8 lg:px-20 pt-20 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-center"
      >
        {/* LEFT */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
              {t("eyebrow")}
            </span>
          </motion.div>

          {/* Un único H1 por página: las dos líneas son spans animados. */}
          <h1
            className="text-[clamp(1.75rem,3.2vw,3.25rem)] leading-tight mb-7"
            style={headingStyle}
          >
            <span className="block overflow-hidden mb-1">
              <motion.span
                className="block text-zinc-900"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.6 }}
              >
                {t("title_line1")}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-[#E02020]"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.75 }}
              >
                {t("title_line2")}
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col gap-5 max-w-md"
          >
            <p className="text-zinc-500 text-base leading-relaxed">
              {t("description")}
            </p>
            <div className="flex gap-3">
              <Link
                href="#solutions"
                className="text-xs font-bold tracking-[0.12em] uppercase px-5 py-3 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200"
              >
                {t("cta_solutions")}
              </Link>
              <Link
                href="#about"
                className="text-xs font-bold tracking-[0.12em] uppercase px-5 py-3 border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors duration-200"
              >
                {t("cta_history")}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-zinc-200"
          >
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-xl font-bold text-zinc-900">{value}</div>
                <div className="text-xs text-zinc-400 tracking-[0.12em] uppercase mt-0.5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.4 }}
          className="flex items-center justify-center lg:justify-end"
          style={{ y: imageY }}
        >
          <Image
            src="/JIG_Glass_Assembly_No_Fondo.png"
            alt="STEIGERN — Solución Industrial"
            width={520}
            height={520}
            priority
            className="w-full max-w-150 lg:max-w-200 h-auto object-contain drop-shadow-2xl mix-blend-multiply select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-zinc-400 text-[10px] tracking-[0.2em] uppercase">{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-zinc-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
