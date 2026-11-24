// app/admin/_components/socios/ContactosCard.tsx
// Personas con quien se habla en un cliente o proveedor (compras, pagos,
// calidad…). Uno es el principal: es el que aparece en la lista.
"use client";

import { useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/_shared/ui/toast";
import PanelModal from "../PanelModal";
import ConfirmDialog from "../ConfirmDialog";
import type { Contacto, TipoSocio } from "@root/lib/socios";
import { deleteContacto, saveContacto } from "./contactos-actions";

interface Props {
  tipo: TipoSocio;
  socioId: number;
  contactos: Contacto[];
}

export default function ContactosCard({ tipo, socioId, contactos }: Props) {
  // null = cerrado; "nuevo" = alta; un contacto = edición.
  const [editando, setEditando] = useState<Contacto | "nuevo" | null>(null);
  const [quitando, setQuitando] = useState<Contacto | null>(null);
  const [pending, startTransition] = useTransition();
  const quien = tipo === "cliente" ? "este cliente" : "este proveedor";

  function quitar() {
    if (!quitando) return;
    startTransition(async () => {
      const res = await deleteContacto(tipo, socioId, quitando.id);
      if (res.ok) {
        toast.success("Contacto quitado");
        setQuitando(null);
      } else {
        toast.error(res.error);
      }
    });
  }

  return (
    <section className="erp-card erp-entrar">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ebebeb] px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-[14px] font-semibold">Contactos</h2>
          <p className="mt-0.5 text-[12.5px] text-[#a3a3a3]">
            Personas con quien se trata en {quien}. El principal aparece en la lista.
          </p>
        </div>
        <button type="button" onClick={() => setEditando("nuevo")} className="erp-btn erp-btn-secondary">
          <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
          Agregar contacto
        </button>
      </div>

      {contactos.length === 0 ? (
        <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">Todavía no hay contactos.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Puesto</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th className="w-0"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{c.nombre}</span>
                      {c.es_principal && (
                        <span className="erp-badge erp-badge-ok" title="Contacto principal">
                          Principal
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="text-[#525252]">{c.puesto ?? <Vacio />}</td>
                  <td className="text-[#525252]">
                    {c.email ? (
                      <a href={`mailto:${c.email}`} className="erp-row-link">{c.email}</a>
                    ) : (
                      <Vacio />
                    )}
                  </td>
                  <td className="whitespace-nowrap text-[#525252]">
                    {c.telefono ? (
                      <a href={`tel:${c.telefono.replace(/[^\d+]/g, "")}`} className="erp-row-link">{c.telefono}</a>
                    ) : (
                      <Vacio />
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setEditando(c)}
                        className="erp-btn erp-btn-secondary h-8 w-8 px-0"
                        aria-label={`Editar a ${c.nombre}`}
                        title="Editar"
                      >
                        <FontAwesomeIcon icon={faPen} className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuitando(c)}
                        className="erp-btn erp-btn-danger h-8 w-8 px-0"
                        aria-label={`Quitar a ${c.nombre}`}
                        title="Quitar"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PanelModal
        open={editando !== null}
        onClose={() => setEditando(null)}
        size="md"
        title={editando === "nuevo" ? "Nuevo contacto" : "Editar contacto"}
      >
        {editando !== null && (
          <ContactoForm
            tipo={tipo}
            socioId={socioId}
            contacto={editando === "nuevo" ? null : editando}
            esPrimero={contactos.length === 0}
            onClose={() => setEditando(null)}
          />
        )}
      </PanelModal>

      <ConfirmDialog
        open={quitando !== null}
        onClose={() => !pending && setQuitando(null)}
        onConfirm={quitar}
        loading={pending}
        title={`¿Quitar a ${quitando?.nombre ?? ""}?`}
        description="Se borra de los contactos. Esta acción no se puede deshacer."
        confirmLabel="Quitar contacto"
      />
    </section>
  );
}

function Vacio() {
  return <span className="text-[#a3a3a3]">—</span>;
}

function ContactoForm({
  tipo,
  socioId,
  contacto,
  esPrimero,
  onClose,
}: {
  tipo: TipoSocio;
  socioId: number;
  contacto: Contacto | null;
  esPrimero: boolean;
  onClose: () => void;
}) {
  const [datos, setDatos] = useState({
    nombre: contacto?.nombre ?? "",
    puesto: contacto?.puesto ?? "",
    email: contacto?.email ?? "",
    telefono: contacto?.telefono ?? "",
    es_principal: contacto?.es_principal ?? esPrimero,
  });
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  function cambiar(key: keyof typeof datos, value: string | boolean) {
    setDatos((d) => ({ ...d, [key]: value }));
    setErrores((e) => ({ ...e, [key]: "" }));
  }

  function guardar(e: React.FormEvent) {
    e.preventDefault();
    if (pending) return;
    startTransition(async () => {
      const res = await saveContacto(tipo, socioId, contacto?.id ?? null, datos);
      if (res.ok) {
        toast.success(contacto ? "Contacto actualizado" : "Contacto agregado");
        onClose();
      } else if (res.fieldErrors) {
        setErrores(res.fieldErrors);
      } else {
        toast.error(res.error);
      }
    });
  }

  const input = (key: "nombre" | "puesto" | "email" | "telefono") => ({
    id: `contacto-${key}`,
    value: datos[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => cambiar(key, e.target.value),
    "aria-invalid": errores[key] ? true : undefined,
    "aria-describedby": errores[key] ? `contacto-${key}-error` : undefined,
    className: "erp-input",
    autoComplete: "off",
  });
  const error = (key: string) =>
    errores[key] ? (
      <p id={`contacto-${key}-error`} className="erp-field-error">{errores[key]}</p>
    ) : null;

  return (
    <form onSubmit={guardar} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="contacto-nombre" className="erp-label">Nombre</label>
          <input {...input("nombre")} autoFocus required />
          {error("nombre")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contacto-puesto" className="erp-label">Puesto <small>(opcional)</small></label>
          <input {...input("puesto")} placeholder="Ej. Compras, Cuentas por pagar" />
          {error("puesto")}
        </div>
        <div>
          <label htmlFor="contacto-email" className="erp-label">Correo <small>(opcional)</small></label>
          <input {...input("email")} type="email" />
          {error("email")}
        </div>
        <div>
          <label htmlFor="contacto-telefono" className="erp-label">Teléfono <small>(opcional)</small></label>
          <input {...input("telefono")} type="tel" />
          {error("telefono")}
        </div>
        <label className="flex cursor-pointer items-center gap-2.5 text-[13px] sm:col-span-2">
          <input
            type="checkbox"
            checked={datos.es_principal}
            onChange={(e) => cambiar("es_principal", e.target.checked)}
            className="h-4 w-4 accent-[#0a0a0a]"
          />
          <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-[#a3a3a3]" />
          Contacto principal
        </label>
      </div>
      <div className="flex shrink-0 justify-end gap-2 border-t border-[#ebebeb] px-5 py-4">
        <button type="button" onClick={onClose} disabled={pending} className="erp-btn erp-btn-secondary">
          Cancelar
        </button>
        <button type="submit" disabled={pending} className="erp-btn erp-btn-primary">
          {pending ? "Guardando…" : contacto ? "Guardar cambios" : "Agregar contacto"}
        </button>
      </div>
    </form>
  );
}
