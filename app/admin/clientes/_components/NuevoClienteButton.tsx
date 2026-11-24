// app/admin/clientes/_components/NuevoClienteButton.tsx
// Botón "Nuevo cliente" de la lista: abre el alta en un modal.
"use client";

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PanelModal from "../../_components/PanelModal";
import ClienteForm from "./ClienteForm";

export default function NuevoClienteButton() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="erp-btn erp-btn-primary">
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        Nuevo cliente
      </button>
      <PanelModal
        open={open}
        onClose={close}
        title="Nuevo cliente"
        description="El código de cliente lo asigna el sistema al guardar. Los contactos se agregan después, en su ficha."
      >
        <ClienteForm onClose={close} />
      </PanelModal>
    </>
  );
}
