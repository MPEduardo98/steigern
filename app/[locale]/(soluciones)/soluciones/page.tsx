// app/[locale]/(soluciones)/soluciones/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import SolutionCta from "@/_shared/ui/SolutionCta";
import { getSolutions, getSolutionLabels } from "./_data/solutions";
import { buildAlternates, localizedUrl, ogLocale, ogAlternateLocales, SITE_NAME, ogImages, twitterMeta } from "@root/lib/seo";
import { withYears } from "@root/lib/company";
import { routing } from "@root/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const l = getSolutionLabels(locale);
  const path = "/soluciones";
  return {
    title: l.metaTitle,
    description: l.metaDesc,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: `${l.metaTitle} | STEIGERN`,
      description: l.metaDesc,
      url: localizedUrl(locale, path),
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      siteName: SITE_NAME,
      images: ogImages(l.metaTitle),
    },
    twitter: twitterMeta(l.metaTitle, l.metaDesc),
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
      <section className="relative w-full min-h-[30vh] lg:min-h-[55vh] flex items-end overflow-hidden bg-zinc-50">
        <div className="absolute inset-0">
          <Image src="/assets/images/soluciones/perfil.png" alt="Soluciones STEIGERN" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-10 lg:pb-16 pt-20 lg:pt-36">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-800 text-[9px] tracking-[0.08em] uppercase transition-colors">{l.home}</Link>
            <span className="text-zinc-400 text-[9px]">/</span>
            <span className="text-[#E02020] text-[9px] tracking-[0.08em] uppercase">{l.solutions}</span>
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
            <p className="text-zinc-500 text-base leading-relaxed">{withYears(l.intro2)}</p>
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

      {/* CTA (componente global reutilizable) */}
      <SolutionCta
        eyebrow={l.ctaEyebrow}
        title={l.notFoundTitle}
        text={l.notFoundText}
        buttonLabel={l.ctaButton}
      />

      <Footer />
    </main>
  );
}
