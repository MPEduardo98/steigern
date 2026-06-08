import type { Metadata } from "next";
import Header from "@/_shared/header/Header";
import Hero from "./_components/Hero";
import SolutionsPreview from "./_components/Solutions";
import AboutPreview from "./_components/About";
import Metrics from "./_components/Metrics";
import Brands from "./_components/Brands";
import GlobalPresence from "./_components/Globalpresence";
import Contact from "./_components/Contact";
import Footer from "@/_shared/footer/Footer";

export const metadata: Metadata = {
  title: "Automatización Industrial y Soluciones de Ingeniería en México",
  description:
    "STEIGERN diseña e integra soluciones industriales a medida: conveyors, perfiles de aluminio, estaciones de trabajo ergonómicas, co-bots y sistemas lean. 13 años de experiencia. Exportando desde México al mundo.",
  alternates: {
    canonical: "https://steigern.com.mx",
  },
  openGraph: {
    title: "STEIGERN | Automatización Industrial en México",
    description:
      "Diseño e integración de soluciones industriales: conveyors, perfiles de aluminio, estaciones de trabajo, co-bots y lean manufacturing. Empresa mexicana con presencia global.",
    url: "https://steigern.com.mx",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "STEIGERN — Automatización Industrial en México",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SolutionsPreview />
      <AboutPreview />
      <GlobalPresence />
      <Brands />
      <Contact />
      <Metrics />
      <Footer />
    </main>
  );
}
