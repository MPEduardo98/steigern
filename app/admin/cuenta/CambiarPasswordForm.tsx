// app/admin/cuenta/CambiarPasswordForm.tsx
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/_shared/ui/toast";
import { PASSWORD_MIN } from "@root/lib/usuarios-reglas";
import { cambiarMiPassword, type PasswordFormState } from "./actions";

interface Props {
  email: string;
}

export default function CambiarPasswordForm({ email }: Props) {
  const router = useRouter();
  const form = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState<PasswordFormState, FormData>(cambiarMiPassword, {});
  const err = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.ok) {
      toast.success("Contraseña cambiada", { description: "Se cerraron tus sesiones en otros dispositivos." });
      form.current?.reset();
      router.refresh();
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, router]);

  const field = (name: string, autoComplete: string) => ({
    id: name,
    name,
    type: "password",
    autoComplete,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `${name}-error` : undefined,
    className: "erp-input",
  });
  const error = (name: string) =>
    err[name] ? (
      <p id={`${name}-error`} className="erp-field-error">
        {err[name]}
      </p>
    ) : null;

  return (
    <form ref={form} action={action} className="erp-card erp-entrar" noValidate>
      <div className="border-b border-[#ebebeb] px-5 py-4">
        <h2 className="text-[14px] font-semibold">Cambiar contraseña</h2>
        <p className="mt-0.5 text-[12.5px] text-[#a3a3a3]">
          Mínimo {PASSWORD_MIN} caracteres. Una frase de varias palabras es más segura y fácil de recordar.
        </p>
      </div>
      {/* Ayuda a los gestores de contraseñas a guardar la nueva con el correo correcto. */}
      <input type="email" name="username" value={email} autoComplete="username" readOnly hidden />
      <div className="grid gap-4 px-5 py-5">
        <div>
          <label htmlFor="actual" className="erp-label">
            Contraseña actual
          </label>
          <input {...field("actual", "current-password")} />
          {error("actual")}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nueva" className="erp-label">Nueva contraseña</label>
            <input {...field("nueva", "new-password")} minLength={PASSWORD_MIN} />
            {error("nueva")}
          </div>
          <div>
            <label htmlFor="confirmar" className="erp-label">Confírmala</label>
            <input {...field("confirmar", "new-password")} />
            {error("confirmar")}
          </div>
        </div>
      </div>
      <div className="flex justify-end border-t border-[#ebebeb] px-5 py-4">
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : "Cambiar contraseña"}
        </button>
      </div>
    </form>
  );
}
