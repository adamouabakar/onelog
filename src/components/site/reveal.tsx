"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Above-the-fold blocks should mount visible instead of waiting for scroll intersection. */
  eager?: boolean;
};

/** Apparition subtile (fade + montée) au défilement, respectant prefers-reduced-motion. */
export function Reveal({ children, delay = 0, className, eager = false }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      {...(eager
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
          })}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
