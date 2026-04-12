// app/admin/proveedores/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

interface Proveedor {
  id: number;
  codigo_proveedor: string;
  razon_social: string;
  nombre_comercial?: string;
  rfc?: string;
  pais: string;
  estado?: string;
  ciudad?: string;
  direccion?: string;
  codigo_postal?: string;
  sitio_web?: string;
  categoria_id?: number;
  categoria?: string;
  estatus: "activo" | "inactivo" | "en_revision" | "bloqueado";
  calificacion?: number;
  notas?: string;
}

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

const statusColors: Record<string, string> = {
  activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactivo: "bg-zinc-100 text-zinc-500 border-zinc-200",
  en_revision: "bg-amber-50 text-amber-700 border-amber-200",
  bloqueado: "bg-red-50 text-red-700 border-red-200",
};
const statusLabel: Record<string, string> = {
  activo: "Activo",
  inactivo: "Inactivo",
  en_revision: "En Revisión",
  bloqueado: "Bloqueado",
};

const inputCls =
  "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600";
const labelCls =
  "text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5";

function Stars({ n, onChange }: { n: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i)}
          className="transition-transform hover:scale-110"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={i <= n ? "#E02020" : "none"}
            stroke={i <= n ? "#E02020" : "#d4d4d8"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
      {n > 0 && (
        <button
          type="button"
          onClick={() => onChange?.(0)}
          className="ml-1 text-zinc-300 hover:text-zinc-500 text-[10px] tracking-[0.1em] uppercase font-bold"
        >
          Limpiar
        </button>
      )}
    </div>
  );
}

export default function EditarProveedorPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [proveedor, setProveedor] = useState<Proveedor | null>(null);
  const [form, setForm] = useState({
    razon_social: "",
    nombre_comercial: "",
    rfc: "",
    pais: "México",
    estado: "",
    ciudad: "",
    direccion: "",
    codigo_postal: "",
    sitio_web: "",
    categoria_id: "",
    estatus: "en_revision",
    calificacion: 0,
    notas: "",
  });

  const set = (k: string, v: string | number) =>
    setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    async function fetchProveedor() {
      try {
        const res = await fetch(`/api/proveedores/${id}`);
        const data = await res.json();
        if (!data.ok) throw new Error(data.error);
        const p: Proveedor = data.data;
        setProveedor(p);
        setForm({
          razon_social: p.razon_social,
          nombre_comercial: p.nombre_comercial ?? "",
          rfc: p.rfc ?? "",
          pais: p.pais,
          estado: p.estado ?? "",
          ciudad: p.ciudad ?? "",
          direccion: p.direccion ?? "",
          codigo_postal: p.codigo_postal ?? "",
          sitio_web: p.sitio_web ?? "",
          categoria_id: p.categoria_id ? String(p.categoria_id) : "",
          estatus: p.estatus,
          calificacion: p.calificacion ?? 0,
          notas: p.notas ?? "",
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar");
      } finally {
        setLoading(false);
      }
    }
    fetchProveedor();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`/api/proveedores/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoria_id: form.categoria_id ? Number(form.categoria_id) : null,
          calificacion: form.calificacion || null,
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <svg
          className="animate-spin w-6 h-6 text-[#E02020]"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  }

  if (!proveedor && !loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500 text-sm">Proveedor no encontrado.</p>
        <Link
          href="/admin/proveedores"
          className="text-xs font-bold tracking-[0.1em] uppercase text-[#E02020]"
        >
          ← Volver
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-14 flex items-center gap-4">
          <Link
            href="/admin"
            className="text-[#E02020] text-xl leading-none"
            style={{
              fontFamily:
                "var(--font-bankgothic),'Helvetica Neue',Arial,sans-serif",
              fontWeight: 300,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            STEIGERN
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <Link
            href="/admin"
            className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 tracking-[0.1em] uppercase transition-colors"
          >
            Admin
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <Link
            href="/admin/proveedores"
            className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 tracking-[0.1em] uppercase transition-colors"
          >
            Proveedores
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-[0.1em] uppercase truncate max-w-[180px]">
            {proveedor?.codigo_proveedor}
          </span>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Page title */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-4 h-px bg-[#E02020]" />
                <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">
                  {proveedor?.codigo_proveedor}
                </span>
              </div>
              <h1
                className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-body),'Open Sans',sans-serif",
                }}
              >
                {form.razon_social || "Proveedor"}
              </h1>
              {form.nombre_comercial && (
                <p className="text-zinc-400 text-xs mt-0.5">
                  {form.nombre_comercial}
                </p>
              )}
            </div>

            {/* Estatus badge */}
            <span
              className={`self-start text-[9px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 border ${statusColors[form.estatus]}`}
            >
              {statusLabel[form.estatus]}
            </span>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800"
              >
                <div className="px-7 py-5 border-b border-zinc-100 dark:border-zinc-800">
                  <h2
                    className="text-xs font-black tracking-[0.15em] uppercase text-zinc-700 dark:text-zinc-300"
                    style={{
                      fontFamily: "var(--font-body),'Open Sans',sans-serif",
                    }}
                  >
                    Información del Proveedor
                  </h2>
                </div>

                <div className="px-7 py-6 flex flex-col gap-5">
                  {/* Razón social */}
                  <div>
                    <label className={labelCls}>
                      Razón Social <span className="text-[#E02020]">*</span>
                    </label>
                    <input
                      required
                      className={inputCls}
                      value={form.razon_social}
                      onChange={(e) => set("razon_social", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Nombre Comercial</label>
                      <input
                        className={inputCls}
                        value={form.nombre_comercial}
                        onChange={(e) =>
                          set("nombre_comercial", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className={labelCls}>RFC</label>
                      <input
                        className={inputCls}
                        value={form.rfc}
                        onChange={(e) => set("rfc", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Categoría</label>
                      <select
                        className={inputCls}
                        value={form.categoria_id}
                        onChange={(e) => set("categoria_id", e.target.value)}
                      >
                        <option value="">Sin categoría</option>
                        {categorias.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Estatus</label>
                      <select
                        className={inputCls}
                        value={form.estatus}
                        onChange={(e) => set("estatus", e.target.value)}
                      >
                        <option value="en_revision">En Revisión</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                        <option value="bloqueado">Bloqueado</option>
                      </select>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-[10px] font-black tracking-[0.15em] uppercase text-zinc-400 mb-4">
                      Ubicación
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>País</label>
                        <input
                          className={inputCls}
                          value={form.pais}
                          onChange={(e) => set("pais", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Estado</label>
                        <input
                          className={inputCls}
                          placeholder="Querétaro"
                          value={form.estado}
                          onChange={(e) => set("estado", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Ciudad</label>
                        <input
                          className={inputCls}
                          placeholder="Querétaro"
                          value={form.ciudad}
                          onChange={(e) => set("ciudad", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className={labelCls}>Dirección</label>
                        <input
                          className={inputCls}
                          placeholder="Calle, Núm, Col."
                          value={form.direccion}
                          onChange={(e) => set("direccion", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Código Postal</label>
                        <input
                          className={inputCls}
                          placeholder="76000"
                          value={form.codigo_postal}
                          onChange={(e) => set("codigo_postal", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Web + calificación */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <div>
                      <label className={labelCls}>Sitio Web</label>
                      <input
                        className={inputCls}
                        placeholder="https://empresa.com"
                        value={form.sitio_web}
                        onChange={(e) => set("sitio_web", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Calificación</label>
                    <Stars
                      n={form.calificacion}
                      onChange={(v) => set("calificacion", v)}
                    />
                  </div>

                  <div>
                    <label className={labelCls}>Notas Internas</label>
                    <textarea
                      rows={3}
                      className={`${inputCls} resize-none`}
                      placeholder="Notas sobre el proveedor..."
                      value={form.notas}
                      onChange={(e) => set("notas", e.target.value)}
                    />
                  </div>

                  {error && (
                    <p className="text-[#E02020] text-xs font-semibold">
                      {error}
                    </p>
                  )}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-emerald-600 text-xs font-semibold"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Cambios guardados correctamente
                    </motion.div>
                  )}

                  <div className="flex gap-3 justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={() => router.push("/admin/proveedores")}
                      className="px-5 py-2.5 text-xs font-bold tracking-[0.1em] uppercase border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-400 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 px-6 py-2.5 text-xs font-black tracking-[0.15em] uppercase bg-[#E02020] text-white hover:bg-[#c41a1a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <svg
                            className="animate-spin w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8z"
                            />
                          </svg>
                          Guardando...
                        </>
                      ) : (
                        "Guardar Cambios"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              {/* Status card */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-[10px] font-black tracking-[0.15em] uppercase text-zinc-400">
                    Identificación
                  </h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  {[
                    { label: "ID Interno", value: `#${proveedor?.id}` },
                    { label: "Código", value: proveedor?.codigo_proveedor },
                    { label: "RFC", value: form.rfc || "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase">
                        {label}
                      </span>
                      <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                        {value}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase">
                      Estatus
                    </span>
                    <span
                      className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${statusColors[form.estatus]}`}
                    >
                      {statusLabel[form.estatus]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resumen */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-[10px] font-black tracking-[0.15em] uppercase text-zinc-400">
                    Resumen
                  </h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  {[
                    {
                      label: "Categoría",
                      value: form.categoria_id
                        ? categorias.find(
                            (c) => String(c.id) === form.categoria_id
                          )?.nombre
                        : "—",
                    },
                    {
                      label: "Ubicación",
                      value:
                        [form.ciudad, form.pais].filter(Boolean).join(", ") ||
                        "—",
                    },
                    {
                      label: "Sitio Web",
                      value: form.sitio_web ? (
                        <a
                          href={form.sitio_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E02020] hover:underline truncate block max-w-[120px]"
                        >
                          {form.sitio_web.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        "—"
                      ),
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase mb-0.5">
                        {label}
                      </p>
                      <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                        {value}
                      </p>
                    </div>
                  ))}

                  {form.calificacion > 0 && (
                    <div>
                      <p className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase mb-1">
                        Calificación
                      </p>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <svg
                            key={i}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill={
                              i <= form.calificacion ? "#E02020" : "none"
                            }
                            stroke={
                              i <= form.calificacion ? "#E02020" : "#d4d4d8"
                            }
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}