// app/admin/_components/PanelSelect.tsx
// Select del panel (reemplaza al <select> del navegador).
// - Botón + lista desplegable con teclado: ↑ ↓ Inicio Fin Enter Esc y búsqueda al teclear.
// - La lista se monta en <body> con posición fija, así no la recorta el scroll
//   de un modal o de una tabla.
// - Con `name` envía su valor en formularios mediante un input oculto.
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Texto cuando el valor no coincide con ninguna opción. */
  placeholder?: string;
  /** Para formularios: nombre del input oculto que lleva el valor. */
  name?: string;
  id?: string;
  invalid?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  className?: string;
}

interface Position {
  top: number;
  left: number;
  width: number;
  /** Abre hacia arriba si abajo no cabe. */
  up: boolean;
  maxHeight: number;
}

const GAP = 6;
const MAX_HEIGHT = 280;
const subscribeNoop = () => () => {};

export default function PanelSelect({
  value,
  onChange,
  options,
  placeholder = "Selecciona…",
  name,
  id,
  invalid,
  disabled,
  className = "",
  ...aria
}: Props) {
  const autoId = useId();
  const buttonId = id ?? `${autoId}-button`;
  const listId = `${autoId}-list`;
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState<Position | null>(null);
  // La lista va en un portal a <body>, que solo existe en el navegador.
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  const place = useCallback(() => {
    const el = button.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const below = window.innerHeight - r.bottom - GAP - 8;
    const above = r.top - GAP - 8;
    const up = below < Math.min(MAX_HEIGHT, options.length * 36 + 8) && above > below;
    setPos({
      top: up ? r.top - GAP : r.bottom + GAP,
      left: r.left,
      width: r.width,
      up,
      maxHeight: Math.min(MAX_HEIGHT, up ? above : below),
    });
  }, [options.length]);

  function openList() {
    if (disabled) return;
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    place();
    setOpen(true);
  }

  function close(focusButton = true) {
    setOpen(false);
    if (focusButton) button.current?.focus();
  }

  function choose(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    close();
  }

  // Mientras está abierta: seguir al botón al hacer scroll o cambiar el tamaño,
  // y cerrar al hacer clic fuera.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!button.current?.contains(t) && !list.current?.contains(t)) setOpen(false);
    };
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, place]);

  // Mantener visible la opción activa.
  useLayoutEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  /** Salta a la primera opción que empieza con lo que se va tecleando. */
  function typeAhead(key: string) {
    const now = Date.now();
    const t = typed.current;
    t.text = now - t.at > 600 ? key : t.text + key;
    t.at = now;
    const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
    const idx = options.findIndex((o) => norm(o.label).startsWith(norm(t.text)));
    if (idx >= 0) {
      if (open) setActive(idx);
      else onChange(options[idx].value);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp": {
        e.preventDefault();
        if (!open) return openList();
        const step = e.key === "ArrowDown" ? 1 : -1;
        setActive((a) => Math.min(last, Math.max(0, a + step)));
        return;
      }
      case "Home":
      case "End":
        if (!open) return;
        e.preventDefault();
        setActive(e.key === "Home" ? 0 : last);
        return;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openList();
        return;
      case "Escape":
        if (!open) return;
        // Que no cierre también el modal donde vive el select.
        e.preventDefault();
        e.stopPropagation();
        close();
        return;
      case "Tab":
        if (open) setOpen(false);
        return;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) typeAhead(e.key);
    }
  }

  return (
    <>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={button}
        id={buttonId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onKeyDown}
        className={`erp-input erp-select ${className}`}
        {...aria}
      >
        <span className={`truncate ${selected ? "" : "text-[#a3a3a3]"}`}>{selected?.label ?? placeholder}</span>
        <svg aria-hidden="true" className="erp-select-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && pos && (
              <motion.ul
                ref={list}
                id={listId}
                role="listbox"
                aria-labelledby={buttonId}
                initial={{ opacity: 0, y: pos.up ? 4 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: pos.up ? 4 : -4 }}
                transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="erp-select-list"
                style={{
                  left: pos.left,
                  width: pos.width,
                  maxHeight: pos.maxHeight,
                  ...(pos.up ? { bottom: window.innerHeight - pos.top } : { top: pos.top }),
                }}
              >
                {options.map((o, i) => (
                  <li
                    key={o.value}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={o.value === value}
                    data-active={i === active || undefined}
                    onMouseEnter={() => setActive(i)}
                    // Evita que el botón pierda el foco antes del clic.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => choose(i)}
                    className="erp-select-option"
                  >
                    <span className="truncate">{o.label}</span>
                    {o.value === value && (
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    )}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
