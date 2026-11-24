// app/admin/empleados/_components/expediente/SubirDocumentoForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "@/_shared/ui/toast";
import PanelSelect from "../../../_components/PanelSelect";
import {
  EXTENSIONES_DOCUMENTO,
  MAX_DOCUMENTO_BYTES,
  TIPOS_DOCUMENTO,
  tipoDocumento,
} from "@root/lib/expediente-reglas";
import { subirDocumento, type ExpedienteFormState } from "../../expediente-actions";
import { formatBytes } from "../format";
import { FieldError } from "./comunes";

interface Props {
  empleadoId: number;
  tipoInicial: string;
  onClose: () => void;
}

export default function SubirDocumentoForm({ empleadoId, tipoInicial, onClose }: Props) {
  const [state, action, pending] = useActionState<ExpedienteFormState, FormData>(subirDocumento, {});
  const [tipo, setTipo] = useState(tipoInicial);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const v = state.values ?? { tipo: tipoInicial, fecha_vencimiento: "", notas: "" };
  const err: Record<string, string> = { ...state.fieldErrors, ...(errorLocal ? { archivo: errorLocal } : {}) };
  const pideVencimiento = tipoDocumento(tipo)?.vence ?? false;

  useEffect(() => {
    if (state.ok) {
      toast.success("Documento agregado al expediente");
      onClose();
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  // Tras un error React vacía el formulario, incluido el archivo: hay que volver a elegirlo.
  const [lastState, setLastState] = useState(state);
  if (lastState !== state) {
    setLastState(state);
    if (state.fieldErrors) setArchivo(null);
  }

  return (
    <form
      action={action}
      className="flex min-h-0 flex-1 flex-col"
      noValidate
      onSubmit={(e) => {
        // Antes de mandar 10 MB al servidor, se revisa aquí el tamaño.
        if (archivo && archivo.size > MAX_DOCUMENTO_BYTES) {
          e.preventDefault();
          setErrorLocal("El archivo pesa más de 10 MB");
        }
      }}
    >
      <input type="hidden" name="empleado_id" value={empleadoId} />
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
        <div>
          <label htmlFor="doc-tipo" className="erp-label">Tipo de documento</label>
          <PanelSelect
            id="doc-tipo"
            name="tipo"
            value={tipo}
            onChange={setTipo}
            placeholder="Elige el tipo"
            options={TIPOS_DOCUMENTO.map((t) => ({ value: t.value, label: t.label }))}
            invalid={Boolean(err.tipo)}
          />
          <FieldError name="tipo" errors={err} />
        </div>

        <div>
          <span className="erp-label">Archivo</span>
          <label
            htmlFor="doc-archivo"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-6 text-center transition-colors hover:bg-[#fafafa] ${
              err.archivo ? "border-[#e02020]" : "border-[#d4d4d4]"
            }`}
          >
            {archivo ? (
              <>
                <span className="max-w-full truncate text-[13px] font-medium">{archivo.name}</span>
                <span className="mt-0.5 text-[12px] text-[#a3a3a3]">{formatBytes(archivo.size)} · clic para cambiar</span>
              </>
            ) : (
              <>
                <span className="text-[13px] font-medium">Elige un archivo</span>
                <span className="mt-0.5 text-[12px] text-[#a3a3a3]">PDF, JPG, PNG o WEBP · hasta 10 MB</span>
              </>
            )}
          </label>
          <input
            id="doc-archivo"
            name="archivo"
            type="file"
            accept={EXTENSIONES_DOCUMENTO}
            className="sr-only"
            aria-invalid={err.archivo ? true : undefined}
            aria-describedby={err.archivo ? "archivo-error" : undefined}
            onChange={(e) => {
              setErrorLocal(null);
              setArchivo(e.target.files?.[0] ?? null);
            }}
          />
          <FieldError name="archivo" errors={err} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="doc-vencimiento" className="erp-label">
              Vence el <small>{pideVencimiento ? "(recomendado)" : "(opcional)"}</small>
            </label>
            <input
              id="doc-vencimiento"
              name="fecha_vencimiento"
              type="date"
              defaultValue={v.fecha_vencimiento}
              className="erp-input"
              aria-invalid={err.fecha_vencimiento ? true : undefined}
            />
            <FieldError name="fecha_vencimiento" errors={err} />
          </div>
          <div>
            <label htmlFor="doc-notas" className="erp-label">Nota <small>(opcional)</small></label>
            <input id="doc-notas" name="notas" defaultValue={v.notas} maxLength={300} className="erp-input" autoComplete="off" />
            <FieldError name="notas" errors={err} />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">Cancelar</button>
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Subiendo…" : "Subir"}
        </button>
      </div>
    </form>
  );
}
