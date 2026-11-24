// app/admin/_components/AdminShell.tsx
// Marco del panel: menú lateral + barra superior, y el contenido con scroll propio.
import type { UserRole } from "@root/types/auth";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface Props {
  user: { name: string; email: string; role: UserRole };
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: Props) {
  return (
    <div className="erp-admin flex w-full overflow-hidden">
      <AdminSidebar role={user.role} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <AdminTopbar user={user} />
        <main className="flex-1 overflow-y-auto">
          {/* En pantallas grandes el contenido usa el 90 % del ancho, centrado. */}
          <div className="mx-auto w-full lg:w-[90%]">{children}</div>
        </main>
      </div>
    </div>
  );
}
