"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoverGateProps {
  onUnlock: () => void;
}

const CORRECT_ANSWERS = [
  "9 aug",
  "9aug",
  "9 august",
  "9august",
  "09 aug",
  "09aug",
  "09 august",
  "09august",
];

function isCorrect(input: string): boolean {
  return CORRECT_ANSWERS.includes(input.trim().toLowerCase());
}

export function LoverGate({ onUnlock }: LoverGateProps) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [success, setSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = () => {
    if (success) return;
    if (isCorrect(value)) {
      setSuccess(true);
      setWrong(false);
      setTimeout(onUnlock, 1200);
    } else {
      setAttempts((a) => a + 1);
      setWrong(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const hintMessage =
    attempts >= 3
      ? "💛 Hint: It was that August day…"
      : attempts >= 1
      ? "Think again… that very first meeting."
      : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(7,7,10,0.88)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        animate={
          shake
            ? { opacity: 1, y: 0, scale: 1, x: [-10, 10, -8, 8, 0] }
            : { opacity: 1, y: 0, scale: 1, x: 0 }
        }
        transition={
          shake
            ? { duration: 0.45 }
            : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
        className="w-full max-w-sm relative"
      >
        <div
          className="relative rounded-3xl p-7 overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(22,16,28,0.97) 0%, rgba(12,9,16,0.99) 100%)",
            border: `1px solid ${
              success
                ? "rgba(212,175,55,0.7)"
                : wrong
                ? "rgba(220,80,80,0.5)"
                : "rgba(212,175,55,0.35)"
            }`,
            boxShadow: success
              ? "0 0 60px rgba(212,175,55,0.3), 0 25px 60px rgba(0,0,0,0.8)"
              : "0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.1)",
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: 260,
              height: 100,
              borderRadius: "50%",
              background: success
                ? "radial-gradient(ellipse, rgba(212,175,55,0.25) 0%, transparent 70%)"
                : "radial-gradient(ellipse, rgba(180,120,255,0.1) 0%, transparent 70%)",
              filter: "blur(30px)",
              top: -30,
              transition: "background 0.6s",
            }}
          />

          {/* Icon */}
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="lock"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center mb-5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: wrong ? "rgba(220,80,80,0.12)" : "rgba(212,175,55,0.1)",
                    border: `1px solid ${wrong ? "rgba(220,80,80,0.4)" : "rgba(212,175,55,0.4)"}`,
                    transition: "all 0.3s",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{wrong ? "💔" : "🔐"}</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="unlock"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.3, 1], opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex justify-center mb-5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(212,175,55,0.2)",
                    border: "1px solid rgba(212,175,55,0.6)",
                    boxShadow: "0 0 30px rgba(212,175,55,0.4)",
                  }}
                >
                  <span style={{ fontSize: 22 }}>🔓</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content */}
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div key="question" exit={{ opacity: 0, y: -10 }}>
                <p
                  className="text-center mb-1"
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--gold-dim)",
                  }}
                >
                  A secret question first
                </p>
                <h3
                  className="text-center mb-6"
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(18px, 4.8vw, 22px)",
                    color: "var(--cream)",
                    lineHeight: 1.4,
                  }}
                >
                  When did we first meet?
                </h3>

                <div className="relative mb-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setWrong(false);
                    }}
                    onKeyDown={handleKey}
                    placeholder="Write that special day…"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className="w-full text-center outline-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${wrong ? "rgba(220,80,80,0.5)" : "rgba(212,175,55,0.3)"}`,
                      borderRadius: 14,
                      padding: "14px 20px",
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(16px, 4vw, 19px)",
                      color: "var(--cream)",
                      caretColor: "var(--gold)",
                      transition: "border-color 0.3s",
                    }}
                  />
                </div>

                <AnimatePresence>
                  {hintMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center mb-4"
                      style={{
                        fontFamily: "var(--sans)",
                        fontSize: "12px",
                        color: attempts >= 3 ? "rgba(212,175,55,0.7)" : "rgba(220,100,100,0.75)",
                      }}
                    >
                      {hintMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={handleSubmit}
                  whileTap={{ scale: 0.96 }}
                  disabled={!value.trim()}
                  className="w-full btn-cinematic"
                  style={{
                    opacity: value.trim() ? 1 : 0.4,
                    cursor: value.trim() ? "pointer" : "not-allowed",
                    justifyContent: "center",
                  }}
                >
                  I remember 💌
                </motion.button>

                <p
                  className="text-center mt-4"
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "11px",
                    color: "rgba(245,240,232,0.25)",
                    letterSpacing: "0.05em",
                  }}
                >
                  This surprise won't be skipped that easily 😊
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 5.5vw, 26px)",
                    color: "var(--gold-light)",
                    lineHeight: 1.4,
                    marginBottom: 8,
                  }}
                >
                  You remembered. 🌹
                </p>
                <p
                  style={{
                    fontFamily: "var(--sans)",
                    fontSize: "13px",
                    color: "rgba(245,240,232,0.5)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Let's continue…
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
