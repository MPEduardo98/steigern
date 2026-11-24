// app/admin/empleados/_components/expediente/ContratoForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "@/_shared/ui/toast";
import PanelSelect from "../../../_components/PanelSelect";
import type { Documento } from "@root/lib/expediente";
import { JORNADAS, TIPOS_CONTRATO } from "@root/lib/expediente-reglas";
import { registrarContrato, type ExpedienteFormState } from "../../expediente-actions";
import { formatFechaHora } from "../format";
import { FieldError } from "./comunes";

interface Props {
  empleadoId: number;
  documentosContrato: Pick<Documento, "id" | "nombre_original" | "created_at">[];
  fechaSugerida: string;
  onClose: () => void;
}

export default function ContratoForm({ empleadoId, documentosContrato, fechaSugerida, onClose }: Props) {
  const [state, action, pending] = useActionState<ExpedienteFormState, FormData>(registrarContrato, {});
  const v = state.values ?? {
    tipo: "", fecha_inicio: fechaSugerida, fecha_fin: "", jornada: "diurna",
    salario_diario: "", sdi: "", documento_id: documentosContrato[0] ? String(documentosContrato[0].id) : "", notas: "",
  };
  const err = state.fieldErrors ?? {};

  const [tipo, setTipo] = useState(v.tipo);
  const [jornada, setJornada] = useState(v.jornada);
  const [documento, setDocumento] = useState(v.documento_id);
  const [lastValues, setLastValues] = useState(state.values);
  if (lastValues !== state.values) {
    setLastValues(state.values);
    if (state.values) {
      setTipo(state.values.tipo);
      setJornada(state.values.jornada);
      setDocumento(state.values.documento_id);
    }
  }

  useEffect(() => {
    if (state.ok) {
      toast.success("Contrato registrado");
      onClose();
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, onClose]);

  const field = (name: string) => ({
    id: `contrato-${name}`,
    name,
    defaultValue: v[name],
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `${name}-error` : undefined,
    className: "erp-input",
    autoComplete: "off",
  });

  return (
    <form action={action} className="flex min-h-0 flex-1 flex-col" noValidate>
      <input type="hidden" name="empleado_id" value={empleadoId} />
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="contrato-tipo" className="erp-label">Tipo de contrato</label>
            <PanelSelect
              id="contrato-tipo"
              name="tipo"
              value={tipo}
              onChange={setTipo}
              placeholder="Elige el tipo"
              options={[...TIPOS_CONTRATO]}
              invalid={Boolean(err.tipo)}
            />
            <FieldError name="tipo" errors={err} />
          </div>
          <div>
            <label htmlFor="contrato-fecha_inicio" className="erp-label">Inicio</label>
            <input {...field("fecha_inicio")} type="date" />
            <FieldError name="fecha_inicio" errors={err} />
          </div>
          <div>
            <label htmlFor="contrato-fecha_fin" className="erp-label">
              Término <small>{tipo === "indeterminado" ? "(no aplica)" : tipo === "obra" ? "(opcional)" : ""}</small>
            </label>
            <input {...field("fecha_fin")} type="date" disabled={tipo === "indeterminado"} />
            <FieldError name="fecha_fin" errors={err} />
          </div>
          <div>
            <label htmlFor="contrato-jornada" className="erp-label">Jornada</label>
            <PanelSelect id="contrato-jornada" name="jornada" value={jornada} onChange={setJornada} options={[...JORNADAS]} />
            <FieldError name="jornada" errors={err} />
          </div>
          <div className="hidden sm:block" />
          <div>
            <label htmlFor="contrato-salario_diario" className="erp-label">Salario diario <small>(MXN)</small></label>
            <input {...field("salario_diario")} inputMode="decimal" placeholder="0.00" />
            <FieldError name="salario_diario" errors={err} />
          </div>
          <div>
            <label htmlFor="contrato-sdi" className="erp-label">SDI <small>(salario diario integrado)</small></label>
            <input {...field("sdi")} inputMode="decimal" placeholder="0.00" />
            <FieldError name="sdi" errors={err} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="contrato-documento_id" className="erp-label">Contrato firmado <small>(opcional)</small></label>
            <PanelSelect
              id="contrato-documento_id"
              name="documento_id"
              value={documento}
              onChange={setDocumento}
              options={[
                { value: "", label: documentosContrato.length ? "Sin archivo" : "Primero sube el contrato en Documentos" },
                ...documentosContrato.map((d) => ({
                  value: String(d.id),
                  label: `${d.nombre_original} · ${formatFechaHora(d.created_at)}`,
                })),
              ]}
              invalid={Boolean(err.documento_id)}
            />
            <FieldError name="documento_id" errors={err} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="contrato-notas" className="erp-label">Notas <small>(opcional)</small></label>
            <input {...field("notas")} maxLength={300} />
            <FieldError name="notas" errors={err} />
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">Cancelar</button>
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : "Registrar"}
        </button>
      </div>
    </form>
  );
}
