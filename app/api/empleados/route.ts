// app/api/empleados/route.ts

import { NextRequest, NextResponse } from "next/server";
import pool from "@root/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// â”€â”€â”€ GET /api/empleados â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Query params: ?search=&activo=1|0&departamento_id=
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const search          = searchParams.get("search")          ?? "";
    const activo          = searchParams.get("activo");
    const departamento_id = searchParams.get("departamento_id");

    const conditions: string[] = [];
    const values: (string | number)[] = [];

    if (search) {
      conditions.push("(e.nombre LIKE ? OR e.apellidos LIKE ? OR e.puesto LIKE ?)");
      const q = `%${search}%`;
      values.push(q, q, q);
    }
    if (activo !== null && activo !== "") {
      conditions.push("e.activo = ?");
      values.push(Number(activo));
    }
    if (departamento_id) {
      conditions.push("e.departamento_id = ?");
      values.push(Number(departamento_id));
    }

    const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
         e.id, e.numero_empleado, e.nombre, e.apellidos, e.email,
         e.telefono, e.puesto, e.fecha_ingreso, e.activo, e.avatar_url,
         d.nombre AS departamento
       FROM empleados e
       LEFT JOIN departamentos d ON d.id = e.departamento_id
       ${where}
       ORDER BY e.created_at DESC`,
      values
    );

    return NextResponse.json({ ok: true, data: rows });
  } catch (err) {
    console.error("[GET /api/empleados]", err);
    return NextResponse.json({ ok: false, error: "Error al obtener empleados" }, { status: 500 });
  }
}

// â”€â”€â”€ POST /api/empleados â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      numero_empleado, nombre, apellidos, email,
      telefono, puesto, departamento_id, fecha_ingreso,
      salario, activo = 1, avatar_url,
    } = body;

    if (!numero_empleado || !nombre || !apellidos || !email || !puesto || !fecha_ingreso) {
      return NextResponse.json({ ok: false, error: "Campos requeridos faltantes" }, { status: 400 });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO empleados
         (numero_empleado, nombre, apellidos, email, telefono, puesto,
          departamento_id, fecha_ingreso, salario, activo, avatar_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [numero_empleado, nombre, apellidos, email, telefono ?? null,
       puesto, departamento_id ?? null, fecha_ingreso, salario ?? null, activo, avatar_url ?? null]
    );

    return NextResponse.json({ ok: true, id: result.insertId }, { status: 201 });
  } catch (err: unknown) {
    const e = err as { code?: string };
    if (e.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ ok: false, error: "NÃºmero de empleado o email duplicado" }, { status: 409 });
    }
    console.error("[POST /api/empleados]", err);
    return NextResponse.json({ ok: false, error: "Error al crear empleado" }, { status: 500 });
  }
}
