// app/admin/components/NuevoEmpleadoModal.tsx
"use client";

import { useState } from "react";
import Modal from "@/app/global/components/ui/Modal";

const departamentos = [
  { id: 1, nombre: "Ingeniería" },
  { id: 2, nombre: "Administración" },
  { id: 3, nombre: "Ventas" },
  { id: 4, nombre: "Operaciones" },
  { id: 5, nombre: "Recursos Humanos" },
  { id: 6, nombre: "TI" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const inputCls = "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600";
const labelCls = "text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5";

export default function NuevoEmpleadoModal({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    numero_empleado: "", nombre: "", apellidos: "", email: "",
    telefono: "", puesto: "", departamento_id: "", fecha_ingreso: "", salario: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/empleados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          departamento_id: form.departamento_id ? Number(form.departamento_id) : null,
          salario: form.salario ? Number(form.salario) : null,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      onSuccess?.();
      onClose();
      setForm({ numero_empleado: "", nombre: "", apellidos: "", email: "", telefono: "", puesto: "", departamento_id: "", fecha_ingreso: "", salario: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Nuevo Empleado" subtitle="Completa los datos para registrar al empleado" size="lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>N° Empleado <span className="text-[#E02020]">*</span></label>
            <input required className={inputCls} placeholder="EMP-001" value={form.numero_empleado} onChange={e => set("numero_empleado", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Fecha de Ingreso <span className="text-[#E02020]">*</span></label>
            <input required type="date" className={inputCls} value={form.fecha_ingreso} onChange={e => set("fecha_ingreso", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Nombre <span className="text-[#E02020]">*</span></label>
            <input required className={inputCls} placeholder="Carlos" value={form.nombre} onChange={e => set("nombre", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Apellidos <span className="text-[#E02020]">*</span></label>
            <input required className={inputCls} placeholder="Méndez García" value={form.apellidos} onChange={e => set("apellidos", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Correo Electrónico <span className="text-[#E02020]">*</span></label>
            <input required type="email" className={inputCls} placeholder="carlos@steigern.com.mx" value={form.email} onChange={e => set("email", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Teléfono</label>
            <input type="tel" className={inputCls} placeholder="+52 222 000 0000" value={form.telefono} onChange={e => set("telefono", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Puesto <span className="text-[#E02020]">*</span></label>
            <input required className={inputCls} placeholder="Ing. de Automatización" value={form.puesto} onChange={e => set("puesto", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Departamento</label>
            <select className={inputCls} value={form.departamento_id} onChange={e => set("departamento_id", e.target.value)}>
              <option value="">Selecciona departamento</option>
              {departamentos.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className={labelCls}>Salario Mensual (MXN)</label>
          <input type="number" min="0" step="0.01" className={inputCls} placeholder="0.00" value={form.salario} onChange={e => set("salario", e.target.value)} />
        </div>
        {error && <p className="text-[#E02020] text-xs font-semibold">{error}</p>}
        <div className="flex gap-3 justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-xs font-bold tracking-[0.1em] uppercase border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-black tracking-[0.15em] uppercase bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? <><svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Guardando...</> : "Guardar Empleado"}
          </button>
        </div>
      </form>
    </Modal>
  );
}