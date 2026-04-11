// app/admin/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ─── Mock data ────────────────────────────────────────────────
const stats = [
  { label: "Empleados Activos",    value: 47,  delta: "+3 este mes",  color: "#E02020" },
  { label: "Proveedores Activos",  value: 34,  delta: "+1 este mes",  color: "#E02020" },
  { label: "En Revisión",          value: 6,   delta: "proveedores",  color: "#f59e0b" },
  { label: "Usuarios del Portal",  value: 81,  delta: "con acceso",   color: "#10b981" },
];

const recentEmpleados = [
  { id: "EMP-047", nombre: "Carlos Méndez",    puesto: "Ing. de Automatización", depto: "Ingeniería",      fecha: "08 Abr 2026", activo: true  },
  { id: "EMP-046", nombre: "Laura Vega",        puesto: "Coordinadora de Ventas", depto: "Ventas",          fecha: "01 Abr 2026", activo: true  },
  { id: "EMP-045", nombre: "Ricardo Torres",    puesto: "Técnico de Campo",       depto: "Operaciones",     fecha: "22 Mar 2026", activo: true  },
  { id: "EMP-044", nombre: "Sofía Ramírez",     puesto: "Analista Contable",      depto: "Administración",  fecha: "15 Mar 2026", activo: false },
  { id: "EMP-043", nombre: "Héctor Fuentes",    puesto: "Desarrollador SR",       depto: "TI",              fecha: "01 Mar 2026", activo: true  },
];

const recentProveedores = [
  { id: "PRV-034", razon: "Festo Mexico S.A. de C.V.",        categoria: "Neumática",       estatus: "activo",     cal: 5 },
  { id: "PRV-033", razon: "Siemens Industry México",          categoria: "Automatización",  estatus: "activo",     cal: 5 },
  { id: "PRV-032", razon: "Distribuidora Industrial Noreste", categoria: "Materiales",      estatus: "en_revision",cal: 0 },
  { id: "PRV-031", razon: "Logística Express MX",             categoria: "Logística",       estatus: "activo",     cal: 4 },
  { id: "PRV-030", razon: "TechSoft Soluciones",              categoria: "Software y TI",   estatus: "inactivo",   cal: 3 },
];

// ─── Helpers ──────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  activo:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactivo:    "bg-zinc-100 text-zinc-500 border-zinc-200",
  en_revision: "bg-amber-50 text-amber-700 border-amber-200",
  bloqueado:   "bg-red-50 text-red-700 border-red-200",
};

const statusLabel: Record<string, string> = {
  activo:      "Activo",
  inactivo:    "Inactivo",
  en_revision: "En Revisión",
  bloqueado:   "Bloqueado",
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= n ? "#E02020" : "none"}
          stroke={i <= n ? "#E02020" : "#d4d4d8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase();
  const hue = (name.charCodeAt(0) * 37) % 360;
  return (
    <div style={{ width: size, height: size, minWidth: size, borderRadius: "50%", background: `hsl(${hue},55%,88%)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize: size * 0.32, fontWeight: 600, color: `hsl(${hue},45%,35%)` }}>
      {initials}
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────
type View = "dashboard" | "empleados" | "proveedores";

export default function AdminPage() {
  const [view, setView] = useState<View>("dashboard");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-[#E02020] text-xl leading-none"
                style={{ fontFamily:"var(--font-bankgothic),'Helvetica Neue',Arial,sans-serif", fontWeight:300, letterSpacing:"0.15em", textTransform:"uppercase" }}>
                STEIGERN
              </span>
              <span className="hidden sm:block text-zinc-400 dark:text-zinc-600 text-xs tracking-[0.2em] uppercase mt-0.5">/ Admin</span>
            </a>

            {/* Nav tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {(["dashboard","empleados","proveedores"] as View[]).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-150 ${
                    view === v
                      ? "text-[#E02020] border-b-2 border-[#E02020]"
                      : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}>
                  {v === "dashboard" ? "Resumen" : v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-[0.06em]">Admin</p>
              <p className="text-[10px] text-zinc-400 tracking-[0.05em]">admin@steigern.com.mx</p>
            </div>
            <Avatar name="Admin S" size={30} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">

        {/* Mobile nav */}
        <div className="flex md:hidden gap-2 mb-8">
          {(["dashboard","empleados","proveedores"] as View[]).map((v) => (
            <button key={v} onClick={() => setView(v)}
              className={`px-3 py-1.5 text-[10px] font-black tracking-[0.1em] uppercase border transition-colors duration-150 ${
                view === v ? "border-[#E02020] text-[#E02020]" : "border-zinc-200 dark:border-zinc-700 text-zinc-400"
              }`}>
              {v === "dashboard" ? "Resumen" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        {view === "dashboard" && <Dashboard setView={setView} />}
        {view === "empleados"  && <EmpleadosView />}
        {view === "proveedores" && <ProveedoresView />}
      </main>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
function Dashboard({ setView }: { setView: (v: View) => void }) {
  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>

      {/* Page title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-px bg-[#E02020]" />
          <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">Portal Interno</span>
        </div>
        <h1 className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
          style={{ fontFamily:"var(--font-body),'Open Sans',sans-serif" }}>
          Panel de Administración
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay: i*0.07 }}
            className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 p-5">
            <div className="text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-1"
              style={{ fontFamily:"var(--font-body),'Open Sans',sans-serif" }}>
              {s.value}
            </div>
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-zinc-500 dark:text-zinc-400 mb-0.5">{s.label}</div>
            <div className="text-[10px] text-zinc-400 dark:text-zinc-600">{s.delta}</div>
            <div className="mt-3 h-0.5 w-8" style={{ background: s.color }} />
          </motion.div>
        ))}
      </div>

      {/* Two tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Últimos empleados */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xs font-black tracking-[0.15em] uppercase text-zinc-700 dark:text-zinc-300">Empleados Recientes</h2>
            <button onClick={() => setView("empleados")}
              className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#E02020] hover:underline">
              Ver todos →
            </button>
          </div>
          <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
            {recentEmpleados.map((e) => (
              <div key={e.id} className="flex items-center gap-3 px-6 py-3.5">
                <Avatar name={e.nombre} size={32} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{e.nombre}</p>
                  <p className="text-[10px] text-zinc-400 truncate">{e.puesto} · {e.depto}</p>
                </div>
                <span className={`shrink-0 text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${e.activo ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}>
                  {e.activo ? "Activo" : "Baja"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Últimos proveedores */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-xs font-black tracking-[0.15em] uppercase text-zinc-700 dark:text-zinc-300">Proveedores Recientes</h2>
            <button onClick={() => setView("proveedores")}
              className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#E02020] hover:underline">
              Ver todos →
            </button>
          </div>
          <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
            {recentProveedores.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-6 py-3.5">
                <div className="w-8 h-8 shrink-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">{p.razon}</p>
                  <p className="text-[10px] text-zinc-400">{p.categoria}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${statusColors[p.estatus]}`}>
                    {statusLabel[p.estatus]}
                  </span>
                  {p.cal > 0 && <Stars n={p.cal} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empleados ────────────────────────────────────────────────
function EmpleadosView() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos"|"activos"|"bajas">("todos");

  const visible = recentEmpleados.filter((e) => {
    const q = search.toLowerCase();
    const match = e.nombre.toLowerCase().includes(q) || e.puesto.toLowerCase().includes(q) || e.depto.toLowerCase().includes(q);
    if (filter === "activos" && !e.activo) return false;
    if (filter === "bajas"   &&  e.activo) return false;
    return match;
  });

  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">Recursos Humanos</span>
          </div>
          <h1 className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
            style={{ fontFamily:"var(--font-body),'Open Sans',sans-serif" }}>
            Empleados
          </h1>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 text-xs font-black tracking-[0.12em] uppercase px-5 py-2.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo Empleado
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar empleado…"
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" />
        </div>
        <div className="flex gap-2">
          {(["todos","activos","bajas"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-[10px] font-black tracking-[0.1em] uppercase border transition-colors ${
                filter === f ? "border-[#E02020] text-[#E02020]" : "border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400"
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                {["ID","Empleado","Puesto","Departamento","Alta","Estatus",""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[9px] font-black tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
              {visible.map((e) => (
                <tr key={e.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                  <td className="px-5 py-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 tracking-[0.08em] whitespace-nowrap">{e.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={e.nombre} size={28} />
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">{e.nombre}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{e.puesto}</td>
                  <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{e.depto}</td>
                  <td className="px-5 py-4 text-[10px] text-zinc-400 whitespace-nowrap">{e.fecha}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${e.activo ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"}`}>
                      {e.activo ? "Activo" : "Baja"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="opacity-0 group-hover:opacity-100 text-[10px] font-bold tracking-[0.08em] uppercase text-zinc-400 hover:text-[#E02020] transition-all">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-xs text-zinc-400">Sin resultados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Proveedores ──────────────────────────────────────────────
function ProveedoresView() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos"|"activo"|"en_revision"|"inactivo">("todos");

  const visible = recentProveedores.filter((p) => {
    const q = search.toLowerCase();
    const match = p.razon.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q);
    if (filter !== "todos" && p.estatus !== filter) return false;
    return match;
  });

  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">Cadena de Suministro</span>
          </div>
          <h1 className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
            style={{ fontFamily:"var(--font-body),'Open Sans',sans-serif" }}>
            Proveedores
          </h1>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 text-xs font-black tracking-[0.12em] uppercase px-5 py-2.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo Proveedor
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar proveedor…"
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["todos","activo","en_revision","inactivo"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 text-[10px] font-black tracking-[0.1em] uppercase border transition-colors ${
                filter === f ? "border-[#E02020] text-[#E02020]" : "border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400"
              }`}>
              {f === "todos" ? "Todos" : f === "en_revision" ? "En Revisión" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                {["ID","Razón Social","Categoría","Estatus","Calificación",""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[9px] font-black tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-600 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
              {visible.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group">
                  <td className="px-5 py-4 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 tracking-[0.08em] whitespace-nowrap">{p.id}</td>
                  <td className="px-5 py-4 text-xs font-bold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">{p.razon}</td>
                  <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{p.categoria}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${statusColors[p.estatus]}`}>
                      {statusLabel[p.estatus]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {p.cal > 0 ? <Stars n={p.cal} /> : <span className="text-[10px] text-zinc-300 dark:text-zinc-700">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <button className="opacity-0 group-hover:opacity-100 text-[10px] font-bold tracking-[0.08em] uppercase text-zinc-400 hover:text-[#E02020] transition-all">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-xs text-zinc-400">Sin resultados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}