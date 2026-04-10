// app/global/footer/Footer.tsx

"use client";

import { useTheme } from "../../components/ThemeProvider";

const soluciones = [
  { label: "Perfil Estructural de Aluminio", href: "/soluciones/perfil-estructural-de-aluminio" },
  { label: "Sistemas de Transporte", href: "/soluciones/conveyors" },
  { label: "Estaciones de Trabajo", href: "/soluciones/estaciones-de-trabajo" },
  { label: "Dispositivos Asistidos por Co-Bots", href: "/soluciones/dispositivos-asistidos-por-cobots" },
  { label: "Elevación y Guías Lineales", href: "/soluciones/elevacion-y-guias-lineales" },
  { label: "Soluciones Lean", href: "/soluciones/soluciones-lean" },
];

const empresa = [
  { label: "Nosotros", href: "/#about" },
  { label: "Industrias", href: "/#industries" },
  { label: "Contacto", href: "/contacto" },
  { label: "Portal de Proveedores", href: "/portal-proveedores" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/STEIGERNDesignInMotion/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/steigern-design-in-motion",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC6WgB-G4e6nSdRpwIOTJULg",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#000" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { theme, toggle } = useTheme();

  return (
    <footer className="w-full bg-black">

      {/* Main columns */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-6">
            <a href="/" className="block w-fit">
              <span
                className="text-white text-3xl leading-none"
                style={{
                  fontFamily: "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                STEIGERN
              </span>
            </a>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:border-[#E02020] hover:text-white hover:bg-[#E02020] transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-800">
              <a href="tel:+522225829254" className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs tracking-[0.04em] transition-colors duration-200 group">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#E02020] transition-colors shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +52 (222) 5 82 92 54
              </a>
              <a href="mailto:customerservice@steigern.com.mx" className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs tracking-[0.04em] transition-colors duration-200 group">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#E02020] transition-colors shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                customerservice@steigern.com.mx
              </a>
            </div>
          </div>

          {/* Col 2: Soluciones */}
          <div>
            <p className="text-white text-xs font-black tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#E02020]" />
              Soluciones
            </p>
            <ul className="flex flex-col gap-3">
              {soluciones.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Empresa */}
          <div>
            <p className="text-white text-xs font-black tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#E02020]" />
              Empresa
            </p>
            <ul className="flex flex-col gap-3">
              {empresa.map((e) => (
                <li key={e.label}>
                  <a href={e.href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                    {e.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Horario */}
          <div>
            <p className="text-white text-xs font-black tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#E02020]" />
              Horario
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.12em] mb-0.5">Lunes – Viernes</p>
                <p className="text-zinc-200 text-sm font-semibold">8:00 am – 6:00 pm</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.12em] mb-0.5">Sábado</p>
                <p className="text-zinc-200 text-sm font-semibold">9:00 am – 2:00 pm</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-zinc-600 text-xs">
            © 2025 STEIGERN Design In Motion S.A de C.V.
          </p>
          <p className="text-zinc-600 text-xs">
            Diseñado por{" "}
            <a
              href="https://www.instagram.com/eduardo_martinez66"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-[#E02020] transition-colors duration-200"
            >
              MPEduardo
            </a>
          </p>
          <button
            onClick={toggle}
            aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
            className="flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] uppercase text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
          >
            <span className="relative w-11 h-6 rounded-full border border-zinc-700 bg-zinc-900 shrink-0">
              <span className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${theme === "dark" ? "left-[calc(100%-1.375rem)] bg-[#E02020]" : "left-0.5 bg-zinc-700"}`}>
                {theme === "dark" ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </span>
            </span>
            <span>{theme === "light" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

    </footer>
  );
}