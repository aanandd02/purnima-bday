"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { haptic } from "@/lib/utils";

interface EnvelopeSceneProps {
  onContinue: () => void;
}

type LetterPhase = "envelope" | "opening" | "reading";

export function EnvelopeScene({ onContinue }: EnvelopeSceneProps) {
  const [phase, setPhase] = useState<LetterPhase>("envelope");

  const handleEnvelopeTap = () => {
    if (phase !== "envelope") return;
    haptic([15, 30, 15]);
    setPhase("opening");
    setTimeout(() => setPhase("reading"), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col items-center justify-center relative overflow-y-auto hide-scrollbar"
      style={{
        minHeight: "var(--vh-screen)",
        background: "var(--charcoal)",
      }}
    >
      <AnimatePresence mode="wait">
        {/* PRE-LETTER PROMPT */}
        {phase === "envelope" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-8 w-full px-6 py-10 my-auto"
          >
            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 5vw, 22px)",
                color: "rgba(245,240,232,0.75)",
                textAlign: "center",
                maxWidth: 290,
                lineHeight: 1.5,
              }}
            >
              One message was saved especially for today.
            </p>

            {/* Envelope SVG */}
            <motion.button
              onClick={handleEnvelopeTap}
              className="relative flex items-center justify-center cursor-pointer my-2"
              whileTap={{ scale: 0.96 }}
              aria-label="Open letter"
              style={{ background: "none", border: "none" }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 -m-6 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <svg
                viewBox="0 0 280 190"
                width="260"
                height="175"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Envelope body */}
                <rect x="4" y="50" width="272" height="136" rx="8" fill="#1a1a1f" stroke="rgba(201,169,110,0.3)" strokeWidth="1"/>
                {/* Bottom flap fold */}
                <path d="M 4 186 L 140 108 L 276 186" fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8"/>
                {/* Top sealed flap */}
                <path
                  d="M 4 50 L 140 130 L 276 50 Z"
                  fill="#141418"
                  stroke="rgba(201,169,110,0.3)"
                  strokeWidth="1"
                />
                {/* Wax seal */}
                <circle cx="140" cy="112" r="14" fill="#1a1a1f" stroke="rgba(201,169,110,0.5)" strokeWidth="1.5"/>
                <text x="140" y="117" textAnchor="middle" fill="rgba(201,169,110,0.7)" fontSize="11" fontFamily="Georgia">P</text>
              </svg>

              {/* Hint text */}
              <motion.p
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 left-0 right-0 text-center text-[11px] tracking-widest uppercase font-medium"
                style={{ color: "var(--gold)", fontFamily: "var(--sans)" }}
              >
                tap to open
              </motion.p>
            </motion.button>
          </motion.div>
        )}

        {/* OPENING ANIMATION */}
        {phase === "opening" && (
          <motion.div
            key="opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 px-6 py-10 my-auto"
          >
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 0.6, repeat: 3 }}
            >
              <svg
                viewBox="0 0 280 190"
                width="260"
                height="175"
                aria-hidden="true"
              >
                <rect x="4" y="50" width="272" height="136" rx="8" fill="#1a1a1f" stroke="rgba(201,169,110,0.3)" strokeWidth="1"/>
                <path d="M 4 186 L 140 108 L 276 186" fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8"/>
                <motion.path
                  d="M 4 50 L 140 130 L 276 50 Z"
                  fill="#141418"
                  stroke="rgba(201,169,110,0.4)"
                  strokeWidth="1"
                  animate={{ rotateX: [0, -45] }}
                  style={{ transformOrigin: "140px 50px" }}
                />
              </svg>
            </motion.div>
            <p className="text-cream/50 text-xs tracking-widest font-light" style={{ fontFamily: "var(--sans)" }}>
              Opening…
            </p>
          </motion.div>
        )}

        {/* LETTER READING */}
        {phase === "reading" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm px-4 py-6 sm:py-8 my-auto flex flex-col items-center"
          >
            {/* Paper Card */}
            <div className="letter-card w-full p-5 sm:p-7 flex flex-col gap-4 relative overflow-hidden">
              {/* Corner flourishes */}
              <div className="absolute top-3 left-3 text-[9px] text-gold/30">✦</div>
              <div className="absolute top-3 right-3 text-[9px] text-gold/30">✦</div>
              <div className="absolute bottom-3 left-3 text-[9px] text-gold/30">✦</div>
              <div className="absolute bottom-3 right-3 text-[9px] text-gold/30">✦</div>

              {/* Greeting */}
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 4.8vw, 22px)",
                  color: "var(--gold-light)",
                  letterSpacing: "0.02em",
                }}
              >
                {birthdayConfig.letter.greeting}
              </p>

              {/* Body */}
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(14px, 3.7vw, 16px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: "rgba(253, 251, 247, 0.9)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {birthdayConfig.letter.body}
              </p>

              {/* Closing */}
              <div className="flex flex-col gap-1 mt-1 pt-3 border-t border-[rgba(212,175,55,0.2)]">
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(15px, 4vw, 17px)",
                    color: "var(--gold)",
                    fontStyle: "italic",
                  }}
                >
                  {birthdayConfig.letter.closing}
                </p>
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(13px, 3.5vw, 15px)",
                    color: "rgba(253,245,230,0.6)",
                    fontStyle: "italic",
                  }}
                >
                  {birthdayConfig.letter.signature}
                </p>
              </div>
            </div>

            {/* Continue */}
            <div className="flex justify-center mt-5 mb-1 w-full">
              <motion.button
                className="btn-cinematic"
                whileTap={{ scale: 0.96 }}
                onClick={onContinue}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  background:
                    "linear-gradient(135deg, rgba(28, 18, 29, 0.88) 0%, rgba(17, 11, 18, 0.94) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.45)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.18)",
                  color: "var(--gold-light)",
                }}
              >
                Continue ›
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
