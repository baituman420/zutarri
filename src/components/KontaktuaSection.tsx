import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Train, ArrowUpRight, ShieldAlert, Volume2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface KontaktuaSectionProps {
  currentLang: Language;
  playWoodStrike?: (frequency: number) => void;
}

export const KontaktuaSection: React.FC<KontaktuaSectionProps> = ({
  currentLang,
  playWoodStrike,
}) => {
  const t = translations[currentLang].kontaktua;
  const [soundPulsing, setSoundPulsing] = useState(false);

  const handleTxalapartaSound = () => {
    if (playWoodStrike) {
      setSoundPulsing(true);
      playWoodStrike(196); // Deep G resonant wood tone
      setTimeout(() => setSoundPulsing(false), 500);
    }
  };

  const textShadowStrong: React.CSSProperties = {
    textShadow: '0 2px 4px rgba(0,0,0,1), 0 3px 12px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.9)',
  };

  const textShadowSubtle: React.CSSProperties = {
    textShadow: '0 1px 3px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.95)',
  };

  return (
    <section
      id="kontaktua"
      className="relative w-full min-h-screen py-24 sm:py-32 lg:py-36 px-4 sm:px-8 lg:px-16 overflow-hidden flex flex-col justify-between bg-[#07080a] select-none"
    >
      {/* Monumental Cinematic Background: Txalaparta Full-Bleed Protagonist */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <img
            src="./assets/txalaparta-hero.jpg"
            alt="Txalaparta tradizionala zurezko oholekin eta makilekin zuri-beltzean"
            className="w-full h-full object-cover object-[center_45%] md:object-[center_50%] grayscale contrast-120 brightness-[0.68] select-none pointer-events-none transition-transform duration-700"
          />
          {/* Soft Organic Vignettes: Ensure edge blend and central luminosity for txalaparta */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#07080a] via-[#07080a]/75 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07080a] via-[#07080a]/75 to-transparent pointer-events-none" />
          {/* Side chiaroscuro keeping the center beam & instrument open */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/70 via-transparent to-[#07080a]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[#07080a]/25 pointer-events-none" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#f59e0b] mb-3" style={textShadowSubtle}>
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
              <span>{t.index}</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none" style={textShadowStrong}>
              {t.title}
            </h2>
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#f59e0b] mt-3" style={textShadowStrong}>
              «{t.tagline}»
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end font-mono text-xs space-y-2" style={textShadowSubtle}>
            <span className="text-white font-medium text-sm tracking-wider">
              {t.lead}
            </span>
            <span className="text-[#f1f5f9] font-medium">
              43.2361° N, 2.8887° W · Basauri
            </span>
            {playWoodStrike && (
              <button
                onClick={handleTxalapartaSound}
                className={`mt-2 px-3.5 py-2 rounded-sm border text-[11px] font-mono uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
                  soundPulsing
                    ? 'bg-[#f59e0b] text-[#07080a] border-[#f59e0b] scale-105 font-bold'
                    : 'bg-[#07080a]/80 text-white border-white/30 hover:border-[#f59e0b] backdrop-blur-md'
                }`}
                title="Txalapartaren oihartzuna entzun"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>{currentLang === 'eu' ? 'Txalaparta Oihartzuna' : 'Eco de Txalaparta'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Editorial Columns with Pure Organic Chiaroscuro Atmospheric Vignette (Zero Cards, Zero Box Borders) */}
        <div className="relative pt-4">
          {/* Seamless feathered atmospheric shadow directly behind the text columns to ensure 100% legibility without any box appearance */}
          <div className="absolute -inset-x-8 -inset-y-10 sm:-inset-x-16 sm:-inset-y-14 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#07080a]/85 via-[#07080a]/60 to-transparent pointer-events-none -z-10 blur-2xl" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1: Direct Reservations */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#f59e0b] font-semibold" style={textShadowSubtle}>
                <Phone className="w-4 h-4 text-[#f59e0b]" />
                <span>{t.phoneLabel}</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight" style={textShadowStrong}>
                {currentLang === 'eu' ? 'Mahai Erreserbak' : 'Reservas Directas'}
              </h3>
              <p className="font-editorial text-base sm:text-lg text-[#f8fafc] italic leading-relaxed" style={textShadowSubtle}>
                {t.bookingNote}
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={t.phoneLink}
                  className="w-full py-4 px-5 bg-white hover:bg-[#f59e0b] text-[#07080a] hover:text-[#07080a] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5 shadow-2xl"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callCta}</span>
                </a>

                <a
                  href={t.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-[#07080a]/80 hover:bg-[#07080a]/95 text-white border border-white/30 hover:border-white/60 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5 backdrop-blur-md shadow-xl"
                >
                  <MessageCircle className="w-4 h-4 text-[#22c55e]" />
                  <span>{t.whatsappText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Column 2: Location & Metro */}
            <div className="space-y-6 md:pl-6 lg:pl-10">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#f59e0b] font-semibold" style={textShadowSubtle}>
                <MapPin className="w-4 h-4 text-[#f59e0b]" />
                <span>{t.mapsLabel}</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight" style={textShadowStrong}>
                Bentako Plaza, 3
              </h3>
              <p className="font-mono text-xs font-semibold text-[#f1f5f9] tracking-wide" style={textShadowSubtle}>
                48970 Basauri, Bizkaia
              </p>

              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-white" style={textShadowSubtle}>
                  <Train className="w-4 h-4 text-[#f59e0b]" />
                  <span>{t.metroDesc}</span>
                </div>
                <p className="font-mono text-xs text-[#e2e8f0] leading-relaxed font-normal" style={textShadowSubtle}>
                  {currentLang === 'eu'
                    ? 'Bilboko zentroari zuzenean lotuta (Abando - Ariz 12 minutu).'
                    : 'Conexión directa con Bilbao centro (Abando - Ariz 12 minutos).'}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={t.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 bg-[#07080a]/80 hover:bg-[#07080a]/95 text-white border border-white/30 hover:border-white/60 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5 backdrop-blur-md shadow-xl"
                >
                  <MapPin className="w-4 h-4 text-[#f59e0b]" />
                  <span>{currentLang === 'eu' ? 'Google Maps-en Ireki' : 'Abrir en Google Maps'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </div>

            {/* Column 3: Hours & Official Social Media */}
            <div className="space-y-6 md:pl-6 lg:pl-10">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#f59e0b] font-semibold" style={textShadowSubtle}>
                <Clock className="w-4 h-4 text-[#f59e0b]" />
                <span>{t.hoursTitle}</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-white">
                <div className="pb-2">
                  <span className="text-[#f59e0b] block text-[11px] uppercase tracking-wider font-semibold" style={textShadowSubtle}>
                    Bazkariak / Comidas
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm tracking-wide" style={textShadowStrong}>
                    {t.hoursLunch}
                  </span>
                </div>
                <div className="pb-2">
                  <span className="text-[#f59e0b] block text-[11px] uppercase tracking-wider font-semibold" style={textShadowSubtle}>
                    Afariak / Cenas
                  </span>
                  <span className="font-bold text-white text-xs sm:text-sm tracking-wide" style={textShadowStrong}>
                    {t.hoursDinner}
                  </span>
                </div>
                <div>
                  <span className="text-[#f87171] block text-[11px] uppercase font-bold tracking-wider" style={textShadowSubtle}>
                    Atsedena / Descanso
                  </span>
                  <span className="text-[#f1f5f9] font-medium italic text-xs tracking-wide" style={textShadowSubtle}>
                    {t.hoursClosed}
                  </span>
                </div>
              </div>

              {/* Social Media Links: Instagram & Facebook */}
              <div className="pt-4 space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#e2e8f0] font-semibold block" style={textShadowSubtle}>
                  SARE SOZIAL OFIZIALAK
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={t.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 bg-[#07080a]/80 hover:bg-[#07080a]/95 text-white border border-white/25 hover:border-white/60 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center gap-2 backdrop-blur-md shadow-xl"
                  >
                    <svg className="w-3.5 h-3.5 text-[#f59e0b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span>Instagram</span>
                  </a>

                  <a
                    href={t.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 bg-[#07080a]/80 hover:bg-[#07080a]/95 text-white border border-white/25 hover:border-white/60 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center gap-2 backdrop-blur-md shadow-xl"
                  >
                    <svg className="w-3.5 h-3.5 text-[#f59e0b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Public Legal / Author notice */}
        <div className="pt-8 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-[#f59e0b] flex-shrink-0 mt-0.5" />
          <p className="font-mono text-xs text-[#cbd5e1] leading-relaxed" style={textShadowSubtle}>
            {t.legalNotice}
          </p>
        </div>
      </div>
    </section>
  );
};

