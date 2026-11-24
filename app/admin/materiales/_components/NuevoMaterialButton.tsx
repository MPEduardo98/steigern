// app/admin/materiales/_components/NuevoMaterialButton.tsx
// Botón "Nuevo material" de la lista: abre el alta en un modal.
"use client";

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { CategoriaMaterial, ProveedorOpcion } from "@root/lib/materiales";
import PanelModal from "../../_components/PanelModal";
import MaterialForm from "./MaterialForm";

interface Props {
  categorias: CategoriaMaterial[];
  proveedores: ProveedorOpcion[];
}

export default function NuevoMaterialButton({ categorias, proveedores }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="erp-btn erp-btn-primary">
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        Nuevo material
      </button>
      <PanelModal
        open={open}
        onClose={close}
        title="Nuevo material"
        description="El código de material lo asigna el sistema al guardar."
      >
        <MaterialForm categorias={categorias} proveedores={proveedores} onClose={close} />
      </PanelModal>
    </>
  );
}
