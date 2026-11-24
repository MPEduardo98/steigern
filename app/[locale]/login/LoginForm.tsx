// app/[locale]/login/LoginForm.tsx
// Login en dos pasos: credenciales y, si la contraseña es temporal, "crea tu
// contraseña". El panel no se ve hasta terminar el segundo paso.
"use client";

import { Suspense, useState, useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter as useIntlRouter } from "@root/i18n/navigation";
import { motion } from "framer-motion";
import { toast } from "@/_shared/ui/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import MX from "country-flag-icons/react/3x2/MX";
import US from "country-flag-icons/react/3x2/US";
import DE from "country-flag-icons/react/3x2/DE";
import { PASSWORD_MIN } from "@root/lib/usuarios-reglas";
import { crearPasswordAction, loginAction, logoutAction, type LoginState } from "../_actions/auth";

/** Sesión abierta con contraseña temporal (viene del servidor). */
export interface CambioPendiente {
  email: string;
}

const INPUT =
  "w-full bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 focus:bg-white transition-all placeholder:text-zinc-400 aria-[invalid=true]:border-accent";
const LABEL = "text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase block mb-1.5";

const LANGUAGES = [
  { code: "es", label: "Español", Flag: MX },
  { code: "en", label: "English", Flag: US },
  { code: "de", label: "Deutsch", Flag: DE },
];

// â”€â”€ Selector de idioma â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale       = useLocale();
  const pathname     = usePathname();
  const intlRouter   = useIntlRouter();

  return (
    <div className="flex items-center gap-1.5">
      {LANGUAGES.map((l) => {
        const active = locale === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => intlRouter.replace(pathname, { locale: l.code })}
            aria-label={l.label}
            title={l.label}
            className={`flex items-center justify-center w-8 h-6 rounded-[3px] border transition-all duration-200 cursor-pointer ${
              active
                ? "border-accent ring-1 ring-accent/40 opacity-100"
                : dark
                  ? "border-white/15 opacity-50 hover:opacity-100 hover:border-white/40"
                  : "border-zinc-200 opacity-50 hover:opacity-100 hover:border-zinc-400"
            }`}
          >
            <l.Flag aria-label={l.label} className="w-5 h-auto rounded-[1px]" />
          </button>
        );
      })}
    </div>
  );
}

// â”€â”€ Inner component que usa useSearchParams â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LoginForm({ pendiente }: { pendiente: CambioPendiente | null }) {
  const t            = useTranslations("Login");
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl");

  const [showPassword, setShowPassword] = useState(false);
  // Segundo paso: la temporal se guarda en memoria para no pedirla otra vez
  // (si se llega recargando o desde el panel no se tiene, y se pide).
  const [cambio, setCambio] = useState<{ email: string; temporal: string | null } | null>(
    pendiente ? { email: pendiente.email, temporal: null } : null
  );
  const [state, action, pending] = useActionState(
    async (prev: LoginState, formData: FormData) => {
      const r = await loginAction(prev, formData);
      if (r.mustChangePassword) {
        setCambio({
          email: String(formData.get("email") ?? ""),
          temporal: String(formData.get("password") ?? ""),
        });
      }
      return r;
    },
    {}
  );

  // Cada envío fallido devuelve un objeto nuevo, así que el efecto se dispara
  // en cada intento; el id fijo reemplaza el toast anterior en vez de apilarlos.
  useEffect(() => {
    if (state.error) toast.error(state.error, { id: "login-error" });
  }, [state]);

  useEffect(() => {
    if (!state.success) return;
    toast.dismiss("login-error");
    if (state.mustChangePassword) return;
    router.push(callbackUrl || "/admin");
  }, [state.success, state.mustChangePassword, callbackUrl, router]);

  return (
    <div className="min-h-screen flex bg-white">
      {/* â”€â”€ PANEL IZQUIERDO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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
          <Image
            src="/logos/Logo_White.png"
            alt="STEIGERN Design In Motion"
            width={1920}
            height={368}
            priority
            className="h-10 w-auto"
          />
          <div className="w-10 h-[3px] bg-accent mt-4" />
        </div>

        {/* Tagline */}
        <div className="space-y-6">
          <p className="text-[11px] text-zinc-500 font-bold tracking-[0.22em] uppercase">
            {t("panel_eyebrow")}
          </p>
          <h1 className="text-4xl font-black text-white leading-tight tracking-tight">
            {t("panel_title_line1")}<br />
            <span className="text-accent">{t("panel_title_line2")}</span>
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
            {t("panel_description")}
          </p>
        </div>

        {/* Footer */}
        <p className="text-[10px] text-zinc-600 tracking-widest uppercase">
          © {new Date().getFullYear()} STEIGERN Design In Motion
        </p>
      </motion.aside>

      {/* â”€â”€ PANEL DERECHO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex-1 flex flex-col items-center justify-center p-8 lg:p-16"
      >
        {/* Selector de idioma */}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-8">
          <LanguageSwitcher />
        </div>

        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Image
              src="/logos/Logo.png"
              alt="STEIGERN Design In Motion"
              width={1920}
              height={368}
              className="h-8 w-auto"
            />
            <div className="w-8 h-[3px] bg-accent mt-3" />
          </div>

          {cambio ? (
            <CrearPassword
              email={cambio.email}
              temporal={cambio.temporal}
              onDone={() => router.push(callbackUrl || "/admin")}
              onOtraCuenta={() => setCambio(null)}
            />
          ) : (
          <>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[3px] bg-accent" />
            <p className="text-[10px] text-zinc-400 font-bold tracking-[0.22em] uppercase">
              {t("welcome")}
            </p>
          </div>
          <h2 className="text-3xl font-black text-zinc-950 tracking-tight mb-8">
            {t("heading")}
          </h2>

          <form action={action} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase block mb-1.5">
                {t("email_label")}
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="usuario@steigern.com.mx"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 text-sm px-4 py-3 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 focus:bg-white transition-all placeholder:text-zinc-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] text-zinc-400 font-bold tracking-[0.15em] uppercase block mb-1.5">
                {t("password_label")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 text-sm px-4 py-3 pr-12 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 focus:bg-white transition-all placeholder:text-zinc-400"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="flex items-center justify-center gap-3 bg-accent hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold tracking-[0.12em] uppercase px-6 py-4 transition-all duration-200 rounded-md mt-1 shadow-[0_4px_16px_rgba(224,32,32,0.25)] hover:shadow-[0_6px_20px_rgba(224,32,32,0.35)] cursor-pointer"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t("submitting")}
                </span>
              ) : (
                <>
                  {t("submit")}
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
              {t("back")}
            </Link>
          </div>
          </>
          )}
        </div>
      </motion.main>
    </div>
  );
}

// â”€â”€ Page export con Suspense boundary â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ── Paso 2: crear contraseña (entró con una temporal) ─────────────────────
function CrearPassword({
  email,
  temporal,
  onDone,
  onOtraCuenta,
}: {
  email: string;
  temporal: string | null;
  onDone: () => void;
  onOtraCuenta: () => void;
}) {
  const t = useTranslations("Login");
  const [show, setShow] = useState(false);
  const [saliendo, setSaliendo] = useState(false);
  const [state, action, pending] = useActionState(crearPasswordAction, {});
  const err = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.success) {
      toast.success(t("change_success"));
      onDone();
    } else if (state.error) {
      toast.error(state.error, { id: "crear-password-error" });
    }
    // Solo al cambiar el resultado del envío.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const campo = (name: string, autoComplete: string, autoFocus = false) => ({
    id: name,
    name,
    type: show ? "text" : "password",
    autoComplete,
    autoFocus,
    required: true,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `${name}-error` : undefined,
    className: INPUT,
  });
  const error = (name: string) =>
    err[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-xs text-accent">
        {err[name]}
      </p>
    ) : null;

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-[3px] bg-accent" />
        <p className="text-[10px] text-zinc-400 font-bold tracking-[0.22em] uppercase">
          {t("change_eyebrow")}
        </p>
      </div>
      <h2 className="text-3xl font-black text-zinc-950 tracking-tight mb-3">
        {t("change_heading")}
      </h2>
      <p className="text-sm text-zinc-500 leading-relaxed mb-1">{t("change_description")}</p>
      <p className="text-sm font-medium text-zinc-900 mb-8 truncate">{email}</p>

      <form action={action} className="flex flex-col gap-5" noValidate>
        {/* Para que el gestor de contraseñas guarde la nueva con este correo. */}
        <input type="email" name="username" value={email} autoComplete="username" readOnly hidden />

        {temporal !== null ? (
          <input type="hidden" name="actual" value={temporal} />
        ) : (
          <div>
            <label htmlFor="actual" className={LABEL}>{t("temp_password_label")}</label>
            <input {...campo("actual", "current-password", true)} />
            {error("actual")}
          </div>
        )}

        <div>
          <label htmlFor="nueva" className={LABEL}>{t("new_password_label")}</label>
          <div className="relative">
            <input
              {...campo("nueva", "new-password", temporal !== null)}
              minLength={PASSWORD_MIN}
              className={`${INPUT} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <FontAwesomeIcon icon={show ? faEyeSlash : faEye} className="w-4 h-4" />
            </button>
          </div>
          {error("nueva")}
          {/* La temporal no se ve en este paso: si falla, su error sale aquí. */}
          {temporal !== null && error("actual")}
        </div>

        <div>
          <label htmlFor="confirmar" className={LABEL}>{t("confirm_password_label")}</label>
          <input {...campo("confirmar", "new-password")} />
          {error("confirmar")}
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed -mt-1">
          {t("password_hint", { min: PASSWORD_MIN })}
        </p>

        <button
          type="submit"
          disabled={pending || saliendo}
          className="flex items-center justify-center gap-3 bg-accent hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold tracking-[0.12em] uppercase px-6 py-4 transition-all duration-200 rounded-md mt-1 shadow-[0_4px_16px_rgba(224,32,32,0.25)] hover:shadow-[0_6px_20px_rgba(224,32,32,0.35)] cursor-pointer"
        >
          {pending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t("change_submitting")}
            </span>
          ) : (
            <>
              {t("change_submit")}
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-zinc-100">
        <button
          type="button"
          disabled={pending || saliendo}
          onClick={async () => {
            setSaliendo(true);
            onOtraCuenta();
            await logoutAction();
          }}
          className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
          {t("change_other_account")}
        </button>
      </div>
    </>
  );
}

export default function LoginClient({ pendiente }: { pendiente: CambioPendiente | null }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="w-6 h-6 border-2 border-zinc-200 border-t-accent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm pendiente={pendiente} />
    </Suspense>
  );
}
