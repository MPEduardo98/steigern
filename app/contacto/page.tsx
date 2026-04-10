// app/contacto/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";

const contactInfo = [
  {
    label: "Teléfono",
    value: "+52 (222) 5 82 92 54",
    href: "tel:+522225829254",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Correo Electrónico",
    value: "customerservice@steigern.com.mx",
    href: "mailto:customerservice@steigern.com.mx",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Dirección",
    value: "Central Park, Querétaro, México",
    href: "https://maps.google.com/?q=Central+Park+Queretaro+Mexico",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Horario de Atención",
    value: "Lun – Vie: 8am – 6pm · Sáb: 9am – 2pm",
    href: null,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/STEIGERNDesignInMotion/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/steigern-design-in-motion",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC6WgB-G4e6nSdRpwIOTJULg",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a" />
      </svg>
    ),
  },
];

const motivaciones = [
  "Solicitar una cotización",
  "Agendar una llamada con un asesor",
  "Requiero una visita técnica",
  "Solo deseo información general",
  "Otro",
];

const funcionesLaborales = [
  "Gerente / Dirección",
  "Ingeniería / Técnico",
  "Compras / Adquisiciones",
  "Mantenimiento",
  "Otro",
];

const soluciones = [
  "Perfil Estructural de Aluminio",
  "Sistemas de Transporte (Conveyors)",
  "Estaciones de Trabajo",
  "Dispositivos Asistidos por Co-Bots",
  "Elevación y Guías Lineales",
  "Soluciones Lean",
  "Desarrollo de Proyectos",
  "Otro / No sé aún",
];

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeMotivacion, setActiveMotivacion] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full pt-40 pb-24 bg-white dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020]" />
        <div
          className="absolute inset-0 opacity-0 dark:opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-2 mb-8">
            <a href="/" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</a>
            <span className="text-zinc-300 dark:text-zinc-700 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Contacto</span>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Construyamos Juntos</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.8rem,6vw,7rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-8"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Inicia Tu
            <br />
            <span className="text-[#E02020]">Proyecto</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-xl"
          >
            El primer contacto es sumamente importante para nosotros. Nuestros asesores te guiarán desde el diseño hasta la construcción de tu proyecto.
          </motion.p>
        </div>
      </section>

      {/* Main grid: form + info */}
      <section className="w-full pb-28 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-24 items-start">

            {/* ── FORM ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-28 border border-zinc-200 dark:border-zinc-800">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-16 h-16 bg-[#E02020] flex items-center justify-center mb-8"
                  >
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3
                    className="text-zinc-900 dark:text-zinc-100 font-black text-3xl uppercase tracking-[-0.02em] mb-4"
                    style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                  >
                    Mensaje Enviado
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-base max-w-sm leading-relaxed">
                    Uno de nuestros asesores se pondrá en contacto contigo en menos de 24 horas hábiles para conocer tus necesidades y ofrecerte la mejor solución.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                  {/* Sección 1: Datos personales */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">01</span>
                      <span className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">Datos de Contacto</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          Nombre Completo <span className="text-[#E02020]">*</span>
                        </label>
                        <input
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          Empresa <span className="text-[#E02020]">*</span>
                        </label>
                        <input
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                          placeholder="Nombre de tu empresa"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          Función Laboral <span className="text-[#E02020]">*</span>
                        </label>
                        <select
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors"
                        >
                          <option value="">Selecciona una opción</option>
                          {funcionesLaborales.map((f) => (
                            <option key={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                          Correo Electrónico <span className="text-[#E02020]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                          placeholder="tu@empresa.com"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">Teléfono</label>
                        <input
                          type="tel"
                          className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                          placeholder="+52 222 000 0000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sección 2: Solución de interés */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">02</span>
                      <span className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">Solución de Interés</span>
                    </div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-3">
                      ¿Qué solución te interesa explorar?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {soluciones.map((s) => (
                        <label
                          key={s}
                          className="flex items-center gap-2 text-xs font-semibold tracking-[0.06em] uppercase px-4 py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors has-[:checked]:border-[#E02020] has-[:checked]:text-[#E02020] has-[:checked]:bg-red-50 dark:has-[:checked]:bg-red-950/20"
                        >
                          <input type="checkbox" className="sr-only" />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Sección 3: Motivación */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">03</span>
                      <span className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">Siguiente Paso</span>
                    </div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-3">
                      ¿Qué esperas de este contacto? <span className="text-[#E02020]">*</span>
                    </label>
                    <div className="flex flex-col gap-2">
                      {motivaciones.map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setActiveMotivacion(m)}
                          className={`flex items-center gap-4 px-5 py-4 border text-left transition-colors duration-150 ${
                            activeMotivacion === m
                              ? "border-[#E02020] bg-red-50 dark:bg-red-950/20"
                              : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${activeMotivacion === m ? "border-[#E02020]" : "border-zinc-300 dark:border-zinc-600"}`}>
                            {activeMotivacion === m && <span className="w-2 h-2 rounded-full bg-[#E02020]" />}
                          </span>
                          <span className={`text-xs font-semibold tracking-[0.06em] uppercase transition-colors ${activeMotivacion === m ? "text-[#E02020]" : "text-zinc-600 dark:text-zinc-400"}`}>
                            {m}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sección 4: Mensaje */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-[#E02020] font-black text-xs tracking-[0.2em] uppercase">04</span>
                      <span className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
                      <span className="text-zinc-400 text-xs tracking-[0.15em] uppercase whitespace-nowrap">Tu Mensaje</span>
                    </div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                      Cuéntanos sobre tu proyecto <span className="text-[#E02020]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      placeholder="Describe tu proceso, los retos que enfrentas o lo que buscas automatizar. Entre más detalle compartas, mejor podremos orientarte."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E02020] text-white text-xs font-black tracking-[0.2em] uppercase py-5 hover:bg-[#c41a1a] transition-colors duration-200 flex items-center justify-center gap-3 group"
                  >
                    Enviar Mensaje
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </form>
              )}
            </motion.div>

            {/* ── SIDEBAR INFO ── */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col gap-0 lg:sticky lg:top-28"
            >
              {/* Contact cards */}
              <div className="border border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800 mb-6">
                {contactInfo.map((c) => (
                  <div key={c.label} className="p-6 flex gap-4 items-start group">
                    <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-[#E02020] transition-colors duration-200 mt-0.5 shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400 tracking-[0.18em] uppercase mb-1">{c.label}</p>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="text-zinc-800 dark:text-zinc-200 text-sm font-medium hover:text-[#E02020] transition-colors duration-200"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-zinc-800 dark:text-zinc-200 text-sm font-medium">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
                <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-4">Síguenos en Redes</p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:bg-[#E02020] text-zinc-500 dark:text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Mapa embed placeholder */}
              <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-900">
                <iframe
                  title="STEIGERN Querétaro"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734.0!2d-100.4091!3d20.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d345b7b6a4b5b5%3A0x1234!2sCentral+Park+Quer%C3%A9taro!5e0!3m2!1ses!2smx!4v1680000000000!5m2!1ses!2smx"
                  className="w-full h-full grayscale opacity-80 dark:opacity-40"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  allowFullScreen
                />
                <div className="absolute inset-0 pointer-events-none border border-zinc-200 dark:border-zinc-800" />
                <div className="absolute bottom-0 left-0 w-6 h-6 bg-[#E02020]" />
              </div>

              {/* Promise block */}
              <div className="mt-6 p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="w-6 h-1 bg-[#E02020] mb-4" />
                <p
                  className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-2"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  Respuesta en &lt; 24 h
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                  Todos los mensajes son revisados y atendidos por un asesor técnico que conoce el proceso industrial. No recibirás respuestas automáticas.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}