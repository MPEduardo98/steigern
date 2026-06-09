// app/[locale]/(contacto)/contacto/_components/ContactoContent.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

const contactInfo = [
  {
    key: "phone",
    value: "+52 (222) 5 82 92 54",
    href: "tel:+522225829254",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 0117.88 2 2 0 0120 4.18v3a2 2 0 01-1.45 1.94l-1.2.38a16 16 0 006.82 6.82l.38-1.2A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    key: "email",
    value: "customerservice@steigern.com.mx",
    href: "mailto:customerservice@steigern.com.mx",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    key: "address",
    value: "Central Park, Querétaro, México",
    href: "https://maps.google.com/?q=Central+Park+Queretaro+Mexico",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    key: "hours",
    value: null,
    href: null,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/steigern",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/steigern_mx",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const inputCls = "w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400";
const selectCls = "w-full bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors";

export default function ContactoContent() {
  const t = useTranslations("Contacto");
  const [submitted, setSubmitted] = useState(false);
  const roles = t.raw("roles") as string[];
  const soluciones = t.raw("solutions") as string[];
  const motivoContacto = t.raw("reasons") as string[];
  const hoursValue = t("value_hours");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="w-full pt-36 pb-16 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <Link href="/" className="text-zinc-400 hover:text-zinc-600 text-xs tracking-[0.1em] uppercase transition-colors">{t("breadcrumb_home")}</Link>
            <span className="text-zinc-300 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">{t("breadcrumb_current")}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{t("eyebrow")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading heading-xl text-zinc-900 uppercase mb-6"
          >
            {t("title_line1")}
            <br />
            <span className="text-[#E02020]">{t("title_line2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-zinc-500 text-base leading-relaxed max-w-xl"
          >
            {t("description")}
          </motion.p>
        </div>
      </section>

      {/* Main grid */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-20 items-start">

            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-24 border border-zinc-200">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-14 h-14 bg-[#E02020] flex items-center justify-center mb-7"
                  >
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="heading heading-md text-zinc-900 uppercase mb-3">
                    {t("sent_title")}
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
                    {t("sent_text")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                  {/* Sección 1 */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">01</span>
                      <span className="w-full h-px bg-zinc-200" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">{t("section1")}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          {t("field_fullname")} <span className="text-[#E02020]">*</span>
                        </label>
                        <input required className={inputCls} placeholder={t("ph_fullname")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          {t("field_company")} <span className="text-[#E02020]">*</span>
                        </label>
                        <input required className={inputCls} placeholder={t("ph_company")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          {t("field_role")} <span className="text-[#E02020]">*</span>
                        </label>
                        <select required className={selectCls}>
                          <option value="">{t("select_placeholder")}</option>
                          {roles.map((f) => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          {t("field_email")} <span className="text-[#E02020]">*</span>
                        </label>
                        <input type="email" required className={inputCls} placeholder={t("ph_email")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">{t("field_phone")}</label>
                        <input type="tel" className={inputCls} placeholder={t("ph_phone")} />
                      </div>
                    </div>
                  </div>

                  {/* Sección 2 */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">02</span>
                      <span className="w-full h-px bg-zinc-200" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">{t("section2")}</span>
                    </div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-3">
                      {t("solutions_q")}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {soluciones.map((s) => (
                        <label key={s} className="flex items-center gap-3 cursor-pointer group">
                          <input type="checkbox" className="accent-[#E02020] w-4 h-4 shrink-0" />
                          <span className="text-zinc-600 text-sm group-hover:text-zinc-900 transition-colors">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sección 3 */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">03</span>
                      <span className="w-full h-px bg-zinc-200" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">{t("section3")}</span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">{t("field_reason")}</label>
                        <select className={selectCls}>
                          {motivoContacto.map((m) => <option key={m}>{m}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          {t("field_message")} <span className="text-[#E02020]">*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors resize-none placeholder:text-zinc-400"
                          placeholder={t("ph_message")}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E02020] text-white text-xs font-black tracking-[0.2em] uppercase py-4 hover:bg-[#c41a1a] transition-colors duration-200 flex items-center justify-center gap-3 group"
                  >
                    {t("submit")}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </form>
              )}
            </motion.div>

            {/* SIDEBAR */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col gap-0 lg:sticky lg:top-24"
            >
              {/* Contact cards */}
              <div className="border border-zinc-200 divide-y divide-zinc-200 mb-5">
                {contactInfo.map((c) => {
                  const value = c.value ?? hoursValue;
                  return (
                  <div key={c.key} className="p-5 flex gap-4 items-start group">
                    <div className="text-zinc-400 group-hover:text-[#E02020] transition-colors duration-200 mt-0.5 shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 tracking-[0.18em] uppercase mb-0.5">{t(`label_${c.key}`)}</p>
                      {c.href ? (
                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                          className="text-zinc-800 text-sm font-medium hover:text-[#E02020] transition-colors duration-200">
                          {value}
                        </a>
                      ) : (
                        <p className="text-zinc-800 text-sm font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Social */}
              <div className="border border-zinc-200 p-5 mb-5">
                <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-4">{t("follow")}</p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-9 h-9 flex items-center justify-center bg-zinc-100 hover:bg-[#E02020] text-zinc-500 hover:text-white transition-colors duration-200">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mapa */}
              <div className="relative border border-zinc-200 overflow-hidden aspect-[4/3] bg-zinc-100">
                <iframe
                  title="STEIGERN Querétaro"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.0!2d-100.4091!3d20.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d345b7b6a4b5b5%3A0x1234!2sCentral+Park+Quer%C3%A9taro!5e0!3m2!1ses!2smx!4v1680000000000!5m2!1ses!2smx"
                  className="w-full h-full grayscale opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  allowFullScreen
                />
                <div className="absolute bottom-0 left-0 w-5 h-5 bg-[#E02020]" />
              </div>

              {/* Promesa */}
              <div className="mt-5 p-5 bg-zinc-50 border border-zinc-200">
                <div className="w-5 h-1 bg-[#E02020] mb-3" />
                <p className="text-zinc-900 font-black text-xs uppercase tracking-[0.08em] mb-1.5"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                  {t("promise_title")}
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {t("promise_text")}
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
