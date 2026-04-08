"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full py-28 bg-white dark:bg-zinc-950 overflow-hidden transition-colors duration-300"
    >
      <div className="relative max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Construyamos Juntos
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-8"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Inicia Tu
              <br />
              <span className="text-[#E02020]">Proyecto</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-12"
            >
              El primer contacto es sumamente importante para nosotros. Si estás interesado en unirnos a tu equipo de trabajo, nuestros asesores te guiarán desde el diseño hasta la construcción de tu proyecto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col gap-5"
            >
              {[
                { label: "Teléfono", value: "+52 (222) 5 82 92 54" },
                { label: "Correo Electrónico", value: "customerservice@steigern.com.mx" },
                { label: "Horarios de Atención", value: "Lun – Vie: 8am – 6pm  ·  Sáb: 9am – 2pm" },
              ].map((c) => (
                <div key={c.label}>
                  <div className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-1">{c.label}</div>
                  <div className="text-zinc-700 dark:text-zinc-300 text-sm font-medium">{c.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-12 h-12 bg-[#E02020] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3
                  className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  Mensaje Enviado
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
                  Uno de nuestros asesores se acercará pronto para conocer tus necesidades y ofrecerte la mejor solución.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Nombre completo */}
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                    Nombre Completo <span className="text-[#E02020]">*</span>
                  </label>
                  <input
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Empresa */}
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                    Empresa <span className="text-[#E02020]">*</span>
                  </label>
                  <input
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                {/* Email + Teléfono */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                      Correo Electrónico <span className="text-[#E02020]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      placeholder="tu@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                      placeholder="+52 222 000 0000"
                    />
                  </div>
                </div>

                {/* Función Laboral */}
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                    Función Laboral <span className="text-[#E02020]">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors"
                  >
                    <option value="">Selecciona una opción</option>
                    <option>Gerente / Dirección</option>
                    <option>Ingeniería / Técnico</option>
                    <option>Compras / Adquisiciones</option>
                    <option>Mantenimiento</option>
                    <option>Otro</option>
                  </select>
                </div>

                {/* Grado de Interés */}
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                    Grado de Interés <span className="text-[#E02020]">*</span>
                  </label>
                  <select
                    required
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors"
                  >
                    <option value="">Selecciona una opción</option>
                    <option>Agendar una llamada con un asesor</option>
                    <option>Solicitar una cotización</option>
                    <option>Requiere una visita técnica</option>
                    <option>Solo desea información general</option>
                    <option>Otro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                    Mensaje <span className="text-[#E02020]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                    placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E02020] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#c41a1a] transition-colors duration-200 mt-2"
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}