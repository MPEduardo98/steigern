// app/admin/usuarios/_components/NuevoUsuarioButton.tsx
// "Nuevo usuario": abre el alta en un modal y, al guardar, muestra la
// contraseña temporal en otro.
"use client";

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { EmpleadoSinCuenta } from "@root/lib/usuarios";
import PanelModal from "../../_components/PanelModal";
import UsuarioForm from "./UsuarioForm";
import PasswordTemporalModal, { type Credenciales } from "./PasswordTemporalModal";

export default function NuevoUsuarioButton({ empleados }: { empleados: EmpleadoSinCuenta[] }) {
  const [open, setOpen] = useState(false);
  const [credenciales, setCredenciales] = useState<Credenciales | null>(null);
  const close = useCallback(() => setOpen(false), []);
  const closeCredenciales = useCallback(() => setCredenciales(null), []);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="erp-btn erp-btn-primary">
        <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
        Nuevo usuario
      </button>
      <PanelModal open={open} onClose={close} title="Nuevo usuario" description="Dale acceso al panel a una persona.">
        <UsuarioForm empleados={empleados} onClose={close} onCreated={setCredenciales} />
      </PanelModal>
      <PasswordTemporalModal credenciales={credenciales} onClose={closeCredenciales} title="Cuenta creada" />
    </>
  );
}
