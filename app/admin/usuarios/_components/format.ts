// app/admin/usuarios/_components/format.ts

/** "Ana López Ruiz" → "AL"; "ana@x.com" → "A". */
export function inicialesDe(texto: string): string {
  const base = texto.includes("@") && !texto.includes(" ") ? texto.split("@")[0] : texto;
  const partes = base.trim().split(/\s+/).filter(Boolean);
  return ((partes[0]?.charAt(0) ?? "") + (partes[1]?.charAt(0) ?? "")).toUpperCase() || "?";
}
