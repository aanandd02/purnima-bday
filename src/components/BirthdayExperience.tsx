"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

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
import { FinalScene }           from "@/components/scenes/FinalScene";

import { ProgressIndicator }    from "@/components/ui/ProgressIndicator";
import { FloatingPetals }       from "@/components/ui/FloatingPetals";

// ── Scene order ───────────────────────────────────────────
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
  "final",
];

// For progress indicator, skip loading/intro
const PROGRESS_SCENES: Scene[] = SCENE_ORDER.filter(
  (s) => s !== "loading" && s !== "intro"
);

const sceneVariants: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 8 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 1.01,
    y: -8,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ── Main component ────────────────────────────────────────
export default function BirthdayExperience() {
  const [scene, setScene] = useState<Scene>("loading");
  const [key, setKey] = useState(0); // for replay

  const goTo = useCallback((s: Scene) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setScene(s);
  }, []);

  const next = useCallback(() => {
    const currentIdx = SCENE_ORDER.indexOf(scene);
    if (currentIdx < SCENE_ORDER.length - 1) {
      goTo(SCENE_ORDER[currentIdx + 1]);
    }
  }, [scene, goTo]);

  const handleBegin = useCallback(() => {
    next();
  }, [next]);

  const handleReplay = useCallback(() => {
    setKey((k) => k + 1);
    setScene("intro");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

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

      {/* Scenes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full relative"
        >
          {scene === "loading" && <LoadingScene onComplete={() => goTo("intro")} />}
          {scene === "intro" && <IntroScene onBegin={handleBegin} />}
          {scene === "countdown" && <CountdownScene onContinue={next} />}
          {scene === "photoReveal" && <PhotoRevealScene onContinue={next} />}
          {scene === "memory" && <MemoryScene onContinue={next} />}
          {scene === "video" && <VideoScene onContinue={next} />}
          {scene === "reasons" && <ReasonsScene onContinue={next} />}
          {scene === "envelope" && <EnvelopeScene onContinue={next} />}
          {scene === "cakeTransition" && <CakeTransitionScene onContinue={next} />}
          {scene === "cake" && <CakeScene onBlown={next} audioEnabled={false} />}
          {scene === "celebration" && <CelebrationScene onContinue={next} audioEnabled={false} />}
          {scene === "wishes" && <WishSequenceScene onContinue={next} />}
          {scene === "yearAhead" && <YearAheadScene onContinue={next} />}
          {scene === "final" && <FinalScene onReplay={handleReplay} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
