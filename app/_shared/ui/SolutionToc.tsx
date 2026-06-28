// app/_shared/ui/SolutionToc.tsx
// Índice de contenidos lateral (sticky) para las páginas de detalle de soluciones.
// Resalta la sección activa al hacer scroll y permite saltar a cada apartado.
"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

type SolutionTocProps = {
  title: string;
  items: TocItem[];
};

export default function SolutionToc({ title, items }: SolutionTocProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
      <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-4">{title}</p>
      <nav className="flex flex-col border-l border-zinc-200">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            onClick={(e) => handleClick(e, it.id)}
            className={`-ml-px border-l-2 pl-4 py-1.5 text-sm leading-snug transition-colors duration-200 ${
              active === it.id
                ? "border-[#E02020] text-zinc-900 font-semibold"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            {it.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
