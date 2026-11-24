// app/admin/usuarios/_components/UsuarioForm.tsx
// Alta (en modal) y edición (en la ficha) de una cuenta del panel.
// Vincular un empleado toma su nombre de la ficha y propone su correo.
"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/_shared/ui/toast";
import PanelSelect, { type SelectOption } from "../../_components/PanelSelect";
import { ROLES } from "@root/lib/usuarios-reglas";
import type { EmpleadoSinCuenta, Usuario } from "@root/lib/usuarios";
import { saveUsuario, type UsuarioFormState } from "../actions";
import type { Credenciales } from "./PasswordTemporalModal";

interface Props {
  /** Sin usuario = alta. */
  usuario?: Usuario;
  empleados: EmpleadoSinCuenta[];
  /** Es la cuenta de quien edita: no puede cambiarse el rol. */
  esPropia?: boolean;
  /** Dentro de un modal. */
  onClose?: () => void;
  onCreated?: (credenciales: Credenciales) => void;
}

export default function UsuarioForm({ usuario, empleados, esPropia, onClose, onCreated }: Props) {
  const editing = Boolean(usuario);
  const inModal = Boolean(onClose);
  const [state, action, pending] = useActionState<UsuarioFormState, FormData>(saveUsuario, {});

  const initial: Record<string, string> = {
    email: usuario?.email ?? "",
    nombre: usuario?.nombre_cuenta ?? "",
    rol: usuario?.rol ?? "empleado",
    empleado: usuario?.empleado_id ? String(usuario.empleado_id) : "",
  };
  const [v, setV] = useState(initial);
  const set = (key: string, value: string) => setV((prev) => ({ ...prev, [key]: value }));

  // Tras un error se repone exactamente lo que se envió.
  const [lastValues, setLastValues] = useState(state.values);
  if (lastValues !== state.values) {
    setLastValues(state.values);
    if (state.values) setV(state.values);
  }
  const err = state.fieldErrors ?? {};

  useEffect(() => {
    if (!state.ok) {
      if (state.error && !state.fieldErrors) toast.error(state.error);
      return;
    }
    if (editing) {
      toast.success("Cambios guardados");
    } else if (state.password && state.email) {
      onCreated?.({ email: state.email, password: state.password });
      onClose?.();
    }
  }, [state, editing, onClose, onCreated]);

  const empleadoOptions: SelectOption[] = [
    { value: "", label: "Sin vincular" },
    ...empleados.map((e) => ({ value: String(e.id), label: `${e.nombre} · ${e.numero_empleado}` })),
  ];

  function elegirEmpleado(value: string) {
    const anterior = empleados.find((e) => String(e.id) === v.empleado);
    const nuevo = empleados.find((e) => String(e.id) === value);
    setV((prev) => ({
      ...prev,
      empleado: value,
      // Propone el correo del empleado si el campo estaba vacío o tenía el del anterior.
      email: nuevo && (!prev.email || prev.email === anterior?.email) ? nuevo.email : prev.email,
    }));
  }

  const input = (name: string) => ({
    id: name,
    name,
    value: v[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(name, e.target.value),
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

  const empleadoVinculado = empleados.find((e) => String(e.id) === v.empleado);

  return (
    <form action={action} className={inModal ? "flex min-h-0 flex-1 flex-col" : "erp-card erp-entrar"} noValidate>
      {usuario && <input type="hidden" name="id" value={usuario.id} />}
      <div className={inModal ? "min-h-0 flex-1 overflow-y-auto" : undefined}>
        {state.fieldErrors && (
          <p role="alert" className="mx-5 mt-5 rounded-lg bg-[#fdecec] px-3.5 py-2.5 text-[13px] text-[#a51515]">
            {state.error}
          </p>
        )}

        <Section stacked={inModal} title="Identidad" description="Con qué correo entra y cómo se le muestra en el panel.">
          <div className="sm:col-span-2">
            <label htmlFor="empleado" className="erp-label">
              Empleado <small>(opcional)</small>
            </label>
            <PanelSelect
              id="empleado"
              name="empleado"
              value={v.empleado}
              onChange={elegirEmpleado}
              options={empleadoOptions}
              invalid={Boolean(err.empleado)}
              aria-describedby={err.empleado ? "empleado-error" : "empleado-help"}
            />
            {error("empleado") ?? (
              <p id="empleado-help" className="mt-1.5 text-[12px] text-[#a3a3a3]">
                Vincúlalo si la cuenta es de alguien del personal. Solo aparecen empleados activos sin cuenta.
              </p>
            )}
          </div>

          {empleadoVinculado ? (
            <div>
              <label htmlFor="nombre-vinculado" className="erp-label">
                Nombre <small>(de la ficha del empleado)</small>
              </label>
              <input id="nombre-vinculado" value={empleadoVinculado.nombre} readOnly className="erp-input" />
              {/* Se envía vacío: con empleado vinculado el nombre sale de su ficha. */}
              <input type="hidden" name="nombre" value="" />
            </div>
          ) : (
            <div>
              <label htmlFor="nombre" className="erp-label">Nombre</label>
              <input {...input("nombre")} autoComplete="off" autoFocus={inModal} placeholder="Ej. Laura Méndez" />
              {error("nombre")}
            </div>
          )}

          <div>
            <label htmlFor="email" className="erp-label">Correo de acceso</label>
            <input {...input("email")} type="email" autoComplete="off" spellCheck={false} />
            {error("email")}
          </div>
        </Section>

        <Section stacked={inModal} title="Rol" description="Define qué módulos puede ver y usar.">
          <fieldset className="grid gap-2 sm:col-span-2" aria-describedby={err.rol ? "rol-error" : undefined}>
            <legend className="sr-only">Rol</legend>
            {ROLES.map((r) => (
              <label
                key={r.value}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors ${
                  v.rol === r.value ? "border-[#0a0a0a] bg-[#fafafa]" : "border-[#ebebeb] hover:border-[#d4d4d4]"
                } ${esPropia ? "cursor-not-allowed opacity-60" : ""}`}
              >
                <input
                  type="radio"
                  name="rol"
                  value={r.value}
                  checked={v.rol === r.value}
                  onChange={() => set("rol", r.value)}
                  disabled={esPropia && v.rol !== r.value}
                  className="mt-0.5 accent-[#e02020]"
                />
                <span>
                  <span className="block text-[13.5px] font-medium">{r.label}</span>
                  <span className="mt-0.5 block text-[12.5px] text-[#737373]">{r.description}</span>
                </span>
              </label>
            ))}
            {esPropia && (
              <p className="text-[12px] text-[#a3a3a3]">No puedes cambiar tu propio rol; pídeselo a otro administrador.</p>
            )}
            {error("rol")}
          </fieldset>
        </Section>

        {!editing && (
          <p className="mx-5 mb-5 rounded-lg bg-[#f5f5f5] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[#525252]">
            Al guardar se genera una contraseña temporal que verás una sola vez. La persona la cambiará en su primer acceso.
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        {onClose ? (
          <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">
            Cancelar
          </button>
        ) : (
          <Link href="/admin/usuarios" className="erp-btn erp-btn-secondary">
            Volver
          </Link>
        )}
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : editing ? "Guardar cambios" : "Crear cuenta"}
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
