import type { Metadata, Viewport } from "next";
import { Open_Sans, Bebas_Neue } from "next/font/google";
import { getLocale } from "next-intl/server";
import JsonLd from "./_shared/seo/JsonLd";
import { yearsOfExperience } from "@root/lib/company";
import { SITE_NAME, TWITTER_HANDLE, ogImages } from "@root/lib/seo";
import "./globals.css";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light",
};

export function generateMetadata(): Metadata {
  return {
  metadataBase: new URL("https://steigern.com.mx"),
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
      "max-video-preview": -1,
    },
  },
  // El canonical y los hreflang se definen en cada página (generateMetadata)
  // para no duplicar el canonical de la home entre idiomas.
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US", "de_DE"],
    url: "https://steigern.com.mx",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body
        className={`${openSans.variable} ${bebasNeue.variable} font-body antialiased bg-white text-zinc-900`}
      >
        <JsonLd locale={locale} />
        {children}
      </body>
    </html>
  );
}
