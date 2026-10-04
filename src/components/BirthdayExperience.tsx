"use client";
import { useState, useCallback, useEffect, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LoadingScene }         from "@/components/scenes/LoadingScene";
import { IntroScene }           from "@/components/scenes/IntroScene";
import { CountdownScene }       from "@/components/scenes/CountdownScene";
import { PhotoRevealScene }     from "@/components/scenes/PhotoRevealScene";
import { MemoryScene }          from "@/components/scenes/MemoryScene";
import { VideoScene }           from "@/components/scenes/VideoScene";
import { ReasonsScene }         from "@/components/scenes/ReasonsScene";
import { EnvelopeScene }        from "@/components/scenes/EnvelopeScene";
import { CakeTransitionScene }  from "@/components/scenes/CakeTransitionScene";
import { CakeScene }            from "@/components/scenes/CakeScene";
import { CelebrationScene }     from "@/components/scenes/CelebrationScene";
import { WishSequenceScene }    from "@/components/scenes/WishSequenceScene";
import { YearAheadScene }       from "@/components/scenes/YearAheadScene";
import { MemoryWallScene }      from "@/components/scenes/MemoryWallScene";
import { LoveNoteScene }        from "@/components/scenes/LoveNoteScene";
import { FinalScene }           from "@/components/scenes/FinalScene";

import { AudioController }      from "@/components/ui/AudioController";
import { ProgressIndicator }    from "@/components/ui/ProgressIndicator";
import { FloatingPetals }       from "@/components/ui/FloatingPetals";
import { LoverGate }            from "@/components/ui/LoverGate";
import { audioManager }         from "@/lib/audioManager";
import { birthdayConfig }       from "@/lib/birthdayConfig";
import { asset }                from "@/lib/assetPath";

// ── Scene order ──────────────────────────────────────────
type Scene =
  | "loading"
  | "intro"
  | "countdown"
  | "photoReveal"
  | "memory"
  | "video"
  | "reasons"
  | "envelope"
  | "cakeTransition"
  | "cake"
  | "celebration"
  | "wishes"
  | "yearAhead"
  | "memoryWall"
  | "loveNote"
  | "final";

const SCENE_ORDER: Scene[] = [
  "loading",
  "intro",
  "countdown",
  "photoReveal",
  "memory",
  "video",
  "reasons",
  "envelope",
  "cakeTransition",
  "cake",
  "celebration",
  "wishes",
  "yearAhead",
  "memoryWall",
  "loveNote",
  "final",
];

// For progress indicator, skip loading/intro
const PROGRESS_SCENES: Scene[] = SCENE_ORDER.filter(
  (s) => s !== "loading" && s !== "intro"
);

// ── Audio setup ──────────────────────────────────────────
function initAudio() {
  const a = birthdayConfig.audio;
  audioManager.load("background", asset(a.background));
  audioManager.load("candle", asset(a.candle));
  audioManager.load("celebration", asset(a.celebration));
  audioManager.load("fireworks", asset(a.fireworks));
}

// ── Main component ───────────────────────────────────────
export default function BirthdayExperience() {
  const [scene, setScene] = useState<Scene>("loading");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [key, setKey] = useState(0); // for replay
  // LoverGate — blocks scene skip with a secret question
  const [gateOpen, setGateOpen] = useState(false);
  const [pendingNext, setPendingNext] = useState<(() => void) | null>(null);

  const goTo = useCallback((s: Scene) => {
    // Scroll to top on scene change (mobile)
    window.scrollTo({ top: 0, behavior: "instant" });
    setScene(s);
  }, []);

  const next = useCallback(() => {
    const currentIdx = SCENE_ORDER.indexOf(scene);
    if (currentIdx < SCENE_ORDER.length - 1) {
      goTo(SCENE_ORDER[currentIdx + 1]);
    }
  }, [scene, goTo]);

  // Gate-protected next — used on scenes where skipping should be locked
  const nextWithGate = useCallback(() => {
    const currentIdx = SCENE_ORDER.indexOf(scene);
    if (currentIdx < SCENE_ORDER.length - 1) {
      const targetScene = SCENE_ORDER[currentIdx + 1];
      // Open lover gate, store what to do on unlock
      setPendingNext(() => () => goTo(targetScene));
      setGateOpen(true);
    }
  }, [scene, goTo]);

  const handleGateUnlock = useCallback(() => {
    setGateOpen(false);
    if (pendingNext) {
      pendingNext();
      setPendingNext(null);
    }
  }, [pendingNext]);

  // Initialize audio on first user interaction
  const handleBegin = useCallback(() => {
    if (!audioInitialized) {
      initAudio();
      setAudioInitialized(true);
      setAudioEnabled(true);
      audioManager.setEnabled(true);
      // Start background music softly
      setTimeout(() => {
        audioManager.play("background", { loop: true, volume: 0.25 });
      }, 300);
    }
    next();
  }, [audioInitialized, next]);

  const handleToggleAudio = useCallback(() => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    audioManager.setEnabled(next);
    if (next) {
      // If re-enabling, restart BG music if on appropriate scene
      audioManager.play("background", { loop: true, volume: 0.25 });
    } else {
      audioManager.stop("background");
    }
  }, [audioEnabled]);

  const handleReplay = useCallback(() => {
    // Stop all audio
    audioManager.setEnabled(false);
    setAudioEnabled(false);
    setAudioInitialized(false);
    setKey((k) => k + 1);
    setScene("intro"); // Skip loading on replay
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Progress index
  const progressIndex = PROGRESS_SCENES.indexOf(scene);
  const showProgress = !["loading", "intro", "celebration", "final"].includes(scene);

  return (
    <div className="phone-frame relative" key={key}>
      {/* Progress */}
      <ProgressIndicator
        current={progressIndex}
        total={PROGRESS_SCENES.length}
        visible={showProgress}
      />

      {/* Floating petals ambient layer — visible after loading */}
      {scene !== "loading" && <FloatingPetals />}

      {/* Audio control — visible after intro */}
      {scene !== "loading" && scene !== "intro" && (
        <AudioController enabled={audioEnabled} onToggle={handleToggleAudio} />
      )}

      {/* Scenes */}
      <AnimatePresence mode="wait">
        {scene === "loading" && (
          <motion.div key="loading">
            <LoadingScene onComplete={() => goTo("intro")} />
          </motion.div>
        )}
        {scene === "intro" && (
          <motion.div key="intro">
            <IntroScene onBegin={handleBegin} />
          </motion.div>
        )}
        {scene === "countdown" && (
          <motion.div key="countdown">
            <CountdownScene onContinue={nextWithGate} />
          </motion.div>
        )}
        {scene === "photoReveal" && (
          <motion.div key="photoReveal">
            <PhotoRevealScene onContinue={next} />
          </motion.div>
        )}
        {scene === "memory" && (
          <motion.div key="memory">
            <MemoryScene onContinue={next} />
          </motion.div>
        )}
        {scene === "video" && (
          <motion.div key="video">
            <VideoScene onContinue={next} />
          </motion.div>
        )}
        {scene === "reasons" && (
          <motion.div key="reasons">
            <ReasonsScene onContinue={next} />
          </motion.div>
        )}
        {scene === "envelope" && (
          <motion.div key="envelope">
            <EnvelopeScene onContinue={next} />
          </motion.div>
        )}
        {scene === "cakeTransition" && (
          <motion.div key="cakeTransition">
            <CakeTransitionScene onContinue={next} />
          </motion.div>
        )}
        {scene === "cake" && (
          <motion.div key="cake">
            <CakeScene onBlown={next} audioEnabled={audioEnabled} />
          </motion.div>
        )}
        {scene === "celebration" && (
          <motion.div key="celebration">
            <CelebrationScene onContinue={next} audioEnabled={audioEnabled} />
          </motion.div>
        )}
        {scene === "wishes" && (
          <motion.div key="wishes">
            <WishSequenceScene onContinue={next} />
          </motion.div>
        )}
        {scene === "yearAhead" && (
          <motion.div key="yearAhead">
            <YearAheadScene onContinue={next} />
          </motion.div>
        )}
        {scene === "memoryWall" && (
          <motion.div key="memoryWall">
            <MemoryWallScene onContinue={next} />
          </motion.div>
        )}
        {scene === "loveNote" && (
          <motion.div key="loveNote">
            <LoveNoteScene onContinue={next} />
          </motion.div>
        )}
        {scene === "final" && (
          <motion.div key="final">
            <FinalScene onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lover Gate — blocks scene skip with secret question */}
      <AnimatePresence>
        {gateOpen && (
          <LoverGate onUnlock={handleGateUnlock} />
        )}
      </AnimatePresence>
    </div>
  );
}
