"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  { label: "Transparencia" },
  { label: "Honestidad" },
  { label: "Pasión" },
  { label: "Competitividad" },
  { label: "Diligencia" },
];

const pillars = [
  {
    title: "Misión",
    desc: "Como proveedor global de mecanos y sistemas de producción para la industria, nuestro objetivo es desarrollar, producir y vender soluciones que impulsen la innovación tecnológica de las empresas, satisfaciendo al cliente en términos de asesoramiento, tiempos y calidad.",
  },
  {
    title: "Visión",
    desc: "Ser un socio comercial líder en automatización e integración industrial, destacando por ofrecer soluciones innovadoras y componentes de alta calidad. Actuar con mayor rapidez que nuestros competidores y brindar resultados con compromiso empresarial.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full py-28 bg-zinc-50 dark:bg-zinc-900 overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Nuestra Historia
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Quiénes
              <br />
              Somos
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-sm text-base leading-relaxed"
          >
            Automatizando procesos, impulsamos el futuro. Una empresa mexicana con 13 años de experiencia en desarrollo tecnológico industrial.
          </motion.p>
        </div>

        {/* Text + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 mb-px">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white dark:bg-zinc-900 p-10 flex flex-col justify-center"
          >
            <div className="w-8 h-1 bg-[#E02020] mb-6" />
            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
              Somos una empresa mexicana comprometida con el{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold">desarrollo tecnológico industrial</span>,
              mediante servicios y productos vanguardistas acorde a las exigencias a nivel mundial.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
              Dedicados al{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold">diseño e integración</span>{" "}
              de dispositivos para el ensamble de componentes industriales, suministramos soluciones para automatizar procesos manuales, líneas de manufactura y sistemas a prueba de error en todos los niveles, mejorando la competitividad empresarial.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
              Con{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold">13 años de experiencia</span>,
              nos hemos convertido en un socio comercial confiable en dispositivos de ensamble para componentes de automoción. En 2020 comenzamos a exportar a Estados Unidos y para 2021 establecimos nuestro corporativo en Querétaro, en Central Park.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="bg-white dark:bg-zinc-900 overflow-hidden min-h-[360px]"
          >
            <img
              src="corporativo.webp"
              alt="STEIGERN Corporativo Querétaro"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Misión + Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 mb-px">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
              className="bg-white dark:bg-zinc-900 p-10"
            >
              <div className="w-8 h-1 bg-[#E02020] mb-6" />
              <h3
                className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em] mb-5"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                {p.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Valores */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="bg-white dark:bg-zinc-900 p-10"
        >
          <div className="w-8 h-1 bg-[#E02020] mb-6" />
          <h3
            className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em] mb-6"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Valores
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-8 max-w-2xl">
            La lealtad con nuestros socios comerciales es esencial para mantener la credibilidad. Trabajamos día a día con actitud, liderazgo responsable y valor añadido para nuestros productos.
          </p>
          <div className="flex flex-wrap gap-3">
            {values.map((v, i) => (
              <motion.span
                key={v.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.07 }}
                className="text-xs font-black tracking-[0.15em] uppercase px-5 py-2.5 border-2 border-[#E02020] text-[#E02020]"
              >
                {v.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}