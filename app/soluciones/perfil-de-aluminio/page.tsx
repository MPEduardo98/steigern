// app/soluciones/perfil-de-aluminio/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Perfil Estructural de Aluminio",
  description: "Sistemas de perfiles estructurales de aluminio para maquinaria industrial, celdas de manufactura, protecciones y estaciones de trabajo. Modulares, ligeros y adaptables.",
  alternates: { canonical: "https://steigern.com.mx/soluciones/perfil-de-aluminio" },
};

const ventajas = [
  { title: "Modularidad Total", desc: "Los perfiles permiten construir, modificar y ampliar estructuras sin soldadura, con simples herramientas de mano y conectores estándar." },
  { title: "Relación Peso/Rigidez", desc: "El aluminio ofrece una rigidez estructural comparable al acero con apenas un tercio de su peso, reduciendo cargas en piso y facilitando el transporte." },
  { title: "Resistencia a la Corrosión", desc: "La capa de anodizado protege el perfil de agentes químicos, humedad y ambientes industriales exigentes sin requerir pintura ni mantenimiento periódico." },
  { title: "Velocidad de Ensamble", desc: "Los proyectos con perfil de aluminio se montan en una fracción del tiempo vs. estructuras soldadas, reduciendo tiempos de parada de línea." },
];

const aplicaciones = [
  { industry: "Automotriz", desc: "Bastidores para líneas de ensamble de componentes, soportes de utillaje, protecciones de máquina y estructuras para sistemas de visión artificial." },
  { industry: "Electrónica y Tecnología", desc: "Mesas de trabajo ESD, racks para pruebas de circuitos, soportes de pantallas y estructuras de cámaras para inspección óptica." },
  { industry: "Celdas de Manufactura", desc: "Marcos portantes para líneas de ensamble, celdas robotizadas y plataformas de inspección con integración de componentes neumáticos y eléctricos." },
  { industry: "Sistemas de Transporte", desc: "Estructuras de soporte para conveyors, soportes de guías lineales y bastidores de sistemas de manejo de materiales." },
  { industry: "Protecciones y Cerramientos", desc: "Bastidores para paneles de policarbonato, mallas de seguridad y resguardos de maquinaria con diseño adaptado a normativas CE y OSHA." },
];

const accesorios = [
  { name: "Conectores internos", desc: "Uniones rígidas sin cabeza visible" },
  { name: "Bisagras y puertas", desc: "Para acceso a celdas y cerramientos" },
  { name: "Pies niveladores", desc: "Ajuste de nivel y amortiguación de vibraciones" },
  { name: "Ruedas industriales", desc: "Para estructuras móviles y carritos" },
  { name: "Paneles laterales", desc: "Policarbonato, aluminio o acero inoxidable" },
  { name: "Canales de cables", desc: "Gestión ordenada del cableado interno" },
  { name: "Soportes de pantalla", desc: "Montaje de HMIs y monitores en estructura" },
  { name: "Tornillería especial", desc: "Tuercas de ranura T y tornillos de cabeza baja" },
];

export default function PerfilAluminioPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/perfil.png" alt="Perfil Estructural de Aluminio STEIGERN" fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Perfil de Aluminio</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Sistema Modular</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            Perfil Estructural<br /><span className="text-[#E02020]">de Aluminio</span>
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
                ¿Qué es el Perfil<br />Estructural de Aluminio?
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                El perfil estructural de aluminio es un sistema de construcción modular basado en extrusiones de aluminio con ranuras en T que permiten unir piezas sin soldadura. Es la base de miles de estructuras industriales: bastidores de maquinaria, estaciones de trabajo, protecciones y sistemas de transporte.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                En STEIGERN seleccionamos y trabajamos con los perfiles más adecuados para cada proyecto: desde perfiles ligeros de 20×20 mm hasta perfiles pesados de 80×160 mm, combinados con el sistema de accesorios y conectores correcto para cada aplicación.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 pointer-events-none z-10" />
              <Image src="/assets/images/soluciones/perfil.png" alt="Perfil de aluminio STEIGERN" width={700} height={500}
                loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 w-7 h-7 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="w-full py-20 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Por qué Aluminio</span>
            </div>
            <h2 className="text-white font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Ventajas del Sistema
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {ventajas.map((v) => (
              <div key={v.title} className="bg-[#E02020] p-8 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="w-6 h-1 bg-white/40 mb-5" />
                <h3 className="text-white font-black text-sm uppercase tracking-[-0.01em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{v.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="w-full py-20 bg-zinc-50">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
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

      {/* Accesorios */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Sistema Completo</span>
            </div>
            <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Accesorios y Conectores
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200">
            {accesorios.map((a) => (
              <div key={a.name} className="bg-white p-6 hover:bg-zinc-50 transition-colors duration-300">
                <div className="w-4 h-px bg-[#E02020] mb-3" />
                <p className="text-zinc-900 font-bold text-sm mb-1">{a.name}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{a.desc}</p>
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