import { useState, useRef, useCallback } from 'react';

export function useSoundEffect() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

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

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const next = !prev;
      if (next) {
        getAudioContext();
      }
      return next;
    });
  }, [getAudioContext]);

  /**
   * Synthesize an authentic acoustic Basque txalaparta wooden strike (makila against oak/chestnut plank)
   * @param frequency Fundamental resonance frequency of the wood plank (e.g. 220, 275, 330, 392 Hz)
   */
  const playWoodStrike = useCallback((frequency: number = 240) => {
    if (!isSoundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Transient click (stick impact on wood grain)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const clickFilter = ctx.createBiquadFilter();

      clickFilter.type = 'bandpass';
      clickFilter.frequency.setValueAtTime(1800, now);
      clickFilter.Q.setValueAtTime(3, now);

      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(frequency * 4, now);

      clickGain.gain.setValueAtTime(0.35, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      clickOsc.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(now);
      clickOsc.stop(now + 0.03);

      // 2. Wooden body primary resonance (hollow timber acoustic decay)
      const woodOsc = ctx.createOscillator();
      const woodGain = ctx.createGain();
      const woodFilter = ctx.createBiquadFilter();

      woodFilter.type = 'lowpass';
      woodFilter.frequency.setValueAtTime(frequency * 3.5, now);
      woodFilter.frequency.exponentialRampToValueAtTime(frequency * 1.2, now + 0.2);

      woodOsc.type = 'triangle';
      woodOsc.frequency.setValueAtTime(frequency, now);
      woodOsc.frequency.exponentialRampToValueAtTime(frequency * 0.96, now + 0.25);

      woodGain.gain.setValueAtTime(0.5, now);
      woodGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      woodOsc.connect(woodFilter);
      woodFilter.connect(woodGain);
      woodFilter.connect(ctx.destination);

      woodOsc.start(now);
      woodOsc.stop(now + 0.35);

      // 3. Subtle sub-plank thump (deep table resonance)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(frequency * 0.5, now);
      subGain.gain.setValueAtTime(0.25, now);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 0.2);

    } catch (e) {
      console.warn('Web Audio synthesis error:', e);
    }
  }, [isSoundEnabled, getAudioContext]);

  return {
    isSoundEnabled,
    toggleSound,
    playWoodStrike,
  };
}
