"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { audioManager } from "@/lib/audioManager";
import { haptic } from "@/lib/utils";

interface CelebrationSceneProps {
  onContinue: () => void;
  audioEnabled: boolean;
}

export function CelebrationScene({ onContinue, audioEnabled }: CelebrationSceneProps) {
  const confettiStarted = useRef(false);

  useEffect(() => {
    let triggered = false;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && !triggered) {
        triggered = true;
        onContinue();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onContinue]);

  useEffect(() => {
    if (confettiStarted.current) return;
    confettiStarted.current = true;

    haptic([30, 60, 30, 60, 30]);
    if (audioEnabled) {
      audioManager.play("celebration", { volume: 0.7, loop: false });
      setTimeout(() => audioManager.play("fireworks", { volume: 0.5 }), 800);
    }

    // Lazy-import canvas-confetti so it doesn't block initial load
    import("canvas-confetti").then(({ default: confetti }) => {
      // Big burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#C9A96E", "#F5F0E8", "#9E7D4B", "#ffffff", "#e8d5b7"],
        ticks: 200,
      });

      // Side bursts
      setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ["#C9A96E", "#F5F0E8"] });
        confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ["#C9A96E", "#F5F0E8"] });
      }, 400);

      // Repeat burst
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, gravity: 0.7 });
      }, 1200);
    }).catch(() => {});
  }, [audioEnabled]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="scene"
      style={{
        minHeight: "var(--vh-screen)",
        background: "var(--charcoal)",
      }}
    >
      {/* Warm burst glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 3, opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 text-center" style={{ minHeight: "var(--vh-screen)" }}>
        {/* HAPPY BIRTHDAY */}
        <motion.p
          initial={{ opacity: 0, y: 30, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.25em" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(12px, 3.5vw, 15px)",
            fontWeight: 400,
            color: "var(--gold)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {birthdayConfig.celebration.mainText}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(52px, 16vw, 96px)",
            fontWeight: 300,
            color: "var(--cream)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
          }}
        >
          {birthdayConfig.celebration.name}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="w-20 h-[1px]"
          style={{ background: "var(--gold)", transformOrigin: "center" }}
        />

        {/* Stars decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex gap-3"
        >
          {["✦", "✧", "✦"].map((s, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              style={{ color: "var(--gold)", fontSize: 16 }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* Continue */}
        <motion.button
          className="btn-cinematic mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}
