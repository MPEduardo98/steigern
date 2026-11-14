// app/admin/_components/PanelModal.tsx
// Modal con el estilo del panel: encabezado fijo y cuerpo con scroll propio.
// - Se monta en <body> (portal), así un modal puede abrirse encima de otro.
// - Esc cierra solo el que está hasta arriba.
// - El contenido solo existe mientras está abierto: cada apertura empieza limpia.
"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Ancho máximo del panel. */
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const SIZE = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

/** Modales abiertos, del más viejo al más nuevo. */
const stack: string[] = [];
const subscribeNoop = () => () => {};

export default function PanelModal({ open, onClose, title, description, size = "lg", children }: Props) {
  const id = useId();
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    stack.push(id);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stack.at(-1) === id) {
        e.stopPropagation();
        onCloseRef.current();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      stack.splice(stack.indexOf(id), 1);
    };
  }, [open, id]);

  // El portal solo existe en el navegador (en el servidor no hay <body> al que montarlo).
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`relative flex max-h-[calc(100dvh-32px)] w-full ${SIZE[size]} flex-col overflow-hidden rounded-xl border border-[#ebebeb] bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]`}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#ebebeb] px-5 py-4">
              <div>
                <h2 id={`${id}-title`} className="text-[15px] font-semibold">{title}</h2>
                {description && <p className="mt-0.5 text-[12.5px] text-[#737373]">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="-mr-1.5 grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-md text-[#737373] hover:bg-[#f5f5f5] hover:text-[#0a0a0a]"
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
