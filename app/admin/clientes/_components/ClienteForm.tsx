// app/admin/clientes/_components/ClienteForm.tsx
// Alta y edición de cliente. Valida en el servidor (saveCliente) y muestra los
// errores junto a cada campo sin perder lo escrito.
"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "@/_shared/ui/toast";
import { ESTATUS_CLIENTE, USOS_CFDI } from "@root/lib/socios-reglas";
import type { Cliente } from "@root/lib/clientes";
import {
  Campo,
  CampoSelect,
  CamposContacto,
  CamposDomicilio,
  CamposFiscales,
  ErrorGeneral,
  MONEDA_OPTIONS,
  Section,
} from "../../_components/socios/CamposSocio";
import type { SocioFormState } from "../../_components/socios/tipos";
import { saveCliente } from "../actions";

interface Props {
  /** Sin cliente = alta. */
  cliente?: Cliente;
  /** Dentro de un modal: secciones apiladas y botones que cierran el modal. */
  onClose?: () => void;
}

const USO_OPTIONS = [
  { value: "", label: "Sin especificar" },
  ...USOS_CFDI.map((u) => ({ value: u.value, label: `${u.value} · ${u.label}` })),
];

export default function ClienteForm({ cliente, onClose }: Props) {
  const editing = Boolean(cliente);
  const inModal = Boolean(onClose);
  const [state, action, pending] = useActionState<SocioFormState, FormData>(saveCliente, {});

  const initial: Record<string, string> = {
    razon_social: cliente?.razon_social ?? "",
    nombre_comercial: cliente?.nombre_comercial ?? "",
    rfc: cliente?.rfc ?? "",
    regimen_fiscal: cliente?.regimen_fiscal ?? "",
    uso_cfdi: cliente?.uso_cfdi ?? "",
    email: cliente?.email ?? "",
    telefono: cliente?.telefono ?? "",
    sitio_web: cliente?.sitio_web ?? "",
    pais: cliente?.pais ?? "México",
    estado: cliente?.estado ?? "",
    ciudad: cliente?.ciudad ?? "",
    direccion: cliente?.direccion ?? "",
    codigo_postal: cliente?.codigo_postal ?? "",
    dias_credito: String(cliente?.dias_credito ?? 0),
    limite_credito: cliente?.limite_credito != null ? cliente.limite_credito.toFixed(2) : "",
    moneda: cliente?.moneda ?? "MXN",
    estatus: cliente?.estatus ?? "activo",
    notas: cliente?.notas ?? "",
  };
  // Tras un error, React reinicia el formulario: se repone lo que se envió.
  const v = state.values ?? initial;
  const err = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.ok && state.id) {
      if (editing) {
        toast.success("Cambios guardados");
      } else {
        toast.success("Cliente dado de alta", { description: `Se le asignó el código ${state.codigo}.` });
        onClose?.();
      }
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, editing, onClose]);

  return (
    <form action={action} className={inModal ? "flex min-h-0 flex-1 flex-col" : "erp-card erp-entrar"} noValidate>
      {cliente && <input type="hidden" name="id" value={cliente.id} />}
      <div className={inModal ? "min-h-0 flex-1 overflow-y-auto" : undefined}>
        {state.fieldErrors && <ErrorGeneral mensaje={state.error} />}

        <Section stacked={inModal} title="Datos fiscales" description="Lo que pide la factura (CFDI 4.0). Cópialo de su constancia de situación fiscal.">
          <CamposFiscales v={v} err={err} autoFocus={inModal}>
            <CampoSelect name="uso_cfdi" label="Uso de CFDI habitual" opcional v={v} err={err} options={USO_OPTIONS} ancho />
          </CamposFiscales>
        </Section>

        <Section stacked={inModal} title="Ventas" description="Condiciones con las que se le vende.">
          {cliente && (
            // Solo informativo: no lleva `name`, así que no se envía.
            <div>
              <label htmlFor="codigo" className="erp-label">Código <small>(asignado por el sistema)</small></label>
              <input id="codigo" value={cliente.codigo} readOnly className="erp-input font-mono" />
            </div>
          )}
          <CampoSelect
            name="estatus"
            label="Estatus"
            v={v}
            err={err}
            options={ESTATUS_CLIENTE.map((e) => ({ value: e.value, label: e.label }))}
          />
          <Campo name="dias_credito" label="Días de crédito" v={v} err={err} inputMode="numeric" maxLength={3} placeholder="0 = contado" />
          <Campo name="limite_credito" label="Límite de crédito" opcional v={v} err={err} inputMode="decimal" placeholder="Sin límite" />
          <CampoSelect name="moneda" label="Moneda en que se le factura" v={v} err={err} options={MONEDA_OPTIONS} />
        </Section>

        <Section stacked={inModal} title="Contacto general" description="Datos de la empresa. Las personas van en Contactos.">
          <CamposContacto v={v} err={err} />
        </Section>

        <Section stacked={inModal} title="Domicilio" description="El código postal es el domicilio fiscal que pide el CFDI.">
          <CamposDomicilio v={v} err={err} />
        </Section>

        <Section stacked={inModal} title="Notas" description="Cualquier cosa que el equipo deba saber.">
          <Campo name="notas" label="Notas" opcional v={v} err={err} ancho multilinea placeholder="Ej. Horario de recepción, requisitos de entrega, portal de facturas" />
        </Section>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        {onClose ? (
          <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">Cancelar</button>
        ) : (
          <Link href="/admin/clientes" className="erp-btn erp-btn-secondary">Volver</Link>
        )}
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : editing ? "Guardar cambios" : "Dar de alta"}
        </button>
      </div>
    </form>
  );
}
