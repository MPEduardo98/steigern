// app/(auth)/login/page.tsx
"use client";

import { Suspense, useState, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
  { id: "proveedor"     as UserRole, label: "Proveedor",      desc: "Gestión de órdenes y documentos",  icon: faBriefcase },
  { id: "empleado"      as UserRole, label: "Empleado",       desc: "Acceso interno a proyectos",        icon: faUser      },
  { id: "administrador" as UserRole, label: "Administrador",  desc: "Control total del sistema",         icon: faShield    },
];

const REDIRECT: Record<UserRole, string> = {
  administrador: "/admin",
  empleado:      "/admin",
  proveedor:     "/portal-proveedores",
};

// ── Inner component que usa useSearchParams ──────────────────────────────────
function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl");

  const [role,         setRole]        = useState<UserRole>("proveedor");
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending]       = useActionState(loginAction, {});

  useEffect(() => {
    if (!state.success) return;
    router.push(callbackUrl || REDIRECT[role]);
  }, [state.success, callbackUrl, role, router]);

  return (
    <div className="min-h-screen flex bg-white">
      {/* ── PANEL IZQUIERDO ───────────────────────────────────────────────── */}
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
        <div className="absolute left-0 top-0 w-[3px] h-full bg-accent" />

        {/* Glow rojo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-accent opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div>
          <span className="font-brand text-3xl font-black tracking-widest text-white uppercase">
            STEIGERN
          </span>
          <div className="w-8 h-px bg-accent mt-4" />
        </div>

        {/* Tagline */}
        <div className="space-y-6">
          <p className="text-[11px] text-zinc-500 font-bold tracking-[0.22em] uppercase">
            Portal Corporativo
          </p>
          <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
            Ingeniería en<br />
            <span className="text-accent">Movimiento</span>
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
            Accede al sistema centralizado de gestión de proyectos, proveedores y operaciones de STEIGERN.
          </p>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-zinc-600 tracking-widest uppercase">
          © {new Date().getFullYear()} STEIGERN Design In Motion
        </p>
      </motion.aside>

      {/* ── PANEL DERECHO ────────────────────────────────────────────────── */}
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <span className="font-brand text-2xl font-black tracking-widest text-zinc-950 uppercase">
              STEIGERN
            </span>
          </div>

          <p className="text-[10px] text-zinc-400 font-bold tracking-[0.22em] uppercase mb-2">
            Bienvenido
          </p>
          <h2 className="text-2xl font-black text-zinc-950 tracking-tight mb-8">
            Iniciar sesión
          </h2>

          <form action={action} className="flex flex-col gap-5">
            {/* Selector de rol */}
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
                          ? "border-accent bg-red-50"
                          : "border-zinc-200 hover:border-zinc-400"
                        }
                      `}
                    >
                      <FontAwesomeIcon
                        icon={r.icon}
                        className={`w-4 h-4 transition-colors duration-200 ${active ? "text-accent" : "text-zinc-400"}`}
                      />
                      <span className={`text-[10px] font-black tracking-[0.1em] uppercase leading-tight transition-colors ${active ? "text-accent" : "text-zinc-500"}`}>
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <input type="hidden" name="role" value={role} />
            </div>

            {/* Email */}
            <div>
              <label className="text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase block mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="usuario@steigern.com.mx"
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors placeholder:text-zinc-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase block mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm px-4 py-3 pr-12 focus:outline-none focus:border-accent transition-colors placeholder:text-zinc-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {state.error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
                >
                  <FontAwesomeIcon icon={faCircleExclamation} className="w-4 h-4 shrink-0" />
                  {state.error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="flex items-center justify-center gap-3 bg-accent hover:bg-red-700 disabled:opacity-60 text-white text-sm font-bold tracking-[0.12em] uppercase px-6 py-4 transition-colors duration-200 rounded-lg mt-1"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando…
                </span>
              ) : (
                <>
                  Ingresar
                  <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Back */}
          <div className="mt-8 pt-8 border-t border-zinc-100">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
              Volver al sitio principal
            </Link>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

// ── Page export con Suspense boundary ────────────────────────────────────────
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="w-6 h-6 border-2 border-zinc-200 border-t-accent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}