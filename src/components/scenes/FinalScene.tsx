"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface FinalSceneProps {
  onReplay: () => void;
}

function ShootingStar({ delay, top, duration }: { delay: number; top: string; duration: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top,
        left: "-10%",
        width: 120,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.9), transparent)",
        rotate: 20,
        transform: "translateZ(0)",
      }}
      animate={{ x: ["0%", "130vw"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: delay + 6,
        ease: "easeIn",
      }}
    />
  );
}

export function FinalScene({ onReplay }: FinalSceneProps) {
  const mainText = birthdayConfig.final.main;

  return (
    <div
      className="scene relative overflow-y-auto overflow-x-hidden hide-scrollbar"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 45%, rgba(65,12,25,0.92) 0%, #060408 100%)",
        overflow: "hidden",
      }}
    >
      {/* Twinkling star field */}
      {Array.from({ length: 45 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: (i % 3) + 1,
            height: (i % 3) + 1,
            top: `${(i * 23) % 95}%`,
            left: `${(i * 37) % 96}%`,
            background: i % 4 === 0 ? "rgba(255,215,130,0.85)" : "rgba(255,255,255,0.6)",
            transform: "translateZ(0)",
          }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.7, 1.4, 0.7] }}
          transition={{
            duration: (i % 3) + 2.5,
            repeat: Infinity,
            delay: (i * 0.2) % 4,
            ease: "easeInOut",
          }}
        />
      ))}

      <ShootingStar delay={1} top="12%" duration={1.4} />
      <ShootingStar delay={4.5} top="28%" duration={1.1} />
      <ShootingStar delay={8} top="18%" duration={1.6} />

      {/* Warm glow center without blur filter */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160,45,70,0.25) 0%, rgba(201,169,110,0.1) 40%, transparent 75%)",
          transform: "translateZ(0)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-4 px-6 py-8 text-center safe-bottom my-auto w-full max-w-sm mx-auto"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Rose with soft glowing halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative" }}
        >
          <div
            className="absolute inset-0 -m-6 pointer-events-none"
            style={{
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,100,140,0.38) 0%, rgba(255,100,140,0.1) 40%, transparent 70%)",
              transform: "translateZ(0)",
            }}
          />
          <motion.span
            animate={{ scale: [1, 1.15, 1], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 46, display: "block", lineHeight: 1 }}
          >
            🌹
          </motion.span>
        </motion.div>

        {/* Milestone Dates badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="flex flex-col items-center gap-1.5 px-4 py-2.5 rounded-2xl border border-gold/20 bg-gold/5 backdrop-blur-md"
        >
          <p style={{
            fontFamily: "var(--sans)",
            fontSize: "8px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.5)",
            marginBottom: 2,
          }}>Our Story</p>
          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <span style={{ fontFamily: "var(--sans)", fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(140,180,220,0.75)" }}>
              📸 6 Jun
            </span>
            <div className="w-1.5 h-px" style={{ background: "rgba(201,169,110,0.3)" }} />
            <span style={{ fontFamily: "var(--sans)", fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(140,180,220,0.75)" }}>
              💬 8 Jun
            </span>
            <div className="w-1.5 h-px" style={{ background: "rgba(201,169,110,0.3)" }} />
            <span style={{ fontFamily: "var(--sans)", fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,170,80,0.85)" }}>
              🙏 9 Jun
            </span>
            <div className="w-1.5 h-px" style={{ background: "rgba(201,169,110,0.3)" }} />
            <span style={{ fontFamily: "var(--sans)", fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)" }}>
              🌸 9 Aug
            </span>
            <div className="w-1.5 h-px" style={{ background: "rgba(201,169,110,0.3)" }} />
            <span style={{ fontFamily: "var(--sans)", fontSize: "8.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)" }}>
              🌹 9 Oct
            </span>
            <div className="w-1.5 h-px" style={{ background: "rgba(201,169,110,0.3)" }} />
            <span style={{ fontFamily: "var(--sans)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-light)", fontWeight: 600 }}>
              ✨ 18 Oct
            </span>
          </div>
        </motion.div>

        {/* Special Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            fontFamily: "var(--sans)",
            fontSize: "10px",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "var(--gold)",
            opacity: 0.85,
            marginTop: 4,
          }}
        >
          {birthdayConfig.final.eyebrow}
        </motion.p>

        {/* Main birthday celebration headline */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(25px, 7vw, 40px)",
            fontWeight: 400,
            color: "var(--gold-light)",
            lineHeight: 1.25,
            maxWidth: 320,
            textShadow: "0 0 35px rgba(212,175,55,0.45)",
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {mainText}
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 my-0.5"
        >
          <div className="w-8 h-px" style={{ background: "var(--gold)", opacity: 0.5 }} />
          <span style={{ fontSize: 12 }}>💖</span>
          <div className="w-8 h-px" style={{ background: "var(--gold)", opacity: 0.5 }} />
        </motion.div>

        {/* Line 1 - Deep heartfelt praise */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 3.8vw, 17px)",
            color: "rgba(253,248,240,0.88)",
            lineHeight: 1.65,
            maxWidth: 295,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {birthdayConfig.final.line1}
        </motion.p>

        {/* Line 2 - Calm in chaos */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(13px, 3.5vw, 16px)",
            color: "rgba(253,248,240,0.7)",
            lineHeight: 1.65,
            maxWidth: 285,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {birthdayConfig.final.line2}
        </motion.p>

        {/* Line 3 - First birthday together */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(13px, 3.4vw, 15px)",
            color: "var(--gold)",
            opacity: 0.95,
            lineHeight: 1.6,
            maxWidth: 275,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
        >
          {birthdayConfig.final.line3}
        </motion.p>

        {/* Heartbeat audio visualizer & romantic promise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-2.5 mt-2"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <motion.div className="flex items-center gap-[3px]" style={{ height: 22 }}>
            {[4, 9, 5, 22, 9, 5, 16, 5, 9, 5, 22, 9, 4].map((h, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: 2.5,
                  background:
                    i === 3 || i === 10
                      ? "rgba(255,120,160,0.85)"
                      : "rgba(212,175,55,0.5)",
                  height: h,
                }}
                animate={{ scaleY: [1, 1.35, 1] }}
                transition={{
                  duration: 0.85,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(13.5px, 3.6vw, 16px)",
              color: "rgba(255,180,205,0.85)",
              maxWidth: 260,
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            {birthdayConfig.final.heartbeat}
          </p>
        </motion.div>

        {/* Replay button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={onReplay}
          className="btn-cinematic mt-5 shadow-2xl"
          whileTap={{ scale: 0.95 }}
        >
          {birthdayConfig.final.replay}
        </motion.button>
      </div>
    </div>
  );
}
