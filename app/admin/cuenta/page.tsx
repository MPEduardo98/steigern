// app/admin/cuenta/page.tsx
// Mi cuenta: datos propios y cambio de contraseña.
import { requireSession } from "@root/lib/session";
import { rolLabel } from "@root/lib/usuarios";
import CambiarPasswordForm from "./CambiarPasswordForm";

export const metadata = { title: "Mi cuenta" };

export default async function CuentaPage() {
  const { user } = await requireSession(["administrador", "empleado"]);

  return (
    <div className="erp-page mx-auto max-w-2xl space-y-4">
      <section className="erp-card erp-entrar">
        <div className="border-b border-[#ebebeb] px-5 py-4">
          <h2 className="text-[14px] font-semibold">Tu cuenta</h2>
          <p className="mt-0.5 text-[12.5px] text-[#a3a3a3]">Para cambiar tu correo o rol, pídeselo a un administrador.</p>
        </div>
        <dl className="grid gap-4 px-5 py-4 sm:grid-cols-3">
          <div>
            <dt className="text-[12px] text-[#a3a3a3]">Nombre</dt>
            <dd className="mt-0.5 text-[13.5px]">{user.name}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[12px] text-[#a3a3a3]">Correo</dt>
            <dd className="mt-0.5 truncate text-[13.5px]">{user.email}</dd>
          </div>
          <div>
            <dt className="text-[12px] text-[#a3a3a3]">Rol</dt>
            <dd className="mt-0.5 text-[13.5px]">{rolLabel(user.role)}</dd>
          </div>
        </dl>
      </section>

      <CambiarPasswordForm email={user.email} />
    </div>
  );
}
