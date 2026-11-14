// app/admin/usuarios/_components/PasswordTemporalModal.tsx
// Muestra la contraseña temporal una sola vez (al dar de alta o restablecer).
// No se guarda en ningún lado del navegador: al cerrar el modal se pierde.
"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/_shared/ui/toast";
import PanelModal from "../../_components/PanelModal";

export interface Credenciales {
  email: string;
  password: string;
}

interface Props {
  credenciales: Credenciales | null;
  onClose: () => void;
  title: string;
}

export default function PasswordTemporalModal({ credenciales, onClose, title }: Props) {
  return (
    <PanelModal
      open={Boolean(credenciales)}
      onClose={onClose}
      size="md"
      title={title}
      description="Compártela por un medio privado. Por seguridad no se vuelve a mostrar."
    >
      {credenciales && <Contenido credenciales={credenciales} onClose={onClose} />}
    </PanelModal>
  );
}

function Contenido({ credenciales, onClose }: { credenciales: Credenciales; onClose: () => void }) {
  const [copiado, setCopiado] = useState<"password" | "todo" | null>(null);

  async function copiar(que: "password" | "todo") {
    const texto =
      que === "password"
        ? credenciales.password
        : `Acceso al panel de STEIGERN\n${window.location.origin}/login\nCorreo: ${credenciales.email}\nContraseña temporal: ${credenciales.password}\nAl entrar te pedirá cambiarla.`;
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(que);
      setTimeout(() => setCopiado((c) => (c === que ? null : c)), 2000);
    } catch {
      toast.error("No se pudo copiar", { description: "Selecciona el texto y cópialo a mano." });
    }
  }

  return (
    <>
      <div className="space-y-4 px-5 py-5">
        <div>
          <p className="erp-label">Correo</p>
          <p className="text-[13.5px]">{credenciales.email}</p>
        </div>
        <div>
          <p className="erp-label">Contraseña temporal</p>
          <div className="flex gap-2">
            <code className="flex h-[38px] min-w-0 flex-1 select-all items-center overflow-x-auto rounded-lg border border-[#ebebeb] bg-[#fafafa] px-3 font-mono text-[15px] tracking-wide">
              {credenciales.password}
            </code>
            <button
              type="button"
              onClick={() => copiar("password")}
              className="erp-btn erp-btn-secondary h-[38px] shrink-0"
              aria-label="Copiar contraseña"
            >
              <FontAwesomeIcon icon={copiado === "password" ? faCheck : faCopy} className="h-3 w-3" />
              {copiado === "password" ? "Copiada" : "Copiar"}
            </button>
          </div>
        </div>
        <p className="rounded-lg bg-[#fff7e6] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#8a4a0a]">
          La persona deberá cambiarla la primera vez que entre. Si se pierde, puedes generar otra desde su ficha.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        <button type="button" onClick={() => copiar("todo")} className="erp-btn erp-btn-secondary">
          <FontAwesomeIcon icon={copiado === "todo" ? faCheck : faCopy} className="h-3 w-3" />
          {copiado === "todo" ? "Copiado" : "Copiar mensaje de acceso"}
        </button>
        <button type="button" onClick={onClose} className="erp-btn erp-btn-primary" autoFocus>
          Listo
        </button>
      </div>
    </>
  );
}
