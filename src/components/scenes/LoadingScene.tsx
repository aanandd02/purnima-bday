"use client";
import { motion } from "framer-motion";

export function LoadingScene({ onComplete }: { onComplete: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none"
      style={{
        background: "var(--charcoal)",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-cream/40 text-xs tracking-[0.25em] uppercase mb-10"
        style={{
          fontFamily: "var(--sans)",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      >
        Preparing something special…
      </motion.p>

      {/* Progress bar with smooth Framer Motion tween */}
      <div className="w-32 h-[1px] bg-white/10 overflow-hidden rounded-full relative">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "var(--gold)",
            willChange: "transform, width",
            transform: "translateZ(0)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onComplete}
        />
      </div>
    </div>
  );
}
