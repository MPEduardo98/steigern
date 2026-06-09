// app/[locale]/(soluciones)/soluciones/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@root/i18n/routing";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import { solutions, getSolution, getSolutions, getSolutionLabels, localizedUrl, hreflangAlternates } from "../_data/solutions";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    solutions.map((s) => ({ locale, slug: s.slug }))
  );
}

type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolution(locale, slug);
  if (!solution) return { title: "404" };

  const path = `/soluciones/${solution.slug}`;
  return {
    title: solution.title,
    description: solution.desc,
    keywords: solution.tags,
    alternates: {
      canonical: localizedUrl(locale, path),
      languages: hreflangAlternates(path),
    },
    openGraph: {
      type: "article",
      title: `${solution.title} | STEIGERN`,
      description: solution.desc,
      url: localizedUrl(locale, path),
      images: [{ url: solution.img }],
    },
  };
}

export default async function SolucionDetallePage({ params }: Params) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const solution = getSolution(locale, slug);
  if (!solution) notFound();

  const l = getSolutionLabels(locale);
  const others = getSolutions(locale).filter((s) => s.slug !== solution.slug).slice(0, 3);
  const url = `https://steigern.com.mx/soluciones/${solution.slug}`;

  // ── SEO: Article + FAQ structured data ──
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: solution.title,
    description: solution.desc,
    image: `https://steigern.com.mx${solution.img}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "STEIGERN Design In Motion" },
    publisher: { "@id": "https://steigern.com.mx/#organization" },
    about: solution.tags,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: solution.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Header />

      {/* Hero */}
      <section className="relative w-full min-h-[55vh] flex items-end overflow-hidden bg-zinc-50">
        <div className="absolute inset-0">
          <Image src={solution.img} alt={solution.title} fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-800 text-xs tracking-[0.1em] uppercase transition-colors">{l.home}</Link>
            <span className="text-zinc-400 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-800 text-xs tracking-[0.1em] uppercase transition-colors">{l.solutions}</Link>
            <span className="text-zinc-400 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">{solution.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{solution.num}</span>
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{l.industrial}</span>
            <span className="w-6 h-px bg-zinc-300" />
            <span className="text-zinc-400 text-xs tracking-[0.1em] uppercase">{solution.readingTime} {l.reading}</span>
          </div>
          <h1 className="heading heading-xl text-zinc-900 uppercase max-w-3xl">
            {solution.title}
          </h1>
        </div>
      </section>

      {/* Artículo */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">

            {/* Cuerpo del artículo */}
            <article className="max-w-3xl">
              {/* Lead */}
              <p className="text-zinc-800 text-xl leading-relaxed font-medium mb-12">
                {solution.excerpt}
              </p>

              {/* Secciones */}
              <div className="flex flex-col gap-12">
                {solution.sections.map((sec, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-5 h-1 bg-[#E02020]" />
                      <h2 className="heading heading-md text-zinc-900 uppercase">
                        {sec.heading}
                      </h2>
                    </div>
                    <div className="flex flex-col gap-4">
                      {sec.paragraphs.map((p, j) => (
                        <p key={j} className="text-zinc-600 text-base leading-relaxed">{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Beneficios */}
              <div className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-5 h-1 bg-[#E02020]" />
                  <h2 className="heading heading-md text-zinc-900 uppercase">
                    {l.benefits}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 border border-zinc-200">
                  {solution.benefits.map((b) => (
                    <div key={b.title} className="bg-white p-6">
                      <h3 className="text-zinc-900 font-bold text-sm uppercase tracking-[0.05em] mb-2">{b.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aplicaciones */}
              <div className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-5 h-1 bg-[#E02020]" />
                  <h2 className="heading heading-md text-zinc-900 uppercase">
                    {l.applications}
                  </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {solution.applications.map((a) => (
                    <li key={a} className="flex items-start gap-3 text-zinc-600 text-base">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-[#E02020] shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div className="mt-16">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-5 h-1 bg-[#E02020]" />
                  <h2 className="heading heading-md text-zinc-900 uppercase">
                    {l.faq}
                  </h2>
                </div>
                <div className="border-t border-zinc-200">
                  {solution.faqs.map((f) => (
                    <details key={f.q} className="group border-b border-zinc-200">
                      <summary className="flex items-center justify-between gap-4 cursor-pointer py-5 list-none">
                        <span className="text-zinc-900 font-semibold text-base">{f.q}</span>
                        <span className="text-[#E02020] text-xl leading-none shrink-0 transition-transform duration-200 group-open:rotate-45">+</span>
                      </summary>
                      <p className="text-zinc-600 text-base leading-relaxed pb-5 -mt-1">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </article>

            {/* Aside */}
            <aside className="lg:sticky lg:top-24 border border-zinc-200 p-7">
              <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-4">{l.features}</p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {solution.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-200 text-zinc-500">{tag}</span>
                ))}
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {l.asideText(solution.title)}
              </p>
              <Link href="/contacto"
                className="w-full inline-flex items-center justify-center text-xs font-bold tracking-[0.15em] uppercase px-7 py-3.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200">
                {l.asideButton}
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Cierre — Lo hace STEIGERN */}
      <section className="w-full py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{l.ctaEyebrow}</span>
              </div>
              <h2 className="heading heading-lg text-zinc-900 uppercase">
                {l.ctaTitle}
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed mt-4">
                {l.ctaText}
              </p>
            </div>
            <Link href="/contacto"
              className="shrink-0 inline-flex items-center justify-center gap-2 text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200">
              {l.ctaButton}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Otras soluciones */}
      <section className="w-full py-16 bg-white border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{l.otherSolutions}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-200">
            {others.map((s) => (
              <Link key={s.slug} href={`/soluciones/${s.slug}`}
                className="bg-white group hover:bg-zinc-50 transition-colors duration-300 flex flex-col">
                <div className="overflow-hidden bg-zinc-100 aspect-[4/3]">
                  <Image src={s.img} alt={s.title} width={600} height={450} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7">
                  <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{s.num}</span>
                  <h2 className="heading heading-sm text-zinc-900 uppercase mt-2">{s.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
