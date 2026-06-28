// app/[locale]/(homepage)/_components/Slogan.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function Slogan() {
  const t = useTranslations("Slogan");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="w-full bg-white py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{t("eyebrow")}</span>
            <span className="w-6 h-px bg-[#E02020]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="heading heading-hero text-zinc-900 uppercase whitespace-nowrap"
          >
            We Enjoy <span className="text-[#E02020]">Making Machines</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto mt-8"
          >
            {t("text")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
