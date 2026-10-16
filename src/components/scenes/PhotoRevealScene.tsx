"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { birthdayConfig } from "@/lib/birthdayConfig";
import { asset } from "@/lib/assetPath";
import { haptic } from "@/lib/utils";

interface PhotoRevealSceneProps {
  onContinue: () => void;
}

// Curated preview portraits of Purnima
const PREVIEW_PHOTOS = [
  {
    src: "/media/photos/memory-01.jpg",
    caption: "Still the most beautiful sight",
  },
  {
    src: "/media/photos/memory-08.jpg",
    caption: "The smile that captured my heart",
  },
  {
    src: "/media/photos/memory-02.jpg",
    caption: "Iconic in every single way",
  },
  {
    src: "/media/photos/memory-05.jpg",
    caption: "A quiet moment I hold close",
  },
];

// Romantic floating hearts & sparkles
const FLOATING_ICONS = ["❤️", "💖", "💕", "🤍", "🌸", "✨"];

function FloatingLoveIcon({ i }: { i: number }) {
  const icon = FLOATING_ICONS[i % FLOATING_ICONS.length];
  const left = `${(i * 29 + 12) % 92}%`;
  const delay = (i * 0.4) % 3.5;
  const dur = 4.5 + (i % 3);

  return (
    <motion.div
      className="absolute pointer-events-none select-none text-base"
      style={{
        left,
        bottom: "-5%",
        filter: "drop-shadow(0 0 8px rgba(220,130,150,0.4))",
        willChange: "transform, opacity",
      }}
      animate={{
        y: [0, -(260 + (i % 120))],
        opacity: [0, 0.85, 0],
        scale: [0.8, 1.15, 0.7],
        rotate: [0, i % 2 === 0 ? 25 : -25],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        repeatDelay: 1 + (i % 2),
        ease: "easeOut",
      }}
    >
      {icon}
    </motion.div>
  );
}

export function PhotoRevealScene({ onContinue }: PhotoRevealSceneProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isPressing, setIsPressing] = useState(false);

  // Auto-cycle through preview photos every 3.8s
  useEffect(() => {
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % PREVIEW_PHOTOS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    haptic([15, 30, 20]);
    setIsPressing(true);
    setTimeout(() => {
      onContinue();
    }, 280);
  };

  const activePhoto = PREVIEW_PHOTOS[photoIndex];

  return (
    <div
      className="scene relative overflow-hidden flex flex-col items-center justify-between px-5 py-6 sm:py-10"
      style={{
        minHeight: "var(--vh-screen)",
        background:
          "radial-gradient(circle at 50% 25%, #240c18 0%, #120812 45%, #080509 100%)",
      }}
    >
      {/* ── Ambient warm blurred backdrop ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhoto.src}
            className="absolute -inset-16 opacity-35"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 0.35, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
          >
            <Image
              src={asset(activePhoto.src)}
              alt="Atmosphere"
              fill
              className="object-cover object-center blur-3xl"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(8,5,9,0.2) 0%, rgba(8,5,9,0.78) 75%, rgba(8,5,9,0.96) 100%)",
          }}
        />

        {/* Floating hearts */}
        {[...Array(10)].map((_, i) => (
          <FloatingLoveIcon key={i} i={i} />
        ))}
      </div>

      {/* ── Top Header / Love Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center pt-2 sm:pt-4"
      >
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
          style={{
            background: "rgba(25, 14, 22, 0.75)",
            border: "1px solid rgba(212, 175, 55, 0.35)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,235,175,0.2)",
          }}
        >
          <span className="text-xs">💖</span>
          <span
            className="text-[11px] font-medium"
            style={{
              fontFamily: "var(--sans)",
              color: "var(--gold-light)",
              letterSpacing: "0.06em",
            }}
          >
            A Few Moments of You 🥰
          </span>
          <span className="text-xs">💖</span>
        </div>
      </motion.div>

      {/* ── Center: Photo Showcase Frame ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-auto flex flex-col items-center"
      >
        {/* Glow halo */}
        <div
          className="absolute -inset-6 rounded-3xl pointer-events-none opacity-60 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.32) 0%, rgba(124,45,62,0.3) 50%, transparent 75%)",
          }}
        />

        {/* Depth card */}
        <div
          className="absolute w-[220px] sm:w-[250px] h-[310px] sm:h-[350px] rounded-2xl pointer-events-none"
          style={{
            transform: "rotate(3.5deg) translateZ(0)",
            background: "linear-gradient(135deg, rgba(30,16,25,0.7) 0%, rgba(15,8,14,0.9) 100%)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
          }}
        />

        {/* Main Photo Frame */}
        <div
          className="relative w-[226px] sm:w-[256px] h-[318px] sm:h-[358px] rounded-2xl overflow-hidden p-2"
          style={{
            background:
              "linear-gradient(145deg, rgba(38,22,32,0.95) 0%, rgba(18,9,16,0.98) 100%)",
            border: "1.5px solid rgba(237, 216, 154, 0.55)",
            boxShadow:
              "0 24px 60px -10px rgba(0,0,0,0.85), 0 0 35px rgba(201,169,110,0.22), inset 0 1px 1px rgba(255,255,255,0.25)",
          }}
        >
          {/* Photo Container */}
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhoto.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={asset(activePhoto.src)}
                  alt="Purnima"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 256px, 300px"
                  style={{
                    filter: "brightness(0.95) saturate(1.05) contrast(1.02)",
                  }}
                />

                {/* Subtle bottom fade */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(15,8,12,0.1) 0%, transparent 40%, rgba(12,6,10,0.75) 100%)",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom Caption Pill */}
            <div
              className="absolute bottom-2.5 inset-x-2.5 z-20 flex items-center justify-between px-3 py-1.5 rounded-lg"
              style={{
                background: "rgba(14, 7, 12, 0.82)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs">❤️</span>
                <span
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "11px",
                    color: "var(--gold-light)",
                    fontWeight: 600,
                  }}
                >
                  Meri Purnima 💕
                </span>
              </div>
              <span className="text-xs">✨</span>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center gap-2 mt-3.5">
          {PREVIEW_PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                haptic([8]);
                setPhotoIndex(i);
              }}
              className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === photoIndex ? 18 : 6,
                background:
                  i === photoIndex
                    ? "linear-gradient(90deg, var(--gold-light), var(--gold))"
                    : "rgba(201,169,110,0.3)",
                boxShadow: i === photoIndex ? "0 0 8px rgba(237,216,154,0.6)" : "none",
              }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Bottom Section: Warm Love Note & Button ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-xs w-full pb-2"
      >
        {/* Heart Divider */}
        <div className="flex items-center justify-center gap-2.5 mb-2 w-full">
          <div
            className="h-[1px] flex-1 max-w-[40px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4))",
            }}
          />
          <span className="text-sm">❤️</span>
          <div
            className="h-[1px] flex-1 max-w-[40px]"
            style={{
              background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)",
            }}
          />
        </div>

        {/* Quote Line 1 */}
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(17px, 4.6vw, 21px)",
            color: "var(--cream)",
            lineHeight: 1.45,
            maxWidth: 290,
            textShadow: "0 2px 14px rgba(0,0,0,0.8)",
          }}
        >
          {birthdayConfig.photoReveal.line1}
        </p>

        {/* Subline */}
        <p
          className="mt-1.5 text-gold-light/85"
          style={{
            fontFamily: "var(--sans)",
            fontSize: "11px",
            fontWeight: 500,
          }}
        >
          {birthdayConfig.photoReveal.line2}
        </p>

        {/* Action Button */}
        <div className="relative mt-5 w-full flex justify-center">
          <div
            className="absolute inset-0 rounded-full blur-xl pointer-events-none opacity-70"
            style={{
              background: "radial-gradient(circle, rgba(237,216,154,0.45) 0%, transparent 70%)",
            }}
          />

          <motion.button
            className="btn-cinematic relative z-10 flex items-center justify-center gap-2 px-8 py-3.5 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            animate={isPressing ? { scale: 0.95, opacity: 0.85 } : { scale: 1, opacity: 1 }}
            onClick={handleContinue}
            style={{
              minWidth: 200,
              boxShadow:
                "0 12px 30px rgba(0,0,0,0.65), 0 0 30px rgba(212,175,55,0.5), inset 0 1px 1px rgba(255,255,255,0.9)",
            }}
          >
            <span className="text-sm">❤️</span>
            <span className="tracking-[0.14em] font-bold">Show Me</span>
            <span className="text-sm">✨</span>
          </motion.button>
        </div>

        {/* Sweet natural love note */}
        <p
          className="mt-2.5 text-[10px] text-cream/50 tracking-wider font-light"
          style={{ fontFamily: "var(--sans)" }}
        >
          Every single memory with you is so special 💖
        </p>
      </motion.div>
    </div>
  );
}
