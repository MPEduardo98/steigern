import { localizedUrl, absoluteUrl, SITE } from "@root/lib/seo";
import { FOUNDING_YEAR } from "@root/lib/company";

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

const SERVICES: { slug: string; name: string; description: string }[] = [
  {
    slug: "perfil-de-aluminio",
    name: "Perfil Estructural de Aluminio",
    description:
      "Diseño e integración de perfiles estructurales de aluminio adaptados individualmente para cada entorno de trabajo industrial.",
  },
  {
    slug: "conveyors",
    name: "Sistemas de Transporte (Conveyors)",
    description:
      "Sistemas conveyor industriales personalizados: de banda, rodillos, modulares y elevadores para líneas de manufactura.",
  },
  {
    slug: "estaciones-de-trabajo",
    name: "Estaciones de Trabajo",
    description:
      "Estaciones de trabajo ergonómicas con diseño óptimo de iluminación, entorno y seguridad para el operario.",
  },
  {
    slug: "dispositivos-asistidos-por-cobots",
    name: "Dispositivos Asistidos por Co-Bots",
    description:
      "Integración de robots colaborativos para asistir al operario en líneas de ensamble industrial.",
  },
  {
    slug: "elevacion-y-guias-lineales",
    name: "Elevación y Guías Lineales",
    description:
      "Sistemas de elevación y guías lineales de precisión para manufactura y ensamblaje industrial.",
  },
  {
    slug: "soluciones-lean",
    name: "Soluciones Lean",
    description:
      "Estructuras industriales y soluciones de manufactura esbelta para eliminar desperdicios y optimizar procesos.",
  },
];

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
    name: "Soluciones de Ingeniería STEIGERN",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        url: localizedUrl(lang, `/soluciones/${s.slug}`),
        provider: { "@id": `${SITE}/#organization` },
        description: s.description,
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
