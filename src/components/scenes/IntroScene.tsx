"use client";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { storyConfig } from "@/lib/storyConfig";
import { haptic } from "@/lib/utils";
import { asset } from "@/lib/assetPath";

interface IntroSceneProps {
  onBegin: () => void;
}

// Subtle ambient particle
function Particle({ i }: { i: number }) {
  const size = 2 + (i % 3);
  const left = `${(i * 37 + 12) % 95}%`;
  const delay = (i * 0.3) % 4;
  const dur = 4.5 + (i % 3);
  const isHeart = i % 5 === 0;
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left, bottom: "-5%", fontSize: isHeart ? 11 : size }}
      animate={{ y: [0, -(190 + (i % 100))], opacity: [0, 0.7, 0] }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5 + (i % 2),
        ease: "easeOut",
      }}
    >
      {isHeart ? "♥" : "·"}
    </motion.div>
  );
}

// Framer motion smooth stagger variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function IntroScene({ onBegin }: IntroSceneProps) {
  const [tapped, setTapped] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [easterEgg, setEasterEgg] = useState(false);

  const handleBegin = useCallback(() => {
    if (tapped) return;
    setTapped(true);
    haptic([10, 20, 10]);
    setTimeout(onBegin, 800);
  }, [tapped, onBegin]);

  useEffect(() => {
    let triggered = false;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && !triggered && !easterEgg) {
        triggered = true;
        handleBegin();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [easterEgg, handleBegin]);

  const startLongPress = () => {
    longPressTimer.current = setTimeout(() => setEasterEgg(true), 1200);
  };
  const endLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  return (
    <div className="scene relative" style={{ minHeight: "var(--vh-screen)", overflow: "hidden" }}>
      {/* Hero photo background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={startLongPress}
        onMouseUp={endLongPress}
        onTouchStart={startLongPress}
        onTouchEnd={endLongPress}
      >
        <Image
          src={asset(storyConfig.heroPhoto)}
          alt="Purnima"
          fill
          priority
          className="object-cover object-top"
          style={{ filter: "brightness(0.62) saturate(0.9)" }}
          sizes="100vw"
        />

        {/* Multi-layer cinematic vignette & gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(30,6,16,0.65) 0%, rgba(12,4,10,0.15) 30%, rgba(8,3,8,0.82) 75%, rgba(8,3,8,0.98) 100%)",
          }}
        />

        {/* Ambient warm glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 105%, rgba(124,45,62,0.45) 0%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} style={{ color: i % 5 === 0 ? "rgba(235,140,165,0.6)" : "rgba(212,175,55,0.4)" }}>
          <Particle i={i} />
        </span>
      ))}

      {/* ── Content (Smooth staggered animation, full suspense) ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-end h-full px-6 text-center"
        style={{ minHeight: "var(--vh-screen)", paddingBottom: "clamp(60px, 11vw, 95px)" }}
      >
        {/* Eyebrow badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-2.5">
          <div className="w-6 h-px" style={{ background: "var(--gold)", opacity: 0.55 }} />
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "10px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--gold)",
              opacity: 0.85,
            }}
          >
            {storyConfig.intro.eyebrow}
          </p>
          <div className="w-6 h-px" style={{ background: "var(--gold)", opacity: 0.55 }} />
        </motion.div>

        {/* Heading & Name */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-1 my-1">
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(26px, 7.5vw, 40px)",
              fontWeight: 300,
              color: "rgba(248,243,236,0.85)",
              letterSpacing: "0.01em",
              lineHeight: 1.15,
            }}
          >
            {storyConfig.intro.heading}
          </h1>

          <motion.h2
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(34px, 10vw, 54px)",
              fontWeight: 400,
              color: "var(--gold-light)",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              textShadow: "0 0 35px rgba(212,175,55,0.35)",
            }}
          >
            {storyConfig.intro.name} 🌹
          </motion.h2>
        </motion.div>

        {/* Ornamental Divider */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 my-2 opacity-60">
          <div className="w-10 h-px" style={{ background: "var(--gold)" }} />
          <span style={{ color: "var(--gold)", fontSize: 12 }}>✦</span>
          <div className="w-10 h-px" style={{ background: "var(--gold)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="max-w-[290px] mt-1"
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 3.8vw, 17px)",
            color: "rgba(248,243,236,0.65)",
            lineHeight: 1.65,
          }}
        >
          {storyConfig.intro.tagline}
        </motion.p>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="mt-2"
          style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "rgba(212,175,55,0.75)",
          }}
        >
          {storyConfig.intro.subtext}
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-7">
          <motion.button
            className="btn-cinematic"
            onClick={handleBegin}
            whileTap={{ scale: 0.96 }}
            disabled={tapped}
            style={{
              background: "linear-gradient(135deg, rgba(90,18,32,0.7) 0%, rgba(30,8,16,0.85) 100%)",
              borderColor: "rgba(201,169,110,0.65)",
              boxShadow: "0 0 45px rgba(201,169,110,0.15), 0 12px 35px rgba(0,0,0,0.55)",
              color: "var(--gold-light)",
              fontSize: "12px",
              letterSpacing: "0.18em",
            }}
          >
            {tapped ? (
              <motion.span initial={{ opacity: 1 }} animate={{ opacity: 0.4 }} className="tracking-widest text-xs">
                …
              </motion.span>
            ) : (
              storyConfig.intro.cta
            )}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Easter egg overlay */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/92 flex flex-col items-center justify-center px-10 text-center"
            onClick={() => setEasterEgg(false)}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "10px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 16,
              }}
            >
              You found the secret 🤍
            </motion.p>
            <p
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(17px,4.5vw,22px)",
                fontStyle: "italic",
                color: "rgba(248,243,236,0.85)",
                lineHeight: 1.7,
              }}
            >
              {storyConfig.easterEggs[0].message}
            </p>
            <p
              style={{
                fontFamily: "var(--sans)",
                fontSize: "11px",
                color: "rgba(248,243,236,0.3)",
                letterSpacing: "0.15em",
                marginTop: 32,
              }}
            >
              tap to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
