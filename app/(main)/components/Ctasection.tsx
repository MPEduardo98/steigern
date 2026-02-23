import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-24 bg-brand-red overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-white/5"></div>
      <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-white/5"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          ¿Listo para Automatizar su Producción?
        </h2>
        <p className="text-xl text-white/90 mb-10 leading-relaxed">
          Permítanos ayudarle a transformar sus procesos industriales con nuestras 
          soluciones de automatización de vanguardia.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center px-10 py-5 bg-white text-brand-red text-lg font-bold rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-smooth"
        >
          Solicitar Consulta Gratuita
        </Link>
      </div>
    </section>
  );
}