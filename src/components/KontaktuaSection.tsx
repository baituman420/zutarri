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
      className="relative w-full min-h-[90vh] py-28 sm:py-36 px-4 sm:px-6 lg:px-12 overflow-hidden flex flex-col justify-between"
    >
      {/* Cinematic Monumental Background: Txalaparta B&W Bleed */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/txalaparta-hero.jpg"
          alt="Txalaparta tradizionala zurezko oholekin eta makilekin zuri-beltzean"
          className="w-full h-full object-cover grayscale contrast-130 brightness-[0.38] scale-105"
        />
        {/* Layered Cinematic Vignettes for Flawless Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-[#0b0c0e]/85 to-[#0b0c0e]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/95 via-transparent to-[#07080a]/95" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Monumental Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#d49b42] animate-pulse" />
              <span>{t.index}</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#f3f4f6] uppercase leading-none">
              {t.title}
            </h2>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#d1d5db] mt-3">
              «{t.tagline}»
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end text-left md:text-right font-mono text-xs text-[#9ca3af] space-y-2">
            <span className="text-[#f3f4f6] font-medium text-sm tracking-wider">
              {t.lead}
            </span>
            <span className="text-[#6b7280]">43.2361° N, 2.8887° W · Basauri</span>
            {playWoodStrike && (
              <button
                onClick={handleTxalapartaSound}
                className={`mt-2 px-3 py-1.5 rounded-sm border text-[11px] font-mono uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                  soundPulsing
                    ? 'bg-[#d49b42] text-[#0c0d0e] border-[#d49b42]'
                    : 'bg-[#141518]/80 text-[#9ca3af] border-white/10 hover:text-white hover:border-white/30'
                }`}
                title="Txalapartaren oihartzuna entzun"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#d49b42]" />
                <span>{currentLang === 'eu' ? 'Txalaparta Oihartzuna' : 'Eco de Txalaparta'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Architectural Cards: Reservations, Location, Hours & Social */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Direct Verified Booking (NO fake forms) */}
          <div className="bg-[#0e1014]/90 backdrop-blur-md border border-white/[0.08] p-7 sm:p-9 rounded-sm flex flex-col justify-between space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#d49b42] mb-3">
                <Phone className="w-4 h-4 text-[#d49b42]" />
                <span>{t.phoneLabel}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#f3f4f6] uppercase">
                {currentLang === 'eu' ? 'Mahai Erreserba Zuzena' : 'Reserva Directa'}
              </h3>
              <p className="font-editorial text-sm sm:text-base text-[#9ca3af] italic mt-3 leading-relaxed">
                {t.bookingNote}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/[0.08]">
              <a
                href={t.phoneLink}
                className="w-full py-3.5 px-4 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#0c0d0e] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callCta}</span>
              </a>

              <a
                href={t.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#14171d] hover:bg-[#1c2028] text-[#f3f4f6] border border-white/10 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5"
              >
                <MessageCircle className="w-4 h-4 text-[#15803d]" />
                <span>{t.whatsappText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Card 2: Location, Metro & Google Maps */}
          <div className="bg-[#0e1014]/90 backdrop-blur-md border border-white/[0.08] p-7 sm:p-9 rounded-sm flex flex-col justify-between space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9ca3af] mb-3">
                <MapPin className="w-4 h-4 text-[#d49b42]" />
                <span>{t.mapsLabel}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#f3f4f6] uppercase">
                Bentako Plaza, 3
              </h3>
              <p className="font-mono text-xs text-[#9ca3af] mt-1.5">
                48970 Basauri, Bizkaia
              </p>

              <div className="mt-5 pt-5 border-t border-white/[0.08] space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#e5e7eb]">
                  <Train className="w-4 h-4 text-[#d49b42]" />
                  <span>{t.metroDesc}</span>
                </div>
                <p className="font-mono text-[11px] text-[#6b7280]">
                  {currentLang === 'eu'
                    ? 'Bilboko zentroari lotuta (Abando - Ariz 12 minutu).'
                    : 'Conexión directa con Bilbao centro (Abando - Ariz 12 min).'}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <a
                href={t.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-[#14171d] hover:bg-[#1c2028] text-[#f3f4f6] border border-white/10 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2.5"
              >
                <MapPin className="w-4 h-4 text-[#d49b42]" />
                <span>Google Maps-en Ireki</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Card 3: Opening Hours & Official Social Media */}
          <div className="bg-[#0e1014]/90 backdrop-blur-md border border-white/[0.08] p-7 sm:p-9 rounded-sm flex flex-col justify-between space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9ca3af] mb-3">
                <Clock className="w-4 h-4 text-[#d49b42]" />
                <span>{t.hoursTitle}</span>
              </div>
              <div className="space-y-3 font-mono text-xs text-[#e5e7eb]">
                <div className="pb-2.5 border-b border-white/[0.08]">
                  <span className="text-[#9ca3af] block text-[10px] uppercase">Bazkariak / Comidas</span>
                  <span className="font-semibold">{t.hoursLunch}</span>
                </div>
                <div className="pb-2.5 border-b border-white/[0.08]">
                  <span className="text-[#9ca3af] block text-[10px] uppercase">Afariak / Cenas</span>
                  <span className="font-semibold">{t.hoursDinner}</span>
                </div>
                <div>
                  <span className="text-[#dc2626] block text-[10px] uppercase font-bold">Atsedena / Descanso</span>
                  <span className="text-[#6b7280] italic">{t.hoursClosed}</span>
                </div>
              </div>
            </div>

            {/* Social Media Links: Instagram & Facebook */}
            <div className="pt-6 border-t border-white/[0.08] space-y-2.5">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#6b7280] mb-2">
                SARE SOZIAL OFIZIALAK
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={t.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-[#14171d] hover:bg-[#1c2028] text-[#f3f4f6] border border-white/10 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
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
                  className="py-2.5 px-3 bg-[#14171d] hover:bg-[#1c2028] text-[#f3f4f6] border border-white/10 font-mono text-[11px] uppercase tracking-wider transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
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

        {/* Public Legal / Author notice regarding demo resources */}
        <div className="mt-12 p-4 bg-[#0a0c0f]/90 border border-white/[0.06] rounded-sm flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-[#d49b42] flex-shrink-0 mt-0.5" />
          <p className="font-mono text-[11px] text-[#6b7280] leading-relaxed">
            {t.legalNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
