// app/soluciones/elevacion-y-guias-lineales/page.tsx

import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

const tiposSistema = [
  {
    title: "Guías Lineales de Perfil",
    desc: "Sistemas de carril y carro con recirculación de bolas o rodillos. Alta rigidez, capacidad de carga elevada y precisión de posicionamiento repetible por debajo de 5 µm.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="12" x2="22" y2="12" />
        <rect x="8" y="9" width="8" height="6" rx="1" />
        <line x1="5" y1="9" x2="5" y2="15" />
        <line x1="19" y1="9" x2="19" y2="15" />
      </svg>
    ),
  },
  {
    title: "Guías de Eje Redondo",
    desc: "Varillas de acero templado con casquillos lineales. Solución económica para cargas moderadas y recorridos largos donde la limpieza y el mantenimiento son prioridad.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="8" x2="22" y2="8" />
        <line x1="2" y1="16" x2="22" y2="16" />
        <circle cx="8" cy="12" r="3" />
        <circle cx="16" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Elevadores de Tijera",
    desc: "Para el transporte vertical controlado de cargas desde 50 kg hasta varias toneladas. Accionamiento eléctrico, neumático o hidráulico según la aplicación.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="2" width="18" height="4" rx="1" />
        <rect x="3" y="18" width="18" height="4" rx="1" />
        <line x1="7" y1="6" x2="17" y2="18" />
        <line x1="17" y1="6" x2="7" y2="18" />
      </svg>
    ),
  },
  {
    title: "Actuadores Lineales",
    desc: "Cilindros neumáticos, husillos de bolas motorizados y actuadores eléctricos para movimiento lineal preciso y repetible dentro de celdas automatizadas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="9" width="14" height="6" rx="1" />
        <line x1="16" y1="12" x2="22" y2="12" />
        <line x1="20" y1="9" x2="22" y2="12" />
        <line x1="20" y1="15" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    title: "Sistemas de Pórtico",
    desc: "Estructuras cartesianas de 2 o 3 ejes para manejo automatizado de piezas. Solución completa que integra guías, actuadores, motor y control en una plataforma unificada.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="5" x2="22" y2="5" />
        <line x1="2" y1="19" x2="22" y2="19" />
        <line x1="4" y1="5" x2="4" y2="19" />
        <line x1="20" y1="5" x2="20" y2="19" />
        <rect x="9" y="9" width="6" height="6" rx="0.5" />
      </svg>
    ),
  },
  {
    title: "Elevadores de Banda y Cadena",
    desc: "Para integración en líneas de conveyors, permiten el cambio de nivel de productos o pallets con sincronización precisa al ritmo de la cadena de producción.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <rect x="8" y="18" width="8" height="4" rx="1" />
        <line x1="8" y1="4" x2="4" y2="20" />
        <line x1="16" y1="4" x2="20" y2="20" />
        <line x1="4" y1="20" x2="20" y2="20" />
      </svg>
    ),
  },
];

const parametrosTecnicos = [
  { value: "5 µm", label: "Repetibilidad", desc: "Precisión de posicionamiento en guías lineales de alta precisión" },
  { value: "10 t", label: "Carga máxima", desc: "Capacidad de elevadores de tijera para aplicaciones pesadas" },
  { value: "IP67", label: "Protección", desc: "Grado de protección disponible para entornos húmedos o con polvo" },
  { value: "6 m/s", label: "Velocidad máx.", desc: "Velocidad de desplazamiento en actuadores lineales de alta dinámica" },
];

const aplicaciones = [
  {
    industry: "Ensamble y Manipulación de Piezas",
    desc: "Sistemas de pórtico y actuadores para pick & place de componentes entre estaciones, reduciendo la intervención manual y eliminando errores de posicionamiento.",
  },
  {
    industry: "Cambio de Nivel en Líneas de Producción",
    desc: "Elevadores integrados en conveyors para mover productos entre diferentes niveles de planta con sincronización al ritmo de producción.",
  },
  {
    industry: "Máquinas de Mecanizado y CNC",
    desc: "Guías de perfil de alta rigidez para ejes de fresadoras, tornos y centros de mecanizado donde la precisión y rigidez son críticas.",
  },
  {
    industry: "Logística y Almacenamiento",
    desc: "Elevadores de carga para paletización, transpaletas automáticas y sistemas AS/RS donde la fiabilidad y velocidad determinan la capacidad del almacén.",
  },
];

export default function ElevacionGuiasLinealesPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src="/assets/images/soluciones/elevacion.webp"
            alt="Elevación y Guías Lineales STEIGERN"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-20 pt-40">
          <div className="flex items-center gap-2 mb-8">
            <a href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</a>
            <span className="text-zinc-600 text-xs">/</span>
            <a href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</a>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Elevación y Guías Lineales</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Movimiento de Precisión</span>
          </div>
          <h1
            className="text-white font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Elevación y
            <br />
            <span className="text-[#E02020]">Guías Lineales</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="w-8 h-1 bg-[#E02020] mb-8" />
              <h2
                className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-6"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                Movimiento Controlado
                <br />en Cada Eje
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Los sistemas de <strong className="text-zinc-800 dark:text-zinc-200">elevación y guías lineales</strong> son los componentes que permiten el movimiento preciso y repetible de piezas, herramientas y subconjuntos dentro de una celda de manufactura o línea de producción.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                En STEIGERN seleccionamos, dimensionamos e integramos el sistema de movimiento adecuado para cada aplicación: desde una simple guía de eje redondo hasta un pórtico cartesiano de tres ejes con control de posición en lazo cerrado.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                Trabajamos con fabricantes líderes como Bosch Rexroth, RK Rose+Krieger y Festo para garantizar componentes con disponibilidad global y soporte técnico a largo plazo.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img
                src="/assets/images/soluciones/elevacion.webp"
                alt="Guías lineales STEIGERN"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Parámetros técnicos */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Capacidades Técnicas</span>
            </div>
            <h2
              className="text-white font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Parámetros
              <br />de Desempeño
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {parametrosTecnicos.map((p) => (
              <div key={p.value} className="bg-[#E02020] p-10 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="text-white font-black text-4xl tracking-[-0.04em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                  {p.value}
                </div>
                <div className="text-white font-bold text-sm uppercase tracking-[0.1em] mb-3">{p.label}</div>
                <p className="text-white/65 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Catálogo</span>
            </div>
            <h2
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Tipos de Sistemas
              <br />de Movimiento
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800">
            {tiposSistema.map((tipo) => (
              <div key={tipo.title} className="bg-white dark:bg-zinc-900 p-10 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
                <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-[#E02020] transition-colors duration-300 mb-5">
                  {tipo.icon}
                </div>
                <h3
                  className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  {tipo.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{tipo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Casos de Uso</span>
              </div>
              <h2
                className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-8"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                Aplicaciones
                <br />Industriales
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                La selección correcta del sistema de movimiento es clave para la confiabilidad y vida útil del equipo. Un dimensionado inadecuado representa el 60% de las fallas prematuras en sistemas lineales.
              </p>
              <div className="flex flex-col gap-0 border-t border-zinc-200 dark:border-zinc-800">
                {aplicaciones.map((ap) => (
                  <div key={ap.industry} className="py-6 border-b border-zinc-200 dark:border-zinc-800 flex gap-6">
                    <div className="w-1 shrink-0 bg-[#E02020] rounded-full" />
                    <div>
                      <p className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                        {ap.industry}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{ap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
                <img
                  src="/assets/images/blog/20250214_093409.jpg"
                  alt="Aplicaciones guías lineales STEIGERN"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#E02020]" />
              </div>
              <div className="mt-6 p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="w-6 h-1 bg-[#E02020] mb-4" />
                <p className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                  Ingeniería de Selección
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Realizamos el cálculo de cargas estáticas y dinámicas, análisis de vida útil (L10) y selección del sistema según velocidad, precisión requerida y condiciones ambientales de operación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Metodología</span>
            </div>
            <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Del Concepto
              <br />a la Integración
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800">
            {[
              { num: "01", title: "Definición de Requerimientos", desc: "Análisis de cargas, recorrido, velocidad, precisión, ciclos de vida y condiciones ambientales del sistema." },
              { num: "02", title: "Selección y Cálculo", desc: "Dimensionado según catálogos de fabricante, cálculo de vida L10 y selección de accionamiento y control." },
              { num: "03", title: "Diseño e Integración", desc: "Modelado CAD completo con integración mecánica, eléctrica y neumática. Validación de interferencias." },
              { num: "04", title: "Montaje y Puesta en Marcha", desc: "Instalación, alineación, parametrización del control y pruebas de aceptación con el cliente en planta." },
            ].map((step) => (
              <div key={step.num} className="bg-white dark:bg-zinc-900 p-10">
                <div className="text-[#E02020] font-black text-3xl tracking-[-0.04em] mb-4" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{step.num}</div>
                <h3 className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{step.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-white font-black text-[clamp(1.8rem,3vw,3.5rem)] uppercase tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                Precisión en
                <br />Cada Milímetro
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Desde una guía simple hasta un sistema cartesiano multi-eje: dimensionamos, seleccionamos e integramos el movimiento lineal perfecto para cada proceso, con respaldo técnico de los fabricantes líderes del sector.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { value: "5 µm", label: "Repetibilidad de posicionamiento alcanzable" },
                { value: "L10 calc.", label: "Vida útil calculada antes de cada proyecto" },
                { value: "Llave en mano", label: "Diseño, suministro, integración y puesta en marcha" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-5 border-b border-white/20 pb-5 last:border-0 last:pb-0">
                  <span className="text-white font-black text-xl shrink-0" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{value}</span>
                  <span className="text-white/70 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}