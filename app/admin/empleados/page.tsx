// app/admin/empleados/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NuevoEmpleadoModal from "../components/NuevoEmpleadoModal";

interface Empleado {
  id: number;
  numero_empleado: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  puesto: string;
  departamento?: string;
  fecha_ingreso: string;
  activo: number;
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

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "activos" | "bajas">("todos");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEmpleados = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter === "activos") params.set("activo", "1");
      if (filter === "bajas") params.set("activo", "0");
      const res = await fetch(`/api/empleados?${params}`);
      const data = await res.json();
      if (data.ok) setEmpleados(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, filter]);

  useEffect(() => { fetchEmpleados(); }, [fetchEmpleados]);

  const formatDate = (d: string) => new Date(d).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <NuevoEmpleadoModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchEmpleados} />

      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-14 flex items-center gap-6">
          <Link href="/admin" className="text-[#E02020] text-xl leading-none"
            style={{ fontFamily: "var(--font-bankgothic),'Helvetica Neue',Arial,sans-serif", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            STEIGERN
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <Link href="/admin" className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 tracking-[0.1em] uppercase transition-colors">Admin</Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-[0.1em] uppercase">Empleados</span>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">Recursos Humanos</span>
              </div>
              <h1 className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-body),'Open Sans',sans-serif" }}>
                Empleados
                {!loading && <span className="ml-3 text-base font-normal text-zinc-400">({empleados.length})</span>}
              </h1>
            </div>
            <button onClick={() => setModalOpen(true)}
              className="self-start sm:self-auto flex items-center gap-2 text-xs font-black tracking-[0.12em] uppercase px-5 py-2.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Nuevo Empleado
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar empleado…"
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" />
            </div>
            <div className="flex gap-2">
              {(["todos", "activos", "bajas"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-2 text-[10px] font-black tracking-[0.1em] uppercase border transition-colors ${filter === f ? "border-[#E02020] text-[#E02020]" : "border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400"}`}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="animate-spin w-6 h-6 text-[#E02020]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      {["ID", "Empleado", "Puesto", "Departamento", "Ingreso", "Estatus", ""].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[9px] font-black tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {empleados.map(e => (
                      <tr key={e.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                        <td className="px-5 py-4 text-[10px] font-bold text-zinc-400 tracking-[0.08em] whitespace-nowrap">{e.numero_empleado}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={`${e.nombre} ${e.apellidos}`} size={28} />
                            <div>
                              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">{e.nombre} {e.apellidos}</p>
                              <p className="text-[10px] text-zinc-400">{e.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{e.puesto}</td>
                        <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{e.departamento ?? "—"}</td>
                        <td className="px-5 py-4 text-[10px] text-zinc-400 whitespace-nowrap">{formatDate(e.fecha_ingreso)}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${e.activo ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}>
                            {e.activo ? "Activo" : "Baja"}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className="opacity-0 group-hover:opacity-100 text-[10px] font-bold tracking-[0.08em] uppercase text-zinc-400 hover:text-[#E02020] transition-all">Editar</button>
                        </td>
                      </tr>
                    ))}
                    {empleados.length === 0 && (
                      <tr><td colSpan={7} className="px-5 py-16 text-center text-xs text-zinc-400">Sin resultados</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}