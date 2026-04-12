// app/admin/empleados/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

interface Empleado {
  id: number;
  numero_empleado: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  puesto: string;
  departamento_id?: number;
  departamento?: string;
  fecha_ingreso: string;
  salario?: number;
  activo: number;
  avatar_url?: string;
}

const departamentos = [
  { id: 1, nombre: "Ingeniería" },
  { id: 2, nombre: "Administración" },
  { id: 3, nombre: "Ventas" },
  { id: 4, nombre: "Operaciones" },
  { id: 5, nombre: "Recursos Humanos" },
  { id: 6, nombre: "TI" },
];

const inputCls =
  "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600";
const labelCls =
  "text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5";

function Avatar({ name, size = 56 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const hue = (name.charCodeAt(0) * 37) % 360;
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: "50%",
        background: `hsl(${hue},55%,88%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.32,
        fontWeight: 600,
        color: `hsl(${hue},45%,35%)`,
      }}
    >
      {initials}
    </div>
  );
}

export default function EditarEmpleadoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const [form, setForm] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    puesto: "",
    departamento_id: "",
    fecha_ingreso: "",
    salario: "",
    activo: "1",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    async function fetchEmpleado() {
      try {
        const res = await fetch(`/api/empleados/${id}`);
        const data = await res.json();
        if (!data.ok) throw new Error(data.error);
        const e: Empleado = data.data;
        setEmpleado(e);
        setForm({
          nombre: e.nombre,
          apellidos: e.apellidos,
          email: e.email,
          telefono: e.telefono ?? "",
          puesto: e.puesto,
          departamento_id: e.departamento_id ? String(e.departamento_id) : "",
          fecha_ingreso: e.fecha_ingreso?.split("T")[0] ?? "",
          salario: e.salario ? String(e.salario) : "",
          activo: String(e.activo),
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar");
      } finally {
        setLoading(false);
      }
    }
    fetchEmpleado();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(`/api/empleados/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          departamento_id: form.departamento_id
            ? Number(form.departamento_id)
            : null,
          salario: form.salario ? Number(form.salario) : null,
          activo: Number(form.activo),
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

  async function handleDeactivate() {
    if (
      !confirm(
        `¿Dar de baja a ${empleado?.nombre} ${empleado?.apellidos}? Esta acción se puede revertir.`
      )
    )
      return;
    try {
      const res = await fetch(`/api/empleados/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activo: form.activo === "1" ? 0 : 1 }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      const next = form.activo === "1" ? "0" : "1";
      set("activo", next);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
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

  if (!empleado && !loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500 text-sm">Empleado no encontrado.</p>
        <Link
          href="/admin/empleados"
          className="text-xs font-bold tracking-[0.1em] uppercase text-[#E02020]"
        >
          ← Volver
        </Link>
      </div>
    );
  }

  const fullName = `${form.nombre} ${form.apellidos}`.trim() || "Empleado";

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
            href="/admin/empleados"
            className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 tracking-[0.1em] uppercase transition-colors"
          >
            Empleados
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tracking-[0.1em] uppercase truncate max-w-[160px]">
            {empleado?.numero_empleado}
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
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <Avatar name={fullName} size={56} />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="w-4 h-px bg-[#E02020]" />
                  <span className="text-[#E02020] text-[10px] font-bold tracking-[0.25em] uppercase">
                    {empleado?.numero_empleado}
                  </span>
                </div>
                <h1
                  className="text-zinc-900 dark:text-zinc-100 font-black text-2xl uppercase tracking-[-0.02em]"
                  style={{
                    fontFamily: "var(--font-body),'Open Sans',sans-serif",
                  }}
                >
                  {fullName}
                </h1>
                <p className="text-zinc-400 text-xs mt-0.5">
                  {empleado?.departamento ?? "Sin departamento"} ·{" "}
                  {empleado?.puesto}
                </p>
              </div>
            </div>

            {/* Status toggle */}
            <button
              onClick={handleDeactivate}
              className={`self-start sm:self-auto flex items-center gap-2 text-[10px] font-black tracking-[0.12em] uppercase px-4 py-2.5 border transition-colors ${
                form.activo === "1"
                  ? "border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-red-300 hover:text-red-500"
                  : "border-emerald-300 text-emerald-600 hover:border-emerald-500"
              }`}
            >
              {form.activo === "1" ? (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  Dar de Baja
                </>
              ) : (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Reactivar
                </>
              )}
            </button>
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
                    Información del Empleado
                  </h2>
                </div>

                <div className="px-7 py-6 flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>
                        Nombre <span className="text-[#E02020]">*</span>
                      </label>
                      <input
                        required
                        className={inputCls}
                        value={form.nombre}
                        onChange={(e) => set("nombre", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>
                        Apellidos <span className="text-[#E02020]">*</span>
                      </label>
                      <input
                        required
                        className={inputCls}
                        value={form.apellidos}
                        onChange={(e) => set("apellidos", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>
                        Correo Electrónico{" "}
                        <span className="text-[#E02020]">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        className={inputCls}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Teléfono</label>
                      <input
                        type="tel"
                        className={inputCls}
                        value={form.telefono}
                        onChange={(e) => set("telefono", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>
                        Puesto <span className="text-[#E02020]">*</span>
                      </label>
                      <input
                        required
                        className={inputCls}
                        value={form.puesto}
                        onChange={(e) => set("puesto", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Departamento</label>
                      <select
                        className={inputCls}
                        value={form.departamento_id}
                        onChange={(e) => set("departamento_id", e.target.value)}
                      >
                        <option value="">Sin departamento</option>
                        {departamentos.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>
                        Fecha de Ingreso{" "}
                        <span className="text-[#E02020]">*</span>
                      </label>
                      <input
                        required
                        type="date"
                        className={inputCls}
                        value={form.fecha_ingreso}
                        onChange={(e) => set("fecha_ingreso", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Salario Mensual (MXN)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className={inputCls}
                        value={form.salario}
                        onChange={(e) => set("salario", e.target.value)}
                      />
                    </div>
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
                      onClick={() => router.push("/admin/empleados")}
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

            {/* Sidebar info */}
            <div className="flex flex-col gap-4">
              {/* Status card */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-[10px] font-black tracking-[0.15em] uppercase text-zinc-400">
                    Estado
                  </h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase">
                      Estatus
                    </span>
                    <span
                      className={`text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 border ${
                        form.activo === "1"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-zinc-100 text-zinc-500 border-zinc-200"
                      }`}
                    >
                      {form.activo === "1" ? "Activo" : "Baja"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase">
                      ID Interno
                    </span>
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                      #{empleado?.id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 tracking-[0.1em] uppercase">
                      N° Empleado
                    </span>
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                      {empleado?.numero_empleado}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick info */}
              <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                  <h3 className="text-[10px] font-black tracking-[0.15em] uppercase text-zinc-400">
                    Resumen
                  </h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  {[
                    { label: "Departamento", value: form.departamento_id ? departamentos.find(d => String(d.id) === form.departamento_id)?.nombre : "—" },
                    { label: "Puesto", value: form.puesto || "—" },
                    {
                      label: "Ingreso",
                      value: form.fecha_ingreso
                        ? new Date(form.fecha_ingreso).toLocaleDateString(
                            "es-MX",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              timeZone: "UTC",
                            }
                          )
                        : "—",
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
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}