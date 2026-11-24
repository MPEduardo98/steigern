// app/admin/proveedores/actions.ts
// Alta y edición de proveedores y sus categorías. Cada acción verifica la
// sesión y el rol: las Server Actions se pueden llamar con un POST directo.
"use server";

import { revalidatePath } from "next/cache";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import { getActionUser } from "@root/lib/session";
import pool from "@root/lib/db";
import {
  camposSocio,
  erroresPorCampo,
  normalizarWeb,
  nulo,
  rfcDuplicado,
  siguienteCodigo,
  validarSocio,
} from "@root/lib/socios";
import type { SocioFormState } from "../_components/socios/tipos";
import type { CrearCategoriaResult } from "../_components/NuevaCategoriaModal";

const schema = z
  .object({
    ...camposSocio,
    categoria: z.string().regex(/^\d*$/, "Categoría no válida"),
    estatus: z.enum(["en_revision", "activo", "inactivo", "bloqueado"], "Estatus no válido"),
  })
  .superRefine(validarSocio);

const KEYS = [
  "razon_social", "nombre_comercial", "rfc", "regimen_fiscal", "email", "telefono",
  "pais", "estado", "ciudad", "direccion", "codigo_postal", "sitio_web",
  "categoria", "dias_credito", "moneda", "estatus", "notas",
] as const;

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/** Crea el proveedor, o lo actualiza si el formulario trae `id`. */
export async function saveProveedor(_prev: SocioFormState, formData: FormData): Promise<SocioFormState> {
  const user = await getActionUser(["administrador"]);
  if (!user) return { error: "No tienes permisos para esta acción." };

  const values = Object.fromEntries(KEYS.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const idRaw = str(formData, "id");
  const id = idRaw ? Number(idRaw) : null;
  if (id !== null && (!Number.isInteger(id) || id <= 0)) return { error: "Proveedor no válido.", values };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { error: "Revisa los campos marcados.", fieldErrors: erroresPorCampo(parsed.error), values };
  }
  const d = parsed.data;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const duplicado = await rfcDuplicado(conn, "proveedor", d.rfc, id);
    if (duplicado) {
      await conn.rollback();
      return {
        error: `El proveedor ${duplicado} ya tiene ese RFC.`,
        fieldErrors: { rfc: `Ya registrado en ${duplicado}` },
        values,
      };
    }

    const campos = [
      d.razon_social, nulo(d.nombre_comercial), nulo(d.rfc), nulo(d.regimen_fiscal),
      nulo(d.email), nulo(d.telefono), d.pais, nulo(d.estado), nulo(d.ciudad), nulo(d.direccion),
      nulo(d.codigo_postal), nulo(normalizarWeb(d.sitio_web)),
      d.categoria ? Number(d.categoria) : null, Number(d.dias_credito), d.moneda, d.estatus, nulo(d.notas),
    ];

    let savedId: number;
    let codigo: string | undefined;
    if (id) {
      // El código no cambia después del alta.
      const [res] = await conn.query<ResultSetHeader>(
        `UPDATE proveedores
            SET razon_social = ?, nombre_comercial = ?, rfc = ?, regimen_fiscal = ?,
                email = ?, telefono = ?, pais = ?, estado = ?, ciudad = ?, direccion = ?,
                codigo_postal = ?, sitio_web = ?, categoria_id = ?, dias_credito = ?, moneda = ?,
                estatus = ?, notas = ?
          WHERE id = ?`,
        [...campos, id]
      );
      if (res.affectedRows === 0) {
        await conn.rollback();
        return { error: "Este proveedor ya no existe.", values };
      }
      savedId = id;
    } else {
      codigo = await siguienteCodigo(conn, "proveedor");
      const [res] = await conn.query<ResultSetHeader>(
        `INSERT INTO proveedores
           (codigo_proveedor, razon_social, nombre_comercial, rfc, regimen_fiscal,
            email, telefono, pais, estado, ciudad, direccion, codigo_postal, sitio_web,
            categoria_id, dias_credito, moneda, estatus, notas, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [codigo, ...campos, user.id]
      );
      savedId = res.insertId;
    }

    await conn.commit();
    revalidatePath("/admin/proveedores");
    return { ok: true, id: savedId, codigo };
  } catch (err) {
    await conn.rollback();
    const e = err as { code?: string };
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      return { error: "La categoría elegida ya no existe.", fieldErrors: { categoria: "Elige otra" }, values };
    }
    if (e.code === "ER_DUP_ENTRY") {
      return { error: "No se pudo asignar el código de proveedor. Intenta de nuevo.", values };
    }
    console.error("[saveProveedor]", err);
    return { error: "No se pudo guardar. Intenta de nuevo.", values };
  } finally {
    conn.release();
  }
}

/**
 * Crea una categoría de proveedor. Si ya existe una con ese nombre (sin
 * distinguir mayúsculas ni acentos) devuelve esa.
 */
export async function crearCategoriaProveedor(nombreRaw: string): Promise<CrearCategoriaResult> {
  if (!(await getActionUser(["administrador"]))) return { ok: false, error: "No tienes permisos para esta acción." };

  const parsed = z
    .string()
    .trim()
    .min(1, "Escribe el nombre de la categoría")
    .max(120, "Máximo 120 caracteres")
    .safeParse(nombreRaw);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const nombre = parsed.data.replace(/\s+/g, " ");

  const buscar = async () => {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, nombre FROM categorias_proveedor WHERE nombre = ? LIMIT 1",
      [nombre]
    );
    return rows[0] ? { id: Number(rows[0].id), nombre: String(rows[0].nombre) } : null;
  };

  try {
    const existente = await buscar();
    if (existente) return { ok: true, categoria: existente, existia: true };
    try {
      const [res] = await pool.query<ResultSetHeader>("INSERT INTO categorias_proveedor (nombre) VALUES (?)", [nombre]);
      revalidatePath("/admin/proveedores");
      return { ok: true, categoria: { id: res.insertId, nombre }, existia: false };
    } catch (err) {
      // Alguien la creó justo al mismo tiempo: se usa esa.
      const recien = (err as { code?: string }).code === "ER_DUP_ENTRY" ? await buscar() : null;
      if (recien) return { ok: true, categoria: recien, existia: true };
      throw err;
    }
  } catch (err) {
    console.error("[crearCategoriaProveedor]", err);
    return { ok: false, error: "No se pudo crear la categoría. Intenta de nuevo." };
  }
}
