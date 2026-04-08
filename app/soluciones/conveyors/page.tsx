import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

const tiposConveyor = [
  {
    title: "De Banda",
    desc: "Usan una cinta continua de material flexible para transportar productos pequeños o de forma irregular. Son comunes en líneas de ensamblaje y empaquetado.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="20" height="8" rx="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "De Rodillos",
    desc: "Compuestos por cilindros giratorios, ideales para el movimiento de cajas, pallets o cargas pesadas. Pueden ser motorizados o por gravedad.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="12" x2="22" y2="12" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="12" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Modulares o Articulados",
    desc: "Fabricados en tramos plásticos o metálicos, permiten trayectos complejos con curvas, giros y elevaciones. Muy fáciles de mantener.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
        <line x1="12" y1="12" x2="20" y2="12" />
        <line x1="12" y1="5" x2="20" y2="5" />
      </svg>
    ),
  },
  {
    title: "Elevadores",
    desc: "Permiten el transporte vertical entre diferentes niveles de una planta, optimizando el espacio y conectando estaciones a distintas alturas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    ),
  },
];

const aplicaciones = [
  {
    industry: "Automotriz",
    desc: "Movimiento de chasises entre estaciones de soldadura, pintura y ensamblaje final con sincronización precisa.",
  },
  {
    industry: "Logística",
    desc: "Clasificación y direccionamiento automático de paquetes hacia destinos correctos en centros de distribución.",
  },
  {
    industry: "Alimentaria",
    desc: "Transporte higiénico de productos frescos o procesados sin contaminación cruzada en entornos regulados.",
  },
];

export default function ConveyorsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src="/assets/images/blog/20250214_093409.jpg"
            alt="Sistemas de Transporte STEIGERN"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-20 pt-40">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8">
            <a href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</a>
            <span className="text-zinc-600 text-xs">/</span>
            <a href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</a>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Conveyors</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Sistemas de Transporte</span>
          </div>
          <h1
            className="text-white font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Conveyors
            <br />
            <span className="text-[#E02020]">Industriales</span>
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
                ¿Qué es un Conveyor?
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Un <strong className="text-zinc-800 dark:text-zinc-200">conveyor</strong> (o transportador) es un sistema mecánico diseñado para mover materiales, productos o componentes de un punto a otro dentro de un entorno industrial. Funciona de forma continua, controlada y automatizada, lo que lo convierte en un elemento esencial en procesos productivos donde la eficiencia, precisión y fluidez del movimiento son críticos.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Los conveyors están compuestos por distintos elementos como bandas, rodillos, motores, sensores y estructuras de soporte. Su configuración puede variar dependiendo del tipo de carga, el entorno de trabajo, la velocidad requerida y el nivel de automatización deseado.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                Estos sistemas permiten reducir la intervención humana en tareas repetitivas o de alto riesgo, minimizando errores y aumentando la seguridad en planta.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img
                src="/assets/images/blog/20250214_093409.jpg"
                alt="Conveyor industrial STEIGERN"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Tipos */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800" />
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
              Tipos de Conveyors
              <br />
              Industriales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800">
            {tiposConveyor.map((tipo) => (
              <div
                key={tipo.title}
                className="bg-white dark:bg-zinc-900 p-10 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300"
              >
                <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-[#E02020] transition-colors duration-300 mb-5">
                  {tipo.icon}
                </div>
                <h3
                  className="text-zinc-900 dark:text-zinc-100 font-black text-xl uppercase tracking-[-0.02em] mb-3"
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
                <br />
                Industriales
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                Un sistema de conveyors bien diseñado puede incrementar la eficiencia general de una planta en más del 30%.
              </p>
              <div className="flex flex-col gap-0 border-t border-zinc-200 dark:border-zinc-800">
                {aplicaciones.map((ap) => (
                  <div key={ap.industry} className="py-6 border-b border-zinc-200 dark:border-zinc-800 flex gap-6">
                    <div className="w-1 shrink-0 bg-[#E02020] rounded-full" />
                    <div>
                      <p
                        className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-2"
                        style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                      >
                        {ap.industry}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{ap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img
                src="/assets/images/blog/20220825_162451.jpg"
                alt="Aplicaciones industriales conveyor STEIGERN"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#E02020]" />
            </div>

          </div>
        </div>
      </section>

      {/* Soluciones a medida */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-white font-black text-[clamp(1.8rem,3vw,3.5rem)] uppercase tracking-[-0.03em] leading-tight mb-6"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                Soluciones
                <br />
                a Medida
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                En STEIGERN, transformamos necesidades industriales en soluciones personalizadas. A partir del análisis de cada proceso, diseñamos e implementamos sistemas conveyor que optimizan el flujo de materiales, integrando sensores, controladores y estructuras hechas a medida.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { value: "30%+", label: "Incremento en eficiencia de planta" },
                { value: "100%", label: "Soluciones personalizadas por proceso" },
                { value: "A medida", label: "Desde el concepto hasta la puesta en marcha" },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-5 border-b border-white/20 pb-5 last:border-0 last:pb-0">
                  <span className="text-white font-black text-2xl shrink-0" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{value}</span>
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