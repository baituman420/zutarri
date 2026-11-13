import React from 'react';
import { Info, Sparkles } from 'lucide-react';
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
      className="relative w-full bg-[#0e0f12] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#1d1f25] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#22252c]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block mb-2">
              {t.index}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#f3f4f6] uppercase">
              {t.title}
            </h2>
          </div>
          <p className="font-editorial text-lg sm:text-xl text-[#9ca3af] italic max-w-md">
            {t.lead}
          </p>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column: Dual Photographic Dialogue (Memory + Authentic Mural) (7 cols) */}
          <div className="lg:col-span-7 relative flex flex-col gap-6">
            {/* Primary Visual: Grandmother kneading dough (Memory) */}
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#16181c] border border-[#262932] shadow-2xl group">
              <img
                src="./assets/amasado-talo-color.webp"
                alt="Amona arto-taloa eskuz oratzen baserrian, Zutarriren talo garaikideak koloretan zurezko taulan"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />

              {/* Attribution Tag */}
              <div className="absolute top-4 left-4 bg-[#0c0d0e]/90 backdrop-blur-sm border border-[#2b2d35] px-3 py-1 rounded-[2px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e7eb]">
                  Memoria Bizia · Eskuen Tradizioa
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0c0d0e]/95 backdrop-blur-md border border-[#2b2d35] p-3 sm:p-4 rounded-sm flex items-start justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#d49b42] flex-shrink-0 mt-0.5" />
                  <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
                    {t.caption}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest flex-shrink-0 hidden sm:inline">
                  ZUTARRI ARCHIVE
                </span>
              </div>
            </div>

            {/* Secondary Visual: Physical Mural of Hands on Zutarri's Restaurant Wall */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center p-4 bg-[#131417] border border-[#252830] rounded-sm">
              <div className="sm:col-span-4 relative aspect-[4/3] rounded-sm overflow-hidden bg-[#1a1c22] border border-[#2a2d36]">
                <img
                  src="./assets/mural-manos.jpg"
                  alt="Zutarri jatetxeko horman eskuz margotutako murala: eskuak artoa oratzen"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/60 to-transparent pointer-events-none" />
              </div>
              <div className="sm:col-span-8 flex flex-col justify-center space-y-1 sm:pl-2">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#d49b42]">
                  <Sparkles className="w-3 h-3 text-[#d49b42]" />
                  <span>{t.muralTag}</span>
                </div>
                <h3 className="font-display font-bold text-base text-[#f3f4f6] uppercase tracking-wide">
                  Bentako Plaza 3ko Horma Artistikoa
                </h3>
                <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
                  {t.muralDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Narrative & Metrics Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-6 text-[#d1d5db] font-editorial text-lg sm:text-xl leading-relaxed">
              <p className="border-l-2 border-[#d49b42] pl-4 italic text-[#f3f4f6]">
                {t.quote}
              </p>
              <p>
                {t.body1}
              </p>
              <p className="text-base font-sans text-[#9ca3af] leading-normal">
                {t.body2}
              </p>
            </div>

            {/* Cultural Metrics / Pillars */}
            <div className="mt-10 pt-8 border-t border-[#22252c] grid grid-cols-3 gap-4">
              <div>
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#f3f4f6] block">
                  {t.stat1Number}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
                  {t.stat1Label}
                </span>
              </div>
              <div className="border-l border-[#22252c] pl-4">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#d49b42] block">
                  {t.stat2Number}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
                  {t.stat2Label}
                </span>
              </div>
              <div className="border-l border-[#22252c] pl-4">
                <span className="font-display font-bold text-3xl sm:text-4xl text-[#f3f4f6] block">
                  {t.stat3Number}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
                  {t.stat3Label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
