"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { storyConfig } from "@/lib/storyConfig";
import { haptic } from "@/lib/utils";

interface CountdownSceneProps {
  onContinue: () => void;
}

export function CountdownScene({ onContinue }: CountdownSceneProps) {
  const [phase, setPhase] = useState(0);
  const milestones = storyConfig.ourStory.milestones;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 700);
    const t3 = setTimeout(() => setPhase(3), 1300);
    const t4 = setTimeout(() => setPhase(4), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useEffect(() => {
    let triggered = false;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20 && !triggered && phase >= 3) {
        triggered = true;
        onContinue();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onContinue, phase]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="scene"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 0%, rgba(90,18,32,0.35) 0%, #09090C 62%)",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: 340, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,45,62,0.2) 0%, transparent 70%)",
        filter: "blur(55px)",
      }} />
      {/* Ambient glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: 300, height: 200, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)",
        filter: "blur(50px)",
      }} />

      <div
        className="relative z-10 flex flex-col items-center justify-center px-6 safe-top safe-bottom"
        style={{ minHeight: "var(--vh-screen)", gap: 0 }}
      >
        {/* Heading */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-8"
            >
              <p style={{
                fontFamily: "var(--sans)",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--gold-dim)",
                marginBottom: 8,
              }}>
                {storyConfig.ourStory.intro}
              </p>
              <h2 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(24px, 6.5vw, 36px)",
                fontWeight: 300,
                color: "var(--cream)",
                lineHeight: 1.2,
              }}>
                {storyConfig.ourStory.heading}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline */}
        <div className="w-full max-w-[320px] relative flex flex-col">
          {milestones.map((milestone, i) => (
            <AnimatePresence key={i}>
              {phase >= i + 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-4 items-start"
                  style={{ marginBottom: i < milestones.length - 1 ? 0 : 0 }}
                >
                  {/* Left column: icon + connector */}
                  <div className="flex flex-col items-center flex-shrink-0" style={{ width: 52 }}>
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: i === 2
                          ? "radial-gradient(circle, rgba(180,130,50,0.45) 0%, rgba(30,18,8,0.95) 100%)"
                          : "radial-gradient(circle, rgba(100,20,38,0.5) 0%, rgba(20,8,14,0.95) 100%)",
                        border: i === 2
                          ? "1px solid rgba(201,169,110,0.8)"
                          : "1px solid rgba(201,169,110,0.45)",
                        boxShadow: i === 2
                          ? "0 0 28px rgba(201,169,110,0.3)"
                          : "0 0 16px rgba(201,169,110,0.12)",
                      }}
                      animate={i === 2 ? {
                        boxShadow: [
                          "0 0 28px rgba(201,169,110,0.3)",
                          "0 0 50px rgba(201,169,110,0.55)",
                          "0 0 28px rgba(201,169,110,0.3)",
                        ]
                      } : {}}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <span style={{ fontSize: 20 }}>{milestone.icon}</span>
                    </motion.div>

                    {/* Connector line */}
                    {i < milestones.length - 1 && (
                      <motion.div
                        style={{
                          width: 1,
                          height: 52,
                          background: "linear-gradient(to bottom, rgba(201,169,110,0.4), rgba(201,169,110,0.12))",
                          marginTop: 4,
                          marginBottom: 4,
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </div>

                  {/* Right column: text */}
                  <div className="pt-1 pb-10 text-left" style={{ paddingBottom: i < milestones.length - 1 ? 0 : 0 }}>
                    <p style={{
                      fontFamily: "var(--sans)",
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: i === 2 ? "var(--gold)" : "rgba(201,169,110,0.65)",
                      marginBottom: 3,
                    }}>
                      {milestone.date}
                    </p>
                    <h3 style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(16px, 4.5vw, 20px)",
                      fontWeight: i === 2 ? 500 : 400,
                      color: i === 2 ? "var(--gold-light)" : "var(--cream)",
                      marginBottom: 4,
                      lineHeight: 1.2,
                    }}>
                      {milestone.label}
                    </h3>
                    <p style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(12px, 3.2vw, 14px)",
                      color: "rgba(248,243,236,0.42)",
                      lineHeight: 1.6,
                      maxWidth: 220,
                      marginBottom: i < milestones.length - 1 ? 12 : 0,
                    }}>
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* CTA */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="btn-cinematic mt-8"
              onClick={() => { haptic([10, 20, 10]); onContinue(); }}
              whileTap={{ scale: 0.96 }}
            >
              {storyConfig.ourStory.ctaLabel} ›
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
