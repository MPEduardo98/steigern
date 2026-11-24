// app/admin/empleados/_components/expediente/comunes.tsx
// Piezas pequeñas que comparten las tarjetas del expediente.
import type { EstadoVigencia } from "@root/lib/expediente";
import { formatFecha } from "../format";

export function VigenciaBadge({ vigencia, fecha }: { vigencia: EstadoVigencia; fecha: string | null }) {
  if (!vigencia || !fecha) return null;
  if (vigencia === "vencido") return <span className="erp-badge erp-badge-danger">Venció el {formatFecha(fecha)}</span>;
  if (vigencia === "por_vencer") return <span className="erp-badge erp-badge-warn">Vence el {formatFecha(fecha)}</span>;
  return <span className="erp-badge erp-badge-ok">Vigente hasta {formatFecha(fecha)}</span>;
}

export function CardHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#ebebeb] px-5 py-4">
      <div className="min-w-0">
        <h2 className="text-[14px] font-semibold">{title}</h2>
        {description && <p className="mt-0.5 text-[12.5px] text-[#a3a3a3]">{description}</p>}
      </div>
      {children && <div className="flex shrink-0 flex-wrap gap-2">{children}</div>}
    </div>
  );
}

/** Par etiqueta / valor de las listas de datos. */
export function Dato({ label, children, mono }: { label: string; children: React.ReactNode; mono?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-[12px] text-[#a3a3a3]">{label}</dt>
      <dd className={`mt-0.5 truncate text-[13.5px] ${mono ? "font-mono text-[12.5px] tracking-wide" : ""}`}>
        {children ?? <span className="text-[#a3a3a3]">—</span>}
      </dd>
    </div>
  );
}

export function FieldError({ name, errors }: { name: string; errors: Record<string, string> }) {
  return errors[name] ? (
    <p id={`${name}-error`} className="erp-field-error">
      {errors[name]}
    </p>
  ) : null;
}
