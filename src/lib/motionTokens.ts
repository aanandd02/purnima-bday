// Motion tokens — consistent animation language across the experience
export const duration = {
  micro: 0.15,       // 150ms — button press, icon swap
  standard: 0.4,    // 400ms — fade, slide, UI transitions
  cinematic: 1.0,   // 1000ms — scene transitions, reveals
  emotional: 2.0,   // 2000ms — hero moments
  slow: 3.0,        // 3000ms — very slow drifts
} as const;

export const ease = {
  out: [0.0, 0.0, 0.2, 1.0] as const,
  inOut: [0.4, 0.0, 0.2, 1.0] as const,
  cinematic: [0.16, 1, 0.3, 1] as const,
  spring: { type: "spring", stiffness: 100, damping: 30 },
  springSnappy: { type: "spring", stiffness: 200, damping: 25 },
} as const;

export const transition = {
  micro: { duration: duration.micro, ease: ease.out },
  standard: { duration: duration.standard, ease: ease.out },
  cinematic: { duration: duration.cinematic, ease: ease.cinematic },
  emotional: { duration: duration.emotional, ease: ease.cinematic },
  slow: { duration: duration.slow, ease: ease.inOut },
} as const;
