// lib/socios.ts
// Lo que comparten clientes y proveedores en el servidor: validación de los
// datos fiscales y de domicilio, el RFC duplicado y los contactos.
// Clientes y proveedores son catálogos separados; esto solo evita repetir código.
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import { z } from "zod";
import pool from "@root/lib/db";
import { MONEDAS, REGIMENES_FISCALES, RFC_REGEX, esRfcGenerico } from "@root/lib/socios-reglas";

export type TipoSocio = "cliente" | "proveedor";

/** Tablas por tipo. Nunca se arma un nombre de tabla con texto del usuario. */
const TABLAS = {
  cliente: { tabla: "clientes", contactos: "contactos_cliente", fk: "cliente_id" },
  proveedor: { tabla: "proveedores", contactos: "contactos_proveedor", fk: "proveedor_id" },
} as const;

// ── Validación ─────────────────────────────────────────────────────────────

const texto = (max: number, msg = "Este campo es obligatorio") =>
  z.string().trim().min(1, msg).max(max, `Máximo ${max} caracteres`);
const opcional = (max: number) => z.string().trim().max(max, `Máximo ${max} caracteres`);

/** Campos fiscales, de contacto y domicilio comunes a clientes y proveedores. */
export const camposSocio = {
  razon_social: texto(190),
  nombre_comercial: opcional(190),
  rfc: z
    .string()
    .trim()
    .toUpperCase()
    .refine((v) => v === "" || RFC_REGEX.test(v), "RFC no válido (12 caracteres moral, 13 física)"),
  regimen_fiscal: z
    .string()
    .refine((v) => v === "" || REGIMENES_FISCALES.some((r) => r.value === v), "Régimen no válido"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((v) => v === "" || z.email().safeParse(v).success, "Correo no válido")
    .refine((v) => v.length <= 190, "Máximo 190 caracteres"),
  telefono: opcional(40),
  pais: texto(80),
  estado: opcional(80),
  ciudad: opcional(80),
  direccion: opcional(300),
  codigo_postal: opcional(12),
  sitio_web: opcional(300).refine(
    (v) => v === "" || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v),
    "Dirección web no válida"
  ),
  dias_credito: z
    .string()
    .trim()
    .refine((v) => /^\d{1,3}$/.test(v) && Number(v) <= 365, "Entre 0 y 365 días"),
  moneda: z.string().refine((v) => MONEDAS.some((m) => m.value === v), "Moneda no válida"),
  notas: opcional(2000),
};

/** Reglas que dependen de más de un campo. Se usa en `.superRefine` del esquema. */
export function validarSocio(
  d: { pais: string; codigo_postal: string; rfc: string; regimen_fiscal: string },
  ctx: z.RefinementCtx
) {
  const mexico = d.pais.trim().toLowerCase() === "méxico" || d.pais.trim().toLowerCase() === "mexico";
  if (mexico && d.codigo_postal && !/^\d{5}$/.test(d.codigo_postal)) {
    ctx.addIssue({ code: "custom", path: ["codigo_postal"], message: "El código postal son 5 dígitos" });
  }
  // Persona moral = RFC de 12; física = 13. El régimen tiene que corresponder.
  if (d.rfc && d.regimen_fiscal && !esRfcGenerico(d.rfc)) {
    const regimen = REGIMENES_FISCALES.find((r) => r.value === d.regimen_fiscal);
    const moral = d.rfc.length === 12;
    if (regimen && (moral ? !regimen.moral : !regimen.fisica)) {
      ctx.addIssue({
        code: "custom",
        path: ["regimen_fiscal"],
        message: moral ? "Ese régimen es de personas físicas" : "Ese régimen es de personas morales",
      });
    }
  }
}

/** Primer error de cada campo, para mostrarlo junto al campo. */
export function erroresPorCampo(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) out[String(issue.path[0])] ??= issue.message;
  return out;
}

/** "" → null para guardar en columnas opcionales. */
export const nulo = (v: string) => (v === "" ? null : v);

/** Agrega https:// si se escribió solo el dominio. */
export const normalizarWeb = (v: string) => (v && !/^https?:\/\//i.test(v) ? `https://${v}` : v);

/**
 * ¿Ya hay otro registro con ese RFC? Los genéricos (público en general,
 * extranjeros) se pueden repetir. Devuelve el código del que ya lo tiene.
 */
export async function rfcDuplicado(
  conn: Pick<PoolConnection, "query">,
  tipo: TipoSocio,
  rfc: string,
  exceptoId: number | null
): Promise<string | null> {
  if (!rfc || esRfcGenerico(rfc)) return null;
  const { tabla } = TABLAS[tipo];
  const codigo = tipo === "cliente" ? "codigo_cliente" : "codigo_proveedor";
  const [rows] = await conn.query<RowDataPacket[]>(
    `SELECT ${codigo} AS codigo FROM ${tabla} WHERE rfc = ? AND id <> ? LIMIT 1`,
    [rfc, exceptoId ?? 0]
  );
  return rows[0] ? String(rows[0].codigo) : null;
}

/**
 * Siguiente código (CLI-0001, PRV-0001…). Lo asigna el sistema dentro de la
 * transacción del alta; FOR UPDATE evita que dos altas tomen el mismo.
 */
export async function siguienteCodigo(conn: Pick<PoolConnection, "query">, tipo: TipoSocio): Promise<string> {
  const { tabla } = TABLAS[tipo];
  const [columna, prefijo] = tipo === "cliente" ? ["codigo_cliente", "CLI"] : ["codigo_proveedor", "PRV"];
  const [rows] = await conn.query<RowDataPacket[]>(
    `SELECT MAX(CAST(SUBSTRING(${columna}, 5) AS UNSIGNED)) AS ultimo
       FROM ${tabla}
      WHERE ${columna} REGEXP '^${prefijo}-[0-9]+$'
        FOR UPDATE`
  );
  const siguiente = Number(rows[0]?.ultimo ?? 0) + 1;
  return `${prefijo}-${String(siguiente).padStart(4, "0")}`;
}

// ── Contactos ──────────────────────────────────────────────────────────────

export interface Contacto {
  id: number;
  nombre: string;
  puesto: string | null;
  email: string | null;
  telefono: string | null;
  es_principal: boolean;
}

export const contactoSchema = z.object({
  nombre: texto(190, "Escribe el nombre"),
  puesto: opcional(120),
  email: camposSocio.email,
  telefono: opcional(40),
  es_principal: z.boolean(),
});
export type ContactoInput = z.infer<typeof contactoSchema>;

export async function listContactos(tipo: TipoSocio, socioId: number): Promise<Contacto[]> {
  const { contactos, fk } = TABLAS[tipo];
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, nombre, puesto, email, telefono, es_principal
       FROM ${contactos} WHERE ${fk} = ?
      ORDER BY es_principal DESC, nombre`,
    [socioId]
  );
  return rows.map((r) => ({
    id: Number(r.id),
    nombre: r.nombre,
    puesto: r.puesto ?? null,
    email: r.email ?? null,
    telefono: r.telefono ?? null,
    es_principal: Boolean(r.es_principal),
  }));
}

/**
 * Crea o actualiza un contacto. Solo puede haber un principal: al marcar uno,
 * los demás dejan de serlo. El primer contacto queda como principal.
 */
export async function guardarContacto(
  tipo: TipoSocio,
  socioId: number,
  contactoId: number | null,
  d: ContactoInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { tabla, contactos, fk } = TABLAS[tipo];
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [socio] = await conn.query<RowDataPacket[]>(`SELECT id FROM ${tabla} WHERE id = ? FOR UPDATE`, [socioId]);
    if (!socio.length) {
      await conn.rollback();
      return { ok: false, error: "Este registro ya no existe." };
    }

    const [[{ n }]] = await conn.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS n FROM ${contactos} WHERE ${fk} = ? AND id <> ?`,
      [socioId, contactoId ?? 0]
    );
    const principal = d.es_principal || Number(n) === 0;
    if (principal) {
      await conn.query(`UPDATE ${contactos} SET es_principal = 0 WHERE ${fk} = ?`, [socioId]);
    }

    const valores = [d.nombre, nulo(d.puesto), nulo(d.email), nulo(d.telefono), principal ? 1 : 0];
    if (contactoId) {
      const [res] = await conn.query<ResultSetHeader>(
        `UPDATE ${contactos} SET nombre = ?, puesto = ?, email = ?, telefono = ?, es_principal = ?
          WHERE id = ? AND ${fk} = ?`,
        [...valores, contactoId, socioId]
      );
      if (res.affectedRows === 0) {
        await conn.rollback();
        return { ok: false, error: "Este contacto ya no existe." };
      }
    } else {
      await conn.query(
        `INSERT INTO ${contactos} (${fk}, nombre, puesto, email, telefono, es_principal) VALUES (?, ?, ?, ?, ?, ?)`,
        [socioId, ...valores]
      );
    }

    // Si se le quitó el principal al único que lo era, nadie queda como principal: se toma el primero.
    await conn.query(
      `UPDATE ${contactos} SET es_principal = 1
        WHERE ${fk} = ? AND NOT EXISTS (SELECT 1 FROM (SELECT id FROM ${contactos} WHERE ${fk} = ? AND es_principal = 1) t)
        ORDER BY id LIMIT 1`,
      [socioId, socioId]
    );

    await conn.commit();
    return { ok: true };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export async function quitarContacto(tipo: TipoSocio, socioId: number, contactoId: number): Promise<boolean> {
  const { contactos, fk } = TABLAS[tipo];
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.query<ResultSetHeader>(`DELETE FROM ${contactos} WHERE id = ? AND ${fk} = ?`, [
      contactoId,
      socioId,
    ]);
    // Si era el principal, el siguiente toma su lugar.
    await conn.query(
      `UPDATE ${contactos} SET es_principal = 1
        WHERE ${fk} = ? AND NOT EXISTS (SELECT 1 FROM (SELECT id FROM ${contactos} WHERE ${fk} = ? AND es_principal = 1) t)
        ORDER BY id LIMIT 1`,
      [socioId, socioId]
    );
    await conn.commit();
    return res.affectedRows > 0;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

/** DATETIME/TIMESTAMP → ISO, para mostrar fechas de alta. */
export function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}
