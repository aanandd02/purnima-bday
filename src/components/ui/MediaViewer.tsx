"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/assetPath";

interface MediaViewerProps {
  items: { src: string; caption?: string; type?: "image" | "video"; poster?: string }[];
  initialIndex: number;
  onClose: () => void;
}

export function MediaViewer({ items, initialIndex, onClose }: MediaViewerProps) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const item = items[index];

  const go = useCallback(
    (dir: number) => {
      const next = index + dir;
      if (next < 0 || next >= items.length) return;
      setDirection(dir);
      setIndex(next);
    },
    [index, items.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Horizontal swipe threshold
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-between overflow-hidden select-none"
      style={{
        background: "rgba(8, 6, 11, 0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background glow matching the active media item */}
      {item.type !== "video" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <Image
            key={item.src}
            src={asset(item.src)}
            alt=""
            fill
            className="object-cover scale-125 blur-3xl opacity-25 brightness-75 transition-opacity duration-700"
          />
        </div>
      )}

      {/* Top Bar: Counter & Close button */}
      <div
        className="relative z-20 w-full max-w-lg px-5 pt-4 pb-2 flex items-center justify-between"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        {/* Pill counter */}
        <div
          className="px-3 py-1 rounded-full text-[11px] tracking-widest uppercase font-medium flex items-center gap-1.5"
          style={{
            background: "rgba(22, 17, 24, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(212, 175, 55, 0.35)",
            color: "var(--gold-light)",
          }}
        >
          <span className="text-[10px] text-gold/60">✦</span>
          <span>{item.type === "video" ? "Video" : "Memory"} {index + 1} of {items.length}</span>
        </div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileTap={{ scale: 0.9 }}
          aria-label="Close viewer"
          className="w-10 h-10 rounded-full flex items-center justify-center text-cream/70 hover:text-cream transition-colors cursor-pointer"
          style={{
            background: "rgba(22, 17, 24, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(212, 175, 55, 0.35)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      {/* Center Stage: The Media */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center px-3 min-h-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -50, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full max-h-[62dvh] max-w-md flex items-center justify-center relative"
          >
            {item.type === "video" ? (
              <video
                src={item.poster ? asset(item.src) : `${asset(item.src)}#t=0.5`}
                poster={item.poster ? asset(item.poster) : undefined}
                controls
                autoPlay
                playsInline
                className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
                style={{
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
                }}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={asset(item.src)}
                  alt={item.caption || "Memory"}
                  fill
                  priority
                  className="object-contain rounded-2xl p-1"
                  sizes="(max-width: 500px) 100vw, 500px"
                  style={{
                    filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.8))",
                  }}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Desktop Side Chevron Arrows */}
        <div className="hidden md:flex absolute inset-x-4 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
          <button
            onClick={() => go(-1)}
            disabled={index === 0}
            className="w-11 h-11 rounded-full flex items-center justify-center pointer-events-auto transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            style={{
              background: "rgba(22, 17, 24, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              color: "var(--gold-light)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            disabled={index === items.length - 1}
            className="w-11 h-11 rounded-full flex items-center justify-center pointer-events-auto transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            style={{
              background: "rgba(22, 17, 24, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              color: "var(--gold-light)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Drawer: Prominent Caption & Mobile Navigation Pills */}
      <div
        className="relative z-20 w-full max-w-md mx-auto px-4 pt-2 pb-5 flex flex-col gap-3"
        style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        {/* Caption Card */}
        {item.caption && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 py-3 rounded-2xl text-center"
            style={{
              background: "linear-gradient(135deg, rgba(26, 19, 29, 0.92) 0%, rgba(16, 12, 18, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              boxShadow: "0 12px 35px rgba(0,0,0,0.7), 0 0 20px rgba(212,175,55,0.1)",
            }}
          >
            <p
              className="text-[15px] sm:text-[16px] leading-snug italic font-serif"
              style={{
                fontFamily: "var(--serif)",
                color: "var(--cream)",
              }}
            >
              {item.caption}
            </p>
          </motion.div>
        )}

        {/* Mobile Navigation Controls */}
        <div className="flex items-center justify-between px-1">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => go(-1)}
            disabled={index === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            style={{
              background: "rgba(22, 17, 24, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "var(--gold-light)",
            }}
          >
            <span className="text-sm">‹</span>
            <span>Previous</span>
          </motion.button>

          <span className="text-[11px] tracking-widest text-gold/60 uppercase font-sans">
            Swipe ‹ › to browse
          </span>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => go(1)}
            disabled={index === items.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
            style={{
              background: "rgba(22, 17, 24, 0.8)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "var(--gold-light)",
            }}
          >
            <span>Next</span>
            <span className="text-sm">›</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
