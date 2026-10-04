"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface FinalSceneProps {
  onReplay: () => void;
}

// Typewriter hook
function useTypewriter(text: string, speed = 45, delay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

// Shooting star
function ShootingStar({ delay, top, duration }: { delay: number; top: string; duration: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top,
        left: "-10%",
        width: 120,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.9), transparent)",
        rotate: 20,
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
  const [phase, setPhase] = useState(0);
  const [showReplay, setShowReplay] = useState(false);

  const mainText = birthdayConfig.final.main;
  const { displayed: typedMain, done: mainDone } = useTypewriter(mainText, 55, 600);

  // Stagger phases
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2200);
    const t2 = setTimeout(() => setPhase(2), 3800);
    const t3 = setTimeout(() => setPhase(3), 5400);
    const t4 = setTimeout(() => setShowReplay(true), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="scene"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 60%, #0e0a14 0%, #060508 100%)",
        overflow: "hidden",
      }}
    >
      {/* Twinkling star field */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: (i % 3) + 1,
            height: (i % 3) + 1,
            top: `${(i * 23) % 95}%`,
            left: `${(i * 37) % 96}%`,
            background: i % 5 === 0 ? "rgba(255,210,150,0.9)" : "rgba(255,255,255,0.7)",
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

      {/* Shooting stars */}
      <ShootingStar delay={1} top="12%" duration={1.4} />
      <ShootingStar delay={4.5} top="28%" duration={1.1} />
      <ShootingStar delay={8} top="18%" duration={1.6} />

      {/* Warm glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,60,100,0.1) 0%, rgba(201,169,110,0.06) 45%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center gap-5 px-8 text-center safe-bottom"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Rose */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            animate={{ scale: [1, 1.18, 1], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 42, display: "block", lineHeight: 1 }}
          >
            🌹
          </motion.span>
        </motion.div>

        {/* Typewriter main message */}
        <div style={{ minHeight: 60 }}>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(26px, 7.5vw, 42px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.3,
              maxWidth: 300,
            }}
          >
            {typedMain}
            {!mainDone && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                style={{ color: "var(--gold)" }}
              >
                |
              </motion.span>
            )}
          </h2>
        </div>

        {/* Gold divider */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              className="w-10 h-[1px]"
              style={{ background: "var(--gold)", transformOrigin: "center" }}
            />
          )}
        </AnimatePresence>

        {/* Line 2 */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(14px, 3.8vw, 18px)",
                color: "rgba(245,240,232,0.6)",
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              {birthdayConfig.final.line2}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Line 3 */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(13px, 3.5vw, 16px)",
                color: "rgba(245,240,232,0.38)",
                maxWidth: 270,
                lineHeight: 1.7,
              }}
            >
              {birthdayConfig.final.line3}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Promise */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-2"
            >
              {/* Heartbeat bar */}
              <motion.div
                className="flex items-center gap-[2px]"
                style={{ height: 24 }}
              >
                {[4, 8, 4, 20, 8, 4, 14, 4, 8, 4, 20, 8, 4].map((h, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: 2,
                      background: i === 3 || i === 10 ? "rgba(220,80,120,0.8)" : "rgba(212,175,55,0.45)",
                      height: h,
                    }}
                    animate={{ scaleY: [1, 1.3, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.06,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>

              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(13px, 3.4vw, 16px)",
                  color: "rgba(220,130,160,0.65)",
                  maxWidth: 240,
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                I am here. Today, tomorrow, always.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay */}
        <AnimatePresence>
          {showReplay && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              onClick={onReplay}
              className="mt-2"
              style={{
                background: "none",
                border: "none",
                color: "rgba(201,169,110,0.35)",
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
                ((e.target as HTMLButtonElement).style.color = "rgba(201,169,110,0.35)")
              }
            >
              {birthdayConfig.final.replay}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
