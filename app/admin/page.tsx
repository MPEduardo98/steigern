// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NuevoEmpleadoModal from "./components/NuevoEmpleadoModal";
import NuevoProveedorModal from "./components/NuevoProveedorModal";

interface Empleado {
  id: number; numero_empleado: string; nombre: string; apellidos: string;
  puesto: string; departamento?: string; fecha_ingreso: string; activo: number;
}
interface Proveedor {
  id: number; codigo_proveedor: string; razon_social: string;
  categoria?: string; estatus: string; calificacion?: number;
}

const statusColors: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactivo: "bg-zinc-100 text-zinc-500 border-zinc-200",
  en_revision: "bg-amber-50 text-amber-700 border-amber-200",
  bloqueado: "bg-red-50 text-red-700 border-red-200",
};
const statusLabel: Record<string, string> = {
  activo: "Activo", inactivo: "Inactivo", en_revision: "En Revisión", bloqueado: "Bloqueado",
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= n ? "#E02020" : "none"} stroke={i <= n ? "#E02020" : "#d4d4d8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const hue = (name.charCodeAt(0) * 37) % 360;
  return (
    <div style={{ width: size, height: size, minWidth: size, borderRadius: "50%", background: `hsl(${hue},55%,88%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 600, color: `hsl(${hue},45%,35%)` }}>
      {initials}
    </div>
  );
}

export default function AdminPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [empModal, setEmpModal] = useState(false);
  const [provModal, setProvModal] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const [empRes, provRes] = await Promise.all([
        fetch("/api/empleados"),
        fetch("/api/proveedores"),
      ]);
      const [empData, provData] = await Promise.all([empRes.json(), provRes.json()]);
      if (empData.ok) setEmpleados(empData.data);
      if (provData.ok) setProveedores(provData.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchData(); }, []);

  const activos = empleados.filter(e => e.activo).length;
  const enRevision = proveedores.filter(p => p.estatus === "en_revision").length;
  const provActivos = proveedores.filter(p => p.estatus === "activo").length;

  const stats = [
    { label: "Empleados Activos", value: loading ? "…" : activos, delta: `de ${empleados.length} total`, color: "#E02020" },
    { label: "Proveedores Activos", value: loading ? "…" : provActivos, delta: `de ${proveedores.length} total`, color: "#E02020" },
    { label: "En Revisión", value: loading ? "…" : enRevision, delta: "proveedores", color: "#f59e0b" },
    { label: "Usuarios del Portal", value: loading ? "…" : empleados.length + proveedores.length, delta: "con acceso", color: "#10b981" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <NuevoEmpleadoModal open={empModal} onClose={() => setEmpModal(false)} onSuccess={fetchData} />
      <NuevoProveedorModal open={provModal} onClose={() => setProvModal(false)} onSuccess={fetchData} />

      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="text-[#E02020] text-xl leading-none"
              style={{ fontFamily: "var(--font-bankgothic),'Helvetica Neue',Arial,sans-serif", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              STEIGERN
            </a>
            <span className="hidden sm:block text-zinc-400 dark:text-zinc-600 text-xs tracking-[0.2em] uppercase">/ Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setEmpModal(true)}
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase px-4 py-2 border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-[#E02020] hover:text-[#E02020] transition-colors">
              + Empleado
            </button>
            <button onClick={() => setProvModal(true)}
              className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase px-4 py-2 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors">
              + Proveedor
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-4 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">Portal Interno</span>
            </div>
            <h1 className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-body),'Open Sans',sans-serif" }}>
              Panel de Administración
            </h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-5">
                <div className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-1"
                  style={{ fontFamily: "var(--font-body),'Open Sans',sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-zinc-500 dark:text-zinc-400 mb-0.5">{s.label}</div>
                <div className="text-[10px] text-zinc-400 dark:text-zinc-600">{s.delta}</div>
                <div className="mt-3 h-0.5 w-8" style={{ background: s.color }} />
              </motion.div>
            ))}
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Empleados */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-xs font-black tracking-[0.15em] uppercase text-zinc-700 dark:text-zinc-300">Empleados Recientes</h2>
                <Link href="/admin/empleados" className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#E02020] hover:underline">Ver todos →</Link>
              </div>
              {loading ? (
                <div className="flex justify-center py-10"><svg className="animate-spin w-5 h-5 text-[#E02020]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg></div>
              ) : (
                <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
                  {empleados.slice(0, 5).map(e => (
                    <div key={e.id} className="flex items-center gap-3 px-6 py-3.5">
                      <Avatar name={`${e.nombre} ${e.apellidos}`} size={32} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{e.nombre} {e.apellidos}</p>
                        <p className="text-[10px] text-zinc-400 truncate">{e.puesto}{e.departamento ? ` · ${e.departamento}` : ""}</p>
                      </div>
                      <span className={`shrink-0 text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${e.activo ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}>
                        {e.activo ? "Activo" : "Baja"}
                      </span>
                    </div>
                  ))}
                  {empleados.length === 0 && <p className="text-center text-xs text-zinc-400 py-8">Sin empleados registrados</p>}
                </div>
              )}
            </div>

            {/* Proveedores */}
            <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <h2 className="text-xs font-black tracking-[0.15em] uppercase text-zinc-700 dark:text-zinc-300">Proveedores Recientes</h2>
                <Link href="/admin/proveedores" className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#E02020] hover:underline">Ver todos →</Link>
              </div>
              {loading ? (
                <div className="flex justify-center py-10"><svg className="animate-spin w-5 h-5 text-[#E02020]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg></div>
              ) : (
                <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
                  {proveedores.slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center gap-3 px-6 py-3.5">
                      <div className="w-8 h-8 shrink-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{p.razon_social}</p>
                        <p className="text-[10px] text-zinc-400">{p.categoria ?? "Sin categoría"}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${statusColors[p.estatus]}`}>
                          {statusLabel[p.estatus]}
                        </span>
                        {p.calificacion ? <Stars n={p.calificacion} /> : null}
                      </div>
                    </div>
                  ))}
                  {proveedores.length === 0 && <p className="text-center text-xs text-zinc-400 py-8">Sin proveedores registrados</p>}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}