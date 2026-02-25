export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100 border-t border-zinc-200 py-12">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[#E02020] text-xl"
                style={{
                  fontFamily: "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 300,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                STEIGERN
              </span>
              <span className="w-1 h-1 rounded-full bg-[#E02020]" />
            </div>
            <p className="text-zinc-500 text-xs tracking-[0.08em]">
              We Enjoy Making Machines
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {[
              { label: "Soluciones", href: "#solutions" },
              { label: "Industrias", href: "#industries" },
              { label: "Nosotros", href: "#about" },
              { label: "Carreras", href: "#" },
              { label: "Privacidad", href: "#" },
              { label: "Legal", href: "#" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-zinc-400 hover:text-zinc-700 text-xs tracking-[0.1em] uppercase transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-zinc-400 text-xs">
            © {new Date().getFullYear()} Steigern GmbH. Todos los derechos reservados.
          </p>
          <p className="text-zinc-400 text-xs">
            Parkring 10, 85748 Garching bei München, Alemania
          </p>
        </div>
      </div>
    </footer>
  );
}