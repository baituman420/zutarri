import React from 'react';
import { Info } from 'lucide-react';
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

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column: Selective Color Documentary Masterpiece (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[16/11] rounded-sm overflow-hidden bg-[#16181c] border border-[#262932] shadow-2xl group">
              {/* Image: Entire baserri kitchen & grandmother in high-contrast B&W, real talo food in color on board */}
              <img
                src="./assets/sustraiak-amona.jpg"
                alt="Amona arto-taloa eskuz oratzen baserrian, Zutarriren talo garaikideak koloretan zurezko taulan"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* Chiaroscuro vignette & subtle film grain */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />

              {/* Image Attribution / Technique Tag */}
              <div className="absolute top-4 left-4 bg-[#0c0d0e]/90 backdrop-blur-sm border border-[#2b2d35] px-3 py-1 rounded-[2px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e7eb]">
                  Kolore Hautatua · Argazki Dokumentala
                </span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0c0d0e]/95 backdrop-blur-md border border-[#2b2d35] p-3 sm:p-4 rounded-sm flex items-start justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#d49b42] flex-shrink-0 mt-0.5" />
                  <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
                    {t.caption}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest flex-shrink-0">
                  ZUTARRI ARCHIVE
                </span>
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
