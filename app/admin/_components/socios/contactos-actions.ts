// app/admin/_components/socios/contactos-actions.ts
// Contactos de clientes y proveedores (personas con quien se habla).
"use server";

import { revalidatePath } from "next/cache";
import { getActionUser } from "@root/lib/session";
import { contactoSchema, erroresPorCampo, guardarContacto, quitarContacto, type TipoSocio } from "@root/lib/socios";

export type ContactoResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };

const RUTA: Record<TipoSocio, string> = { cliente: "/admin/clientes", proveedor: "/admin/proveedores" };

function valido(tipo: unknown, id: unknown): tipo is TipoSocio {
  return (tipo === "cliente" || tipo === "proveedor") && Number.isInteger(id) && (id as number) > 0;
}

export async function saveContacto(
  tipo: TipoSocio,
  socioId: number,
  contactoId: number | null,
  data: { nombre: string; puesto: string; email: string; telefono: string; es_principal: boolean }
): Promise<ContactoResult> {
  if (!(await getActionUser(["administrador"]))) return { ok: false, error: "No tienes permisos para esta acción." };
  if (!valido(tipo, socioId) || (contactoId !== null && !(Number.isInteger(contactoId) && contactoId > 0))) {
    return { ok: false, error: "Datos no válidos." };
  }

  const parsed = contactoSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false, error: "Revisa los campos marcados.", fieldErrors: erroresPorCampo(parsed.error) };
  }

  try {
    const res = await guardarContacto(tipo, socioId, contactoId, parsed.data);
    if (res.ok) revalidatePath(`${RUTA[tipo]}/${socioId}`);
    return res;
  } catch (err) {
    console.error("[saveContacto]", err);
    return { ok: false, error: "No se pudo guardar el contacto. Intenta de nuevo." };
  }
}

export async function deleteContacto(tipo: TipoSocio, socioId: number, contactoId: number): Promise<ContactoResult> {
  if (!(await getActionUser(["administrador"]))) return { ok: false, error: "No tienes permisos para esta acción." };
  if (!valido(tipo, socioId) || !(Number.isInteger(contactoId) && contactoId > 0)) {
    return { ok: false, error: "Datos no válidos." };
  }
  try {
    const borrado = await quitarContacto(tipo, socioId, contactoId);
    revalidatePath(`${RUTA[tipo]}/${socioId}`);
    return borrado ? { ok: true } : { ok: false, error: "Este contacto ya no existe." };
  } catch (err) {
    console.error("[deleteContacto]", err);
    return { ok: false, error: "No se pudo quitar el contacto. Intenta de nuevo." };
  }
}
