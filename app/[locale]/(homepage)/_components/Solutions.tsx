// app/[locale]/(homepage)/_components/Solutions.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function SolutionsPreview() {
  const t = useTranslations("Solutions");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = [
    {
      num: "01",
      title: t("item1_title"),
      desc: t("item1_desc"),
      tags: ["Modular", "Ligero", "Adaptable"],
      href: "/soluciones/perfil-de-aluminio",
      img: "/assets/images/soluciones/perfil.png",
    },
    {
      num: "02",
      title: t("item2_title"),
      desc: t("item2_desc"),
      tags: ["Conveyors", "Manejo de Materiales", "Logística"],
      href: "/soluciones/conveyors",
      img: "/assets/images/soluciones/conveyors.png",
    },
    {
      num: "03",
      title: t("item3_title"),
      desc: t("item3_desc"),
      tags: ["Ergonomía", "Seguridad", "Productividad"],
      href: "/soluciones/estaciones-de-trabajo",
      img: "/assets/images/soluciones/estaciones.png",
    },
  ];

  return (
    <section id="solutions" className="relative w-full py-20 bg-zinc-50 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 font-black text-[clamp(1.8rem,3.5vw,3.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              {t("title_line1")}
              <br />
              {t("title_line2")}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-3 items-start lg:items-end"
          >
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed lg:text-right">
              {t("description")}
            </p>
            <Link
              href="/soluciones"
              className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-zinc-900 hover:text-[#E02020] transition-colors duration-200 group"
            >
              {t("view_all")}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-200">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* 3 featured cards */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200"
        >
          {featured.map((s) => (
            <motion.div key={s.num} variants={item}>
              <Link
                href={s.href}
                className="bg-white group hover:bg-zinc-50 transition-colors duration-300 flex flex-col h-full"
              >
                <div className="overflow-hidden bg-zinc-100 aspect-[4/3]">
                  <Image
                    src={s.img}
                    alt={s.title}
                    width={600}
                    height={450}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                    <div className="w-5 h-px bg-zinc-200 group-hover:bg-[#E02020] transition-colors duration-300 mt-2" />
                  </div>
                  <h3 className="text-zinc-900 font-black text-base uppercase tracking-[-0.02em] mb-2"
                    style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-200 text-zinc-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
