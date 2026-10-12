"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { storyConfig } from "@/lib/storyConfig";

interface CakeTransitionSceneProps {
  onContinue: () => void;
}

export function CakeTransitionScene({ onContinue }: CakeTransitionSceneProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3200);
    const t4 = setTimeout(() => onContinue(), 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="scene flex flex-col items-center justify-center"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 50%, rgba(90,20,35,0.4) 0%, #07060A 70%)",
      }}
    >
      {/* Warm center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,60,80,0.18) 0%, rgba(212,175,55,0.08) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center px-10">
        {/* Ornamental divider */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
              <span style={{ color: "rgba(212,175,55,0.6)", fontSize: 14 }}>✦</span>
              <div className="w-12 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(15px, 4vw, 18px)",
                color: "rgba(245,240,232,0.35)",
              }}
            >
              {storyConfig.cakeTransition.line1}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 2 && (
            <motion.h2
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(36px, 11vw, 64px)",
                fontWeight: 300,
                color: "var(--gold-light)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {storyConfig.cakeTransition.line2}
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(14px, 3.8vw, 17px)",
                color: "rgba(245,240,232,0.5)",
                maxWidth: 260,
                lineHeight: 1.6,
              }}
            >
              {storyConfig.cakeTransition.line3}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
              <span style={{ color: "rgba(212,175,55,0.6)", fontSize: 14 }}>✦</span>
              <div className="w-12 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
