// app/_shared/ui/toast/Toaster.tsx
// Pila de notificaciones estilo Apple: entran desde la derecha con un resorte,
// vidrio esmerilado, se pausan al pasar el mouse y se descartan deslizando
// hacia la derecha. Se monta una sola vez por layout raíz.
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  AnimatePresence,
  useAnimate,
  useReducedMotion,
  type AnimationPlaybackControls,
  type PanInfo,
} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo,
  faXmark,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  dismiss,
  type Toast,
  type ToastType,
} from "./store";

const STYLES: Record<ToastType, { icon: IconDefinition; tint: string; bar: string }> = {
  success: { icon: faCircleCheck,         tint: "text-emerald-500", bar: "bg-emerald-500" },
  error:   { icon: faCircleExclamation,   tint: "text-accent",      bar: "bg-accent" },
  warning: { icon: faTriangleExclamation, tint: "text-amber-500",   bar: "bg-amber-500" },
  info:    { icon: faCircleInfo,          tint: "text-sky-500",     bar: "bg-sky-500" },
};

// Curva de resorte parecida a la de las notificaciones de macOS/iOS.
const SPRING = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;

export default function Toaster() {
  const toasts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [paused, setPaused] = useState(false);

  return (
    <section
      aria-label="Notificaciones"
      className="pointer-events-none fixed top-4 right-4 left-4 sm:left-auto sm:top-6 sm:right-6 z-[100] flex flex-col items-end gap-2.5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastItem key={`${t.id}-${t.createdAt}`} toast={t} paused={paused} />
        ))}
      </AnimatePresence>
    </section>
  );
}

function ToastItem({ toast, paused }: { toast: Toast; paused: boolean }) {
  const reduce = useReducedMotion();
  const { icon, tint, bar } = STYLES[toast.type];
  const timed = Number.isFinite(toast.duration);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > 90 || info.velocity.x > 600) dismiss(toast.id);
  }

  return (
    <motion.div
      layout
      role={toast.type === "error" || toast.type === "warning" ? "alert" : "status"}
      aria-live={toast.type === "error" ? "assertive" : "polite"}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: "110%", scale: 0.96, filter: "blur(4px)" }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      exit={
        reduce
          ? { opacity: 0, transition: { duration: 0.15 } }
          : { opacity: 0, x: "110%", scale: 0.96, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } }
      }
      transition={reduce ? { duration: 0.15 } : SPRING}
      drag={reduce ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={{ left: 0.05, right: 0.9 }}
      onDragEnd={onDragEnd}
      className="pointer-events-auto relative w-full sm:w-[360px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.05)] cursor-grab active:cursor-grabbing select-none touch-pan-y"
    >
      <div className="flex items-start gap-3 pl-4 pr-3 py-3.5">
        <FontAwesomeIcon icon={icon} className={`w-[18px] h-[18px] mt-[1px] shrink-0 ${tint}`} />

        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-semibold text-zinc-900 leading-snug">{toast.title}</p>
          {toast.description && (
            <p className="mt-0.5 text-[12.5px] text-zinc-500 leading-snug">{toast.description}</p>
          )}
        </div>

        <button
          type="button"
          aria-label="Cerrar notificación"
          onClick={() => dismiss(toast.id)}
          onPointerDownCapture={(e) => e.stopPropagation()}
          className="shrink-0 -mt-0.5 flex items-center justify-center w-6 h-6 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-black/5 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
        </button>
      </div>

      {timed && <ProgressBar id={toast.id} duration={toast.duration} paused={paused} color={bar} />}
    </motion.div>
  );
}

// La barra de tiempo ES el temporizador: al terminar su animación se cierra el
// toast, y pausarla (hover sobre la pila) pausa también el cierre.
function ProgressBar({ id, duration, paused, color }: { id: string; duration: number; paused: boolean; color: string }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const c = animate(scope.current, { scaleX: 0 }, { duration: duration / 1000, ease: "linear" });
    controls.current = c;
    c.then(() => dismiss(id));
    return () => c.stop();
  }, [animate, scope, duration, id]);

  useEffect(() => {
    if (paused) controls.current?.pause();
    else controls.current?.play();
  }, [paused]);

  return (
    <div
      ref={scope}
      className={`absolute bottom-0 left-0 h-[2px] w-full origin-left opacity-60 ${color}`}
    />
  );
}
