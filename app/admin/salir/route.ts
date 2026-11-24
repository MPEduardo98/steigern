// app/admin/salir/route.ts
// A dónde se manda una sesión revocada (cuenta desactivada, rol o contraseña
// cambiados). Borra la cookie y lleva al login. No basta con redirigir a
// /login: el proxy ve un token válido y devolvería a /admin en un ciclo.
//
// Solo cierra la sesión si de verdad está revocada; con una sesión vigente
// vuelve al panel, así un enlace ajeno no puede sacar a nadie.
import { redirect } from "next/navigation";
import { signOut } from "@root/auth";
import { getSessionState } from "@root/lib/session";

export async function GET() {
  const estado = await getSessionState();
  if (estado.status === "ok") redirect("/admin");
  await signOut({ redirectTo: "/login" });
}
