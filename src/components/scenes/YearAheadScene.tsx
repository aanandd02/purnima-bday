"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { haptic } from "@/lib/utils";
import { audioManager } from "@/lib/audioManager";

interface YearAheadSceneProps {
  onContinue: () => void;
}

// Celestial Sacred Heart/Corona Constellation Coordinates (on a 320x300 viewBox)
const STAR_COORDS = [
  { x: 160, y: 55 },   // Top center crown
  { x: 75,  y: 95 },   // Top left
  { x: 245, y: 95 },   // Top right
  { x: 50,  y: 190 },  // Mid left
  { x: 270, y: 190 },  // Mid right
  { x: 110, y: 255 },  // Bottom left
  { x: 210, y: 255 },  // Bottom right
];

// Constellation connecting lines
const CONSTELLATION_LINES = [
  [0, 1], [0, 2],
  [1, 3], [2, 4],
  [3, 5], [4, 6],
  [5, 6],
  [0, 5], [0, 6], // Inner heart/sacred geometry ties
];

export function YearAheadScene({ onContinue }: YearAheadSceneProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [unlockedStars, setUnlockedStars] = useState<Set<number>>(new Set());
  const stars = birthdayConfig.yearAhead.stars;
  const [secretTaps, setSecretTaps] = useState(0);
  const [easterEgg2, setEasterEgg2] = useState(false);

  useEffect(() => {
    let triggered = false;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && !triggered && !easterEgg2 && activeIndex === null) {
        triggered = true;
        onContinue();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onContinue, easterEgg2, activeIndex]);

  const handleStarTap = (i: number) => {
    haptic([18, 30, 18]);
    setActiveIndex(i);
    setUnlockedStars((prev) => new Set(prev).add(i));

    // Easter egg
    setSecretTaps((t) => {
      const next = t + 1;
      if (next >= 6) setEasterEgg2(true);
      return next;
    });
  };

  const handleNextWish = () => {
    if (activeIndex !== null) {
      const next = (activeIndex + 1) % stars.length;
      handleStarTap(next);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="scene overflow-y-auto hide-scrollbar relative select-none"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 30%, #16101c 0%, #0c0910 60%, #060508 100%)",
      }}
    >
      {/* Cosmic Romantic Aurora Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,150,180,0.12) 0%, rgba(212,175,55,0.08) 40%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* Twinkling Stardust Field */}
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: (i % 3) + 1.2,
            height: (i % 3) + 1.2,
            top: `${(i * 19) % 96}%`,
            left: `${(i * 31) % 94}%`,
            background: i % 2 === 0 ? "rgba(255,230,160,0.85)" : "rgba(255,255,255,0.75)",
            boxShadow: i % 4 === 0 ? "0 0 6px rgba(255,215,0,0.8)" : "none",
          }}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: (i % 4) + 2.2,
            repeat: Infinity,
            delay: (i * 0.18) % 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Star effect */}
      <motion.div
        className="absolute w-28 h-[1px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(255,215,0,0.8), transparent)",
          top: "15%",
          left: "5%",
          rotate: "-35deg",
        }}
        animate={{
          x: [-50, 400],
          y: [-30, 220],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 5.5,
          ease: "easeOut",
        }}
      />

      {/* Main Content Container */}
      <div
        className="relative z-10 flex flex-col items-center justify-between px-4 py-6 my-auto text-center w-full max-w-sm"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col items-center gap-1.5 pt-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md">
            <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-medium">
              ✨ 7 Wishes For You
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(24px, 6.8vw, 34px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.25,
              marginTop: 4,
              letterSpacing: "0.02em",
            }}
          >
            {birthdayConfig.yearAhead.title}
          </h2>

          <p
            className="text-xs text-cream/55 max-w-[280px] leading-relaxed"
            style={{ fontFamily: "var(--sans)" }}
          >
            {birthdayConfig.yearAhead.subtitle}
          </p>
        </motion.div>

        {/* Constellation Star Map Container */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="relative w-[310px] h-[280px]">
            {/* SVG Constellation Lines */}
            <svg
              className="absolute inset-0 pointer-events-none w-full h-full"
              viewBox="0 0 320 300"
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212,175,55,0.4)" />
                  <stop offset="50%" stopColor="rgba(255,230,170,0.6)" />
                  <stop offset="100%" stopColor="rgba(212,175,55,0.4)" />
                </linearGradient>
              </defs>

              {CONSTELLATION_LINES.map(([fromIdx, toIdx], li) => {
                const p1 = STAR_COORDS[fromIdx];
                const p2 = STAR_COORDS[toIdx];
                const isLineActive = unlockedStars.has(fromIdx) && unlockedStars.has(toIdx);
                return (
                  <g key={li}>
                    <line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={isLineActive ? "url(#lineGrad)" : "rgba(212,175,55,0.18)"}
                      strokeWidth={isLineActive ? 1.5 : 1}
                      strokeDasharray={isLineActive ? "none" : "3,3"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Glowing Stars */}
            {stars.map((star, i) => {
              const coord = STAR_COORDS[i] || { x: 160, y: 150 };
              const isSelected = activeIndex === i;
              const isUnlocked = unlockedStars.has(i);

              return (
                <motion.button
                  key={i}
                  className="absolute flex flex-col items-center cursor-pointer -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: coord.x,
                    top: coord.y,
                    background: "none",
                    border: "none",
                    zIndex: isSelected ? 30 : 20,
                  }}
                  onClick={() => handleStarTap(i)}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Star ${star.label}`}
                >
                  {/* Glowing Corona Aura */}
                  <motion.div
                    className="relative flex items-center justify-center rounded-full"
                    animate={{
                      scale: isSelected ? [1.1, 1.4, 1.1] : [1, 1.15, 1],
                    }}
                    transition={{
                      duration: isSelected ? 1.5 : 2.5 + (i % 2),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: isSelected ? 46 : 38,
                      height: isSelected ? 46 : 38,
                      background: isSelected
                        ? "radial-gradient(circle, rgba(255,215,80,0.4) 0%, rgba(212,140,40,0.15) 60%, transparent 80%)"
                        : isUnlocked
                        ? "radial-gradient(circle, rgba(255,215,80,0.25) 0%, transparent 70%)"
                        : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    }}
                  >
                    {/* Star Core Orb */}
                    <div
                      className="flex items-center justify-center rounded-full text-[13px]"
                      style={{
                        width: isSelected ? 28 : 24,
                        height: isSelected ? 28 : 24,
                        background: isSelected
                          ? "linear-gradient(135deg, #FFEAA7 0%, #D4AF37 100%)"
                          : isUnlocked
                          ? "linear-gradient(135deg, rgba(255,235,170,0.9) 0%, rgba(212,175,55,0.85) 100%)"
                          : "linear-gradient(135deg, rgba(40,30,45,0.9) 0%, rgba(25,18,30,0.95) 100%)",
                        border: `1.5px solid ${
                          isSelected
                            ? "#FFF"
                            : isUnlocked
                            ? "rgba(255,230,160,0.9)"
                            : "rgba(212,175,55,0.4)"
                        }`,
                        boxShadow: isSelected
                          ? "0 0 20px #FFD700, 0 0 35px rgba(255,215,0,0.6)"
                          : isUnlocked
                          ? "0 0 12px rgba(212,175,55,0.6)"
                          : "0 0 6px rgba(0,0,0,0.5)",
                        color: isSelected || isUnlocked ? "#000" : "rgba(255,255,255,0.7)",
                        transition: "all 0.35s ease",
                      }}
                    >
                      {star.icon || "✦"}
                    </div>
                  </motion.div>

                  {/* Star Label */}
                  <span
                    className="font-medium tracking-wider uppercase whitespace-nowrap mt-0.5"
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "9px",
                      color: isSelected
                        ? "var(--gold-light)"
                        : isUnlocked
                        ? "rgba(255,240,210,0.9)"
                        : "rgba(245,240,232,0.45)",
                      textShadow: isSelected ? "0 0 10px rgba(212,175,55,0.8)" : "none",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {star.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* VIP Star Blessing Card Modal / Popover */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative z-40 my-2"
            >
              <div
                className="w-full p-4 sm:p-5 rounded-3xl relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(32, 22, 36, 0.94) 0%, rgba(18, 12, 22, 0.96) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.18), inset 0 1px 0 rgba(255,240,210,0.2)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveIndex(null)}
                  className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center text-cream/40 hover:text-cream border border-white/10 hover:border-gold/40 transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  ✕
                </button>

                {/* Badge Header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{stars[activeIndex].icon}</span>
                  <div className="flex flex-col text-left">
                    <span
                      className="text-[10px] tracking-[0.2em] text-gold uppercase font-medium"
                      style={{ fontFamily: "var(--sans)" }}
                    >
                      {stars[activeIndex].tag}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: "18px",
                        color: "var(--gold-light)",
                        lineHeight: 1.2,
                      }}
                    >
                      {stars[activeIndex].label}
                    </h3>
                  </div>
                </div>

                {/* Heartfelt Wish Content */}
                <p
                  className="text-left my-2.5"
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(14px, 3.8vw, 16px)",
                    color: "rgba(253, 251, 247, 0.92)",
                    lineHeight: 1.6,
                  }}
                >
                  "{stars[activeIndex].wish}"
                </p>

                {/* Action footer inside card */}
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-[rgba(212,175,55,0.18)]">
                  <span className="text-[11px] text-gold/60 font-medium">
                    {unlockedStars.size} of {stars.length} revealed ✨
                  </span>

                  <button
                    onClick={handleNextWish}
                    className="px-3.5 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-medium flex items-center gap-1.5 transition-all"
                    style={{
                      background: "rgba(212,175,55,0.15)",
                      border: "1px solid rgba(212,175,55,0.4)",
                      color: "var(--gold-light)",
                    }}
                  >
                    Next Star ›
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Progress & Continue CTA */}
        <div className="flex flex-col items-center gap-3 w-full pb-2">
          {/* Unlocked Stars Dots indicator */}
          <div className="flex items-center gap-1.5">
            {stars.map((_, i) => (
              <div
                key={i}
                style={{
                  width: unlockedStars.has(i) ? 7 : 5,
                  height: unlockedStars.has(i) ? 7 : 5,
                  borderRadius: "50%",
                  background: unlockedStars.has(i) ? "var(--gold)" : "rgba(255,255,255,0.2)",
                  boxShadow: unlockedStars.has(i) ? "0 0 8px #FFD700" : "none",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          <motion.button
            className="btn-cinematic w-full max-w-[240px]"
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(32, 20, 36, 0.9) 0%, rgba(18, 12, 20, 0.95) 100%)",
              border: "1px solid rgba(212, 175, 55, 0.5)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.2)",
              color: "var(--gold-light)",
            }}
          >
            {unlockedStars.size >= 7 ? "Continue with Love ›" : "Continue ›"}
          </motion.button>
        </div>
      </div>

      {/* Secret Easter Egg Modal */}
      <AnimatePresence>
        {easterEgg2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 flex flex-col items-center justify-center px-8 text-center"
            onClick={() => setEasterEgg2(false)}
          >
            <p
              className="text-gold text-xs tracking-widest uppercase mb-4 font-medium"
              style={{ fontFamily: "var(--sans)" }}
            >
              A Secret For Purnima 🌟💖
            </p>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px,5vw,23px)",
                color: "var(--cream)",
                lineHeight: 1.6,
              }}
            >
              {birthdayConfig.easterEggs[1].message}
            </p>
            <p className="text-cream/40 text-xs mt-8 tracking-widest uppercase">tap anywhere to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
