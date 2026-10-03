"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { audioManager } from "@/lib/audioManager";

interface AudioControllerProps {
  enabled: boolean;
  onToggle: () => void;
}

export function AudioController({ enabled, onToggle }: AudioControllerProps) {
  return (
    <button
      onClick={onToggle}
      aria-label={enabled ? "Mute audio" : "Unmute audio"}
      className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full glass-card border border-white/10 text-cream/60 hover:text-cream/90 transition-colors"
      style={{ top: "max(16px, env(safe-area-inset-top))" }}
    >
      <AnimatePresence mode="wait">
        {enabled ? (
          <motion.svg
            key="on"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </motion.svg>
        ) : (
          <motion.svg
            key="off"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/>
            <line x1="17" y1="9" x2="23" y2="15"/>
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
