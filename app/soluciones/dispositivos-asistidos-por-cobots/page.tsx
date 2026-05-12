// app/soluciones/dispositivos-asistidos-por-cobots/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Dispositivos Asistidos por Co-Bots",
  description: "Integración de robots colaborativos para automatizar procesos de ensamble industrial. Celdas completas diseñadas y programadas por STEIGERN.",
  alternates: { canonical: "https://steigern.com.mx/soluciones/dispositivos-asistidos-por-cobots" },
};

const ventajasCobot = [
  { value: "Sin Jaula", label: "Operación Colaborativa", desc: "Los cobots operan junto al operario sin barreras de seguridad rígidas, gracias a su sistema de detección de fuerza." },
  { value: "Rápido ROI", label: "Retorno de Inversión", desc: "Tiempos de amortización de 12 a 24 meses en la mayoría de aplicaciones de ensamble repetitivo." },
  { value: "Flexible", label: "Reprogramable", desc: "El mismo cobot puede realizar diferentes tareas con solo cambiar el utillaje y el programa." },
  { value: "Seguro", label: "Certificado", desc: "Cumplimiento con ISO/TS 15066 y normativas CE/OSHA para operación en entornos de manufactura." },
];

const aplicaciones = [
  { title: "Atornillado Automatizado", desc: "Control de torque y conteo de ciclos. Integración con atornilladores eléctricos de precisión y verificación de apriete." },
  { title: "Pick & Place", desc: "Manipulación de piezas entre estaciones, carga/descarga de máquinas CNC y alimentación de líneas de ensamble." },
  { title: "Inspección con Visión", desc: "Integración de cámaras de visión artificial para verificación dimensional, lectura de códigos y detección de defectos." },
  { title: "Dispensado de Sellantes", desc: "Aplicación precisa de adhesivos, sellantes y lubricantes con control de flujo y trayectoria programada." },
  { title: "Soldadura MIG/TIG", desc: "Aplicaciones de soldadura repetitiva donde la consistencia del cordón es crítica y el operario no puede repetir la calidad manualmente." },
  { title: "Paletizado Colaborativo", desc: "Formación de capas de producto sobre palet con orientación variable, sin requerir espacio exclusivo para el robot." },
];

const marcas = ["Universal Robots", "Fanuc", "KUKA", "ABB", "Doosan", "Techman"];

export default function CobotsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/cobots.png" alt="Cobots STEIGERN" fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Co-Bots</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Automatización Colaborativa</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            Dispositivos con<br /><span className="text-[#E02020]">Co-Bots</span>
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
                ¿Qué es un<br />Robot Colaborativo?
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Un <strong className="text-zinc-800">cobot (robot colaborativo)</strong> es un robot industrial diseñado para operar en el mismo espacio de trabajo que las personas, sin requerir jaulas o barreras de seguridad. Su capacidad de detección de fuerza le permite detenerse de forma segura ante cualquier contacto inesperado.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                En STEIGERN no solo suministramos el cobot: diseñamos la <strong className="text-zinc-800">celda completa</strong>. Esto incluye el utillaje, las mordazas de agarre, los sensores, la integración con el conveyor o la máquina, y la programación de todas las aplicaciones.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Somos integradores certificados con experiencia en las principales marcas del mercado, lo que nos permite seleccionar el cobot óptimo para cada proceso.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 pointer-events-none z-10" />
              <Image src="/assets/images/soluciones/cobots.png" alt="Cobot industrial STEIGERN" width={700} height={500}
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
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Por qué Cobots</span>
            </div>
            <h2 className="text-white font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Ventajas de la Colaboración
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {ventajasCobot.map((v) => (
              <div key={v.value} className="bg-[#E02020] p-8 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="text-white font-black text-2xl tracking-[-0.03em] mb-2"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{v.value}</div>
                <div className="text-white font-bold text-xs uppercase tracking-[0.1em] mb-3">{v.label}</div>
                <p className="text-white/65 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="w-full py-20 bg-zinc-50">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 pointer-events-none" />
              <Image src="/assets/images/blog/20250214_093409.jpg" alt="Aplicaciones cobots STEIGERN" width={700} height={500}
                loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#E02020]" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Casos de Uso</span>
              </div>
              <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight mb-8"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                Aplicaciones<br />Industriales
              </h2>
              <div className="flex flex-col gap-0 divide-y divide-zinc-200">
                {aplicaciones.map((a) => (
                  <div key={a.title} className="py-4 group">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-3 h-px bg-zinc-300 group-hover:bg-[#E02020] transition-colors duration-300" />
                      <h3 className="text-zinc-900 font-black text-xs uppercase tracking-[-0.01em]"
                        style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{a.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed pl-6">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="w-full py-16 bg-white border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Marcas con las que Trabajamos</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {marcas.map((m) => (
              <span key={m} className="text-xs font-bold tracking-[0.12em] uppercase px-4 py-2 border border-zinc-200 text-zinc-500 hover:border-[#E02020] hover:text-[#E02020] transition-colors duration-200">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}