"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  to: number;
  durationMs?: number;
  formatter?: "int" | "fcfa";
  suffix?: string;
  className?: string;
};

function format(n: number, f?: "int" | "fcfa") {
  const rounded = Math.round(n);
  if (f === "fcfa" || f === "int") {
    return new Intl.NumberFormat("fr-FR").format(rounded);
  }
  return String(rounded);
}

/** Compteur animé au défilement (respecte prefers-reduced-motion). */
export function CountUp({ to, durationMs = 1400, formatter, suffix, className }: Props) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min(1, (now - start) / durationMs);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(to * eased);
              if (p < 1) requestAnimationFrame(step);
              else setVal(to);
            };
            requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className={className}>
      {format(val, formatter)}
      {suffix}
    </span>
  );
}
