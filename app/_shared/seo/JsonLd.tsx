export default function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": "https://steigern.com.mx/#organization",
    name: "STEIGERN Design In Motion S.A de C.V",
    alternateName: "STEIGERN",
    url: "https://steigern.com.mx",
    logo: {
      "@type": "ImageObject",
      url: "https://steigern.com.mx/assets/images/logos/steigern.webp",
      width: 300,
      height: 100,
    },
    image: "https://steigern.com.mx/assets/images/og-image.jpg",
    description:
      "Empresa mexicana especializada en automatización industrial: diseño e integración de sistemas de transporte, perfiles de aluminio, estaciones de trabajo, co-bots y soluciones lean.",
    foundingDate: "2011",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 50,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Querétaro",
      addressRegion: "Querétaro",
      addressCountry: "MX",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+52-222-582-9254",
        contactType: "customer service",
        email: "customerservice@steigern.com.mx",
        availableLanguage: ["Spanish", "English"],
        hoursAvailable: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "09:00",
            closes: "14:00",
          },
        ],
      },
    ],
    sameAs: [
      "https://www.facebook.com/STEIGERNDesignInMotion/",
      "https://www.linkedin.com/company/steigern-design-in-motion",
      "https://www.youtube.com/channel/UC6WgB-G4e6nSdRpwIOTJULg",
    ],
    areaServed: {
      "@type": "Place",
      name: "México y Exportación Global",
    },
    knowsAbout: [
      "Automatización Industrial",
      "Sistemas de Transporte",
      "Perfiles de Aluminio Estructural",
      "Estaciones de Trabajo Ergonómicas",
      "Robots Colaborativos",
      "Guías Lineales",
      "Lean Manufacturing",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://steigern.com.mx/#website",
    url: "https://steigern.com.mx",
    name: "STEIGERN Design In Motion",
    description: "Soluciones de automatización industrial y sistemas de ingeniería en México",
    publisher: {
      "@id": "https://steigern.com.mx/#organization",
    },
    inLanguage: "es-MX",
  };

  const services = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Soluciones de Ingeniería STEIGERN",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Perfil Estructural de Aluminio",
          url: "https://steigern.com.mx/soluciones/perfil-de-aluminio",
          provider: { "@id": "https://steigern.com.mx/#organization" },
          description:
            "Diseño e integración de perfiles estructurales de aluminio adaptados individualmente para cada entorno de trabajo industrial.",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Sistemas de Transporte (Conveyors)",
          url: "https://steigern.com.mx/soluciones/conveyors",
          provider: { "@id": "https://steigern.com.mx/#organization" },
          description:
            "Sistemas conveyor industriales personalizados: de banda, rodillos, modulares y elevadores para líneas de manufactura.",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Estaciones de Trabajo",
          url: "https://steigern.com.mx/soluciones/estaciones-de-trabajo",
          provider: { "@id": "https://steigern.com.mx/#organization" },
          description:
            "Estaciones de trabajo ergonómicas con diseño óptimo de iluminación, entorno y seguridad para el operario.",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Dispositivos Asistidos por Co-Bots",
          url: "https://steigern.com.mx/soluciones/dispositivos-asistidos-por-cobots",
          provider: { "@id": "https://steigern.com.mx/#organization" },
          description:
            "Integración de robots colaborativos para asistir al operario en líneas de ensamble industrial.",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "Elevación y Guías Lineales",
          url: "https://steigern.com.mx/soluciones/elevacion-y-guias-lineales",
          provider: { "@id": "https://steigern.com.mx/#organization" },
          description:
            "Sistemas de elevación y guías lineales de precisión para manufactura y ensamblaje industrial.",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: "Soluciones Lean",
          url: "https://steigern.com.mx/soluciones/soluciones-lean",
          provider: { "@id": "https://steigern.com.mx/#organization" },
          description:
            "Estructuras industriales y soluciones de manufactura esbelta para eliminar desperdicios y optimizar procesos.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(services) }}
      />
    </>
  );
}

