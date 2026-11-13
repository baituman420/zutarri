import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Authentic Basque Txalaparta Audio Synthesis using Web Audio API.
 * Synthesizes acoustic makila impacts on aged timber planks (chestnut/oak)
 * and schedules the traditional "TAN-TAN, TAN, TAN-TAN, TAN" rhythmic dialogue.
 */
export function useSoundEffect() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastScrollSoundTimeRef = useRef(0);

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

  /**
   * Internal synthesis of a single acoustic wood strike at a scheduled time.
   */
  const scheduleWoodStrike = useCallback((
    ctx: AudioContext,
    time: number,
    frequency: number = 240,
    gainLevel: number = 0.5
  ) => {
    try {
      // 1. Transient click (stick impact on wood grain)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const clickFilter = ctx.createBiquadFilter();

      clickFilter.type = 'bandpass';
      clickFilter.frequency.setValueAtTime(1800, time);
      clickFilter.Q.setValueAtTime(3, time);

      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(frequency * 4, time);

      clickGain.gain.setValueAtTime(0.3 * gainLevel, time);
      clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.025);

      clickOsc.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(time);
      clickOsc.stop(time + 0.03);

      // 2. Wooden body primary resonance (hollow timber acoustic decay)
      const woodOsc = ctx.createOscillator();
      const woodGain = ctx.createGain();
      const woodFilter = ctx.createBiquadFilter();

      woodFilter.type = 'lowpass';
      woodFilter.frequency.setValueAtTime(frequency * 3.5, time);
      woodFilter.frequency.exponentialRampToValueAtTime(frequency * 1.2, time + 0.22);

      woodOsc.type = 'triangle';
      woodOsc.frequency.setValueAtTime(frequency, time);
      woodOsc.frequency.exponentialRampToValueAtTime(frequency * 0.96, time + 0.28);

      woodGain.gain.setValueAtTime(gainLevel, time);
      woodGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);

      woodOsc.connect(woodFilter);
      woodFilter.connect(woodGain);
      woodGain.connect(ctx.destination);

      woodOsc.start(time);
      woodOsc.stop(time + 0.38);

      // 3. Subtle sub-plank thump (deep table resonance)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(frequency * 0.5, time);
      subGain.gain.setValueAtTime(0.2 * gainLevel, time);
      subGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(time);
      subOsc.stop(time + 0.22);
    } catch (e) {
      console.warn('Web Audio synthesis error:', e);
    }
  }, []);

  /**
   * Play a single wood strike immediately.
   */
  const playWoodStrike = useCallback((frequency: number = 240, gainLevel: number = 0.5) => {
    if (!isSoundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    scheduleWoodStrike(ctx, ctx.currentTime, frequency, gainLevel);
  }, [isSoundEnabled, getAudioContext, scheduleWoodStrike]);

  /**
   * Schedule the traditional reference rhythm:
   * TAN-TAN, TAN, TAN-TAN, TAN
   * (Two alternating pitches representing two txalapartaris with makilak)
   */
  const playTxalapartaRhythm = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + 0.05;
    const pitchA = 215; // Deeper oak plank
    const pitchB = 265; // Higher resonant timber

    // Pattern:
    // 1. TAN-TAN: t=0, t=0.12
    scheduleWoodStrike(ctx, now, pitchA, 0.55);
    scheduleWoodStrike(ctx, now + 0.12, pitchB, 0.6);

    // 2. TAN: t=0.38
    scheduleWoodStrike(ctx, now + 0.38, pitchA, 0.5);

    // 3. TAN-TAN: t=0.70, t=0.82
    scheduleWoodStrike(ctx, now + 0.70, pitchB, 0.55);
    scheduleWoodStrike(ctx, now + 0.82, pitchA, 0.6);

    // 4. TAN: t=1.10 (Resonant final strike)
    scheduleWoodStrike(ctx, now + 1.10, pitchB, 0.7);
  }, [getAudioContext, scheduleWoodStrike]);

  const toggleSound = useCallback(() => {
    setIsSoundEnabled(prev => {
      const next = !prev;
      if (next) {
        // Activate AudioContext upon explicit user gesture and play initial rhythm
        const ctx = getAudioContext();
        if (ctx) {
          setTimeout(() => {
            playTxalapartaRhythm();
          }, 60);
        }
      }
      return next;
    });
  }, [getAudioContext, playTxalapartaRhythm]);

  /**
   * Throttled scroll accent: plays a subtle wood strike when crossing sections
   * with a minimum cooldown of 1.4s so it never clutters the ear.
   */
  const triggerScrollAccent = useCallback((frequency: number = 240) => {
    if (!isSoundEnabled) return;
    const now = performance.now();
    if (now - lastScrollSoundTimeRef.current < 1400) return;
    lastScrollSoundTimeRef.current = now;
    playWoodStrike(frequency, 0.35);
  }, [isSoundEnabled, playWoodStrike]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return {
    isSoundEnabled,
    toggleSound,
    playWoodStrike,
    playTxalapartaRhythm,
    triggerScrollAccent,
  };
}
