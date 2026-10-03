"use client";

import { useEffect, useRef } from "react";
import { birthdayConfig } from "./birthdayConfig";

type SoundKey = keyof typeof birthdayConfig.audio;

class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private bgAudio: HTMLAudioElement | null = null;

  load(key: SoundKey, src: string) {
    if (typeof window === "undefined") return;
    try {
      const audio = new Audio(src);
      audio.preload = "none";
      this.sounds.set(key, audio);
    } catch (e) {
      console.warn(`[AudioManager] Could not load ${key}:`, e);
    }
  }

  play(key: SoundKey, { loop = false, volume = 1 } = {}) {
    if (!this.enabled) return;
    const audio = this.sounds.get(key);
    if (!audio) return;
    try {
      audio.loop = loop;
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch (e) {
      console.warn(`[AudioManager] Could not play ${key}:`, e);
    }
  }

  stop(key: SoundKey) {
    const audio = this.sounds.get(key);
    if (!audio) return;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
  }

  fadeOut(key: SoundKey, duration = 1000) {
    const audio = this.sounds.get(key);
    if (!audio) return;
    const startVolume = audio.volume;
    const step = startVolume / (duration / 50);
    const interval = setInterval(() => {
      if (audio.volume > step) {
        audio.volume = Math.max(0, audio.volume - step);
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(interval);
      }
    }, 50);
  }

  setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) {
      this.sounds.forEach((audio) => {
        if (!audio.paused) audio.pause();
      });
    }
  }

  isEnabled() {
    return this.enabled;
  }
}

export const audioManager = new AudioManager();
