"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { haptic } from "@/lib/utils";
import { audioManager } from "@/lib/audioManager";
import { asset } from "@/lib/assetPath";

interface CakeSceneProps {
  onBlown: () => void;
  audioEnabled: boolean;
}

export function CakeScene({ onBlown, audioEnabled }: CakeSceneProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [micAsked, setMicAsked] = useState(false);
  const [listening, setListening] = useState(false);
  const micRef = useRef<MediaStream | null>(null);

  // 3D Parallax Tilt state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Device orientation tilt for mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const x = Math.min(Math.max(e.gamma / 45, -0.5), 0.5);
        const y = Math.min(Math.max((e.beta - 45) / 45, -0.5), 0.5);
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [mouseX, mouseY]);

  const blowCandles = () => {
    if (candlesBlown) return;
    haptic([25, 45, 25, 45, 25]);
    if (audioEnabled) audioManager.play("candle", { volume: 0.75 });
    setCandlesBlown(true);
    setTimeout(onBlown, 2600);
  };

  // Microphone blow detection
  const startMicDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micRef.current = stream;
      setListening(true);

      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let checks = 0;

      const check = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        if (avg > 42) {
          blowCandles();
          stream.getTracks().forEach((t) => t.stop());
          ctx.close();
          return;
        }
        checks++;
        if (checks < 400) requestAnimationFrame(check);
        else {
          stream.getTracks().forEach((t) => t.stop());
          ctx.close();
          setListening(false);
        }
      };
      requestAnimationFrame(check);
    } catch {
      setMicAsked(true); // permission denied — fallback
    }
  };

  const handleMicOrTap = () => {
    if (!micAsked && !listening && !candlesBlown) {
      setMicAsked(true);
      startMicDetection();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="scene overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 40%, #151218 0%, #08080b 100%)",
      }}
    >
      {/* Ambient Candlelight Warm Glow in background */}
      <motion.div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: candlesBlown ? [1, 0] : [1, 1.08, 0.95, 1.04, 1],
          opacity: candlesBlown ? 0 : [0.35, 0.5, 0.38, 0.48, 0.35],
        }}
        transition={{
          duration: candlesBlown ? 0.6 : 3,
          repeat: candlesBlown ? 0 : Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,170,60,0.4) 0%, rgba(212,140,40,0.15) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-5 px-4 py-4 my-auto text-center w-full max-w-sm"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Name above cake */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="flex flex-col items-center gap-1"
        >
          <p
            className="text-gold/80 text-[10px] sm:text-[11px] tracking-[0.35em] uppercase font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Happy Birthday
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(26px, 7vw, 38px)",
              fontWeight: 300,
              color: "var(--cream)",
              letterSpacing: "0.04em",
              textShadow: "0 2px 20px rgba(212,175,55,0.25)",
            }}
          >
            {birthdayConfig.name}
          </h2>
        </motion.div>

        {/* 3D Cake Visual Container */}
        <motion.div
          className="relative flex items-center justify-center cursor-pointer select-none perspective-[1000px]"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onClick={() => {
            handleMicOrTap();
            blowCandles();
          }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Cake Card with luxury depth shadow */}
          <div
            className="relative w-[270px] h-[270px] sm:w-[310px] sm:h-[310px] rounded-3xl overflow-hidden"
            style={{
              boxShadow:
                "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.1)",
              border: "1px solid rgba(212,175,55,0.25)",
              background: "#0d0c10",
            }}
          >
            {/* Lit Cake Image */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: candlesBlown ? 0 : 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Image
                src={asset("/media/cake/cake-lit.jpg")}
                alt="Realistic 3D Birthday Cake with glowing candles"
                fill
                priority
                className="object-cover object-center scale-[1.03]"
                sizes="(max-width: 430px) 310px, 340px"
              />
              {/* Candle flame dynamic flicker light overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                animate={{
                  opacity: [0.2, 0.45, 0.25, 0.5, 0.3],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 28%, rgba(255,200,90,0.35) 0%, rgba(212,140,40,0.1) 40%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Blown Cake Image (with rising delicate smoke) */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: candlesBlown ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Image
                src={asset("/media/cake/cake-blown.jpg")}
                alt="Realistic 3D Birthday Cake candles blown out"
                fill
                className="object-cover object-center scale-[1.03]"
                sizes="(max-width: 430px) 310px, 340px"
              />
            </motion.div>

            {/* Subtle Vignette & Frame Accent */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, transparent 60%, rgba(8,8,11,0.5) 100%)",
              }}
            />
          </div>

          {/* Floating magical sparkles around candles when lit */}
          {!candlesBlown &&
            [
              { top: "18%", left: "38%", delay: 0 },
              { top: "14%", left: "50%", delay: 0.5 },
              { top: "19%", left: "62%", delay: 0.9 },
              { top: "24%", left: "44%", delay: 1.3 },
              { top: "22%", left: "56%", delay: 1.7 },
            ].map((sparkle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: sparkle.top,
                  left: sparkle.left,
                  width: 3,
                  height: 3,
                  background: "#FFE699",
                  boxShadow: "0 0 8px #FFD700, 0 0 14px #FFA500",
                }}
                animate={{
                  y: [-4, -14, -4],
                  x: [(i % 2 === 0 ? -3 : 3), (i % 2 === 0 ? 3 : -3), (i % 2 === 0 ? -3 : 3)],
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.7, 1.3, 0.7],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: sparkle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* Wisps of smoke particles rising after blown */}
          {candlesBlown && (
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 pointer-events-none w-32 h-32 flex justify-center">
              {[0, 1, 2, 3, 4].map((s) => (
                <motion.div
                  key={s}
                  className="absolute rounded-full"
                  initial={{ opacity: 0.7, y: 0, scale: 0.4, x: (s - 2) * 12 }}
                  animate={{
                    opacity: 0,
                    y: -60 - s * 10,
                    scale: 2.2,
                    x: (s - 2) * 20 + (s % 2 === 0 ? 10 : -10),
                  }}
                  transition={{
                    duration: 1.6,
                    delay: s * 0.12,
                    ease: "easeOut",
                  }}
                  style={{
                    width: 14,
                    height: 14,
                    background: "radial-gradient(circle, rgba(220,220,220,0.45) 0%, transparent 70%)",
                    filter: "blur(3px)",
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Action Prompt */}
        <AnimatePresence mode="wait">
          {!candlesBlown ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(18px, 4.8vw, 23px)",
                  color: "var(--cream)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
              >
                Make a wish.
              </p>

              <motion.button
                className="btn-cinematic"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleMicOrTap();
                  blowCandles();
                }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(28, 18, 29, 0.9) 0%, rgba(17, 11, 18, 0.95) 100%)",
                  border: "1px solid rgba(212, 175, 55, 0.5)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.2)",
                  color: "var(--gold-light)",
                }}
              >
                {listening ? "Blow now… 🎤" : "Tap to blow the candles ✨"}
              </motion.button>

              {listening && (
                <p
                  className="text-cream/40 text-[11px] tracking-widest uppercase"
                  style={{ fontFamily: "var(--sans)" }}
                >
                  or blow into your mic
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="blown"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1.5 py-2"
            >
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(22px, 6vw, 30px)",
                  color: "var(--gold-light)",
                  textShadow: "0 0 20px rgba(212,175,55,0.5)",
                }}
              >
                Wish granted. ✨
              </p>
              <p
                className="text-cream/50 text-[11px] tracking-widest uppercase"
                style={{ fontFamily: "var(--sans)" }}
              >
                May all your dreams come true
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
