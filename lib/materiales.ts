// lib/materiales.ts
// Lecturas del catálogo de materiales para las pantallas del panel (solo servidor).
import type { RowDataPacket } from "mysql2";
import type { PoolConnection } from "mysql2/promise";
import pool from "@root/lib/db";
import type { EstatusMaterial } from "@root/lib/materiales-reglas";
import type { Moneda } from "@root/lib/socios-reglas";
import { toIso } from "@root/lib/socios";

export type FiltroMaterial = EstatusMaterial | "todos";

export interface MaterialResumen {
  id: number;
  codigo: string;
  descripcion: string;
  numero_parte: string | null;
  categoria: string | null;
  unidad: string;
  ultimo_costo: number | null;
  moneda: Moneda;
  proveedor_id: number | null;
  proveedor: string | null;
  estatus: EstatusMaterial;
}

export interface Material extends MaterialResumen {
  categoria_id: number | null;
  notas: string | null;
  created_at: string;
}

export interface CategoriaMaterial {
  id: number;
  nombre: string;
}

export interface ProveedorOpcion {
  id: number;
  nombre: string;
  codigo: string;
}

const SELECT = `
  SELECT m.*, c.nombre AS categoria,
         COALESCE(p.nombre_comercial, p.razon_social) AS proveedor
    FROM materiales m
    LEFT JOIN categorias_material c ON c.id = m.categoria_id
    LEFT JOIN proveedores p ON p.id = m.proveedor_id`;

function mapResumen(r: RowDataPacket): MaterialResumen {
  return {
    id: Number(r.id),
    codigo: r.codigo_material,
    descripcion: r.descripcion,
    numero_parte: r.numero_parte ?? null,
    categoria: r.categoria ?? null,
    unidad: r.unidad,
    ultimo_costo: r.ultimo_costo === null ? null : Number(r.ultimo_costo),
    moneda: r.moneda as Moneda,
    proveedor_id: r.proveedor_id === null ? null : Number(r.proveedor_id),
    proveedor: r.proveedor ?? null,
    estatus: r.estatus as EstatusMaterial,
  };
}

export async function listMateriales(filtros: {
  q?: string;
  estatus?: FiltroMaterial;
  categoriaId?: number;
}): Promise<MaterialResumen[]> {
  const conditions: string[] = [];
  const values: (string | number)[] = [];

  const q = filtros.q?.trim();
  if (q) {
    // Cada palabra debe aparecer en algún campo: "allen m6" encuentra "Tornillo Allen M6 × 20".
    for (const palabra of q.split(/\s+/).slice(0, 6)) {
      conditions.push("(m.descripcion LIKE ? OR m.codigo_material LIKE ? OR m.numero_parte LIKE ?)");
      const like = `%${palabra}%`;
      values.push(like, like, like);
    }
  }
  if (filtros.estatus && filtros.estatus !== "todos") {
    conditions.push("m.estatus = ?");
    values.push(filtros.estatus);
  }
  if (filtros.categoriaId) {
    conditions.push("m.categoria_id = ?");
    values.push(filtros.categoriaId);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const [rows] = await pool.query<RowDataPacket[]>(`${SELECT} ${where} ORDER BY m.descripcion`, values);
  return rows.map(mapResumen);
}

/** Cuántos hay en cada pestaña (sin aplicar los demás filtros). */
export async function countMateriales(): Promise<Record<FiltroMaterial, number>> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT COALESCE(SUM(estatus = 'activo'), 0)   AS activo,
            COALESCE(SUM(estatus = 'inactivo'), 0) AS inactivo,
            COUNT(*) AS todos
       FROM materiales`
  );
  const r = rows[0];
  return { activo: Number(r.activo), inactivo: Number(r.inactivo), todos: Number(r.todos) };
}

export async function getMaterial(id: number): Promise<Material | null> {
  const [rows] = await pool.query<RowDataPacket[]>(`${SELECT} WHERE m.id = ?`, [id]);
  const r = rows[0];
  if (!r) return null;
  return {
    ...mapResumen(r),
    categoria_id: r.categoria_id === null ? null : Number(r.categoria_id),
    notas: r.notas ?? null,
    created_at: toIso(r.created_at),
  };
}

export async function listCategoriasMaterial(): Promise<CategoriaMaterial[]> {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT id, nombre FROM categorias_material ORDER BY nombre");
  return rows.map((r) => ({ id: Number(r.id), nombre: r.nombre }));
}

/**
 * Proveedores que se pueden elegir como habituales: los que no están
 * bloqueados ni inactivos, más el que ya tenga asignado el material.
 */
export async function listProveedoresParaMaterial(incluirId?: number | null): Promise<ProveedorOpcion[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, codigo_proveedor, COALESCE(nombre_comercial, razon_social) AS nombre
       FROM proveedores
      WHERE estatus IN ('activo', 'en_revision') OR id = ?
      ORDER BY nombre`,
    [incluirId ?? 0]
  );
  return rows.map((r) => ({ id: Number(r.id), nombre: r.nombre, codigo: r.codigo_proveedor }));
}

/** ¿Otro material ya tiene esa descripción? Devuelve su código. */
export async function descripcionDuplicada(
  conn: Pick<PoolConnection, "query">,
  descripcion: string,
  exceptoId: number | null
): Promise<string | null> {
  const [rows] = await conn.query<RowDataPacket[]>(
    "SELECT codigo_material FROM materiales WHERE descripcion = ? AND id <> ? LIMIT 1",
    [descripcion, exceptoId ?? 0]
  );
  return rows[0] ? String(rows[0].codigo_material) : null;
}

/** Siguiente código MAT-0001. FOR UPDATE evita que dos altas tomen el mismo. */
export async function siguienteCodigoMaterial(conn: Pick<PoolConnection, "query">): Promise<string> {
  const [rows] = await conn.query<RowDataPacket[]>(
    `SELECT MAX(CAST(SUBSTRING(codigo_material, 5) AS UNSIGNED)) AS ultimo
       FROM materiales
      WHERE codigo_material REGEXP '^MAT-[0-9]+$'
        FOR UPDATE`
  );
  const siguiente = Number(rows[0]?.ultimo ?? 0) + 1;
  return `MAT-${String(siguiente).padStart(4, "0")}`;
}
