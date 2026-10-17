"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyConfig } from "@/lib/storyConfig";
import { haptic } from "@/lib/utils";
import { asset } from "@/lib/assetPath";

interface CelebrationSceneProps {
  onContinue: () => void;
  audioEnabled: boolean; // kept for prop compat, ignored
}

export function CelebrationScene({ onContinue }: CelebrationSceneProps) {
  const confettiStarted = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rainHearts, setRainHearts] = useState<{ id: number; left: number; delay: number; size: number; dur: number }[]>([]);

  useEffect(() => {
    const hearts = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 96,
      delay: Math.random() * 3,
      size: 14 + Math.random() * 16,
      dur: 3 + Math.random() * 3,
    }));
    setRainHearts(hearts);
  }, []);

  // Reveal video automatically after 1.8s of birthday celebration fanfare
  useEffect(() => {
    const t = setTimeout(() => {
      setShowVideo(true);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  // Auto-play video with resilient sound fallback
  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocked unmuted sound, mute and play with tap-to-unmute hint
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [showVideo]);

  const unmuteVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
    }
  };


  useEffect(() => {
    if (confettiStarted.current) return;
    confettiStarted.current = true;

    haptic([30, 60, 30, 60, 30]);

    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#C9A96E", "#F5F0E8", "#9E7D4B", "#ffffff", "#FF8FA3", "#FFD6E0"],
        ticks: 220,
        shapes: ["circle", "square"],
      });

      setTimeout(() => {
        confetti({ particleCount: 70, angle: 60, spread: 60, origin: { x: 0, y: 0.65 }, colors: ["#C9A96E", "#FF8FA3", "#F5F0E8"] });
        confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1, y: 0.65 }, colors: ["#C9A96E", "#FFD6E0", "#ffffff"] });
      }, 450);

      setTimeout(() => {
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 }, gravity: 0.65, colors: ["#D4AF37", "#fff", "#FFB6C1"] });
      }, 1300);

      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 120,
          origin: { y: 0 },
          colors: ["#FF8FA3", "#FFD6E0", "#FF6B9D"],
          gravity: 0.35,
          ticks: 300,
          scalar: 1.1,
        });
      }, 1800);
    }).catch(() => {});
  }, []);

  return (
    <div
      className="scene overflow-y-auto overflow-x-hidden hide-scrollbar relative pb-12"
      style={{
        minHeight: "var(--vh-screen)",
        background: "radial-gradient(ellipse at 50% 40%, #120a14 0%, #09090C 100%)",
      }}
    >
      {/* Falling hearts rain */}
      {rainHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none"
          style={{
            left: `${h.left}%`,
            top: -40,
            fontSize: h.size,
            willChange: "transform, opacity",
            transform: "translateZ(0)",
          }}
          animate={{ y: ["0vh", "110vh"], opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: h.dur,
            delay: h.delay,
            repeat: Infinity,
            repeatDelay: 1 + Math.random() * 3,
            ease: "linear",
          }}
        >
          {h.id % 3 === 0 ? "🌹" : h.id % 3 === 1 ? "💕" : "✨"}
        </motion.div>
      ))}

      {/* Warm burst glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,150,180,0.45) 0%, rgba(201,169,110,0.2) 50%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center justify-center gap-2.5 px-4 pt-6 pb-6 text-center w-full max-w-sm mx-auto"
        style={{ minHeight: "var(--vh-screen)" }}
      >
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md"
        >
          <span
            className="text-[10px] tracking-[0.28em] text-gold uppercase font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            ✨ {storyConfig.celebration.mainText} ✨
          </span>
        </motion.div>

        {/* Elegant Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(34px, 8.5vw, 48px)",
            fontWeight: 400,
            background: "linear-gradient(135deg, #FFF9ED 0%, #F5E6BE 40%, #D4AF37 80%, #C9A96E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.15,
            letterSpacing: "0.01em",
            textShadow: "0 0 25px rgba(212,175,55,0.25)",
          }}
        >
          {storyConfig.celebration.name} 🌹
        </motion.h1>

        {/* Unified Romantic Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="flex items-center gap-2 my-0.5"
        >
          <div className="w-10 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, var(--gold))" }} />
          <span style={{ color: "var(--gold)", fontSize: 11 }}>✨</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "#FF6B8B", fontSize: 13 }}
          >
            ♥
          </motion.span>
          <span style={{ color: "var(--gold)", fontSize: 11 }}>✨</span>
          <div className="w-10 h-[1px]" style={{ background: "linear-gradient(90deg, var(--gold), transparent)" }} />
        </motion.div>

        {/* Romantic subtext */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(12px, 3.2vw, 14px)",
            color: "rgba(255, 220, 230, 0.72)",
            maxWidth: 290,
            lineHeight: 1.5,
          }}
        >
          To the girl who brings all the light into my world. Happy Birthday, my love.
        </motion.p>

        {/* Birthday Wish Video Presentation (Sweet Romantic Cinematic Reveal) */}
        <div className="w-full max-w-xs flex flex-col items-center min-h-[340px] justify-center my-2">
          <AnimatePresence mode="wait">
            {!showVideo ? (
              <motion.div
                key="surprise-teaser"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center gap-3 py-10"
              >
                <div className="relative flex items-center justify-center">
                  {/* Glowing pulse rings */}
                  <motion.div
                    className="absolute rounded-full pointer-events-none"
                    animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 76,
                      height: 76,
                      border: "1px solid rgba(212, 175, 55, 0.5)",
                    }}
                  />
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center relative cursor-default"
                    animate={{ scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      background:
                        "radial-gradient(circle, rgba(212,175,55,0.22) 0%, rgba(255,107,139,0.14) 60%, rgba(10,8,12,0.9) 100%)",
                      border: "1.5px solid rgba(212, 175, 55, 0.55)",
                      boxShadow: "0 0 25px rgba(212,175,55,0.3), inset 0 0 15px rgba(255,107,139,0.15)",
                    }}
                  >
                    <span className="text-2xl select-none">💝</span>
                  </motion.div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p
                    className="text-gold/90 text-[10px] tracking-[0.28em] uppercase font-medium"
                    style={{ fontFamily: "var(--sans)" }}
                  >
                    A special gift for you ✨
                  </p>
                  <p className="text-cream/50 text-[11px] font-serif italic">
                    Unwrapping your birthday wish...
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="video-reveal"
                initial={{ opacity: 0, y: 28, scale: 0.84, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center gap-3 relative"
              >
                {/* Radiant Warm Backlight Halo behind the video */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.45, 0.65, 0.45],
                  }}
                  transition={{
                    scale: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    default: { duration: 1.2, ease: "easeOut" },
                  }}
                  style={{
                    width: 340,
                    height: 380,
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.32) 0%, rgba(255,107,139,0.16) 45%, transparent 75%)",
                    transform: "translateZ(0)",
                    filter: "blur(12px)",
                  }}
                />

                {/* Floating fairy sparkles around the video card */}
                {[
                  { top: "-6px", left: "10%", delay: 0.2, symbol: "✨", size: 14 },
                  { top: "30%", right: "-12px", delay: 0.4, symbol: "💖", size: 12 },
                  { bottom: "25%", left: "-10px", delay: 0.6, symbol: "✨", size: 13 },
                  { bottom: "-6px", right: "12%", delay: 0.5, symbol: "🌸", size: 12 },
                ].map((sparkle, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute pointer-events-none z-20 select-none"
                    style={{
                      top: sparkle.top,
                      left: sparkle.left,
                      right: sparkle.right,
                      bottom: sparkle.bottom,
                      fontSize: sparkle.size,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.9, 0.3, 0.9],
                      scale: [0.5, 1.2, 0.9, 1.1],
                      y: [-2, -8, -2],
                    }}
                    transition={{
                      opacity: { delay: sparkle.delay, duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                      scale: { delay: sparkle.delay, duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                      y: { delay: sparkle.delay, duration: 2.8, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    {sparkle.symbol}
                  </motion.div>
                ))}

                {/* Video Container with Elegant Frame & Shimmer Sweep */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center group"
                  style={{
                    border: "1.5px solid rgba(212, 175, 55, 0.75)",
                    boxShadow:
                      "0 18px 45px rgba(0,0,0,0.85), 0 0 35px rgba(212,175,55,0.28), inset 0 1px 0 rgba(255,255,255,0.15)",
                    background: "#050406",
                    maxHeight: "44vh",
                    aspectRatio: "9/14",
                  }}
                >
                  <video
                    ref={videoRef}
                    src={asset(storyConfig.birthdayWishVideo.src)}
                    poster={asset(storyConfig.birthdayWishVideo.poster)}
                    controls
                    autoPlay
                    playsInline
                    preload="auto"
                    controlsList="nodownload"
                    className="w-full h-full object-contain"
                  />

                  {/* Luminous Diagonal Light Sheen Sweep on Reveal */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-10"
                    initial={{ x: "-110%", opacity: 0.85 }}
                    animate={{ x: "210%", opacity: 0 }}
                    transition={{ delay: 0.25, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background:
                        "linear-gradient(108deg, transparent 20%, rgba(255, 235, 180, 0.4) 48%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 235, 180, 0.4) 52%, transparent 80%)",
                      filter: "blur(2px)",
                    }}
                  />

                  {/* Resilient Unmute Banner if audio was muted by browser autoplay policy */}
                  {isMuted && (
                    <button
                      onClick={unmuteVideo}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium flex items-center gap-1.5 cursor-pointer z-20 hover:scale-105 active:scale-95 transition-transform"
                      style={{
                        background: "rgba(22, 17, 24, 0.88)",
                        border: "1px solid rgba(212, 175, 55, 0.75)",
                        color: "var(--gold-light)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 4px 18px rgba(0,0,0,0.65)",
                      }}
                    >
                      <span>🔊</span>
                      <span>Tap for Sound</span>
                    </button>
                  )}
                </div>

                {/* Romantic Caption with Staggered Entrance */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[12px] font-serif italic text-cream/85 max-w-[270px] text-center leading-relaxed"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                >
                  {storyConfig.birthdayWishVideo.caption}
                </motion.p>

                {/* Continue button with Staggered Entrance */}
                <motion.button
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="btn-cinematic w-full mt-1"
                  whileTap={{ scale: 0.96 }}
                  onClick={onContinue}
                >
                  A Special Blessing For You 🕊️🤍
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
