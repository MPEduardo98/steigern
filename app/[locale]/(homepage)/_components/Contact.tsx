// app/[locale]/(homepage)/_components/Contact.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("ContactForm");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} className="relative w-full py-20 bg-white overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}
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
              className="heading heading-lg text-zinc-900 uppercase mb-6"
            >
              {t("title_line1")}
              <br />
              <span className="text-[#E02020]">{t("title_line2")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-zinc-500 text-sm leading-relaxed mb-10"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col gap-5"
            >
              {[
                { label: t("label_phone"), value: "+52 (222) 5 82 92 54", href: "tel:+522225829254" },
                { label: t("label_email"), value: "customerservice@steigern.com.mx", href: "mailto:customerservice@steigern.com.mx" },
                { label: t("label_address"), value: "Central Park, Querétaro, México", href: "https://maps.google.com/?q=Central+Park+Queretaro+Mexico" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase mb-0.5">{item.label}</p>
                  <a href={item.href} className="text-zinc-700 text-sm font-semibold hover:text-[#E02020] transition-colors duration-200">
                    {item.value}
                  </a>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: CTA to contact page */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start justify-center gap-6 bg-zinc-50 border border-zinc-200 p-10"
          >
            <h3 className="heading heading-sm text-zinc-900 uppercase">
              {t("cta_title")}
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {t("cta_text")}
            </p>
            <Link
              href="/contacto"
              className="inline-block text-xs font-bold tracking-[0.15em] uppercase px-7 py-3.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200"
            >
              {t("cta_button")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
