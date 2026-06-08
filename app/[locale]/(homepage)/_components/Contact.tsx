// app/[locale]/(homepage)/_components/Contact.tsx
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
    <section id="contact" ref={ref} className="relative w-full py-20 bg-white overflow-hidden">
      <div className="relative max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

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
                Construyamos Juntos
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 font-black text-[clamp(1.8rem,3.2vw,3.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-6"
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
              className="text-zinc-500 text-sm leading-relaxed mb-10"
            >
              El primer contacto es sumamente importante para nosotros. Si estás interesado
              en unirnos a tu equipo de trabajo, nuestros asesores te guiarán desde el diseño
              hasta la construcción de tu proyecto.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col gap-5"
            >
              {[
                { label: "Teléfono", value: "+52 (222) 5 82 92 54", href: "tel:+522225829254" },
                { label: "Correo", value: "customerservice@steigern.com.mx", href: "mailto:customerservice@steigern.com.mx" },
                { label: "Dirección", value: "Central Park, Querétaro, México", href: "https://maps.google.com/?q=Central+Park+Queretaro+Mexico" },
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

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full gap-5 py-12">
                <div className="w-10 h-10 bg-[#E02020] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-zinc-900 font-black text-xl uppercase tracking-[-0.02em]" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                  Mensaje enviado
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Gracias por contactarnos. Un asesor se pondrá en contacto contigo en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1">
                      Nombre <span className="text-[#E02020]">*</span>
                    </label>
                    <input type="text" required className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1">Empresa</label>
                    <input type="text" className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" placeholder="Tu empresa" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1">
                      Correo <span className="text-[#E02020]">*</span>
                    </label>
                    <input type="email" required className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" placeholder="tu@empresa.com" />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1">Teléfono</label>
                    <input type="tel" className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" placeholder="+52 222 000 0000" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1">Motivo de contacto</label>
                  <select className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2.5 focus:outline-none focus:border-[#E02020] transition-colors">
                    <option>Agendar una llamada con un asesor</option>
                    <option>Solicitar una cotización</option>
                    <option>Requiere una visita técnica</option>
                    <option>Solo desea información general</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1">
                    Mensaje <span className="text-[#E02020]">*</span>
                  </label>
                  <textarea required rows={4} className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-3 py-2.5 focus:outline-none focus:border-[#E02020] transition-colors resize-none placeholder:text-zinc-400" placeholder="Cuéntanos sobre tu proyecto o necesidad..." />
                </div>

                <button type="submit" className="w-full bg-[#E02020] text-white text-xs font-bold tracking-[0.15em] uppercase py-3.5 hover:bg-[#c41a1a] transition-colors duration-200 mt-1">
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
