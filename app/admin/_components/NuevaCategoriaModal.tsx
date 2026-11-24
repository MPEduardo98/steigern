// app/admin/_components/NuevaCategoriaModal.tsx
// Modal pequeño para crear una categoría (de proveedor, de material…). Se abre
// encima de otro formulario, por eso no usa <form>: un formulario dentro de otro
// (aunque sea por portal) haría que React enviara también el de afuera.
"use client";

import { useState, useTransition } from "react";
import { toast } from "@/_shared/ui/toast";
import PanelModal from "./PanelModal";

export interface Categoria {
  id: number;
  nombre: string;
}

export type CrearCategoriaResult =
  | { ok: true; categoria: Categoria; existia: boolean }
  | { ok: false; error: string };

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (categoria: Categoria) => void;
  /** Server Action que crea la categoría. */
  crear: (nombre: string) => Promise<CrearCategoriaResult>;
  descripcion: string;
  placeholder: string;
}

export default function NuevaCategoriaModal({ open, onClose, descripcion, ...rest }: Props) {
  return (
    <PanelModal open={open} onClose={onClose} size="sm" title="Nueva categoría" description={descripcion}>
      <Contenido onClose={onClose} {...rest} />
    </PanelModal>
  );
}

/** Separado para que el estado se reinicie cada vez que se abre el modal. */
function Contenido({ onClose, onCreated, crear, placeholder }: Omit<Props, "open" | "descripcion">) {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function guardar() {
    if (pending) return;
    if (!nombre.trim()) {
      setError("Escribe el nombre de la categoría");
      return;
    }
    startTransition(async () => {
      const res = await crear(nombre);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      if (res.existia) toast.info(`“${res.categoria.nombre}” ya existía`, { description: "Se seleccionó esa." });
      else toast.success("Categoría creada");
      onCreated(res.categoria);
      onClose();
    });
  }

  return (
    <>
      <div className="p-5">
        <label htmlFor="categoria-nombre" className="erp-label">Nombre</label>
        <input
          id="categoria-nombre"
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
          placeholder={placeholder}
          maxLength={120}
          autoComplete="off"
          autoFocus
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "categoria-nombre-error" : undefined}
          className="erp-input"
        />
        {error && (
          <p id="categoria-nombre-error" className="erp-field-error">{error}</p>
        )}
      </div>
      <div className="flex justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        <button type="button" onClick={onClose} disabled={pending} className="erp-btn erp-btn-secondary">
          Cancelar
        </button>
        <button type="button" onClick={guardar} disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Creando…" : "Crear categoría"}
        </button>
      </div>
    </>
  );
}
