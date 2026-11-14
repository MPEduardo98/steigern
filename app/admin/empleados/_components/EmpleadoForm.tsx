// app/admin/empleados/_components/EmpleadoForm.tsx
// Formulario de alta y edición. Valida en el servidor (saveEmpleado) y muestra
// los errores junto a cada campo sin perder lo escrito.
"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/_shared/ui/toast";
import PanelSelect, { type SelectOption } from "../../_components/PanelSelect";
import NuevoDepartamentoModal from "./NuevoDepartamentoModal";
import type { Departamento, Empleado } from "@root/lib/empleados";
import { saveEmpleado, type EmpleadoFormState } from "../actions";

interface Props {
  /** Sin empleado = alta. */
  empleado?: Empleado;
  departamentos: Departamento[];
  fechaHoy: string;
  /** Dentro de un modal: sin tarjeta, secciones apiladas y botones que cierran el modal. */
  onClose?: () => void;
}

export default function EmpleadoForm({ empleado, departamentos, fechaHoy, onClose }: Props) {
  const editing = Boolean(empleado);
  const inModal = Boolean(onClose);
  const [state, action, pending] = useActionState<EmpleadoFormState, FormData>(saveEmpleado, {});

  const initial: Record<string, string> = {
    nombre: empleado?.nombre ?? "",
    apellidos: empleado?.apellidos ?? "",
    email: empleado?.email ?? "",
    telefono: empleado?.telefono ?? "",
    puesto: empleado?.puesto ?? "",
    departamento: empleado?.departamento_id ? String(empleado.departamento_id) : "",
    fecha_ingreso: empleado?.fecha_ingreso ?? fechaHoy,
    salario: empleado?.salario != null ? empleado.salario.toFixed(2) : "",
  };
  // Tras un error, React reinicia el formulario: se repone lo que se envió.
  const v = state.values ?? initial;
  const err = state.fieldErrors ?? {};

  const [depto, setDepto] = useState(v.departamento);
  const [lastValues, setLastValues] = useState(state.values);
  if (lastValues !== state.values) {
    setLastValues(state.values);
    if (state.values) setDepto(state.values.departamento);
  }

  // Departamentos creados desde el modal en esta sesión del formulario.
  const [creados, setCreados] = useState<Departamento[]>([]);
  const [deptoModal, setDeptoModal] = useState(false);
  const closeDeptoModal = useCallback(() => setDeptoModal(false), []);
  const deptoOptions: SelectOption[] = [
    { value: "", label: "Sin departamento" },
    ...[...departamentos, ...creados.filter((c) => !departamentos.some((d) => d.id === c.id))]
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
      .map((d) => ({ value: String(d.id), label: d.nombre })),
  ];

  useEffect(() => {
    if (state.ok && state.id) {
      // revalidatePath ya trae los datos nuevos en la misma respuesta.
      if (editing) {
        toast.success("Cambios guardados");
      } else {
        // La lista ya viene actualizada; el nuevo aparece al cerrar el modal.
        toast.success("Empleado dado de alta", {
          description: `Se le asignó el número ${state.numero}.`,
        });
        onClose?.();
      }
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, editing, onClose]);

  const field = (name: string) => ({
    id: name,
    name,
    defaultValue: v[name],
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `${name}-error` : undefined,
    className: "erp-input",
  });
  const error = (name: string) =>
    err[name] ? (
      <p id={`${name}-error`} className="erp-field-error">
        {err[name]}
      </p>
    ) : null;

  return (
    <form
      action={action}
      className={inModal ? "flex min-h-0 flex-1 flex-col" : "erp-card erp-entrar"}
      noValidate
    >
      {empleado && <input type="hidden" name="id" value={empleado.id} />}
      <div className={inModal ? "min-h-0 flex-1 overflow-y-auto" : undefined}>

      {state.fieldErrors && (
        <p role="alert" className="mx-5 mt-5 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-[13px] text-[#a51515]">
          {state.error}
        </p>
      )}

      <Section stacked={inModal} title="Datos personales" description="Cómo se identifica a la persona dentro del sistema.">
        <div>
          <label htmlFor="nombre" className="erp-label">Nombre</label>
          <input {...field("nombre")} autoComplete="off" autoFocus={inModal} required />
          {error("nombre")}
        </div>
        <div>
          <label htmlFor="apellidos" className="erp-label">Apellidos</label>
          <input {...field("apellidos")} autoComplete="off" required />
          {error("apellidos")}
        </div>
        <div>
          <label htmlFor="email" className="erp-label">Correo</label>
          <input {...field("email")} type="email" autoComplete="off" required />
          {error("email")}
        </div>
        <div>
          <label htmlFor="telefono" className="erp-label">Teléfono <small>(opcional)</small></label>
          <input {...field("telefono")} type="tel" autoComplete="off" />
          {error("telefono")}
        </div>
      </Section>

      <Section stacked={inModal} title="Puesto" description="Dónde trabaja y desde cuándo.">
        {empleado && (
          // Solo informativo: no lleva `name`, así que no se envía.
          <div>
            <label htmlFor="numero_empleado" className="erp-label">
              Número de empleado <small>(asignado por el sistema)</small>
            </label>
            <input id="numero_empleado" value={empleado.numero_empleado} readOnly className="erp-input font-mono" />
          </div>
        )}
        <div>
          <label htmlFor="puesto" className="erp-label">Puesto</label>
          <input {...field("puesto")} placeholder="Ej. Técnico de ensamble" autoComplete="off" required />
          {error("puesto")}
        </div>
        <div>
          <label htmlFor="departamento" className="erp-label">Departamento <small>(opcional)</small></label>
          <div className="flex gap-2">
            <PanelSelect
              id="departamento"
              name="departamento"
              value={depto}
              onChange={setDepto}
              options={deptoOptions}
              invalid={Boolean(err.departamento)}
              aria-describedby={err.departamento ? "departamento-error" : undefined}
              className="min-w-0 flex-1"
            />
            <button
              type="button"
              onClick={() => setDeptoModal(true)}
              className="erp-btn erp-btn-secondary h-[38px] w-[38px] shrink-0 px-0"
              aria-label="Nuevo departamento"
              title="Nuevo departamento"
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
            </button>
          </div>
          {error("departamento")}
          <NuevoDepartamentoModal
            open={deptoModal}
            onClose={closeDeptoModal}
            onCreated={(d) => {
              setCreados((prev) => (prev.some((p) => p.id === d.id) ? prev : [...prev, d]));
              setDepto(String(d.id));
            }}
          />
        </div>
        <div>
          <label htmlFor="fecha_ingreso" className="erp-label">Fecha de ingreso</label>
          <input {...field("fecha_ingreso")} type="date" required />
          {error("fecha_ingreso")}
        </div>
        <div>
          <label htmlFor="salario" className="erp-label">Salario mensual <small>(MXN, opcional)</small></label>
          <input {...field("salario")} inputMode="decimal" placeholder="0.00" autoComplete="off" />
          {error("salario")}
        </div>
      </Section>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        {onClose ? (
          <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">
            Cancelar
          </button>
        ) : (
          <Link href="/admin/empleados" className="erp-btn erp-btn-secondary">
            {editing ? "Volver" : "Cancelar"}
          </Link>
        )}
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : editing ? "Guardar cambios" : "Dar de alta"}
        </button>
      </div>
    </form>
  );
}

function Section({
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
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}
