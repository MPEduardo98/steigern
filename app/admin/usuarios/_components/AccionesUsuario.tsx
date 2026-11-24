// app/admin/usuarios/_components/AccionesUsuario.tsx
// Botones de la cabecera de la ficha: restablecer contraseña y desactivar/reactivar.
"use client";

import { useCallback, useState, useTransition } from "react";
import { toast } from "@/_shared/ui/toast";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { restablecerPassword, setUsuarioActivo } from "../actions";
import PasswordTemporalModal, { type Credenciales } from "./PasswordTemporalModal";

interface Props {
  id: number;
  nombre: string;
  activo: boolean;
}

export default function AccionesUsuario({ id, nombre, activo }: Props) {
  const [confirmar, setConfirmar] = useState<"reset" | "desactivar" | null>(null);
  const [credenciales, setCredenciales] = useState<Credenciales | null>(null);
  const [pending, startTransition] = useTransition();
  const closeCredenciales = useCallback(() => setCredenciales(null), []);

  function cambiarEstado(next: boolean) {
    startTransition(async () => {
      const res = await setUsuarioActivo(id, next);
      if (res.ok) {
        toast.success(next ? "Cuenta reactivada" : "Cuenta desactivada", {
          description: next ? undefined : "Sus sesiones abiertas se cerraron.",
        });
        setConfirmar(null);
      } else {
        toast.error(res.error);
      }
    });
  }

  function reset() {
    startTransition(async () => {
      const res = await restablecerPassword(id);
      setConfirmar(null);
      if (res.ok) setCredenciales({ email: res.email, password: res.password });
      else toast.error(res.error);
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {activo && (
        <button type="button" onClick={() => setConfirmar("reset")} className="erp-btn erp-btn-secondary">
          Restablecer contraseña
        </button>
      )}
      {activo ? (
        <button type="button" onClick={() => setConfirmar("desactivar")} className="erp-btn erp-btn-danger">
          Desactivar
        </button>
      ) : (
        <button type="button" onClick={() => cambiarEstado(true)} disabled={pending} className="erp-btn erp-btn-secondary">
          {pending ? "Reactivando…" : "Reactivar"}
        </button>
      )}

      <ConfirmDialog
        open={confirmar === "desactivar"}
        onClose={() => !pending && setConfirmar(null)}
        onConfirm={() => cambiarEstado(false)}
        loading={pending}
        title={`¿Desactivar la cuenta de ${nombre}?`}
        description="No podrá entrar al panel y sus sesiones abiertas se cierran al momento. Su historial se conserva y puedes reactivarla cuando quieras."
        confirmLabel="Desactivar"
      />
      <ConfirmDialog
        open={confirmar === "reset"}
        onClose={() => !pending && setConfirmar(null)}
        onConfirm={reset}
        loading={pending}
        title="¿Restablecer la contraseña?"
        description={`Se generará una contraseña temporal nueva para ${nombre}, su contraseña actual dejará de servir y se cerrarán sus sesiones abiertas.`}
        confirmLabel="Restablecer"
      />
      <PasswordTemporalModal credenciales={credenciales} onClose={closeCredenciales} title="Contraseña restablecida" />
    </div>
  );
}
