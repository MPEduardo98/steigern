// app/admin/proyectos/_components/ProyectoForm.tsx
// Alta y edición de proyecto. Valida en el servidor (saveProyecto) y muestra
// los errores junto a cada campo sin perder lo escrito.
"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/_shared/ui/toast";
import { ESTADOS_CERRADOS, ESTADOS_PROYECTO, type EstadoProyecto } from "@root/lib/proyectos-reglas";
import type { Opcion, Proyecto } from "@root/lib/proyectos";
import { Campo, CampoSelect, ErrorGeneral, MONEDA_OPTIONS, Section } from "../../_components/socios/CamposSocio";
import type { SocioFormState } from "../../_components/socios/tipos";
import { saveProyecto } from "../actions";

interface Props {
  /** Sin proyecto = alta. */
  proyecto?: Proyecto;
  clientes: Opcion[];
  responsables: Opcion[];
  /** Fecha de cotización por defecto en el alta (hoy en México). */
  hoy: string;
  /** Dentro de un modal: secciones apiladas y botones que cierran el modal. */
  onClose?: () => void;
}

const montoInicial = (n: number | null | undefined) => (n === null || n === undefined ? "" : n.toFixed(2));

export default function ProyectoForm({ proyecto, clientes, responsables, hoy, onClose }: Props) {
  const router = useRouter();
  const editing = Boolean(proyecto);
  const inModal = Boolean(onClose);
  const [state, action, pending] = useActionState<SocioFormState, FormData>(saveProyecto, {});

  const initial: Record<string, string> = {
    nombre: proyecto?.nombre ?? "",
    cliente: proyecto ? String(proyecto.cliente_id) : "",
    responsable: proyecto?.responsable_id ? String(proyecto.responsable_id) : "",
    descripcion: proyecto?.descripcion ?? "",
    estado: proyecto?.estado ?? "cotizacion",
    monto_cotizado: montoInicial(proyecto?.monto_cotizado),
    anticipo: montoInicial(proyecto?.anticipo),
    moneda: proyecto?.moneda ?? "MXN",
    fecha_cotizacion: proyecto?.fecha_cotizacion ?? hoy,
    fecha_inicio: proyecto?.fecha_inicio ?? "",
    fecha_entrega: proyecto?.fecha_entrega ?? "",
    fecha_cierre: proyecto?.fecha_cierre ?? "",
    notas: proyecto?.notas ?? "",
  };
  const v = state.values ?? initial;
  const err = state.fieldErrors ?? {};

  // La fecha de cierre solo aplica a proyectos terminados o cancelados.
  const [estado, setEstado] = useState(v.estado);
  const cerrado = ESTADOS_CERRADOS.includes(estado as EstadoProyecto);

  const clienteOptions = [
    { value: "", label: "Elige el cliente" },
    ...clientes.map((c) => ({ value: String(c.id), label: `${c.nombre} · ${c.codigo}` })),
  ];
  const responsableOptions = [
    { value: "", label: "Sin responsable" },
    ...responsables.map((e) => ({ value: String(e.id), label: e.nombre })),
  ];

  useEffect(() => {
    if (state.ok && state.id) {
      if (editing) {
        toast.success("Cambios guardados");
      } else {
        toast.success("Proyecto dado de alta", { description: `Se le asignó el código ${state.codigo}.` });
        onClose?.();
        router.push(`/admin/proyectos/${state.id}`);
      }
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, editing, onClose, router]);

  return (
    <form action={action} className={inModal ? "flex min-h-0 flex-1 flex-col" : "erp-card erp-entrar"} noValidate>
      {proyecto && <input type="hidden" name="id" value={proyecto.id} />}
      <div className={inModal ? "min-h-0 flex-1 overflow-y-auto" : undefined}>
        {state.fieldErrors && <ErrorGeneral mensaje={state.error} />}

        <Section stacked={inModal} title="Proyecto" description="Qué se va a hacer, para quién y quién lo lleva.">
          <Campo
            name="nombre"
            label="Nombre"
            v={v}
            err={err}
            ancho
            autoFocus={inModal}
            maxLength={190}
            placeholder="Ej. Celda de soldadura para línea 3"
            required
          />
          <CampoSelect name="cliente" label="Cliente" v={v} err={err} options={clienteOptions} ancho />
          <CampoSelect name="responsable" label="Responsable" opcional v={v} err={err} options={responsableOptions} />
          <CampoSelect
            name="estado"
            label="Estado"
            v={v}
            err={err}
            value={estado}
            onValueChange={setEstado}
            options={ESTADOS_PROYECTO.map((e) => ({ value: e.value, label: e.label }))}
          />
          <Campo
            name="descripcion"
            label="Alcance"
            opcional
            v={v}
            err={err}
            ancho
            multilinea
            placeholder="Qué incluye el trabajo: equipos, instalación, entregables"
          />
        </Section>

        <Section stacked={inModal} title="Precio" description="Lo pactado con el cliente, sin IVA.">
          <Campo
            name="monto_cotizado"
            label="Monto cotizado"
            opcional
            v={v}
            err={err}
            inputMode="decimal"
            maxLength={18}
            placeholder="Sin IVA"
          />
          <CampoSelect name="moneda" label="Moneda" v={v} err={err} options={MONEDA_OPTIONS} />
          <Campo
            name="anticipo"
            label="Anticipo pactado"
            opcional
            v={v}
            err={err}
            inputMode="decimal"
            maxLength={18}
            placeholder="Monto que paga por adelantado"
          />
        </Section>

        <Section stacked={inModal} title="Fechas" description="Cuándo se cotizó, cuándo arranca y cuándo se entrega.">
          <Campo name="fecha_cotizacion" label="Cotización" v={v} err={err} type="date" required />
          <Campo name="fecha_inicio" label="Inicio" opcional v={v} err={err} type="date" />
          <Campo name="fecha_entrega" label="Entrega comprometida" opcional v={v} err={err} type="date" />
          {cerrado && (
            <Campo
              name="fecha_cierre"
              label={estado === "cancelado" ? "Fecha de cancelación" : "Fecha de entrega real"}
              opcional
              v={v}
              err={err}
              type="date"
              title="Si la dejas vacía se usa la fecha de hoy"
            />
          )}
        </Section>

        <Section stacked={inModal} title="Notas" description="Cualquier cosa que el equipo deba saber.">
          <Campo
            name="notas"
            label="Notas"
            opcional
            v={v}
            err={err}
            ancho
            multilinea
            placeholder="Ej. Condiciones de pago, contacto en planta, pendientes"
          />
        </Section>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        {onClose ? (
          <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">Cancelar</button>
        ) : (
          <Link href="/admin/proyectos" className="erp-btn erp-btn-secondary">Volver</Link>
        )}
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : editing ? "Guardar cambios" : "Dar de alta"}
        </button>
      </div>
    </form>
  );
}
