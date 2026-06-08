// app/[locale]/(contacto)/contacto/page.tsx
import Header from "@/_shared/header/Header";
import Footer from "@/_shared/footer/Footer";
import ContactoContent from "./_components/ContactoContent";

export default function ContactoPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <ContactoContent />
      <Footer />
    </main>
  );
}
