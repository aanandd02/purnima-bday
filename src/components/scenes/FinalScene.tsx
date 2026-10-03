"use client";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface FinalSceneProps {
  onReplay: () => void;
}

export function FinalScene({ onReplay }: FinalSceneProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="scene"
      style={{
        minHeight: "var(--vh-screen)",
        background: "var(--charcoal)",
      }}
    >
      {/* Warm rose center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 340,
          height: 340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,130,160,0.09) 0%, rgba(201,169,110,0.05) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center gap-5 px-8 text-center safe-bottom"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Pulsing rose */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 36, display: "block", lineHeight: 1 }}
          >
            🌹
          </motion.span>
        </motion.div>

        {/* Main message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(26px, 7.5vw, 42px)",
            fontWeight: 300,
            color: "var(--cream)",
            lineHeight: 1.3,
            maxWidth: 300,
          }}
        >
          {birthdayConfig.final.main}
        </motion.h2>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="w-10 h-[1px]"
          style={{ background: "var(--gold)", transformOrigin: "center" }}
        />

        {/* Sub lines */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 3.8vw, 18px)",
            color: "rgba(245,240,232,0.55)",
            lineHeight: 1.7,
            maxWidth: 270,
          }}
        >
          {birthdayConfig.final.line2}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1.2 }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(13px, 3.5vw, 16px)",
            color: "rgba(245,240,232,0.35)",
            maxWidth: 270,
            lineHeight: 1.7,
          }}
        >
          {birthdayConfig.final.line3}
        </motion.p>

        {/* Promise line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1.4 }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(12px, 3.2vw, 14px)",
            color: "rgba(220,160,180,0.55)",
            maxWidth: 240,
            lineHeight: 1.6,
            marginTop: 4,
          }}
        >
          Main hoon. Aaj bhi. Hamesha.
        </motion.p>

        {/* Replay */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
          onClick={onReplay}
          className="mt-2"
          style={{
            background: "none",
            border: "none",
            color: "rgba(201,169,110,0.4)",
            fontFamily: "var(--sans)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            cursor: "pointer",
            padding: "12px 24px",
            minHeight: 44,
            transition: "color 0.3s",
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.color = "rgba(201,169,110,0.85)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.color = "rgba(201,169,110,0.4)")
          }
        >
          {birthdayConfig.final.replay}
        </motion.button>
      </div>
    </motion.div>
  );
}
