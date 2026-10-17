/**
 * audioManager — HTML5 Audio Manager for sound effects.
 * Safe for SSR and client navigation.
 */

type SoundKey = string;

interface PlayOptions {
  loop?: boolean;
  volume?: number;
  src?: string;
}

class AudioManager {
  private sounds: Map<SoundKey, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  load(key: SoundKey, src: string) {
    if (typeof window === "undefined") return;
    if (!this.sounds.has(key)) {
      const audio = new Audio(src);
      audio.preload = "auto";
      this.sounds.set(key, audio);
    }
  }

  play(key: SoundKey, opts?: PlayOptions) {
    if (typeof window === "undefined" || !this.enabled) return;

    let audio = this.sounds.get(key);
    if (!audio && opts?.src) {
      this.load(key, opts.src);
      audio = this.sounds.get(key);
    }
    if (!audio) return;

    audio.loop = !!opts?.loop;
    audio.volume = opts?.volume ?? 1;
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignored if browser blocks autoplay before user gesture
    });
  }

  stop(key: SoundKey) {
    if (typeof window === "undefined") return;
    const audio = this.sounds.get(key);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  fadeOut(key: SoundKey, duration: number = 400) {
    if (typeof window === "undefined") return;
    const audio = this.sounds.get(key);
    if (!audio) return;

    const startVol = audio.volume;
    const steps = 10;
    const stepTime = duration / steps;
    const volStep = startVol / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      audio.volume = Math.max(0, startVol - volStep * step);
      if (step >= steps || audio.volume <= 0) {
        clearInterval(timer);
        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVol;
      }
    }, stepTime);
  }

  setEnabled(val: boolean) {
    this.enabled = val;
    if (!val) {
      this.sounds.forEach((audio) => {
        audio.pause();
      });
    }
  }

  isEnabled() {
    return this.enabled;
  }
}

export const audioManager = new AudioManager();

