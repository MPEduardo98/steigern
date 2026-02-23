import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-light-gray">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex flex-col mb-4">
              <h3 className="text-2xl font-bold text-white mb-1">STEIGERN</h3>
              <span className="text-xs text-brand-red font-medium tracking-[0.15em] uppercase">
                design in motion
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Líderes en automatización industrial. Transformamos la manufactura con soluciones innovadoras y tecnología de punta.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-smooth"
                aria-label="LinkedIn"
              >
                <span className="text-sm font-semibold">in</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-smooth"
                aria-label="Facebook"
              >
                <span className="text-sm font-semibold">f</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-smooth"
                aria-label="Twitter"
              >
                <span className="text-sm font-semibold">𝕏</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-smooth"
                aria-label="YouTube"
              >
                <span className="text-sm font-semibold">▶</span>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/servicios/conveyor" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Sistemas de Conveyor
                </Link>
              </li>
              <li>
                <Link href="/servicios/automatizacion" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Automatización
                </Link>
              </li>
              <li>
                <Link href="/servicios/integracion" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Integración
                </Link>
              </li>
              <li>
                <Link href="/servicios/mantenimiento" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Mantenimiento
                </Link>
              </li>
              <li>
                <Link href="/servicios/consultoria" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Consultoría
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Compañía</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/nosotros" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/equipo" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Equipo
                </Link>
              </li>
              <li>
                <Link href="/carreras" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-brand-red hover:pl-1 transition-smooth">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white text-base font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="mailto:info@steigern.com" 
                  className="text-sm hover:text-brand-red hover:pl-1 transition-smooth"
                >
                  info@steigern.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+522222222222" 
                  className="text-sm hover:text-brand-red hover:pl-1 transition-smooth"
                >
                  +52 (222) 222-2222
                </a>
              </li>
              <li className="text-sm">
                Puebla, México
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} STEIGERN. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-sm hover:text-brand-red transition-smooth">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-sm hover:text-brand-red transition-smooth">
              Términos de Servicio
            </Link>
            <Link href="/cookies" className="text-sm hover:text-brand-red transition-smooth">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}