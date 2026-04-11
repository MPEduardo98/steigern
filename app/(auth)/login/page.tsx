// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "proveedor" | "empleado" | "administrador";

const roles: { id: Role; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: "proveedor",
    label: "Proveedor",
    desc: "Gestión de órdenes y documentos",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    id: "empleado",
    label: "Empleado",
    desc: "Acceso interno a proyectos",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "administrador",
    label: "Administrador",
    desc: "Control total del sistema",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<Role>("proveedor");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL: negro ── */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between p-16 overflow-hidden bg-black">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(224,32,32,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(224,32,32,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute left-0 top-0 w-1 h-full bg-[#E02020]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#E02020] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <a href="/">
            <span
              className="text-white text-4xl leading-none"
              style={{
                fontFamily: "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              STEIGERN
            </span>
          </a>
        </motion.div>

        {/* Center */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">Portal Interno</span>
          </div>
          <h2
            className="text-white font-black text-[clamp(2.2rem,3.5vw,3.8rem)] leading-[0.95] tracking-[-0.03em] uppercase mb-6"
            style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
          >
            Acceso
            <br />
            <span className="text-[#E02020]">Seguro</span>
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Plataforma centralizada para proveedores, empleados y administradores de STEIGERN.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col gap-4 border-t border-zinc-800 pt-8 relative z-10"
        >
          {[
            { value: "256-bit", label: "Cifrado SSL" },
            { value: "99.9%", label: "Disponibilidad" },
            { value: "24/7", label: "Soporte técnico" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-zinc-600 text-xs uppercase tracking-[0.12em]">{label}</span>
              <span className="text-zinc-300 text-xs font-bold tracking-[0.1em]">{value}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT PANEL: blanco ── */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 py-16 bg-white">

        {/* Mobile logo */}
        <div className="lg:hidden mb-12">
          <a href="/">
            <span
              className="text-[#E02020] text-3xl leading-none"
              style={{
                fontFamily: "var(--font-bankgothic), 'Helvetica Neue', Arial, sans-serif",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              STEIGERN
            </span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full max-w-[420px] mx-auto lg:mx-0"
        >
          {/* Header */}
          <div className="mb-10">
            <h1
              className="text-zinc-900 font-black text-3xl uppercase tracking-[-0.02em] mb-2"
              style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}
            >
              Iniciar Sesión
            </h1>
            <p className="text-zinc-500 text-sm">Selecciona tu perfil y accede al portal.</p>
          </div>

          {/* Role selector */}
          <div className="mb-8">
            <p className="text-zinc-400 text-[10px] font-bold tracking-[0.18em] uppercase mb-3">Tipo de acceso</p>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id)}
                  className={`flex flex-col items-center gap-2 p-4 border transition-all duration-200 text-center ${
                    selectedRole === r.id
                      ? "border-[#E02020] bg-red-50 text-zinc-900"
                      : "border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  <span className={`transition-colors duration-200 ${selectedRole === r.id ? "text-[#E02020]" : ""}`}>
                    {r.icon}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.12em] uppercase leading-tight">{r.label}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedRole}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
                className="text-zinc-400 text-xs mt-2 text-center"
              >
                {roles.find((r) => r.id === selectedRole)?.desc}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400"
                placeholder="usuario@steigern.com.mx"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase">
                  Contraseña
                </label>
                <a href="/recuperar-contrasena" className="text-[10px] text-zinc-400 hover:text-[#E02020] tracking-[0.08em] uppercase transition-colors duration-200">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3.5 pr-12 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E02020] text-white text-xs font-black tracking-[0.2em] uppercase py-4 hover:bg-[#c41a1a] transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Verificando...
                </>
              ) : (
                <>
                  Ingresar al Portal
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-10 pt-6 border-t border-zinc-200 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 text-xs tracking-[0.08em] uppercase transition-colors duration-200">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Volver al sitio
            </a>
            <a href="/contacto" className="text-zinc-400 hover:text-[#E02020] text-xs tracking-[0.08em] uppercase transition-colors duration-200">
              Solicitar acceso
            </a>
          </div>
        </motion.div>
      </div>

    </div>
  );
}