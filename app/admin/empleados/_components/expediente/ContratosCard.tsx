// app/admin/empleados/_components/expediente/ContratosCard.tsx
// Historial de contratos: el más reciente arriba. Cada renovación es un registro nuevo.
"use client";

import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PanelModal from "../../../_components/PanelModal";
import type { Contrato, Documento } from "@root/lib/expediente";
import { JORNADAS, TIPOS_CONTRATO } from "@root/lib/expediente-reglas";
import { formatFecha, formatMoneda } from "../format";
import { CardHeader, VigenciaBadge } from "./comunes";
import ContratoForm from "./ContratoForm";

interface Props {
  empleadoId: number;
  contratos: Contrato[];
  /** Documentos tipo "contrato" para ligar el archivo firmado. */
  documentosContrato: Pick<Documento, "id" | "nombre_original" | "created_at">[];
  fechaIngreso: string;
}

export default function ContratosCard({ empleadoId, contratos, documentosContrato, fechaIngreso }: Props) {
  const [abierto, setAbierto] = useState(false);
  const cerrar = useCallback(() => setAbierto(false), []);

  return (
    <section className="erp-card erp-entrar">
      <CardHeader title="Contratos" description="Tipo, vigencia y condiciones. Cada renovación se registra aparte.">
        <button type="button" className="erp-btn erp-btn-secondary" onClick={() => setAbierto(true)}>
          <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
          {contratos.length ? "Registrar renovación" : "Registrar contrato"}
        </button>
      </CardHeader>

      {contratos.length === 0 ? (
        <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">No hay contratos registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="erp-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Periodo</th>
                <th>Jornada</th>
                <th>Salario diario / SDI</th>
                <th>Archivo</th>
              </tr>
            </thead>
            <tbody>
              {contratos.map((c, i) => (
                <tr key={c.id}>
                  <td>
                    <p className="font-medium">{TIPOS_CONTRATO.find((t) => t.value === c.tipo)?.label}</p>
                    {i === 0 ? (
                      c.vigencia ? (
                        <VigenciaBadge vigencia={c.vigencia} fecha={c.fecha_fin} />
                      ) : (
                        <span className="erp-badge erp-badge-ok">Vigente</span>
                      )
                    ) : (
                      <span className="erp-badge erp-badge-off">Anterior</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap text-[#525252]">
                    {formatFecha(c.fecha_inicio)} – {c.fecha_fin ? formatFecha(c.fecha_fin) : "sin término"}
                  </td>
                  <td className="text-[#525252]">{JORNADAS.find((j) => j.value === c.jornada)?.label}</td>
                  <td className="whitespace-nowrap text-[#525252]">
                    {c.salario_diario != null ? formatMoneda(c.salario_diario) : "—"}
                    {" / "}
                    {c.sdi != null ? formatMoneda(c.sdi) : "—"}
                  </td>
                  <td>
                    {c.documento_id && documentosContrato.some((d) => d.id === c.documento_id) ? (
                      <a
                        href={`/admin/empleados/${empleadoId}/documentos/${c.documento_id}`}
                        target="_blank"
                        rel="noopener"
                        className="text-[13px] font-medium hover:underline"
                      >
                        Ver firmado
                      </a>
                    ) : (
                      <span className="text-[#a3a3a3]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <PanelModal
        open={abierto}
        onClose={cerrar}
        title={contratos.length ? "Registrar renovación" : "Registrar contrato"}
        description="El contrato anterior se conserva en el historial."
        size="md"
      >
        <ContratoForm
          empleadoId={empleadoId}
          documentosContrato={documentosContrato}
          fechaSugerida={contratos[0]?.fecha_fin ?? fechaIngreso}
          onClose={cerrar}
        />
      </PanelModal>
    </section>
  );
}
