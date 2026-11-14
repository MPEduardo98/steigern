// app/admin/_components/nav.ts
// Mapa de módulos del ERP (estructura inspirada en SAP Business One).
// `href` ausente = módulo planeado que todavía no tiene pantallas.
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faUsers,
  faHandshake,
  faTruckField,
  faCubes,
  faDiagramProject,
  faWarehouse,
  faCartShopping,
  faFileInvoiceDollar,
  faScaleBalanced,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import type { UserRole } from "@root/types/auth";

export interface NavItem {
  label: string;
  description: string;
  icon: IconDefinition;
  href?: string;
  /** Roles que ven el módulo. Sin definir = todos los roles del panel. */
  roles?: UserRole[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const NAV: NavGroup[] = [
  {
    title: "General",
    items: [
      {
        label: "Inicio",
        description: "Resumen del sistema",
        icon: faHouse,
        href: "/admin",
      },
    ],
  },
  {
    title: "Datos maestros",
    items: [
      {
        label: "Empleados",
        description: "Personal, puestos y departamentos",
        icon: faUsers,
        href: "/admin/empleados",
        roles: ["administrador"],
      },
      {
        label: "Clientes",
        description: "A quién le vendes: datos fiscales, crédito y contactos",
        icon: faHandshake,
        href: "/admin/clientes",
        roles: ["administrador"],
      },
      {
        label: "Proveedores",
        description: "A quién le compras: datos fiscales, condiciones y contactos",
        icon: faTruckField,
        href: "/admin/proveedores",
        roles: ["administrador"],
      },
      {
        label: "Materiales",
        description: "Catálogo de lo que compras: tornillería, perfilería, aluminio",
        icon: faCubes,
        href: "/admin/materiales",
        roles: ["administrador"],
      },
    ],
  },
  {
    title: "Operación",
    items: [
      {
        label: "Proyectos",
        description: "Trabajos a pedido del cliente: cotización, monto, fechas y costo real",
        icon: faDiagramProject,
      },
      {
        label: "Compras",
        description: "Órdenes de compra a proveedores, cargadas a un proyecto",
        icon: faCartShopping,
      },
      {
        label: "Almacén",
        description: "Material que quedó de proyectos y se puede usar en otros",
        icon: faWarehouse,
      },
      {
        label: "Facturación",
        description: "Anticipos, avances y cobros de cada proyecto",
        icon: faFileInvoiceDollar,
      },
    ],
  },
  {
    title: "Finanzas",
    items: [
      {
        label: "Contabilidad",
        description: "Plan de cuentas, asientos, cobros y pagos",
        icon: faScaleBalanced,
        roles: ["administrador"],
      },
    ],
  },
  {
    title: "Administración",
    items: [
      {
        label: "Usuarios",
        description: "Cuentas de acceso al panel, roles y contraseñas",
        icon: faUserShield,
        href: "/admin/usuarios",
        roles: ["administrador"],
      },
    ],
  },
];

/** Título de la barra superior para una ruta del panel. */
export function pageTitle(pathname: string): string {
  const path = pathname.replace(/\/$/, "") || "/admin";
  if (path === "/admin/cuenta") return "Mi cuenta";
  const items = NAV.flatMap((g) => g.items).filter((i) => i.href);
  const exact = items.find((i) => i.href === path);
  if (exact) return exact.label;
  // Subpáginas: el módulo con el prefijo más largo que coincida.
  const parent = items
    .filter((i) => i.href !== "/admin" && path.startsWith(`${i.href}/`))
    .sort((a, b) => b.href!.length - a.href!.length)[0];
  return parent?.label ?? "Panel";
}

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** Busca módulos del menú por nombre o descripción (ignora acentos). */
export function searchNav(groups: NavGroup[], query: string): NavItem[] {
  const all = groups.flatMap((g) => g.items);
  const text = normalize(query);
  if (!text) return all;
  const words = text.split(/\s+/);
  return all
    .map((item) => {
      const label = normalize(item.label);
      const haystack = normalize(`${item.label} ${item.description}`);
      const score = label === text ? 3 : label.startsWith(text) ? 2 : label.includes(text) ? 1 : 0;
      return { item, score, matches: words.every((w) => haystack.includes(w)) };
    })
    .filter((r) => r.matches)
    .sort((a, b) => b.score - a.score || Number(!!b.item.href) - Number(!!a.item.href))
    .map((r) => r.item);
}

/** Devuelve el menú filtrado para un rol. */
export function navForRole(role: UserRole): NavGroup[] {
  return NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);
}
