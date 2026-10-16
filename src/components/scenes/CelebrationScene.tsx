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
      className="scene overflow-y-auto hide-scrollbar relative pb-12"
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
          <span style={{ color: "var(--gold)", fontSize: 11 }}>✦</span>
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "#FF6B8B", fontSize: 13 }}
          >
            ♥
          </motion.span>
          <span style={{ color: "var(--gold)", fontSize: 11 }}>✦</span>
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

        {/* Birthday Wish Video Presentation (Auto-revealed and played) */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xs flex flex-col items-center gap-3 my-2"
            >
              {/* Video Container */}
              <div
                className="relative w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
                style={{
                  border: "1.5px solid rgba(212, 175, 55, 0.65)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.8), 0 0 25px rgba(212,175,55,0.25)",
                  background: "#000",
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

                {/* Resilient Unmute Banner if audio was muted by browser autoplay policy */}
                {isMuted && (
                  <button
                    onClick={unmuteVideo}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium flex items-center gap-1.5 cursor-pointer z-20"
                    style={{
                      background: "rgba(22, 17, 24, 0.85)",
                      border: "1px solid rgba(212, 175, 55, 0.7)",
                      color: "var(--gold-light)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
                    }}
                  >
                    <span>🔊</span>
                    <span>Tap for Sound</span>
                  </button>
                )}
              </div>

              {/* Romantic Caption */}
              <p className="text-[12px] font-serif italic text-cream/80 max-w-[270px] text-center leading-relaxed">
                {storyConfig.birthdayWishVideo.caption}
              </p>

              {/* Continue button */}
              <motion.button
                className="btn-cinematic w-full mt-1"
                whileTap={{ scale: 0.96 }}
                onClick={onContinue}
              >
                A Special Wish For You ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
