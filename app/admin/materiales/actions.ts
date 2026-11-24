// app/admin/materiales/actions.ts
// Alta y edición de materiales y sus categorías. Cada acción verifica la
// sesión y el rol: las Server Actions se pueden llamar con un POST directo.
"use server";

import { revalidatePath } from "next/cache";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import { getActionUser } from "@root/lib/session";
import pool from "@root/lib/db";
import { erroresPorCampo, nulo } from "@root/lib/socios";
import { MONEDAS } from "@root/lib/socios-reglas";
import { COSTO_REGEX, UNIDADES } from "@root/lib/materiales-reglas";
import { descripcionDuplicada, siguienteCodigoMaterial } from "@root/lib/materiales";
import type { SocioFormState } from "../_components/socios/tipos";
import type { CrearCategoriaResult } from "../_components/NuevaCategoriaModal";

const opcional = (max: number) => z.string().trim().max(max, `Máximo ${max} caracteres`);
const idOpcional = (msg: string) => z.string().regex(/^\d*$/, msg);

const schema = z.object({
  descripcion: z
    .string()
    .trim()
    .min(1, "Escribe cómo se pide el material")
    .max(250, "Máximo 250 caracteres")
    .transform((v) => v.replace(/\s+/g, " ")),
  numero_parte: opcional(80),
  categoria: idOpcional("Categoría no válida"),
  unidad: z.string().refine((v) => UNIDADES.some((u) => u.value === v), "Unidad no válida"),
  ultimo_costo: z
    .string()
    .trim()
    .transform((v) => v.replace(/[$,\s]/g, ""))
    .refine((v) => v === "" || COSTO_REGEX.test(v), "Número con hasta 4 decimales, sin IVA"),
  moneda: z.string().refine((v) => MONEDAS.some((m) => m.value === v), "Moneda no válida"),
  proveedor: idOpcional("Proveedor no válido"),
  estatus: z.enum(["activo", "inactivo"], "Estatus no válido"),
  notas: opcional(2000),
});

const KEYS = [
  "descripcion", "numero_parte", "categoria", "unidad", "ultimo_costo",
  "moneda", "proveedor", "estatus", "notas",
] as const;

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/** Crea el material, o lo actualiza si el formulario trae `id`. */
export async function saveMaterial(_prev: SocioFormState, formData: FormData): Promise<SocioFormState> {
  const user = await getActionUser(["administrador"]);
  if (!user) return { error: "No tienes permisos para esta acción." };

  const values = Object.fromEntries(KEYS.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const idRaw = str(formData, "id");
  const id = idRaw ? Number(idRaw) : null;
  if (id !== null && (!Number.isInteger(id) || id <= 0)) return { error: "Material no válido.", values };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { error: "Revisa los campos marcados.", fieldErrors: erroresPorCampo(parsed.error), values };
  }
  const d = parsed.data;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const duplicado = await descripcionDuplicada(conn, d.descripcion, id);
    if (duplicado) {
      await conn.rollback();
      return {
        error: `El material ${duplicado} ya tiene esa descripción.`,
        fieldErrors: { descripcion: `Ya registrado como ${duplicado}` },
        values,
      };
    }

    const campos = [
      d.descripcion, nulo(d.numero_parte), d.categoria ? Number(d.categoria) : null, d.unidad,
      d.ultimo_costo === "" ? null : d.ultimo_costo, d.moneda,
      d.proveedor ? Number(d.proveedor) : null, d.estatus, nulo(d.notas),
    ];

    let savedId: number;
    let codigo: string | undefined;
    if (id) {
      // El código no cambia después del alta.
      const [res] = await conn.query<ResultSetHeader>(
        `UPDATE materiales
            SET descripcion = ?, numero_parte = ?, categoria_id = ?, unidad = ?, ultimo_costo = ?,
                moneda = ?, proveedor_id = ?, estatus = ?, notas = ?
          WHERE id = ?`,
        [...campos, id]
      );
      if (res.affectedRows === 0) {
        await conn.rollback();
        return { error: "Este material ya no existe.", values };
      }
      savedId = id;
    } else {
      codigo = await siguienteCodigoMaterial(conn);
      const [res] = await conn.query<ResultSetHeader>(
        `INSERT INTO materiales
           (codigo_material, descripcion, numero_parte, categoria_id, unidad, ultimo_costo,
            moneda, proveedor_id, estatus, notas, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [codigo, ...campos, user.id]
      );
      savedId = res.insertId;
    }

    await conn.commit();
    revalidatePath("/admin/materiales");
    return { ok: true, id: savedId, codigo };
  } catch (err) {
    await conn.rollback();
    const e = err as { code?: string; sqlMessage?: string };
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      return e.sqlMessage?.includes("fk_materiales_proveedor")
        ? { error: "El proveedor elegido ya no existe.", fieldErrors: { proveedor: "Elige otro" }, values }
        : { error: "La categoría elegida ya no existe.", fieldErrors: { categoria: "Elige otra" }, values };
    }
    if (e.code === "ER_DUP_ENTRY") {
      return e.sqlMessage?.includes("uq_materiales_descripcion")
        ? { error: "Otro material ya tiene esa descripción.", fieldErrors: { descripcion: "Ya existe" }, values }
        : { error: "No se pudo asignar el código de material. Intenta de nuevo.", values };
    }
    console.error("[saveMaterial]", err);
    return { error: "No se pudo guardar. Intenta de nuevo.", values };
  } finally {
    conn.release();
  }
}

/**
 * Crea una categoría de material. Si ya existe una con ese nombre (sin
 * distinguir mayúsculas ni acentos) devuelve esa.
 */
export async function crearCategoriaMaterial(nombreRaw: string): Promise<CrearCategoriaResult> {
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
      "SELECT id, nombre FROM categorias_material WHERE nombre = ? LIMIT 1",
      [nombre]
    );
    return rows[0] ? { id: Number(rows[0].id), nombre: String(rows[0].nombre) } : null;
  };

  try {
    const existente = await buscar();
    if (existente) return { ok: true, categoria: existente, existia: true };
    try {
      const [res] = await pool.query<ResultSetHeader>("INSERT INTO categorias_material (nombre) VALUES (?)", [nombre]);
      revalidatePath("/admin/materiales");
      return { ok: true, categoria: { id: res.insertId, nombre }, existia: false };
    } catch (err) {
      // Alguien la creó justo al mismo tiempo: se usa esa.
      const recien = (err as { code?: string }).code === "ER_DUP_ENTRY" ? await buscar() : null;
      if (recien) return { ok: true, categoria: recien, existia: true };
      throw err;
    }
  } catch (err) {
    console.error("[crearCategoriaMaterial]", err);
    return { ok: false, error: "No se pudo crear la categoría. Intenta de nuevo." };
  }
}
