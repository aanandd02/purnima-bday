"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { asset } from "@/lib/assetPath";
import { MediaViewer } from "@/components/ui/MediaViewer";

interface MemorySceneProps {
  onContinue: () => void;
}

function MemoryCard({
  memory,
  index,
  onTap,
}: {
  memory: (typeof birthdayConfig.memories)[number];
  index: number;
  onTap: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pointerStart = useRef({ x: 0, y: 0, time: 0 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    const dt = Date.now() - pointerStart.current.time;
    // Only open viewer if it was a stationary tap (<8px movement & under 300ms)
    // If user dragged to scroll, do NOT open viewer!
    if (dx < 8 && dy < 8 && dt < 300) {
      onTap();
    }
  };

  return (
    <div
      ref={ref}
      className="relative w-full flex flex-col items-center justify-center px-5 py-7 select-none"
    >
      <motion.div
        style={{ scale, opacity }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-full cursor-pointer"
      >
        {/* Index label */}
        <motion.span
          style={{ y, color: "var(--gold-dim)", fontFamily: "var(--sans)" }}
          className="absolute -top-4 left-3 text-[11px] tracking-[0.3em] uppercase z-10 font-medium"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        {/* Image wrapper */}
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            aspectRatio: "3/4",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            boxShadow: "0 16px 45px rgba(0,0,0,0.65)",
          }}
        >
          <Image
            src={asset(memory.src)}
            alt={memory.caption}
            fill
            priority={index === 0}
            draggable={false}
            className="object-cover object-top pointer-events-none select-none transition-transform duration-700"
            sizes="(max-width: 430px) 100vw, 430px"
          />
          {/* Subtle gradient vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(10,10,14,0.75) 100%)",
            }}
          />

          {/* Tap hint badge */}
          <div
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase flex items-center gap-1.5 pointer-events-none"
            style={{
              background: "rgba(14, 14, 18, 0.75)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(212, 175, 55, 0.3)",
              color: "var(--gold-light)",
            }}
          >
            <span>View</span>
            <span className="text-[11px] leading-none">⤢</span>
          </div>
        </div>

        {/* Caption */}
        <motion.p
          style={{
            y: useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]),
            fontFamily: "var(--serif)",
            color: "var(--cream)",
            opacity: 0.85,
            fontStyle: "italic",
            fontSize: "clamp(15px, 4vw, 18px)",
          }}
          className="mt-4 text-center px-4"
        >
          {memory.caption}
        </motion.p>
      </motion.div>
    </div>
  );
}

export function MemoryScene({ onContinue }: MemorySceneProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const mediaItems = birthdayConfig.memories.map((m) => ({
    src: asset(m.src),
    caption: m.caption,
    type: "image" as const,
  }));

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
        {/* Chapter header */}
        <div className="flex flex-col items-center pt-20 pb-4 px-8 text-center relative z-10">
          <p
            className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Chapter
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(34px, 9vw, 50px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.1,
            }}
          >
            Memories
          </h2>
          <div
            className="w-10 h-[1px] mt-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
            }}
          />
        </div>

        {/* Memory cards */}
        {birthdayConfig.memories.map((memory, i) => (
          <MemoryCard
            key={i}
            memory={memory}
            index={i}
            onTap={() => setViewerIndex(i)}
          />
        ))}

        {/* Continue button — always at the very bottom */}
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

      {/* Fullscreen viewer */}
      {viewerIndex !== null && (
        <MediaViewer
          items={mediaItems}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}
