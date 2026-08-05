// app/[locale]/(contacto)/contacto/page.tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates, localizedUrl, ogLocale, ogAlternateLocales, SITE_NAME, ogImages, twitterMeta } from "@root/lib/seo";
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import ContactoContent from "./_components/ContactoContent";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contacto" });
  const path = "/contacto";
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

export default async function ContactoPage({ params }: Params) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <ContactoContent />
      <Footer />
    </main>
  );
}
