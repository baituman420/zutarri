import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Phone, Volume2, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  currentLang: Language;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  playWoodStrike: (frequency: number) => void;
  onOpenMenuModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  isSoundEnabled,
  onToggleSound,
  playWoodStrike,
  onOpenMenuModal,
}) => {
  const t = translations[currentLang];
  const [pulseActive, setPulseActive] = useState(false);

  const handleAcousticStrike = () => {
    if (!isSoundEnabled) {
      onToggleSound();
    }
    setPulseActive(true);
    playWoodStrike(261.63); // Middle C timber makila resonance
    setTimeout(() => setPulseActive(false), 500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-4 sm:px-8 lg:px-16 overflow-x-hidden select-none bg-[#07080a]"
    >
      {/* Full-Bleed Authentic Hero Photographic Scene: Golpe de mazos sobre madera envejecida */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/hero-mazos.webp"
          alt="Txalaparta makilen kolpea zurezko ohol zaharrean arto-hautsarekin"
          className="w-full h-full object-cover object-center grayscale contrast-125 brightness-[0.62] transition-transform duration-1000 ease-out"
        />

        {/* Chiaroscuro Atmospheric Vignettes to integrate typography without cards */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/90 via-[#07080a]/40 to-transparent pointer-events-none" />
      </div>

      {/* Top Meta & Geographic Coordinates */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#d49b42]">
          <span className="w-2 h-2 rounded-full bg-[#d49b42] inline-block animate-pulse" />
          <span>01 // {t.hero.badge}</span>
          <span className="text-[#4b505c] hidden sm:inline">·</span>
          <span className="hidden sm:inline text-[#9ca3af]">43.2361° N, 2.8887° W</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#9ca3af]">
          <div className="flex items-center gap-1.5 text-[#e5e7eb]">
            <MapPin className="w-3.5 h-3.5 text-[#d49b42]" />
            <span>Bentako Plaza, 3 · Ariz Metroa (3 min)</span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[#15803d] font-semibold bg-[#0c140e]/80 px-2.5 py-0.5 rounded-full border border-[#1e3825]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
            <span>Gaur irekita</span>
          </span>
        </div>
      </div>

      {/* Main Photographic Scene Typography (Placed organically in negative space) */}
      <div className="relative z-10 mt-6 mb-8 sm:my-auto py-4 sm:py-12 max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#d49b42] font-semibold">
            {currentLang === 'eu' ? 'HARRI, ARTO ETA EGUR SOINUA' : 'SONIDO DE PIEDRA, MAÍZ Y MADERA'}
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#f3f4f6] uppercase leading-[0.94] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          {t.hero.title}
        </h1>

        {/* Editorial Philosophy Quote */}
        <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-[#e5e7eb] border-l-2 border-[#d49b42] pl-5 max-w-2xl leading-snug drop-shadow-md">
          «{t.hero.subtitle}»
        </p>

        {/* Lead Narrative */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-[#c5c9d3] leading-relaxed max-w-2xl drop-shadow-md">
          {t.hero.description}
        </p>

        {/* Direct Action Buttons & Acoustic Wood Trigger (No boxed cards!) */}
        <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5">
          <button
            onClick={onOpenMenuModal}
            className="px-7 py-4 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#07080a] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center gap-2.5 group cursor-pointer shadow-2xl"
          >
            <span>{t.hero.ctaMenu}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="tel:+34688766398"
            className="px-7 py-4 bg-[#0a0c10]/85 hover:bg-white/10 text-[#f3f4f6] border border-white/20 hover:border-white/50 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm flex items-center gap-2.5 group cursor-pointer backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-[#d49b42]" />
            <span>{t.hero.ctaBook}</span>
          </a>

          {/* Acoustic Strike Trigger */}
          <button
            onClick={handleAcousticStrike}
            className={`px-4 py-4 rounded-sm border font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 backdrop-blur-sm ${
              pulseActive || isSoundEnabled
                ? 'bg-[#d49b42]/20 border-[#d49b42] text-[#d49b42]'
                : 'bg-[#0a0c10]/80 border-white/15 text-[#9ca3af] hover:text-white hover:border-white/40'
            }`}
            title="Txalapartaren egur-soinua entzun"
            aria-label="Txalapartaren egur-soinua entzun"
          >
            <Volume2 className={`w-4 h-4 ${pulseActive ? 'animate-bounce text-[#d49b42]' : 'text-[#d49b42]'}`} />
            <span className="hidden sm:inline text-[11px] font-mono">
              {isSoundEnabled
                ? (currentLang === 'eu' ? 'Egur Soinua ON' : 'Sonido Madera ON')
                : (currentLang === 'eu' ? 'Egurraren Deia' : 'Eco de Madera')}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Scene Bar: Seamless Horizontal Navigation & Downward Cue */}
      <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#9ca3af]">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 uppercase tracking-[0.2em]">
          <span className="text-[#6b7280] hidden lg:inline">
            {t.hero.quickJump}
          </span>
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
          aria-label={t.hero.badge}
        >
          <span className="uppercase tracking-widest text-[11px]">
            {currentLang === 'eu' ? 'Jaitsi behera' : 'Desplazar'}
          </span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
