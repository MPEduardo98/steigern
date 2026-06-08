// app/_shared/footer/Footer.tsx
import Link from "next/link";
import Image from "next/image";

const soluciones = [
  { label: "Perfil Estructural de Aluminio", href: "/soluciones/perfil-de-aluminio" },
  { label: "Sistemas de Transporte", href: "/soluciones/conveyors" },
  { label: "Estaciones de Trabajo", href: "/soluciones/estaciones-de-trabajo" },
  { label: "Co-Bots", href: "/soluciones/dispositivos-asistidos-por-cobots" },
  { label: "Elevación y Guías Lineales", href: "/soluciones/elevacion-y-guias-lineales" },
  { label: "Soluciones Lean", href: "/soluciones/soluciones-lean" },
];

const empresa = [
  { label: "Inicio", href: "/" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const contacto = [
  {
    label: "+52 (222) 5 82 92 54",
    href: "tel:+522225829254",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 0117.88 2 2 2 0 0120 4.18v3a2 2 0 01-1.45 1.94l-1.2.38a16 16 0 006.82 6.82l.38-1.2A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: "customerservice@steigern.com.mx",
    href: "mailto:customerservice@steigern.com.mx",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: "Puebla, México",
    href: "https://maps.google.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      {/* Accent top bar */}
      <div className="h-px bg-brand w-full" />

      {/* Main grid */}
      <div className="max-w-screen-xl mx-auto px-8 lg:px-20 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Brand col â€” 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            <div>
              <Image
                src="/assets/images/logos/steigern.webp"
                alt="STEIGERN"
                width={160}
                height={54}
                className="h-12 w-auto object-contain"
                style={{ filter: "brightness(0) saturate(0) invert(1)" }}
              />
            </div>

            {/* Social */}
            <div className="flex gap-2">
              <a href="https://www.youtube.com/@steigern" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-brand hover:text-brand transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/steigern" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-brand hover:text-brand transition-colors duration-200">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@steigern" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-brand hover:text-brand transition-colors duration-200">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/steigern" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-brand hover:text-brand transition-colors duration-200">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Soluciones â€” 3 cols */}
          <div className="lg:col-span-3">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-brand flex-shrink-0" />
              Soluciones
            </p>
            <ul className="flex flex-col gap-3">
              {soluciones.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-zinc-300 hover:text-white text-sm transition-colors duration-200 leading-snug block"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa â€” 2 cols */}
          <div className="lg:col-span-2">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-brand flex-shrink-0" />
              Empresa
            </p>
            <ul className="flex flex-col gap-3">
              {empresa.map((e) => (
                <li key={e.label}>
                  <Link
                    href={e.href}
                    className="text-zinc-300 hover:text-white text-sm transition-colors duration-200"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto â€” 3 cols */}
          <div className="lg:col-span-3">
            <p className="text-zinc-400 text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-brand flex-shrink-0" />
              Contacto
            </p>
            <ul className="flex flex-col gap-4">
              {contacto.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3 text-zinc-300 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="mt-0.5 text-zinc-500 group-hover:text-brand transition-colors duration-200 flex-shrink-0">
                      {c.icon}
                    </span>
                    <span className="text-sm leading-snug">{c.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href="/contacto"
              className="mt-8 inline-flex items-center gap-2 bg-brand text-white text-xs font-bold tracking-widest uppercase px-5 py-3 hover:bg-brand-dark transition-colors duration-200"
            >
              Solicitar cotización
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-20 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-zinc-500 text-xs">
            Â© {new Date().getFullYear()} STEIGERN Design In Motion S.A de C.V. â€” <span className="text-zinc-600 italic">We enjoy making machines.</span>
          </p>
          <p className="text-zinc-500 text-xs">
            Diseñado por{" "}
            <a
              href="https://www.instagram.com/eduardo_martinez66"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-brand transition-colors duration-200"
            >
              MPEduardo
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}

