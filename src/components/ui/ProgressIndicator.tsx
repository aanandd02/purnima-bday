"use client";
import { motion } from "framer-motion";

const SCENES = 12;

interface ProgressIndicatorProps {
  current: number; // 0-indexed
  total?: number;
  visible: boolean;
}

export function ProgressIndicator({ current, total = SCENES, visible }: ProgressIndicatorProps) {
  if (!visible) return null;
  return (
    <div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2"
      style={{ left: "max(16px, env(safe-area-inset-left))" }}
      aria-hidden="true"
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="progress-dot"
          animate={{ scale: i === current ? 1.5 : 1, opacity: i === current ? 1 : 0.3 }}
          style={{ background: i === current ? "var(--gold)" : "rgba(245,240,232,0.2)" }}
          transition={{ duration: 0.4 }}
        />
      ))}
    </div>
  );
}
