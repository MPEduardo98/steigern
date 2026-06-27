import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, localizedUrl, ogLocale, ogAlternateLocales } from "@root/lib/seo";
import { yearsOfExperience } from "@root/lib/company";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import Contact from "../../(homepage)/_components/Contact";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Nosotros" });
  const path = "/nosotros";
  return {
    title: t("meta_title"),
    description: t("meta_desc", { years: yearsOfExperience() }),
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: `${t("meta_title")} | STEIGERN`,
      description: t("meta_desc"),
      url: localizedUrl(locale, path),
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
    },
  };
}

export default async function NosotrosPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Nosotros" });
  const years = yearsOfExperience();

  const values = t.raw("values") as string[];
  const milestones = t.raw("milestones") as string[];
  const pillars = [
    { title: t("mision_title"), desc: t("mision_desc") },
    { title: t("vision_title"), desc: t("vision_desc") },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative w-full pt-40 pb-24 bg-zinc-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020]" />
        <div className="absolute top-0 left-0 w-full h-px bg-zinc-200" />
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{t("eyebrow")}</span>
          </div>
          <h1 className="heading heading-hero text-zinc-900 uppercase max-w-3xl mb-6">
            {t("title_line1")}
            <br />
            <span className="text-[#E02020]">{t("title_line2")}</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
            {t("hero_desc", { years })}
          </p>
        </div>
      </section>

      {/* Text + Image */}
      <section id="quienes-somos" className="w-full py-24 bg-white scroll-mt-16">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200">
            <div className="bg-white p-10 flex flex-col justify-center">
              <div className="w-8 h-1 bg-[#E02020] mb-6" />
              <p className="text-zinc-500 text-base leading-relaxed mb-5">
                {t("intro1_pre")}
                <span className="text-zinc-800 font-semibold">{t("intro1_hl")}</span>
                {t("intro1_post")}
              </p>
              <p className="text-zinc-500 text-base leading-relaxed mb-5">
                {t("intro2_pre")}
                <span className="text-zinc-800 font-semibold">{t("intro2_hl")}</span>
                {t("intro2_post")}
              </p>
              <p className="text-zinc-500 text-base leading-relaxed">
                {t("intro3_pre")}
                <span className="text-zinc-800 font-semibold">{t("intro3_hl", { years })}</span>
                {t("intro3_post")}
              </p>
            </div>
            <div className="bg-white overflow-hidden min-h-[400px]">
              <img
                src="/assets/images/corporativo.webp"
                alt="STEIGERN Corporativo Querétaro"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión + Visión */}
      <section id="mision-vision" className="w-full py-24 bg-zinc-50 scroll-mt-16">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{t("philosophy")}</span>
            </div>
            <h2 className="heading heading-lg text-zinc-900 uppercase">
              {t("mv_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white p-10">
                <div className="w-8 h-1 bg-[#E02020] mb-6" />
                <h3 className="heading heading-md text-zinc-900 uppercase mb-5">
                  {p.title}
                </h3>
                <p className="text-zinc-500 text-base leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section id="valores" className="w-full py-24 bg-white scroll-mt-16">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">{t("values_eyebrow")}</span>
              </div>
              <h2 className="heading heading-lg text-zinc-900 uppercase mb-6">
                {t("values_title")}
              </h2>
              <p className="text-zinc-500 text-base leading-relaxed mb-10">
                {t("values_desc")}
              </p>
              <div className="flex flex-wrap gap-3">
                {values.map((v) => (
                  <span
                    key={v}
                    className="text-xs font-black tracking-[0.15em] uppercase px-5 py-2.5 border-2 border-[#E02020] text-[#E02020]"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-px bg-zinc-200">
              {milestones.map((text, i) => (
                <div key={i} className="bg-zinc-50 p-8 flex gap-6 items-start">
                  <span className="text-[#E02020] text-xs font-black tracking-[0.2em] shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-zinc-500 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
