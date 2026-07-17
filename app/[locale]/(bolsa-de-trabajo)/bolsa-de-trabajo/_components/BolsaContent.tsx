// app/[locale]/(bolsa-de-trabajo)/bolsa-de-trabajo/_components/BolsaContent.tsx
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { sendCareerAction } from "../../../_actions/careers";

const inputCls = "w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400";

const benefitIcons: Record<string, React.ReactNode> = {
  growth: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  team: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  innovation: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
    </svg>
  ),
};

export default function BolsaContent() {
  const t = useTranslations("Bolsa");
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const benefits = t.raw("benefits") as { key: string; title: string; text: string }[];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const res = await sendCareerAction(new FormData(e.currentTarget));
    setPending(false);
    if (res.ok) setSubmitted(true);
    else setError(res.error ?? "Error");
  }

  return (
    <>
      {/* Hero */}
      <section className="w-full pt-36 pb-16 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
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
                        <input name="name" required className={inputCls} placeholder={t("ph_fullname")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          {t("field_email")} <span className="text-[#E02020]">*</span>
                        </label>
                        <input type="email" name="email" required className={inputCls} placeholder={t("ph_email")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">{t("field_phone")}</label>
                        <input type="tel" name="phone" className={inputCls} placeholder={t("ph_phone")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">{t("field_position")}</label>
                        <input name="position" className={inputCls} placeholder={t("ph_position")} />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">{t("field_linkedin")}</label>
                        <input type="url" name="linkedin" className={inputCls} placeholder={t("ph_linkedin")} />
                      </div>
                    </div>
                  </div>

                  {/* Sección 2 — CV */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">02</span>
                      <span className="w-full h-px bg-zinc-200" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">{t("section2")}</span>
                    </div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                      {t("field_cv")} <span className="text-[#E02020]">*</span>
                    </label>
                    <input
                      ref={fileRef}
                      type="file"
                      name="cv"
                      required
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) => setFileName(e.currentTarget.files?.[0]?.name ?? "")}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full flex items-center gap-4 bg-zinc-50 border border-dashed border-zinc-300 hover:border-[#E02020] transition-colors px-5 py-6 text-left group"
                    >
                      <span className="w-11 h-11 shrink-0 bg-white border border-zinc-200 group-hover:border-[#E02020] flex items-center justify-center text-zinc-400 group-hover:text-[#E02020] transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-zinc-800 truncate">
                          {fileName || t("cv_cta")}
                        </span>
                        <span className="block text-xs text-zinc-400 mt-0.5">{t("cv_hint")}</span>
                      </span>
                    </button>
                  </div>

                  {/* Sección 3 — Mensaje */}
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">03</span>
                      <span className="w-full h-px bg-zinc-200" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">{t("section3")}</span>
                    </div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">{t("field_message")}</label>
                    <textarea
                      name="message"
                      rows={5}
                      className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors resize-none placeholder:text-zinc-400"
                      placeholder={t("ph_message")}
                    />
                  </div>

                  {error && <p className="text-[#E02020] text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-[#E02020] text-white text-xs font-black tracking-[0.2em] uppercase py-4 hover:bg-[#c41a1a] transition-colors duration-200 flex items-center justify-center gap-3 group disabled:opacity-60"
                  >
                    {pending ? "..." : t("submit")}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  <p className="text-xs text-zinc-400 leading-relaxed">{t("privacy")}</p>
                </form>
              )}
            </motion.div>

            {/* SIDEBAR */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col gap-5 lg:sticky lg:top-24"
            >
              <div className="border border-zinc-200 p-6">
                <div className="w-5 h-1 bg-[#E02020] mb-4" />
                <p className="heading heading-sm text-zinc-900 uppercase mb-6">{t("why_title")}</p>
                <div className="flex flex-col gap-6">
                  {benefits.map((b) => (
                    <div key={b.key} className="flex gap-4 items-start">
                      <div className="text-[#E02020] mt-0.5 shrink-0">{benefitIcons[b.key]}</div>
                      <div>
                        <p className="text-zinc-900 text-sm font-semibold mb-1">{b.title}</p>
                        <p className="text-zinc-500 text-xs leading-relaxed">{b.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-zinc-50 border border-zinc-200">
                <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-2">{t("direct_label")}</p>
                <a href="mailto:eduars.martinez@steigern.com.mx" className="text-zinc-900 text-sm font-medium hover:text-[#E02020] transition-colors break-all">
                  eduars.martinez@steigern.com.mx
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
