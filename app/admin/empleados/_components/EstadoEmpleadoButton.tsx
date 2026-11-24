// app/admin/empleados/_components/EstadoEmpleadoButton.tsx
// Dar de baja o reactivar a un empleado, con confirmación antes de la baja.
"use client";

import { useState, useTransition } from "react";
import { toast } from "@/_shared/ui/toast";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { setEmpleadoActivo } from "../actions";

interface Props {
  id: number;
  nombre: string;
  activo: boolean;
}

export default function EstadoEmpleadoButton({ id, nombre, activo }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function change(next: boolean) {
    startTransition(async () => {
      const res = await setEmpleadoActivo(id, next);
      if (res.ok) {
        toast.success(next ? "Empleado reactivado" : "Empleado dado de baja");
        setOpen(false);
      } else {
        toast.error(res.error ?? "No se pudo actualizar");
      }
    });
  }

  if (!activo) {
    return (
      <button type="button" onClick={() => change(true)} disabled={pending} className="erp-btn erp-btn-secondary">
        {pending ? "Reactivando…" : "Reactivar"}
      </button>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="erp-btn erp-btn-danger">
        Dar de baja
      </button>
      <ConfirmDialog
        open={open}
        onClose={() => !pending && setOpen(false)}
        onConfirm={() => change(false)}
        loading={pending}
        title={`¿Dar de baja a ${nombre}?`}
        description="Dejará de aparecer en la lista de activos. Su ficha y su historial se conservan y puedes reactivarlo cuando quieras."
        confirmLabel="Dar de baja"
      />
    </>
  );
}
