// app/api/proveedores/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

type Params = { params: Promise<{ id: string }> };

// ─── GET /api/proveedores/[id] ──────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT p.*, c.nombre AS categoria
       FROM proveedores p
       LEFT JOIN categorias_proveedor c ON c.id = p.categoria_id
       WHERE p.id = ?`,
      [id]
    );
    if (!rows.length) return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });

    const [contactos] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM contactos_proveedor WHERE proveedor_id = ? ORDER BY es_principal DESC",
      [id]
    );

    return NextResponse.json({ ok: true, data: { ...rows[0], contactos } });
  } catch (err) {
    console.error("[GET /api/proveedores/[id]]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// ─── PATCH /api/proveedores/[id] ────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body   = await req.json();

    const allowed = [
      "razon_social","nombre_comercial","rfc","pais","estado","ciudad",
      "direccion","codigo_postal","sitio_web","categoria_id",
      "estatus","calificacion","notas",
    ];

    const fields: string[] = [];
    const values: unknown[] = [];

    for (const key of allowed) {
      if (key in body) {
        fields.push(`${key} = ?`);
        values.push(body[key]);
      }
    }

    if (!fields.length) {
      return NextResponse.json({ ok: false, error: "Sin campos para actualizar" }, { status: 400 });
    }

    values.push(id);
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE proveedores SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PATCH /api/proveedores/[id]]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// ─── DELETE /api/proveedores/[id] ───────────────────────────────────────────
// Hard delete — elimina el registro permanentemente
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM proveedores WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/proveedores/[id]]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}