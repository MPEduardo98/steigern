// app/admin/empleados/_components/expediente/DocumentosCard.tsx
// Documentos del expediente: lista de lo que falta, archivos subidos con su
// vigencia, y subir / abrir / descargar / quitar.
"use client";

import { useCallback, useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpFromBracket,
  faCircleCheck,
  faDownload,
  faFileImage,
  faFilePdf,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { toast } from "@/_shared/ui/toast";
import PanelModal from "../../../_components/PanelModal";
import ConfirmDialog from "../../../_components/ConfirmDialog";
import type { Documento } from "@root/lib/expediente";
import { TIPOS_DOCUMENTO, tipoDocumento } from "@root/lib/expediente-reglas";
import { quitarDocumento } from "../../expediente-actions";
import { formatBytes, formatFechaHora } from "../format";
import { CardHeader, VigenciaBadge } from "./comunes";
import SubirDocumentoForm from "./SubirDocumentoForm";

interface Props {
  empleadoId: number;
  documentos: Documento[];
}

export default function DocumentosCard({ empleadoId, documentos }: Props) {
  const [subir, setSubir] = useState<{ tipo: string } | null>(null);
  const [quitar, setQuitar] = useState<Documento | null>(null);
  const [pending, startTransition] = useTransition();

  const cerrarSubir = useCallback(() => setSubir(null), []);
  const requeridos = TIPOS_DOCUMENTO.filter((t) => t.requerido);
  const tiene = new Set(documentos.map((d) => d.tipo));
  const completos = requeridos.filter((t) => tiene.has(t.value)).length;
  const url = (d: Documento) => `/admin/empleados/${empleadoId}/documentos/${d.id}`;

  function confirmarQuitar() {
    if (!quitar) return;
    startTransition(async () => {
      const res = await quitarDocumento(empleadoId, quitar.id);
      if (res.ok) {
        toast.success("Documento quitado del expediente");
        setQuitar(null);
      } else {
        toast.error(res.error ?? "No se pudo quitar el documento.");
      }
    });
  }

  return (
    <section className="erp-card erp-entrar">
      <CardHeader
        title="Documentos"
        description={`Expediente mínimo: ${completos} de ${requeridos.length}. PDF o imagen, hasta 10 MB.`}
      >
        <button type="button" className="erp-btn erp-btn-primary" onClick={() => setSubir({ tipo: "" })}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} className="h-3 w-3" />
          Subir documento
        </button>
      </CardHeader>

      {/* Lista de lo que pide el expediente mínimo. */}
      <div className="border-b border-[#ebebeb] px-5 py-4">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-[#f0f0f0]">
          <div
            className="h-full rounded-full bg-[#15803d] transition-[width] duration-500"
            style={{ width: `${(completos / requeridos.length) * 100}%` }}
          />
        </div>
        <ul className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
          {requeridos.map((t) => {
            const ok = tiene.has(t.value);
            return (
              <li key={t.value} className="flex items-center gap-2 text-[13px]">
                <FontAwesomeIcon
                  icon={ok ? faCircleCheck : faCircle}
                  className={`h-3.5 w-3.5 shrink-0 ${ok ? "text-[#15803d]" : "text-[#d4d4d4]"}`}
                />
                <span className={ok ? "" : "text-[#737373]"}>{t.label}</span>
                {!ok && (
                  <button
                    type="button"
                    onClick={() => setSubir({ tipo: t.value })}
                    className="ml-auto shrink-0 cursor-pointer text-[12px] font-medium text-[#0a0a0a] underline-offset-2 hover:underline"
                  >
                    Subir
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {documentos.length === 0 ? (
        <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">Todavía no hay documentos en el expediente.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Vigencia</th>
                <th>Subido</th>
                <th className="w-0"><span className="sr-only">Acciones</span></th>
              </tr>
            </thead>
            <tbody>
              {documentos.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f5f5f5] text-[#737373]">
                        <FontAwesomeIcon icon={d.mime === "application/pdf" ? faFilePdf : faFileImage} className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0">
                        <a
                          href={url(d)}
                          target="_blank"
                          rel="noopener"
                          className="block max-w-[320px] truncate font-medium hover:underline"
                        >
                          {tipoDocumento(d.tipo)?.label ?? d.tipo}
                        </a>
                        <p className="max-w-[320px] truncate text-[12px] text-[#a3a3a3]">
                          {d.nombre_original} · {formatBytes(d.tamano)}
                          {d.notas && ` · ${d.notas}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <VigenciaBadge vigencia={d.vigencia} fecha={d.fecha_vencimiento} />
                    {!d.vigencia && <span className="text-[#a3a3a3]">—</span>}
                  </td>
                  <td className="whitespace-nowrap text-[12.5px] text-[#525252]">
                    {formatFechaHora(d.created_at)}
                    {d.subido_por && <p className="text-[12px] text-[#a3a3a3]">{d.subido_por}</p>}
                  </td>
                  <td>
                    <div className="flex justify-end gap-1">
                      <a
                        href={`${url(d)}?descargar=1`}
                        className="grid h-8 w-8 place-items-center rounded-md text-[#737373] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
                        aria-label={`Descargar ${d.nombre_original}`}
                        title="Descargar"
                      >
                        <FontAwesomeIcon icon={faDownload} className="h-3.5 w-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setQuitar(d)}
                        className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-[#737373] hover:bg-[#fdecec] hover:text-[#c41a1a]"
                        aria-label={`Quitar ${d.nombre_original}`}
                        title="Quitar del expediente"
                      >
                        <FontAwesomeIcon icon={faTrashCan} className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PanelModal open={Boolean(subir)} onClose={cerrarSubir} title="Subir documento" size="md">
        {subir && <SubirDocumentoForm empleadoId={empleadoId} tipoInicial={subir.tipo} onClose={cerrarSubir} />}
      </PanelModal>

      <ConfirmDialog
        open={Boolean(quitar)}
        onClose={() => setQuitar(null)}
        onConfirm={confirmarQuitar}
        loading={pending}
        title="¿Quitar este documento?"
        description="Deja de aparecer en el expediente, pero el archivo no se borra: queda guardado y registrado en la bitácora."
        confirmLabel="Quitar"
      />
    </section>
  );
}
