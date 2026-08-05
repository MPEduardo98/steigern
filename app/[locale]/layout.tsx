// app/[locale]/layout.tsx
// Este es el layout RAÍZ de la app (aquí viven <html> y <body>). Antes había un
// app/layout.tsx que resolvía el idioma con getLocale(), una API dinámica que
// leía cabeceras y obligaba a renderizar TODO el sitio en cada petición.
// Al vivir el layout dentro de [locale], el idioma llega por params y las
// páginas vuelven a prerenderizarse en el build (rutas ○ en lugar de ƒ).
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Open_Sans, Bebas_Neue } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@root/i18n/routing";
import { yearsOfExperience } from "@root/lib/company";
import {
  SITE,
  SITE_NAME,
  TWITTER_HANDLE,
  ogImages,
  ogLocale,
  ogAlternateLocales,
} from "@root/lib/seo";
import JsonLd from "@/_shared/seo/JsonLd";
import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

// Pre-renderiza estáticamente cada idioma soportado.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // El sitio es siempre claro, así que un único theme-color blanco.
  themeColor: "#ffffff",
  colorScheme: "light",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE),
    title: {
      default: "STEIGERN | Automatización Industrial en México",
      template: "%s | STEIGERN",
    },
    description: `Automatización industrial en México: conveyors, perfil de aluminio, estaciones de trabajo y co-bots. ${yearsOfExperience()} años de experiencia.`,
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
    authors: [{ name: SITE_NAME, url: SITE }],
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
        "max-video-preview": -1,
      },
    },
    // El canonical y los hreflang se definen en cada página (generateMetadata)
    // para no duplicar el canonical de la home entre idiomas.
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      url: SITE,
      siteName: SITE_NAME,
      title: "STEIGERN | Automatización Industrial en México",
      description:
        "Diseñamos e integramos sistemas para manufactura: conveyors, perfiles de aluminio, estaciones de trabajo y co-bots.",
      // La imagen la genera app/opengraph-image.tsx; se declara explícitamente
      // para que sobreviva a los `openGraph` de cada página.
      images: ogImages(),
    },
    twitter: {
      card: "summary_large_image",
      ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE, creator: TWITTER_HANDLE } : {}),
      title: "STEIGERN | Automatización Industrial en México",
      description:
        "Soluciones de ingeniería de precisión y automatización industrial. Conveyors, perfiles de aluminio, estaciones de trabajo y co-bots.",
      images: ogImages().map((i) => i.url),
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    appleWebApp: {
      capable: true,
      title: "STEIGERN",
      statusBarStyle: "black-translucent",
    },
    category: "Industria y Manufactura",
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Locale no soportado -> 404 (evita indexar rutas basura).
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Habilita el renderizado estático con el locale correcto.
  setRequestLocale(locale);

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body
        className={`${openSans.variable} ${bebasNeue.variable} font-body antialiased bg-white text-zinc-900`}
      >
        <JsonLd locale={locale} />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
