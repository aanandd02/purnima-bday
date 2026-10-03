"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface PhotoRevealSceneProps {
  onContinue: () => void;
}

export function PhotoRevealScene({ onContinue }: PhotoRevealSceneProps) {
  useEffect(() => {
    let triggered = false;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 30 && !triggered) {
        triggered = true;
        onContinue();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onContinue]);

  return (
    <motion.div
      className="scene relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ minHeight: "var(--vh-screen)", background: "var(--charcoal)" }}
    >
      {/* Full-bleed photo */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={birthdayConfig.memories[5].src}
          alt="Memory"
          fill
          className="object-cover object-center"
          style={{ filter: "brightness(0.35) saturate(0.8)" }}
          sizes="430px"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,7,10,0.6) 0%, transparent 30%, rgba(7,7,10,0.85) 100%)",
          }}
        />
      </motion.div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-end px-6 pb-8 sm:pb-14 text-center w-full" style={{ minHeight: "var(--vh-screen)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3.5 max-w-xs"
        >
          <div className="w-8 h-[1px]" style={{ background: "var(--gold)" }} />
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 4.8vw, 23px)",
              color: "var(--cream)",
              lineHeight: 1.45,
              maxWidth: 280,
            }}
          >
            {birthdayConfig.photoReveal.line1}
          </p>
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.55)",
            }}
          >
            {birthdayConfig.photoReveal.line2}
          </p>

          <motion.button
            className="btn-cinematic mt-4"
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
          >
            Show me
          </motion.button>
        </motion.div>
      </div>

      {/* Grain & vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />
    </motion.div>
  );
}
