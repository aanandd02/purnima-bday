"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { haptic } from "@/lib/utils";

interface ReasonsSceneProps {
  onContinue: () => void;
}

// Romantic icons for each reason
const REASON_ICONS = ["🌹", "✨", "🎵", "💛", "🌙", "😂", "🤍", "♾️"];

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export function ReasonsScene({ onContinue }: ReasonsSceneProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set());

  const handleTap = (i: number) => {
    haptic(12);
    const newActive = activeIndex === i ? null : i;
    setActiveIndex(newActive);
    if (newActive !== null) {
      setOpenedSet((prev) => new Set(prev).add(newActive));
    }
  };

  const allOpened = openedSet.size >= birthdayConfig.reasons.length;

  return (
    <div
      className="w-full relative flex flex-col justify-start md:justify-center items-center overflow-y-auto hide-scrollbar"
      style={{
        background: "var(--charcoal)",
        minHeight: "var(--vh-screen)",
      }}
    >
      {/* Warm rose ambient - precomputed radial gradient without filter blur */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 360,
          height: 240,
          background: "radial-gradient(ellipse at 50% 0%, rgba(160,40,80,0.2) 0%, rgba(160,40,80,0.06) 45%, transparent 75%)",
          transform: "translateZ(0)",
        }}
      />

      <div className="flex flex-col items-center px-4 py-8 my-auto w-full max-w-sm relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: LUXURY_EASE }}
          className="text-center mb-6"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 30, display: "block", marginBottom: 8 }}
          >
            💖
          </motion.span>
          <p
            className="text-gold/80 text-[10px] tracking-[0.35em] uppercase mb-1.5 font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Just You
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(24px, 6.5vw, 36px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            Why You Mean The Entire World To Me.
          </h2>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(12px, 3.2vw, 14px)",
              color: "rgba(245,240,232,0.35)",
              marginTop: 6,
            }}
          >
            Tap each one to unfold ✨
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-2.5 w-full">
          {birthdayConfig.reasons.map((reason, i) => {
            const isOpen = activeIndex === i;
            const wasOpened = openedSet.has(i);
            const icon = REASON_ICONS[i] || "🌹";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i + 0.1, duration: 0.5, ease: LUXURY_EASE }}
                style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
              >
                <div
                  className="w-full text-left rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: isOpen
                      ? "linear-gradient(145deg, rgba(48,18,34,0.98) 0%, rgba(26,10,22,0.98) 100%)"
                      : wasOpened
                      ? "linear-gradient(145deg, rgba(30,16,26,0.95) 0%, rgba(18,10,17,0.96) 100%)"
                      : "linear-gradient(145deg, rgba(24,15,24,0.92) 0%, rgba(16,10,17,0.95) 100%)",
                    border: `1px solid ${
                      isOpen
                        ? "rgba(212,175,55,0.6)"
                        : wasOpened
                        ? "rgba(212,175,55,0.28)"
                        : "rgba(212,175,55,0.16)"
                    }`,
                    boxShadow: isOpen
                      ? "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.15)"
                      : "0 4px 14px rgba(0,0,0,0.35)",
                    padding: "13px 16px",
                    opacity: activeIndex !== null && activeIndex !== i ? 0.65 : 1,
                    transform: "translateZ(0)",
                  }}
                  onClick={() => handleTap(i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* Icon */}
                      <span
                        style={{
                          fontSize: 18,
                          display: "block",
                          flexShrink: 0,
                          transform: isOpen ? "scale(1.15)" : "scale(1)",
                          transition: "transform 0.25s ease",
                        }}
                      >
                        {icon}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "clamp(15px, 4vw, 18px)",
                          fontWeight: isOpen ? 400 : 300,
                          color: isOpen ? "var(--gold-light)" : "var(--cream)",
                        }}
                      >
                        {reason.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Read dot */}
                      {wasOpened && !isOpen && (
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "rgba(212,175,55,0.5)" }}
                        />
                      )}
                      <span
                        style={{
                          color: isOpen ? "var(--gold)" : "rgba(245,240,232,0.35)",
                          fontSize: 18,
                          lineHeight: 1,
                          flexShrink: 0,
                          marginLeft: 6,
                          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                          display: "inline-block",
                        }}
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: LUXURY_EASE }}
                        className="overflow-hidden"
                      >
                        <p
                          style={{
                            fontFamily: "var(--serif)",
                            fontStyle: "italic",
                            fontSize: "clamp(13px, 3.4vw, 15px)",
                            color: "rgba(253,245,230,0.9)",
                            lineHeight: 1.6,
                            marginTop: 10,
                            paddingTop: 8,
                            borderTop: "1px solid rgba(212,175,55,0.15)",
                            willChange: "transform, opacity",
                            transform: "translateZ(0)",
                          }}
                        >
                          {reason.message}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress note */}
        <AnimatePresence>
          {allOpened && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(13px, 3.5vw, 16px)",
                color: "var(--gold-light)",
              }}
            >
              You've read every one 🌹 Loving you could fill an entire lifetime of books.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Continue */}
        <motion.button
          className="btn-cinematic mt-7 mb-2 shrink-0"
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          There&rsquo;s more ›
        </motion.button>
      </div>
    </div>
  );
}
