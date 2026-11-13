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
      className="relative min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden select-none bg-[#07080a]"
    >
      {/* Full-Bleed Immersive Scene: Pure Monochrome Aizkolari Herri Kirolak */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/indarra-aizkolari.jpg"
          alt="Aizkolaria aizkorarekin enborra mozten indar betean Bizkaiko plazan"
          className="w-full h-full object-cover object-center grayscale contrast-130 brightness-[0.55] scale-100 transition-transform duration-1000 ease-out"
        />

        {/* Chiaroscuro Atmospheric Vignettes to integrate typography without boxes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/95 via-[#07080a]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/70 pointer-events-none" />
      </div>

      {/* Top Scene Marker */}
      <div className="relative z-10 w-full flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#f3f4f6]">
          <span className="w-2 h-2 rounded-full bg-white inline-block animate-pulse" />
          <span>{t.index}</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] hidden sm:inline">
          Herri Kirolak · Esku-Lana · Bizkaia
        </span>
      </div>

      {/* Narrative & Kinetic Principles Floating in the Scene (No Cards!) */}
      <div className="relative z-10 my-auto py-8 max-w-2xl space-y-6">
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#f3f4f6] uppercase leading-[0.96] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          {t.title}
        </h2>

        <p className="font-editorial italic text-xl sm:text-2xl text-[#f3f4f6] border-l-2 border-white/60 pl-4 leading-snug drop-shadow-md">
          {t.body1}
        </p>

        <p className="font-sans text-base sm:text-lg text-[#d1d5db] leading-relaxed drop-shadow-md">
          {t.body2}
        </p>

        {/* Kinetic Principles (Clean Editorial Layout, Zero Boxes) */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#d49b42]">
              <Flame className="w-4 h-4 text-[#d49b42]" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-white">
                {t.card1Title}
              </h3>
            </div>
            <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
              {t.card1Desc}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#d49b42]">
              <Activity className="w-4 h-4 text-[#d49b42]" />
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-white">
                {t.card2Title}
              </h3>
            </div>
            <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
              {t.card2Desc}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scene Footnote */}
      <div className="relative z-10 w-full flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <span className="text-white">✦</span>
          <span>{t.caption}</span>
        </div>
        <span className="text-[#6b7280] uppercase tracking-widest hidden sm:inline">
          FOTOGRAFÍA DOCUMENTAL · HERRI ONDAREA
        </span>
      </div>
    </section>
  );
};
