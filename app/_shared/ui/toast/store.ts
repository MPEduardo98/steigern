// app/_shared/ui/toast/store.ts
// Almacén global de notificaciones. No usa React Context: cualquier componente
// cliente puede llamar a `toast.error("...")` sin envolver nada en providers.
// El <Toaster /> (montado en cada layout raíz) se suscribe y las pinta.

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  /** Texto secundario bajo el título. */
  description?: string;
  /** Milisegundos visibles. `Infinity` = no se cierra sola. Por defecto 4500 (error: 6000). */
  duration?: number;
  /** Reutiliza un id para reemplazar un toast existente en vez de apilar otro. */
  id?: string;
}

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration: number;
  createdAt: number;
}

const DEFAULT_DURATION: Record<ToastType, number> = {
  success: 4500,
  info: 4500,
  warning: 5500,
  error: 6000,
};

/** Máximo de toasts en pantalla; los más viejos se descartan. */
const MAX_VISIBLE = 4;

let toasts: Toast[] = [];
const listeners = new Set<() => void>();
let counter = 0;

function emit() {
  for (const l of listeners) l();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot() {
  return toasts;
}

const EMPTY: Toast[] = [];
export function getServerSnapshot() {
  return EMPTY;
}

function push(type: ToastType, title: string, opts: ToastOptions = {}) {
  const id = opts.id ?? `t${Date.now()}-${++counter}`;
  const item: Toast = {
    id,
    type,
    title,
    description: opts.description,
    duration: opts.duration ?? DEFAULT_DURATION[type],
    createdAt: Date.now(),
  };
  // Si ya existe uno con el mismo id se reemplaza (y vuelve arriba de la pila).
  toasts = [item, ...toasts.filter((t) => t.id !== id)].slice(0, MAX_VISIBLE);
  emit();
  return id;
}

export function dismiss(id?: string) {
  toasts = id ? toasts.filter((t) => t.id !== id) : [];
  emit();
}

export const toast = {
  success: (title: string, opts?: ToastOptions) => push("success", title, opts),
  error: (title: string, opts?: ToastOptions) => push("error", title, opts),
  warning: (title: string, opts?: ToastOptions) => push("warning", title, opts),
  info: (title: string, opts?: ToastOptions) => push("info", title, opts),
  dismiss,
};
