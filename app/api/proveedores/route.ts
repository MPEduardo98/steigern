// app/api/proveedores/route.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "@root/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// â”€â”€â”€ GET /api/proveedores â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Query params: ?search=&estatus=activo|inactivo|en_revision|bloqueado&categoria_id=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search      = searchParams.get("search")      ?? "";
    const estatus     = searchParams.get("estatus");
    const categoria_id = searchParams.get("categoria_id");

    const conditions: string[] = [];
    const values: (string | number)[] = [];

    if (search) {
      conditions.push("(p.razon_social LIKE ? OR p.nombre_comercial LIKE ? OR p.rfc LIKE ?)");
      const q = `%${search}%`;
      values.push(q, q, q);
    }
    if (estatus) {
      conditions.push("p.estatus = ?");
      values.push(estatus);
    }
    if (categoria_id) {
      conditions.push("p.categoria_id = ?");
      values.push(Number(categoria_id));
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
         p.id, p.codigo_proveedor, p.razon_social, p.nombre_comercial,
         p.rfc, p.pais, p.estado, p.ciudad, p.sitio_web,
         p.estatus, p.calificacion, p.notas,
         c.nombre AS categoria
       FROM proveedores p
       LEFT JOIN categorias_proveedor c ON c.id = p.categoria_id
       ${where}
       ORDER BY p.created_at DESC`,
      values
    );

    return NextResponse.json({ ok: true, data: rows });
  } catch (err) {
    console.error("[GET /api/proveedores]", err);
    return NextResponse.json({ ok: false, error: "Error al obtener proveedores" }, { status: 500 });
  }
}

// â”€â”€â”€ POST /api/proveedores â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      codigo_proveedor, razon_social, nombre_comercial, rfc,
      pais = "México", estado, ciudad, direccion, codigo_postal,
      sitio_web, categoria_id, estatus = "en_revision",
      calificacion, notas,
    } = body;

    if (!codigo_proveedor || !razon_social) {
      return NextResponse.json({ ok: false, error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO proveedores
         (codigo_proveedor, razon_social, nombre_comercial, rfc, pais, estado,
          ciudad, direccion, codigo_postal, sitio_web, categoria_id, estatus,
          calificacion, notas)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        codigo_proveedor, razon_social, nombre_comercial ?? null, rfc ?? null,
        pais, estado ?? null, ciudad ?? null, direccion ?? null,
        codigo_postal ?? null, sitio_web ?? null, categoria_id ?? null,
        estatus, calificacion ?? null, notas ?? null,
      ]
    );

    return NextResponse.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ ok: false, error: "Código de proveedor o RFC duplicado" }, { status: 409 });
    }
    console.error("[POST /api/proveedores]", err);
    return NextResponse.json({ ok: false, error: "Error al crear proveedor" }, { status: 500 });
  }
}
