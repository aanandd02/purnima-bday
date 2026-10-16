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

// Bidirectional smooth transitions
const sceneVariants: Variants = {
  initial: (dir: number) => ({
    opacity: 0,
    scale: 0.98,
    x: dir > 0 ? 12 : -12,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0,
    scale: 1.01,
    x: dir > 0 ? -12 : 12,
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
    <div className="phone-frame relative" key={key}>
      {/* ── Floating VIP Glass Back Button (Top Left) ── */}
      <AnimatePresence>
        {showBack && (
          <div
            className="fixed z-50 w-full max-w-[430px] pointer-events-none px-4"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              top: "max(14px, env(safe-area-inset-top, 14px))",
            }}
          >
            <motion.button
              initial={{ opacity: 0, x: -10, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              onClick={handleBack}
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer select-none"
              style={{
                background: "rgba(18, 11, 16, 0.65)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow:
                  "0 4px 18px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 235, 175, 0.2)",
              }}
              aria-label="Previous page"
            >
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "13px",
                  color: "var(--gold-light)",
                  lineHeight: 1,
                  fontWeight: 700,
                  marginTop: "-1px",
                }}
              >
                ‹
              </span>
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "10.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: "var(--cream)",
                }}
              >
                Back
              </span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

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
          className="w-full relative"
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
          {scene === "wishes" && <WishSequenceScene onContinue={next} />}
          {scene === "yearAhead" && <YearAheadScene onContinue={next} />}
          {scene === "final" && <FinalScene onReplay={handleReplay} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
