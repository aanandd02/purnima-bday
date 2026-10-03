"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { birthdayConfig } from "@/lib/birthdayConfig";

interface CountdownSceneProps {
  onContinue: () => void;
}

function Pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownScene({ onContinue }: CountdownSceneProps) {
  const { days, hours, minutes, seconds, isToday, isPast } = useCountdown(
    birthdayConfig.birthday
  );

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
      className="scene relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        minHeight: "var(--vh-screen)",
        background: "var(--charcoal)",
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center px-8 text-center" style={{ minHeight: "var(--vh-screen)" }}>
        {isToday || isPast ? (
          /* BIRTHDAY! */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-gold/60 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--sans)" }}>
              {birthdayConfig.countdown.subtext}
            </p>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(36px, 11vw, 56px)",
                fontWeight: 300,
                color: "var(--cream)",
                lineHeight: 1.2,
              }}
            >
              {birthdayConfig.countdown.birthdayMessage}
            </h2>
            <motion.button
              className="btn-cinematic mt-6"
              whileTap={{ scale: 0.96 }}
              onClick={onContinue}
            >
              Let's celebrate
            </motion.button>
          </motion.div>
        ) : (
          /* COUNTDOWN */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 w-full"
          >
            <p
              className="text-cream/40 text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "var(--sans)" }}
            >
              {birthdayConfig.countdown.preMessage}
            </p>

            <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
              {[
                { value: Pad(days), label: "Days" },
                { value: Pad(hours), label: "Hours" },
                { value: Pad(minutes), label: "Min" },
                { value: Pad(seconds), label: "Sec" },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <motion.span
                    className="countdown-num"
                    key={value}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {value}
                  </motion.span>
                  <span className="countdown-label">{label}</span>
                </div>
              ))}
            </div>

            <div className="w-[1px] h-12 mt-2" style={{ background: "linear-gradient(to bottom, transparent, var(--gold-dim), transparent)" }} />

            <p
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(15px, 4vw, 18px)",
                color: "var(--cream-dim)",
              }}
            >
              {birthdayConfig.countdown.subtext}
            </p>

            <motion.button
              className="btn-cinematic mt-4"
              whileTap={{ scale: 0.96 }}
              onClick={onContinue}
            >
              Don't wait — open now
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
