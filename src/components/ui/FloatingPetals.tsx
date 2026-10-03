"use client";
import { useEffect, useRef } from "react";

const PETAL_COUNT = 20;
const SPARKLE_COUNT = 12;

// Rose petal SVG path (simple abstract leaf shape)
const petalPath =
  "M12 2 C8 4, 2 10, 4 16 C6 22, 12 24, 12 24 C12 24, 18 22, 20 16 C22 10, 16 4, 12 2 Z";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function FloatingPetals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Build CSS keyframes dynamically once
    const styleId = "floating-petals-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes petalFall {
          0%   { transform: translateY(-60px) translateX(0px) rotate(0deg);   opacity: 0; }
          8%   { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { transform: translateY(110vh) translateX(var(--drift)) rotate(var(--spin)); opacity: 0; }
        }
        @keyframes sparklePulse {
          0%, 100% { transform: scale(0.4) rotate(0deg);   opacity: 0; }
          30%       { transform: scale(1)   rotate(45deg);  opacity: 0.85; }
          60%       { transform: scale(0.6) rotate(90deg);  opacity: 0.4; }
        }
        .fp-petal {
          position: fixed;
          pointer-events: none;
          will-change: transform, opacity;
          animation: petalFall linear infinite;
        }
        .fp-sparkle {
          position: fixed;
          pointer-events: none;
          will-change: transform, opacity;
          animation: sparklePulse ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }

    // Petals
    const elements: HTMLElement[] = [];

    for (let i = 0; i < PETAL_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "fp-petal";

      const size = rand(10, 22);
      const left = rand(0, 100);
      const duration = rand(12, 26);
      const delay = rand(-duration, 0);
      const drift = rand(-80, 80);
      const spin = rand(-300, 300);
      const opacity = rand(0.25, 0.55);

      // Choose petal color: rose pink or gold
      const colors = [
        "rgba(255,182,193,VAR)",   // rose pink
        "rgba(220,150,170,VAR)",   // mauve
        "rgba(201,169,110,VAR)",   // gold
        "rgba(255,215,200,VAR)",   // peach
      ];
      const color = colors[Math.floor(Math.random() * colors.length)].replace("VAR", String(opacity));

      el.style.cssText = `
        left: ${left}%;
        top: -60px;
        width: ${size}px;
        height: ${size * 1.3}px;
        --drift: ${drift}px;
        --spin: ${spin}deg;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        z-index: 5;
      `;

      // SVG petal
      el.innerHTML = `<svg viewBox="0 0 24 26" width="${size}" height="${size * 1.3}" xmlns="http://www.w3.org/2000/svg" style="filter:blur(0.3px)"><path d="${petalPath}" fill="${color}"/></svg>`;

      container.appendChild(el);
      elements.push(el);
    }

    // Sparkles
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "fp-sparkle";

      const size = rand(6, 14);
      const left = rand(2, 98);
      const top = rand(5, 90);
      const duration = rand(3, 7);
      const delay = rand(0, -duration);
      const opacity = rand(0.3, 0.7);

      el.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        z-index: 5;
        opacity: ${opacity};
      `;

      el.innerHTML = `<svg viewBox="0 0 20 20" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="10,1 11.5,8.5 19,10 11.5,11.5 10,19 8.5,11.5 1,10 8.5,8.5" fill="rgba(201,169,110,0.85)"/>
      </svg>`;

      container.appendChild(el);
      elements.push(el);
    }

    return () => {
      elements.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
}
