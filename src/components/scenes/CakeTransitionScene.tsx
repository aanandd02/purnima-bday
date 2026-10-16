"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { storyConfig } from "@/lib/storyConfig";

interface CakeTransitionSceneProps {
  onContinue: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASE,
    },
  },
};

export function CakeTransitionScene({ onContinue }: CakeTransitionSceneProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        onContinue();
      }
    }, 4600);
    return () => clearTimeout(timer);
  }, [onContinue]);

  const handleAdvance = () => {
    if (!hasTriggered.current) {
      hasTriggered.current = true;
      onContinue();
    }
  };

  return (
    <div
      onClick={handleAdvance}
      className="scene flex flex-col items-center justify-center cursor-pointer select-none relative"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 50%, rgba(90,20,35,0.4) 0%, rgba(90,20,35,0.1) 45%, #07060A 70%)",
        overflow: "hidden",
      }}
    >
      {/* Optimized Warm center glow without blur filter */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,60,80,0.22) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-5 text-center px-10 max-w-sm mx-auto"
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      >
        {/* Ornamental divider */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2.5"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <div className="w-10 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
          <span style={{ fontSize: 13 }}>💖</span>
          <div className="w-10 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
        </motion.div>

        {/* Line 1 */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(15px, 4vw, 18px)",
            color: "rgba(245,240,232,0.45)",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {storyConfig.cakeTransition.line1}
        </motion.p>

        {/* Line 2 Heading */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(36px, 11vw, 64px)",
            fontWeight: 300,
            color: "var(--gold-light)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {storyConfig.cakeTransition.line2}
        </motion.h2>

        {/* Line 3 Subtext */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 3.8vw, 17px)",
            color: "rgba(245,240,232,0.5)",
            maxWidth: 260,
            lineHeight: 1.6,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {storyConfig.cakeTransition.line3}
        </motion.p>

        {/* Ornamental divider bottom */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2.5"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <div className="w-10 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
          <span style={{ fontSize: 13 }}>💖</span>
          <div className="w-10 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
