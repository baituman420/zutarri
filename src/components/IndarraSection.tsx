import React from 'react';
import { Flame, Activity } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface IndarraSectionProps {
  currentLang: Language;
}

export const IndarraSection: React.FC<IndarraSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].indarra;

  return (
    <section
      id="indarra"
      className="relative w-full bg-[#0b0c0e] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#1d1f25] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#22252c]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#9ca3af] block mb-2">
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

        {/* Asymmetrical Grid: Narrative on Left, Pure Monochrome Aizkolari on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative & Craft Column (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-6">
            <p className="font-editorial text-xl sm:text-2xl text-[#f3f4f6] italic leading-relaxed border-l-2 border-[#9ca3af] pl-4">
              {t.body1}
            </p>

            <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
              {t.body2}
            </p>

            {/* Kinetic Principles Cards */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#141518] border border-[#252830] rounded-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-4 h-4 text-[#f3f4f6]" />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                    {t.card1Title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
                  {t.card1Desc}
                </p>
              </div>

              <div className="p-4 bg-[#141518] border border-[#252830] rounded-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-[#f3f4f6]" />
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                    {t.card2Title}
                  </h3>
                </div>
                <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
                  {t.card2Desc}
                </p>
              </div>
            </div>

            {/* Cultural Footnote */}
            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#6b7280]">
              <span className="w-2 h-px bg-[#3e424e]" />
              <span className="uppercase tracking-widest">
                HERRI KIROLAK · HERRI ONDAREA · BIZKAIA
              </span>
            </div>
          </div>

          {/* Visual Column: Raw High-Contrast Monochrome Aizkolari (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative">
            <div className="relative aspect-[16/11] rounded-sm overflow-hidden bg-[#16181c] border border-[#262932] shadow-2xl group">
              <img
                src="./assets/indarra-aizkolari.jpg"
                alt="Aizkolaria aizkorarekin enborra mozten indar betean"
                className="w-full h-full object-cover grayscale contrast-130 brightness-95 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />

              {/* High contrast documentary filter and chiaroscuro gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e]/80 via-transparent to-transparent pointer-events-none" />

              {/* Tag */}
              <div className="absolute top-4 right-4 bg-[#0c0d0e]/90 backdrop-blur-sm border border-[#2b2d35] px-3 py-1 rounded-[2px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e7eb]">
                  Aizkora & Enborra · Esku-Lana
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0c0d0e]/95 backdrop-blur-md border border-[#2b2d35] p-3 sm:p-4 rounded-sm flex items-center justify-between">
                <p className="font-mono text-xs text-[#9ca3af]">
                  {t.caption}
                </p>
                <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest hidden sm:inline">
                  FOTOGRAFÍA DOCUMENTAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
