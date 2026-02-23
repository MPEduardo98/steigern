import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { HeroSection } from "@/app/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}