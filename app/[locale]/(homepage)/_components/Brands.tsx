// app/[locale]/(homepage)/_components/Brands.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const brands = [
  { name: "Siemens",         src: "/marcas/simens.svg" },
  { name: "RK Rose+Krieger", src: "/marcas/rkrose.svg" },
  { name: "Minitec",         src: "/marcas/minitec.svg" },
  { name: "Festo",           src: "/marcas/festo.svg" },
  { name: "Cognex",          src: "/marcas/cognex.svg" },
  { name: "Bosch Rexroth",   src: "/marcas/bosch_rexroth.svg" },
];

const brandsDup = [...brands, ...brands];

export default function Brands() {
  const t = useTranslations("Brands");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative w-full py-20 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                {t("eyebrow")}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="heading heading-lg text-zinc-900 uppercase"
            >
              {t("title_line1")}
              <br />
              <span className="text-[#E02020]">{t("title_line2")}</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-zinc-500 text-sm leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-[1440px] mx-auto px-8 lg:px-20"
      >
        <div
          className="relative overflow-hidden border-y border-zinc-100"
          style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
        >
          <div
            className="flex"
            style={{ animation: "brands-scroll 28s linear infinite", width: "max-content" }}
          >
            {brandsDup.map((brand, i) => (
              <div
                key={i}
                className="brands-slide flex items-center justify-center px-12 py-10 border-r border-zinc-100 shrink-0 group"
                style={{ minWidth: "220px" }}
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={120}
                  height={56}
                  loading="lazy"
                  className="brands-logo h-14 w-auto object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 mt-5">
        <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
          {t("disclaimer")}
        </p>
      </div>

      <style>{`
        @keyframes brands-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brands-logo {
          filter: brightness(0) saturate(100%) opacity(0.25);
        }
        .brands-slide:hover .brands-logo {
          filter: brightness(0) saturate(100%) opacity(0.75);
        }
      `}</style>
    </section>
  );
}
