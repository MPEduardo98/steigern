// app/_shared/ui/ConfirmModal.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faRotate,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export type ConfirmVariant = "danger" | "warning" | "info";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  loading?: boolean;
}

const variantConfig = {
  danger:  { icon: faTriangleExclamation, iconColor: "text-red-500",   iconBg: "bg-red-50 dark:bg-red-950/40",    btn: "bg-red-500 hover:bg-red-600 text-white" },
  warning: { icon: faRotate,              iconColor: "text-amber-500", iconBg: "bg-amber-50 dark:bg-amber-950/40", btn: "bg-amber-500 hover:bg-amber-600 text-white" },
  info:    { icon: faCircleInfo,          iconColor: "text-blue-500",  iconBg: "bg-blue-50 dark:bg-blue-950/40",   btn: "bg-blue-500 hover:bg-blue-600 text-white" },
};

export default function ConfirmModal({
  open, onClose, onConfirm,
  title, description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  loading = false,
}: ConfirmModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const cfg = variantConfig[variant];

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            className="relative w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl"
          >
            <div className="absolute left-0 top-0 w-0.5 h-full bg-[#E02020]" />
            <div className="px-6 pt-6 pb-5">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-10 h-10 shrink-0 flex items-center justify-center ${cfg.iconBg}`}>
                  <FontAwesomeIcon icon={cfg.icon} className={`w-4 h-4 ${cfg.iconColor}`} />
                </div>
                <div>
                  <h3
                    className="text-zinc-900 dark:text-zinc-100 font-black text-base uppercase tracking-[-0.02em] leading-tight"
                    style={{ fontFamily: "var(--font-body),'Open Sans',sans-serif" }}
                  >
                    {title}
                  </h3>
                  {description && (
                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mt-1.5">
                      {description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 text-xs font-bold tracking-[0.1em] uppercase border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-400 transition-colors disabled:opacity-50"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => onConfirm()}
                  disabled={loading}
                  className={`flex items-center gap-2 px-5 py-2 text-xs font-black tracking-[0.12em] uppercase transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${cfg.btn}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Procesando...
                    </>
                  ) : confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

