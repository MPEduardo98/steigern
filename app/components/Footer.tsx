"use client";

import { useTheme } from "./ThemeProvider";

const services = [
  { label: "Desarrollo de Proyectos", href: "/soluciones/desarrollo-de-proyectos" },
  { label: "Perfil Estructural de Aluminio", href: "/soluciones/perfil-de-aluminio" },
  { label: "Transportadores", href: "/soluciones/conveyors" },
  { label: "Estaciones de Trabajo", href: "/soluciones/estaciones-de-trabajo" },
  { label: "Elevación y Guías Lineales", href: "/soluciones/elevacion-y-guias-lineales" },
  { label: "Dispositivos Asistidos por Co-Bots", href: "/soluciones/dispositivos-asistidos-por-cobots" },
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
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC6WgB-G4e6nSdRpwIOTJULg",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#09090b" />
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
];

export default function Footer() {
  const { theme, toggle } = useTheme();

  return (
    <footer className="w-full bg-zinc-950">

      {/* CTA Banner */}
      <div className="border-b border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                  Contáctanos
                </span>
              </div>
              <h2
                className="text-white font-black text-[clamp(2rem,4vw,3.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-6"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                ¿Interesado?
                <br />
                <span className="text-[#E02020]">Contáctanos</span>
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                No importa qué tan complejo sea tu proyecto, en STEIGERN nos apasiona
                encontrar la solución perfecta para ti. Escríbenos y comencemos a
                diseñar juntos el futuro de tu industria.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 text-xs font-bold tracking-[0.15em] uppercase px-10 py-4 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200 self-start lg:self-center"
            >
              Comenzar
            </a>
          </div>
        </div>
      </div>

      {/* Main footer columns */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

          {/* Col 1: Services */}
          <div>
            <h4 className="text-zinc-200 text-xs font-black tracking-[0.2em] uppercase mb-6">
              Nuestros Servicios
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-zinc-500 hover:text-zinc-200 text-sm tracking-[0.04em] transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Hours + Social */}
          <div>
            <h4 className="text-zinc-200 text-xs font-black tracking-[0.2em] uppercase mb-6">
              Horario de Atención
            </h4>
            <div className="flex flex-col gap-1 mb-10">
              <p className="text-zinc-500 text-sm">Lun – Vie: 8am – 6pm</p>
              <p className="text-zinc-500 text-sm">Sáb: 9am – 2pm</p>
            </div>

            <h4 className="text-zinc-200 text-xs font-black tracking-[0.2em] uppercase mb-5">
              Síguenos en Redes
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center bg-zinc-800 hover:bg-[#E02020] text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Contact + Logo */}
          <div>
            <h4 className="text-zinc-200 text-xs font-black tracking-[0.2em] uppercase mb-6">
              Contacto
            </h4>
            <a
              href="mailto:customerservice@steigern.com.mx"
              className="text-zinc-500 hover:text-zinc-200 text-sm transition-colors duration-200 break-all"
            >
              customerservice@steigern.com.mx
            </a>

            {/* Logo */}
            <div className="mt-10">
              <img
                src="/assets/images/logos/Logo_White.webp"
                alt="STEIGERN"
                className="h-10 w-auto object-contain opacity-70"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Left: designed by */}
          <p className="text-zinc-600 text-xs">
            Designed by{" "}
            <a
              href="https://www.instagram.com/eduardo_martinez66"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-[#E02020] transition-colors duration-200"
            >
              MPEduardo
            </a>
          </p>

          {/* Center: copyright */}
          <p className="text-zinc-600 text-xs text-center">
            © 2025 by STEIGERN Design In Motion S.A de C.V
          </p>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
            className="flex items-center gap-2.5 text-xs font-bold tracking-[0.12em] uppercase text-zinc-600 hover:text-zinc-200 transition-colors duration-200"
          >
            <span className="relative w-11 h-6 rounded-full border border-zinc-700 bg-zinc-800 shrink-0">
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  theme === "dark"
                    ? "left-[calc(100%-1.375rem)] bg-[#E02020]"
                    : "left-0.5 bg-zinc-600"
                }`}
              >
                {theme === "dark" ? (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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