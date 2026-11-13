import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Global Audio Manager for Zutarri Jatetxea.
 * Coordinates authentic txalaparta audio (txalaparta-hero-audio.mp3) with
 * the hero video (txalaparta-hero.mp4), ensuring click-free smooth playback,
 * strict autoplay policy compliance, single-instance lifecycle, and subtle
 * ambient wood accents across the landing page.
 */
export function useSoundEffect() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  // Single shared HTMLAudioElement for txalaparta-hero-audio.mp3
  const heroAudioRef = useRef<HTMLAudioElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const isHeroActiveRef = useRef(true);
  const fadeRafRef = useRef<number | null>(null);

  // Web Audio Context for synthesized wood accents in non-hero sections
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastScrollSoundTimeRef = useRef(0);
  const lastDriftCheckTimeRef = useRef(0);

  // Lazy-initialize the single HTMLAudioElement instance
  const getHeroAudio = useCallback(() => {
    if (!heroAudioRef.current && typeof window !== 'undefined') {
      const audio = new Audio('./assets/video/txalaparta-hero-audio.mp3');
      audio.preload = 'auto';
      audio.loop = true;
      audio.volume = 0;
      heroAudioRef.current = audio;
    }
    return heroAudioRef.current;
  }, []);

  /**
   * Smoothly fade hero audio volume over durationMs using requestAnimationFrame
   * to eliminate any audio pops, clicks, or jarring cutoffs.
   */
  const fadeHeroAudio = useCallback((targetVolume: number, durationMs: number = 400, onComplete?: () => void) => {
    const audio = heroAudioRef.current;
    if (!audio) return;

    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }

    const startVolume = audio.volume;
    const startTime = performance.now();
    const delta = targetVolume - startVolume;

    if (Math.abs(delta) < 0.01) {
      audio.volume = targetVolume;
      if (onComplete) onComplete();
      return;
    }

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      // Smooth cosine easing curve
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      const currentVol = Math.max(0, Math.min(1, startVolume + delta * eased));

      audio.volume = currentVol;

      if (progress < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = targetVolume;
        fadeRafRef.current = null;
        if (onComplete) onComplete();
      }
    };

    fadeRafRef.current = requestAnimationFrame(step);
  }, []);

  /**
   * Start or resume hero audio synchronized with the hero video.
   */
  const playHeroAudioSync = useCallback(() => {
    const audio = getHeroAudio();
    if (!audio) return;

    const video = heroVideoRef.current;
    if (video && !isNaN(video.currentTime)) {
      // Align audio to the exact video frame
      if (Math.abs(audio.currentTime - video.currentTime) > 0.08) {
        audio.currentTime = video.currentTime;
      }
    }

    // Play with smooth fade-in
    audio.play().then(() => {
      fadeHeroAudio(1, 450);
    }).catch(err => {
      console.warn('Hero audio playback blocked or pending user interaction:', err);
    });
  }, [getHeroAudio, fadeHeroAudio]);

  /**
   * Pause hero audio with smooth fade-out.
   */
  const pauseHeroAudio = useCallback(() => {
    const audio = heroAudioRef.current;
    if (!audio || audio.paused) return;

    fadeHeroAudio(0, 350, () => {
      audio.pause();
    });
  }, [fadeHeroAudio]);

  /**
   * Attach the hero video element to coordinate playback, pausing, seeking and looping.
   */
  const attachHeroVideo = useCallback((video: HTMLVideoElement | null) => {
    // Clean up previous listeners if any
    const prevVideo = heroVideoRef.current;
    if (prevVideo && (prevVideo as any)._txalapartaListeners) {
      const { onPlay, onPause, onWaiting, onSeeked, onTimeUpdate } = (prevVideo as any)._txalapartaListeners;
      prevVideo.removeEventListener('play', onPlay);
      prevVideo.removeEventListener('pause', onPause);
      prevVideo.removeEventListener('waiting', onWaiting);
      prevVideo.removeEventListener('seeked', onSeeked);
      prevVideo.removeEventListener('timeupdate', onTimeUpdate);
      delete (prevVideo as any)._txalapartaListeners;
    }

    heroVideoRef.current = video;
    if (!video) return;

    const onPlay = () => {
      if (isSoundEnabled && isHeroActiveRef.current) {
        playHeroAudioSync();
      }
    };

    const onPause = () => {
      const audio = heroAudioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
      }
    };

    const onWaiting = () => {
      const audio = heroAudioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
      }
    };

    const onSeeked = () => {
      const audio = heroAudioRef.current;
      if (audio && !isNaN(video.currentTime)) {
        if (Math.abs(audio.currentTime - video.currentTime) > 0.15) {
          audio.currentTime = video.currentTime;
        }
      }
    };

    // Coordinated loop and smooth drift correction
    const onTimeUpdate = () => {
      const audio = heroAudioRef.current;
      if (!audio || audio.paused || !isSoundEnabled || !isHeroActiveRef.current) return;

      const vTime = video.currentTime;
      const aTime = audio.currentTime;

      // 1. Coordinated loop handling: video restarted at 0
      if (vTime < 0.25 && aTime > 7.5) {
        audio.currentTime = vTime;
        return;
      }

      // 2. Periodic gentle drift correction (checked at most once every 1.5s to preserve musicality)
      const now = performance.now();
      if (now - lastDriftCheckTimeRef.current > 1500) {
        lastDriftCheckTimeRef.current = now;
        const drift = Math.abs(aTime - vTime);
        if (drift > 0.18) {
          audio.currentTime = vTime;
        }
      }
    };

    (video as any)._txalapartaListeners = { onPlay, onPause, onWaiting, onSeeked, onTimeUpdate };
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('timeupdate', onTimeUpdate);

    // Initial check: if sound is already enabled and video is playing, start audio
    if (isSoundEnabled && !video.paused && isHeroActiveRef.current) {
      playHeroAudioSync();
    }
  }, [isSoundEnabled, playHeroAudioSync]);

  /**
   * Set hero visibility state (controlled by scroll).
   * When outside the hero, the 8-second hero loop fades out so it does not
   * fatigue the user during navigation.
   */
  const setHeroActive = useCallback((active: boolean) => {
    isHeroActiveRef.current = active;
    if (!isSoundEnabled) return;

    if (active) {
      playHeroAudioSync();
    } else {
      pauseHeroAudio();
    }
  }, [isSoundEnabled, playHeroAudioSync, pauseHeroAudio]);

  /**
   * Global toggle sound.
   */
  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const next = !prev;
      if (next) {
        // User gesture granted: play audio if currently in hero
        if (isHeroActiveRef.current) {
          playHeroAudioSync();
        }
      } else {
        // Mute/pause immediately
        pauseHeroAudio();
      }
      return next;
    });
  }, [playHeroAudioSync, pauseHeroAudio]);

  /**
   * Web Audio synthesis for subtle timber resonance during non-hero exploration.
   */
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playWoodStrike = useCallback((frequency: number = 240, gainLevel: number = 0.5) => {
    if (!isSoundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Subtle timber resonance for non-hero exploration
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(frequency * 3, now);
      filter.frequency.exponentialRampToValueAtTime(frequency * 1.1, now + 0.2);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, now);

      gain.gain.setValueAtTime(gainLevel * 0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Wood strike error:', e);
    }
  }, [isSoundEnabled, getAudioContext]);

  /**
   * Throttled scroll accent when moving across sections.
   */
  const triggerScrollAccent = useCallback((frequency: number = 240) => {
    if (!isSoundEnabled) return;
    const now = performance.now();
    if (now - lastScrollSoundTimeRef.current < 1600) return;
    lastScrollSoundTimeRef.current = now;
    playWoodStrike(frequency, 0.3);
  }, [isSoundEnabled, playWoodStrike]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (fadeRafRef.current) {
        cancelAnimationFrame(fadeRafRef.current);
      }
      if (heroAudioRef.current) {
        heroAudioRef.current.pause();
        heroAudioRef.current.src = '';
        heroAudioRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isSoundEnabled,
    toggleSound,
    attachHeroVideo,
    setHeroActive,
    playHeroAudioSync,
    playWoodStrike,
    triggerScrollAccent,
  };
}
