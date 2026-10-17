"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { storyConfig } from "@/lib/storyConfig";
import { haptic } from "@/lib/utils";
import { asset } from "@/lib/assetPath";

interface CakeSceneProps {
  onBlown: () => void;
  audioEnabled?: boolean;
}

export function CakeScene({ onBlown, audioEnabled = true }: CakeSceneProps) {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);
  const [micAsked, setMicAsked] = useState(false);
  const [listening, setListening] = useState(false);
  const [isMuted, setIsMuted] = useState(!audioEnabled);

  const burnAudioRef = useRef<HTMLAudioElement | null>(null);
  const blowAudioRef = useRef<HTMLAudioElement | null>(null);
  const candlesBlownRef = useRef(false);
  const isMutedRef = useRef(!audioEnabled);
  const micRef = useRef<MediaStream | null>(null);

  // Sync mute ref
  useEffect(() => {
    isMutedRef.current = isMuted;
    if (burnAudioRef.current) {
      if (isMuted) {
        burnAudioRef.current.pause();
      } else if (!candlesBlownRef.current) {
        burnAudioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  // Audio lifecycle: setup continuous burning loop audio & blow sound
  useEffect(() => {
    const burnAudio = new Audio(asset("/media/audio/freesound_community-candle-buzz-3-50319.mp3"));
    burnAudio.loop = true;
    burnAudio.volume = 0.55;
    burnAudio.preload = "auto";
    burnAudioRef.current = burnAudio;

    const blowAudio = new Audio(asset("/media/audio/spinopel-blow-out-the-candle-381892.mp3"));
    blowAudio.loop = false;
    blowAudio.volume = 0.85;
    blowAudio.preload = "auto";
    blowAudioRef.current = blowAudio;

    // Start playing continuous candle burning sound
    if (!isMutedRef.current) {
      const playPromise = burnAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts autoplay before user gesture, play on first touch/click
          const startOnInteraction = () => {
            if (burnAudioRef.current && !candlesBlownRef.current && !isMutedRef.current) {
              burnAudioRef.current.play().catch(() => {});
            }
            window.removeEventListener("pointerdown", startOnInteraction);
            window.removeEventListener("touchstart", startOnInteraction);
            window.removeEventListener("click", startOnInteraction);
          };
          window.addEventListener("pointerdown", startOnInteraction, { once: true });
          window.addEventListener("touchstart", startOnInteraction, { once: true });
          window.addEventListener("click", startOnInteraction, { once: true });
        });
      }
    }

    // Cleanup when leaving scene (unmount)
    return () => {
      if (burnAudioRef.current) {
        burnAudioRef.current.pause();
        burnAudioRef.current.currentTime = 0;
        burnAudioRef.current = null;
      }
      if (blowAudioRef.current) {
        blowAudioRef.current.pause();
        blowAudioRef.current.currentTime = 0;
        blowAudioRef.current = null;
      }
      if (micRef.current) {
        micRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

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

  // Blow out the candles with sound and animation
  const blowCandles = useCallback(() => {
    if (candlesBlownRef.current) return;
    candlesBlownRef.current = true;
    setCandlesBlown(true);
    setIsBlowing(true);

    haptic([35, 50, 25, 40, 20]);

    // 1. Stop burning sound smoothly
    if (burnAudioRef.current) {
      const burn = burnAudioRef.current;
      let vol = burn.volume;
      const fadeInterval = setInterval(() => {
        vol = Math.max(0, vol - 0.15);
        burn.volume = vol;
        if (vol <= 0.05) {
          clearInterval(fadeInterval);
          burn.pause();
          burn.currentTime = 0;
        }
      }, 20);
    }

    // 2. Play blow sound once ("ek hi bar baje")
    if (blowAudioRef.current && !isMutedRef.current) {
      blowAudioRef.current.currentTime = 0;
      blowAudioRef.current.play().catch(() => {});
    }

    // Gust wind finishes after 700ms
    setTimeout(() => {
      setIsBlowing(false);
    }, 700);

    // Stop microphone if active
    if (micRef.current) {
      micRef.current.getTracks().forEach((t) => t.stop());
      micRef.current = null;
      setListening(false);
    }

    // Advance to next celebration scene after full animation moment
    setTimeout(onBlown, 2800);
  }, [onBlown]);

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
        if (checks < 400 && !candlesBlownRef.current) {
          requestAnimationFrame(check);
        } else {
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

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  return (
    <div
      className="scene overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 40%, #151218 0%, #08080b 100%)",
        overflow: "hidden",
      }}
    >
      {/* Sound Toggle Button */}
      <button
        onClick={toggleSound}
        aria-label={isMuted ? "Unmute candle sound" : "Mute candle sound"}
        className="absolute top-4 right-4 z-30 p-2.5 rounded-full glass-card border border-white/10 text-cream/70 hover:text-cream transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ top: "max(16px, env(safe-area-inset-top, 16px))" }}
      >
        <AnimatePresence mode="wait">
          {!isMuted ? (
            <motion.svg
              key="sound-on"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sound-off"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>

      {/* Warm Ambient Glow from candles */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          scale: candlesBlown ? 0.25 : [1, 1.12, 0.98, 1.08, 1],
          opacity: candlesBlown ? 0 : [0.35, 0.52, 0.38, 0.55, 0.35],
        }}
        transition={{
          duration: candlesBlown ? 0.9 : 2.4,
          repeat: candlesBlown ? 0 : Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: 460,
          height: 460,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,180,60,0.38) 0%, rgba(212,140,40,0.18) 35%, rgba(212,140,40,0.04) 55%, transparent 70%)",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-between px-6 py-8 text-center safe-top safe-bottom my-auto"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-1.5 pt-4"
        >
          <p
            className="text-gold/80 text-[10px] tracking-[0.35em] uppercase font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Happy Birthday, {storyConfig.name}
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(26px, 7.5vw, 38px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            Blow Out Your Candles
          </h2>
        </motion.div>

        {/* 3D Cake Visual Container with Parallax Tilt */}
        <motion.div
          className="relative my-4 flex items-center justify-center cursor-pointer select-none"
          style={{
            rotateX,
            rotateY,
            transformPerspective: 900,
          }}
          onClick={blowCandles}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="relative w-[270px] h-[270px] sm:w-[310px] sm:h-[310px] rounded-3xl overflow-hidden"
            style={{
              boxShadow: candlesBlown
                ? "0 25px 60px -15px rgba(0,0,0,0.95), 0 0 15px rgba(212,175,55,0.05), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px rgba(212,175,55,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
              border: "1px solid rgba(212,175,55,0.25)",
              background: "#0d0c10",
              transition: "box-shadow 0.9s ease",
            }}
          >
            {/* Lit Cake Image */}
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: candlesBlown ? 0 : 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
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
                  opacity: isBlowing
                    ? [0.6, 0.9, 0.2, 0]
                    : [0.22, 0.48, 0.28, 0.52, 0.3],
                }}
                transition={{
                  duration: isBlowing ? 0.35 : 1.8,
                  repeat: isBlowing ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 50% 28%, rgba(255,200,90,0.4) 0%, rgba(212,140,40,0.12) 40%, transparent 70%)",
                }}
              />
            </motion.div>

            {/* Blown Cake Image (with rising delicate smoke) */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: candlesBlown ? 1 : 0 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              <Image
                src={asset("/media/cake/cake-blown.jpg")}
                alt="Realistic 3D Birthday Cake candles blown out"
                fill
                className="object-cover object-center scale-[1.03]"
                sizes="(max-width: 430px) 310px, 340px"
              />
            </motion.div>

            {/* Breath Gust / Wind Wave Animation Effect */}
            <AnimatePresence>
              {isBlowing && (
                <motion.div
                  key="blow-gust"
                  className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.75, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                >
                  <motion.div
                    className="w-full h-24 rounded-full"
                    initial={{ scaleX: 0.2, scaleY: 0.5, x: -60, opacity: 0 }}
                    animate={{ scaleX: 1.3, scaleY: 1.1, x: 20, opacity: [0.3, 0.8, 0] }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(255,245,220,0.55) 0%, rgba(255,220,150,0.2) 45%, transparent 75%)",
                      filter: "blur(6px)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

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
                  x: [i % 2 === 0 ? -3 : 3, i % 2 === 0 ? 3 : -3, i % 2 === 0 ? -3 : 3],
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

          {/* Wisps of smoke & dying ember particles rising after blown */}
          {candlesBlown && (
            <div className="absolute top-[16%] left-1/2 -translate-x-1/2 pointer-events-none w-44 h-44 flex justify-center">
              {/* Glowing dying ember spark */}
              <motion.div
                className="absolute top-[28%] rounded-full"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0.2 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                style={{
                  width: 6,
                  height: 6,
                  background: "#FF5500",
                  boxShadow: "0 0 8px #FF7700, 0 0 14px #FF3300",
                }}
              />

              {/* Delicate realistic curling smoke wisps */}
              {[
                { xInit: -24, xShift: -14, delay: 0.05, dur: 1.9, size: 16 },
                { xInit: -10, xShift: 8, delay: 0.15, dur: 2.1, size: 20 },
                { xInit: 0, xShift: -10, delay: 0.08, dur: 2.0, size: 18 },
                { xInit: 12, xShift: 16, delay: 0.2, dur: 2.2, size: 22 },
                { xInit: 24, xShift: -8, delay: 0.12, dur: 1.95, size: 16 },
                { xInit: -4, xShift: 12, delay: 0.32, dur: 2.3, size: 24 },
                { xInit: 8, xShift: -16, delay: 0.45, dur: 2.1, size: 20 },
              ].map((s, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full"
                  initial={{
                    opacity: 0.8,
                    y: 10,
                    scale: 0.35,
                    x: s.xInit,
                  }}
                  animate={{
                    opacity: [0.8, 0.45, 0],
                    y: -85 - idx * 12,
                    scale: [0.35, 1.4, 2.8],
                    x: [s.xInit, s.xInit + s.xShift, s.xInit + s.xShift * 1.5],
                  }}
                  transition={{
                    duration: s.dur,
                    delay: s.delay,
                    ease: "easeOut",
                  }}
                  style={{
                    width: s.size,
                    height: s.size,
                    background:
                      "radial-gradient(circle, rgba(230,230,235,0.48) 0%, rgba(200,200,210,0.18) 50%, transparent 75%)",
                    filter: "blur(4px)",
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
                Make a wish from your heart.
              </p>

              <motion.button
                className="btn-cinematic flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleMicOrTap();
                  blowCandles();
                }}
              >
                <span>{listening ? "Blow now… 🎤" : "Tap to blow the candles ✨"}</span>
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
    </div>
  );
}

