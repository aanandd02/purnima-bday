"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { asset } from "@/lib/assetPath";

interface VideoSceneProps {
  onContinue: () => void;
}

function VideoCard({
  video,
  index,
}: {
  video: (typeof birthdayConfig.videos)[number];
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef({ x: 0, y: 0, time: 0 });
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Pause when out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
      setExpanded(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    const dt = Date.now() - pointerStart.current.time;
    // Only toggle if it was a true tap (<8px movement & under 300ms)
    // If the user was scrolling/dragging, DO NOT toggle play!
    if (dx < 8 && dy < 8 && dt < 300) {
      togglePlay();
    }
  };

  const handleVideoEnd = () => {
    setPlaying(false);
    setExpanded(false);
  };

  // Image fallback if poster missing
  const hasPoster = video.poster && !video.poster.includes("undefined");

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center px-5 py-6 select-none"
    >
      <motion.div
        animate={{ scale: expanded ? 1.02 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-2xl overflow-hidden cursor-pointer"
        style={{
          aspectRatio: "9/16",
          maxHeight: "75dvh",
          background: "#121218",
          border: "1px solid rgba(212, 175, 55, 0.25)",
          boxShadow: "0 16px 45px rgba(0,0,0,0.7)",
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <video
          ref={videoRef}
          src={asset(video.src)}
          poster={hasPoster ? asset(video.poster) : undefined}
          preload="metadata"
          playsInline
          muted
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover"
          style={{ pointerEvents: "none" }}
          aria-label={video.caption}
        />

        {/* Dark overlay when not playing */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(10,10,14,0.3) 0%, rgba(10,10,14,0.65) 100%)",
              }}
            >
              {/* Play button */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center pointer-events-none"
                style={{
                  background: "rgba(212, 175, 55, 0.18)",
                  border: "1.5px solid rgba(212, 175, 55, 0.55)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 0 30px rgba(212, 175, 55, 0.3)",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--gold-light)">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Index badge */}
        <div
          className="absolute top-4 left-4 text-[10px] tracking-widest uppercase font-medium pointer-events-none"
          style={{ color: "var(--gold-light)", fontFamily: "var(--sans)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </motion.div>

      {/* Caption */}
      <p
        className="mt-3 text-cream/70 text-sm italic text-center px-4"
        style={{ fontFamily: "var(--serif)", fontStyle: "italic" }}
      >
        {video.caption}
      </p>
    </div>
  );
}

export function VideoScene({ onContinue }: VideoSceneProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full relative"
        style={{
          background: "var(--charcoal)",
          paddingBottom: 64,
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center pt-20 pb-4 px-8 text-center relative z-10">
          <p
            className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Moving memories
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(32px, 9vw, 48px)",
              fontWeight: 300,
              color: "var(--cream)",
            }}
          >
            In motion
          </h2>
          <div
            className="w-10 h-[1px] mt-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
            }}
          />
        </div>

        {/* Videos */}
        {birthdayConfig.videos.map((v, i) => (
          <VideoCard key={i} video={v} index={i} />
        ))}

        {/* Continue button — at the very bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center mt-6 px-5 pb-10"
        >
          <motion.button
            className="btn-cinematic"
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
            style={{
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              background:
                "linear-gradient(135deg, rgba(28, 18, 29, 0.88) 0%, rgba(17, 11, 18, 0.94) 100%)",
              border: "1px solid rgba(212, 175, 55, 0.45)",
              boxShadow:
                "0 12px 35px rgba(0,0,0,0.7), 0 0 25px rgba(212,175,55,0.18)",
              color: "var(--gold-light)",
            }}
          >
            Continue ›
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}

