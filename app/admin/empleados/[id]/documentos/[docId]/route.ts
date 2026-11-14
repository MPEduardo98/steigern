// app/admin/empleados/[id]/documentos/[docId]/route.ts
// Única forma de obtener un archivo del expediente: revisa la sesión, lo lee de
// la carpeta privada y deja registro en la bitácora.
//   GET …/documentos/12            → se abre en el navegador
//   GET …/documentos/12?descargar=1 → se descarga
import { getActionUser } from "@root/lib/session";
import { getDocumentoArchivo, leerArchivo, registrarBitacora } from "@root/lib/expediente";
import { tipoDocumento } from "@root/lib/expediente-reglas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  const user = await getActionUser(["administrador"]);
  if (!user) return new Response("No encontrado", { status: 404 });
  const session = { user };

  const { id, docId } = await params;
  const empleadoId = Number(id);
  const documentoId = Number(docId);
  if (!Number.isInteger(empleadoId) || empleadoId <= 0 || !Number.isInteger(documentoId) || documentoId <= 0) {
    return new Response("No encontrado", { status: 404 });
  }

  const doc = await getDocumentoArchivo(empleadoId, documentoId);
  if (!doc) return new Response("No encontrado", { status: 404 });

  let contenido: Buffer;
  try {
    contenido = await leerArchivo(doc.archivo);
  } catch (err) {
    console.error("[documento] no se pudo leer", doc.archivo, err);
    return new Response("El archivo no está disponible", { status: 410 });
  }

  const descargar = new URL(request.url).searchParams.has("descargar");
  await registrarBitacora(
    empleadoId,
    session.user.id,
    "descargar_documento",
    `${descargar ? "Descargó" : "Abrió"} ${tipoDocumento(doc.tipo)?.label ?? doc.tipo}: ${doc.nombre_original}`
  );

  const ascii = doc.nombre_original.replace(/[^\x20-\x7e]/g, "_").replace(/"/g, "");
  return new Response(new Uint8Array(contenido), {
    headers: {
      "Content-Type": doc.mime,
      "Content-Length": String(contenido.byteLength),
      "Content-Disposition": `${descargar ? "attachment" : "inline"}; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(doc.nombre_original)}`,
      // Datos personales: que ningún proxy ni el navegador lo guarden en caché.
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}
