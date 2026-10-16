"use client";
import { useState, useCallback, useEffect } from "react";
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
import { PapaBlessingScene }    from "@/components/scenes/PapaBlessingScene";
import { WishSequenceScene }    from "@/components/scenes/WishSequenceScene";
import { YearAheadScene }       from "@/components/scenes/YearAheadScene";
import { FinalScene }           from "@/components/scenes/FinalScene";

import { ProgressIndicator }    from "@/components/ui/ProgressIndicator";
import { FloatingPetals }       from "@/components/ui/FloatingPetals";
import { haptic }               from "@/lib/utils";

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
  | "papaBlessing"
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
  "papaBlessing",
  "wishes",
  "yearAhead",
  "final",
];

// For progress indicator, skip loading/intro
const PROGRESS_SCENES: Scene[] = SCENE_ORDER.filter(
  (s) => s !== "loading" && s !== "intro"
);

// Bidirectional smooth transitions (vertical only, prevents horizontal drift)
const sceneVariants: Variants = {
  initial: (dir: number) => ({
    opacity: 0,
    scale: 0.98,
    y: dir > 0 ? 8 : -8,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 1.01,
    y: dir > 0 ? -8 : 8,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// ── Main component ────────────────────────────────────────
export default function BirthdayExperience() {
  const [scene, setScene] = useState<Scene>("loading");
  const [direction, setDirection] = useState<number>(1);
  const [key, setKey] = useState(0); // for replay

  const goTo = useCallback((s: Scene, dir: number = 1, pushToHistory = true) => {
    setDirection(dir);
    window.scrollTo({ top: 0, behavior: "instant" });
    setScene(s);
    if (pushToHistory && typeof window !== "undefined") {
      window.history.pushState({ scene: s }, "", `#${s}`);
    }
  }, []);

  // Sync initial state with browser history when loading finishes
  const handleLoadingComplete = useCallback(() => {
    goTo("intro", 1, false);
    if (typeof window !== "undefined") {
      window.history.replaceState({ scene: "intro" }, "", "#intro");
    }
  }, [goTo]);

  // Handle hardware / browser Back and Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const targetScene: Scene | undefined = e.state?.scene;
      if (targetScene && SCENE_ORDER.includes(targetScene)) {
        const currentIdx = SCENE_ORDER.indexOf(scene);
        const targetIdx = SCENE_ORDER.indexOf(targetScene);
        const dir = targetIdx >= currentIdx ? 1 : -1;
        setDirection(dir);
        setScene(targetScene);
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [scene]);

  const next = useCallback(() => {
    const currentIdx = SCENE_ORDER.indexOf(scene);
    if (currentIdx < SCENE_ORDER.length - 1) {
      goTo(SCENE_ORDER[currentIdx + 1], 1, true);
    }
  }, [scene, goTo]);

  const handleBack = useCallback(() => {
    const currentIdx = SCENE_ORDER.indexOf(scene);
    if (currentIdx <= 1) return; // Cannot go back beyond intro

    haptic([10, 16]);

    // If browser history has our state, pop back
    if (typeof window !== "undefined" && window.history.state?.scene) {
      window.history.back();
    } else {
      // Fallback manual step back
      const prevScene = SCENE_ORDER[currentIdx - 1];
      goTo(prevScene, -1, false);
    }
  }, [scene, goTo]);

  // Swipe right edge gesture support for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = Math.abs(touchEndY - touchStartY);

      // Edge swipe right: started on the left 35% of screen, moved right > 70px with low vertical movement
      if (diffX > 70 && diffY < 50 && touchStartX < window.innerWidth * 0.35) {
        handleBack();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleBack]);

  const handleBegin = useCallback(() => {
    next();
  }, [next]);

  const handleReplay = useCallback(() => {
    setKey((k) => k + 1);
    setDirection(-1);
    setScene("intro");
    if (typeof window !== "undefined") {
      window.history.replaceState({ scene: "intro" }, "", "#intro");
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const progressIndex = PROGRESS_SCENES.indexOf(scene);
  const showProgress = !["loading", "intro", "celebration", "final"].includes(scene);
  const showBack = scene !== "loading" && scene !== "intro" && scene !== "final";

  return (
    <div className="phone-frame relative overflow-x-hidden" key={key}>
      {/* Invisible Back Touch Area (Zero visual distraction, full back functionality) */}
      {showBack && (
        <div
          className="fixed z-50 w-full max-w-[430px] pointer-events-none px-4"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: "max(10px, env(safe-area-inset-top, 10px))",
          }}
        >
          <button
            onClick={handleBack}
            className="pointer-events-auto w-16 h-12 opacity-0 cursor-default"
            aria-label="Previous scene"
            tabIndex={-1}
          />
        </div>
      )}

      {/* Progress */}
      <ProgressIndicator
        current={progressIndex}
        total={PROGRESS_SCENES.length}
        visible={showProgress}
      />

      {/* Floating petals ambient layer — visible after loading */}
      {scene !== "loading" && <FloatingPetals />}

      {/* Scenes */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={scene}
          custom={direction}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full relative overflow-x-hidden max-w-full"
        >
          {scene === "loading" && <LoadingScene onComplete={handleLoadingComplete} />}
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
          {scene === "papaBlessing" && <PapaBlessingScene onContinue={next} />}
          {scene === "wishes" && <WishSequenceScene onContinue={next} />}
          {scene === "yearAhead" && <YearAheadScene onContinue={next} />}
          {scene === "final" && <FinalScene onReplay={handleReplay} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
