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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full relative flex flex-col justify-start md:justify-center items-center overflow-y-auto hide-scrollbar"
      style={{
        background: "var(--charcoal)",
        minHeight: "var(--vh-screen)",
      }}
    >
      {/* Warm rose ambient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 340,
          height: 200,
          background: "radial-gradient(ellipse, rgba(160,40,80,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="flex flex-col items-center px-4 py-8 my-auto w-full max-w-sm relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-6"
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
                transition={{ delay: 0.06 * i + 0.2, duration: 0.5 }}
                layout
              >
                <motion.button
                  className="w-full text-left rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    background: isOpen
                      ? "linear-gradient(145deg, rgba(50,22,38,0.94) 0%, rgba(28,12,24,0.97) 100%)"
                      : wasOpened
                      ? "linear-gradient(145deg, rgba(32,18,28,0.75) 0%, rgba(18,10,17,0.82) 100%)"
                      : "linear-gradient(145deg, rgba(26,17,26,0.7) 0%, rgba(16,10,17,0.8) 100%)",
                    border: `1px solid ${
                      isOpen
                        ? "rgba(212,175,55,0.55)"
                        : wasOpened
                        ? "rgba(212,175,55,0.28)"
                        : "rgba(212,175,55,0.15)"
                    }`,
                    boxShadow: isOpen
                      ? "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.12)"
                      : "0 4px 14px rgba(0,0,0,0.35)",
                    padding: "13px 16px",
                    opacity:
                      activeIndex !== null && activeIndex !== i ? 0.55 : 1,
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => handleTap(i)}
                  whileTap={{ scale: 0.985 }}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {/* Icon */}
                      <motion.span
                        animate={isOpen ? { scale: [1, 1.35, 1], rotate: [0, -10, 10, 0] } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ fontSize: 18, display: "block", flexShrink: 0 }}
                      >
                        {icon}
                      </motion.span>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontSize: "clamp(15px, 4vw, 18px)",
                          fontWeight: 300,
                          color: isOpen ? "var(--gold-light)" : "var(--cream)",
                          transition: "color 0.3s",
                        }}
                      >
                        {reason.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Read dot */}
                      {wasOpened && !isOpen && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "rgba(212,175,55,0.5)" }}
                        />
                      )}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          color: isOpen
                            ? "var(--gold)"
                            : "rgba(245,240,232,0.35)",
                          fontSize: 18,
                          lineHeight: 1,
                          flexShrink: 0,
                          marginLeft: 6,
                        }}
                      >
                        +
                      </motion.span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                        style={{
                          fontFamily: "var(--serif)",
                          fontStyle: "italic",
                          fontSize: "clamp(13px, 3.4vw, 15px)",
                          color: "rgba(253,245,230,0.85)",
                          lineHeight: 1.6,
                          marginTop: 10,
                          paddingTop: 8,
                          borderTop: "1px solid rgba(212,175,55,0.12)",
                        }}
                      >
                        {reason.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
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
          style={{
            background:
              "linear-gradient(135deg, rgba(28, 18, 29, 0.88) 0%, rgba(17, 11, 18, 0.94) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.45)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.18)",
            color: "var(--gold-light)",
          }}
        >
          {"There's more ›"}
        </motion.button>
      </div>
    </motion.div>
  );
}
