// app/admin/proyectos/_components/NuevoProyectoButton.tsx
// Botón "Nuevo proyecto" de la lista: abre el alta en un modal.
"use client";

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { Opcion } from "@root/lib/proyectos";
import PanelModal from "../../_components/PanelModal";
import ProyectoForm from "./ProyectoForm";

interface Props {
  clientes: Opcion[];
  responsables: Opcion[];
  hoy: string;
}

export default function NuevoProyectoButton({ clientes, responsables, hoy }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="erp-btn erp-btn-primary">
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        Nuevo proyecto
      </button>
      <PanelModal
        open={open}
        onClose={close}
        title="Nuevo proyecto"
        description={
          clientes.length === 0
            ? "Primero da de alta un cliente activo en Clientes."
            : "El código de proyecto lo asigna el sistema al guardar."
        }
      >
        <ProyectoForm clientes={clientes} responsables={responsables} hoy={hoy} onClose={close} />
      </PanelModal>
    </>
  );
}
