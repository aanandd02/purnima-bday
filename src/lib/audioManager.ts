/**
 * audioManager — no-op stub.
 * All audio has been removed from this experience.
 * This file exists only to satisfy existing import references without breaking builds.
 */

type SoundKey = string;

class AudioManager {
  load(_key: SoundKey, _src: string) {}
  play(_key: SoundKey, _opts?: { loop?: boolean; volume?: number }) {}
  stop(_key: SoundKey) {}
  fadeOut(_key: SoundKey, _duration?: number) {}
  setEnabled(_val: boolean) {}
  isEnabled() { return false; }
}

export const audioManager = new AudioManager();
