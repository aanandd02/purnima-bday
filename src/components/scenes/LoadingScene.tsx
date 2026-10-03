"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScene({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 18 + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(onComplete, 600);
      }
      setProgress(Math.min(v, 100));
    }, 80);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "var(--charcoal)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-cream/40 text-xs tracking-[0.25em] uppercase mb-10"
        style={{ fontFamily: "var(--sans)" }}
      >
        Preparing something special…
      </motion.p>

      {/* Progress bar */}
      <div className="w-32 h-[1px] bg-white/10 overflow-hidden rounded-full">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gold)", width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}
