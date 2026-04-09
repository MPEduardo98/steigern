import type { Metadata } from "next";
import Navbar from "@/app/global/header/Header";
import Footer from "@/app/global/footer/Footer";
import Contact from "@/app/components/Contact";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a STEIGERN: empresa mexicana con 13 años de experiencia en automatización industrial. Misión, visión, valores y nuestra historia desde Querétaro hasta el mundo.",
  alternates: {
    canonical: "https://steigern.com.mx/nosotros",
  },
  openGraph: {
    title: "Nosotros | STEIGERN",
    description:
      "Somos una empresa mexicana comprometida con el desarrollo tecnológico industrial. 13 años automatizando procesos, impulsando el futuro.",
    url: "https://steigern.com.mx/nosotros",
  },
};

const values = [
  { label: "Transparencia" },
  { label: "Honestidad" },
  { label: "Pasión" },
  { label: "Competitividad" },
  { label: "Diligencia" },
];

const pillars = [
  {
    title: "Misión",
    desc: "Como proveedor global de mecanos y sistemas de producción para la industria, nuestro objetivo es desarrollar, producir y vender soluciones que impulsen la innovación tecnológica de las empresas, satisfaciendo al cliente en términos de asesoramiento, tiempos y calidad.",
  },
  {
    title: "Visión",
    desc: "Ser un socio comercial líder en automatización e integración industrial, destacando por ofrecer soluciones innovadoras y componentes de alta calidad. Actuar con mayor rapidez que nuestros competidores y brindar resultados con compromiso empresarial.",
  },
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full pt-40 pb-24 bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#E02020]" />
        <div className="absolute top-0 left-0 w-full h-px bg-zinc-200 dark:bg-zinc-800" />
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Nuestra Historia</span>
          </div>
          <h1
            className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] uppercase max-w-3xl mb-6"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Quiénes
            <br />
            <span className="text-[#E02020]">Somos</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed">
            Automatizando procesos, impulsamos el futuro. Una empresa mexicana con 13 años de experiencia en desarrollo tecnológico industrial.
          </p>
        </div>
      </section>

      {/* Text + Image */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800">
            <div className="bg-white dark:bg-zinc-900 p-10 flex flex-col justify-center">
              <div className="w-8 h-1 bg-[#E02020] mb-6" />
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Somos una empresa mexicana comprometida con el{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">desarrollo tecnológico industrial</span>,
                mediante servicios y productos vanguardistas acorde a las exigencias a nivel mundial.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-5">
                Dedicados al{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">diseño e integración</span>{" "}
                de dispositivos para el ensamble de componentes industriales, suministramos soluciones para automatizar procesos manuales, líneas de manufactura y sistemas a prueba de error en todos los niveles, mejorando la competitividad empresarial.
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">
                Con{" "}
                <span className="text-zinc-800 dark:text-zinc-200 font-semibold">13 años de experiencia</span>,
                nos hemos convertido en un socio comercial confiable en dispositivos de ensamble para componentes de automoción. En 2020 comenzamos a exportar a Estados Unidos y para 2021 establecimos nuestro corporativo en Querétaro, en Central Park.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 overflow-hidden min-h-[400px]">
              <img
                src="/assets/images/corporativo.webp"
                alt="STEIGERN Corporativo Querétaro"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Misión + Visión */}
      <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Filosofía</span>
            </div>
            <h2
              className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Misión y Visión
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white dark:bg-zinc-900 p-10">
                <div className="w-8 h-1 bg-[#E02020] mb-6" />
                <h3
                  className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em] mb-5"
                  style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="w-full py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-6 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Lo que nos define</span>
              </div>
              <h2
                className="text-zinc-900 dark:text-zinc-100 font-black text-[clamp(1.8rem,3vw,3rem)] uppercase tracking-[-0.03em] leading-tight mb-6"
                style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
              >
                Nuestros Valores
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-10">
                La lealtad con nuestros socios comerciales es esencial para mantener la credibilidad. Trabajamos día a día con actitud, liderazgo responsable y valor añadido para nuestros productos.
              </p>
              <div className="flex flex-wrap gap-3">
                {values.map((v) => (
                  <span
                    key={v.label}
                    className="text-xs font-black tracking-[0.15em] uppercase px-5 py-2.5 border-2 border-[#E02020] text-[#E02020]"
                  >
                    {v.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-px bg-zinc-200 dark:bg-zinc-800">
              {[
                { num: "01", text: "Figuramos como proveedor integral y reflejamos a un desarrollador y fabricante único en el mercado." },
                { num: "02", text: "En 2020 comenzamos a exportar dispositivos de ensamble a Estados Unidos." },
                { num: "03", text: "Para 2021 establecimos nuestro corporativo en Querétaro, en Central Park." },
              ].map((item) => (
                <div key={item.num} className="bg-zinc-50 dark:bg-zinc-900 p-8 flex gap-6 items-start">
                  <span className="text-[#E02020] text-xs font-black tracking-[0.2em] shrink-0 mt-1">{item.num}</span>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}