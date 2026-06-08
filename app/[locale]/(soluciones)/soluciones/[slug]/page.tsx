// app/[locale]/(soluciones)/soluciones/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import Contact from "../../../(homepage)/_components/Contact";
import { solutions, getSolution } from "../_data/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: "Solución no encontrada" };

  return {
    title: solution.title,
    description: solution.desc,
    alternates: { canonical: `https://steigern.com.mx/soluciones/${solution.slug}` },
    openGraph: {
      title: `${solution.title} | STEIGERN`,
      description: solution.desc,
      url: `https://steigern.com.mx/soluciones/${solution.slug}`,
      images: [{ url: solution.img }],
    },
  };
}

export default async function SolucionDetallePage({ params }: Params) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const others = solutions.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative w-full min-h-[55vh] flex items-end overflow-hidden bg-zinc-900">
        <div className="absolute inset-0">
          <Image src={solution.img} alt={solution.title} fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020] z-10" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-20 pb-16 pt-36">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Inicio</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <Link href="/soluciones" className="text-zinc-500 hover:text-zinc-300 text-xs tracking-[0.1em] uppercase transition-colors">Soluciones</Link>
            <span className="text-zinc-600 text-xs">/</span>
            <span className="text-[#E02020] text-xs tracking-[0.1em] uppercase">{solution.title}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#E02020] text-xs font-bold tracking-[0.2em]">{solution.num}</span>
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Ingeniería Industrial</span>
          </div>
          <h1 className="text-white font-black text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
            {solution.title}
          </h1>
        </div>
      </section>

      {/* Contenido */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
            <div className="flex flex-col gap-6">
              {solution.body.map((p, i) => (
                <p key={i} className="text-zinc-600 text-base leading-relaxed">{p}</p>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 border border-zinc-200 p-7">
              <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-4">Características</p>
              <div className="flex flex-wrap gap-1.5 mb-7">
                {solution.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 border border-zinc-200 text-zinc-500">{tag}</span>
                ))}
              </div>
              <Link href="/contacto"
                className="w-full inline-flex items-center justify-center text-xs font-bold tracking-[0.15em] uppercase px-7 py-3.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors duration-200">
                Solicitar información
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* Otras soluciones */}
      <section className="w-full py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Otras Soluciones</span>
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
                  <h2 className="text-zinc-900 font-black text-base uppercase tracking-[-0.02em] mt-2"
                    style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>{s.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
