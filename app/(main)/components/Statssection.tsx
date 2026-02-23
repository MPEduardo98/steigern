const stats = [
  {
    number: "250+",
    label: "Proyectos Completados"
  },
  {
    number: "15+",
    label: "Años de Experiencia"
  },
  {
    number: "98%",
    label: "Satisfacción del Cliente"
  },
  {
    number: "50+",
    label: "Ingenieros Especializados"
  }
];

export function StatsSection() {
  return (
    <section className="relative py-20 gradient-dark overflow-hidden">
      {/* Decorative Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E31E24' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-brand-red mb-2">
                {stat.number}
              </div>
              <div className="text-base lg:text-lg text-brand-light-gray font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}