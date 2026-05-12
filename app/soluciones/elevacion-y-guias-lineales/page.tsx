// app/soluciones/elevacion-y-guias-lineales/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Elevación y Guías Lineales",
  description: "Sistemas de elevación y guías lineales de precisión para manufactura industrial. Actuadores, mesas de elevación y unidades lineales para movimiento controlado.",
  alternates: { canonical: "https://steigern.com.mx/soluciones/elevacion-y-guias-lineales" },
};

const tiposSistema = [
  { title: "Guías de Perfil Lineal", desc: "Sistemas de raíl y carro de alta precisión para movimiento lineal horizontal o vertical. Cargas de hasta 2,000 N con precisiones de ±0.01 mm." },
  { title: "Actuadores Eléctricos", desc: "Husillos de bolas o correa dentada accionados por servomotor o motor paso a paso. Posicionamiento programable con retroalimentación de encoder." },
  { title: "Mesas de Elevación", desc: "Plataformas de tijera o husillo para ajuste de altura ergonómico o posicionamiento de piezas en operaciones de carga y descarga." },
  { title: "Sistemas Neumáticos", desc: "Actuadores de carrera corta y media para operaciones de prensado, posicionamiento de tope o alimentación de piezas a alta cadencia." },
  { title: "Sistemas de Transferencia", desc: "Unidades de transferencia transversal (transfer) para mover pallets o fixtures entre líneas o posiciones sin intervención del operario." },
  { title: "Ejes Robóticos", desc: "Extensiones de alcance para robots colaborativos o industriales que requieren recorridos lineales mayores al radio de trabajo del robot." },
];

const parametros = [
  { value: "±0.01 mm", label: "Precisión de Posicionamiento", desc: "Con encoder y controlador servo" },
  { value: "2,000 N", label: "Fuerza Máxima", desc: "En actuadores de husillo de bolas" },
  { value: "6,000 mm", label: "Carrera Máxima", desc: "En guías de perfil estándar" },
  { value: "IP67", label: "Protección", desc: "Disponible para entornos húmedos" },
];

const aplicaciones = [
  { industry: "Líneas de Ensamble", desc: "Elevadores de pallet para ajuste ergonómico, transfers entre estaciones y posicionadores de fixture para operaciones de precisión." },
  { industry: "Inspección y Medición", desc: "Mesas XY de alta precisión para sistemas de visión, soportes motorizados de cámara y unidades de posicionamiento de sonda." },
  { industry: "Carga y Descarga", desc: "Actuadores de alimentación de piezas, extractores de componentes y sistemas de paletizado con movimiento lineal controlado." },
  { industry: "Soldadura y Pegado", desc: "Ejes de desplazamiento para antorchas de soldadura, dispensadores de adhesivo y sistemas de aplicación de sellantes en trayectoria." },
];

export default function ElevacionGuiasPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/elevacion.png" alt="Elevación y Guías Lineales STEIGERN" fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Elevación y Guías</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Movimiento de Precisión</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            Elevación y<br /><span className="text-[#E02020]">Guías Lineales</span>
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
                Control Total del<br />Movimiento
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Los sistemas de elevación y guías lineales son el componente que define la precisión de posicionamiento en una línea de manufactura. En STEIGERN integramos soluciones mecánicas, neumáticas y eléctricas para cada tipo de movimiento requerido.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Desde un simple actuador neumático de tope hasta un eje servo de alta precisión con retroalimentación de encoder, seleccionamos y dimensionamos el sistema correcto para cada aplicación, considerando carga, velocidad, ciclos y entorno de operación.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 pointer-events-none z-10" />
              <Image src="/assets/images/soluciones/elevacion.png" alt="Guías lineales STEIGERN" width={700} height={500}
                loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#E02020]" />
            </div>
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
                <div className="text-white font-black text-2xl tracking-[-0.03em] mb-2"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{p.value}</div>
                <div className="text-white font-bold text-xs uppercase tracking-[0.1em] mb-2">{p.label}</div>
                <p className="text-white/60 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
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
              Tipos de Sistemas<br />de Movimiento
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {tiposSistema.map((tipo) => (
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

      {/* Aplicaciones */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Industrias</span>
            </div>
            <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Aplicaciones por Industria
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
            {aplicaciones.map((a) => (
              <div key={a.industry} className="bg-white p-8 hover:bg-zinc-50 transition-colors duration-300">
                <div className="w-5 h-1 bg-[#E02020] mb-5" />
                <h3 className="text-zinc-900 font-black text-sm uppercase tracking-[-0.01em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{a.industry}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{a.desc}</p>
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