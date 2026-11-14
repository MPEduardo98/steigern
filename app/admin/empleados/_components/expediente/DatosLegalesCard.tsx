// app/admin/empleados/_components/expediente/DatosLegalesCard.tsx
// Datos legales: se muestran enmascarados. "Mostrar" y "Editar" piden los datos
// completos al servidor, que deja registro de quién los vio.
"use client";

import { useCallback, useState, useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPen } from "@fortawesome/free-solid-svg-icons";
import { toast } from "@/_shared/ui/toast";
import PanelModal from "../../../_components/PanelModal";
import type { DatosLegales, DatosLegalesResumen } from "@root/lib/expediente";
import { ESTADOS_CIVILES, bancoDeClabe } from "@root/lib/expediente-reglas";
import { revelarDatosLegales } from "../../expediente-actions";
import { formatFecha, formatFechaHora } from "../format";
import { CardHeader, Dato } from "./comunes";
import DatosLegalesForm from "./DatosLegalesForm";

const SEXO = { H: "Hombre", M: "Mujer", X: "No binario" } as const;

export default function DatosLegalesCard({
  empleadoId,
  resumen,
}: {
  empleadoId: number;
  resumen: DatosLegalesResumen;
}) {
  const [completos, setCompletos] = useState<DatosLegales | null>(null);
  const [visible, setVisible] = useState(false);
  const [editando, setEditando] = useState(false);
  const [pending, startTransition] = useTransition();

  function cargar(then: (d: DatosLegales | null) => void) {
    startTransition(async () => {
      const res = await revelarDatosLegales(empleadoId);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setCompletos(res.datos);
      then(res.datos);
    });
  }

  const cerrar = useCallback(() => setEditando(false), []);
  const guardado = useCallback(() => {
    setEditando(false);
    // Se vuelve a enmascarar: la tarjeta toma el resumen nuevo del servidor.
    setCompletos(null);
    setVisible(false);
  }, []);

  const ver = visible && completos;
  const r = resumen;
  const domicilio = ver
    ? [
        [completos.calle, completos.numero_exterior && `#${completos.numero_exterior}`, completos.numero_interior && `int. ${completos.numero_interior}`]
          .filter(Boolean)
          .join(" "),
        completos.colonia,
        completos.municipio,
        completos.estado,
        completos.codigo_postal && `C.P. ${completos.codigo_postal}`,
      ]
        .filter(Boolean)
        .join(", ")
    : r.ubicacion;

  return (
    <section className="erp-card erp-entrar">
      <CardHeader
        title="Datos legales"
        description={
          r.updated_at
            ? `Identificadores ocultos por privacidad. Actualizado el ${formatFechaHora(r.updated_at)}.`
            : "CURP, RFC, NSS, domicilio y datos para la nómina."
        }
      >
        {r.capturados && (
          <button
            type="button"
            className="erp-btn erp-btn-secondary"
            disabled={pending}
            onClick={() => (visible ? setVisible(false) : completos ? setVisible(true) : cargar(() => setVisible(true)))}
          >
            <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} className="h-3 w-3" />
            {visible ? "Ocultar" : "Mostrar"}
          </button>
        )}
        <button
          type="button"
          className="erp-btn erp-btn-primary"
          disabled={pending}
          onClick={() => (completos || !r.capturados ? setEditando(true) : cargar(() => setEditando(true)))}
        >
          <FontAwesomeIcon icon={faPen} className="h-3 w-3" />
          {r.capturados ? "Editar" : "Capturar"}
        </button>
      </CardHeader>

      {!r.capturados ? (
        <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">
          Todavía no se capturan los datos legales de este empleado.
        </p>
      ) : (
        <dl className="grid gap-x-6 gap-y-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <Dato label="CURP" mono>{ver ? completos.curp : r.curp}</Dato>
          <Dato label="RFC" mono>{ver ? completos.rfc : r.rfc}</Dato>
          <Dato label="NSS (IMSS)" mono>{ver ? completos.nss : r.nss}</Dato>
          <Dato label="Fecha de nacimiento">
            {r.fecha_nacimiento ? `${formatFecha(r.fecha_nacimiento)}${r.sexo ? ` · ${SEXO[r.sexo]}` : ""}` : null}
          </Dato>
          <Dato label="Estado civil">{ESTADOS_CIVILES.find((e) => e.value === r.estado_civil)?.label}</Dato>
          <Dato label="Nacionalidad">{r.nacionalidad}</Dato>
          <Dato label="CLABE" mono>{ver ? completos.clabe : r.clabe}</Dato>
          <Dato label="Banco">{ver ? bancoDeClabe(completos.clabe) ?? (completos.clabe ? "Otro" : null) : r.banco ?? (r.clabe ? "Otro" : null)}</Dato>
          <div className="sm:col-span-2">
            <Dato label="Domicilio">{domicilio}</Dato>
          </div>
          <div className="sm:col-span-2">
            <Dato label="Contacto de emergencia">
              {ver
                ? completos.emergencia_nombre &&
                  [completos.emergencia_nombre, completos.emergencia_parentesco && `(${completos.emergencia_parentesco})`, completos.emergencia_telefono]
                    .filter(Boolean)
                    .join(" ")
                : r.emergencia}
            </Dato>
          </div>
          <Dato label="Crédito Infonavit">{ver ? completos.credito_infonavit ?? "No" : r.credito_infonavit ? "Sí" : "No"}</Dato>
          <Dato label="Crédito Fonacot">{ver ? completos.credito_fonacot ?? "No" : r.credito_fonacot ? "Sí" : "No"}</Dato>
        </dl>
      )}

      <PanelModal
        open={editando}
        onClose={cerrar}
        title={r.capturados ? "Editar datos legales" : "Capturar datos legales"}
        description="Se revisa que CURP, RFC, NSS y CLABE estén bien escritos antes de guardar."
      >
        <DatosLegalesForm empleadoId={empleadoId} datos={completos} onClose={cerrar} onSaved={guardado} />
      </PanelModal>
    </section>
  );
}
