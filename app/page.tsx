import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Solutions from "./components/Solutions";
import Industries from "./components/Industries";
import About from "./components/About";
import Metrics from "./components/Metrics";
import Brands from "./components/Brands";
import GlobalPresence from "./components/Globalpresence";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Solutions />
      <Industries />
      <About />
      <Metrics />
      <Brands />
      <GlobalPresence />
      <Contact />
      <Footer />
    </main>
  );
}