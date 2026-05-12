// app/soluciones/soluciones-lean/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Soluciones Lean Manufacturing",
  description: "Implementación de manufactura esbelta con estructuras físicas: supermercados, carros de kit, tableros de gestión visual y células de manufactura optimizadas.",
  alternates: { canonical: "https://steigern.com.mx/soluciones/soluciones-lean" },
};

const herramientasFisicas = [
  { title: "Supermercados de Materiales", desc: "Estructuras de almacenamiento en punto de uso con gestión visual de niveles mínimos y máximos, tarjetas kanban y flujo FIFO." },
  { title: "Carros de Kit", desc: "Vehículos de abastecimiento diseñados a medida con porta-piezas específicos para alimentar la línea con exactamente los materiales necesarios por ciclo." },
  { title: "Tableros de Gestión Visual", desc: "Paneles A3 y A0 con soporte en perfil de aluminio para indicadores de producción, planes de respuesta y tableros de mejora continua." },
  { title: "Estructuras 5S", desc: "Tableros de sombra, delimitaciones de piso, sistemas de etiquetado y organizadores diseñados para sostener el orden de forma visual e intuitiva." },
  { title: "Células de Manufactura", desc: "Rediseño del layout en células en U o flujo continuo que reducen el WIP, eliminan transportes innecesarios y permiten producción one-piece-flow." },
  { title: "Carros y AGVs Manuales", desc: "Vehículos de abastecimiento para trenes de materiales y portacontenedores que optimizan las rutas de abastecimiento a la línea." },
];

const principiosLean = [
  { title: "Eliminar el Desperdicio (Muda)", desc: "Identificamos y eliminamos los 8 desperdicios: sobreproducción, esperas, transporte, sobreprocesamiento, inventario, movimiento, defectos y talento no utilizado." },
  { title: "Flujo Continuo", desc: "Diseño del proceso para que cada pieza fluya sin interrupciones desde materia prima hasta producto terminado, eliminando colas entre operaciones." },
  { title: "Sistema Pull", desc: "La producción se activa por la demanda real del cliente. Los supermercados y señales kanban garantizan el nivel correcto de inventario en cada punto." },
  { title: "Mejora Continua (Kaizen)", desc: "Establecemos las estructuras físicas y culturales para que el equipo de planta pueda sostener y mejorar el sistema de forma autónoma." },
];

const industrias = [
  { industry: "Automotriz", desc: "Supermercados de componentes por modelo, carros de kit por puesto de ensamble y sistemas de andon para gestión de anomalías en tiempo real." },
  { industry: "Electrónica", desc: "Células de manufactura con flujo one-piece, gestión de componentes SMD en supermercados visuales y tableros de producción por hora." },
  { industry: "Industria de Proceso", desc: "Gestión visual de inventarios, sistemas 5S en áreas de mantenimiento y estructuras de almacenamiento de herramientas para reducir tiempos SMED." },
  { industry: "Logística Interna", desc: "Diseño de rutas de abastecimiento, carros de kit, etiquetado de ubicaciones y sistemas kanban para alimentar líneas sin interrupciones." },
];

export default function SolucionesLeanPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/estructuras.png" alt="Soluciones Lean STEIGERN" fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Soluciones Lean</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Manufactura Esbelta</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            Soluciones<br /><span className="text-[#E02020]">Lean</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="w-8 h-1 bg-[#E02020] mb-7" />
              <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight mb-5"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                ¿Qué son las<br />Soluciones Lean?
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Las soluciones lean son estructuras físicas y sistemas de gestión visual que hacen tangibles los principios de la manufactura esbelta. No son metodologías abstractas: son muebles, carros, tableros y células que transforman el flujo de materiales e información en planta.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                En STEIGERN diseñamos e integramos estas soluciones adaptadas a cada proceso, cada planta y cada cultura operativa. El resultado es un sistema que el equipo puede operar, mantener y mejorar de forma autónoma.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 pointer-events-none z-10" />
              <Image src="/assets/images/soluciones/estructuras.png" alt="Lean manufacturing STEIGERN" width={700} height={500}
                loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 w-7 h-7 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="w-full py-20 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Filosofía</span>
            </div>
            <h2 className="text-white font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Principios Lean que<br />Hacemos Físicos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {principiosLean.map((p) => (
              <div key={p.title} className="bg-[#E02020] p-8 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="w-6 h-1 bg-white/40 mb-5" />
                <h3 className="text-white font-black text-sm uppercase tracking-[-0.01em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{p.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas físicas */}
      <section className="w-full py-20 bg-zinc-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Lo que Fabricamos</span>
            </div>
            <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Herramientas Físicas<br />Lean
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {herramientasFisicas.map((h) => (
              <div key={h.title} className="bg-white p-8 group hover:bg-zinc-50 transition-colors duration-300">
                <div className="w-5 h-px bg-zinc-300 group-hover:bg-[#E02020] transition-colors duration-300 mb-5" />
                <h3 className="text-zinc-900 font-black text-sm uppercase tracking-[-0.01em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{h.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrias */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Sectores</span>
            </div>
            <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Aplicaciones por Industria
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
            {industrias.map((i) => (
              <div key={i.industry} className="bg-white p-8 hover:bg-zinc-50 transition-colors duration-300">
                <div className="w-5 h-1 bg-[#E02020] mb-5" />
                <h3 className="text-zinc-900 font-black text-sm uppercase tracking-[-0.01em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{i.industry}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}