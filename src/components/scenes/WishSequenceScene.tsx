"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface WishSequenceSceneProps {
  onContinue: () => void;
}

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

  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => {
      advance();
    }, 2800);
    return () => clearTimeout(t);
  }, [index, done, wishes.length]);

  useEffect(() => {
    let lastWheel = 0;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && Date.now() - lastWheel > 500) {
        lastWheel = Date.now();
        if (done) {
          onContinue();
        } else {
          advance();
        }
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [done, index, wishes.length, onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="scene cursor-pointer select-none"
      onClick={() => {
        if (done) onContinue();
        else advance();
      }}
      style={{
        minHeight: "var(--vh-screen)",
        background: "var(--charcoal)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-10 text-center w-full max-w-sm my-auto" style={{ minHeight: "var(--vh-screen)" }}>
        {!done ? (
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(24px, 6.8vw, 36px)",
                fontWeight: 400,
                color: "#FFFFFF",
                textShadow: "0 2px 25px rgba(255,255,255,0.15), 0 0 15px rgba(212,175,55,0.3)",
                lineHeight: 1.35,
                maxWidth: 320,
              }}
            >
              {wishes[index]}
            </motion.p>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-5"
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

        {/* Wish counter dots */}
        {!done && (
          <div className="absolute bottom-8 sm:bottom-12 flex items-center gap-2 pointer-events-none">
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
        )}
      </div>
    </motion.div>
  );
}
