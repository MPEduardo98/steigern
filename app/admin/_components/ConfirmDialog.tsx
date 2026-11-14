// app/admin/_components/ConfirmDialog.tsx
// Confirmación con el estilo del panel (el ConfirmModal compartido usa el del sitio público).
"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmar",
  loading,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="erp-confirm-title"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm rounded-xl border border-[#ebebeb] bg-white p-5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)]"
          >
            <h2 id="erp-confirm-title" className="text-[15px] font-semibold">{title}</h2>
            {description && <p className="mt-1.5 text-[13px] leading-relaxed text-[#737373]">{description}</p>}
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={onClose} disabled={loading} className="erp-btn erp-btn-secondary" autoFocus>
                Cancelar
              </button>
              <button type="button" onClick={onConfirm} disabled={loading} className="erp-btn erp-btn-solid-danger">
                {loading ? "Procesando…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
