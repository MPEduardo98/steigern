// app/[locale]/(homepage)/_components/Metrics.tsx
"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { yearsOfExperience } from "@root/lib/company";

function Counter({ from = 0, to, suffix = "" }: { from?: number; to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(from);
  const rounded = useTransform(motionVal, (v) => Math.round(v).toLocaleString() + suffix);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      animate(motionVal, to, { duration: 1.8, ease: "easeOut" });
    }
  }, [inView, motionVal, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Metrics() {
  const t = useTranslations("Metrics");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const metrics = [
    { value: 200, suffix: "+", label: t("item1_label"), sublabel: t("item1_sublabel") },
    { value: yearsOfExperience(), suffix: t("item3_suffix"), label: t("item3_label"), sublabel: "" },
  ];

  return (
    <section
      id="metrics"
      ref={ref}
      className="w-full bg-[#E02020] py-10 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="flex justify-center divide-x divide-white/20">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="px-8 sm:px-12 lg:px-16 py-4 text-center"
            >
              <div className="text-white font-black text-2xl sm:text-4xl lg:text-5xl tracking-[-0.04em] mb-1" style={{ fontFamily: "var(--font-body), Open Sans, sans-serif" }}>
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="text-white/80 font-bold text-[11px] sm:text-sm uppercase tracking-[0.08em] sm:tracking-[0.1em] mb-1">
                {m.label}
              </div>
              {m.sublabel && <div className="text-white/50 text-[10px] sm:text-xs">{m.sublabel}</div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
