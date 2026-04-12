// app/global/components/ui/ActionDropdown.tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export interface DropdownAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
  dividerBefore?: boolean;
}

interface Position { top: number; left: number; }

export default function ActionDropdown({ actions }: { actions: DropdownAction[] }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Position>({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const calcPosition = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      top: rect.bottom + window.scrollY + 6,
      left: rect.right + window.scrollX - 192, // 192 = w-48
    });
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    calcPosition();
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleScroll = () => { calcPosition(); };
    const handleResize = () => { calcPosition(); };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [open, calcPosition]);

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.96, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -4 }}
          transition={{ duration: 0.13, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999, width: 192 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-xl py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {actions.map((action, i) => (
            <div key={i}>
              {action.dividerBefore && (
                <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
              )}
              <button
                onClick={() => { setOpen(false); action.onClick(); }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors duration-100 ${
                  action.variant === "danger"
                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                <span className="w-4 text-center text-[13px]">{action.icon}</span>
                <span className="text-xs font-semibold tracking-[0.04em]">{action.label}</span>
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        aria-label="Acciones"
        className={`w-7 h-7 flex items-center justify-center rounded-sm transition-colors duration-150 ${
          open
            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
            : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200"
        }`}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} className="w-3 h-3" />
      </button>

      {typeof document !== "undefined" && createPortal(menu, document.body)}
    </>
  );
}