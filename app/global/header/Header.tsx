import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-light-gray transition-smooth">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="text-2xl font-bold text-brand-charcoal tracking-wider group-hover:text-brand-red transition-smooth">
              STEIGERN
            </span>
            <span className="text-xs text-brand-red font-medium tracking-[0.15em] uppercase">
              design in motion
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-smooth relative group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-smooth"></span>
            </Link>
            <Link 
              href="/servicios" 
              className="text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-smooth relative group"
            >
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-smooth"></span>
            </Link>
            <Link 
              href="/proyectos" 
              className="text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-smooth relative group"
            >
              Proyectos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-smooth"></span>
            </Link>
            <Link 
              href="/nosotros" 
              className="text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-smooth relative group"
            >
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-smooth"></span>
            </Link>
            <Link 
              href="/contacto" 
              className="text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-smooth relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red group-hover:w-full transition-smooth"></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/contacto"
            className="hidden lg:inline-flex items-center px-6 py-2.5 gradient-brand-red text-white text-sm font-semibold rounded-full shadow-brand hover:shadow-brand-lg hover:-translate-y-0.5 transition-smooth"
          >
            Cotizar Proyecto
          </Link>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-brand-dark-gray hover:text-brand-red transition-smooth">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}