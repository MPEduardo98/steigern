// app/[locale]/(bolsa-de-trabajo)/bolsa-de-trabajo/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, localizedUrl, ogLocale, ogAlternateLocales, SITE_NAME, ogImages, twitterMeta } from "@root/lib/seo";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import BolsaContent from "./_components/BolsaContent";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Bolsa" });
  const path = "/bolsa-de-trabajo";
  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: `${t("meta_title")} | STEIGERN`,
      description: t("meta_desc"),
      url: localizedUrl(locale, path),
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      siteName: SITE_NAME,
      images: ogImages(t("meta_title")),
    },
    twitter: twitterMeta(t("meta_title"), t("meta_desc")),
  };
}

export default async function BolsaPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <BolsaContent />
      <Footer />
    </main>
  );
}
