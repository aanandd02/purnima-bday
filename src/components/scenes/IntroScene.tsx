"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { haptic } from "@/lib/utils";

interface IntroSceneProps {
  onBegin: () => void;
}

export function IntroScene({ onBegin }: IntroSceneProps) {
  const [phase, setPhase] = useState<"date" | "tagline" | "cta">("date");
  const [tapped, setTapped] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [easterEgg, setEasterEgg] = useState(false);

  const handleDateAnimComplete = () => {
    setTimeout(() => setPhase("tagline"), 1000);
    setTimeout(() => setPhase("cta"), 3000);
  };

  const handleBegin = useCallback(() => {
    if (tapped) return;
    setTapped(true);
    haptic([10, 20, 10]);
    setTimeout(onBegin, 900);
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

  // Long-press easter egg on hero photo
  const startLongPress = () => {
    longPressTimer.current = setTimeout(() => setEasterEgg(true), 1200);
  };
  const endLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  return (
    <div className="scene relative" style={{ minHeight: "var(--vh-screen)" }}>
      {/* Blurred hero photo */}
      <motion.div
        className="absolute inset-0 vignette"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={startLongPress}
        onMouseUp={endLongPress}
        onTouchStart={startLongPress}
        onTouchEnd={endLongPress}
      >
        <Image
          src={birthdayConfig.heroPhoto}
          alt="Purnima"
          fill
          priority
          className="object-cover object-top"
          style={{ filter: "blur(2px) brightness(0.45) saturate(0.7)" }}
          sizes="430px"
        />
        {/* warm gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,7,10,0.5) 0%, rgba(7,7,10,0.2) 40%, rgba(7,7,10,0.7) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 text-center" style={{ minHeight: "var(--vh-screen)" }}>
        {/* Date */}
        <AnimatePresence>
          {(phase === "date" || phase === "tagline" || phase === "cta") && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={handleDateAnimComplete}
            >
              <p className="text-gold/70 text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: "var(--sans)" }}>
                October
              </p>
              <h1
                className="text-cream/95"
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(72px, 22vw, 120px)",
                  fontWeight: 300,
                  lineHeight: 0.9,
                  letterSpacing: "-0.03em",
                }}
              >
                18
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tagline */}
        <AnimatePresence>
          {(phase === "tagline" || phase === "cta") && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 mb-2 text-cream/55 text-base leading-relaxed max-w-[260px]"
              style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(15px, 4vw, 18px)" }}
            >
              Tumhare liye kuch khaas… sirf tumhare liye.
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA */}
        <AnimatePresence>
          {phase === "cta" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <motion.button
                className="btn-cinematic"
                onClick={handleBegin}
                whileTap={{ scale: 0.96 }}
                disabled={tapped}
              >
                {tapped ? (
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0.4 }}
                    className="tracking-widest text-xs"
                  >
                    …
                  </motion.span>
                ) : (
                  "Begin the surprise"
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Easter egg overlay */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/90 flex flex-col items-center justify-center px-10 text-center"
            onClick={() => setEasterEgg(false)}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--sans)" }}
            >
              You found the secret 🤍
            </motion.p>
            <p
              className="text-cream/80 leading-relaxed"
              style={{ fontFamily: "var(--serif)", fontSize: "clamp(17px,4.5vw,22px)", fontStyle: "italic" }}
            >
              {birthdayConfig.easterEggs[0].message}
            </p>
            <p className="text-cream/30 text-xs mt-8 tracking-widest">tap to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
