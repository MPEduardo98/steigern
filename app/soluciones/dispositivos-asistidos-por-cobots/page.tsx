// app/soluciones/dispositivos-asistidos-por-cobots/page.tsx

import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

const tiposDispositivo = [
  {
    title: "Celdas de Pick & Place",
    desc: "El cobot toma piezas de una posición variable o fija y las coloca con precisión en una ubicación definida. Ideal para alimentación de máquinas, paletizado y transferencia entre estaciones.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: "Asistencia en Ensamble",
    desc: "El cobot sostiene, orienta o presenta componentes mientras el operador realiza la operación manual. Elimina posturas forzadas y reduce el esfuerzo físico en ensambles de alto torque o precisión.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Inspección Visual Guiada",
    desc: "El cobot posiciona una cámara o sensor en múltiples puntos de inspección predefinidos con alta repetibilidad, complementando o sustituyendo la inspección manual en puntos de difícil acceso.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
      </svg>
    ),
  },
  {
    title: "Dispensado y Aplicación",
    desc: "Aplicación precisa y repetible de adhesivos, selladores, lubricantes o soldadura de puntos. Trayectorias programadas con control de velocidad y caudal para resultados consistentes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  {
    title: "Atornillado y Torque Controlado",
    desc: "Sistemas de atornillado automático montados en cobot con control de par y ángulo de giro. Registro de cada operación para trazabilidad completa en procesos críticos de seguridad.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Carga y Descarga de Máquinas",
    desc: "Automatización del cambio de piezas en tornos, fresadoras y prensas. El cobot trabaja en modo semiautomático: recoge la pieza terminada, la mide si es necesario y carga la siguiente pieza en bruto.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <polyline points="7 10 12 7 17 10" />
        <line x1="12" y1="7" x2="12" y2="14" />
      </svg>
    ),
  },
];

const marcasCobot = [
  { name: "Universal Robots", desc: "UR3e / UR5e / UR10e / UR16e — los cobots más instalados del mundo" },
  { name: "FANUC", desc: "Serie CRX — alta velocidad y precisión para aplicaciones exigentes" },
  { name: "KUKA", desc: "LBR iisy — diseñado específicamente para colaboración humano-robot" },
  { name: "ABB", desc: "GoFa CRB 15000 — carga hasta 5 kg con alcance optimizado" },
];

const ventajasCobot = [
  {
    value: "0 m",
    label: "Separación requerida",
    desc: "Los cobots operan junto al operador sin barreras de seguridad gracias a la detección de fuerza y velocidad.",
  },
  {
    value: "< 1 h",
    label: "Tiempo de reprogramación",
    desc: "Programación por demostración (hand-guiding): el operador mueve el brazo y el cobot aprende la trayectoria.",
  },
  {
    value: "24/7",
    label: "Disponibilidad",
    desc: "Operan en turnos extendidos sin fatiga, manteniendo la calidad constante durante toda la jornada.",
  },
  {
    value: "18 m",
    label: "ROI típico",
    desc: "Retorno de inversión promedio de 18 meses en aplicaciones de ensamble y carga/descarga de máquinas.",
  },
];

const aplicaciones = [
  {
    industry: "Líneas de Ensamble Automotriz",
    desc: "Cobots integrados en líneas de ensamble para presentación de piezas, torque controlado y verificación de presencia antes del avance a la siguiente estación.",
  },
  {
    industry: "Manufactura Electrónica",
    desc: "Dispensado de adhesivo UV, colocación de componentes y pruebas de continuidad en PCBs con repetibilidad inferior a 0.1 mm.",
  },
  {
    industry: "Industria Médica y Farma",
    desc: "Manipulación de productos en entorno limpio, carga de blísteres y empaque con trazabilidad completa en ambientes con requisitos GMP.",
  },
  {
    industry: "Mecanizado y Metalmecánica",
    desc: "Carga y descarga autónoma de CNC y prensas que libera al operador para tareas de valor agregado mientras la máquina trabaja sin interrupción.",
  },
];

export default function DispositivosCobotsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src="/assets/images/soluciones/cobots.png"
            alt="Dispositivos Asistidos por Co-Bots STEIGERN"
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
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Cobots</span>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Automatización Colaborativa</span>
          </div>
          <h1
            className="text-white font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Dispositivos
            <br />
            <span className="text-[#E02020]">Asistidos por Co-Bots</span>
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
                ¿Qué es un
                <br />Robot Colaborativo?
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Un <strong className="text-zinc-800 dark:text-zinc-200">cobot (robot colaborativo)</strong> es un robot industrial diseñado para operar en el mismo espacio de trabajo que las personas, sin requerir jaulas o barreras de seguridad. Su capacidad de detección de fuerza le permite detenerse de forma segura ante cualquier contacto inesperado.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                En STEIGERN no solo suministramos el cobot: diseñamos la <strong className="text-zinc-800 dark:text-zinc-200">celda completa</strong> que lo rodea. Esto incluye el utillaje, las mordazas de agarre, los sensores, la integración con el conveyor o la máquina, y la programación de todas las aplicaciones.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                Somos integradores certificados con experiencia en las principales marcas del mercado, lo que nos permite seleccionar el cobot óptimo para cada proceso sin atarnos a un único fabricante.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img
                src="/assets/images/soluciones/cobots.png"
                alt="Cobot industrial STEIGERN"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Por qué Cobots</span>
            </div>
            <h2 className="text-white font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Ventajas de la
              <br />Colaboración
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {ventajasCobot.map((v) => (
              <div key={v.value} className="bg-[#E02020] p-10 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="text-white font-black text-4xl tracking-[-0.04em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{v.value}</div>
                <div className="text-white font-bold text-sm uppercase tracking-[0.1em] mb-3">{v.label}</div>
                <p className="text-white/65 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de dispositivos */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Catálogo de Aplicaciones</span>
            </div>
            <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              Dispositivos y
              <br />Celdas Colaborativas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800">
            {tiposDispositivo.map((tipo) => (
              <div key={tipo.title} className="bg-white dark:bg-zinc-900 p-10 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300">
                <div className="text-zinc-400 dark:text-zinc-600 group-hover:text-[#E02020] transition-colors duration-300 mb-5">{tipo.icon}</div>
                <h3 className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-3" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{tipo.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{tipo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Integración Multimarca</span>
              </div>
              <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-6" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                Marcas con las que
                <br />Trabajamos
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                Como integradores independientes, seleccionamos el cobot más adecuado para cada aplicación basándonos en la carga, alcance, ciclos de vida requeridos y presupuesto del proyecto.
              </p>
              <div className="flex flex-col gap-0 border-t border-zinc-200 dark:border-zinc-800">
                {marcasCobot.map((m) => (
                  <div key={m.name} className="py-6 border-b border-zinc-200 dark:border-zinc-800 flex gap-6 items-start">
                    <div className="w-1 shrink-0 bg-[#E02020] rounded-full mt-1" />
                    <div>
                      <p className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-1" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{m.name}</p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
                <img src="/assets/images/soluciones/estaciones.png" alt="Integración cobot STEIGERN" loading="lazy" className="w-full h-auto object-cover" />
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#E02020]" />
              </div>
              <div className="mt-6 p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="w-6 h-1 bg-[#E02020] mb-4" />
                <p className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                  Evaluación de Riesgo
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Toda celda colaborativa incluye una evaluación de riesgo según ISO/TS 15066 y ISO 10218 para garantizar la seguridad del operador en modo colaborativo, documentada y entregada con el equipo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aplicaciones */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img src="/assets/images/blog/20250214_093409.jpg" alt="Aplicaciones cobots STEIGERN" loading="lazy" className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#E02020]" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Casos de Uso</span>
              </div>
              <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-8" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                Aplicaciones
                <br />Industriales
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                Los cobots son especialmente valiosos donde la automatización rígida tradicional no es rentable: lotes pequeños, productos variables, procesos que requieren la destreza humana y la consistencia del robot.
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

      {/* Proceso */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Metodología</span>
            </div>
            <h2 className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
              De la Idea a la
              <br />Celda Operativa
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800">
            {[
              { num: "01", title: "Estudio de Viabilidad", desc: "Análisis del proceso, tiempos de ciclo, variabilidad de pieza y cálculo del ROI esperado para validar la inversión." },
              { num: "02", title: "Diseño de Celda", desc: "Selección del cobot, diseño del utillaje y gripper, layout de la celda, análisis de seguridad ISO/TS 15066." },
              { num: "03", title: "Fabricación e Integración", desc: "Construcción del utillaje, integración mecánica y eléctrica, programación del cobot y pruebas en banco." },
              { num: "04", title: "Puesta en Marcha", desc: "Instalación en planta, ajuste fino de trayectorias, validación de calidad y capacitación del operador y mantenimiento." },
            ].map((step) => (
              <div key={step.num} className="bg-white dark:bg-zinc-950 p-10">
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
                Automatización
                <br />al Alcance de Todos
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Los cobots democratizan la automatización: inversión accesible, implementación rápida y flexibilidad para adaptarse a cualquier cambio de producto. STEIGERN entrega la celda completa, lista para producir.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { value: "18 meses", label: "ROI típico en aplicaciones de carga/descarga" },
                { value: "ISO/TS 15066", label: "Evaluación de riesgo incluida en cada proyecto" },
                { value: "Multimarca", label: "UR, FANUC, KUKA, ABB — el mejor para cada proceso" },
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