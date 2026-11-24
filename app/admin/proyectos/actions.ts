// app/admin/proyectos/actions.ts
// Alta y edición de proyectos. Cada acción verifica la sesión y el rol: las
// Server Actions se pueden llamar con un POST directo.
"use server";

import { revalidatePath } from "next/cache";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import { getActionUser } from "@root/lib/session";
import pool from "@root/lib/db";
import { erroresPorCampo, nulo } from "@root/lib/socios";
import { MONEDAS } from "@root/lib/socios-reglas";
import { ESTADOS_CERRADOS, ESTADOS_PROYECTO, FECHA_REGEX, MONTO_REGEX } from "@root/lib/proyectos-reglas";
import { estatusCliente, siguienteCodigoProyecto } from "@root/lib/proyectos";
import type { SocioFormState } from "../_components/socios/tipos";

const opcional = (max: number) => z.string().trim().max(max, `Máximo ${max} caracteres`);
const monto = z
  .string()
  .trim()
  .transform((v) => v.replace(/[$,\s]/g, ""))
  .refine((v) => v === "" || MONTO_REGEX.test(v), "Número con hasta 2 decimales, sin IVA");
const fecha = z.string().refine((v) => v === "" || FECHA_REGEX.test(v), "Fecha no válida");

const schema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(1, "Escribe el nombre del proyecto")
      .max(190, "Máximo 190 caracteres")
      .transform((v) => v.replace(/\s+/g, " ")),
    cliente: z.string().regex(/^\d+$/, "Elige el cliente"),
    responsable: z.string().regex(/^\d*$/, "Responsable no válido"),
    descripcion: opcional(4000),
    estado: z.string().refine((v) => ESTADOS_PROYECTO.some((e) => e.value === v), "Estado no válido"),
    monto_cotizado: monto,
    anticipo: monto,
    moneda: z.string().refine((v) => MONEDAS.some((m) => m.value === v), "Moneda no válida"),
    fecha_cotizacion: z.string().regex(FECHA_REGEX, "Indica la fecha de cotización"),
    fecha_inicio: fecha,
    fecha_entrega: fecha,
    fecha_cierre: fecha,
    notas: opcional(2000),
  })
  .superRefine((d, ctx) => {
    if (d.fecha_inicio && d.fecha_entrega && d.fecha_entrega < d.fecha_inicio) {
      ctx.addIssue({ code: "custom", path: ["fecha_entrega"], message: "No puede ser antes del inicio" });
    }
    if (d.fecha_inicio && d.fecha_inicio < d.fecha_cotizacion) {
      ctx.addIssue({ code: "custom", path: ["fecha_inicio"], message: "No puede ser antes de la cotización" });
    }
    if (d.fecha_cierre && d.fecha_cierre < d.fecha_cotizacion) {
      ctx.addIssue({ code: "custom", path: ["fecha_cierre"], message: "No puede ser antes de la cotización" });
    }
    if (d.anticipo && d.monto_cotizado && Number(d.anticipo) > Number(d.monto_cotizado)) {
      ctx.addIssue({ code: "custom", path: ["anticipo"], message: "No puede ser mayor que el monto cotizado" });
    }
  });

const KEYS = [
  "nombre", "cliente", "responsable", "descripcion", "estado", "monto_cotizado", "anticipo",
  "moneda", "fecha_cotizacion", "fecha_inicio", "fecha_entrega", "fecha_cierre", "notas",
] as const;

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

const hoyMexico = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City" }).format(new Date());

/** Crea el proyecto, o lo actualiza si el formulario trae `id`. */
export async function saveProyecto(_prev: SocioFormState, formData: FormData): Promise<SocioFormState> {
  const user = await getActionUser(["administrador"]);
  if (!user) return { error: "No tienes permisos para esta acción." };

  const values = Object.fromEntries(KEYS.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const idRaw = str(formData, "id");
  const id = idRaw ? Number(idRaw) : null;
  if (id !== null && (!Number.isInteger(id) || id <= 0)) return { error: "Proyecto no válido.", values };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return { error: "Revisa los campos marcados.", fieldErrors: erroresPorCampo(parsed.error), values };
  }
  const d = parsed.data;
  const clienteId = Number(d.cliente);

  // Terminado o cancelado lleva fecha de cierre (hoy si no se indicó);
  // un proyecto abierto no la lleva.
  const cerrado = ESTADOS_CERRADOS.includes(d.estado as (typeof ESTADOS_CERRADOS)[number]);
  const fechaCierre = cerrado ? d.fecha_cierre || hoyMexico() : null;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Solo se exige cliente activo al asignarlo: un proyecto viejo conserva el suyo.
    let clienteAnterior: number | null = null;
    if (id) {
      const [rows] = await conn.query<RowDataPacket[]>("SELECT cliente_id FROM proyectos WHERE id = ? FOR UPDATE", [id]);
      if (!rows[0]) {
        await conn.rollback();
        return { error: "Este proyecto ya no existe.", values };
      }
      clienteAnterior = Number(rows[0].cliente_id);
    }
    if (clienteId !== clienteAnterior) {
      const estatus = await estatusCliente(conn, clienteId);
      if (estatus !== "activo") {
        await conn.rollback();
        const msg = estatus === null ? "El cliente elegido ya no existe." : `El cliente está ${estatus}; no se le pueden abrir proyectos.`;
        return { error: msg, fieldErrors: { cliente: "Elige un cliente activo" }, values };
      }
    }

    const campos = [
      d.nombre, clienteId, d.responsable ? Number(d.responsable) : null, nulo(d.descripcion), d.estado,
      nulo(d.monto_cotizado), nulo(d.anticipo), d.moneda, d.fecha_cotizacion,
      nulo(d.fecha_inicio), nulo(d.fecha_entrega), fechaCierre, nulo(d.notas),
    ];

    let savedId: number;
    let codigo: string | undefined;
    if (id) {
      await conn.query<ResultSetHeader>(
        `UPDATE proyectos
            SET nombre = ?, cliente_id = ?, responsable_id = ?, descripcion = ?, estado = ?,
                monto_cotizado = ?, anticipo = ?, moneda = ?, fecha_cotizacion = ?,
                fecha_inicio = ?, fecha_entrega = ?, fecha_cierre = ?, notas = ?
          WHERE id = ?`,
        [...campos, id]
      );
      savedId = id;
    } else {
      codigo = await siguienteCodigoProyecto(conn);
      const [res] = await conn.query<ResultSetHeader>(
        `INSERT INTO proyectos
           (codigo_proyecto, nombre, cliente_id, responsable_id, descripcion, estado,
            monto_cotizado, anticipo, moneda, fecha_cotizacion, fecha_inicio, fecha_entrega,
            fecha_cierre, notas, created_by)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [codigo, ...campos, user.id]
      );
      savedId = res.insertId;
    }

    await conn.commit();
    revalidatePath("/admin/proyectos");
    return { ok: true, id: savedId, codigo };
  } catch (err) {
    await conn.rollback();
    const e = err as { code?: string; sqlMessage?: string };
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      return e.sqlMessage?.includes("fk_proyectos_responsable")
        ? { error: "El responsable elegido ya no existe.", fieldErrors: { responsable: "Elige otro" }, values }
        : { error: "El cliente elegido ya no existe.", fieldErrors: { cliente: "Elige otro" }, values };
    }
    if (e.code === "ER_DUP_ENTRY") {
      return { error: "No se pudo asignar el código de proyecto. Intenta de nuevo.", values };
    }
    console.error("[saveProyecto]", err);
    return { error: "No se pudo guardar. Intenta de nuevo.", values };
  } finally {
    conn.release();
  }
}
