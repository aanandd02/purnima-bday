"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { storyConfig } from "@/lib/storyConfig";
import { haptic } from "@/lib/utils";
import { asset } from "@/lib/assetPath";

interface PapaBlessingSceneProps {
  onContinue: () => void;
}

// Gentle divine white petals & golden blessings floating up
const BLESSING_ICONS = ["🕊️", "🤍", "✨", "🌸", "🕯️", "✨"];

function FloatingBlessingParticle({ i }: { i: number }) {
  const icon = BLESSING_ICONS[i % BLESSING_ICONS.length];
  const left = `${(i * 27 + 10) % 92}%`;
  const delay = (i * 0.5) % 4;
  const dur = 5 + (i % 3);

  return (
    <motion.div
      className="absolute pointer-events-none select-none text-sm"
      style={{
        left,
        bottom: "-5%",
        filter: "drop-shadow(0 0 8px rgba(255,235,175,0.45))",
        willChange: "transform, opacity",
      }}
      animate={{
        y: [0, -(280 + (i % 120))],
        opacity: [0, 0.75, 0],
        scale: [0.8, 1.15, 0.7],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2 + (i % 2),
        ease: "easeOut",
      }}
    >
      {icon}
    </motion.div>
  );
}

export function PapaBlessingScene({ onContinue }: PapaBlessingSceneProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>(storyConfig.papaBlessing.videoSrc);

  // Auto-play video with resilient sound fallback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocked unmuted sound, mute and prompt tap-for-sound
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, []);

  const unmuteVideo = () => {
    haptic([10]);
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoError = () => {
    // If primary video source fails to load, fallback to secondary path
    if (videoSrc !== storyConfig.papaBlessing.fallbackVideoSrc) {
      setVideoSrc(storyConfig.papaBlessing.fallbackVideoSrc);
    }
  };

  const handleContinue = () => {
    haptic([15, 25]);
    onContinue();
  };

  return (
    <div
      className="scene overflow-y-auto overflow-x-hidden hide-scrollbar relative pb-14 pt-8 px-4 flex flex-col items-center justify-between"
      style={{
        minHeight: "var(--vh-screen)",
        background:
          "radial-gradient(circle at 50% 28%, #1f141a 0%, #110912 45%, #070508 100%)",
      }}
    >
      {/* ── Soft Divine Aura & Ambient Backdrop ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Diya / Candlelight Warm Halo */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-45 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(237,216,154,0.35) 0%, rgba(212,175,55,0.15) 50%, transparent 75%)",
          }}
        />

        {/* Ambient floating white & gold blessing particles */}
        {[...Array(12)].map((_, i) => (
          <FloatingBlessingParticle key={i} i={i} />
        ))}
      </div>

      {/* ── Top Header: Sacred Badge & Emotional Intro ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-sm mt-2"
      >
        {/* Sacred Badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-3"
          style={{
            background: "rgba(25, 16, 22, 0.82)",
            border: "1px solid rgba(212, 175, 55, 0.4)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,235,175,0.25)",
          }}
        >
          <span className="text-xs">🕊️</span>
          <span
            className="text-[10.5px] tracking-[0.2em] uppercase font-semibold text-gold-light"
            style={{ fontFamily: "var(--sans)" }}
          >
            A Blessing From Heaven · पापा का आशीर्वाद
          </span>
          <span className="text-xs">🤍</span>
        </div>

        {/* Line 1 */}
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(15px, 4vw, 17.5px)",
            color: "var(--cream)",
            lineHeight: 1.45,
            maxWidth: 320,
            textShadow: "0 2px 14px rgba(0,0,0,0.85)",
          }}
        >
          &ldquo;{storyConfig.papaBlessing.line1}&rdquo;
        </p>

        {/* Line 2 */}
        <p
          className="mt-2 text-gold-light/90 font-medium"
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(13px, 3.4vw, 15px)",
            lineHeight: 1.4,
            maxWidth: 300,
          }}
        >
          {storyConfig.papaBlessing.line2}
        </p>

        {/* Delicate Heart Divider */}
        <div className="flex items-center justify-center gap-2.5 my-3 w-full">
          <div
            className="h-[1px] flex-1 max-w-[45px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.45))",
            }}
          />
          <span className="text-sm">🕊️</span>
          <div
            className="h-[1px] flex-1 max-w-[45px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(212,175,55,0.45), transparent)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Center: Royal Peaceful Video Player Frame ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-3 flex flex-col items-center w-full max-w-xs"
      >
        {/* Soft Golden Halo Behind Frame */}
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none opacity-50 blur-xl"
          style={{
            background:
              "radial-gradient(circle, rgba(237,216,154,0.3) 0%, rgba(212,175,55,0.15) 50%, transparent 75%)",
          }}
        />

        {/* Video Card Container */}
        <div
          className="relative w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
          style={{
            border: "1.5px solid rgba(237, 216, 154, 0.7)",
            boxShadow:
              "0 18px 45px rgba(0,0,0,0.85), 0 0 35px rgba(212,175,55,0.3), inset 0 1px 1px rgba(255,255,255,0.25)",
            background: "#000",
            maxHeight: "44vh",
            aspectRatio: "9/14",
          }}
        >
          <video
            ref={videoRef}
            src={asset(videoSrc)}
            controls
            autoPlay
            playsInline
            preload="auto"
            controlsList="nodownload"
            onError={handleVideoError}
            className="w-full h-full object-contain"
          />

          {/* Unmute Button if browser blocked sound */}
          {isMuted && (
            <button
              onClick={unmuteVideo}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-[11px] font-sans font-medium flex items-center gap-1.5 cursor-pointer z-20"
              style={{
                background: "rgba(22, 17, 24, 0.9)",
                border: "1px solid rgba(212, 175, 55, 0.8)",
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
      </motion.div>

      {/* ── Bottom Section: Deep Heartfelt Commitment & CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-xs w-full pb-1"
      >
        {/* Heartfelt Note Card */}
        <div
          className="letter-card w-full p-4 sm:p-5 rounded-2xl mb-4 text-center"
          style={{
            background: "rgba(20, 14, 20, 0.82)",
            border: "1px solid rgba(212, 175, 55, 0.32)",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,240,210,0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(12.5px, 3.4vw, 14.5px)",
              color: "rgba(248, 243, 236, 0.92)",
              lineHeight: 1.6,
            }}
          >
            &ldquo;{storyConfig.papaBlessing.note}&rdquo;
          </p>
        </div>

        {/* Continue to Wishes Button */}
        <div className="relative w-full flex justify-center">
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(237,216,154,0.45) 0%, transparent 70%)",
            }}
          />

          <motion.button
            className="btn-cinematic relative z-10 flex items-center justify-center gap-2.5 px-8 py-3.5 cursor-pointer w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleContinue}
            style={{
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.65), 0 0 25px rgba(212,175,55,0.45), inset 0 1px 1px rgba(255,255,255,0.9)",
            }}
          >
            <span className="text-sm">✨</span>
            <span className="tracking-[0.14em] font-bold">
              {storyConfig.papaBlessing.cta}
            </span>
            <span className="text-sm">›</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
