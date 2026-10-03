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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center safe-bottom"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute top-5 right-5 z-10 w-11 h-11 flex items-center justify-center rounded-full glass-card text-cream/60"
        style={{ top: "max(20px, env(safe-area-inset-top))" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 text-cream/40 text-xs tracking-widest" style={{ top: "max(20px, env(safe-area-inset-top))" }}>
        {index + 1} / {items.length}
      </div>

      {/* Media */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full flex items-center justify-center px-4"
        >
          {item.type === "video" ? (
            <video
              src={asset(item.src)}
              poster={item.poster ? asset(item.poster) : undefined}
              controls
              playsInline
              className="max-h-[80dvh] max-w-full rounded-xl object-contain"
            />
          ) : (
            <div className="relative max-h-[80dvh] max-w-full" style={{ aspectRatio: "9/16", width: "min(100%, 400px)" }}>
              <Image
                src={asset(item.src)}
                alt={item.caption || "Memory"}
                fill
                className="object-contain rounded-xl"
                sizes="(max-width: 430px) 100vw, 430px"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      {item.caption && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-8 left-0 right-0 text-center text-cream/50 text-sm font-serif italic px-8"
          style={{ bottom: "max(32px, env(safe-area-inset-bottom))" }}
        >
          {item.caption}
        </motion.p>
      )}

      {/* Nav arrows for large screens */}
      <div className="hidden md:flex absolute left-4 right-4 top-1/2 -translate-y-1/2 justify-between pointer-events-none">
        <button
          onClick={() => go(-1)}
          disabled={index === 0}
          className="w-11 h-11 glass-card rounded-full flex items-center justify-center pointer-events-auto disabled:opacity-20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={() => go(1)}
          disabled={index === items.length - 1}
          className="w-11 h-11 glass-card rounded-full flex items-center justify-center pointer-events-auto disabled:opacity-20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </motion.div>
  );
}
