import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SectionTitle } from './SectionTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SustraiakSectionProps {
  currentLang: Language;
}

export const SustraiakSection: React.FC<SustraiakSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].sustraiak;
  const sectionRef = useRef<HTMLElement>(null);

  // Subtle natural scene parallax on scroll
  useGSAP(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    gsap.to('.sustraiak-scene-img', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      yPercent: 7,
      ease: 'none',
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="sustraiak"
      className="relative min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden select-none bg-[#07080a]"
      aria-label="Sustraiak - Zutarri Jatetxearen Jatorria"
    >
      {/* Full-Bleed Immersive Scene: Cocina de caserío con amona amasando y fuente de Kruntxitalo a color */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="./assets/sustraiak-cocina.webp"
          alt="Baserriko sukalde tradizionala zuri-beltzean, amona taloa oratzen eta Zutarriren Kruntxitalo plater erreala koloretan zurezko mahaian"
          className="sustraiak-scene-img w-full h-[112%] -top-[6%] absolute object-cover object-center brightness-[0.72] contrast-115 scale-100 transition-transform duration-700 ease-out"
        />

        {/* Chiaroscuro Environmental Vignettes: Continuous dissolve from Hero & high legibility on text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/95 via-[#07080a]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07080a] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none" />
      </div>

      {/* Top Scene Marker: Pure floating text without divider lines */}
      <div className="relative z-10 w-full flex items-center justify-between pb-2 text-[#9ca3af]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] inline-block animate-pulse" />
          <span>{currentLang === 'eu' ? 'Jatorria & Artoa' : 'Herencia y Maíz'}</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] hidden sm:inline">
          {currentLang === 'eu' ? 'Tradizioa zuri-beltzean · Gastronomia koloretan' : 'Tradición documental · Gastronomía viva'}
        </span>
      </div>

      {/* Typography Integrated Organically in the Scene's Dark Hearth Space (Floating, No Cards, No Lines!) */}
      <div className="relative z-10 my-auto py-6 sm:py-10 max-w-2xl space-y-7">
        {/* Animated Semantic Title: Emerging from the Earth / Hearth */}
        <SectionTitle
          section="sustraiak"
          badge={t.index}
          title="SUSTRAIAK"
          subtitle={`«${t.title}»`}
        />

        {/* Editorial Philosophical Quote */}
        <p className="font-editorial italic text-xl sm:text-2xl text-[#e5e7eb] leading-snug drop-shadow-md">
          {t.quote}
        </p>

        {/* Narrative Flow */}
        <div className="space-y-4 font-sans text-base sm:text-lg text-[#d1d5db] leading-relaxed drop-shadow-md">
          <p>{t.body1}</p>
          <p className="text-sm sm:text-base text-[#9ca3af]">{t.body2}</p>
        </div>

        {/* Cultural Pillars / Metrics Floating Directly in the Scene without Lines */}
        <div className="pt-4 grid grid-cols-3 gap-8 sm:gap-12">
          <div>
            <span className="font-display font-bold text-3xl sm:text-4xl text-[#f3f4f6] block drop-shadow">
              {t.stat1Number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
              {t.stat1Label}
            </span>
          </div>
          <div>
            <span className="font-display font-bold text-3xl sm:text-4xl text-[#d49b42] block drop-shadow">
              {t.stat2Number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
              {t.stat2Label}
            </span>
          </div>
          <div>
            <span className="font-display font-bold text-3xl sm:text-4xl text-[#f3f4f6] block drop-shadow">
              {t.stat3Number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9ca3af] uppercase tracking-wider block mt-1">
              {t.stat3Label}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scene Footnote: Floating gracefully without divider lines */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs font-mono text-[#9ca3af]">
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
