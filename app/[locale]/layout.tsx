import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import JsonLd from "../_shared/seo/JsonLd";
import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const bankGothic = localFont({
  src: "../../public/fonts/BankGothicBT-Light.woff2",
  variable: "--font-bankgothic",
  weight: "300",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://steigern.com.mx"),
  title: {
    default: "STEIGERN | Automatización Industrial y Soluciones de Ingeniería en México",
    template: "%s | STEIGERN",
  },
  description:
    "STEIGERN diseña e integra soluciones de automatización industrial en México: perfiles de aluminio, conveyors, estaciones de trabajo, co-bots y más. 13 años de experiencia. Presencia global.",
  keywords: [
    "automatización industrial México",
    "sistemas de transporte industrial",
    "conveyors industriales",
    "perfil estructural de aluminio",
    "estaciones de trabajo ergonómicas",
    "dispositivos co-bots",
    "guías lineales industriales",
    "soluciones lean manufacturing",
    "ingeniería industrial Querétaro",
    "integración industrial",
    "STEIGERN",
  ],
  authors: [{ name: "STEIGERN Design In Motion", url: "https://steigern.com.mx" }],
  creator: "STEIGERN Design In Motion S.A de C.V",
  publisher: "STEIGERN Design In Motion S.A de C.V",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://steigern.com.mx",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://steigern.com.mx",
    siteName: "STEIGERN Design In Motion",
    title: "STEIGERN | Automatización Industrial y Soluciones de Ingeniería en México",
    description:
      "Soluciones de ingeniería de precisión y automatización industrial. Diseñamos e integramos sistemas para manufactura: conveyors, perfiles de aluminio, estaciones de trabajo, co-bots y más.",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "STEIGERN — Automatización Industrial en México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STEIGERN | Automatización Industrial en México",
    description:
      "Soluciones de ingeniería de precisión y automatización industrial. Conveyors, perfiles de aluminio, estaciones de trabajo y co-bots.",
    images: ["/assets/images/og-image.jpg"],
  },
  category: "Industria y Manufactura",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body
        className={`${openSans.variable} ${bankGothic.variable} font-body antialiased bg-white text-zinc-900`}
      >
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
