import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, localizedUrl, ogLocale, ogAlternateLocales } from "@root/lib/seo";
import { yearsOfExperience } from "@root/lib/company";
import Header from "@/_shared/header/Header";
import Hero from "./_components/Hero";
import SolutionsPreview from "./_components/Solutions";
import AboutPreview from "./_components/About";
import Slogan from "./_components/Slogan";
import Metrics from "./_components/Metrics";
import Brands from "./_components/Brands";
import GlobalPresence from "./_components/Globalpresence";
import Contact from "./_components/Contact";
import Footer from "@/_shared/footer/Footer";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return {
    title: t("meta_title"),
    description: t("meta_desc", { years: yearsOfExperience() }),
    alternates: buildAlternates(locale, ""),
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: localizedUrl(locale, ""),
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
    },
  };
}

export default async function Home({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SolutionsPreview />
      <AboutPreview />
      <Slogan />
      <GlobalPresence />
      <Brands />
      <Contact />
      <Metrics />
      <Footer />
    </main>
  );
}
