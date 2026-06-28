// app/[locale]/(soluciones)/soluciones/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@root/i18n/routing";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import SolutionCta from "@/_shared/ui/SolutionCta";
import SolutionToc from "@/_shared/ui/SolutionToc";
import { solutions, getSolution, getSolutions, getSolutionLabels } from "../_data/solutions";
import { buildAlternates, localizedUrl, absoluteUrl, ogLocale, ogAlternateLocales } from "@root/lib/seo";

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
    alternates: buildAlternates(locale, path),
    openGraph: {
      type: "article",
      title: `${solution.title} | STEIGERN`,
      description: solution.desc,
      url: localizedUrl(locale, path),
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      images: [{ url: absoluteUrl(solution.img), alt: solution.title }],
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
  const tocItems = [
    ...solution.sections.map((sec, i) => ({ id: `seccion-${i}`, label: sec.heading })),
    { id: "beneficios", label: l.benefits },
    { id: "aplicaciones", label: l.applications },
    { id: "faq", label: l.faq },
  ];
  const url = localizedUrl(locale, `/soluciones/${solution.slug}`);

  // ── SEO: Article + FAQ + Breadcrumb structured data ──
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: solution.title,
    description: solution.desc,
    image: absoluteUrl(solution.img),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "STEIGERN Design In Motion" },
    publisher: { "@id": "https://steigern.com.mx/#organization" },
    about: solution.tags,
    inLanguage: locale,
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
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: l.home, item: localizedUrl(locale, "") },
      { "@type": "ListItem", position: 2, name: l.solutions, item: localizedUrl(locale, "/soluciones") },
      { "@type": "ListItem", position: 3, name: solution.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <Header />

      {/* Hero */}
      <section className="relative w-full min-h-[30vh] lg:min-h-[55vh] flex items-end overflow-hidden bg-zinc-50">
        <div className="absolute inset-0">
          <Image src={solution.img} alt={solution.title} fill className="object-cover opacity-20" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-10 lg:pb-16 pt-20 lg:pt-36">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-zinc-500 hover:text-zinc-800 text-[9px] tracking-[0.08em] uppercase transition-colors">{l.home}</Link>
            <span className="text-zinc-400 text-[9px]">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-800 text-[9px] tracking-[0.08em] uppercase transition-colors">{l.solutions}</Link>
            <span className="text-zinc-400 text-[9px]">/</span>
            <span className="text-[#E02020] text-[9px] tracking-[0.08em] uppercase">{solution.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">{l.industrial}</span>
          </div>
          <h1 className="heading heading-xl text-zinc-900 uppercase max-w-3xl">
            {solution.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-1.5 mt-5">
            {solution.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-300 text-zinc-600 bg-white/60">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Artículo */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
            <article>
              {/* Lead */}
              <p className="text-zinc-800 text-base lg:text-lg leading-relaxed font-medium italic mb-12">
                {solution.excerpt}
              </p>

              {/* Secciones */}
              <div className="flex flex-col gap-12">
                {solution.sections.map((sec, i) => (
                  <div key={i} id={`seccion-${i}`} className="scroll-mt-24">
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
              <div id="beneficios" className="mt-16 scroll-mt-24">
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
              <div id="aplicaciones" className="mt-16 scroll-mt-24">
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
              <div id="faq" className="mt-16 scroll-mt-24">
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

            <SolutionToc
              title={l.tocTitle}
              items={tocItems}
            />
          </div>
        </div>
      </section>

      {/* Cierre — Lo hace STEIGERN (componente global reutilizable) */}
      <SolutionCta
        eyebrow={l.ctaEyebrow}
        title={l.ctaTitle}
        text={l.ctaText}
        buttonLabel={l.ctaButton}
      />

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
