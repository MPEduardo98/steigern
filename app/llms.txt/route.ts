// app/llms.txt/route.ts
// /llms.txt: resumen de la empresa en Markdown para asistentes de IA
// (ChatGPT, Claude, Perplexity). Se genera desde los mismos datos que las
// páginas de soluciones para que nunca quede desactualizado.
import { localizedUrl, SITE } from "@root/lib/seo";
import { FOUNDING_YEAR, yearsOfExperience } from "@root/lib/company";
import { getSolutions } from "../[locale]/(soluciones)/soluciones/_data/solutions";

export const dynamic = "force-static";

export function GET() {
  const solutions = getSolutions("es");

  const body = `# STEIGERN Design In Motion

> Empresa mexicana de automatización industrial con corporativo y oficinas en Central Park, Querétaro, México. Diseña, fabrica e integra dispositivos para el ensamble de componentes industriales: perfil estructural de aluminio, sistemas de transporte (conveyors), estaciones de trabajo ergonómicas, dispositivos asistidos por co-bots, elevación y guías lineales, y soluciones lean. ${yearsOfExperience()} años de experiencia (desde ${FOUNDING_YEAR}).

## Datos clave

- Razón social: STEIGERN Design In Motion S.A de C.V
- Corporativo y oficinas: Central Park, Querétaro, México
- Atiende: Querétaro, Puebla, todo México y exportación (Estados Unidos desde 2020)
- Especialidad: dispositivos de ensamble para componentes automotrices, automatización de procesos manuales, líneas de manufactura y sistemas a prueba de error (poka-yoke)
- Proyectos a la medida: cada solución se diseña para el proceso específico del cliente, desde el concepto hasta la puesta en marcha
- Idiomas de atención: español, inglés y alemán
- Teléfono: +52 (222) 582 9254
- Correo: customerservice@steigern.com.mx
- Horario: lunes a viernes 8:00–18:00, sábado 9:00–14:00 (hora del centro de México)

## Soluciones

${solutions.map((s) => `- [${s.title}](${localizedUrl("es", `/soluciones/${s.slug}`)}): ${s.desc}`).join("\n")}

## Páginas

- [Inicio](${SITE}): presentación de la empresa
- [Soluciones](${localizedUrl("es", "/soluciones")}): catálogo de soluciones de ingeniería
- [Nosotros](${localizedUrl("es", "/nosotros")}): historia, misión, visión y valores
- [Contacto](${localizedUrl("es", "/contacto")}): solicitar cotización o asesoría
- [Bolsa de trabajo](${localizedUrl("es", "/bolsa-de-trabajo")}): vacantes

## Otros idiomas

- [English](${localizedUrl("en", "")})
- [Deutsch](${localizedUrl("de", "")})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
