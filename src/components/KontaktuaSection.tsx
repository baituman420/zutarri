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

  return (
    <section
      id="kontaktua"
      className="relative w-full min-h-screen py-28 sm:py-36 px-4 sm:px-8 lg:px-16 overflow-hidden flex flex-col justify-between bg-[#07080a] select-none"
    >
      {/* Monumental Cinematic Background: Txalaparta B&W Bleed */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/txalaparta-hero.jpg"
          alt="Txalaparta tradizionala zurezko oholekin eta makilekin zuri-beltzean"
          className="w-full h-full object-cover object-center grayscale contrast-130 brightness-[0.38] scale-102"
        />
        {/* Soft Chiaroscuro Atmospheric Vignettes (No boxes or card borders) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#07080a]/75 to-[#07080a]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/90 via-transparent to-[#07080a]/90 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#d49b42] animate-pulse" />
              <span>{t.index}</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#f3f4f6] uppercase leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {t.title}
            </h2>
            <p className="font-editorial italic text-2xl sm:text-3xl text-[#d49b42] mt-3">
              «{t.tagline}»
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end font-mono text-xs text-[#9ca3af] space-y-2">
            <span className="text-[#f3f4f6] font-medium text-sm tracking-wider">
              {t.lead}
            </span>
            <span className="text-[#6b7280]">43.2361° N, 2.8887° W · Basauri</span>
            {playWoodStrike && (
              <button
                onClick={handleTxalapartaSound}
                className={`mt-2 px-3.5 py-2 rounded-sm border text-[11px] font-mono uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                  soundPulsing
                    ? 'bg-[#d49b42] text-[#07080a] border-[#d49b42]'
                    : 'bg-white/5 text-[#d1d5db] border-white/20 hover:text-white hover:border-white/50 backdrop-blur-sm'
                }`}
                title="Txalapartaren oihartzuna entzun"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#d49b42]" />
                <span>{currentLang === 'eu' ? 'Txalaparta Oihartzuna' : 'Eco de Txalaparta'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Editorial Columns Floating Organically in the Scene (NO CARD CONTAINERS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-4">
          {/* Column 1: Direct Reservations */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#d49b42]">
              <Phone className="w-4 h-4 text-[#d49b42]" />
              <span>{t.phoneLabel}</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#f3f4f6] uppercase tracking-tight">
              {currentLang === 'eu' ? 'Mahai Erreserbak' : 'Reservas Directas'}
            </h3>
            <p className="font-editorial text-base text-[#c5c9d3] italic leading-relaxed">
              {t.bookingNote}
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={t.phoneLink}
                className="w-full py-4 px-5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#07080a] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5 shadow-2xl"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callCta}</span>
              </a>

              <a
                href={t.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 bg-white/5 hover:bg-white/10 text-[#f3f4f6] border border-white/20 hover:border-white/40 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5 backdrop-blur-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#15803d]" />
                <span>{t.whatsappText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Column 2: Location & Metro */}
          <div className="space-y-6 md:border-l md:border-white/10 md:pl-10 lg:pl-14">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9ca3af]">
              <MapPin className="w-4 h-4 text-[#d49b42]" />
              <span>{t.mapsLabel}</span>
            </div>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#f3f4f6] uppercase tracking-tight">
              Bentako Plaza, 3
            </h3>
            <p className="font-mono text-xs text-[#9ca3af]">
              48970 Basauri, Bizkaia
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e5e7eb]">
                <Train className="w-4 h-4 text-[#d49b42]" />
                <span>{t.metroDesc}</span>
              </div>
              <p className="font-mono text-[11px] text-[#6b7280] leading-relaxed">
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
                className="w-full py-3.5 px-5 bg-white/5 hover:bg-white/10 text-[#f3f4f6] border border-white/20 hover:border-white/40 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5 backdrop-blur-sm"
              >
                <MapPin className="w-4 h-4 text-[#d49b42]" />
                <span>Google Maps-en Ireki</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Column 3: Hours & Official Social Media */}
          <div className="space-y-6 md:border-l md:border-white/10 md:pl-10 lg:pl-14">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#9ca3af]">
              <Clock className="w-4 h-4 text-[#d49b42]" />
              <span>{t.hoursTitle}</span>
            </div>
            <div className="space-y-3 font-mono text-xs text-[#e5e7eb]">
              <div className="pb-2 border-b border-white/10">
                <span className="text-[#9ca3af] block text-[10px] uppercase">Bazkariak / Comidas</span>
                <span className="font-semibold">{t.hoursLunch}</span>
              </div>
              <div className="pb-2 border-b border-white/10">
                <span className="text-[#9ca3af] block text-[10px] uppercase">Afariak / Cenas</span>
                <span className="font-semibold">{t.hoursDinner}</span>
              </div>
              <div>
                <span className="text-[#dc2626] block text-[10px] uppercase font-bold">Atsedena / Descanso</span>
                <span className="text-[#6b7280] italic">{t.hoursClosed}</span>
              </div>
            </div>

            {/* Social Media Links: Instagram & Facebook */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b7280] block">
                SARE SOZIAL OFIZIALAK
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={t.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-white/5 hover:bg-white/10 text-[#f3f4f6] border border-white/15 hover:border-white/40 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <svg className="w-3.5 h-3.5 text-[#d49b42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="py-3 px-3 bg-white/5 hover:bg-white/10 text-[#f3f4f6] border border-white/15 hover:border-white/40 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <svg className="w-3.5 h-3.5 text-[#d49b42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Public Legal / Author notice */}
        <div className="pt-8 border-t border-white/10 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-[#d49b42] flex-shrink-0 mt-0.5" />
          <p className="font-mono text-[11px] text-[#6b7280] leading-relaxed">
            {t.legalNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
