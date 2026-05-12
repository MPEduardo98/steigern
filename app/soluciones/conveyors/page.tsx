// app/soluciones/conveyors/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Sistemas de Transporte y Conveyors",
  description: "Diseño e integración de sistemas de transporte industrial: conveyors de banda, rodillo, cadena y aéreos. Soluciones a medida para manufactura y logística interna.",
  alternates: { canonical: "https://steigern.com.mx/soluciones/conveyors" },
};

const tiposConveyor = [
  { title: "Conveyor de Banda", desc: "Ideal para el transporte continuo de piezas ligeras y medianas. Disponible en banda PVC, PU, modular o de acero inoxidable para entornos limpios." },
  { title: "Conveyor de Rodillo", desc: "Para cargas pesadas o productos con base rígida. Pueden ser libres (por gravedad) o motorizados (por fricción o cadena)." },
  { title: "Conveyor de Cadena", desc: "Transmisión de alta fuerza para palets, fixtures o productos pesados. Configurables en línea, en L, en U o circuito cerrado." },
  { title: "Conveyor Aéreo", desc: "Sistemas de riel suspendido para el transporte de piezas sin ocupar espacio de piso. Ideal para carrocerías, estructuras y productos voluminosos." },
  { title: "Conveyor de Acumulación", desc: "Permite acumular piezas sin presión (zero-pressure) para sincronizar estaciones de trabajo con diferentes tiempos de ciclo." },
  { title: "Sistemas Mixtos", desc: "Combinación de tipos de conveyor con curvas, elevadores, desvíos y merges para crear líneas de flujo completas y optimizadas." },
];

const parametros = [
  { label: "Velocidad", value: "0.1–120 m/min" },
  { label: "Carga Máx.", value: "hasta 2,000 kg/m" },
  { label: "Ancho de Banda", value: "100–3,000 mm" },
  { label: "Longitud", value: "sin límite modular" },
];

export default function ConveyorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/conveyors.jpg" alt="Sistemas de Transporte STEIGERN" fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Conveyors</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Manejo de Materiales</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            Sistemas de<br /><span className="text-[#E02020]">Transporte</span>
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
                ¿Qué es un<br />Sistema de Transporte?
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Un <strong className="text-zinc-800">conveyor</strong> es un sistema mecánico diseñado para mover materiales, productos o componentes de un punto a otro dentro de un entorno industrial. Funciona de forma continua, controlada y automatizada.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                En STEIGERN no solo suministramos el conveyor: diseñamos el <strong className="text-zinc-800">sistema completo</strong>. Esto incluye la selección del tipo de transportador, el diseño estructural, la integración con sensores, la automatización y la puesta en marcha.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Estos sistemas permiten reducir la intervención humana en tareas repetitivas o de alto riesgo, minimizando errores y aumentando la seguridad en planta.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 pointer-events-none z-10" />
              <Image src="/assets/images/blog/20250214_093409.jpg" alt="Conveyor industrial STEIGERN" width={700} height={500}
                loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 w-7 h-7 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos */}
      <section className="w-full py-20 bg-zinc-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Catálogo</span>
            </div>
            <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Tipos de Conveyors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {tiposConveyor.map((tipo) => (
              <div key={tipo.title} className="bg-white p-8 group hover:bg-zinc-50 transition-colors duration-300">
                <div className="w-5 h-px bg-zinc-300 group-hover:bg-[#E02020] transition-colors duration-300 mb-5" />
                <h3 className="text-zinc-900 font-black text-sm uppercase tracking-[-0.01em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{tipo.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{tipo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parámetros */}
      <section className="w-full py-20 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Capacidades</span>
            </div>
            <h2 className="text-white font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Parámetros Técnicos
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {parametros.map((p) => (
              <div key={p.label} className="bg-[#E02020] p-8 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="text-white font-black text-2xl tracking-[-0.03em] mb-2">{p.value}</div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-[0.12em]">{p.label}</div>
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