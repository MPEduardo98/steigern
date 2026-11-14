// app/admin/empleados/_components/NuevoDepartamentoModal.tsx
// Modal pequeño para crear un departamento. Se abre encima del formulario de
// empleado, por eso no usa <form>: un formulario dentro de otro (aunque sea por
// portal) haría que React enviara también el de afuera.
"use client";

import { useState, useTransition } from "react";
import { toast } from "@/_shared/ui/toast";
import PanelModal from "../../_components/PanelModal";
import { crearDepartamento } from "../actions";
import type { Departamento } from "@root/lib/empleados";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (departamento: Departamento) => void;
}

export default function NuevoDepartamentoModal({ open, onClose, onCreated }: Props) {
  return (
    <PanelModal
      open={open}
      onClose={onClose}
      size="sm"
      title="Nuevo departamento"
      description="Quedará disponible para todos los empleados."
    >
      <Contenido onClose={onClose} onCreated={onCreated} />
    </PanelModal>
  );
}

/** Separado para que el estado se reinicie cada vez que se abre el modal. */
function Contenido({ onClose, onCreated }: Omit<Props, "open">) {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function guardar() {
    if (pending) return;
    if (!nombre.trim()) {
      setError("Escribe el nombre del departamento");
      return;
    }
    startTransition(async () => {
      const res = await crearDepartamento(nombre);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      if (res.existia) toast.info(`“${res.departamento.nombre}” ya existía`, { description: "Se seleccionó ese." });
      else toast.success("Departamento creado");
      onCreated(res.departamento);
      onClose();
    });
  }

  return (
    <>
      <div className="p-5">
        <label htmlFor="departamento-nombre" className="erp-label">Nombre</label>
        <input
          id="departamento-nombre"
          value={nombre}
          onChange={(e) => {
            setNombre(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              guardar();
            }
          }}
          placeholder="Ej. Producción"
          maxLength={120}
          autoComplete="off"
          autoFocus
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "departamento-nombre-error" : undefined}
          className="erp-input"
        />
        {error && (
          <p id="departamento-nombre-error" className="erp-field-error">{error}</p>
        )}
      </div>
      <div className="flex justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        <button type="button" onClick={onClose} disabled={pending} className="erp-btn erp-btn-secondary">
          Cancelar
        </button>
        <button type="button" onClick={guardar} disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Creando…" : "Crear departamento"}
        </button>
      </div>
    </>
  );
}
