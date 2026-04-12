// app/admin/proveedores/page.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus, faMagnifyingGlass,
  faPenToSquare, faRotate, faTrash,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import NuevoProveedorModal from "../components/NuevoProveedorModal";
import ActionDropdown, { DropdownAction } from "@/app/global/components/ui/ActionDropdown";
import ConfirmModal from "@/app/global/components/ui/ConfirmModal";

interface Proveedor {
  id: number; codigo_proveedor: string; razon_social: string;
  nombre_comercial?: string; rfc?: string; pais: string; ciudad?: string;
  estatus: "activo" | "inactivo" | "en_revision" | "bloqueado";
  calificacion?: number; categoria?: string;
}

const statusColors: Record<string, string> = {
  activo:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactivo:    "bg-zinc-100 text-zinc-500 border-zinc-200",
  en_revision: "bg-amber-50 text-amber-700 border-amber-200",
  bloqueado:   "bg-red-50 text-red-700 border-red-200",
};
const statusLabel: Record<string, string> = {
  activo: "Activo", inactivo: "Inactivo", en_revision: "En Revisión", bloqueado: "Bloqueado",
};
const nextStatus: Record<string, string> = {
  activo: "inactivo", inactivo: "activo", en_revision: "activo", bloqueado: "inactivo",
};
const nextStatusLabel: Record<string, string> = {
  activo: "Marcar Inactivo", inactivo: "Marcar Activo", en_revision: "Aprobar (Activo)", bloqueado: "Marcar Inactivo",
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <FontAwesomeIcon
          key={i}
          icon={i <= n ? faStarSolid : faStarRegular}
          className={`w-2.5 h-2.5 ${i <= n ? "text-[#E02020]" : "text-zinc-300 dark:text-zinc-600"}`}
        />
      ))}
    </div>
  );
}

export default function ProveedoresPage() {
  const router = useRouter();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "activo" | "en_revision" | "inactivo">("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Proveedor | null>(null);
  const [confirmStatus, setConfirmStatus] = useState<Proveedor | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProveedores = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filter !== "todos") params.set("estatus", filter);
      const res = await fetch(`/api/proveedores?${params}`);
      const data = await res.json();
      if (data.ok) setProveedores(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [search, filter]);

  useEffect(() => { fetchProveedores(); }, [fetchProveedores]);

  async function handleDelete() {
    if (!confirmDelete) return;
    setActionLoading(true);
    try {
      await fetch(`/api/proveedores/${confirmDelete.id}`, { method: "DELETE" });
      setConfirmDelete(null);
      fetchProveedores();
    } finally { setActionLoading(false); }
  }

  async function handleToggleStatus() {
    if (!confirmStatus) return;
    setActionLoading(true);
    try {
      await fetch(`/api/proveedores/${confirmStatus.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estatus: nextStatus[confirmStatus.estatus] }),
      });
      setConfirmStatus(null);
      fetchProveedores();
    } finally { setActionLoading(false); }
  }

  function getActions(p: Proveedor): DropdownAction[] {
    return [
      {
        label: "Editar",
        icon: <FontAwesomeIcon icon={faPenToSquare} className="w-3 h-3" />,
        onClick: () => router.push(`/admin/proveedores/${p.id}`),
      },
      {
        label: nextStatusLabel[p.estatus],
        icon: <FontAwesomeIcon icon={faRotate} className="w-3 h-3" />,
        onClick: () => setConfirmStatus(p),
        dividerBefore: true,
      },
      {
        label: "Eliminar",
        icon: <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />,
        onClick: () => setConfirmDelete(p),
        variant: "danger",
      },
    ];
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <NuevoProveedorModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={fetchProveedores} />

      <ConfirmModal
        open={!!confirmDelete} onClose={() => setConfirmDelete(null)} onConfirm={handleDelete}
        loading={actionLoading} variant="danger" title="Eliminar Proveedor"
        description={`¿Estás seguro de que deseas eliminar a ${confirmDelete?.razon_social}? Esta acción no se puede deshacer.`}
        confirmLabel="Sí, Eliminar"
      />
      <ConfirmModal
        open={!!confirmStatus} onClose={() => setConfirmStatus(null)} onConfirm={handleToggleStatus}
        loading={actionLoading} variant="warning" title="Cambiar Estatus"
        description={confirmStatus ? `¿Cambiar "${confirmStatus.razon_social}" de ${statusLabel[confirmStatus.estatus]} a ${statusLabel[nextStatus[confirmStatus.estatus]]}?` : ""}
        confirmLabel="Confirmar Cambio"
      />

      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-14 flex items-center gap-6">
          <Link href="/admin" className="text-[#E02020] text-xl leading-none"
            style={{ fontFamily: "var(--font-bankgothic),'Helvetica Neue',Arial,sans-serif", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            STEIGERN
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <Link href="/admin" className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 tracking-[0.1em] uppercase transition-colors">Admin</Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-[0.1em] uppercase">Proveedores</span>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">Cadena de Suministro</span>
              </div>
              <h1 className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-body),'Open Sans',sans-serif" }}>
                Proveedores
                {!loading && <span className="ml-3 text-base font-normal text-zinc-400">({proveedores.length})</span>}
              </h1>
            </div>
            <button onClick={() => setModalOpen(true)}
              className="self-start sm:self-auto flex items-center gap-2 text-xs font-black tracking-[0.12em] uppercase px-5 py-2.5 bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors">
              <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
              Nuevo Proveedor
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-xs">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-3 h-3" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar proveedor…"
                className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["todos", "activo", "en_revision", "inactivo"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-2 text-[10px] font-black tracking-[0.1em] uppercase border transition-colors ${filter === f ? "border-[#E02020] text-[#E02020]" : "border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-400"}`}>
                  {f === "todos" ? "Todos" : f === "en_revision" ? "En Revisión" : f.charAt(0).toUpperCase() + f.slice(1)}
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
                      {["Código", "Razón Social", "Categoría", "Ubicación", "Calificación", "Estatus", ""].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-[9px] font-black tracking-[0.15em] uppercase text-zinc-400 dark:text-zinc-600 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {proveedores.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                        <td className="px-5 py-4 text-[10px] font-bold text-zinc-400 tracking-[0.08em] whitespace-nowrap">{p.codigo_proveedor}</td>
                        <td className="px-5 py-4">
                          <Link href={`/admin/proveedores/${p.id}`} className="group">
                            <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 whitespace-nowrap group-hover:text-[#E02020] transition-colors">{p.razon_social}</p>
                            {p.rfc && <p className="text-[10px] text-zinc-400">{p.rfc}</p>}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{p.categoria ?? "—"}</td>
                        <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">{[p.ciudad, p.pais].filter(Boolean).join(", ") || "—"}</td>
                        <td className="px-5 py-4">
                          {p.calificacion ? <Stars n={p.calificacion} /> : <span className="text-[10px] text-zinc-300 dark:text-zinc-700">—</span>}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${statusColors[p.estatus]}`}>
                            {statusLabel[p.estatus]}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <ActionDropdown actions={getActions(p)} />
                        </td>
                      </tr>
                    ))}
                    {proveedores.length === 0 && (
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