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
      "Empresa mexicana especializada en automatizaciÃ³n industrial: diseÃ±o e integraciÃ³n de sistemas de transporte, perfiles de aluminio, estaciones de trabajo, co-bots y soluciones lean.",
    foundingDate: "2011",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 50,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "QuerÃ©taro",
      addressRegion: "QuerÃ©taro",
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
      name: "MÃ©xico y ExportaciÃ³n Global",
    },
    knowsAbout: [
      "AutomatizaciÃ³n Industrial",
      "Sistemas de Transporte",
      "Perfiles de Aluminio Estructural",
      "Estaciones de Trabajo ErgonÃ³micas",
      "Robots Colaborativos",
      "GuÃ­as Lineales",
      "Lean Manufacturing",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://steigern.com.mx/#website",
    url: "https://steigern.com.mx",
    name: "STEIGERN Design In Motion",
    description: "Soluciones de automatizaciÃ³n industrial y sistemas de ingenierÃ­a en MÃ©xico",
    publisher: {
      "@id": "https://steigern.com.mx/#organization",
    },
    inLanguage: "es-MX",
  };

  const services = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Soluciones de IngenierÃ­a STEIGERN",
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
            "DiseÃ±o e integraciÃ³n de perfiles estructurales de aluminio adaptados individualmente para cada entorno de trabajo industrial.",
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
            "Sistemas conveyor industriales personalizados: de banda, rodillos, modulares y elevadores para lÃ­neas de manufactura.",
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
            "Estaciones de trabajo ergonÃ³micas con diseÃ±o Ã³ptimo de iluminaciÃ³n, entorno y seguridad para el operario.",
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
            "IntegraciÃ³n de robots colaborativos para asistir al operario en lÃ­neas de ensamble industrial.",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "ElevaciÃ³n y GuÃ­as Lineales",
          url: "https://steigern.com.mx/soluciones/elevacion-y-guias-lineales",
          provider: { "@id": "https://steigern.com.mx/#organization" },
          description:
            "Sistemas de elevaciÃ³n y guÃ­as lineales de precisiÃ³n para manufactura y ensamblaje industrial.",
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

