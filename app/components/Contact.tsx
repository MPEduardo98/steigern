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
      className="relative w-full py-28 bg-white overflow-hidden"
    >
      {/* Grid - light */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

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
              className="text-zinc-900 font-black text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Inicia Tu
              <br />
              <span className="text-[#E02020]">Proyecto</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-zinc-500 text-base leading-relaxed mb-12"
            >
              Cuéntanos sobre tu desafío de manufactura. Nuestros ingenieros evaluarán tus requerimientos y entregarán una propuesta en 5 días hábiles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col gap-5"
            >
              {[
                { label: "Sede Central", value: "Parkring 10, 85748 Garching bei München, Alemania" },
                { label: "Correo Electrónico", value: "engineering@steigern.de" },
                { label: "Teléfono", value: "+49 89 320 4500" },
              ].map((c) => (
                <div key={c.label}>
                  <div className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-1">{c.label}</div>
                  <div className="text-zinc-700 text-sm font-medium">{c.value}</div>
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
                <h3 className="text-zinc-900 font-black text-2xl uppercase tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Consulta Enviada
                </h3>
                <p className="text-zinc-500 text-sm max-w-xs">
                  Nos pondremos en contacto en un plazo de 5 días hábiles con una evaluación detallada de tu proyecto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">Nombre</label>
                    <input required className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="Hans" />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">Apellido</label>
                    <input required className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="Müller" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">Empresa</label>
                  <input required className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="Acme Manufacturing GmbH" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">Correo Electrónico</label>
                  <input type="email" required className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="hans@acme.de" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">Industria</label>
                  <select className="w-full bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors">
                    <option>Automotriz</option>
                    <option>Aeroespacial</option>
                    <option>Farma y Alimentos</option>
                    <option>Energía e Industria Pesada</option>
                    <option>Electrónica</option>
                    <option>Intrologística</option>
                    <option>Otra</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">Descripción del Proyecto</label>
                  <textarea required rows={4} className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors resize-none" placeholder="Describe tu desafío de producción, volumen, restricciones..." />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#E02020] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#c41a1a] transition-colors duration-200 mt-2"
                >
                  Enviar Consulta
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}