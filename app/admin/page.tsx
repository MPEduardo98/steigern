// app/admin/page.tsx
// Inicio del panel: indicadores de los datos maestros y mapa de módulos.
import type { RowDataPacket } from "mysql2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    ...(isAdmin ? [{ label: "Empleados activos", value: fmt(counts?.empleados) }] : []),
    { label: "Proveedores activos", value: fmt(counts?.proveedores) },
    { label: "Proveedores en revisión", value: fmt(counts?.proveedoresEnRevision) },
  ];

  const modules = navForRole(session.user.role)
    .flatMap((g) => g.items)
    .filter((m) => m.href !== "/admin");

  const firstName = (session.user.name ?? "").split(" ")[0];

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
          Panel de control
        </p>
        <h1 className="heading heading-lg mt-2">
          {firstName ? `Hola, ${firstName}` : "Bienvenido"}
        </h1>
        <div className="mt-3 h-[3px] w-10 bg-accent" />
      </div>

      {!counts && (
        <p className="border-l-[3px] border-accent bg-white px-4 py-3 text-sm text-zinc-600">
          No se pudo conectar con la base de datos, por eso los indicadores aparecen vacíos.
        </p>
      )}

      <section aria-label="Indicadores" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border border-zinc-200 bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-zinc-400">
              {s.label}
            </p>
            <p className="mt-3 text-4xl font-extrabold tabular-nums text-zinc-900">{s.value}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="modulos">
        <h2 id="modulos" className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
          Módulos
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <div key={m.label} className="flex gap-4 border border-zinc-200 bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-zinc-950 text-white">
                <FontAwesomeIcon icon={m.icon} className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-zinc-900">{m.label}</p>
                  {!m.href && (
                    <span className="border border-zinc-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                      Pronto
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
