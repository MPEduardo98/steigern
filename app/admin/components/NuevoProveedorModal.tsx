// app/admin/components/NuevoProveedorModal.tsx
"use client";

import { useState } from "react";
import Modal from "@/app/global/components/ui/Modal";

const categorias = [
  { id: 1, nombre: "Componentes Electrónicos" },
  { id: 2, nombre: "Perfiles de Aluminio" },
  { id: 3, nombre: "Neumática e Hidráulica" },
  { id: 4, nombre: "Robótica y Automatización" },
  { id: 5, nombre: "Logística y Transporte" },
  { id: 6, nombre: "Mantenimiento Industrial" },
  { id: 7, nombre: "Software y TI" },
  { id: 8, nombre: "Materiales de Oficina" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const inputCls = "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600";
const labelCls = "text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5";

export default function NuevoProveedorModal({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    codigo_proveedor: "", razon_social: "", nombre_comercial: "", rfc: "",
    pais: "México", estado: "", ciudad: "", direccion: "",
    codigo_postal: "", sitio_web: "", categoria_id: "", estatus: "en_revision",
    calificacion: "", notas: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/proveedores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoria_id: form.categoria_id ? Number(form.categoria_id) : null,
          calificacion: form.calificacion ? Number(form.calificacion) : null,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      onSuccess?.();
      onClose();
      setForm({ codigo_proveedor: "", razon_social: "", nombre_comercial: "", rfc: "", pais: "México", estado: "", ciudad: "", direccion: "", codigo_postal: "", sitio_web: "", categoria_id: "", estatus: "en_revision", calificacion: "", notas: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Nuevo Proveedor" subtitle="Completa los datos para registrar al proveedor" size="xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Código Proveedor <span className="text-[#E02020]">*</span></label>
            <input required className={inputCls} placeholder="PRV-001" value={form.codigo_proveedor} onChange={e => set("codigo_proveedor", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Estatus</label>
            <select className={inputCls} value={form.estatus} onChange={e => set("estatus", e.target.value)}>
              <option value="en_revision">En Revisión</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="bloqueado">Bloqueado</option>
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls}>Razón Social <span className="text-[#E02020]">*</span></label>
          <input required className={inputCls} placeholder="Empresa S.A. de C.V." value={form.razon_social} onChange={e => set("razon_social", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nombre Comercial</label>
            <input className={inputCls} placeholder="Nombre comercial" value={form.nombre_comercial} onChange={e => set("nombre_comercial", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>RFC</label>
            <input className={inputCls} placeholder="RFC123456ABC" value={form.rfc} onChange={e => set("rfc", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Categoría</label>
            <select className={inputCls} value={form.categoria_id} onChange={e => set("categoria_id", e.target.value)}>
              <option value="">Sin categoría</option>
              {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Calificación (1–5)</label>
            <select className={inputCls} value={form.calificacion} onChange={e => set("calificacion", e.target.value)}>
              <option value="">Sin calificar</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>País</label>
            <input className={inputCls} value={form.pais} onChange={e => set("pais", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Estado</label>
            <input className={inputCls} placeholder="Querétaro" value={form.estado} onChange={e => set("estado", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Ciudad</label>
            <input className={inputCls} placeholder="Querétaro" value={form.ciudad} onChange={e => set("ciudad", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Dirección</label>
            <input className={inputCls} placeholder="Calle, Núm, Col." value={form.direccion} onChange={e => set("direccion", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Código Postal</label>
            <input className={inputCls} placeholder="76000" value={form.codigo_postal} onChange={e => set("codigo_postal", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Sitio Web</label>
          <input className={inputCls} placeholder="https://empresa.com" value={form.sitio_web} onChange={e => set("sitio_web", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Notas</label>
          <textarea rows={3} className={`${inputCls} resize-none`} placeholder="Notas internas sobre el proveedor..." value={form.notas} onChange={e => set("notas", e.target.value)} />
        </div>
        {error && <p className="text-[#E02020] text-xs font-semibold">{error}</p>}
        <div className="flex gap-3 justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-xs font-bold tracking-[0.1em] uppercase border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-400 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-black tracking-[0.15em] uppercase bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? <><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Guardando...</> : "Guardar Proveedor"}
          </button>
        </div>
      </form>
    </Modal>
  );
}