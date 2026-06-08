// app/[locale]/(soluciones)/soluciones/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import Contact from "../../(homepage)/_components/Contact";

export const metadata: Metadata = {
  title: "Soluciones de Ingeniería Industrial",
  description:
    "Descubre las 6 soluciones de automatización industrial de STEIGERN: perfiles de aluminio, conveyors, estaciones de trabajo, co-bots, elevación y guías lineales, y soluciones lean.",
  alternates: { canonical: "https://steigern.com.mx/soluciones" },
  openGraph: {
    title: "Soluciones de Ingeniería | STEIGERN",
    description: "Diseñamos e integramos 6 familias de soluciones industriales a medida para automatizar y optimizar tu planta de manufactura.",
    url: "https://steigern.com.mx/soluciones",
  },
};

const solutions = [
  {
    num: "01", title: "Perfil Estructural de Aluminio",
    desc: "Los perfiles estructurales de aluminio para aplicaciones en entornos de trabajo son más eficientes cuando se adaptan individualmente a su propósito específico. Una alternativa moderna al acero para máquinas que exigen estabilidad.",
    tags: ["Modular", "Ligero", "Adaptable"],
    href: "/soluciones/perfil-de-aluminio", img: "/assets/images/soluciones/perfil.png",
  },
  {
    num: "02", title: "Sistemas de Transporte",
    desc: "Desde el desarrollo temprano del concepto hasta el estudio detallado de factibilidad, incluidos proyectos para la manipulación de materiales que consideran la logística de forma integral.",
    tags: ["Conveyors", "Manejo de Materiales", "Logística"],
    href: "/soluciones/conveyors", img: "/assets/images/soluciones/conveyors.png",
  },
  {
    num: "03", title: "Estaciones de Trabajo",
    desc: "Diseño ergonómico óptimo que adapta el lugar de trabajo considerando la iluminación, el entorno y las capacidades del operario. Protección y seguridad avanzada en cada instalación.",
    tags: ["Ergonomía", "Seguridad", "Productividad"],
    href: "/soluciones/estaciones-de-trabajo", img: "/assets/images/soluciones/estaciones.png",
  },
  {
    num: "04", title: "Dispositivos Asistidos por Co-Bots",
    desc: "Integración de robots colaborativos para asistir y potenciar las capacidades del operario en líneas de ensamble, reduciendo errores y mejorando tiempos de ciclo.",
    tags: ["Cobots", "Ensamble", "Automatización"],
    href: "/soluciones/dispositivos-asistidos-por-cobots", img: "/assets/images/soluciones/cobots.png",
  },
  {
    num: "05", title: "Elevación y Guías Lineales",
    desc: "Sistemas de elevación y guías lineales de precisión para el movimiento controlado de componentes y subconjuntos dentro de líneas de manufactura y ensamblaje.",
    tags: ["Elevación", "Guías Lineales", "Precisión"],
    href: "/soluciones/elevacion-y-guias-lineales", img: "/assets/images/soluciones/elevacion.png",
  },
  {
    num: "06", title: "Soluciones Lean",
    desc: "Implementación de manufactura esbelta mediante estructuras físicas: supermercados de materiales, carros de kit, tableros de gestión visual y células de manufactura optimizadas.",
    tags: ["Lean", "5S", "Kaizen"],
    href: "/soluciones/soluciones-lean", img: "/assets/images/soluciones/estructuras.png",
  },
];

export default function SolucionesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative w-full min-h-[55vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/perfil.png" alt="Soluciones STEIGERN" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Soluciones</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Ingeniería Industrial</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            Soluciones de<br /><span className="text-[#E02020]">Ingeniería</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full py-16 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <p className="text-zinc-500 text-base leading-relaxed">
              Diseñamos e integramos dispositivos para el ensamble de componentes industriales, automatizando procesos manuales y líneas de manufactura. Cada solución se adapta al proceso específico del cliente.
            </p>
            <p className="text-zinc-500 text-base leading-relaxed">
              Con 13 años de experiencia y presencia en más de 60 países, somos el socio de ingeniería que transforma ideas en sistemas funcionales, desde el concepto hasta la puesta en marcha.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {solutions.map((s) => (
              <Link key={s.num} href={s.href}
                className="bg-white group hover:bg-zinc-50 transition-colors duration-300 flex flex-col">
                <div className="overflow-hidden bg-zinc-100 aspect-[4/3]">
                  <Image src={s.img} alt={s.title} width={600} height={450} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                    <div className="w-5 h-px bg-zinc-200 group-hover:bg-[#E02020] transition-colors duration-300 mt-2" />
                  </div>
                  <h2 className="text-zinc-900 font-black text-base uppercase tracking-[-0.02em] mb-2"
                    style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{s.title}</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-200 text-zinc-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-white font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight mb-2"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>¿No encuentras lo que buscas?</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-lg">Desarrollamos soluciones a medida para cualquier desafío industrial. Cuéntanos tu caso y lo resolvemos juntos.</p>
          </div>
          <Link href="/contacto"
            className="shrink-0 text-xs font-bold tracking-[0.15em] uppercase px-7 py-3.5 bg-white text-[#E02020] hover:bg-zinc-100 transition-colors duration-200">
            Hablar con un asesor
          </Link>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
