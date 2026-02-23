import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-dark">
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(227, 30, 36, 0.3) 50px, rgba(227, 30, 36, 0.3) 51px),
            repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(227, 30, 36, 0.3) 50px, rgba(227, 30, 36, 0.3) 51px)
          `
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Automatización{" "}
              <span className="text-brand-red-light">Industrial</span>
              {" "}del Futuro
            </h1>
            <p className="text-xl lg:text-2xl text-brand-light-gray font-light italic">
              We enjoy making machines
            </p>
          </div>
          
          <p className="text-lg text-brand-light-gray leading-relaxed max-w-xl">
            Desarrollamos e integramos soluciones de automatización industrial de vanguardia. 
            Conveyors, estaciones de trabajo automatizadas y sistemas semi-automatizados diseñados 
            con precisión alemana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center px-8 py-4 gradient-brand-red text-white font-semibold rounded-full shadow-brand-lg hover:shadow-[0_12px_40px_rgba(227,30,36,0.4)] hover:-translate-y-1 transition-smooth"
            >
              Explorar Soluciones
            </Link>
            <Link
              href="/proyectos"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-brand-charcoal transition-smooth"
            >
              Ver Proyectos
            </Link>
          </div>
        </div>

        {/* Visual - Animated Gears */}
        <div className="relative h-[500px] hidden lg:flex items-center justify-center">
          <div className="relative w-full h-full animate-float">
            {/* Large Gear */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full gradient-brand-red flex items-center justify-center animate-spin-slow">
              <div className="w-44 h-44 rounded-full bg-brand-charcoal"></div>
            </div>
            
            {/* Small Gear */}
            <div className="absolute top-12 right-8 w-36 h-36 rounded-full gradient-brand-red flex items-center justify-center animate-spin-reverse">
              <div className="w-24 h-24 rounded-full bg-brand-charcoal"></div>
            </div>
            
            {/* Tiny Gear */}
            <div className="absolute bottom-24 left-12 w-24 h-24 rounded-full gradient-brand-red flex items-center justify-center animate-spin-slow">
              <div className="w-16 h-16 rounded-full bg-brand-charcoal"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}