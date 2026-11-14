// app/admin/_components/socios/comunes.tsx
// Piezas de presentación que comparten las listas y fichas de clientes y proveedores.

type Badge = "ok" | "off" | "warn" | "danger";

export function EstatusBadge({ estatus }: { estatus: { label: string; badge: Badge } | undefined }) {
  if (!estatus) return null;
  return <span className={`erp-badge erp-badge-${estatus.badge}`}>{estatus.label}</span>;
}

/** "0" → "Contado", "30" → "30 días". */
export function formatCredito(dias: number): string {
  return dias === 0 ? "Contado" : `${dias} días`;
}

export function ubicacion(ciudad: string | null, estado: string | null): string | null {
  return [ciudad, estado].filter(Boolean).join(", ") || null;
}

export function Vacio() {
  return <span className="text-[#a3a3a3]">—</span>;
}

/** Estado vacío de las listas. */
export function ListaVacia({
  icon,
  titulo,
  detalle,
}: {
  icon: React.ReactNode;
  titulo: string;
  detalle: string;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] text-[#a3a3a3]">{icon}</span>
      <p className="mt-3 text-[14px] font-medium">{titulo}</p>
      <p className="mt-1 text-[13px] text-[#a3a3a3]">{detalle}</p>
    </div>
  );
}

/** Iniciales de una razón social, ignorando la forma jurídica: "Aceros del Norte, S.A. de C.V." → "AN". */
export function inicialesEmpresa(nombre: string): string {
  const palabras = nombre
    .replace(/,?\s+(S\.?\s?A\.?|S\.?\s?de\s?R\.?\s?L\.?|S\.?\s?C\.?|S\.?\s?A\.?\s?P\.?\s?I\.?)(\s+de\s+C\.?\s?V\.?)?\.?$/i, "")
    .split(/\s+/)
    .filter((p) => p.length > 2 || /^[A-Z0-9]+$/.test(p));
  const letras = palabras.slice(0, 2).map((p) => p.charAt(0));
  return (letras.join("") || nombre.charAt(0)).toUpperCase();
}
