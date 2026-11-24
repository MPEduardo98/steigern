// app/admin/empleados/_components/expediente/DatosLegalesForm.tsx
// Captura y edición de datos legales (dentro de un modal). El servidor valida
// todo; aquí solo se dan pistas al teclear (fecha de nacimiento, banco).
"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "@/_shared/ui/toast";
import PanelSelect from "../../../_components/PanelSelect";
import type { DatosLegales } from "@root/lib/expediente";
import {
  ESTADOS_CIVILES,
  bancoDeClabe,
  datosDeCurp,
  validarClabe,
  validarCurp,
} from "@root/lib/expediente-reglas";
import { guardarDatosLegales, type ExpedienteFormState } from "../../expediente-actions";
import { formatFecha } from "../format";
import { FieldError } from "./comunes";

interface Props {
  empleadoId: number;
  datos: DatosLegales | null;
  onClose: () => void;
  onSaved: () => void;
}

const SEXO = { H: "hombre", M: "mujer", X: "no binario" } as const;

export default function DatosLegalesForm({ empleadoId, datos, onClose, onSaved }: Props) {
  const [state, action, pending] = useActionState<ExpedienteFormState, FormData>(guardarDatosLegales, {});

  const initial: Record<string, string> = {
    curp: datos?.curp ?? "",
    rfc: datos?.rfc ?? "",
    nss: datos?.nss ?? "",
    clabe: datos?.clabe ?? "",
    estado_civil: datos?.estado_civil ?? "",
    nacionalidad: datos?.nacionalidad ?? "Mexicana",
    calle: datos?.calle ?? "",
    numero_exterior: datos?.numero_exterior ?? "",
    numero_interior: datos?.numero_interior ?? "",
    colonia: datos?.colonia ?? "",
    municipio: datos?.municipio ?? "",
    estado: datos?.estado ?? "",
    codigo_postal: datos?.codigo_postal ?? "",
    emergencia_nombre: datos?.emergencia_nombre ?? "",
    emergencia_parentesco: datos?.emergencia_parentesco ?? "",
    emergencia_telefono: datos?.emergencia_telefono ?? "",
    credito_infonavit: datos?.credito_infonavit ?? "",
    credito_fonacot: datos?.credito_fonacot ?? "",
  };
  const v = state.values ?? initial;
  const err = state.fieldErrors ?? {};

  // Campos con pista en vivo: se controlan para leerlos al teclear.
  const [curp, setCurp] = useState(v.curp);
  const [clabe, setClabe] = useState(v.clabe);
  const [estadoCivil, setEstadoCivil] = useState(v.estado_civil);
  const [lastValues, setLastValues] = useState(state.values);
  if (lastValues !== state.values) {
    setLastValues(state.values);
    if (state.values) {
      setCurp(state.values.curp);
      setClabe(state.values.clabe);
      setEstadoCivil(state.values.estado_civil);
    }
  }

  useEffect(() => {
    if (state.ok) {
      toast.success("Datos legales guardados");
      onSaved();
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, onSaved]);

  const curpLimpia = curp.replace(/[\s-]/g, "").toUpperCase();
  const pistaCurp =
    curpLimpia.length === 18 && !validarCurp(curpLimpia)
      ? (() => {
          const d = datosDeCurp(curpLimpia)!;
          return `Nació el ${formatFecha(d.fechaNacimiento)} · ${SEXO[d.sexo]}`;
        })()
      : null;
  const clabeLimpia = clabe.replace(/[\s-]/g, "");
  const pistaClabe =
    clabeLimpia.length === 18 && !validarClabe(clabeLimpia) ? bancoDeClabe(clabeLimpia) ?? "Banco no listado" : null;

  const field = (name: string) => ({
    id: `legal-${name}`,
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
      <div className="min-h-0 flex-1 overflow-y-auto">
        {state.fieldErrors && (
          <p role="alert" className="mx-5 mt-5 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-[13px] text-[#a51515]">
            {state.error}
          </p>
        )}

        <Grupo titulo="Identificación">
          <div className="sm:col-span-2">
            <label htmlFor="legal-curp" className="erp-label">CURP</label>
            <input
              {...field("curp")}
              defaultValue={undefined}
              value={curp}
              onChange={(e) => setCurp(e.target.value)}
              maxLength={20}
              className="erp-input font-mono uppercase"
              placeholder="18 caracteres"
              autoFocus
            />
            {pistaCurp && !err.curp && <p className="mt-1.5 text-[12px] text-[#15803d]">{pistaCurp}</p>}
            <FieldError name="curp" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-rfc" className="erp-label">RFC <small>(con homoclave)</small></label>
            <input {...field("rfc")} maxLength={15} className="erp-input font-mono uppercase" placeholder="13 caracteres" />
            <FieldError name="rfc" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-nss" className="erp-label">NSS <small>(IMSS)</small></label>
            <input {...field("nss")} inputMode="numeric" maxLength={13} className="erp-input font-mono" placeholder="11 dígitos" />
            <FieldError name="nss" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-estado_civil" className="erp-label">Estado civil</label>
            <PanelSelect
              id="legal-estado_civil"
              name="estado_civil"
              value={estadoCivil}
              onChange={setEstadoCivil}
              options={[{ value: "", label: "Sin especificar" }, ...ESTADOS_CIVILES]}
              invalid={Boolean(err.estado_civil)}
            />
            <FieldError name="estado_civil" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-nacionalidad" className="erp-label">Nacionalidad</label>
            <input {...field("nacionalidad")} />
            <FieldError name="nacionalidad" errors={err} />
          </div>
        </Grupo>

        <Grupo titulo="Domicilio" nota="El SAT lo pide para timbrar la nómina; el código postal debe coincidir con la constancia fiscal.">
          <div className="sm:col-span-2">
            <label htmlFor="legal-calle" className="erp-label">Calle</label>
            <input {...field("calle")} />
            <FieldError name="calle" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-numero_exterior" className="erp-label">Número exterior</label>
            <input {...field("numero_exterior")} />
            <FieldError name="numero_exterior" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-numero_interior" className="erp-label">Número interior <small>(opcional)</small></label>
            <input {...field("numero_interior")} />
            <FieldError name="numero_interior" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-colonia" className="erp-label">Colonia</label>
            <input {...field("colonia")} />
            <FieldError name="colonia" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-codigo_postal" className="erp-label">Código postal</label>
            <input {...field("codigo_postal")} inputMode="numeric" maxLength={5} />
            <FieldError name="codigo_postal" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-municipio" className="erp-label">Municipio o alcaldía</label>
            <input {...field("municipio")} />
            <FieldError name="municipio" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-estado" className="erp-label">Estado</label>
            <input {...field("estado")} />
            <FieldError name="estado" errors={err} />
          </div>
        </Grupo>

        <Grupo titulo="Contacto de emergencia">
          <div className="sm:col-span-2">
            <label htmlFor="legal-emergencia_nombre" className="erp-label">Nombre</label>
            <input {...field("emergencia_nombre")} />
            <FieldError name="emergencia_nombre" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-emergencia_parentesco" className="erp-label">Parentesco</label>
            <input {...field("emergencia_parentesco")} placeholder="Ej. Madre" />
            <FieldError name="emergencia_parentesco" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-emergencia_telefono" className="erp-label">Teléfono</label>
            <input {...field("emergencia_telefono")} type="tel" />
            <FieldError name="emergencia_telefono" errors={err} />
          </div>
        </Grupo>

        <Grupo titulo="Nómina">
          <div className="sm:col-span-2">
            <label htmlFor="legal-clabe" className="erp-label">CLABE interbancaria</label>
            <input
              {...field("clabe")}
              defaultValue={undefined}
              value={clabe}
              onChange={(e) => setClabe(e.target.value)}
              inputMode="numeric"
              maxLength={22}
              className="erp-input font-mono"
              placeholder="18 dígitos"
            />
            {pistaClabe && !err.clabe && <p className="mt-1.5 text-[12px] text-[#15803d]">{pistaClabe}</p>}
            <FieldError name="clabe" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-credito_infonavit" className="erp-label">Crédito Infonavit <small>(número, si tiene)</small></label>
            <input {...field("credito_infonavit")} className="erp-input font-mono" />
            <FieldError name="credito_infonavit" errors={err} />
          </div>
          <div>
            <label htmlFor="legal-credito_fonacot" className="erp-label">Crédito Fonacot <small>(número, si tiene)</small></label>
            <input {...field("credito_fonacot")} className="erp-input font-mono" />
            <FieldError name="credito_fonacot" errors={err} />
          </div>
        </Grupo>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">Cancelar</button>
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}

function Grupo({ titulo, nota, children }: { titulo: string; nota?: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-[#ebebeb] p-5 last-of-type:border-b-0">
      <h3 className="text-[13.5px] font-semibold">{titulo}</h3>
      {nota && <p className="mt-0.5 text-[12px] text-[#a3a3a3]">{nota}</p>}
      <div className="mt-3 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}
