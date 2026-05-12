// app/soluciones/estaciones-de-trabajo/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Estaciones de Trabajo Industriales",
  description: "Diseño y fabricación de estaciones de trabajo ergonómicas para manufactura. Adaptadas a cada operario y proceso.",
  alternates: { canonical: "https://steigern.com.mx/soluciones/estaciones-de-trabajo" },
};

const principios = [
  { title: "Ergonomía Activa", desc: "Superficies de trabajo ajustables en altura, inclinación y distancia. El puesto se adapta al operario, no al revés, reduciendo lesiones por posturas forzadas." },
  { title: "Gestión Visual", desc: "Tableros de sombra, porta-herramientas, andon lights y señalética integrada para que el operario encuentre todo en su lugar sin búsquedas." },
  { title: "Integración de Utilidades", desc: "Canalización de aire comprimido, energía eléctrica, datos y luz integrados en la estructura, sin cables sueltos ni mangueras por el piso." },
  { title: "Seguridad por Diseño", desc: "Esquinas redondeadas, protecciones de polipropileno, puntos de puesta a tierra ESD y sistemas antifatiga incorporados desde el diseño inicial." },
];

const tiposEstacion = [
  { title: "Estación de Ensamble", desc: "Para operaciones manuales de ensamble de componentes. Incluye porta-piezas, iluminación focal y sistemas antiestáticos." },
  { title: "Estación de Inspección", desc: "Con iluminación de alta CRI, soportes de cámara, superficies de contraste y áreas de rechazo claramente diferenciadas." },
  { title: "Estación con Cobot", desc: "Diseñada para la colaboración humano-robot: zona de alcance del cobot, barreras de luz opcionales y layout optimizado para el ciclo compartido." },
  { title: "Estación Lean / Mizusumashi", desc: "Incluye tablero de gestión, área de supermercado de materiales y señales kanban para operaciones pull." },
  { title: "Estación Móvil", desc: "Sobre ruedas industriales con freno. Ideal para operaciones que requieren reconfiguración frecuente o respuesta rápida a cambios de línea." },
  { title: "Banco de Herramientas", desc: "Tableros de sombra para herramientas, organizadores de tornillería y sistemas de gestión visual integrados en un solo mueble." },
];

const materiales = [
  { name: "Perfil de aluminio 40×40–80×80", desc: "Estructura principal modular" },
  { name: "Tablero de MDF laminado", desc: "Superficie de trabajo estándar" },
  { name: "Tablero ESD", desc: "Para entornos electrónicos sensibles" },
  { name: "Acero inoxidable 304/316", desc: "Para entornos de limpieza estricta" },
  { name: "Policarbonato transparente", desc: "Protecciones y cerramientos" },
  { name: "Aluminio anodizado", desc: "Paneles laterales y frentes" },
];

export default function EstacionesTrabajoPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/estaciones.png" alt="Estaciones de Trabajo STEIGERN" fill className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Estaciones de Trabajo</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Ergonomía Industrial</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.4rem,5vw,5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            Estaciones de<br /><span className="text-[#E02020]">Trabajo</span>
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
                El Puesto de Trabajo<br />como Herramienta
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                Una estación de trabajo bien diseñada no es solo un mueble: es una herramienta productiva. En STEIGERN diseñamos cada puesto considerando el proceso, el operario y el entorno, asegurando que cada elemento tenga una razón de ser.
              </p>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Desde estaciones de ensamble manual hasta puestos de inspección óptica con iluminación controlada, cada proyecto comienza con un análisis ergonómico y termina con una instalación validada en planta.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 pointer-events-none z-10" />
              <Image src="/assets/images/soluciones/estaciones.png" alt="Estación de trabajo STEIGERN" width={700} height={500}
                loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#E02020]" />
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
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Nuestro Enfoque</span>
            </div>
            <h2 className="text-white font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Principios de Diseño
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {principios.map((p) => (
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
              Tipos de Estaciones<br />Industriales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {tiposEstacion.map((tipo) => (
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

      {/* Materiales */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Construcción</span>
            </div>
            <h2 className="text-zinc-900 font-black text-[clamp(1.6rem,2.8vw,2.8rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Materiales y Superficies
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-200">
            {materiales.map((m) => (
              <div key={m.name} className="bg-white p-6 hover:bg-zinc-50 transition-colors duration-300">
                <div className="w-4 h-px bg-[#E02020] mb-3" />
                <p className="text-zinc-900 font-bold text-xs mb-1">{m.name}</p>
                <p className="text-zinc-400 text-xs leading-relaxed">{m.desc}</p>
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