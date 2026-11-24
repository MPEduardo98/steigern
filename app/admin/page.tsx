// app/admin/page.tsx
// Inicio del panel: indicadores de los datos maestros y mapa de módulos.
import type { RowDataPacket } from "mysql2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHandshake, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import pool from "@root/lib/db";
import { requireSession } from "@root/lib/session";
import { navForRole } from "./_components/nav";

export const metadata = { title: "Inicio" };

interface Counts {
  empleados: number;
  proveedores: number;
  proveedoresEnRevision: number;
}

/** Devuelve null si la base de datos no responde, para no tumbar el panel. */
async function getCounts(): Promise<Counts | null> {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT
         (SELECT COUNT(*) FROM empleados   WHERE activo = 1)              AS empleados,
         (SELECT COUNT(*) FROM proveedores WHERE estatus = 'activo')      AS proveedores,
         (SELECT COUNT(*) FROM proveedores WHERE estatus = 'en_revision') AS proveedoresEnRevision`
    );
    const r = rows[0];
    return {
      empleados: Number(r.empleados),
      proveedores: Number(r.proveedores),
      proveedoresEnRevision: Number(r.proveedoresEnRevision),
    };
  } catch (err) {
    console.error("[admin] No se pudieron leer los indicadores", err);
    return null;
  }
}

export default async function AdminHome() {
  // Los layouts no se vuelven a ejecutar en cada navegación: cada página
  // verifica la sesión por su cuenta.
  const session = await requireSession(["administrador", "empleado"]);
  const isAdmin = session.user.role === "administrador";

  const counts = await getCounts();
  const fmt = (n: number | undefined) => (n === undefined ? "—" : n.toLocaleString("es-MX"));

  const stats = [
    ...(isAdmin
      ? [{ label: "Empleados activos", value: fmt(counts?.empleados), note: "Personal dado de alta", icon: faUsers }]
      : []),
    { label: "Proveedores activos", value: fmt(counts?.proveedores), note: "Listos para comprarles", icon: faHandshake },
    {
      label: "Proveedores en revisión",
      value: fmt(counts?.proveedoresEnRevision),
      note: "Pendientes de aprobar",
      icon: faHourglassHalf,
    },
  ];

  const modules = navForRole(session.user.role)
    .flatMap((g) => g.items)
    .filter((m) => m.href !== "/admin");

  const firstName = (session.user.name ?? "").split(" ")[0];
  const today = new Date().toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Mexico_City",
  });

  return (
    <div className="space-y-6 px-8 pb-10 pt-8 max-sm:px-4">
      <p className="text-[14px] text-[#737373]">
        {firstName ? `Hola, ${firstName}` : "Bienvenido"} · <span className="text-[#0a0a0a]">{today}</span>
      </p>

      {!counts && (
        <p className="erp-card border-l-[3px] !border-l-[#e02020] px-4 py-3 text-[13px] text-[#525252]">
          No se pudo conectar con la base de datos, por eso los indicadores aparecen vacíos.
        </p>
      )}

      <section aria-label="Indicadores" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className="erp-card erp-entrar p-5" style={{ animationDelay: `${50 + i * 60}ms` }}>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#737373]">{s.label}</p>
              <FontAwesomeIcon icon={s.icon} className="h-3.5 w-3.5 text-[#e02020]" />
            </div>
            <p className="mt-3 text-[30px] font-semibold leading-none tracking-tight tabular-nums">{s.value}</p>
            <p className="mt-3 text-[12px] text-[#a3a3a3]">{s.note}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="modulos" className="erp-card erp-entrar" style={{ animationDelay: "240ms" }}>
        <div className="px-5 pb-3 pt-4">
          <h2 id="modulos" className="text-[14px] font-semibold">Módulos</h2>
          <p className="text-[12px] text-[#a3a3a3]">Lo que ya puedes usar y lo que viene</p>
        </div>
        <ul className="grid gap-px border-t border-[#ebebeb] bg-[#ebebeb] sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <li key={m.label} className="flex gap-3.5 bg-white p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fdecec] text-[#c41a1a]">
                <FontAwesomeIcon icon={m.icon} className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-[13.5px] font-medium">{m.label}</p>
                  {!m.href && (
                    <span className="rounded-full bg-[#f5f5f5] px-2 py-px text-[10.5px] font-medium text-[#737373]">
                      Pronto
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-[#737373]">{m.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
