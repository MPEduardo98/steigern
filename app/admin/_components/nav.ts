// app/admin/_components/nav.ts
// Mapa de módulos del ERP (estructura inspirada en SAP Business One).
// `href` ausente = módulo planeado que todavía no tiene pantallas.
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faHouse,
  faUsers,
  faHandshake,
  faCubes,
  faWarehouse,
  faCartShopping,
  faFileInvoiceDollar,
  faScaleBalanced,
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
        roles: ["administrador"],
      },
      {
        label: "Socios de negocio",
        description: "Clientes y proveedores en un solo catálogo",
        icon: faHandshake,
      },
      {
        label: "Artículos",
        description: "Productos, servicios y unidades de medida",
        icon: faCubes,
      },
    ],
  },
  {
    title: "Operación",
    items: [
      {
        label: "Inventario",
        description: "Almacenes, existencias y movimientos",
        icon: faWarehouse,
      },
      {
        label: "Compras",
        description: "Orden de compra, entrada de mercancía y factura",
        icon: faCartShopping,
      },
      {
        label: "Ventas",
        description: "Cotización, orden de venta, entrega y factura",
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
];

/** Devuelve el menú filtrado para un rol. */
export function navForRole(role: UserRole): NavGroup[] {
  return NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.roles || item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);
}
