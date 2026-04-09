import type { Metadata } from "next";
import Navbar from "./global/header/Header";
import Hero from "./components/Hero";
import SolutionsPreview from "./components/Solutions";
import AboutPreview from "./components/About";
import Metrics from "./components/Metrics";
import Brands from "./components/Brands";
import GlobalPresence from "./components/Globalpresence";
import Contact from "./components/Contact";
import Footer from "./global/footer/Footer";

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
      <Navbar />
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