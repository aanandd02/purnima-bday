"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { asset } from "@/lib/assetPath";
import { MediaViewer } from "@/components/ui/MediaViewer";

interface MemoryWallSceneProps {
  onContinue: () => void;
}

function VideoThumbnailCard({
  video,
  index,
  totalMemories,
  handlePointerDown,
  handleItemTap,
}: {
  video: (typeof birthdayConfig.videos)[number];
  index: number;
  totalMemories: number;
  handlePointerDown: (e: React.PointerEvent) => void;
  handleItemTap: (idx: number, e: React.PointerEvent) => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-xl cursor-pointer mb-3 break-inside-avoid select-none"
      style={{
        aspectRatio: "9/16",
        background: "#121218",
        border: "1px solid rgba(212, 175, 55, 0.22)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.55)",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={(e) => handleItemTap(totalMemories + index, e)}
    >
      {!imgFailed && video.poster ? (
        <Image
          src={asset(video.poster)}
          alt={video.caption}
          fill
          unoptimized
          draggable={false}
          className="object-cover pointer-events-none select-none"
          sizes="(max-width: 430px) 50vw, 215px"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <video
          src={`${asset(video.src)}#t=0.5`}
          preload="metadata"
          muted
          playsInline
          className="w-full h-full object-cover pointer-events-none select-none"
        />
      )}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ background: "rgba(13,9,15,0.3)" }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(212, 175, 55, 0.2)",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            backdropFilter: "blur(8px)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="var(--gold-light)"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export function MemoryWallScene({ onContinue }: MemoryWallSceneProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const allMedia = [
    ...birthdayConfig.memories.map((m) => ({
      src: asset(m.src),
      caption: m.caption,
      type: "image" as const,
    })),
    ...birthdayConfig.videos.map((v) => ({
      src: asset(v.src),
      poster: asset(v.poster),
      caption: v.caption,
      type: "video" as const,
    })),
  ];

  // Layout: different sizes for each photo for visual interest
  const sizes = ["tall", "square", "wide", "tall", "square", "square", "wide"] as const;

  const getSizeClass = (idx: number) => {
    const s = sizes[idx % sizes.length];
    if (s === "tall") return { aspectRatio: "3/4", gridRow: "span 2" };
    if (s === "wide") return { aspectRatio: "4/3" };
    return { aspectRatio: "1/1" };
  };

  const pointerStart = useRef({ x: 0, y: 0, time: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const handleItemTap = (idx: number, e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    const dt = Date.now() - pointerStart.current.time;
    if (dx < 8 && dy < 8 && dt < 300) {
      setViewerIndex(idx);
    }
  };

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
        <div className="flex flex-col items-center pt-20 pb-8 px-6 text-center relative z-10">
          <p
            className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-3 font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Memory wall
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(28px, 8vw, 44px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.2,
            }}
          >
            {birthdayConfig.memoryWall.intro}
          </h2>
          <p
            className="mt-4 max-w-[260px]"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(14px, 3.8vw, 17px)",
              color: "rgba(253,245,230,0.6)",
              lineHeight: 1.6,
            }}
          >
            {birthdayConfig.memoryWall.body}
          </p>
        </div>

        {/* Grid — asymmetric 2-col layout */}
        <div className="px-4 pb-6" style={{ columnCount: 2, columnGap: 10 }}>
          {birthdayConfig.memories.map((memory, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              className="relative overflow-hidden rounded-xl cursor-pointer mb-3 break-inside-avoid select-none"
              style={{
                ...getSizeClass(i),
                background: "#121218",
                border: "1px solid rgba(212, 175, 55, 0.22)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.55)",
              }}
              onPointerDown={handlePointerDown}
              onPointerUp={(e) => handleItemTap(i, e)}
            >
              <Image
                src={asset(memory.src)}
                alt={memory.caption}
                fill
                draggable={false}
                className="object-cover pointer-events-none select-none"
                sizes="(max-width: 430px) 50vw, 215px"
                loading="lazy"
              />
              {/* Subtle overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(10,10,14,0.7) 100%)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Video thumbnails */}
        <div className="px-4 pb-4">
          <p
            className="text-gold/60 text-[10px] tracking-widest uppercase mb-3 text-center font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Videos
          </p>
          <div style={{ columnCount: 2, columnGap: 10 }}>
            {birthdayConfig.videos.map((video, i) => (
              <VideoThumbnailCard
                key={i}
                video={video}
                index={i}
                totalMemories={birthdayConfig.memories.length}
                handlePointerDown={handlePointerDown}
                handleItemTap={handleItemTap}
              />
            ))}
          </div>
        </div>

        {/* Finish button — at the very bottom */}
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
            Finish the experience ›
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Viewer */}
      <AnimatePresence>
        {viewerIndex !== null && (
          <MediaViewer
            items={allMedia}
            initialIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
