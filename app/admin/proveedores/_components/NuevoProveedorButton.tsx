// app/admin/proveedores/_components/NuevoProveedorButton.tsx
// Botón "Nuevo proveedor" de la lista: abre el alta en un modal.
"use client";

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { CategoriaProveedor } from "@root/lib/proveedores";
import PanelModal from "../../_components/PanelModal";
import ProveedorForm from "./ProveedorForm";

export default function NuevoProveedorButton({ categorias }: { categorias: CategoriaProveedor[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="erp-btn erp-btn-primary">
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        Nuevo proveedor
      </button>
      <PanelModal
        open={open}
        onClose={close}
        title="Nuevo proveedor"
        description="El código de proveedor lo asigna el sistema al guardar. Los contactos se agregan después, en su ficha."
      >
        <ProveedorForm categorias={categorias} onClose={close} />
      </PanelModal>
    </>
  );
}
