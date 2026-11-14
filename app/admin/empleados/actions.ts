// app/admin/empleados/actions.ts
// Alta, edición y baja de empleados. Cada acción verifica la sesión y el rol:
// las Server Actions se pueden llamar con un POST directo, no solo desde el panel.
"use server";

import { revalidatePath } from "next/cache";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import { getActionUser } from "@root/lib/session";
import pool from "@root/lib/db";
import { nextNumeroEmpleado } from "@root/lib/empleados";

export interface EmpleadoFormState {
  ok?: boolean;
  id?: number;
  /** Número asignado en el alta. */
  numero?: string;
  error?: string;
  fieldErrors?: Record<string, string>;
  /** Lo que se envió, para no perderlo si hay errores. */
  values?: Record<string, string>;
}

const texto = (max: number, msg = "Este campo es obligatorio") =>
  z.string().trim().min(1, msg).max(max, `Máximo ${max} caracteres`);

const schema = z.object({
  nombre: texto(120),
  apellidos: texto(120),
  email: z.string().trim().toLowerCase().pipe(z.email("Correo no válido")),
  telefono: z.string().trim().max(40, "Máximo 40 caracteres"),
  puesto: texto(120),
  departamento: z.string().regex(/^\d*$/, "Departamento no válido"),
  fecha_ingreso: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha no válida"),
  salario: z
    .string()
    .trim()
    .refine((v) => v === "" || (/^\d+(\.\d{1,2})?$/.test(v) && Number(v) < 1e10), "Monto no válido"),
});

async function isAdmin() {
  return Boolean(await getActionUser(["administrador"]));
}

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

/** Crea el empleado, o lo actualiza si el formulario trae `id`. */
export async function saveEmpleado(
  _prev: EmpleadoFormState,
  formData: FormData
): Promise<EmpleadoFormState> {
  if (!(await isAdmin())) return { error: "No tienes permisos para esta acción." };

  const keys = [
    "nombre", "apellidos", "email", "telefono", "puesto",
    "departamento", "fecha_ingreso", "salario",
  ] as const;
  const values = Object.fromEntries(keys.map((k) => [k, str(formData, k)])) as Record<string, string>;
  const idRaw = str(formData, "id");
  const id = idRaw ? Number(idRaw) : null;

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      fieldErrors[key] ??= issue.message;
    }
    return { error: "Revisa los campos marcados.", fieldErrors, values };
  }
  const d = parsed.data;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const departamentoId = d.departamento ? Number(d.departamento) : null;

    const salario = d.salario === "" ? null : d.salario;
    const telefono = d.telefono || null;
    let savedId: number;
    let numeroAsignado: string | undefined;

    if (id) {
      // El número de empleado no cambia después del alta.
      const [res] = await conn.query<ResultSetHeader>(
        `UPDATE empleados
            SET nombre = ?, apellidos = ?, email = ?, telefono = ?, puesto = ?,
                departamento_id = ?, fecha_ingreso = ?, salario = ?
          WHERE id = ?`,
        [d.nombre, d.apellidos, d.email, telefono, d.puesto, departamentoId, d.fecha_ingreso, salario, id]
      );
      if (res.affectedRows === 0) {
        await conn.rollback();
        return { error: "Este empleado ya no existe.", values };
      }
      savedId = id;
    } else {
      // El número lo asigna el sistema; el formulario no lo envía.
      const numero = await nextNumeroEmpleado(conn);
      const [res] = await conn.query<ResultSetHeader>(
        `INSERT INTO empleados
           (numero_empleado, nombre, apellidos, email, telefono, puesto,
            departamento_id, fecha_ingreso, salario, activo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
        [numero, d.nombre, d.apellidos, d.email, telefono, d.puesto,
         departamentoId, d.fecha_ingreso, salario]
      );
      savedId = res.insertId;
      numeroAsignado = numero;
    }

    await conn.commit();
    revalidatePath("/admin/empleados");
    revalidatePath("/admin");
    return { ok: true, id: savedId, numero: numeroAsignado };
  } catch (err) {
    await conn.rollback();
    const e = err as { code?: string; sqlMessage?: string };
    if (e.code === "ER_DUP_ENTRY" && e.sqlMessage?.includes("uq_empleados_email")) {
      return {
        error: "Ya existe un empleado con ese correo.",
        fieldErrors: { email: "Este correo ya está registrado" },
        values,
      };
    }
    if (e.code === "ER_DUP_ENTRY") {
      // Otra alta tomó el mismo número al mismo tiempo: basta con reintentar.
      return { error: "No se pudo asignar el número de empleado. Intenta de nuevo.", values };
    }
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      return { error: "El departamento elegido ya no existe.", fieldErrors: { departamento: "Elige otro" }, values };
    }
    console.error("[saveEmpleado]", err);
    return { error: "No se pudo guardar. Intenta de nuevo.", values };
  } finally {
    conn.release();
  }
}

/** Baja o reactivación. No se borra el registro: su historial se conserva. */
export async function setEmpleadoActivo(
  id: number,
  activo: boolean
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdmin())) return { ok: false, error: "No tienes permisos para esta acción." };
  if (!Number.isInteger(id) || id <= 0) return { ok: false, error: "Empleado no válido." };

  try {
    const [res] = await pool.query<ResultSetHeader>(
      "UPDATE empleados SET activo = ? WHERE id = ?",
      [activo ? 1 : 0, id]
    );
    if (res.affectedRows === 0) return { ok: false, error: "Este empleado ya no existe." };
    revalidatePath("/admin/empleados");
    revalidatePath("/admin");
    return { ok: true };
  } catch (err) {
    console.error("[setEmpleadoActivo]", err);
    return { ok: false, error: "No se pudo actualizar. Intenta de nuevo." };
  }
}

export type CrearDepartamentoResult =
  | { ok: true; departamento: { id: number; nombre: string }; existia: boolean }
  | { ok: false; error: string };

/**
 * Crea un departamento. Si ya existe uno con ese nombre (sin distinguir
 * mayúsculas ni acentos, por la intercalación de la tabla) devuelve ese.
 */
export async function crearDepartamento(nombreRaw: string): Promise<CrearDepartamentoResult> {
  if (!(await isAdmin())) return { ok: false, error: "No tienes permisos para esta acción." };

  const parsed = texto(120, "Escribe el nombre del departamento").safeParse(nombreRaw);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };
  const nombre = parsed.data.replace(/\s+/g, " ");

  const buscar = async () => {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, nombre FROM departamentos WHERE nombre = ? LIMIT 1",
      [nombre]
    );
    return rows[0] ? { id: Number(rows[0].id), nombre: String(rows[0].nombre) } : null;
  };

  try {
    const existente = await buscar();
    if (existente) return { ok: true, departamento: existente, existia: true };

    try {
      const [res] = await pool.query<ResultSetHeader>("INSERT INTO departamentos (nombre) VALUES (?)", [nombre]);
      revalidatePath("/admin/empleados");
      return { ok: true, departamento: { id: res.insertId, nombre }, existia: false };
    } catch (err) {
      // Alguien lo creó justo al mismo tiempo: se usa ese.
      const recien = (err as { code?: string }).code === "ER_DUP_ENTRY" ? await buscar() : null;
      if (recien) return { ok: true, departamento: recien, existia: true };
      throw err;
    }
  } catch (err) {
    console.error("[crearDepartamento]", err);
    return { ok: false, error: "No se pudo crear el departamento. Intenta de nuevo." };
  }
}
