// app/admin/materiales/_components/MaterialForm.tsx
// Alta y edición de material. Valida en el servidor (saveMaterial) y muestra
// los errores junto a cada campo sin perder lo escrito.
"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/_shared/ui/toast";
import { ESTATUS_MATERIAL, UNIDADES } from "@root/lib/materiales-reglas";
import type { CategoriaMaterial, Material, ProveedorOpcion } from "@root/lib/materiales";
import {
  Campo,
  CampoSelect,
  ErrorGeneral,
  MONEDA_OPTIONS,
  Section,
} from "../../_components/socios/CamposSocio";
import type { SocioFormState } from "../../_components/socios/tipos";
import NuevaCategoriaModal from "../../_components/NuevaCategoriaModal";
import { crearCategoriaMaterial, saveMaterial } from "../actions";

interface Props {
  /** Sin material = alta. */
  material?: Material;
  categorias: CategoriaMaterial[];
  proveedores: ProveedorOpcion[];
  /** Dentro de un modal: secciones apiladas y botones que cierran el modal. */
  onClose?: () => void;
}

const UNIDAD_OPTIONS = UNIDADES.map((u) => ({ value: u.value, label: u.label }));

export default function MaterialForm({ material, categorias, proveedores, onClose }: Props) {
  const editing = Boolean(material);
  const inModal = Boolean(onClose);
  const [state, action, pending] = useActionState<SocioFormState, FormData>(saveMaterial, {});

  const initial: Record<string, string> = {
    descripcion: material?.descripcion ?? "",
    numero_parte: material?.numero_parte ?? "",
    categoria: material?.categoria_id ? String(material.categoria_id) : "",
    unidad: material?.unidad ?? "pieza",
    ultimo_costo: material?.ultimo_costo === null || material?.ultimo_costo === undefined ? "" : String(material.ultimo_costo),
    moneda: material?.moneda ?? "MXN",
    proveedor: material?.proveedor_id ? String(material.proveedor_id) : "",
    estatus: material?.estatus ?? "activo",
    notas: material?.notas ?? "",
  };
  // Tras un error, React reinicia el formulario: se repone lo que se envió.
  const v = state.values ?? initial;
  const err = state.fieldErrors ?? {};

  // Categorías creadas desde el modal en esta sesión del formulario.
  const [categoria, setCategoria] = useState(v.categoria);
  const [creadas, setCreadas] = useState<CategoriaMaterial[]>([]);
  const [catModal, setCatModal] = useState(false);
  const closeCatModal = useCallback(() => setCatModal(false), []);
  const categoriaOptions = [
    { value: "", label: "Sin categoría" },
    ...[...categorias, ...creadas.filter((c) => !categorias.some((d) => d.id === c.id))]
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
      .map((c) => ({ value: String(c.id), label: c.nombre })),
  ];
  const proveedorOptions = [
    { value: "", label: "Sin proveedor habitual" },
    ...proveedores.map((p) => ({ value: String(p.id), label: `${p.nombre} · ${p.codigo}` })),
  ];

  useEffect(() => {
    if (state.ok && state.id) {
      if (editing) {
        toast.success("Cambios guardados");
      } else {
        toast.success("Material dado de alta", { description: `Se le asignó el código ${state.codigo}.` });
        onClose?.();
      }
    } else if (state.error && !state.fieldErrors) {
      toast.error(state.error);
    }
  }, [state, editing, onClose]);

  return (
    <form action={action} className={inModal ? "flex min-h-0 flex-1 flex-col" : "erp-card erp-entrar"} noValidate>
      {material && <input type="hidden" name="id" value={material.id} />}
      <div className={inModal ? "min-h-0 flex-1 overflow-y-auto" : undefined}>
        {state.fieldErrors && <ErrorGeneral mensaje={state.error} />}

        <Section stacked={inModal} title="Material" description="Cómo se le pide al proveedor y cómo se agrupa.">
          <Campo
            name="descripcion"
            label="Descripción"
            v={v}
            err={err}
            ancho
            autoFocus={inModal}
            maxLength={250}
            placeholder="Ej. Tornillo Allen M6 × 20 inox"
            required
          />
          {material && (
            // Solo informativo: no lleva `name`, así que no se envía.
            <div>
              <label htmlFor="codigo" className="erp-label">Código <small>(asignado por el sistema)</small></label>
              <input id="codigo" value={material.codigo} readOnly className="erp-input font-mono" />
            </div>
          )}
          <Campo
            name="numero_parte"
            label="Número de parte"
            opcional
            v={v}
            err={err}
            maxLength={80}
            placeholder="Del fabricante o del catálogo del proveedor"
            className="erp-input font-mono"
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
          <CampoSelect name="unidad" label="Unidad de compra" v={v} err={err} options={UNIDAD_OPTIONS} />
          <CampoSelect
            name="estatus"
            label="Estatus"
            v={v}
            err={err}
            options={ESTATUS_MATERIAL.map((e) => ({ value: e.value, label: e.label }))}
          />
          <NuevaCategoriaModal
            open={catModal}
            onClose={closeCatModal}
            crear={crearCategoriaMaterial}
            descripcion="Agrupa materiales por tipo."
            placeholder="Ej. Eléctrico, Neumática, Consumibles"
            onCreated={(c) => {
              setCreadas((prev) => (prev.some((p) => p.id === c.id) ? prev : [...prev, c]));
              setCategoria(String(c.id));
            }}
          />
        </Section>

        <Section stacked={inModal} title="Compra" description="A quién se le compra y cuánto costó la última vez.">
          <CampoSelect
            name="proveedor"
            label="Proveedor habitual"
            opcional
            v={v}
            err={err}
            options={proveedorOptions}
            ancho
          />
          <Campo
            name="ultimo_costo"
            label="Último costo unitario"
            opcional
            v={v}
            err={err}
            inputMode="decimal"
            maxLength={16}
            placeholder="Sin IVA, por unidad de compra"
          />
          <CampoSelect name="moneda" label="Moneda" v={v} err={err} options={MONEDA_OPTIONS} />
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
            placeholder="Ej. Medida del tramo, acabado, material equivalente"
          />
        </Section>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        {onClose ? (
          <button type="button" onClick={onClose} className="erp-btn erp-btn-secondary">Cancelar</button>
        ) : (
          <Link href="/admin/materiales" className="erp-btn erp-btn-secondary">Volver</Link>
        )}
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : editing ? "Guardar cambios" : "Dar de alta"}
        </button>
      </div>
    </form>
  );
}
