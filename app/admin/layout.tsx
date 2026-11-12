// app/admin/layout.tsx
// Layout RAÍZ del panel ERP. Vive fuera de [locale], así que define su propio
// <html> y <body> (segundo root layout; ver app/[locale]/layout.tsx).
// El panel es interno y solo está en español.
import type { Metadata, Viewport } from "next";
import { Open_Sans, Bebas_Neue } from "next/font/google";
import { requireSession } from "@root/lib/session";
import AdminShell from "./_components/AdminShell";
import "../globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Panel | STEIGERN ERP", template: "%s | STEIGERN ERP" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
  colorScheme: "light",
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // proxy.ts ya protege /admin; esta verificación es la segunda barrera.
  const session = await requireSession(["administrador", "empleado"]);

  return (
    <html lang="es">
      <body
        className={`${openSans.variable} ${bebasNeue.variable} font-body antialiased text-zinc-900`}
      >
        <AdminShell
          user={{
            name: session.user.name ?? session.user.email ?? "Usuario",
            email: session.user.email ?? "",
            role: session.user.role,
          }}
        >
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
