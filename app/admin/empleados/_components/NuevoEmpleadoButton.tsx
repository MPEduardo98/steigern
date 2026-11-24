// app/admin/empleados/_components/NuevoEmpleadoButton.tsx
// Botón "Nuevo empleado" de la lista: abre el alta en un modal.
"use client";

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { Departamento } from "@root/lib/empleados";
import PanelModal from "../../_components/PanelModal";
import EmpleadoForm from "./EmpleadoForm";

interface Props {
  departamentos: Departamento[];
  fechaHoy: string;
}

export default function NuevoEmpleadoButton({ departamentos, fechaHoy }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="erp-btn erp-btn-primary">
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        Nuevo empleado
      </button>
      <PanelModal
        open={open}
        onClose={close}
        title="Nuevo empleado"
        description="El número de empleado lo asigna el sistema al guardar."
      >
        <EmpleadoForm
          departamentos={departamentos}
          fechaHoy={fechaHoy}
          onClose={close}
        />
      </PanelModal>
    </>
  );
}
