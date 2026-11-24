// app/[locale]/login/page.tsx
// Con la sesión ya abierta: si la contraseña es temporal se muestra directo el
// paso "crea tu contraseña" (a él manda el panel); si no, se entra al panel.
import { redirect } from "next/navigation";
import { getSessionState } from "@root/lib/session";
import LoginClient, { type CambioPendiente } from "./LoginForm";

export default async function LoginPage() {
  const estado = await getSessionState();
  let pendiente: CambioPendiente | null = null;
  if (estado.status === "ok") {
    if (!estado.user.mustChangePassword) redirect("/admin");
    pendiente = { email: estado.user.email };
  }
  return <LoginClient pendiente={pendiente} />;
}
