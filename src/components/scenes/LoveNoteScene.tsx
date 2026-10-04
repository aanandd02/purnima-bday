"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { haptic } from "@/lib/utils";

interface LoveNoteSceneProps {
  onContinue: () => void;
}

const PROMPTS = [
  "The day I find myself reminiscing about the most with you…",
  "When you are beside me, it feels like…",
  "The very first thing that took my breath away about you was…",
  "A dream I quietly wish to live with you is…",
];

export function LoveNoteScene({ onContinue }: LoveNoteSceneProps) {
  const [promptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const heartId = useRef(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    if (!text.trim()) return;
    haptic([20, 40, 20]);
    setSaved(true);
    // Burst hearts from center
    const newHearts = Array.from({ length: 8 }, () => ({
      id: heartId.current++,
      x: 50 + (Math.random() - 0.5) * 60,
      y: 50 + (Math.random() - 0.5) * 40,
    }));
    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full relative flex flex-col items-center justify-center"
      style={{
        minHeight: "var(--vh-screen)",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(80,20,40,0.3) 0%, var(--charcoal) 60%)",
      }}
    >
      {/* Floating heart bursts */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, x: (h.x - 50) * 2, y: -80 - Math.random() * 60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="fixed pointer-events-none z-50"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            <span style={{ fontSize: 22 }}>🌹</span>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-sm px-5 py-8 flex flex-col items-center gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: 36, marginBottom: 10, display: "block" }}
          >
            💌
          </motion.div>
          <p
            style={{
              fontFamily: "var(--sans)",
              fontSize: "10px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--gold-dim)",
            }}
          >
            A Quiet Whisper
          </p>
          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(22px, 6vw, 30px)",
              fontWeight: 300,
              color: "var(--cream)",
              lineHeight: 1.3,
              marginTop: 6,
            }}
          >
            Write something just for us
          </h2>
        </motion.div>

        {/* Paper note card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full relative"
          style={{
            background: "linear-gradient(145deg, rgba(25,16,20,0.95) 0%, rgba(14,10,13,0.98) 100%)",
            border: saved
              ? "1px solid rgba(212,175,55,0.6)"
              : "1px solid rgba(212,175,55,0.28)",
            borderRadius: 20,
            padding: "20px 18px",
            boxShadow: saved
              ? "0 0 50px rgba(212,175,55,0.2), 0 20px 50px rgba(0,0,0,0.7)"
              : "0 20px 50px rgba(0,0,0,0.6)",
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Corner gold dots */}
          {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
            <div key={pos} className={`absolute ${pos} text-[8px]`} style={{ color: "rgba(212,175,55,0.3)" }}>
              ✦
            </div>
          ))}

          {/* Prompt */}
          <p
            className="mb-3"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "rgba(253,245,230,0.45)",
              lineHeight: 1.5,
            }}
          >
            {PROMPTS[promptIdx]}
          </p>

          {/* Textarea */}
          <AnimatePresence mode="wait">
            {!saved ? (
              <motion.textarea
                key="editor"
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Pour your heart out here…"
                rows={5}
                className="w-full outline-none resize-none"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(212,175,55,0.15)",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 4vw, 17px)",
                  color: "rgba(253,251,247,0.9)",
                  caretColor: "var(--gold)",
                  lineHeight: 1.7,
                  padding: "4px 2px 10px",
                }}
              />
            ) : (
              <motion.p
                key="saved-text"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 4vw, 17px)",
                  color: "rgba(253,251,247,0.9)",
                  lineHeight: 1.7,
                  paddingBottom: 10,
                  minHeight: 80,
                  whiteSpace: "pre-wrap",
                  borderBottom: "1px solid rgba(212,175,55,0.15)",
                }}
              >
                {text}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Char count */}
          {!saved && (
            <p className="text-right mt-1" style={{ fontFamily: "var(--sans)", fontSize: "10px", color: "rgba(212,175,55,0.3)" }}>
              {text.length} characters
            </p>
          )}

          {/* Saved stamp */}
          <AnimatePresence>
            {saved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-3 right-3 pointer-events-none"
                style={{
                  border: "1.5px solid rgba(212,175,55,0.5)",
                  borderRadius: 6,
                  padding: "3px 8px",
                  fontFamily: "var(--sans)",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  color: "rgba(212,175,55,0.7)",
                  textTransform: "uppercase",
                  background: "rgba(212,175,55,0.06)",
                }}
              >
                saved 🤍
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-3 w-full"
        >
          {!saved ? (
            <motion.button
              className="btn-cinematic w-full"
              whileTap={{ scale: 0.96 }}
              onClick={handleSave}
              disabled={!text.trim()}
              style={{
                opacity: text.trim() ? 1 : 0.38,
                cursor: text.trim() ? "pointer" : "not-allowed",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(40,18,30,0.9) 0%, rgba(20,10,18,0.95) 100%)",
                border: "1px solid rgba(212,175,55,0.4)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.1)",
                color: "var(--gold-light)",
              }}
            >
              Keep in My Heart 🌹
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <p
                style={{
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(14px, 3.8vw, 17px)",
                  color: "var(--gold-light)",
                  textAlign: "center",
                }}
              >
                This moment is now forever ours. 🤍
              </p>
              <motion.button
                className="btn-cinematic"
                whileTap={{ scale: 0.96 }}
                onClick={onContinue}
                style={{
                  background: "linear-gradient(135deg, rgba(40,18,30,0.9) 0%, rgba(20,10,18,0.95) 100%)",
                  border: "1px solid rgba(212,175,55,0.45)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(212,175,55,0.15)",
                  color: "var(--gold-light)",
                }}
              >
                Continue onward ›
              </motion.button>
            </motion.div>
          )}

          {/* Skip (without saving) */}
          {!saved && (
            <button
              onClick={onContinue}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--sans)",
                fontSize: "11px",
                color: "rgba(245,240,232,0.22)",
                letterSpacing: "0.08em",
                cursor: "pointer",
                padding: "8px 16px",
              }}
            >
              Skip this for now
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
