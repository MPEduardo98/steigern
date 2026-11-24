// app/admin/usuarios/[id]/page.tsx
// Ficha de una cuenta: resumen, datos editables, acciones y bitácora.
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdminPage } from "@root/lib/session";
import {
  getUsuario,
  listBitacoraUsuario,
  listEmpleadosSinCuenta,
  rolLabel,
  type AccionUsuario,
} from "@root/lib/usuarios";
import { formatFechaHora } from "../../empleados/_components/format";
import { CardHeader } from "../../empleados/_components/expediente/comunes";
import UsuarioForm from "../_components/UsuarioForm";
import AccionesUsuario from "../_components/AccionesUsuario";
import { inicialesDe } from "../_components/format";

interface Props {
  params: Promise<{ id: string }>;
}

const ACCIONES: Record<AccionUsuario, string> = {
  crear: "Creó la cuenta",
  editar: "Editó los datos",
  cambiar_rol: "Cambió el rol",
  desactivar: "Desactivó la cuenta",
  reactivar: "Reactivó la cuenta",
  restablecer_password: "Restableció la contraseña",
  cambiar_password: "Cambió su contraseña",
};

async function load(idParam: string) {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) notFound();
  const usuario = await getUsuario(id);
  if (!usuario) notFound();
  return usuario;
}

export async function generateMetadata({ params }: Props) {
  await requireAdminPage();
  const u = await load((await params).id);
  return { title: u.nombre ?? u.email };
}

export default async function UsuarioPage({ params }: Props) {
  const { user } = await requireAdminPage();
  const usuario = await load((await params).id);
  const esPropia = usuario.id === user.id;
  const nombre = usuario.nombre ?? usuario.email;

  const [empleados, bitacora] = await Promise.all([
    listEmpleadosSinCuenta(usuario.empleado_id),
    listBitacoraUsuario(usuario.id, 50),
  ]);

  return (
    <div className="erp-page mx-auto max-w-5xl space-y-4">
      <div className="erp-card erp-entrar flex flex-wrap items-center gap-4 p-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-[15px] font-semibold text-white">
          {inicialesDe(nombre)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-[17px] font-semibold tracking-tight">{nombre}</h2>
            {!usuario.activo ? (
              <span className="erp-badge erp-badge-off">Desactivado</span>
            ) : usuario.debe_cambiar_password ? (
              <span className="erp-badge erp-badge-warn">Contraseña temporal</span>
            ) : (
              <span className="erp-badge erp-badge-ok">Activo</span>
            )}
          </div>
          <p className="mt-0.5 text-[13px] text-[#737373]">
            {usuario.email} · {rolLabel(usuario.rol)}
            {usuario.empleado_id && (
              <>
                {" · "}
                <Link href={`/admin/empleados/${usuario.empleado_id}`} className="underline-offset-2 hover:underline">
                  <span className="font-mono text-[12px]">{usuario.numero_empleado}</span>
                </Link>
              </>
            )}
            {" · "}
            {usuario.ultimo_acceso ? `Último acceso ${formatFechaHora(usuario.ultimo_acceso)}` : "Nunca ha entrado"}
          </p>
        </div>
        {esPropia ? (
          <Link href="/admin/cuenta" className="erp-btn erp-btn-secondary">
            Cambiar mi contraseña
          </Link>
        ) : (
          <AccionesUsuario id={usuario.id} nombre={nombre} activo={usuario.activo} />
        )}
      </div>

      <UsuarioForm key={usuario.id} usuario={usuario} empleados={empleados} esPropia={esPropia} />

      <section className="erp-card erp-entrar">
        <CardHeader
          title="Bitácora de la cuenta"
          description={`Altas, cambios de rol, desactivaciones y contraseñas. Creada el ${formatFechaHora(usuario.created_at)}${
            usuario.creado_por ? ` por ${usuario.creado_por}` : ""
          }.`}
        />
        {bitacora.length === 0 ? (
          <p className="px-5 py-8 text-center text-[13px] text-[#a3a3a3]">Sin movimientos todavía.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hecho por</th>
                  <th>Acción</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {bitacora.map((e) => (
                  <tr key={e.id}>
                    <td className="whitespace-nowrap text-[#525252]">{formatFechaHora(e.created_at)}</td>
                    <td className="text-[#525252]">{e.actor ?? <span className="text-[#a3a3a3]">—</span>}</td>
                    <td className="whitespace-nowrap">{ACCIONES[e.accion]}</td>
                    <td className="text-[#525252]">{e.detalle ?? <span className="text-[#a3a3a3]">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
