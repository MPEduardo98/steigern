// app/admin/usuarios/page.tsx
// Cuentas de acceso al panel. No hay registro público: aquí el administrador
// da de alta, cambia el rol, desactiva o restablece la contraseña.
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { requireAdminPage } from "@root/lib/session";
import {
  countUsuarios,
  listEmpleadosSinCuenta,
  listUsuarios,
  rolLabel,
  type EstadoUsuarioFiltro,
} from "@root/lib/usuarios";
import type { UserRole } from "@root/types/auth";
import { formatFechaHora } from "../empleados/_components/format";
import UsuariosFiltros from "./_components/UsuariosFiltros";
import NuevoUsuarioButton from "./_components/NuevoUsuarioButton";
import { inicialesDe } from "./_components/format";

export const metadata = { title: "Usuarios" };

interface Props {
  searchParams: Promise<{ q?: string; estado?: string; rol?: string }>;
}

const ESTADOS: EstadoUsuarioFiltro[] = ["activos", "desactivados", "todos"];
const ROLES_FILTRO: UserRole[] = ["administrador", "empleado"];

export default async function UsuariosPage({ searchParams }: Props) {
  const { user } = await requireAdminPage();

  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const estado: EstadoUsuarioFiltro = ESTADOS.includes(sp.estado as EstadoUsuarioFiltro)
    ? (sp.estado as EstadoUsuarioFiltro)
    : "activos";
  const rol = ROLES_FILTRO.includes(sp.rol as UserRole) ? (sp.rol as UserRole) : undefined;

  const [usuarios, counts, empleados] = await Promise.all([
    listUsuarios({ q, estado, rol }),
    countUsuarios(),
    listEmpleadosSinCuenta(),
  ]);
  const filtrando = Boolean(q || rol);

  return (
    <div className="erp-page">
      <div className="erp-page-head">
        <p className="erp-page-desc">
          Quién puede entrar al panel y con qué permisos. Las cuentas solo las crea un administrador.
        </p>
        <NuevoUsuarioButton empleados={empleados} />
      </div>

      <div className="erp-card erp-entrar overflow-hidden">
        <UsuariosFiltros q={q} estado={estado} rol={rol ?? ""} counts={counts} />

        {usuarios.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f5] text-[#a3a3a3]">
              <FontAwesomeIcon icon={faUserShield} className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[14px] font-medium">
              {filtrando ? "Ninguna cuenta coincide con la búsqueda." : "No hay cuentas aquí."}
            </p>
            <p className="mt-1 text-[13px] text-[#a3a3a3]">
              {filtrando
                ? "Prueba con otro nombre, correo o rol."
                : estado === "desactivados"
                  ? "Las cuentas desactivadas aparecerán en esta pestaña."
                  : "Crea la primera cuenta para darle acceso a alguien."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Empleado</th>
                  <th>Último acceso</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-[11px] font-semibold text-white">
                          {inicialesDe(u.nombre ?? u.email)}
                        </span>
                        <div className="min-w-0">
                          <Link href={`/admin/usuarios/${u.id}`} className="erp-row-link block truncate font-medium">
                            {u.nombre ?? u.email}
                            {u.id === user.id && <span className="ml-1.5 text-[12px] font-normal text-[#a3a3a3]">(tú)</span>}
                          </Link>
                          <p className="truncate text-[12px] text-[#a3a3a3]">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={u.rol === "administrador" ? "font-medium" : "text-[#525252]"}>
                        {rolLabel(u.rol)}
                      </span>
                    </td>
                    <td className="font-mono text-[12px] text-[#525252]">
                      {u.numero_empleado ?? <span className="font-sans text-[#a3a3a3]">Sin vincular</span>}
                    </td>
                    <td className="whitespace-nowrap text-[#525252]">
                      {u.ultimo_acceso ? formatFechaHora(u.ultimo_acceso) : <span className="text-[#a3a3a3]">Nunca</span>}
                    </td>
                    <td>
                      {!u.activo ? (
                        <span className="erp-badge erp-badge-off">Desactivado</span>
                      ) : u.debe_cambiar_password ? (
                        <span className="erp-badge erp-badge-warn" title="Aún no cambia la contraseña temporal">
                          Pendiente
                        </span>
                      ) : (
                        <span className="erp-badge erp-badge-ok">Activo</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
