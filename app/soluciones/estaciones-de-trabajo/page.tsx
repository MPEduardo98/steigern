// app/soluciones/estaciones-de-trabajo/page.tsx

import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

const tiposEstacion = [
  {
    title: "Estación de Ensamble Manual",
    desc: "Diseñadas para operaciones donde el operador realiza tareas repetitivas de precisión. Incluyen iluminación integrada, soporte para herramientas y superficies antiestáticas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="14" width="18" height="7" rx="1" />
        <line x1="7" y1="14" x2="7" y2="3" />
        <line x1="17" y1="14" x2="17" y2="3" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="5" y1="21" x2="5" y2="23" />
        <line x1="19" y1="21" x2="19" y2="23" />
      </svg>
    ),
  },
  {
    title: "Estación de Inspección y Control de Calidad",
    desc: "Equipadas con sistemas de iluminación calibrada, soportes para cámaras o instrumentos de medición y superficies de referencia plana para inspección dimensional.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    title: "Estación de Pruebas Funcionales",
    desc: "Integran módulos neumáticos, eléctricos y de comunicación para verificar el correcto funcionamiento de componentes o subconjuntos al final de cada ciclo de producción.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Estación Mixta Hombre-Máquina",
    desc: "Combina trabajo manual con asistencia automatizada: dispensadores, atornilladoras controladas, presensores y sistemas de guiado visual para cero defectos.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <line x1="19" y1="8" x2="21" y2="8" />
        <line x1="19" y1="5" x2="21" y2="3" />
        <line x1="19" y1="11" x2="21" y2="13" />
      </svg>
    ),
  },
  {
    title: "Estación Ajustable en Altura",
    desc: "Con mecanismo de elevación eléctrico o neumático, permiten adaptar la altura de trabajo a cada operario, reduciendo fatiga y riesgo de lesiones musculoesqueléticas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="4" rx="1" />
        <line x1="12" y1="2" x2="12" y2="7" />
        <polyline points="9 5 12 2 15 5" />
        <line x1="12" y1="17" x2="12" y2="22" />
        <polyline points="15 19 12 22 9 19" />
      </svg>
    ),
  },
  {
    title: "Estación Modular Reconfigurable",
    desc: "Construidas con perfil de aluminio estructural, pueden redistribuirse, ampliarse o modificarse sin herramientas especiales para adaptarse a cambios en el proceso productivo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="7" height="7" rx="1" />
        <rect x="15" y="3" width="7" height="7" rx="1" />
        <rect x="2" y="14" width="7" height="7" rx="1" />
        <rect x="15" y="14" width="7" height="7" rx="1" />
        <line x1="9" y1="6.5" x2="15" y2="6.5" />
        <line x1="9" y1="17.5" x2="15" y2="17.5" />
        <line x1="5.5" y1="10" x2="5.5" y2="14" />
        <line x1="18.5" y1="10" x2="18.5" y2="14" />
      </svg>
    ),
  },
];

const principiosErgonomicos = [
  {
    title: "Altura de Trabajo Óptima",
    desc: "La superficie de trabajo se posiciona al nivel del codo del operador (sentado o de pie), eliminando posturas forzadas que generan fatiga y lesiones a largo plazo.",
  },
  {
    title: "Zona de Alcance",
    desc: "Todos los materiales, herramientas y controles se ubican dentro del radio de alcance cómodo, reduciendo movimientos innecesarios y tiempos de ciclo.",
  },
  {
    title: "Iluminación Calibrada",
    desc: "Nivel de iluminancia mínimo de 500 lux en superficies de trabajo, con temperatura de color adecuada para inspección visual y reducción de fatiga ocular.",
  },
  {
    title: "Control de Vibraciones",
    desc: "Pies antivibratorios y superficies amortiguadas que reducen la transmisión de vibraciones al operador en estaciones con maquinaria o herramientas eléctricas.",
  },
];

const aplicaciones = [
  {
    industry: "Líneas de Ensamble Automotriz",
    desc: "Estaciones integradas en conveyors con sincronización de tiempo de ciclo, gestión de torque y sistemas poka-yoke para ensamble de subconjuntos con cero defectos.",
  },
  {
    industry: "Manufactura Electrónica",
    desc: "Superficies antiestáticas (ESD), iluminación de precisión y soportes para soldadura, inspección de PCBs y montaje de componentes delicados.",
  },
  {
    industry: "Líneas de Empaque y Logística",
    desc: "Estaciones de pick & pack con guiado visual, básculas integradas y sistemas de etiquetado para despacho eficiente con trazabilidad completa.",
  },
  {
    industry: "Laboratorios y Control de Calidad",
    desc: "Mesas de referencia antivibración con soporte para instrumentos de medición, iluminación calibrada y gestión de cables para equipos de inspección.",
  },
];

const componentesIntegrados = [
  { name: "Panel LED integrado", desc: "Iluminación uniforme sin sombras" },
  { name: "Regleta de energía", desc: "Múltiples tomas y USB industriales" },
  { name: "Soporte de monitor / HMI", desc: "Brazo articulado con gestión de cables" },
  { name: "Portaherramientas", desc: "Riel magnético o soporte con posiciones fijas" },
  { name: "Gavetas y cajones", desc: "Almacenamiento ordenado de componentes" },
  { name: "Estante superior", desc: "Zona de materiales en proceso y referencia" },
  { name: "Pies niveladores antivibratorios", desc: "Estabilidad en cualquier superficie" },
  { name: "Ruedas con freno", desc: "Para estaciones móviles o reconfigurables" },
];

export default function EstacionesDeTrabajoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src="/assets/images/soluciones/estaciones.png"
            alt="Estaciones de Trabajo STEIGERN"
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
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Estaciones de Trabajo</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Ergonomía e Ingeniería</span>
          </div>
          <h1
            className="text-white font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Estaciones
            <br />
            <span className="text-[#E02020]">de Trabajo</span>
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
                ¿Qué es una Estación
                <br />de Trabajo Industrial?
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Una <strong className="text-zinc-800 dark:text-zinc-200">estación de trabajo industrial</strong> es el entorno físico donde el operador realiza una o varias operaciones específicas dentro de una línea de producción. Su diseño determina directamente la productividad, calidad del proceso y bienestar del trabajador.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                En STEIGERN diseñamos estaciones que van más allá de una simple mesa: integramos iluminación, gestión de cables, soporte para herramientas, sistemas poka-yoke y accesibilidad a materiales, todo bajo principios de <strong className="text-zinc-800 dark:text-zinc-200">diseño ergonómico</strong> validados.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                Cada estación se desarrolla a partir del análisis del proceso, el perfil del operador y los requerimientos de calidad, garantizando que el ambiente de trabajo sea seguro, eficiente y adaptable a futuros cambios.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img
                src="/assets/images/soluciones/estaciones.png"
                alt="Estación de trabajo STEIGERN"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-[#E02020]" />
            </div>
          </div>
        </div>
      </section>

      {/* Principios ergonómicos */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Diseño Centrado en el Operador</span>
            </div>
            <h2
              className="text-white font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Principios
              <br />Ergonómicos
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {principiosErgonomicos.map((p) => (
              <div key={p.title} className="bg-[#E02020] p-10 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="w-6 h-1 bg-white/40 mb-6" />
                <h3
                  className="text-white font-black text-lg uppercase tracking-[-0.02em] mb-4"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de estaciones */}
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
              Tipos de Estaciones
              <br />Industriales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800">
            {tiposEstacion.map((tipo) => (
              <div
                key={tipo.title}
                className="bg-white dark:bg-zinc-900 p-10 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300"
              >
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

      {/* Componentes integrados */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Todo Integrado</span>
              </div>
              <h2
                className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-6"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                Componentes
                <br />y Equipamiento
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                Cada estación se entrega como un sistema completo, listo para operar. Suministramos e integramos todos los elementos periféricos para que el operador disponga de todo lo necesario en su área de trabajo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-zinc-200 dark:border-zinc-800">
                {componentesIntegrados.map((comp) => (
                  <div key={comp.name} className="py-5 pr-6 border-b border-zinc-200 dark:border-zinc-800 flex gap-4 items-start">
                    <div className="w-1 h-1 rounded-full bg-[#E02020] mt-2 shrink-0" />
                    <div>
                      <p
                        className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.06em] mb-1"
                        style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                      >
                        {comp.name}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{comp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
                <img
                  src="/assets/images/soluciones/perfil.png"
                  alt="Componentes estación de trabajo STEIGERN"
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-0 right-0 w-8 h-8 bg-[#E02020]" />
              </div>
              <div className="mt-6 p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="w-6 h-1 bg-[#E02020] mb-4" />
                <p
                  className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.08em] mb-2"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  Normativas Aplicadas
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Nuestras estaciones se diseñan bajo las directrices de la norma ISO 9241 (ergonomía del puesto de trabajo) y los requisitos de seguridad de la NOM-017-STPS y directiva de maquinaria CE donde aplica.
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
              <img
                src="/assets/images/blog/20220825_162451.jpg"
                alt="Aplicaciones estaciones de trabajo STEIGERN"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#E02020]" />
            </div>

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
                Una estación bien diseñada puede incrementar la productividad individual hasta un 25% y reducir los incidentes ergonómicos en más del 40%, con retorno de inversión en menos de 18 meses.
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
            <h2
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Nuestro Proceso
              <br />de Diseño
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800">
            {[
              { num: "01", title: "Análisis del Proceso", desc: "Estudio del método de trabajo, tiempos de ciclo, herramientas utilizadas y perfil antropométrico de los operadores." },
              { num: "02", title: "Diseño Ergonómico", desc: "Modelado 3D de la estación con validación de alturas, alcances y zonas de trabajo según normativas internacionales." },
              { num: "03", title: "Fabricación e Integración", desc: "Construcción de la estructura con perfil de aluminio, integración de componentes eléctricos, neumáticos y de iluminación." },
              { num: "04", title: "Validación en Planta", desc: "Prueba de concepto con operadores reales, ajustes finales y capacitación del equipo de mantenimiento." },
            ].map((step) => (
              <div key={step.num} className="bg-white dark:bg-zinc-950 p-10">
                <div className="text-[#E02020] font-black text-3xl tracking-[-0.04em] mb-4" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                  {step.num}
                </div>
                <h3
                  className="text-zinc-900 dark:text-zinc-100 font-black text-lg uppercase tracking-[-0.02em] mb-3"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full py-24 bg-[#E02020]">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-white font-black text-[clamp(1.8rem,3vw,3.5rem)] uppercase tracking-[-0.03em] leading-tight mb-6"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                Estaciones que
                <br />Transforman el Trabajo
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Diseñamos cada puesto de trabajo como un sistema completo: ergonómico, seguro, eficiente e integrado al proceso productivo. El operador al centro de cada decisión de diseño.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { value: "25%+", label: "Incremento en productividad individual" },
                { value: "40%+", label: "Reducción de incidentes ergonómicos" },
                { value: "ISO 9241", label: "Diseño conforme a normativa ergonómica internacional" },
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