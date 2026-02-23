import Link from "next/link";

const services = [
  {
    icon: "⚙️",
    title: "Sistemas de Conveyor",
    description: "Diseño e implementación de sistemas de transporte automatizado adaptados a sus necesidades de producción y logística.",
    href: "/servicios/conveyor"
  },
  {
    icon: "🤖",
    title: "Estaciones Automatizadas",
    description: "Desarrollo de estaciones de trabajo totalmente automatizadas con control preciso y monitoreo en tiempo real.",
    href: "/servicios/automatizacion"
  },
  {
    icon: "🔧",
    title: "Integración de Sistemas",
    description: "Integración completa de sistemas automatizados y semi-automatizados con su infraestructura existente.",
    href: "/servicios/integracion"
  },
  {
    icon: "📊",
    title: "Ingeniería de Diseño",
    description: "Servicios de ingeniería y diseño personalizados para crear soluciones únicas que optimicen su producción.",
    href: "/servicios/diseno"
  },
  {
    icon: "🛠️",
    title: "Mantenimiento Preventivo",
    description: "Programas de mantenimiento preventivo y correctivo para garantizar la máxima eficiencia operativa.",
    href: "/servicios/mantenimiento"
  },
  {
    icon: "💡",
    title: "Consultoría Técnica",
    description: "Asesoría especializada en automatización industrial para identificar oportunidades de mejora en sus procesos.",
    href: "/servicios/consultoria"
  }
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-brand-off-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-red text-sm font-semibold tracking-[0.15em] uppercase mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-charcoal mb-4">
            Soluciones Integrales de Automatización
          </h2>
          <p className="text-lg text-brand-medium-gray max-w-3xl mx-auto">
            Ofrecemos servicios especializados en diseño, desarrollo e integración de sistemas 
            automatizados para optimizar sus procesos industriales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 hover:-translate-y-2 transition-smooth overflow-hidden"
              style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}
            >
              {/* Top Border on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 gradient-brand-red scale-x-0 group-hover:scale-x-100 transition-smooth origin-left"></div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-full gradient-brand-red flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-smooth">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-brand-charcoal mb-3 group-hover:text-brand-red transition-smooth">
                {service.title}
              </h3>
              <p className="text-brand-medium-gray leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Link */}
              <Link 
                href={service.href}
                className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm group-hover:gap-3 transition-smooth"
              >
                Conocer más
                <span className="text-lg">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}