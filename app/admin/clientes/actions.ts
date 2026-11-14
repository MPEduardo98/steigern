// app/admin/clientes/actions.ts
// Alta y edición de clientes. Cada acción verifica la sesión y el rol:
// las Server Actions se pueden llamar con un POST directo, no solo desde el panel.
"use server";

import { revalidatePath } from "next/cache";
import type { ResultSetHeader } from "mysql2";
import { z } from "zod";
import { getActionUser } from "@root/lib/session";
import pool from "@root/lib/db";
import { USOS_CFDI } from "@root/lib/socios-reglas";
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

const schema = z
  .object({
    ...camposSocio,
    uso_cfdi: z.string().refine((v) => v === "" || USOS_CFDI.some((u) => u.value === v), "Uso de CFDI no válido"),
    limite_credito: z
      .string()
      .trim()
      .refine((v) => v === "" || (/^\d+(\.\d{1,2})?$/.test(v) && Number(v) < 1e12), "Monto no válido"),
    estatus: z.enum(["activo", "inactivo", "bloqueado"], "Estatus no válido"),
  })
  .superRefine(validarSocio);

const KEYS = [
  "razon_social", "nombre_comercial", "rfc", "regimen_fiscal", "uso_cfdi", "email", "telefono",
  "pais", "estado", "ciudad", "direccion", "codigo_postal", "sitio_web",
  "dias_credito", "limite_credito", "moneda", "estatus", "notas",
] as const;

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/** Crea el cliente, o lo actualiza si el formulario trae `id`. */
export async function saveCliente(_prev: SocioFormState, formData: FormData): Promise<SocioFormState> {
  const user = await getActionUser(["administrador"]);
  if (!user) return { error: "No tienes permisos para esta acción." };

  const values = Object.fromEntries(KEYS.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const idRaw = str(formData, "id");
  const id = idRaw ? Number(idRaw) : null;
  if (id !== null && (!Number.isInteger(id) || id <= 0)) return { error: "Cliente no válido.", values };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { error: "Revisa los campos marcados.", fieldErrors: erroresPorCampo(parsed.error), values };
  }
  const d = parsed.data;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const duplicado = await rfcDuplicado(conn, "cliente", d.rfc, id);
    if (duplicado) {
      await conn.rollback();
      return {
        error: `El cliente ${duplicado} ya tiene ese RFC.`,
        fieldErrors: { rfc: `Ya registrado en ${duplicado}` },
        values,
      };
    }

    const campos = [
      d.razon_social, nulo(d.nombre_comercial), nulo(d.rfc), nulo(d.regimen_fiscal), nulo(d.uso_cfdi),
      nulo(d.email), nulo(d.telefono), d.pais, nulo(d.estado), nulo(d.ciudad), nulo(d.direccion),
      nulo(d.codigo_postal), nulo(normalizarWeb(d.sitio_web)), Number(d.dias_credito),
      nulo(d.limite_credito), d.moneda, d.estatus, nulo(d.notas),
    ];

    let savedId: number;
    let codigo: string | undefined;
    if (id) {
      // El código no cambia después del alta.
      const [res] = await conn.query<ResultSetHeader>(
        `UPDATE clientes
            SET razon_social = ?, nombre_comercial = ?, rfc = ?, regimen_fiscal = ?, uso_cfdi = ?,
                email = ?, telefono = ?, pais = ?, estado = ?, ciudad = ?, direccion = ?,
                codigo_postal = ?, sitio_web = ?, dias_credito = ?, limite_credito = ?, moneda = ?,
                estatus = ?, notas = ?
          WHERE id = ?`,
        [...campos, id]
      );
      if (res.affectedRows === 0) {
        await conn.rollback();
        return { error: "Este cliente ya no existe.", values };
      }
      savedId = id;
    } else {
      codigo = await siguienteCodigo(conn, "cliente");
      const [res] = await conn.query<ResultSetHeader>(
        `INSERT INTO clientes
           (codigo_cliente, razon_social, nombre_comercial, rfc, regimen_fiscal, uso_cfdi,
            email, telefono, pais, estado, ciudad, direccion, codigo_postal, sitio_web,
            dias_credito, limite_credito, moneda, estatus, notas, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [codigo, ...campos, user.id]
      );
      savedId = res.insertId;
    }

    await conn.commit();
    revalidatePath("/admin/clientes");
    return { ok: true, id: savedId, codigo };
  } catch (err) {
    await conn.rollback();
    if ((err as { code?: string }).code === "ER_DUP_ENTRY") {
      // Otra alta tomó el mismo código al mismo tiempo: basta con reintentar.
      return { error: "No se pudo asignar el código de cliente. Intenta de nuevo.", values };
    }
    console.error("[saveCliente]", err);
    return { error: "No se pudo guardar. Intenta de nuevo.", values };
  } finally {
    conn.release();
  }
}
