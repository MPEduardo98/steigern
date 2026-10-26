// app/[locale]/login/layout.tsx
// La página de login es un client component y no puede exportar metadata;
// este layout la marca como noindex para que no compita en buscadores.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
