"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { asset } from "@/lib/assetPath";
import { MediaViewer } from "@/components/ui/MediaViewer";

interface MemorySceneProps {
  onContinue: () => void;
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
      <div
        className="w-full relative min-h-screen"
        style={{
          background: "var(--charcoal)",
          paddingBottom: 72,
        }}
      >
        {/* Chapter Header */}
        <div className="flex flex-col items-center pt-16 pb-6 px-6 text-center relative z-10">
          <p
            className="text-gold/70 text-[10px] tracking-[0.35em] uppercase mb-2 font-medium"
            style={{ fontFamily: "var(--sans)" }}
          >
            Chapter
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(34px, 8vw, 48px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.1,
            }}
          >
            Memories
          </h2>
          <div
            className="w-10 h-[1px] my-3"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
            }}
          />
          {/* Subtitle / hint pill */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium mt-1"
            style={{
              background: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.28)",
              color: "var(--gold-light)",
            }}
          >
            <span>{birthdayConfig.memories.length} Moments</span>
            <span className="text-gold/50">•</span>
            <span>Tap any photo to view</span>
          </div>
        </div>

        {/* Modern 2-Column Photo Grid */}
        <div className="grid grid-cols-2 gap-3 px-3.5 sm:px-5 pb-8 max-w-lg mx-auto">
          {birthdayConfig.memories.map((memory, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewerIndex(i)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer select-none"
              style={{
                aspectRatio: "3/4",
                background: "rgba(20, 15, 22, 0.95)",
                border: "1px solid rgba(212, 175, 55, 0.22)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              }}
            >
              {/* Photo Thumbnail */}
              <Image
                src={asset(memory.src)}
                alt={memory.caption}
                fill
                priority={i < 4}
                loading={i < 4 ? "eager" : "lazy"}
                draggable={false}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 430px) 50vw, 220px"
              />

              {/* Elegant bottom gradient for text contrast */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,8,12,0.15) 0%, transparent 45%, rgba(10,8,12,0.85) 100%)",
                }}
              />

              {/* Floating index badge */}
              <div
                className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase font-semibold pointer-events-none z-10"
                style={{
                  background: "rgba(16, 12, 18, 0.78)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(212, 175, 55, 0.35)",
                  color: "var(--gold-light)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Tap expand cue */}
              <div
                className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                style={{
                  background: "rgba(16, 12, 18, 0.7)",
                  backdropFilter: "blur(6px)",
                  color: "var(--gold-light)",
                }}
              >
                ⤢
              </div>

              {/* Caption preview snippet */}
              <div className="absolute bottom-2 inset-x-2.5 pointer-events-none z-10">
                <p
                  className="text-white/90 text-[11px] leading-tight truncate italic"
                  style={{
                    fontFamily: "var(--serif)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  {memory.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue button at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col items-center justify-center px-5 pb-8 pt-2"
        >
          <motion.button
            className="btn-cinematic"
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
          >
            Continue to Videos ›
          </motion.button>
          <p className="text-cream/40 text-[11px] mt-2.5 tracking-wider uppercase font-sans">
            Moving memories await next
          </p>
        </motion.div>
      </div>

      {/* Fullscreen Interactive Photo & Caption Viewer */}
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
