"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface WishSequenceSceneProps {
  onContinue: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function WishSequenceScene({ onContinue }: WishSequenceSceneProps) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const wishes = birthdayConfig.wishes;

  const advance = () => {
    if (index < wishes.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setDone(true);
    }
  };

  return (
    <div
      className={`scene select-none relative ${!done ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (!done) advance();
      }}
      style={{
        minHeight: "var(--vh-screen)",
        background: "var(--charcoal)",
        overflow: "hidden",
      }}
    >
      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 py-10 text-center w-full max-w-sm my-auto mx-auto"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {!done ? (
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: LUXURY_EASE },
              }}
              exit={{
                opacity: 0,
                y: -12,
                transition: { duration: 0.35, ease: LUXURY_EASE },
              }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(24px, 6.8vw, 36px)",
                fontWeight: 400,
                color: "#FFFFFF",
                textShadow: "0 2px 25px rgba(255,255,255,0.15), 0 0 15px rgba(212,175,55,0.3)",
                lineHeight: 1.35,
                maxWidth: 320,
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              {wishes[index]}
            </motion.p>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="flex flex-col items-center gap-5"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          >
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 5.5vw, 26px)",
                color: "var(--gold-light)",
                maxWidth: 280,
                lineHeight: 1.5,
              }}
            >
              And so much more.
            </p>
            <motion.button
              className="btn-cinematic mt-2"
              whileTap={{ scale: 0.96 }}
              onClick={(e) => {
                e.stopPropagation();
                onContinue();
              }}
            >
              One more thing…
            </motion.button>
          </motion.div>
        )}

        {/* Wish counter dots + tap hint */}
        {!done && (
          <div className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-3">
            <motion.p
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fontFamily: "var(--sans)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(212,175,55,0.6)",
                willChange: "opacity",
                transform: "translateZ(0)",
              }}
            >
              tap to continue
            </motion.p>
            <div className="flex items-center gap-2 pointer-events-none">
              {wishes.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === index ? 18 : 5,
                    height: 5,
                    borderRadius: 3,
                    background: i === index ? "var(--gold)" : "rgba(255,255,255,0.25)",
                    boxShadow: i === index ? "0 0 8px rgba(212,175,55,0.6)" : "none",
                    transition: "all 0.35s ease",
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
