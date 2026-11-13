import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface SustraiakSectionProps {
  currentLang: Language;
}

export const SustraiakSection: React.FC<SustraiakSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].sustraiak;

  return (
    <section
      id="sustraiak"
      className="relative min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden select-none bg-[#07080a]"
    >
      {/* Full-Bleed Immersive Scene: Cocina rústica con abuela amasando (B&W) y plato gourmet integrado (Color) */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/sustraiak-cocina.webp"
          alt="Baserriko sukalde tradizionala zuri-beltzean, amona oratzen eta Zutarriren plater garaikidea koloretan zurezko mahaian"
          className="w-full h-full object-cover object-center brightness-[0.7] contrast-115 scale-100 transition-transform duration-1000 ease-out"
        />

        {/* Chiaroscuro Environmental Vignettes for organic text integration */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/95 via-[#07080a]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/70 pointer-events-none" />
      </div>

      {/* Top Scene Marker */}
      <div className="relative z-10 w-full flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42]">
          <span className="w-2 h-2 rounded-full bg-[#d49b42] inline-block animate-pulse" />
          <span>{t.index}</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] hidden sm:inline">
          {currentLang === 'eu' ? 'Tradizioa zuri-beltzean · Gastronomia koloretan' : 'Tradición en blanco y negro · Gastronomía en color'}
        </span>
      </div>

      {/* Typography Integrated Organically in the Scene's Dark Hearth Space (No Cards!) */}
      <div className="relative z-10 my-auto py-8 max-w-2xl space-y-6">
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f3f4f6] uppercase leading-[0.96] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          {t.title}
        </h2>

        <p className="font-editorial italic text-xl sm:text-2xl text-[#d49b42] border-l-2 border-[#d49b42] pl-4 leading-snug drop-shadow-md">
          {t.quote}
        </p>

        <div className="space-y-4 font-sans text-base sm:text-lg text-[#d1d5db] leading-relaxed drop-shadow-md">
          <p>{t.body1}</p>
          <p className="text-sm sm:text-base text-[#9ca3af]">{t.body2}</p>
        </div>

        {/* Cultural Pillars / Metrics Floating Directly in the Scene */}
        <div className="pt-6 grid grid-cols-3 gap-6 border-t border-white/10">
          <div>
            <span className="font-display font-bold text-3xl sm:text-4xl text-[#f3f4f6] block drop-shadow">
              {t.stat1Number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
              {t.stat1Label}
            </span>
          </div>
          <div className="border-l border-white/10 pl-6">
            <span className="font-display font-bold text-3xl sm:text-4xl text-[#d49b42] block drop-shadow">
              {t.stat2Number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
              {t.stat2Label}
            </span>
          </div>
          <div className="border-l border-white/10 pl-6">
            <span className="font-display font-bold text-3xl sm:text-4xl text-[#f3f4f6] block drop-shadow">
              {t.stat3Number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
              {t.stat3Label}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scene Footnote: Direct Physical Link to Zutarri's Wall Mural */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-white/10 text-xs font-mono text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <span className="text-[#d49b42]">✦</span>
          <span>
            {currentLang === 'eu'
              ? 'Baserriko eskuen oratzea gaurko jatetxeko muralera ekarria (Bentako Plaza, 3).'
              : 'El amasado tradicional del caserío conecta directamente con el mural de Bentako Plaza, 3.'}
          </span>
        </div>
        <span className="text-[#6b7280] uppercase tracking-widest hidden md:inline">
          ZUTARRI KULTURA ELKARTEA
        </span>
      </div>
    </section>
  );
};
