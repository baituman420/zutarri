import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Phone, Volume2, Sparkles, MapPin } from 'lucide-react';
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
  const [isStoneHovered, setIsStoneHovered] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);

  const handleStoneClick = () => {
    setPulseActive(true);
    playWoodStrike(261.63); // Middle C resonant timber note
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
      className="relative min-h-[92vh] lg:min-h-screen w-full bg-[#0b0c0e] flex flex-col justify-between pt-28 pb-10 px-4 sm:px-6 lg:px-12 overflow-hidden select-none"
    >
      {/* Background Ambient Lighting & Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_65%_35%,rgba(55,42,28,0.25),rgba(11,12,14,0.98)_75%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Top Editorial Identity & Location Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1f2127]">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[#9ca3af]">
          <span className="w-2 h-2 rounded-full bg-[#d49b42] inline-block animate-pulse" />
          <span>01 // {t.hero.badge}</span>
          <span className="text-[#3c404d] hidden sm:inline">·</span>
          <span className="hidden sm:inline">43.2361° N, 2.8887° W</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#9ca3af]">
          <div className="flex items-center gap-1.5 text-[#e5e7eb]">
            <MapPin className="w-3.5 h-3.5 text-[#d49b42]" />
            <span>Bentako Plaza, 3 · Ariz Metroa (3 min)</span>
          </div>
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[#15803d] font-semibold bg-[#121814] px-2.5 py-0.5 rounded-full border border-[#1e3324]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
            <span>Gaur irekita</span>
          </span>
        </div>
      </div>

      {/* Asymmetrical Editorial Composition: 12-Column Grid */}
      <div className="relative z-10 my-auto py-8 sm:py-12 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Monumental Typography & Narrative (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          {/* Subtitle / Culture Claim */}
          <div className="inline-flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-[2px] bg-[#16181b] border border-[#2e3138] font-mono text-[10px] uppercase tracking-[0.25em] text-[#d49b42]">
              Euskal Gastronomia & Talo Garaikidea
            </span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#f3f4f6] uppercase leading-[0.98]">
            {t.hero.title}
          </h1>

          {/* Editorial Philosophy Quote */}
          <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[#d1d5db] border-l-2 border-[#d49b42] pl-4 leading-snug">
            «{t.hero.subtitle}»
          </p>

          {/* Lead Paragraph */}
          <p className="font-sans text-sm sm:text-base text-[#9ca3af] leading-relaxed max-w-2xl">
            {t.hero.description}
          </p>

          {/* Primary Action Buttons & Acoustic Trigger */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenMenuModal}
              className="px-6 py-3.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#0c0d0e] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center gap-2 group cursor-pointer shadow-lg"
            >
              <span>{t.hero.ctaMenu}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <a
              href="tel:+34688766398"
              className="px-6 py-3.5 bg-[#141518] hover:bg-[#1f2127] text-[#f3f4f6] border border-[#2e313b] hover:border-white/40 font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 rounded-sm flex items-center gap-2 group cursor-pointer shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#d49b42]" />
              <span>{t.hero.ctaBook}</span>
            </a>

            {/* Subtle Acoustic Micro-Trigger Button */}
            <button
              onClick={() => {
                if (!isSoundEnabled) {
                  onToggleSound();
                }
                handleStoneClick();
              }}
              className={`p-3 rounded-sm border font-mono text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                pulseActive || isSoundEnabled
                  ? 'bg-[#1e1c18] border-[#d49b42]/60 text-[#d49b42]'
                  : 'bg-[#141518]/90 border-[#282a30] text-[#9ca3af] hover:text-white hover:border-[#3d414a]'
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

          {/* Quick Anchor Navigation Strip */}
          <div className="pt-6 border-t border-[#1f2127] flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-mono uppercase tracking-[0.18em] text-[#9ca3af]">
            <span className="text-[#6b7280] text-[10px] sm:text-xs">
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
                className="hover:text-[#f3f4f6] transition-colors cursor-pointer py-0.5"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Authentic Photography & Engraved Stone Emblem (5 cols) */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          {/* Main Visual Container */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.8] max-w-[480px] rounded-sm overflow-hidden bg-[#14161a] border border-[#2b2e38] shadow-[0_25px_60px_rgba(0,0,0,0.8)] group">
            {/* Authentic Dish Photo: Folded Talo with crispy charred texture */}
            <img
              src="./assets/hero-talo-dish.jpg"
              alt="Zutarriren arto-talo kuttuna: txapa gainean tolestua paper tradizionalarekin"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Chiaroscuro Atmospheric Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent pointer-events-none opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0e]/60 via-transparent to-transparent pointer-events-none" />

            {/* Authentic Engraved Stone Emblem Stamp (Upper Right) */}
            <div
              onClick={handleStoneClick}
              onMouseEnter={() => setIsStoneHovered(true)}
              onMouseLeave={() => setIsStoneHovered(false)}
              className={`absolute top-4 right-4 z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-sm bg-[#0c0d10]/90 backdrop-blur-md border p-1.5 shadow-2xl cursor-pointer transition-all duration-300 ${
                isStoneHovered || pulseActive
                  ? 'border-[#d49b42] scale-105 shadow-[0_0_20px_rgba(212,155,66,0.3)]'
                  : 'border-[#333742]'
              }`}
              title={currentLang === 'eu' ? 'Zutarriren harrizko ikurra (klik egin soinua entzuteko)' : 'Emblema grabado en piedra (clic para escuchar resonancia)'}
            >
              <img
                src="./assets/logo-piedras.webp"
                alt="Zutarri emblema grabado en piedra natural"
                className="w-full h-full object-cover rounded-[2px] grayscale contrast-125 brightness-95"
              />
              {pulseActive && (
                <div className="absolute inset-0 rounded-sm border-2 border-[#d49b42] animate-ping pointer-events-none" />
              )}
              <div className="absolute bottom-1 left-1 right-1 text-center bg-[#0c0d0e]/90 py-0.5 rounded-[1px] font-mono text-[8px] uppercase tracking-widest text-[#d49b42]">
                HARRI-IKURRA
              </div>
            </div>

            {/* Craft Pill Tag (Upper Left) */}
            <div className="absolute top-4 left-4 bg-[#0c0d0e]/95 backdrop-blur-sm border border-[#2b2d35] px-3 py-1 rounded-[2px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e7eb]">
                100% Gluten-Free · Arto Hutsa
              </span>
            </div>

            {/* Dish Description Overlay Card (Bottom) */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#0c0d0e]/95 backdrop-blur-md border border-[#2b2e38] p-4 rounded-sm">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#d49b42] mb-1">
                <span>{t.hero.dishBadge}</span>
                <Sparkles className="w-3 h-3 text-[#d49b42]" />
              </div>
              <h2 className="font-display font-bold text-lg text-[#f3f4f6] uppercase tracking-tight">
                {t.hero.dishTitle}
              </h2>
              <p className="font-mono text-xs text-[#9ca3af] mt-1 leading-snug">
                {t.hero.dishSub}
              </p>
            </div>
          </div>

          {/* Supporting Micro-caption under image */}
          <div className="mt-3 flex items-center justify-between w-full max-w-[480px] font-mono text-[10px] text-[#6b7280] uppercase tracking-wider px-1">
            <span>ARGAZKI ERREALA // BENTAKO PLAZA, 3</span>
            <span>SUKALDEKO ARGAZKILARITZA</span>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Quote & Downward Anchor */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#1f2127] text-xs font-mono text-[#6b7280]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#d49b42] rounded-full inline-block" />
          <span className="uppercase tracking-widest">
            ZUTARRI // {currentLang === 'eu' ? 'HARRI, ARTO ETA EGUR SOINUA' : 'SONIDO DE PIEDRA, MAÍZ Y MADERA'}
          </span>
        </div>

        <button
          onClick={() => scrollToSection('sustraiak')}
          className="flex items-center gap-2 text-[#9ca3af] hover:text-[#f3f4f6] transition-colors cursor-pointer group"
          aria-label={t.hero.badge}
        >
          <span className="uppercase tracking-widest text-[11px]">
            {currentLang === 'eu' ? 'Jaitsi behera' : 'Desplazar'}
          </span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#d49b42]" />
        </button>
      </div>
    </section>
  );
};
