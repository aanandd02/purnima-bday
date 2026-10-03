"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { haptic } from "@/lib/utils";

interface ReasonsSceneProps {
  onContinue: () => void;
}

export function ReasonsScene({ onContinue }: ReasonsSceneProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleTap = (i: number) => {
    haptic(12);
    setActiveIndex(activeIndex === i ? null : i);
  };

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
      {/* Inner wrapper */}
      <div className="flex flex-col items-center px-4 py-8 my-auto w-full max-w-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-6"
        >
          <p className="text-gold/80 text-[10px] tracking-[0.35em] uppercase mb-1.5 font-medium" style={{ fontFamily: "var(--sans)" }}>
            A few things
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
            What makes you, you.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-2 w-full">
          {birthdayConfig.reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i + 0.2, duration: 0.5 }}
              layout
            >
              <motion.button
                className="w-full text-left rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background:
                    activeIndex === i
                      ? "linear-gradient(145deg, rgba(38,25,36,0.92) 0%, rgba(24,15,24,0.96) 100%)"
                      : "linear-gradient(145deg, rgba(26,17,26,0.7) 0%, rgba(16,10,17,0.8) 100%)",
                  border: `1px solid ${activeIndex === i ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.2)"}`,
                  boxShadow:
                    activeIndex === i
                      ? "0 8px 24px rgba(0,0,0,0.55), 0 0 16px rgba(212,175,55,0.12)"
                      : "0 4px 14px rgba(0,0,0,0.35)",
                  padding: "12px 16px",
                  opacity: activeIndex !== null && activeIndex !== i ? 0.5 : 1,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  transition: "all 0.3s ease",
                }}
                onClick={() => handleTap(i)}
                whileTap={{ scale: 0.98 }}
                aria-expanded={activeIndex === i}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(15px, 4vw, 18px)",
                      fontWeight: 300,
                      color: activeIndex === i ? "var(--gold-light)" : "var(--cream)",
                      transition: "color 0.3s",
                    }}
                  >
                    {reason.title}
                  </span>
                  <motion.span
                    animate={{ rotate: activeIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      color: activeIndex === i ? "var(--gold)" : "rgba(245,240,232,0.45)",
                      fontSize: 18,
                      lineHeight: 1,
                      flexShrink: 0,
                      marginLeft: 8,
                    }}
                  >
                    +
                  </motion.span>
                </div>

                <AnimatePresence>
                  {activeIndex === i && (
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
                        lineHeight: 1.55,
                        marginTop: 8,
                      }}
                    >
                      {reason.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>

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
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.18)",
            color: "var(--gold-light)",
          }}
        >
          {"There's more ›"}
        </motion.button>
      </div>
    </motion.div>
  );
}
