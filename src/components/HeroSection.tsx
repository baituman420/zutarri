import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Phone, Volume2, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Language } from '../types';
import { translations } from '../data/translations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroSectionProps {
  currentLang: Language;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  attachHeroVideo?: (video: HTMLVideoElement | null) => void;
  setHeroActive?: (active: boolean) => void;
  playHeroAudioSync?: () => void;
  playWoodStrike: (frequency: number) => void;
  triggerScrollAccent?: (frequency: number) => void;
  onOpenMenuModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  isSoundEnabled,
  onToggleSound,
  attachHeroVideo,
  setHeroActive,
  playHeroAudioSync,
  playWoodStrike: _playWoodStrike,
  triggerScrollAccent,
  onOpenMenuModal,
}) => {
  const t = translations[currentLang];
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pulseActive, setPulseActive] = useState(false);

  // Attach hero video to the global audio manager for synchronized playback
  useEffect(() => {
    if (attachHeroVideo && videoRef.current) {
      attachHeroVideo(videoRef.current);
    }
    return () => {
      if (attachHeroVideo) {
        attachHeroVideo(null);
      }
    };
  }, [attachHeroVideo]);

  // Handle prefers-reduced-motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  // GSAP Cinematic Entrance Sequence & Parallax
  useGSAP(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    // Cinematic awakening timeline synced to the initial txalaparta impact
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.1,
    });

    tl.from('.hero-stone-emblem', {
      opacity: 0,
      scale: 0.88,
      filter: 'brightness(0.6)',
      duration: 0.85,
      ease: 'back.out(1.2)',
    })
      .from(
        '.hero-brand-title',
        {
          opacity: 0,
          y: 20,
          letterSpacing: '0.34em',
          duration: 0.75,
          ease: 'power2.out',
        },
        '-=0.45'
      )
      .from(
        '.hero-brand-subtitle',
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
        },
        '-=0.35'
      )
      .from(
        '.hero-motto',
        {
          opacity: 0,
          y: 12,
          duration: 0.55,
        },
        '-=0.3'
      )
      .from(
        '.hero-actions',
        {
          opacity: 0,
          y: 14,
          duration: 0.5,
        },
        '-=0.25'
      )
      .from(
        ['.hero-top-meta', '.hero-bottom-bar'],
        {
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        '-=0.2'
      );

    // Fluid Scroll Parallax & Dissolve: Gentle upward float and dimming as user enters Sustraiak
    gsap.to('.hero-content-wrap', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom 20%',
        scrub: 1,
        onLeave: () => {
          setHeroActive?.(false);
          triggerScrollAccent?.(220);
        },
        onEnterBack: () => {
          setHeroActive?.(true);
        },
      },
      yPercent: -10,
      opacity: 0.18,
      ease: 'none',
    });
  }, { scope: heroRef });

  const handleRhythmPlay = () => {
    if (!isSoundEnabled) {
      onToggleSound();
    } else if (playHeroAudioSync) {
      playHeroAudioSync();
    }
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 1200);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-16 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-16 select-none bg-[#07080a]"
      aria-label="Zutarri Jatetxea Hero"
    >
      {/* Full-Bleed Authentic Txalaparta Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#07080a]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="./assets/video/txalaparta-hero-poster.webp"
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-[0.52] scale-[1.02] transition-transform duration-1000 ease-out"
          aria-label="Txalaparta makilen kolpea zurezko ohol zaharrean eta arto-irinaren hegaldia"
        >
          <source src="./assets/video/txalaparta-hero.mp4" type="video/mp4" />
          <img
            src="./assets/video/txalaparta-hero-poster.webp"
            alt="Txalaparta makilen kolpea zurezko ohol zaharrean"
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-[0.52]"
          />
        </video>

        {/* Chiaroscuro Atmospheric Vignettes to unify video, stone and typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/85 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 48%, rgba(7,8,10,0.2) 0%, rgba(7,8,10,0.8) 70%, rgba(7,8,10,0.98) 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none" />
      </div>

      {/* Top Meta Bar: Geographic Coordinates & Open Status */}
      <div className="hero-top-meta relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#d49b42]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] inline-block animate-pulse" />
          <span>01 // {t.hero.badge}</span>
          <span className="text-white/20 hidden sm:inline">·</span>
          <span className="hidden sm:inline text-[#9ca3af]">43.2361° N, 2.8887° W</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-[#9ca3af]">
          <div className="flex items-center gap-1.5 text-[#e5e7eb]">
            <MapPin className="w-3.5 h-3.5 text-[#d49b42]" />
            <span>Bentako Plaza, 3 · Ariz Metroa</span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-[#15803d] font-semibold bg-[#0c140e]/80 px-2 py-0.5 rounded-full border border-[#1e3825]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
            <span>Gaur irekita</span>
          </span>
        </div>
      </div>

      {/* Main Unified Identity Centerpiece: Stone Logo + Monumental ZUTARRI + Relocated Motto */}
      <div className="hero-content-wrap relative z-10 my-auto py-3 sm:py-6 flex flex-col items-center text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
        {/* Protagonist Stone Logo: Organic circular cromlech & dolmen floating above the txalaparta */}
        <div className="hero-stone-emblem relative w-32 sm:w-44 md:w-56 lg:w-60 aspect-square mx-auto cursor-pointer group">
          {/* Subtle warm amber ambient warmth */}
          <div className="absolute -inset-3 rounded-full bg-[#d49b42]/10 blur-xl group-hover:bg-[#d49b42]/20 transition-all duration-700 pointer-events-none" />
          <img
            src="./assets/logo-piedras-isolated.webp"
            alt="Zutarri harrizko cromlech eta trikuharri logotipoa"
            onClick={handleRhythmPlay}
            className="w-full h-full object-contain filter contrast-125 brightness-110 drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            title="Klikatu txalapartaren erritmoa entzuteko"
          />
        </div>

        {/* Monumental Word: ZUTARRI (Accessible HTML Typography) */}
        <div className="space-y-1">
          <h1 className="hero-brand-title font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.22em] text-[#f3f4f6] uppercase leading-none drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)] pl-[0.22em]">
            ZUTARRI
          </h1>
          <p className="hero-brand-subtitle font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.45em] text-[#d49b42] font-semibold pl-[0.45em]">
            JATETXEA · BASAURI
          </p>
        </div>

        {/* Re-located Previous Headline: Discrete, Elegant Secondary Editorial Motto */}
        <div className="hero-motto max-w-xl mx-auto pt-0.5">
          <p className="font-editorial italic text-sm sm:text-lg md:text-xl text-[#e5e7eb] leading-snug drop-shadow-md">
            «{currentLang === 'eu' ? 'Artoaren memoria, gaurko sukaldean' : 'La memoria del maíz, en la cocina de hoy'}»
          </p>
        </div>

        {/* Direct Action CTAs & Sound Trigger */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-2 sm:pt-3">
          <button
            onClick={onOpenMenuModal}
            className="px-5 sm:px-7 py-3 sm:py-3.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#07080a] hover:text-white font-mono text-[11px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center gap-2 group cursor-pointer shadow-2xl"
          >
            <span>{t.hero.ctaMenu}</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="tel:+34688766398"
            className="px-5 sm:px-7 py-3 sm:py-3.5 bg-[#0a0c10]/85 hover:bg-white/10 text-[#f3f4f6] border border-white/20 hover:border-white/50 font-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm flex items-center gap-2 group cursor-pointer backdrop-blur-sm"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d49b42]" />
            <span>{t.hero.ctaBook}</span>
          </a>

          {/* Authentic Txalaparta Rhythm Trigger (TAN-TAN, TAN, TAN-TAN, TAN) */}
          <button
            onClick={handleRhythmPlay}
            className={`px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-sm border font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 backdrop-blur-sm ${
              pulseActive || isSoundEnabled
                ? 'bg-[#d49b42]/20 border-[#d49b42] text-[#d49b42]'
                : 'bg-[#0a0c10]/80 border-white/15 text-[#9ca3af] hover:text-white hover:border-white/40'
            }`}
            title="Txalapartaren erreferentziazko erritmoa entzun (TAN-TAN, TAN, TAN-TAN, TAN)"
            aria-label="Txalapartaren erreferentziazko erritmoa entzun"
          >
            <Volume2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${pulseActive ? 'animate-bounce text-[#d49b42]' : 'text-[#d49b42]'}`} />
            <span className="text-[10px] sm:text-[11px] font-mono">
              {pulseActive
                ? (currentLang === 'eu' ? 'Txalaparta Jotzen…' : 'Sonando…')
                : isSoundEnabled
                ? (currentLang === 'eu' ? 'Txalaparta Erritmoa' : 'Ritmo Txalaparta')
                : (currentLang === 'eu' ? 'Entzun Erritmoa' : 'Escuchar Ritmo')}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Scene Bar: Section Jump & Downward Cue to Sustraiak */}
      <div className="hero-bottom-bar relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2.5 border-t border-white/10 text-xs font-mono text-[#9ca3af]">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 uppercase tracking-[0.2em] text-[10px] sm:text-[11px]">
          <span className="text-white/30 hidden lg:inline">{t.hero.quickJump}</span>
          {[
            { id: 'sustraiak', label: '01 Sustraiak' },
            { id: 'indarra', label: '02 Indarra' },
            { id: 'sukaldaritza', label: '03 Sukaldaritza' },
            { id: 'gure-etxea', label: '04 Gure Etxea' },
            { id: 'kontaktua', label: '05 Kontaktua' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToSection('sustraiak')}
          className="flex items-center gap-2 text-[#d49b42] hover:text-white transition-colors cursor-pointer group"
          aria-label="Jaitsi Sustraiak atalera"
        >
          <span className="uppercase tracking-widest text-[10px] sm:text-[11px]">
            {currentLang === 'eu' ? 'Sustraiak Ezagutu' : 'Descubrir Sustraiak'}
          </span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
