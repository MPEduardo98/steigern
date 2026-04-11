// app/api/empleados/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

type Params = { params: Promise<{ id: string }> };

// ─── GET /api/empleados/[id] ────────────────────────────────────────────────
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT e.*, d.nombre AS departamento
       FROM empleados e
       LEFT JOIN departamentos d ON d.id = e.departamento_id
       WHERE e.id = ?`,
      [id]
    );
    if (!rows.length) return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });
    return NextResponse.json({ ok: true, data: rows[0] });
  } catch (err) {
    console.error("[GET /api/empleados/[id]]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// ─── PATCH /api/empleados/[id] ──────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body   = await req.json();

    const allowed = [
      "nombre","apellidos","email","telefono","puesto",
      "departamento_id","fecha_ingreso","salario","activo","avatar_url",
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
      `UPDATE empleados SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[PATCH /api/empleados/[id]]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}

// ─── DELETE /api/empleados/[id] ─────────────────────────────────────────────
// Soft delete — sets activo = 0
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE empleados SET activo = 0 WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json({ ok: false, error: "No encontrado" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/empleados/[id]]", err);
    return NextResponse.json({ ok: false, error: "Error interno" }, { status: 500 });
  }
}