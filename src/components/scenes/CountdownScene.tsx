"use client";
import { motion, type Variants } from "framer-motion";
import { storyConfig } from "@/lib/storyConfig";
import { haptic } from "@/lib/utils";

interface CountdownSceneProps {
  onContinue: () => void;
}

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASE,
    },
  },
};

export function CountdownScene({ onContinue }: CountdownSceneProps) {
  const milestones = storyConfig.ourStory.milestones;

  return (
    <div
      className="scene overflow-y-auto overflow-x-hidden hide-scrollbar relative pb-10"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 0%, rgba(90,18,32,0.38) 0%, rgba(90,18,32,0.12) 40%, #09090C 65%)",
      }}
    >
      {/* Optimized Ambient glow top - pre-computed radial gradient without blur filter */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 360,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,45,62,0.3) 0%, rgba(124,45,62,0.1) 40%, transparent 70%)",
          transform: "translateZ(0)",
        }}
      />
      {/* Optimized Ambient glow bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 320,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0.05) 45%, transparent 70%)",
          transform: "translateZ(0)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-6 safe-top safe-bottom w-full max-w-sm mx-auto"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold-dim)",
              marginBottom: 8,
            }}
          >
            {storyConfig.ourStory.intro}
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
            {storyConfig.ourStory.heading}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="w-full max-w-[320px] relative flex flex-col">
          {milestones.map((milestone, i) => {
            const isLast = i === milestones.length - 1;
            const isMilestone2 = i === 2;
            const hasGlow = isLast || isMilestone2;

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex gap-4 items-start"
                style={{
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
              >
                {/* Left column: icon + connector */}
                <div className="flex flex-col items-center flex-shrink-0" style={{ width: 52 }}>
                  <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                    {/* GPU accelerated glow sibling (replaces animated boxShadow) */}
                    {hasGlow && (
                      <motion.div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: isLast
                            ? "radial-gradient(circle, rgba(201,169,110,0.6) 0%, transparent 70%)"
                            : "radial-gradient(circle, rgba(255,170,50,0.5) 0%, transparent 70%)",
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                        }}
                        animate={{
                          opacity: [0.4, 0.85, 0.4],
                          scale: [1, 1.08, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}

                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isLast
                          ? "radial-gradient(circle, rgba(180,130,50,0.45) 0%, rgba(30,18,8,0.95) 100%)"
                          : isMilestone2
                          ? "radial-gradient(circle, rgba(200,120,30,0.4) 0%, rgba(18,10,5,0.96) 100%)"
                          : i === 0 || i === 1
                          ? "radial-gradient(circle, rgba(40,80,120,0.45) 0%, rgba(8,14,22,0.95) 100%)"
                          : "radial-gradient(circle, rgba(100,20,38,0.5) 0%, rgba(20,8,14,0.95) 100%)",
                        border: isLast
                          ? "1px solid rgba(201,169,110,0.8)"
                          : isMilestone2
                          ? "1px solid rgba(255,170,50,0.65)"
                          : i === 0 || i === 1
                          ? "1px solid rgba(100,160,220,0.5)"
                          : "1px solid rgba(201,169,110,0.45)",
                        boxShadow: isLast
                          ? "0 0 24px rgba(201,169,110,0.25)"
                          : isMilestone2
                          ? "0 0 18px rgba(255,170,50,0.2)"
                          : i === 0
                          ? "0 0 14px rgba(100,180,255,0.12)"
                          : "0 0 14px rgba(201,169,110,0.1)",
                        transform: "translateZ(0)",
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{milestone.icon}</span>
                    </div>
                  </div>

                  {/* Connector line */}
                  {i < milestones.length - 1 && (
                    <div
                      style={{
                        width: 1,
                        height: 28,
                        background: "linear-gradient(to bottom, rgba(201,169,110,0.4), rgba(201,169,110,0.12))",
                        marginTop: 3,
                        marginBottom: 3,
                        transform: "translateZ(0)",
                      }}
                    />
                  )}
                </div>

                {/* Right column: text */}
                <div
                  className="pt-1 pb-10 text-left"
                  style={{
                    paddingBottom: i < milestones.length - 1 ? 0 : 0,
                    willChange: "transform, opacity",
                    transform: "translateZ(0)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--sans)",
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: isLast ? "var(--gold)" : "rgba(201,169,110,0.65)",
                      marginBottom: 3,
                    }}
                  >
                    {milestone.date}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(14px, 3.8vw, 18px)",
                      fontWeight: isLast ? 500 : 400,
                      color: isLast ? "var(--gold-light)" : "var(--cream)",
                      marginBottom: 3,
                      lineHeight: 1.2,
                    }}
                  >
                    {milestone.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(11px, 2.9vw, 13px)",
                      color: "rgba(248,243,236,0.42)",
                      lineHeight: 1.55,
                      maxWidth: 210,
                      marginBottom: i < milestones.length - 1 ? 8 : 0,
                    }}
                  >
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <motion.button
            className="btn-cinematic"
            onClick={() => {
              haptic([10, 20, 10]);
              onContinue();
            }}
            whileTap={{ scale: 0.96 }}
          >
            {storyConfig.ourStory.ctaLabel} ›
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
