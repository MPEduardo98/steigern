// app/soluciones/soluciones-lean/page.tsx

import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

const herramientasLean = [
  {
    title: "5S + Gestión Visual",
    desc: "Implementación de Clasificar, Ordenar, Limpiar, Estandarizar y Sostener con soportes físicos: tableros de sombras, marcaciones de piso, racks etiquetados y sistemas de gestión visual en tiempo real.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Kanban y Supermercados",
    desc: "Diseño e instalación de sistemas kanban físicos: racks de tarjetas, supermercados de materiales, carritos de abastecimiento y circuitos de reposición para flujo pull.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="5" height="6" rx="1" />
        <rect x="10" y="3" width="5" height="10" rx="1" />
        <rect x="17" y="3" width="5" height="4" rx="1" />
        <line x1="3" y1="21" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    title: "Estructuras Tubulares (Karakuri)",
    desc: "Sistemas de movimiento de materiales por gravedad y acumulación. Carritos, toboganes y racks construidos con tubo y conectores que eliminan energía eléctrica y motores.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M5 17V6l3-3h8l3 3v11" />
        <line x1="8" y1="6" x2="16" y2="6" />
      </svg>
    ),
  },
  {
    title: "Poka-Yoke Físico",
    desc: "Dispositivos anti-error mecánicos que hacen físicamente imposible ensamblar una pieza en posición incorrecta, evitando defectos sin depender de la atención del operador.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Células de Manufactura",
    desc: "Rediseño del layout en células en U o flujo continuo que reducen el WIP, eliminan transportes innecesarios y permiten producción one-piece-flow con tiempos de ciclo balanceados.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
        <path d="M3 12h4M17 12h4M12 3v4M12 17v4" />
      </svg>
    ),
  },
  {
    title: "Carros y AGVs Manuales",
    desc: "Vehículos de abastecimiento diseñados a medida: carros de kit, trenes de materiales y portacontenedores que optimizan las rutas de abastecimiento a la línea.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="17" height="10" rx="1" />
        <circle cx="7" cy="20" r="2" />
        <circle cx="17" cy="20" r="2" />
        <path d="M19 12h3l-2-5h-1" />
      </svg>
    ),
  },
];

const principiosLean = [
  {
    title: "Eliminar el Desperdicio (Muda)",
    desc: "Identificamos y eliminamos los 8 desperdicios: sobreproducción, esperas, transporte, sobreprocesamiento, inventario, movimiento, defectos y talento no utilizado.",
  },
  {
    title: "Flujo Continuo",
    desc: "Diseño del proceso para que cada pieza fluya sin interrupciones desde materia prima hasta producto terminado, eliminando colas y tiempos de espera entre operaciones.",
  },
  {
    title: "Sistema Pull",
    desc: "La producción se activa por la demanda real del cliente, no por pronósticos. Los supermercados y señales kanban garantizan el nivel correcto de inventario en cada punto.",
  },
  {
    title: "Mejora Continua (Kaizen)",
    desc: "Las soluciones lean no son proyectos únicos: establecemos las estructuras físicas y culturales para que el equipo de planta pueda sostener y mejorar el sistema de forma autónoma.",
  },
];

const resultados = [
  { value: "40%", label: "Reducción de WIP", desc: "Inventario en proceso tras implementación de flujo continuo" },
  { value: "25%", label: "Ganancia de espacio", desc: "Área liberada mediante rediseño de layout y células en U" },
  { value: "30%", label: "Reducción de movimientos", desc: "Distancia caminada por operador con abastecimiento optimizado" },
  { value: "0", label: "Defectos de posición", desc: "Con dispositivos poka-yoke físicos correctamente diseñados" },
];

const aplicaciones = [
  {
    industry: "Manufactura Automotriz",
    desc: "Implementación de trenes de materiales, supermercados de componentes y células balanceadas según takt time en líneas de ensamble de alta cadencia.",
  },
  {
    industry: "Industria de Proceso",
    desc: "Gestión visual de inventarios, sistemas 5S en áreas de mantenimiento y estructuras de almacenamiento de herramientas para reducir tiempos de preparación (SMED).",
  },
  {
    industry: "Logística Interna",
    desc: "Diseño de rutas de abastecimiento, carros de kit, etiquetado de ubicaciones y sistemas kanban para alimentar líneas de producción sin interrupciones.",
  },
];

export default function SolucionesLeanPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src="/assets/images/soluciones/estructuras.png"
            alt="Soluciones Lean STEIGERN"
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
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Soluciones Lean</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Manufactura Esbelta</span>
          </div>
          <h1
            className="text-white font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Soluciones
            <br />
            <span className="text-[#E02020]">Lean</span>
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
                ¿Qué son las
                <br />Soluciones Lean?
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Las <strong className="text-zinc-800 dark:text-zinc-200">soluciones lean</strong> son las estructuras físicas, dispositivos y sistemas que materializan los principios de la manufactura esbelta en el piso de producción. No son solo una filosofía: son herramientas tangibles que transforman el flujo de materiales, el orden del espacio y la eficiencia de cada operación.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                En STEIGERN diseñamos y fabricamos las soluciones físicas que hacen posible el lean: desde estructuras tubulares karakuri y racks kanban, hasta células de manufactura completas con gestión visual integrada.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                Cada proyecto comienza con un análisis del estado actual (VSM) y termina con soluciones instaladas, probadas y con el equipo de planta capacitado para sostenerlas.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img
                src="/assets/images/soluciones/estructuras.png"
                alt="Soluciones lean STEIGERN"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Impacto Medible</span>
            </div>
            <h2 className="text-white font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Resultados
              <br />Típicos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {resultados.map((r) => (
              <div key={r.value} className="bg-[#E02020] p-10 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="text-white font-black text-4xl tracking-[-0.04em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{r.value}</div>
                <div className="text-white font-bold text-sm uppercase tracking-[0.1em] mb-3">{r.label}</div>
                <p className="text-white/65 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Fundamentos</span>
            </div>
            <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Principios que
              <br />Guían el Diseño
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800">
            {principiosLean.map((p) => (
              <div key={p.title} className="bg-white dark:bg-zinc-900 p-10">
                <div className="w-6 h-1 bg-[#E02020] mb-6" />
                <h3 className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-4" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{p.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Catálogo</span>
            </div>
            <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Herramientas y
              <br />Soluciones Físicas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800">
            {herramientasLean.map((h) => (
              <div key={h.title} className="bg-white dark:bg-zinc-950 p-10 group hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors duration-300">
                <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-[#E02020] transition-colors duration-300 mb-5">{h.icon}</div>
                <h3 className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{h.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img src="/assets/images/blog/20220825_162451.jpg" alt="Lean manufacturing STEIGERN" loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#E02020]" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Casos de Uso</span>
              </div>
              <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-8" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                Aplicaciones
                <br />en Planta
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                Las soluciones lean son aplicables a cualquier industria manufacturera. El denominador común es la voluntad de eliminar desperdicio y crear flujo real donde hoy existe acumulación y espera.
              </p>
              <div className="flex flex-col gap-0 border-t border-zinc-200 dark:border-zinc-800">
                {aplicaciones.map((ap) => (
                  <div key={ap.industry} className="py-6 border-b border-zinc-200 dark:border-zinc-800 flex gap-6">
                    <div className="w-1 shrink-0 bg-[#E02020] rounded-full" />
                    <div>
                      <p className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{ap.industry}</p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{ap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-white font-black text-[clamp(1.8rem,3vw,3.5rem)] uppercase tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                Lean que se Ve,
                <br />se Toca y Funciona
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                No vendemos consultoría: fabricamos las soluciones físicas que transforman el piso de producción. Estructuras, racks, células y dispositivos diseñados para perdurar y mejorar con el tiempo.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { value: "VSM", label: "Diagnóstico del estado actual antes de cada proyecto" },
                { value: "Kaizen", label: "Eventos rápidos de mejora con resultados en 5 días" },
                { value: "Sostenible", label: "El equipo de planta queda capacitado para sostener el sistema" },
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