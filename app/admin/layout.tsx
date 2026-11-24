// app/admin/layout.tsx
// Layout RAÍZ del panel ERP. Vive fuera de [locale], así que define su propio
// <html> y <body> (segundo root layout; ver app/[locale]/layout.tsx).
// El panel es interno y solo está en español.
import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { requireSession } from "@root/lib/session";
import AdminShell from "./_components/AdminShell";
import Toaster from "@/_shared/ui/toast/Toaster";
import "../globals.css";
import "./admin.css";

// Misma tipografía que el panel de commerce-core.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-panel",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Panel | STEIGERN ERP", template: "%s | STEIGERN ERP" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "light",
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // proxy.ts ya protege /admin; esta verificación es la segunda barrera.
  // Con contraseña temporal pendiente manda al login, donde se cambia antes
  // de ver nada del panel.
  const session = await requireSession(["administrador", "empleado"]);

  return (
    <html lang="es">
      <body
        className={`${geist.variable} antialiased`}
      >
        <AdminShell
          user={{
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
          }}
        >
          {children}
        </AdminShell>
        <Toaster />
      </body>
    </html>
  );
}
