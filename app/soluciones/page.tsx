import type { Metadata } from "next";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Soluciones de Ingeniería Industrial",
  description:
    "Descubre las 6 soluciones de automatización industrial de STEIGERN: perfiles de aluminio, conveyors, estaciones de trabajo, co-bots, elevación y guías lineales, y soluciones lean.",
  alternates: {
    canonical: "https://steigern.com.mx/soluciones",
  },
  openGraph: {
    title: "Soluciones de Ingeniería | STEIGERN",
    description:
      "Diseñamos e integramos 6 familias de soluciones industriales a medida para automatizar y optimizar tu planta de manufactura.",
    url: "https://steigern.com.mx/soluciones",
  },
};

const solutions = [
  {
    num: "01",
    title: "Perfil Estructural de Aluminio",
    desc: "Los perfiles estructurales de aluminio para aplicaciones en entornos de trabajo son más eficientes cuando se adaptan individualmente a su propósito específico. Una alternativa moderna al acero para máquinas que exigen estabilidad.",
    tags: ["Modular", "Ligero", "Adaptable"],
    href: "/soluciones/perfil-de-aluminio",
    img: "/assets/images/soluciones/perfil.png",
  },
  {
    num: "02",
    title: "Sistemas de Transporte",
    desc: "Desde el desarrollo temprano del concepto hasta el estudio detallado de factibilidad, incluidos proyectos para la manipulación de materiales que consideran la logística de forma integral.",
    tags: ["Conveyors", "Manejo de Materiales", "Logística"],
    href: "/soluciones/conveyors",
    img: "/assets/images/soluciones/conveyors.png",
  },
  {
    num: "03",
    title: "Estaciones de Trabajo",
    desc: "Diseño ergonómico óptimo que adapta el lugar de trabajo considerando la iluminación, el entorno y las capacidades del operario. Protección y seguridad avanzada en cada instalación.",
    tags: ["Ergonomía", "Seguridad", "Productividad"],
    href: "/soluciones/estaciones-de-trabajo",
    img: "/assets/images/soluciones/estaciones.png",
  },
  {
    num: "04",
    title: "Dispositivos Asistidos por Co-Bots",
    desc: "Integración de robots colaborativos para asistir y potenciar las capacidades del operario en líneas de ensamble, reduciendo errores y mejorando tiempos de ciclo.",
    tags: ["Cobots", "Ensamble", "Automatización"],
    href: "/soluciones/dispositivos-asistidos-por-cobots",
    img: "/assets/images/soluciones/cobots.png",
  },
  {
    num: "05",
    title: "Elevación y Guías Lineales",
    desc: "Sistemas de elevación y guías lineales de precisión para el movimiento controlado de componentes y subconjuntos dentro de líneas de manufactura y ensamblaje.",
    tags: ["Guías Lineales", "Elevadores", "Precisión"],
    href: "/soluciones/elevacion-y-guias-lineales",
    img: "/assets/images/soluciones/elevacion.png",
  },
  {
    num: "06",
    title: "Soluciones Lean",
    desc: "Estructuras básicas industriales y soluciones orientadas a la manufactura esbelta, eliminando desperdicios y optimizando cada etapa del proceso productivo.",
    tags: ["Lean Manufacturing", "Mejora Continua", "Eficiencia"],
    href: "/soluciones/soluciones-lean",
    img: "/assets/images/soluciones/estructuras.png",
  },
];

export default function SolucionesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full pt-40 pb-24 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020]" />
        <div className="absolute top-0 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800" />
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <a href="/" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</a>
            <span className="text-zinc-300 dark:text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Soluciones</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Lo Que Construimos</span>
          </div>
          <h1
            className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl mb-6"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Soluciones de
            <br />
            <span className="text-[#E02020]">Ingeniería</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed">
            Diseñamos e integramos dispositivos para el ensamble de componentes industriales, automatizando procesos manuales y líneas de manufactura en todos los niveles.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800">
            {solutions.map((s) => (
              <a
                key={s.num}
                href={s.href}
                className="bg-white dark:bg-zinc-900 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-[4/3]">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                    <div className="w-6 h-px bg-zinc-200 dark:bg-zinc-700 group-hover:bg-[#E02020] transition-colors duration-300 mt-2" />
                  </div>
                  <h2
                    className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-3"
                    style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                  >
                    {s.title}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 border border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="w-full py-20 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div>
            <h2
              className="text-white font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-3"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-white/70 text-base leading-relaxed max-w-lg">
              Desarrollamos soluciones a medida para cualquier desafío industrial. Cuéntanos tu caso y lo resolvemos juntos.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 bg-white text-[#E02020] hover:bg-zinc-100 transition-colors duration-200"
          >
            Hablar con un asesor
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}