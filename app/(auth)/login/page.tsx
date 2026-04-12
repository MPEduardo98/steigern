// app/(auth)/login/page.tsx
"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faUser,
  faShield,
  faEye,
  faEyeSlash,
  faArrowRight,
  faCircleExclamation,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { loginAction } from "@/app/actions/auth";
import type { UserRole } from "@/auth";

const ROLES = [
  {
    id: "proveedor"      as UserRole,
    label: "Proveedor",
    desc:  "Gestión de órdenes y documentos",
    icon:  faBriefcase,
  },
  {
    id: "empleado"       as UserRole,
    label: "Empleado",
    desc:  "Acceso interno a proyectos",
    icon:  faUser,
  },
  {
    id: "administrador"  as UserRole,
    label: "Administrador",
    desc:  "Control total del sistema",
    icon:  faShield,
  },
];

const REDIRECT: Record<UserRole, string> = {
  administrador: "/admin",
  empleado:      "/admin",
  proveedor:     "/portal-proveedores",
};

// ─────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router        = useRouter();
  const searchParams  = useSearchParams();
  const callbackUrl   = searchParams.get("callbackUrl");

  const [role,         setRole]         = useState<UserRole>("proveedor");
  const [showPassword, setShowPassword] = useState(false);
  const [state,        action,  pending] = useActionState(loginAction, {});

  // Redirige en cuanto el server action confirma éxito
  useEffect(() => {
    if (!state.success) return;
    router.push(callbackUrl || REDIRECT[role]);
  }, [state.success, callbackUrl, role, router]);

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950">

      {/* ── PANEL IZQUIERDO ─────────────────────────────────────── */}
      <motion.aside
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-[46%] relative flex-col justify-between p-16 bg-zinc-950 overflow-hidden"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(224,32,32,0.6) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(224,32,32,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Barra roja izquierda */}
        <div className="absolute left-0 top-0 w-[3px] h-full bg-[#E02020]" />

        {/* Glow rojo central */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#E02020] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

        {/* Logo */}
        <a href="/" className="relative z-10">
          <span
            className="text-white text-4xl leading-none tracking-[0.18em] uppercase"
            style={{ fontFamily: "var(--font-bankgothic),'Helvetica Neue',Arial,sans-serif", fontWeight: 300 }}
          >
            STEIGERN
          </span>
        </a>

        {/* Copy central */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-px bg-[#E02020]" />
            <span className="text-[#E02020] text-[10px] font-bold tracking-[0.3em] uppercase">
              Portal Interno
            </span>
          </div>

          <h2
            className="text-white font-black text-[clamp(2.4rem,3.5vw,4rem)] leading-[0.93] tracking-[-0.03em] uppercase mb-6"
            style={{ fontFamily: "var(--font-body),'Open Sans',sans-serif" }}
          >
            Acceso
            <br />
            <span className="text-[#E02020]">Seguro</span>
          </h2>

          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
            Plataforma centralizada para proveedores, empleados y
            administradores de STEIGERN Design In Motion.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="relative z-10 border-t border-zinc-800 pt-8 flex flex-col gap-4"
        >
          {[
            { label: "Cifrado de sesión", value: "JWT · HS256" },
            { label: "Expiración",        value: "8 horas"     },
            { label: "Acceso restringido",value: "Por rol"      },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-zinc-600 text-[10px] uppercase tracking-[0.15em]">{label}</span>
              <span className="text-zinc-400 text-[10px] font-bold tracking-[0.1em]">{value}</span>
            </div>
          ))}
        </motion.div>
      </motion.aside>

      {/* ── PANEL DERECHO ───────────────────────────────────────── */}
      <main className="flex-1 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 bg-white dark:bg-zinc-950">

        {/* Logo mobile */}
        <div className="lg:hidden mb-12">
          <a href="/">
            <span
              className="text-[#E02020] text-3xl leading-none tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-bankgothic),'Helvetica Neue',Arial,sans-serif", fontWeight: 300 }}
            >
              STEIGERN
            </span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[420px] mx-auto lg:mx-0"
        >
          {/* Encabezado */}
          <div className="mb-10">
            <h1
              className="text-zinc-900 dark:text-zinc-100 font-black text-3xl uppercase tracking-[-0.02em] mb-1.5"
              style={{ fontFamily: "var(--font-body),'Open Sans',sans-serif" }}
            >
              Iniciar Sesión
            </h1>
            <p className="text-zinc-400 text-sm">
              Selecciona tu perfil de acceso y continúa.
            </p>
          </div>

          <form action={action} className="flex flex-col gap-5">
            {/* ── Selector de rol ── */}
            <div>
              <p className="text-[10px] text-zinc-400 font-bold tracking-[0.18em] uppercase mb-3">
                Tipo de acceso
              </p>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => {
                  const active = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`
                        relative flex flex-col items-center gap-2 p-4 border
                        text-center transition-all duration-200 cursor-pointer
                        ${active
                          ? "border-[#E02020] bg-red-50 dark:bg-red-950/20"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600"
                        }
                      `}
                    >
                      <FontAwesomeIcon
                        icon={r.icon}
                        className={`w-4 h-4 transition-colors duration-200 ${active ? "text-[#E02020]" : "text-zinc-400 dark:text-zinc-600"}`}
                      />
                      <span className={`text-[10px] font-black tracking-[0.1em] uppercase leading-tight transition-colors ${active ? "text-[#E02020]" : "text-zinc-500 dark:text-zinc-400"}`}>
                        {r.label}
                      </span>

                      {/* input hidden para el role */}
                      {active && (
                        <input type="hidden" name="role" value={r.id} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Descripción animada del rol */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={role}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1,  y: 0  }}
                  exit={{   opacity: 0,  y:  4  }}
                  transition={{ duration: 0.18 }}
                  className="text-zinc-400 text-xs mt-2 text-center"
                >
                  {ROLES.find((r) => r.id === role)?.desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* ── Email ── */}
            <div>
              <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase block mb-1.5">
                Correo Electrónico
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="usuario@steigern.com.mx"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
            </div>

            {/* ── Contraseña ── */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase">
                  Contraseña
                </label>
              </div>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm px-4 py-3.5 pr-12 focus:outline-none focus:border-[#E02020] transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Error ── */}
            <AnimatePresence>
              {state.error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{   opacity: 0, height: 0       }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 px-4 py-3 border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
                >
                  <FontAwesomeIcon icon={faCircleExclamation} className="w-3.5 h-3.5 text-[#E02020] shrink-0" />
                  <p className="text-[#E02020] text-xs font-semibold">{state.error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#E02020] text-white text-xs font-black tracking-[0.2em] uppercase py-4 hover:bg-[#c41a1a] transition-colors duration-200 flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {pending ? (
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
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                  />
                </>
              )}
            </button>
          </form>

          {/* ── Footer del form ── */}
          <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs tracking-[0.08em] uppercase transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
              Volver al sitio
            </a>
            <a
              href="/contacto"
              className="text-zinc-400 hover:text-[#E02020] text-xs tracking-[0.08em] uppercase transition-colors duration-200"
            >
              Solicitar acceso
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}