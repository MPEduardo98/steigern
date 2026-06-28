// app/_shared/ui/SolutionCta.tsx
// Banner de llamada a la acción reutilizable para las páginas de soluciones.
// Usa el Link de next-intl para conservar el prefijo de idioma (/en, /de).
import { Link } from "@root/i18n/navigation";

type SolutionCtaProps = {
  eyebrow: string;
  title: string;
  text: string;
  buttonLabel: string;
  href?: string;
};

export default function SolutionCta({
  eyebrow,
  title,
  text,
  buttonLabel,
  href = "/contacto",
}: SolutionCtaProps) {
  return (
    <section className="w-full py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                {eyebrow}
              </span>
            </div>
            <h2 className="heading heading-lg text-zinc-900 uppercase">{title}</h2>
            <p className="text-zinc-500 text-base leading-relaxed mt-4">{text}</p>
          </div>
          <Link
            href={href}
            className="shrink-0 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200"
          >
            {buttonLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
