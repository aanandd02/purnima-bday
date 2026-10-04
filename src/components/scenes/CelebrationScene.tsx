"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { audioManager } from "@/lib/audioManager";
import { haptic } from "@/lib/utils";

interface CelebrationSceneProps {
  onContinue: () => void;
  audioEnabled: boolean;
}

export function CelebrationScene({ onContinue, audioEnabled }: CelebrationSceneProps) {
  const confettiStarted = useRef(false);
  const [showContinue, setShowContinue] = useState(false);
  const [rainHearts, setRainHearts] = useState<{ id: number; left: number; delay: number; size: number; dur: number }[]>([]);

  // Heart rain
  useEffect(() => {
    const hearts = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 96,
      delay: Math.random() * 3,
      size: 14 + Math.random() * 16,
      dur: 3 + Math.random() * 3,
    }));
    setRainHearts(hearts);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowContinue(true), 2200);
    return () => clearTimeout(t);
  }, []);

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

    import("canvas-confetti").then(({ default: confetti }) => {
      // Big center burst
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#C9A96E", "#F5F0E8", "#9E7D4B", "#ffffff", "#FF8FA3", "#FFD6E0"],
        ticks: 220,
        shapes: ["circle", "square"],
      });

      // Left & right side bursts
      setTimeout(() => {
        confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.65 }, colors: ["#C9A96E", "#FF8FA3", "#F5F0E8"] });
        confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.65 }, colors: ["#C9A96E", "#FFD6E0", "#ffffff"] });
      }, 450);

      // Second wave
      setTimeout(() => {
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 }, gravity: 0.65, colors: ["#D4AF37", "#fff", "#FFB6C1"] });
      }, 1300);

      // Soft heart shower from top
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 120,
          origin: { y: 0 },
          colors: ["#FF8FA3", "#FFD6E0", "#FF6B9D"],
          gravity: 0.35,
          ticks: 300,
          scalar: 1.1,
        });
      }, 1800);
    }).catch(() => {});
  }, [audioEnabled]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="scene overflow-hidden"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 40%, #120a14 0%, #09090C 100%)",
      }}
    >
      {/* Falling hearts rain */}
      {rainHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none"
          style={{ left: `${h.left}%`, top: -40, fontSize: h.size }}
          animate={{ y: ["0vh", "110vh"], opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: h.dur,
            delay: h.delay,
            repeat: Infinity,
            repeatDelay: 1 + Math.random() * 3,
            ease: "linear",
          }}
        >
          {h.id % 3 === 0 ? "🌹" : h.id % 3 === 1 ? "💕" : "✨"}
        </motion.div>
      ))}

      {/* Warm burst glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,150,180,0.45) 0%, rgba(201,169,110,0.2) 50%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* HAPPY BIRTHDAY label */}
        <motion.p
          initial={{ opacity: 0, y: 30, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(12px, 3.5vw, 15px)",
            fontWeight: 400,
            color: "var(--gold)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {birthdayConfig.celebration.mainText}
        </motion.p>

        {/* Name — big cinematic */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Divider with heart */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="w-14 h-[1px]" style={{ background: "var(--gold)", transformOrigin: "right" }} />
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "rgba(255,100,150,0.8)", fontSize: 16 }}
          >
            ♥
          </motion.span>
          <div className="w-14 h-[1px]" style={{ background: "var(--gold)", transformOrigin: "left" }} />
        </motion.div>

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

        {/* Romantic sub text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(13px, 3.5vw, 16px)",
            color: "rgba(255,180,210,0.5)",
            maxWidth: 240,
            lineHeight: 1.6,
          }}
        >
          Today belongs to the most extraordinary person in the world. 🌹
        </motion.p>

        {/* Continue */}
        <AnimatePresence>
          {showContinue && (
            <motion.button
              className="btn-cinematic mt-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileTap={{ scale: 0.96 }}
              onClick={onContinue}
            >
              Continue ›
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
