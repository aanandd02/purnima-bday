"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { asset } from "@/lib/assetPath";
import { MediaViewer } from "@/components/ui/MediaViewer";

interface VideoSceneProps {
  onContinue: () => void;
}

export function VideoScene({ onContinue }: VideoSceneProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const videoItems = birthdayConfig.videos.map((v) => ({
    src: asset(v.src),
    poster: v.poster ? asset(v.poster) : undefined,
    caption: v.caption,
    type: "video" as const,
  }));

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full relative min-h-screen"
        style={{
          background: "var(--charcoal)",
          paddingBottom: 72,
        }}
      >
        {/* Header */}
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
              fontSize: "clamp(32px, 8vw, 46px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.1,
            }}
          >
            In Motion
          </h2>
          <div
            className="w-10 h-[1px] my-3"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold), transparent)",
            }}
          />
          {/* Subtitle pill */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium mt-1"
            style={{
              background: "rgba(212, 175, 55, 0.1)",
              border: "1px solid rgba(212, 175, 55, 0.28)",
              color: "var(--gold-light)",
            }}
          >
            <span>{birthdayConfig.videos.length} Videos</span>
            <span className="text-gold/50">•</span>
            <span>Tap any video to play</span>
          </div>
        </div>

        {/* Modern 2-Column Video Grid */}
        <div className="grid grid-cols-2 gap-3 px-3.5 sm:px-5 pb-8 max-w-lg mx-auto">
          {birthdayConfig.videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewerIndex(i)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer select-none"
              style={{
                aspectRatio: "9/16",
                background: "rgba(20, 15, 22, 0.95)",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.55)",
              }}
            >
              {/* Poster Thumbnail */}
              <Image
                src={asset(video.poster || "/media/photos/hero-01.jpg")}
                alt={video.caption}
                fill
                priority={i < 4}
                loading={i < 4 ? "eager" : "lazy"}
                draggable={false}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 430px) 50vw, 220px"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(10,8,12,0.2) 0%, transparent 40%, rgba(10,8,12,0.85) 100%)",
                }}
              />

              {/* Floating index badge */}
              <div
                className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase font-semibold pointer-events-none z-10"
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

              {/* Center Play Icon Pill */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(22, 17, 24, 0.7)",
                    border: "1.5px solid rgba(212, 175, 55, 0.65)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxShadow: "0 0 25px rgba(212, 175, 55, 0.35)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--gold-light)">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>

              {/* Caption preview snippet at bottom */}
              <div className="absolute bottom-2.5 inset-x-2.5 pointer-events-none z-10">
                <p
                  className="text-white/90 text-[11px] leading-tight truncate italic text-center"
                  style={{
                    fontFamily: "var(--serif)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                  }}
                >
                  {video.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center px-5 pb-8 pt-2"
        >
          <motion.button
            className="btn-cinematic"
            whileTap={{ scale: 0.96 }}
            onClick={onContinue}
            style={{
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              background:
                "linear-gradient(135deg, rgba(28, 18, 29, 0.92) 0%, rgba(17, 11, 18, 0.96) 100%)",
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

      {/* Fullscreen Cinema Player Modal */}
      {viewerIndex !== null && (
        <MediaViewer
          items={videoItems}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}
