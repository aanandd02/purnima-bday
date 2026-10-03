"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface CakeTransitionSceneProps {
  onContinue: () => void;
}

export function CakeTransitionScene({ onContinue }: CakeTransitionSceneProps) {
  useEffect(() => {
    let triggered = false;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 30 && !triggered) {
        triggered = true;
        onContinue();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="scene overflow-y-auto hide-scrollbar"
      style={{
        minHeight: "var(--vh-screen)",
        background: "var(--charcoal)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center gap-5 sm:gap-7 px-6 py-8 my-auto text-center w-full max-w-sm" style={{ minHeight: "var(--vh-screen)" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(26px, 7vw, 38px)",
            fontWeight: 300,
            color: "var(--cream)",
            lineHeight: 1.3,
          }}
        >
          {birthdayConfig.cakeTransition.line1}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(13px, 3.6vw, 16px)",
            color: "rgba(245,240,232,0.55)",
            letterSpacing: "0.04em",
          }}
        >
          {birthdayConfig.cakeTransition.line2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 5.8vw, 32px)",
            color: "var(--gold)",
            lineHeight: 1.3,
          }}
        >
          {birthdayConfig.cakeTransition.line3}
        </motion.p>

        <motion.button
          className="btn-cinematic mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8 }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
        >
          I'm ready
        </motion.button>
      </div>
    </motion.div>
  );
}
