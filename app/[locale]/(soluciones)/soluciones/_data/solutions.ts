// app/[locale]/(soluciones)/soluciones/_data/solutions.ts
// Fuente única de datos para la página índice de soluciones y las páginas de detalle [slug].
// Cada solución es un artículo tipo blog: contenido informativo que atrae tráfico
// y remata con que STEIGERN lo diseña, fabrica e integra.
// El contenido por idioma vive en solutions.{en,de}.ts; el español es el canónico aquí.
import { solutionsEN } from "./solutions.en";
import { solutionsDE } from "./solutions.de";

export interface SolutionSection {
  heading: string;
  paragraphs: string[];
}

export interface SolutionBenefit {
  title: string;
  desc: string;
}

export interface SolutionFAQ {
  q: string;
  a: string;
}

export interface Solution {
  slug: string;
  num: string;
  title: string;
  desc: string;
  tags: string[];
  img: string;
  /** Tiempo estimado de lectura, ej. "5 min". */
  readingTime: string;
  /** Párrafo de entrada (lead) del artículo. */
  excerpt: string;
  /** Cuerpo del artículo: secciones con subtítulo. */
  sections: SolutionSection[];
  /** Beneficios clave en formato tarjeta. */
  benefits: SolutionBenefit[];
  /** Aplicaciones / industrias donde se usa. */
  applications: string[];
  /** Preguntas frecuentes (sirven también para SEO / rich results). */
  faqs: SolutionFAQ[];
  /** Cierre que conecta el tema con lo que hace STEIGERN. */
  closing: string;
}

export const solutions: Solution[] = [
  {
    slug: "perfil-de-aluminio",
    num: "01",
    title: "Perfil Estructural de Aluminio",
    desc: "Los perfiles estructurales de aluminio para aplicaciones en entornos de trabajo son más eficientes cuando se adaptan individualmente a su propósito específico. Una alternativa moderna al acero para máquinas que exigen estabilidad.",
    tags: ["Modular", "Ligero", "Adaptable"],
    img: "/assets/images/soluciones/perfil.png",
    readingTime: "5 min",
    excerpt:
      "El perfil estructural de aluminio se ha convertido en la columna vertebral de la manufactura moderna: un sistema modular que permite construir bastidores, protecciones, mesas y estructuras de máquina sin soldadura y con una flexibilidad que el acero tradicional no ofrece.",
    sections: [
      {
        heading: "¿Qué es el perfil estructural de aluminio?",
        paragraphs: [
          "El perfil estructural de aluminio es una extrusión de aleación de aluminio con ranuras en T a lo largo de sus caras. Esas ranuras permiten unir perfiles entre sí y fijar accesorios (paneles, bisagras, ruedas, sensores) mediante tornillos y tuercas especiales, sin necesidad de soldar ni perforar.",
          "El resultado es un sistema de construcción tipo 'mecano industrial': se ensambla, se modifica y se reconfigura las veces que haga falta. Esto lo hace ideal para entornos donde los procesos cambian y las estructuras deben evolucionar con ellos.",
        ],
      },
      {
        heading: "Aluminio frente al acero soldado",
        paragraphs: [
          "Frente a una estructura de acero soldado, el perfil de aluminio pesa mucho menos, no requiere pintura ni tratamiento anticorrosión y se ensambla en una fracción del tiempo. No hay chispas, humos ni deformaciones por calor.",
          "Además, una estructura de aluminio se puede desmontar y reaprovechar. Si mañana cambia el producto o la línea, los mismos perfiles sirven para una configuración distinta, protegiendo la inversión a largo plazo.",
        ],
      },
      {
        heading: "Diseño a medida de cada aplicación",
        paragraphs: [
          "Un perfil estructural rinde al máximo cuando se dimensiona para su función concreta: la sección, el tipo de unión y los accesorios deben elegirse según la carga, la rigidez y el entorno de trabajo.",
          "Por eso un buen proyecto no empieza por el catálogo, sino por el problema: qué debe soportar, cómo se opera y qué normas de seguridad aplican.",
        ],
      },
    ],
    benefits: [
      { title: "Sin soldadura", desc: "Se ensambla con uniones atornilladas, sin chispas, humos ni deformaciones por calor." },
      { title: "Ligero y rígido", desc: "Hasta un tercio del peso del acero, manteniendo la estabilidad necesaria." },
      { title: "Reconfigurable", desc: "Se modifica y reaprovecha cuando el proceso cambia, sin desechar la estructura." },
      { title: "Limpio y estético", desc: "Acabado anodizado que no requiere pintura ni mantenimiento anticorrosión." },
    ],
    applications: [
      "Bastidores y bases de máquina",
      "Protecciones y guardas de seguridad",
      "Mesas y bancos de trabajo",
      "Cabinas y cerramientos",
      "Soportes para sensores y pantallas",
      "Estructuras para automatización",
    ],
    faqs: [
      {
        q: "¿El perfil de aluminio aguanta cargas industriales?",
        a: "Sí. Existen distintas secciones y aleaciones según la carga y la rigidez requeridas. Dimensionando correctamente el perfil y las uniones se cubren desde estructuras ligeras hasta bastidores de máquina exigentes.",
      },
      {
        q: "¿Puedo modificar la estructura después de instalarla?",
        a: "Esa es precisamente su ventaja. Al unirse mediante ranura en T y tornillería, la estructura se amplía, reconfigura o reaprovecha sin soldadura ni herramientas especiales.",
      },
      {
        q: "¿Necesita mantenimiento?",
        a: "Prácticamente no. El aluminio anodizado no se oxida y no requiere pintura, por lo que el mantenimiento se limita a revisar uniones y accesorios.",
      },
    ],
    closing:
      "En STEIGERN diseñamos, fabricamos e integramos estructuras de perfil de aluminio a la medida de tu proceso: desde una guarda de seguridad hasta el bastidor completo de una máquina. Analizamos la aplicación, dimensionamos el perfil correcto y entregamos la estructura lista para producir.",
  },
  {
    slug: "conveyors",
    num: "02",
    title: "Sistemas de Transporte",
    desc: "Desde el desarrollo temprano del concepto hasta el estudio detallado de factibilidad, incluidos proyectos para la manipulación de materiales que consideran la logística de forma integral.",
    tags: ["Conveyors", "Manejo de Materiales", "Logística"],
    img: "/assets/images/soluciones/conveyors.png",
    readingTime: "6 min",
    excerpt:
      "Un sistema de transporte bien diseñado es lo que mantiene el flujo de una planta en movimiento: conecta cada etapa del proceso, marca el ritmo de producción y elimina los desplazamientos manuales que generan tiempos muertos y riesgos.",
    sections: [
      {
        heading: "¿Qué es un sistema de transporte industrial?",
        paragraphs: [
          "Un sistema de transporte (conveyor) es el conjunto de elementos que mueve materiales, piezas o productos de un punto a otro de forma automática y controlada. Bandas, rodillos, cadenas o sistemas modulares trabajan juntos para sostener un flujo continuo.",
          "Más allá del transporte en sí, un buen sistema sincroniza estaciones, regula el ritmo de la línea y conecta procesos que de otro modo dependerían del movimiento manual de materiales.",
        ],
      },
      {
        heading: "Tipos de sistemas de transporte",
        paragraphs: [
          "La elección del tipo de conveyor depende del producto y del proceso: bandas para piezas pequeñas o a granel, rodillos para cajas y tarimas, transportadores modulares de plástico para curvas y lavado, y cadenas para cargas pesadas.",
          "En muchos casos la solución combina varios tipos, integrando elevadores, desviadores y acumuladores para resolver cambios de nivel, clasificación y amortiguamiento entre estaciones.",
        ],
      },
      {
        heading: "La logística se piensa de forma integral",
        paragraphs: [
          "Diseñar un sistema de transporte no es solo elegir una banda: implica estudiar el flujo de materiales, los tiempos de ciclo, la ergonomía y el layout de la planta como un todo.",
          "Por eso el proyecto empieza temprano, con el concepto y un estudio de factibilidad, para asegurar que el sistema encaje en el espacio disponible y en el ritmo real de producción.",
        ],
      },
    ],
    benefits: [
      { title: "Flujo continuo", desc: "Conecta estaciones y elimina los desplazamientos manuales entre procesos." },
      { title: "Ritmo controlado", desc: "Sincroniza tiempos de ciclo y regula la velocidad de la línea." },
      { title: "Menos riesgo", desc: "Reduce la manipulación manual de cargas y los riesgos ergonómicos asociados." },
      { title: "Trazabilidad", desc: "Permite integrar sensores y control para seguir el material a lo largo de la línea." },
    ],
    applications: [
      "Líneas de ensamble",
      "Empaque y fin de línea",
      "Manejo de cajas y tarimas",
      "Alimentación de estaciones",
      "Clasificación y desvío",
      "Cambios de nivel entre procesos",
    ],
    faqs: [
      {
        q: "¿Qué tipo de conveyor necesita mi proceso?",
        a: "Depende del producto, el peso y el recorrido. Bandas para piezas pequeñas, rodillos para cajas y tarimas, modulares para curvas y lavado, cadenas para cargas pesadas. Lo habitual es combinar varios según cada tramo.",
      },
      {
        q: "¿Se puede integrar con mis equipos existentes?",
        a: "Sí. Los sistemas se diseñan para conectarse con estaciones, robots y equipos ya instalados, sincronizando tiempos de ciclo y señales de control.",
      },
      {
        q: "¿Incluyen el estudio de factibilidad?",
        a: "El proyecto arranca con el concepto y un estudio de factibilidad que valida el flujo, el espacio disponible y el ritmo de producción antes de fabricar.",
      },
    ],
    closing:
      "En STEIGERN desarrollamos sistemas de transporte y manipulación de materiales de principio a fin: del concepto y el estudio de factibilidad al diseño, la fabricación y la puesta en marcha. Pensamos la logística de forma integral para que el material fluya sin interrupciones.",
  },
  {
    slug: "estaciones-de-trabajo",
    num: "03",
    title: "Estaciones de Trabajo",
    desc: "Diseño ergonómico óptimo que adapta el lugar de trabajo considerando la iluminación, el entorno y las capacidades del operario. Protección y seguridad avanzada en cada instalación.",
    tags: ["Ergonomía", "Seguridad", "Productividad"],
    img: "/assets/images/soluciones/estaciones.png",
    readingTime: "5 min",
    excerpt:
      "La estación de trabajo es el punto donde se encuentran la persona y el proceso. Cuando está bien diseñada, reduce la fatiga, evita errores y eleva la productividad; cuando no, se convierte en la principal fuente de lesiones y retrabajos.",
    sections: [
      {
        heading: "Ergonomía: diseñar para la persona",
        paragraphs: [
          "Una estación ergonómica adapta el puesto a las capacidades del operario y no al revés. Altura de trabajo, alcance, postura, iluminación y disposición de herramientas se definen para que la tarea se realice con el mínimo esfuerzo.",
          "Esto no es solo confort: la ergonomía reduce trastornos musculoesqueléticos, ausentismo y los errores que aparecen cuando el operario trabaja incómodo o cansado.",
        ],
      },
      {
        heading: "Productividad y calidad",
        paragraphs: [
          "Cuando todo está al alcance y en el orden correcto, el tiempo de ciclo baja y la calidad sube. Elementos como guías visuales, sistemas poka-yoke y organización del material evitan errores en origen.",
          "Una estación bien pensada también facilita la estandarización del trabajo, clave para sostener la mejora continua.",
        ],
      },
      {
        heading: "Seguridad integrada",
        paragraphs: [
          "La seguridad se diseña dentro de la estación, no se añade después: protecciones, accesos controlados, iluminación adecuada y rutas despejadas forman parte del concepto desde el inicio.",
          "El objetivo es un puesto donde sea fácil trabajar bien y difícil trabajar de forma insegura.",
        ],
      },
    ],
    benefits: [
      { title: "Menos fatiga", desc: "Postura, alcance y altura optimizados para reducir el esfuerzo del operario." },
      { title: "Más calidad", desc: "Guías visuales y poka-yoke que previenen errores en el punto de trabajo." },
      { title: "Seguridad", desc: "Protecciones e iluminación integradas en el diseño de cada puesto." },
      { title: "Estandarización", desc: "Puestos consistentes que facilitan el trabajo estándar y la mejora continua." },
    ],
    applications: [
      "Ensamble manual",
      "Inspección y control de calidad",
      "Empaque y reempaque",
      "Pruebas funcionales",
      "Kitting y preparación de material",
      "Retrabajo y reparación",
    ],
    faqs: [
      {
        q: "¿Por qué invertir en estaciones ergonómicas?",
        a: "Porque reducen lesiones, ausentismo y errores, a la vez que mejoran el tiempo de ciclo. La inversión se recupera con menos retrabajos y una operación más estable.",
      },
      {
        q: "¿Se adaptan a distintos operarios?",
        a: "Sí. Las estaciones pueden diseñarse con elementos ajustables (altura, alcance, iluminación) para acomodar a diferentes personas y turnos.",
      },
      {
        q: "¿Incluyen elementos de seguridad?",
        a: "La seguridad se integra desde el concepto: protecciones, iluminación adecuada y rutas despejadas forman parte del diseño de cada puesto.",
      },
    ],
    closing:
      "En STEIGERN diseñamos y fabricamos estaciones de trabajo centradas en la persona: estudiamos la tarea, la ergonomía y la seguridad para entregar puestos que elevan la productividad y cuidan al operario en cada instalación.",
  },
  {
    slug: "dispositivos-asistidos-por-cobots",
    num: "04",
    title: "Dispositivos Asistidos por Co-Bots",
    desc: "Integración de robots colaborativos para asistir y potenciar las capacidades del operario en líneas de ensamble, reduciendo errores y mejorando tiempos de ciclo.",
    tags: ["Cobots", "Ensamble", "Automatización"],
    img: "/assets/images/soluciones/cobots.png",
    readingTime: "6 min",
    excerpt:
      "Los robots colaborativos —co-bots— no vienen a reemplazar al operario, sino a trabajar a su lado. Asumen las tareas repetitivas, de precisión o de carga, mientras la persona aporta criterio y flexibilidad. El resultado es lo mejor de ambos mundos.",
    sections: [
      {
        heading: "¿Qué es un co-bot?",
        paragraphs: [
          "Un co-bot es un robot diseñado para operar de forma segura junto a personas, sin las jaulas que requieren los robots industriales tradicionales. Detecta contacto y limita su fuerza y velocidad para compartir el espacio de trabajo.",
          "Esto permite instalarlo directamente en una estación existente y repartir las tareas entre la persona y el robot según lo que cada uno hace mejor.",
        ],
      },
      {
        heading: "Colaboración, no reemplazo",
        paragraphs: [
          "El co-bot se encarga de lo repetitivo, lo preciso o lo pesado: atornillado, dispensado, pick-and-place, pruebas o manipulación de cargas. El operario conserva las tareas que exigen juicio, destreza fina y adaptación.",
          "Esta división reduce errores y fatiga, y mejora el tiempo de ciclo sin perder la flexibilidad de una línea manual.",
        ],
      },
      {
        heading: "Flexibilidad y rápida reconversión",
        paragraphs: [
          "Una de las grandes ventajas del co-bot es la facilidad para reprogramarlo y reubicarlo. Ante un cambio de producto o de volumen, la celda se adapta sin grandes obras ni paros prolongados.",
          "Integrado con utillajes y dispositivos a medida, el co-bot se convierte en una herramienta versátil dentro de la estación.",
        ],
      },
    ],
    benefits: [
      { title: "Seguro junto a personas", desc: "Opera sin jaulas, limitando fuerza y velocidad para compartir el puesto." },
      { title: "Menos errores", desc: "Asume tareas repetitivas y de precisión donde el error humano es más probable." },
      { title: "Ciclos más cortos", desc: "Equilibra la carga entre persona y robot para optimizar el tiempo de ciclo." },
      { title: "Reconfigurable", desc: "Se reprograma y reubica con rapidez ante cambios de producto o volumen." },
    ],
    applications: [
      "Atornillado y fijación",
      "Pick-and-place",
      "Dispensado de adhesivos y selladores",
      "Pruebas y verificación",
      "Carga y descarga de máquinas",
      "Inspección asistida",
    ],
    faqs: [
      {
        q: "¿Un co-bot reemplaza al operario?",
        a: "No. El co-bot asiste al operario asumiendo tareas repetitivas, de precisión o de carga, mientras la persona conserva las que requieren criterio y destreza. Es colaboración, no sustitución.",
      },
      {
        q: "¿Necesita jaulas de seguridad?",
        a: "En general no, gracias a sus sistemas de limitación de fuerza y velocidad. El alcance exacto se define con una evaluación de riesgos de la aplicación concreta.",
      },
      {
        q: "¿Se puede cambiar de tarea fácilmente?",
        a: "Sí. Una de sus ventajas es la facilidad de reprogramación y reubicación, lo que permite adaptar la celda ante cambios de producto o volumen.",
      },
    ],
    closing:
      "En STEIGERN integramos celdas colaborativas a la medida de tu línea: diseñamos el dispositivo, el utillaje y la programación para que el co-bot y el operario trabajen juntos, con seguridad y resultados medibles en calidad y tiempo de ciclo.",
  },
  {
    slug: "elevacion-y-guias-lineales",
    num: "05",
    title: "Elevación y Guías Lineales",
    desc: "Sistemas de elevación y guías lineales de precisión para el movimiento controlado de componentes y subconjuntos dentro de líneas de manufactura y ensamblaje.",
    tags: ["Elevación", "Guías Lineales", "Precisión"],
    img: "/assets/images/soluciones/elevacion.png",
    readingTime: "5 min",
    excerpt:
      "Cuando una pieza debe moverse exactamente al mismo punto, una y otra vez, entran en juego las guías lineales y los sistemas de elevación. Son los elementos que aportan precisión y repetibilidad al movimiento dentro de una línea.",
    sections: [
      {
        heading: "Movimiento controlado y repetible",
        paragraphs: [
          "Las guías lineales permiten desplazar componentes y subconjuntos a lo largo de una trayectoria definida con muy baja fricción y alta precisión. El movimiento es suave, estable y, sobre todo, repetible.",
          "Los sistemas de elevación resuelven los cambios de nivel: suben, bajan o posicionan cargas con exactitud entre estaciones o procesos.",
        ],
      },
      {
        heading: "Precisión en cada estación",
        paragraphs: [
          "En el ensamble, posicionar la pieza siempre en el mismo lugar es la base de la calidad. Las guías y los sistemas de elevación garantizan ese posicionamiento exacto, facilitando tanto el trabajo manual como el automatizado.",
          "Esto reduce ajustes, retrabajos y variabilidad entre piezas.",
        ],
      },
      {
        heading: "Seguridad en el manejo de cargas",
        paragraphs: [
          "Mover cargas con guías y elevadores también es más seguro: el movimiento está contenido y controlado, evitando esfuerzos y riesgos del manejo manual.",
          "Bien dimensionados, estos sistemas combinan precisión y seguridad en un mismo elemento.",
        ],
      },
    ],
    benefits: [
      { title: "Alta precisión", desc: "Posicionamiento exacto y repetible en cada estación de la línea." },
      { title: "Movimiento suave", desc: "Baja fricción para desplazamientos estables y de larga vida útil." },
      { title: "Cambios de nivel", desc: "Sistemas de elevación que suben y posicionan cargas con control." },
      { title: "Manejo seguro", desc: "Movimiento contenido que reduce el esfuerzo y el riesgo manual." },
    ],
    applications: [
      "Posicionamiento en ensamble",
      "Cambios de nivel entre procesos",
      "Manipulación de subconjuntos",
      "Ejes de máquinas especiales",
      "Estaciones de prueba",
      "Carga y descarga controlada",
    ],
    faqs: [
      {
        q: "¿Qué precisión se puede alcanzar?",
        a: "Las guías lineales ofrecen un posicionamiento muy preciso y repetible. El valor exacto depende del sistema seleccionado y se dimensiona según los requisitos de la aplicación.",
      },
      {
        q: "¿Para qué cargas sirven?",
        a: "Existen guías y elevadores para un amplio rango de cargas, desde subconjuntos ligeros hasta piezas pesadas. La clave es dimensionar correctamente el sistema.",
      },
      {
        q: "¿Mejoran la seguridad del operario?",
        a: "Sí. Al contener y controlar el movimiento de las cargas, reducen el esfuerzo y los riesgos asociados al manejo manual.",
      },
    ],
    closing:
      "En STEIGERN diseñamos e integramos sistemas de elevación y guías lineales de precisión adaptados a tu proceso, para que cada componente se mueva al punto exacto, con repetibilidad y seguridad, estación tras estación.",
  },
  {
    slug: "soluciones-lean",
    num: "06",
    title: "Soluciones Lean",
    desc: "Implementación de manufactura esbelta mediante estructuras físicas: supermercados de materiales, carros de kit, tableros de gestión visual y células de manufactura optimizadas.",
    tags: ["Lean", "5S", "Kaizen"],
    img: "/assets/images/soluciones/estructuras.png",
    readingTime: "6 min",
    excerpt:
      "La manufactura esbelta no vive solo en los pizarrones: se materializa en el piso de planta. Supermercados de materiales, carros de kit y gestión visual son las estructuras físicas que convierten los principios lean en flujo real.",
    sections: [
      {
        heading: "Llevar el lean al piso de planta",
        paragraphs: [
          "Lean Manufacturing busca eliminar desperdicios y crear flujo. Para lograrlo, las ideas necesitan soporte físico: estructuras que ordenen el material, marquen el estándar y faciliten el trabajo correcto.",
          "Ese es el papel de las soluciones lean físicas: traducir conceptos como flujo, pull o gestión visual en elementos concretos dentro de la operación.",
        ],
      },
      {
        heading: "Supermercados, kitting y gestión visual",
        paragraphs: [
          "Los supermercados de materiales y los carros de kit aseguran que cada estación reciba lo que necesita, en la cantidad correcta y en el momento justo, reduciendo búsquedas y excesos de inventario.",
          "Los tableros de gestión visual hacen visible el estado del proceso: qué va bien, qué se desvía y dónde actuar. La información a la vista es la base de la reacción rápida.",
        ],
      },
      {
        heading: "Sostener la mejora continua",
        paragraphs: [
          "Las células de manufactura optimizadas ordenan el flujo y acortan distancias, mientras que el 5S mantiene el orden y la limpieza como hábito.",
          "Bien diseñadas, estas estructuras no solo mejoran hoy: sostienen una cultura de Kaizen donde la mejora es parte del día a día.",
        ],
      },
    ],
    benefits: [
      { title: "Menos desperdicio", desc: "Ordena el flujo de material y elimina búsquedas, esperas y excesos de inventario." },
      { title: "Gestión visual", desc: "Tableros que hacen visible el estado del proceso para reaccionar a tiempo." },
      { title: "Flujo optimizado", desc: "Células de trabajo que acortan distancias y equilibran la carga." },
      { title: "Cultura 5S / Kaizen", desc: "Estructuras que sostienen el orden y la mejora continua en el tiempo." },
    ],
    applications: [
      "Supermercados de materiales",
      "Carros de kit y kitting",
      "Tableros de gestión visual",
      "Células de manufactura",
      "Sistemas de flujo (FIFO)",
      "Implementación de 5S",
    ],
    faqs: [
      {
        q: "¿Qué son las soluciones lean físicas?",
        a: "Son las estructuras que materializan los principios lean en planta: supermercados de materiales, carros de kit, tableros visuales y células de trabajo que ordenan el flujo y eliminan desperdicios.",
      },
      {
        q: "¿Por dónde conviene empezar?",
        a: "Suele empezarse por el problema más visible —desorden de material, búsquedas, esperas— y diseñar la estructura que lo resuelve, integrándola en una estrategia 5S/Kaizen más amplia.",
      },
      {
        q: "¿Se adaptan a mi proceso actual?",
        a: "Sí. Cada elemento se diseña a medida del flujo, el espacio y los materiales de tu operación, no como un producto genérico de catálogo.",
      },
    ],
    closing:
      "En STEIGERN diseñamos y fabricamos las estructuras que hacen tangible el lean en tu planta: supermercados, carros de kit, gestión visual y células optimizadas, pensadas para eliminar desperdicios y sostener la mejora continua.",
  },
  {
    slug: "desarrollo-de-proyectos",
    num: "07",
    title: "Desarrollo de Proyectos",
    desc: "Acompañamiento integral de ingeniería: desde el concepto y la factibilidad hasta el diseño de detalle, la integración y la puesta en marcha de soluciones industriales a medida.",
    tags: ["Ingeniería", "Integración", "Puesta en Marcha"],
    img: "/assets/images/soluciones/estructuras.png",
    readingTime: "6 min",
    excerpt:
      "Un proyecto industrial exitoso no es un equipo aislado, sino un proceso bien gestionado de principio a fin. Del concepto a la puesta en marcha, cada etapa define si la solución cumplirá lo prometido.",
    sections: [
      {
        heading: "Del concepto a la factibilidad",
        paragraphs: [
          "Todo proyecto comienza con entender el problema: qué se quiere lograr, con qué restricciones de espacio, tiempo y presupuesto. Sobre esa base se desarrolla el concepto y se valida su factibilidad técnica y económica.",
          "Resolver bien esta etapa temprana evita sorpresas costosas más adelante: aquí se decide el rumbo de toda la inversión.",
        ],
      },
      {
        heading: "Diseño de detalle y fabricación",
        paragraphs: [
          "Con el concepto validado, el diseño de detalle define cada componente, plano y especificación. Es el puente entre la idea y el equipo real, donde la ingeniería se traduce en algo fabricable.",
          "La fabricación e integración reúnen mecánica, neumática, eléctrica y control en una solución funcional, probada antes de llegar a planta.",
        ],
      },
      {
        heading: "Integración y puesta en marcha",
        paragraphs: [
          "La puesta en marcha es donde el proyecto demuestra su valor: instalación, ajuste, pruebas y acompañamiento hasta que el sistema produce de forma estable.",
          "Gestionar todas las etapas con un único socio de ingeniería reduce riesgos, evita zonas grises entre proveedores y acorta el tiempo hasta producción.",
        ],
      },
    ],
    benefits: [
      { title: "Un solo socio", desc: "Una sola ingeniería responsable de todas las etapas, sin zonas grises entre proveedores." },
      { title: "Menos riesgo", desc: "La factibilidad temprana evita sorpresas costosas en fases avanzadas." },
      { title: "Solución a medida", desc: "Diseño específico para tu proceso, no un equipo estándar adaptado a la fuerza." },
      { title: "Hasta producción", desc: "Acompañamiento en la puesta en marcha hasta lograr una operación estable." },
    ],
    applications: [
      "Máquinas especiales",
      "Celdas de automatización",
      "Líneas de ensamble completas",
      "Estudios de factibilidad",
      "Integración de equipos",
      "Puesta en marcha y soporte",
    ],
    faqs: [
      {
        q: "¿Qué incluye el desarrollo integral de un proyecto?",
        a: "Abarca todas las etapas: análisis del concepto, estudio de factibilidad, diseño de detalle, fabricación, integración y puesta en marcha, gestionadas por una sola ingeniería.",
      },
      {
        q: "¿Por qué trabajar con un único socio de ingeniería?",
        a: "Porque reduce riesgos y elimina las zonas grises entre proveedores: una sola responsabilidad técnica del concepto a la producción, lo que acorta tiempos y evita conflictos.",
      },
      {
        q: "¿Diseñan soluciones a medida o equipos estándar?",
        a: "A medida. Partimos de tu proceso y requerimientos para diseñar la solución específica, en lugar de forzar un equipo genérico de catálogo.",
      },
    ],
    closing:
      "En STEIGERN acompañamos tu proyecto de principio a fin: concepto, factibilidad, diseño de detalle, fabricación, integración y puesta en marcha. Con {years} años de experiencia, transformamos requerimientos en sistemas funcionales como un único socio de ingeniería.",
  },
];

// ── Acceso por idioma ──────────────────────────────────────────
const byLocale: Record<string, Solution[]> = {
  es: solutions,
  en: solutionsEN,
  de: solutionsDE,
};

/** Devuelve las soluciones en el idioma indicado (cae a español). */
export function getSolutions(locale: string): Solution[] {
  return byLocale[locale] ?? solutions;
}

/** Devuelve una solución por slug en el idioma indicado (cae a español). */
export function getSolution(locale: string, slug: string): Solution | undefined {
  return getSolutions(locale).find((s) => s.slug === slug);
}

// ── Etiquetas de UI traducidas (las páginas no las escriben a mano) ──
export interface SolutionLabels {
  home: string;
  solutions: string;
  industrial: string;
  reading: string;        // sufijo: "5 min {de lectura}"
  benefits: string;
  applications: string;
  faq: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  otherSolutions: string;
  features: string;
  asideText: (title: string) => string;
  asideButton: string;
  // Página índice
  metaTitle: string;
  metaDesc: string;
  heroLine1: string;
  heroLine2: string;
  intro1: string;
  intro2: string;
  notFoundTitle: string;
  notFoundText: string;
}

const labels: Record<string, SolutionLabels> = {
  es: {
    home: "Inicio",
    solutions: "Soluciones",
    industrial: "Ingeniería Industrial",
    reading: "de lectura",
    benefits: "Beneficios clave",
    applications: "Aplicaciones",
    faq: "Preguntas frecuentes",
    ctaEyebrow: "Esto lo hace STEIGERN",
    ctaTitle: "¿Tienes un proyecto en mente?",
    ctaText: "Lo diseñamos, fabricamos e integramos a la medida de tu proceso.",
    ctaButton: "Hablar con un asesor",
    otherSolutions: "Otras Soluciones",
    features: "Características",
    asideText: (t) => `¿Tienes un proyecto de ${t.toLowerCase()}? Cuéntanos tu caso y te asesoramos.`,
    asideButton: "Solicitar información",
    metaTitle: "Soluciones de Ingeniería Industrial",
    metaDesc: "Descubre las soluciones de automatización industrial de STEIGERN: perfiles de aluminio, conveyors, estaciones de trabajo, co-bots, elevación y guías lineales, y soluciones lean.",
    heroLine1: "Soluciones de",
    heroLine2: "Ingeniería",
    intro1: "Diseñamos e integramos dispositivos para el ensamble de componentes industriales, automatizando procesos manuales y líneas de manufactura. Cada solución se adapta al proceso específico del cliente.",
    intro2: "Con {years} años de experiencia y presencia en más de 60 países, somos el socio de ingeniería que transforma ideas en sistemas funcionales, desde el concepto hasta la puesta en marcha.",
    notFoundTitle: "¿No encuentras lo que buscas?",
    notFoundText: "Desarrollamos soluciones a medida para cualquier desafío industrial.",
  },
  en: {
    home: "Home",
    solutions: "Solutions",
    industrial: "Industrial Engineering",
    reading: "read",
    benefits: "Key benefits",
    applications: "Applications",
    faq: "Frequently asked questions",
    ctaEyebrow: "This is what STEIGERN does",
    ctaTitle: "Have a project in mind?",
    ctaText: "We design, manufacture and integrate it to fit your process.",
    ctaButton: "Talk to an advisor",
    otherSolutions: "Other Solutions",
    features: "Features",
    asideText: (t) => `Have a ${t.toLowerCase()} project? Tell us about it and we'll advise you.`,
    asideButton: "Request information",
    metaTitle: "Industrial Engineering Solutions",
    metaDesc: "Discover STEIGERN's industrial automation solutions: aluminum profiles, conveyors, workstations, cobots, lifting and linear guides, and lean solutions.",
    heroLine1: "Engineering",
    heroLine2: "Solutions",
    intro1: "We design and integrate devices for the assembly of industrial components, automating manual processes and manufacturing lines. Each solution is tailored to the client's specific process.",
    intro2: "With {years} years of experience and a presence in more than 60 countries, we are the engineering partner that turns ideas into functional systems, from concept to commissioning.",
    notFoundTitle: "Can't find what you're looking for?",
    notFoundText: "We develop tailored solutions for any industrial challenge.",
  },
  de: {
    home: "Startseite",
    solutions: "Lösungen",
    industrial: "Industrielles Engineering",
    reading: "Lesezeit",
    benefits: "Zentrale Vorteile",
    applications: "Anwendungen",
    faq: "Häufige Fragen",
    ctaEyebrow: "Das macht STEIGERN",
    ctaTitle: "Haben Sie ein Projekt im Kopf?",
    ctaText: "Wir entwerfen, fertigen und integrieren es passend zu Ihrem Prozess.",
    ctaButton: "Mit einem Berater sprechen",
    otherSolutions: "Weitere Lösungen",
    features: "Merkmale",
    asideText: (t) => `Haben Sie ein ${t}-Projekt? Erzählen Sie uns davon, wir beraten Sie.`,
    asideButton: "Informationen anfordern",
    metaTitle: "Lösungen für industrielles Engineering",
    metaDesc: "Entdecken Sie die Industrieautomatisierungslösungen von STEIGERN: Aluminiumprofile, Förderer, Arbeitsplätze, Cobots, Hub- und Linearführungen sowie Lean-Lösungen.",
    heroLine1: "Engineering-",
    heroLine2: "Lösungen",
    intro1: "Wir entwerfen und integrieren Vorrichtungen für die Montage industrieller Komponenten und automatisieren manuelle Prozesse und Fertigungslinien. Jede Lösung ist auf den spezifischen Prozess des Kunden zugeschnitten.",
    intro2: "Mit {years} Jahren Erfahrung und Präsenz in über 60 Ländern sind wir der Engineering-Partner, der Ideen in funktionsfähige Systeme verwandelt – vom Konzept bis zur Inbetriebnahme.",
    notFoundTitle: "Nicht das Richtige gefunden?",
    notFoundText: "Wir entwickeln maßgeschneiderte Lösungen für jede industrielle Herausforderung.",
  },
};

export function getSolutionLabels(locale: string): SolutionLabels {
  return labels[locale] ?? labels.es;
}

// ── SEO: URLs y hreflang por idioma ────────────────────────────
// Fuente única de verdad en lib/seo.ts; se re-exporta para no romper imports.
export { SITE, localePrefix, localizedUrl, hreflangAlternates, buildAlternates } from "@root/lib/seo";
