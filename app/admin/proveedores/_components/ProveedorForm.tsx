// app/admin/proveedores/_components/ProveedorForm.tsx
// Alta y edición de proveedor. Valida en el servidor (saveProveedor) y muestra
// los errores junto a cada campo sin perder lo escrito.
"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/_shared/ui/toast";
import { ESTATUS_PROVEEDOR } from "@root/lib/socios-reglas";
import type { CategoriaProveedor, Proveedor } from "@root/lib/proveedores";
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
import NuevaCategoriaModal from "../../_components/NuevaCategoriaModal";
import { crearCategoriaProveedor, saveProveedor } from "../actions";

interface Props {
  /** Sin proveedor = alta. */
  proveedor?: Proveedor;
  categorias: CategoriaProveedor[];
  /** Dentro de un modal: secciones apiladas y botones que cierran el modal. */
  onClose?: () => void;
}

export default function ProveedorForm({ proveedor, categorias, onClose }: Props) {
  const editing = Boolean(proveedor);
  const inModal = Boolean(onClose);
  const [state, action, pending] = useActionState<SocioFormState, FormData>(saveProveedor, {});

  const initial: Record<string, string> = {
    razon_social: proveedor?.razon_social ?? "",
    nombre_comercial: proveedor?.nombre_comercial ?? "",
    rfc: proveedor?.rfc ?? "",
    regimen_fiscal: proveedor?.regimen_fiscal ?? "",
    email: proveedor?.email ?? "",
    telefono: proveedor?.telefono ?? "",
    sitio_web: proveedor?.sitio_web ?? "",
    pais: proveedor?.pais ?? "México",
    estado: proveedor?.estado ?? "",
    ciudad: proveedor?.ciudad ?? "",
    direccion: proveedor?.direccion ?? "",
    codigo_postal: proveedor?.codigo_postal ?? "",
    categoria: proveedor?.categoria_id ? String(proveedor.categoria_id) : "",
    dias_credito: String(proveedor?.dias_credito ?? 0),
    moneda: proveedor?.moneda ?? "MXN",
    estatus: proveedor?.estatus ?? "en_revision",
    notas: proveedor?.notas ?? "",
  };
  // Tras un error, React reinicia el formulario: se repone lo que se envió.
  const v = state.values ?? initial;
  const err = state.fieldErrors ?? {};

  // Categorías creadas desde el modal en esta sesión del formulario.
  const [categoria, setCategoria] = useState(v.categoria);
  const [creadas, setCreadas] = useState<CategoriaProveedor[]>([]);
  const [catModal, setCatModal] = useState(false);
  const closeCatModal = useCallback(() => setCatModal(false), []);
  const categoriaOptions = [
    { value: "", label: "Sin categoría" },
    ...[...categorias, ...creadas.filter((c) => !categorias.some((d) => d.id === c.id))]
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
      .map((c) => ({ value: String(c.id), label: c.nombre })),
  ];

  useEffect(() => {
    if (state.ok && state.id) {
      if (editing) {
        toast.success("Cambios guardados");
      } else {
        toast.success("Proveedor dado de alta", { description: `Se le asignó el código ${state.codigo}.` });
        onClose?.();
      }
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, editing, onClose]);

  return (
    <form action={action} className={inModal ? "flex min-h-0 flex-1 flex-col" : "erp-card erp-entrar"} noValidate>
      {proveedor && <input type="hidden" name="id" value={proveedor.id} />}
      <div className={inModal ? "min-h-0 flex-1 overflow-y-auto" : undefined}>
        {state.fieldErrors && <ErrorGeneral mensaje={state.error} />}

        <Section stacked={inModal} title="Datos fiscales" description="Como aparecen en las facturas que nos emite.">
          <CamposFiscales v={v} err={err} autoFocus={inModal} />
        </Section>

        <Section stacked={inModal} title="Compras" description="Qué nos vende y en qué condiciones.">
          {proveedor && (
            // Solo informativo: no lleva `name`, así que no se envía.
            <div>
              <label htmlFor="codigo" className="erp-label">Código <small>(asignado por el sistema)</small></label>
              <input id="codigo" value={proveedor.codigo} readOnly className="erp-input font-mono" />
            </div>
          )}
          <CampoSelect
            name="estatus"
            label="Estatus"
            v={v}
            err={err}
            options={ESTATUS_PROVEEDOR.map((e) => ({ value: e.value, label: e.label }))}
          />
          <CampoSelect
            name="categoria"
            label="Categoría"
            opcional
            v={v}
            err={err}
            value={categoria}
            onValueChange={setCategoria}
            options={categoriaOptions}
            accesorio={
              <button
                type="button"
                onClick={() => setCatModal(true)}
                className="erp-btn erp-btn-secondary h-[38px] w-[38px] shrink-0 px-0"
                aria-label="Nueva categoría"
                title="Nueva categoría"
              >
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
              </button>
            }
          />
          <Campo
            name="dias_credito"
            label="Días de crédito"
            v={v}
            err={err}
            inputMode="numeric"
            maxLength={3}
            placeholder="0 = contado"
          />
          <CampoSelect name="moneda" label="Moneda en que factura" v={v} err={err} options={MONEDA_OPTIONS} />
          <NuevaCategoriaModal
            open={catModal}
            onClose={closeCatModal}
            crear={crearCategoriaProveedor}
            descripcion="Agrupa proveedores por lo que te venden."
            placeholder="Ej. Materia prima, Maquinados, Tornillería"
            onCreated={(c) => {
              setCreadas((prev) => (prev.some((p) => p.id === c.id) ? prev : [...prev, c]));
              setCategoria(String(c.id));
            }}
          />
        </Section>

        <Section stacked={inModal} title="Contacto general" description="Datos de la empresa. Las personas van en Contactos.">
          <CamposContacto v={v} err={err} />
        </Section>

        <Section stacked={inModal} title="Domicilio" description="Dirección fiscal o de la planta.">
          <CamposDomicilio v={v} err={err} />
        </Section>

        <Section stacked={inModal} title="Notas" description="Cualquier cosa que el equipo deba saber.">
          <Campo name="notas" label="Notas" opcional v={v} err={err} ancho multilinea placeholder="Ej. Pedido mínimo, tiempos de entrega, certificaciones" />
        </Section>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        {onClose ? (
          <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">Cancelar</button>
        ) : (
          <Link href="/admin/proveedores" className="erp-btn erp-btn-secondary">Volver</Link>
        )}
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : editing ? "Guardar cambios" : "Dar de alta"}
        </button>
      </div>
    </form>
  );
}
