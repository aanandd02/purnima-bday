"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { haptic } from "@/lib/utils";
import { audioManager } from "@/lib/audioManager";

interface YearAheadSceneProps {
  onContinue: () => void;
}

// Celestial Sacred Heart/Corona Constellation Coordinates (on a 320x300 viewBox)
const STAR_COORDS = [
  { x: 160, y: 55 }, 
  { x: 75,  y: 95 },   
  { x: 245, y: 95 },   
  { x: 50,  y: 190 },  
  { x: 270, y: 190 },  
  { x: 110, y: 255 },  
  { x: 210, y: 255 },  
];

// Constellation connecting lines: Outer ring + 2 inner sacred geometry chords for EVERY star ({7/3} Heptagram)
const CONSTELLATION_LINES = [
  // Outer perimeter ring
  [0, 1], [0, 2],
  [1, 3], [2, 4],
  [3, 5], [4, 6],
  [5, 6],
  // Inner constellation chords — 2 lines for every star connecting across
  [0, 5], [0, 6], // Love -> Adventures & Always
  [1, 4], [1, 6], // Dreams -> Success & Always
  [2, 3], [2, 5], // Joy -> Peace & Adventures
  [3, 4],         // Peace -> Success (forms complete symmetric star)
];

const STAR_THEMES = [
  {
    name: "Love",
    color: "#FF6584",
    aura: "rgba(255, 101, 132, 0.45)",
    border: "rgba(255, 101, 132, 0.75)",
    bg: "radial-gradient(ellipse at 50% 30%, #2c0f20 0%, #150914 55%, #060508 100%)",
    subtext: "For your pure heart 💖",
  },
  {
    name: "Dreams",
    color: "#B197FC",
    aura: "rgba(177, 151, 252, 0.45)",
    border: "rgba(177, 151, 252, 0.75)",
    bg: "radial-gradient(ellipse at 50% 30%, #1c1132 0%, #0d081c 55%, #060508 100%)",
    subtext: "For your highest aspirations ✨",
  },
  {
    name: "Joy",
    color: "#FFA94D",
    aura: "rgba(255, 169, 77, 0.45)",
    border: "rgba(255, 169, 77, 0.75)",
    bg: "radial-gradient(ellipse at 50% 30%, #2b170c 0%, #160c07 55%, #060508 100%)",
    subtext: "For your infectious laughter 🌸",
  },
  {
    name: "Peace",
    color: "#74C0FC",
    aura: "rgba(116, 192, 252, 0.45)",
    border: "rgba(116, 192, 252, 0.75)",
    bg: "radial-gradient(ellipse at 50% 30%, #0d1e2e 0%, #060f18 55%, #060508 100%)",
    subtext: "For your quiet serenity 🕊️",
  },
  {
    name: "Adventures",
    color: "#FFE066",
    aura: "rgba(255, 224, 102, 0.45)",
    border: "rgba(255, 224, 102, 0.75)",
    bg: "radial-gradient(ellipse at 50% 30%, #2c220b 0%, #161105 55%, #060508 100%)",
    subtext: "For all our journeys ahead 🥂",
  },
  {
    name: "Always",
    color: "#DA77F2",
    aura: "rgba(218, 119, 242, 0.45)",
    border: "rgba(218, 119, 242, 0.75)",
    bg: "radial-gradient(ellipse at 50% 30%, #260e2d 0%, #140718 55%, #060508 100%)",
    subtext: "Forever by your side 🌙",
  },
  {
    name: "Success",
    color: "#FFD43B",
    aura: "rgba(255, 212, 59, 0.45)",
    border: "rgba(255, 212, 59, 0.75)",
    bg: "radial-gradient(ellipse at 50% 30%, #2b1d07 0%, #150e04 55%, #060508 100%)",
    subtext: "For every dream fulfilled 🌟",
  },
];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function YearAheadScene({ onContinue }: YearAheadSceneProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [unlockedStars, setUnlockedStars] = useState<Set<number>>(new Set([0]));
  const stars = birthdayConfig.yearAhead.stars;
  const currentTheme = STAR_THEMES[activeIndex] || STAR_THEMES[0];
  const [secretTaps, setSecretTaps] = useState(0);
  const [easterEgg2, setEasterEgg2] = useState(false);
  const easterEggShown = useRef(false);

  const handleStarTap = (i: number) => {
    haptic([20, 40, 20]);
    setActiveIndex(i);
    setUnlockedStars((prev) => new Set(prev).add(i));

    // Easter egg — shows exactly once and never opens again
    if (!easterEggShown.current) {
      setSecretTaps((t) => {
        const next = t + 1;
        if (next === 7 && !easterEggShown.current) {
          easterEggShown.current = true;
          setEasterEgg2(true);
        }
        return next;
      });
    }
  };

  const handleNextWish = () => {
    const next = (activeIndex + 1) % stars.length;
    handleStarTap(next);
  };

  return (
    <div
      className="scene overflow-y-auto overflow-x-hidden hide-scrollbar relative select-none"
      style={{
        minHeight: "var(--vh-screen)",
        background: currentTheme.bg,
        transition: "background 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Cosmic Romantic Aurora Glow matching active star */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${currentTheme.aura} 0%, rgba(212,175,55,0.06) 45%, transparent 75%)`,
          transform: "translateZ(0)",
          transition: "background 0.6s ease",
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
          x: [-20, 240],
          y: [-15, 140],
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
          transition={{ delay: 0.15, duration: 0.8, ease: LUXURY_EASE }}
          className="flex flex-col items-center gap-1.5 pt-2"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
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
                const isDirectToSelected = fromIdx === activeIndex || toIdx === activeIndex;
                return (
                  <g key={li}>
                    <line
                      x1={p1.x}
                      y1={p1.y}
                      x2={p2.x}
                      y2={p2.y}
                      stroke={
                        isDirectToSelected
                          ? currentTheme.color
                          : isLineActive
                          ? "url(#lineGrad)"
                          : "rgba(212,175,55,0.18)"
                      }
                      strokeWidth={isDirectToSelected ? 2 : isLineActive ? 1.5 : 1}
                      strokeDasharray={isDirectToSelected || isLineActive ? "none" : "3,3"}
                      style={{
                        transition: "stroke 0.4s ease, stroke-width 0.4s ease, filter 0.4s ease",
                        filter: isDirectToSelected ? `drop-shadow(0 0 3px ${currentTheme.color})` : undefined,
                      }}
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
              const theme = STAR_THEMES[i] || STAR_THEMES[0];

              return (
                <motion.button
                  key={i}
                  className="absolute flex flex-col items-center cursor-pointer -translate-x-1/2 -translate-y-1/2 p-1"
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
                      scale: isSelected ? [1.1, 1.35, 1.1] : [1, 1.12, 1],
                    }}
                    transition={{
                      duration: isSelected ? 1.5 : 2.5 + (i % 2),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      width: isSelected ? 48 : 38,
                      height: isSelected ? 48 : 38,
                      background: isSelected
                        ? `radial-gradient(circle, ${theme.aura} 0%, transparent 80%)`
                        : isUnlocked
                        ? `radial-gradient(circle, ${theme.aura} 0%, transparent 70%)`
                        : "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    }}
                  >
                    {/* Star Core Orb */}
                    <div
                      className="flex items-center justify-center rounded-full text-[13px]"
                      style={{
                        width: isSelected ? 30 : 24,
                        height: isSelected ? 30 : 24,
                        background: isSelected
                          ? `linear-gradient(135deg, #FFF 0%, ${theme.color} 100%)`
                          : isUnlocked
                          ? `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${theme.color} 100%)`
                          : "linear-gradient(135deg, rgba(40,30,45,0.9) 0%, rgba(25,18,30,0.95) 100%)",
                        border: `1.5px solid ${
                          isSelected
                            ? "#FFF"
                            : isUnlocked
                            ? theme.border
                            : "rgba(212,175,55,0.4)"
                        }`,
                        boxShadow: isSelected
                          ? `0 0 20px ${theme.color}, 0 0 35px ${theme.aura}`
                          : isUnlocked
                          ? `0 0 12px ${theme.aura}`
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
                        ? theme.color
                        : isUnlocked
                        ? "rgba(255,240,210,0.9)"
                        : "rgba(245,240,232,0.45)",
                      textShadow: isSelected ? `0 0 10px ${theme.aura}` : "none",
                      fontWeight: isSelected ? 700 : 500,
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

        {/* Dynamic Star Blessing Card — morphs according to selected star */}
        <div className="w-full relative z-40 my-2 min-h-[175px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="w-full"
            >
              <div
                className="w-full p-4 sm:p-5 rounded-3xl relative overflow-hidden text-left"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(30, 20, 34, 0.95) 0%, rgba(16, 10, 20, 0.98) 100%)",
                  border: `1.5px solid ${currentTheme.border}`,
                  boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${currentTheme.aura}, inset 0 1px 0 rgba(255,240,210,0.2)`,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  transition: "border 0.5s ease, box-shadow 0.5s ease",
                }}
              >
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                      style={{
                        background: currentTheme.aura,
                        border: `1px solid ${currentTheme.border}`,
                        boxShadow: `0 0 12px ${currentTheme.aura}`,
                      }}
                    >
                      {stars[activeIndex].icon}
                    </div>
                    <div className="flex flex-col text-left">
                      <span
                        className="text-[10px] tracking-[0.2em] uppercase font-semibold"
                        style={{ color: currentTheme.color, fontFamily: "var(--sans)" }}
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

                  <span
                    className="text-[10px] font-sans px-2.5 py-1 rounded-full border border-white/10"
                    style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.05)" }}
                  >
                    Star {activeIndex + 1}/7
                  </span>
                </div>

                {/* Heartfelt Wish Content */}
                <p
                  className="text-left my-2.5"
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(13.5px, 3.7vw, 15.5px)",
                    color: "rgba(253, 251, 247, 0.95)",
                    lineHeight: 1.6,
                  }}
                >
                  "{stars[activeIndex].wish}"
                </p>

                {/* Action footer inside card */}
                <div className="flex items-center justify-between pt-2.5 mt-1 border-t border-[rgba(212,175,55,0.18)]">
                  <span className="text-[11px] font-medium" style={{ color: currentTheme.color }}>
                    {unlockedStars.size} of {stars.length} revealed ✨
                  </span>

                  <button
                    onClick={handleNextWish}
                    className="px-3.5 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                    style={{
                      background: currentTheme.aura,
                      border: `1px solid ${currentTheme.border}`,
                      color: "#FFF",
                    }}
                  >
                    Next Star ›
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

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
            className="btn-cinematic w-auto px-8"
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: LUXURY_EASE }}
          >
            <span>From My Heart To Yours</span>
            <span className="text-sm">🌹</span>
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
            onClick={() => {
              easterEggShown.current = true;
              setEasterEgg2(false);
            }}
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
    </div>
  );
}
