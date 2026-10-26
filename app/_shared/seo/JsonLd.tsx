import { localizedUrl, absoluteUrl, SITE } from "@root/lib/seo";
import { FOUNDING_YEAR } from "@root/lib/company";
import { getSolutions } from "@/[locale]/(soluciones)/soluciones/_data/solutions";

// Datos estructurados globales (Organization + WebSite + ItemList de servicios).
// Se inyecta en el layout raíz y se adapta al idioma activo para que el
// `inLanguage` y las URLs de servicios apunten a la versión correcta.

type Locale = "es" | "en" | "de";

const ORG_DESC: Record<Locale, string> = {
  es: "Empresa mexicana especializada en automatización industrial: diseño e integración de sistemas de transporte, perfiles de aluminio, estaciones de trabajo, co-bots y soluciones lean.",
  en: "Mexican company specialized in industrial automation: design and integration of conveyor systems, aluminum profiles, workstations, cobots and lean solutions.",
  de: "Mexikanisches Unternehmen für Industrieautomation: Entwicklung und Integration von Fördersystemen, Aluminiumprofilen, Arbeitsplätzen, Cobots und Lean-Lösungen.",
};

const WEBSITE_DESC: Record<Locale, string> = {
  es: "Soluciones de automatización industrial y sistemas de ingeniería en México",
  en: "Industrial automation solutions and engineering systems in Mexico",
  de: "Industrieautomationslösungen und Engineering-Systeme in Mexiko",
};

const SERVICES_NAME: Record<Locale, string> = {
  es: "Soluciones de Ingeniería STEIGERN",
  en: "STEIGERN Engineering Solutions",
  de: "STEIGERN Engineering-Lösungen",
};

const KNOWS_ABOUT: Record<Locale, string[]> = {
  es: ["Automatización Industrial", "Sistemas de Transporte", "Perfiles de Aluminio Estructural", "Estaciones de Trabajo Ergonómicas", "Robots Colaborativos", "Guías Lineales", "Lean Manufacturing"],
  en: ["Industrial Automation", "Conveyor Systems", "Structural Aluminum Profiles", "Ergonomic Workstations", "Collaborative Robots", "Linear Guides", "Lean Manufacturing"],
  de: ["Industrieautomation", "Fördersysteme", "Aluminium-Strukturprofile", "Ergonomische Arbeitsplätze", "Kollaborative Roboter", "Linearführungen", "Lean Manufacturing"],
};

export default function JsonLd({ locale = "es" }: { locale?: string }) {
  const lang = (["es", "en", "de"].includes(locale) ? locale : "es") as Locale;

  const organization = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE}/#organization`,
    name: "STEIGERN Design In Motion S.A de C.V",
    alternateName: "STEIGERN",
    url: SITE,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logos/Logo.png"),
    },
    image: absoluteUrl("/opengraph-image"),
    description: ORG_DESC[lang],
    foundingDate: String(FOUNDING_YEAR),
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
        availableLanguage: ["Spanish", "English", "German"],
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
    knowsAbout: KNOWS_ABOUT[lang],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "STEIGERN Design In Motion",
    description: WEBSITE_DESC[lang],
    publisher: {
      "@id": `${SITE}/#organization`,
    },
    inLanguage: lang,
  };

  const services = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: SERVICES_NAME[lang],
    // Nombres y descripciones en el idioma activo, desde la misma fuente que las páginas.
    itemListElement: getSolutions(lang).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        url: localizedUrl(lang, `/soluciones/${s.slug}`),
        provider: { "@id": `${SITE}/#organization` },
        description: s.desc,
      },
    })),
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
