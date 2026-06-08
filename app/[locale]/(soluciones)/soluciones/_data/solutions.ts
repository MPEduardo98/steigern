// app/[locale]/(soluciones)/soluciones/_data/solutions.ts
// Fuente única de datos para la página índice de soluciones y las páginas de detalle [slug].

export interface Solution {
  slug: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  img: string;
  /** Párrafos de contenido para la página de detalle. Placeholder — reemplazar con copy final. */
  body: string[];
}

export const solutions: Solution[] = [
  {
    slug: "perfil-de-aluminio",
    num: "01",
    title: "Perfil Estructural de Aluminio",
    desc: "Los perfiles estructurales de aluminio para aplicaciones en entornos de trabajo son más eficientes cuando se adaptan individualmente a su propósito específico. Una alternativa moderna al acero para máquinas que exigen estabilidad.",
    tags: ["Modular", "Ligero", "Adaptable"],
    img: "/assets/images/soluciones/perfil.png",
    body: [
      "Los perfiles estructurales de aluminio son la base de un sistema de construcción modular que permite diseñar bastidores, protecciones, mesas y estructuras de máquina con total flexibilidad.",
      "Su naturaleza ligera y reconfigurable los convierte en una alternativa moderna al acero soldado: se ensamblan sin soldadura, se modifican sin herramientas especiales y se adaptan a cada aplicación específica.",
    ],
  },
  {
    slug: "conveyors",
    num: "02",
    title: "Sistemas de Transporte",
    desc: "Desde el desarrollo temprano del concepto hasta el estudio detallado de factibilidad, incluidos proyectos para la manipulación de materiales que consideran la logística de forma integral.",
    tags: ["Conveyors", "Manejo de Materiales", "Logística"],
    img: "/assets/images/soluciones/conveyors.png",
    body: [
      "Diseñamos sistemas de transporte y manipulación de materiales que conectan cada etapa de tu proceso productivo, desde el concepto inicial hasta el estudio de factibilidad detallado.",
      "Cada solución considera la logística de forma integral: flujo de materiales, tiempos de ciclo y ergonomía, garantizando un movimiento continuo y confiable a lo largo de la línea.",
    ],
  },
  {
    slug: "estaciones-de-trabajo",
    num: "03",
    title: "Estaciones de Trabajo",
    desc: "Diseño ergonómico óptimo que adapta el lugar de trabajo considerando la iluminación, el entorno y las capacidades del operario. Protección y seguridad avanzada en cada instalación.",
    tags: ["Ergonomía", "Seguridad", "Productividad"],
    img: "/assets/images/soluciones/estaciones.png",
    body: [
      "Las estaciones de trabajo ergonómicas adaptan el puesto a las capacidades del operario, considerando iluminación, alcance, postura y el entorno de la planta.",
      "Un diseño centrado en la persona reduce la fatiga, eleva la productividad y refuerza la seguridad en cada instalación.",
    ],
  },
  {
    slug: "dispositivos-asistidos-por-cobots",
    num: "04",
    title: "Dispositivos Asistidos por Co-Bots",
    desc: "Integración de robots colaborativos para asistir y potenciar las capacidades del operario en líneas de ensamble, reduciendo errores y mejorando tiempos de ciclo.",
    tags: ["Cobots", "Ensamble", "Automatización"],
    img: "/assets/images/soluciones/cobots.png",
    body: [
      "Integramos robots colaborativos (co-bots) que trabajan junto al operario para asistir tareas repetitivas, de precisión o de carga, sin reemplazar el criterio humano.",
      "El resultado son líneas de ensamble más rápidas, con menos errores y tiempos de ciclo optimizados, manteniendo la flexibilidad de la operación manual.",
    ],
  },
  {
    slug: "elevacion-y-guias-lineales",
    num: "05",
    title: "Elevación y Guías Lineales",
    desc: "Sistemas de elevación y guías lineales de precisión para el movimiento controlado de componentes y subconjuntos dentro de líneas de manufactura y ensamblaje.",
    tags: ["Elevación", "Guías Lineales", "Precisión"],
    img: "/assets/images/soluciones/elevacion.png",
    body: [
      "Los sistemas de elevación y guías lineales permiten un movimiento controlado y repetible de componentes y subconjuntos dentro de la línea.",
      "Su precisión garantiza posicionamiento exacto en cada estación, facilitando el ensamble y la manipulación de cargas con seguridad.",
    ],
  },
  {
    slug: "soluciones-lean",
    num: "06",
    title: "Soluciones Lean",
    desc: "Implementación de manufactura esbelta mediante estructuras físicas: supermercados de materiales, carros de kit, tableros de gestión visual y células de manufactura optimizadas.",
    tags: ["Lean", "5S", "Kaizen"],
    img: "/assets/images/soluciones/estructuras.png",
    body: [
      "Llevamos la manufactura esbelta al piso de planta con estructuras físicas: supermercados de materiales, carros de kit, tableros de gestión visual y células de trabajo optimizadas.",
      "Cada elemento se diseña para eliminar desperdicios, ordenar el flujo y sostener una cultura de mejora continua (5S y Kaizen).",
    ],
  },
  {
    slug: "desarrollo-de-proyectos",
    num: "07",
    title: "Desarrollo de Proyectos",
    desc: "Acompañamiento integral de ingeniería: desde el concepto y la factibilidad hasta el diseño de detalle, la integración y la puesta en marcha de soluciones industriales a medida.",
    tags: ["Ingeniería", "Integración", "Puesta en Marcha"],
    img: "/assets/images/soluciones/estructuras.png",
    body: [
      "Acompañamos tu proyecto de principio a fin: análisis del concepto, estudio de factibilidad, diseño de detalle, fabricación, integración y puesta en marcha.",
      "Con 13 años de experiencia transformamos requerimientos en sistemas funcionales, gestionando cada etapa como un único socio de ingeniería.",
    ],
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
