// app/[locale]/(soluciones)/soluciones/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import { getSolutions, getSolutionLabels, localizedUrl, hreflangAlternates } from "./_data/solutions";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const l = getSolutionLabels(locale);
  const path = "/soluciones";
  return {
    title: l.metaTitle,
    description: l.metaDesc,
    alternates: {
      canonical: localizedUrl(locale, path),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      title: `${l.metaTitle} | STEIGERN`,
      description: l.metaDesc,
      url: localizedUrl(locale, path),
    },
  };
}

export default async function SolucionesPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = getSolutionLabels(locale);
  const solutions = getSolutions(locale).slice(0, 6);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative w-full min-h-[55vh] flex items-end overflow-hidden bg-zinc-50">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/perfil.png" alt="Soluciones STEIGERN" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-800 text-xs tracking-[0.1em] uppercase transition-colors">{l.home}</Link>
            <span className="text-zinc-400 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">{l.solutions}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{l.industrial}</span>
          </div>
          <h1 className="heading heading-xl text-zinc-900 uppercase max-w-3xl">
            {l.heroLine1}<br /><span className="text-[#E02020]">{l.heroLine2}</span>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full py-16 bg-white border-b border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <p className="text-zinc-500 text-base leading-relaxed">{l.intro1}</p>
            <p className="text-zinc-500 text-base leading-relaxed">{l.intro2}</p>
          </div>
        </div>
      </section>

      {/* Solutions grid */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {solutions.map((s) => (
              <Link key={s.slug} href={`/soluciones/${s.slug}`}
                className="bg-white group hover:bg-zinc-50 transition-colors duration-300 flex flex-col">
                <div className="overflow-hidden bg-zinc-100 aspect-[4/3]">
                  <Image src={s.img} alt={s.title} width={600} height={450} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                    <div className="w-5 h-px bg-zinc-200 group-hover:bg-[#E02020] transition-colors duration-300 mt-2" />
                  </div>
                  <h2 className="heading heading-sm text-zinc-900 uppercase mb-2">{s.title}</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-200 text-zinc-400">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{l.ctaEyebrow}</span>
            </div>
            <h2 className="heading heading-lg text-zinc-900 uppercase">{l.notFoundTitle}</h2>
            <p className="text-zinc-500 text-base leading-relaxed mt-4">{l.notFoundText}</p>
          </div>
          <Link href="/contacto"
            className="shrink-0 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200">
            {l.ctaButton}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
