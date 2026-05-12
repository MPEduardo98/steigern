// app/global/footer/Footer.tsx
"use client";

import Link from "next/link";

const empresa = [
  { label: "Inicio", href: "/" },
  { label: "Soluciones", href: "/soluciones" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const soluciones = [
  { label: "Perfil Estructural de Aluminio", href: "/soluciones/perfil-de-aluminio" },
  { label: "Sistemas de Transporte", href: "/soluciones/conveyors" },
  { label: "Estaciones de Trabajo", href: "/soluciones/estaciones-de-trabajo" },
  { label: "Co-Bots", href: "/soluciones/dispositivos-asistidos-por-cobots" },
  { label: "Elevación y Guías Lineales", href: "/soluciones/elevacion-y-guias-lineales" },
  { label: "Soluciones Lean", href: "/soluciones/lean" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <span
              className="text-[#E02020] text-xl leading-none block mb-5"
              style={{
                fontFamily: "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              STEIGERN
            </span>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-[200px]">
              Ingeniería industrial de precisión. Automatizando procesos, impulsamos el futuro.
            </p>
            <div className="flex gap-2.5">
              <a href="https://www.linkedin.com/company/steigern" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-[#E02020] hover:text-[#E02020] transition-colors duration-200">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/steigern_mx" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-8 h-8 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:border-[#E02020] hover:text-[#E02020] transition-colors duration-200">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Soluciones */}
          <div>
            <p className="text-white text-xs font-black tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
              <span className="w-3 h-px bg-[#E02020]" />
              Soluciones
            </p>
            <ul className="flex flex-col gap-2.5">
              {soluciones.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Empresa */}
          <div>
            <p className="text-white text-xs font-black tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
              <span className="w-3 h-px bg-[#E02020]" />
              Empresa
            </p>
            <ul className="flex flex-col gap-2.5">
              {empresa.map((e) => (
                <li key={e.label}>
                  <Link href={e.href} className="text-zinc-400 hover:text-white text-sm transition-colors duration-200">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Horario */}
          <div>
            <p className="text-white text-xs font-black tracking-[0.18em] uppercase mb-5 flex items-center gap-2">
              <span className="w-3 h-px bg-[#E02020]" />
              Horario
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.1em] mb-0.5">Lunes – Viernes</p>
                <p className="text-zinc-200 text-sm font-semibold">8:00 am – 6:00 pm</p>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.1em] mb-0.5">Sábado</p>
                <p className="text-zinc-200 text-sm font-semibold">9:00 am – 2:00 pm</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-zinc-600 text-xs">© 2025 STEIGERN Design In Motion S.A de C.V.</p>
          <p className="text-zinc-600 text-xs">
            Diseñado por{" "}
            <a href="https://www.instagram.com/eduardo_martinez66" target="_blank" rel="noopener noreferrer"
              className="text-zinc-500 hover:text-[#E02020] transition-colors duration-200">
              MPEduardo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}