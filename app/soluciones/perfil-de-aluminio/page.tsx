// app/soluciones/perfil-de-aluminio/page.tsx

import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

const tiposPerfil = [
  {
    title: "Perfil 20×20",
    desc: "Ideal para estructuras ligeras, soportes de paneles y divisiones. Su sección cuadrada facilita la construcción de marcos y bastidores de bajo peso.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <rect x="7" y="7" width="10" height="10" rx="0.5" />
      </svg>
    ),
  },
  {
    title: "Perfil 30×30",
    desc: "Versátil y robusto, se emplea en estaciones de trabajo, mesas de ensamble y estructuras de mediana carga con alta rigidez torsional.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="1" />
        <rect x="6" y="6" width="12" height="12" rx="0.5" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    title: "Perfil 40×40",
    desc: "Diseñado para estructuras portantes y maquinaria industrial. Excelente relación peso/resistencia para celdas de manufactura y automatización.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="1" />
        <rect x="5" y="5" width="14" height="14" rx="0.5" />
        <rect x="9" y="9" width="6" height="6" rx="0.5" />
      </svg>
    ),
  },
  {
    title: "Perfil 45×45",
    desc: "Perfil de alto desempeño para aplicaciones con cargas elevadas. Sus canales internos permiten integración directa de cables, mangueras y accesorios.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="1" />
        <circle cx="12" cy="12" r="4" />
        <line x1="2" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    title: "Perfil 60×60",
    desc: "Para estructuras de gran formato y equipos industriales pesados. Su rígidez excepcional garantiza estabilidad dimensional bajo cargas dinámicas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="1" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <line x1="2" y1="16" x2="22" y2="16" />
        <line x1="8" y1="2" x2="8" y2="22" />
        <line x1="16" y1="2" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    title: "Perfiles Especiales",
    desc: "Secciones rectangulares, angulares o bajo diseño específico para requerimientos únicos. Desde extrusiones estándar hasta geometrías completamente personalizadas.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
];

const ventajas = [
  {
    value: "1/3",
    label: "Del peso del acero",
    desc: "Mismo desempeño estructural con una fracción del peso total del sistema.",
  },
  {
    value: "100%",
    label: "Reciclable",
    desc: "Material sostenible con alto valor de recuperación al término de su vida útil.",
  },
  {
    value: "T-slot",
    label: "Sistema modular",
    desc: "Ranuras en T estándar permiten conexiones sin soldadura, rápidas y reposicionables.",
  },
  {
    value: "IP65",
    label: "Resistencia",
    desc: "Alta resistencia a la corrosión y agentes químicos en entornos industriales exigentes.",
  },
];

const aplicaciones = [
  {
    industry: "Estaciones de Trabajo Ergonómicas",
    desc: "Construcción de mesas, soportes y estructuras ajustables en altura que maximizan la comodidad y productividad del operador.",
  },
  {
    industry: "Celdas de Manufactura",
    desc: "Marcos portantes para líneas de ensamble, celdas robotizadas y plataformas de inspección con integración de componentes neumáticos y eléctricos.",
  },
  {
    industry: "Sistemas de Transporte",
    desc: "Estructuras de soporte para conveyors, soportes de guías lineales y bastidores de sistemas de manejo de materiales.",
  },
  {
    industry: "Protecciones y Cerramientos",
    desc: "Bastidores para paneles de policarbonato, mallas de seguridad y resguardos de maquinaria con diseño adaptado a normativas CE y OSHA.",
  },
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
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <img
            src="/assets/images/soluciones/perfil.png"
            alt="Perfil Estructural de Aluminio STEIGERN"
            className="w-full h-full object-cover opacity-35"
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
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">Perfil de Aluminio</span>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Sistemas Constructivos</span>
          </div>
          <h1
            className="text-white font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Perfil Estructural
            <br />
            <span className="text-[#E02020]">de Aluminio</span>
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
                ¿Qué es el Perfil
                <br />Estructural de Aluminio?
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                El <strong className="text-zinc-800 dark:text-zinc-200">perfil estructural de aluminio</strong> es un sistema de construcción modular basado en extrusiones de aluminio con ranuras longitudinales en forma de T. Este sistema permite ensamblar estructuras industriales de alta rigidez sin soldadura, con total flexibilidad de diseño y adaptación futura.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Cada perfil cuenta con canales normalizados que aceptan una amplia gama de accesorios: conectores, bisagras, paneles, ruedas y soportes. El resultado es una plataforma constructiva universal para cualquier aplicación industrial.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                En STEIGERN seleccionamos, cortamos, mecanizamos y ensamblamos perfiles según los requerimientos exactos de cada proyecto, entregando estructuras listas para instalar con todos los componentes integrados.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
              <img
                src="/assets/images/soluciones/perfil.png"
                alt="Perfil estructural de aluminio STEIGERN"
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
              <span className="text-white/70 text-xs font-bold tracking-[0.25em] uppercase">Por qué Aluminio</span>
            </div>
            <h2
              className="text-white font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Ventajas del Sistema
              <br />Modular
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {ventajas.map((v) => (
              <div key={v.value} className="bg-[#E02020] p-10 hover:bg-[#c41a1a] transition-colors duration-300">
                <div className="text-white font-black text-4xl tracking-[-0.04em] mb-2" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                  {v.value}
                </div>
                <div className="text-white font-bold text-sm uppercase tracking-[0.1em] mb-3">
                  {v.label}
                </div>
                <p className="text-white/65 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de Perfil */}
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
              Secciones y Formatos
              <br />Disponibles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 dark:bg-zinc-800">
            {tiposPerfil.map((tipo) => (
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

      {/* Accesorios */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Ecosistema Completo</span>
              </div>
              <h2
                className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-6"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                Accesorios e
                <br />Integraciones
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                El perfil de aluminio cobra su verdadero potencial cuando se combina con la gama completa de accesorios del sistema. En STEIGERN suministramos e integramos todos los componentes necesarios para una solución llave en mano.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-zinc-200 dark:border-zinc-800">
                {accesorios.map((acc) => (
                  <div key={acc.name} className="py-5 pr-6 border-b border-zinc-200 dark:border-zinc-800 flex gap-4 items-start">
                    <div className="w-1 h-1 rounded-full bg-[#E02020] mt-2 shrink-0" />
                    <div>
                      <p
                        className="text-zinc-900 dark:text-zinc-100 font-black text-sm uppercase tracking-[0.06em] mb-1"
                        style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                      >
                        {acc.name}
                      </p>
                      <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{acc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <div className="absolute -inset-px border border-zinc-200 dark:border-zinc-800" />
                <img
                  src="/assets/images/soluciones/estaciones.png"
                  alt="Accesorios perfil aluminio STEIGERN"
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
                  Compatibilidad Universal
                </p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Trabajamos con los sistemas de RK Rose+Krieger, Minitec, Bosch Rexroth y perfiles propios, asegurando la mejor opción técnica y económica para cada proyecto.
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
                src="/assets/images/blog/20250214_093409.jpg"
                alt="Aplicaciones perfil aluminio STEIGERN"
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
                La versatilidad del perfil estructural lo convierte en el material de elección para proyectos que demandan rapidez de implementación, reutilización y adaptabilidad.
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
              <br />de Trabajo
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800">
            {[
              { num: "01", title: "Levantamiento", desc: "Análisis de requerimientos, cargas, espacio disponible y estándares de seguridad aplicables." },
              { num: "02", title: "Diseño 3D", desc: "Modelado completo de la estructura con selección de perfiles, accesorios y cortes a medida." },
              { num: "03", title: "Fabricación", desc: "Corte de precisión, mecanizado de agujeros, montaje de accesorios y control dimensional." },
              { num: "04", title: "Entrega e Instalación", desc: "Envío de estructura pre-ensamblada o soporte técnico para instalación en sitio." },
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
                Estructuras
                <br />a Tu Medida
              </h2>
              <p className="text-white/80 text-base leading-relaxed">
                Desde un soporte sencillo hasta una celda de manufactura completa: diseñamos y suministramos estructuras de aluminio adaptadas a cada proceso industrial, integrando todos los componentes necesarios para una solución lista para operar.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { value: "Sin soldadura", label: "Ensamble rápido y reposicionable" },
                { value: "Corte exacto", label: "Mecanizado según planos o modelos 3D" },
                { value: "Llave en mano", label: "Diseño, fabricación e instalación integrados" },
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