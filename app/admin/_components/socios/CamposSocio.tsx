// app/admin/_components/socios/CamposSocio.tsx
// Piezas de los formularios de cliente y proveedor: secciones, campos de texto,
// selects y los bloques de datos fiscales y domicilio que ambos piden.
"use client";

import { useState } from "react";
import PanelSelect, { type SelectOption } from "../PanelSelect";
import { MONEDAS, REGIMENES_FISCALES } from "@root/lib/socios-reglas";

type Valores = Record<string, string>;

export function Section({
  title,
  description,
  stacked,
  children,
}: {
  title: string;
  description: string;
  /** Título arriba de los campos en vez de a su izquierda (para el modal). */
  stacked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`grid gap-x-10 gap-y-4 border-b border-[#ebebeb] p-5 last-of-type:border-b-0 ${
        stacked ? "" : "lg:grid-cols-[220px_1fr]"
      }`}
    >
      <div>
        <h2 className="text-[14px] font-semibold">{title}</h2>
        <p className="mt-0.5 text-[12.5px] text-[#a3a3a3]">{description}</p>
      </div>
      <div className="grid content-start gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function CampoError({ name, err }: { name: string; err: Valores }) {
  return err[name] ? (
    <p id={`${name}-error`} className="erp-field-error">
      {err[name]}
    </p>
  ) : null;
}

/** Campo de texto con etiqueta y error. */
export function Campo({
  name,
  label,
  opcional,
  v,
  err,
  ancho,
  multilinea,
  ...input
}: {
  name: string;
  label: string;
  opcional?: boolean;
  v: Valores;
  err: Valores;
  /** Ocupa las dos columnas. */
  ancho?: boolean;
  multilinea?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "defaultValue">) {
  const props = {
    id: name,
    name,
    defaultValue: v[name],
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `${name}-error` : undefined,
    className: `erp-input${multilinea ? " h-auto min-h-[88px] py-2" : ""}`,
    autoComplete: "off",
  };
  return (
    <div className={ancho ? "sm:col-span-2" : undefined}>
      <label htmlFor={name} className="erp-label">
        {label} {opcional && <small>(opcional)</small>}
      </label>
      {multilinea ? (
        <textarea {...props} placeholder={input.placeholder} rows={3} />
      ) : (
        <input {...props} {...input} />
      )}
      <CampoError name={name} err={err} />
    </div>
  );
}

/** Select del panel que guarda su propio valor y lo envía con el formulario. */
export function CampoSelect({
  name,
  label,
  opcional,
  v,
  err,
  options,
  ancho,
  accesorio,
  onValueChange,
  value: controlado,
}: {
  name: string;
  label: string;
  opcional?: boolean;
  v: Valores;
  err: Valores;
  options: SelectOption[];
  ancho?: boolean;
  /** Botón a la derecha del select (p. ej. "nueva categoría"). */
  accesorio?: React.ReactNode;
  onValueChange?: (value: string) => void;
  /** Para controlarlo desde afuera. */
  value?: string;
}) {
  const [propio, setPropio] = useState(v[name] ?? "");
  const value = controlado ?? propio;
  return (
    <div className={ancho ? "sm:col-span-2" : undefined}>
      <label htmlFor={name} className="erp-label">
        {label} {opcional && <small>(opcional)</small>}
      </label>
      <div className="flex gap-2">
        <PanelSelect
          id={name}
          name={name}
          value={value}
          onChange={(next) => {
            setPropio(next);
            onValueChange?.(next);
          }}
          options={options}
          invalid={Boolean(err[name])}
          aria-describedby={err[name] ? `${name}-error` : undefined}
          className="min-w-0 flex-1"
        />
        {accesorio}
      </div>
      <CampoError name={name} err={err} />
    </div>
  );
}

const REGIMEN_OPTIONS: SelectOption[] = [
  { value: "", label: "Sin especificar" },
  ...REGIMENES_FISCALES.map((r) => ({ value: r.value, label: `${r.value} · ${r.label}` })),
];

/** Razón social, nombre comercial, RFC y régimen. */
export function CamposFiscales({ v, err, autoFocus, children }: { v: Valores; err: Valores; autoFocus?: boolean; children?: React.ReactNode }) {
  return (
    <>
      <Campo
        name="razon_social"
        label="Razón social"
        v={v}
        err={err}
        ancho
        autoFocus={autoFocus}
        placeholder="Como aparece en la constancia de situación fiscal"
        required
      />
      <Campo name="nombre_comercial" label="Nombre comercial" opcional v={v} err={err} />
      <Campo
        name="rfc"
        label="RFC"
        opcional
        v={v}
        err={err}
        maxLength={13}
        placeholder="12 o 13 caracteres"
        className="erp-input font-mono uppercase"
      />
      <CampoSelect name="regimen_fiscal" label="Régimen fiscal" opcional v={v} err={err} options={REGIMEN_OPTIONS} ancho />
      {children}
    </>
  );
}

/** Correo, teléfono y sitio web generales de la empresa. */
export function CamposContacto({ v, err }: { v: Valores; err: Valores }) {
  return (
    <>
      <Campo name="email" label="Correo" opcional v={v} err={err} type="email" />
      <Campo name="telefono" label="Teléfono" opcional v={v} err={err} type="tel" />
      <Campo name="sitio_web" label="Sitio web" opcional v={v} err={err} placeholder="empresa.com" ancho />
    </>
  );
}

/** Domicilio. En México el código postal es también el domicilio fiscal del CFDI. */
export function CamposDomicilio({ v, err }: { v: Valores; err: Valores }) {
  return (
    <>
      <Campo name="direccion" label="Calle y número" opcional v={v} err={err} ancho placeholder="Calle, número, colonia" />
      <Campo name="codigo_postal" label="Código postal" opcional v={v} err={err} inputMode="numeric" maxLength={12} />
      <Campo name="ciudad" label="Ciudad o municipio" opcional v={v} err={err} />
      <Campo name="estado" label="Estado" opcional v={v} err={err} />
      <Campo name="pais" label="País" v={v} err={err} required />
    </>
  );
}

export const MONEDA_OPTIONS: SelectOption[] = MONEDAS.map((m) => ({ value: m.value, label: m.label }));

/** Banner de error general arriba del formulario. */
export function ErrorGeneral({ mensaje }: { mensaje?: string }) {
  return mensaje ? (
    <p role="alert" className="mx-5 mt-5 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-[13px] text-[#a51515]">
      {mensaje}
    </p>
  ) : null;
}
