import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Flame, Activity, ArrowDown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SectionTitle } from './SectionTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface IndarraSectionProps {
  currentLang: Language;
}

export const IndarraSection: React.FC<IndarraSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].indarra;
  const sectionRef = useRef<HTMLElement>(null);
  const aizkolariLayerRef = useRef<HTMLDivElement>(null);
  const gastroLayerRef = useRef<HTMLDivElement>(null);
  const textMoment1Ref = useRef<HTMLDivElement>(null);
  const textMoment3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      // In reduced motion mode: show gastronomy directly without scroll locking
      gsap.set(gastroLayerRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1,
      });
      gsap.set(aizkolariLayerRef.current, { opacity: 0 });
      gsap.set(textMoment1Ref.current, { opacity: 0, pointerEvents: 'none' });
      gsap.set(textMoment3Ref.current, { opacity: 1, pointerEvents: 'auto' });
      return;
    }

    const mm = gsap.matchMedia();

    // DESKTOP (>= 768px): Cinematic pinned scroll transformation
    mm.add('(min-width: 768px)', () => {
      // Start with gastronomy hidden along the 65-degree axe cutting angle
      gsap.set(gastroLayerRef.current, {
        clipPath: 'polygon(150% 0%, 100% 0%, 100% 100%, 130% 100%)',
      });
      gsap.set(textMoment1Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto' });
      gsap.set(textMoment3Ref.current, { opacity: 0, y: 20, pointerEvents: 'none' });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Moment 1 (0 -> 0.18): Contemplation of the aizkolari tradition & title impact
      masterTl
        // Moment 2: The transformation cuts across the scene (0.18 -> 0.72)
        .to(gastroLayerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'none',
          duration: 0.54,
        }, 0.18)
        // Aizkolari subtle expansion & dark absorption
        .to('.indarra-aizkolari-img', {
          scale: 1.05,
          xPercent: -2,
          filter: 'brightness(0.32) contrast(1.25)',
          ease: 'none',
          duration: 0.54,
        }, 0.18)
        // Real gastronomy settles into place with weight
        .fromTo('.indarra-gastro-img',
          { scale: 1.06 },
          { scale: 1.0, ease: 'none', duration: 0.54 },
          0.18
        )
        // Initial narrative fades out cleanly before Moment 3 appears
        .to(textMoment1Ref.current, {
          opacity: 0,
          y: -14,
          pointerEvents: 'none',
          ease: 'power2.in',
          duration: 0.16,
        }, 0.14)
        // Culinary narrative emerges firmly with zero overlap
        .to(textMoment3Ref.current, {
          opacity: 1,
          y: 0,
          pointerEvents: 'auto',
          ease: 'power2.out',
          duration: 0.28,
        }, 0.34)
        // Scroll prompt fades out as soon as scroll begins
        .to('.indarra-scroll-cue', {
          opacity: 0,
          duration: 0.08,
        }, 0.05);
    });

    // MOBILE (< 768px): Adapted fluid pinned transformation
    mm.add('(max-width: 767px)', () => {
      gsap.set(gastroLayerRef.current, {
        clipPath: 'polygon(150% 0%, 100% 0%, 100% 100%, 130% 100%)',
      });
      gsap.set(textMoment1Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto' });
      gsap.set(textMoment3Ref.current, { opacity: 0, y: 15, pointerEvents: 'none' });

      const mobTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=90%',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      mobTl
        .to(gastroLayerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'none',
          duration: 0.54,
        }, 0.15)
        .to('.indarra-aizkolari-img', {
          scale: 1.05,
          filter: 'brightness(0.3) contrast(1.2)',
          ease: 'none',
          duration: 0.54,
        }, 0.15)
        .to(textMoment1Ref.current, {
          opacity: 0,
          y: -10,
          duration: 0.16,
          pointerEvents: 'none',
        }, 0.12)
        .to(textMoment3Ref.current, {
          opacity: 1,
          y: 0,
          duration: 0.28,
          pointerEvents: 'auto',
        }, 0.32)
        .to('.indarra-scroll-cue', {
          opacity: 0,
          duration: 0.08,
        }, 0.05);
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="indarra"
      className="relative min-h-screen w-full flex flex-col justify-between py-24 sm:py-32 px-4 sm:px-8 lg:px-16 overflow-hidden select-none bg-[#07080a]"
      aria-label="Indarra - Zutarri Jatetxearen Indarra eta Gastronomia"
    >
      {/* LAYER 1: Full-Bleed Monochrome Aizkolari (Tradition, Raw Power) */}
      <div ref={aizkolariLayerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="./assets/indarra-aizkolari.webp"
          alt="Aizkolaria aizkorarekin enborra mozten indar betean Bizkaiko plazan"
          className="indarra-aizkolari-img w-full h-full object-cover object-center grayscale contrast-125 brightness-[0.55] scale-100 transition-transform duration-700 ease-out"
        />
        {/* Soft chiaroscuro environmental vignettes to integrate typography without boxes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/95 via-[#07080a]/55 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07080a] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none" />
        {/* Mobile ambient contrast scrim */}
        <div className="absolute inset-0 bg-[#07080a]/50 sm:hidden pointer-events-none" />
      </div>

      {/* LAYER 2: Real Gastronomy of Zutarri (Natural Vibrant Color, Wood & Fire) */}
      <div ref={gastroLayerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="./assets/indarra-gastronomia.webp"
          alt="Zutarriren Kruntxitalo kurruskaria zurezko oholean Gernikako piparrekin eta betelan mamitsuarekin"
          className="indarra-gastro-img w-full h-full object-cover object-center brightness-[0.88] contrast-110 scale-100 transition-transform duration-700 ease-out"
        />
        {/* Chiaroscuro Environmental Vignettes for high contrast and readability on the text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/95 via-[#07080a]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#07080a] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07080a] to-transparent pointer-events-none" />
      </div>

      {/* Top Scene Marker: Floating text without divider lines */}
      <div className="relative z-10 w-full flex items-center justify-between pb-2 text-[#9ca3af]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] inline-block animate-pulse" />
          <span>{t.index}</span>
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] hidden sm:inline">
          {currentLang === 'eu'
            ? 'Herri Kirolak · Egurra · Gastronomia Bizia'
            : 'Deporte Rural · Madera Noble · Gastronomía Viva'}
        </span>
      </div>

      {/* Main Narrative Workspace Floating in the Scene (No Cards, No Lines!) */}
      <div className="relative z-10 my-auto py-6 sm:py-10 max-w-2xl space-y-7">
        {/* Animated Semantic Title: Axe-Strike Entrance from Above */}
        <SectionTitle
          section="indarra"
          badge={t.index}
          title="INDARRA"
          subtitle={`«${t.title}»`}
        />

        {/* Dynamic Narrative Container (Zero Layout Shift) */}
        <div className="relative min-h-[260px] sm:min-h-[270px]">
          {/* MOMENT 1 TEXT: The Raw Strength of Heritage */}
          <div ref={textMoment1Ref} className="space-y-5">
            <p className="font-editorial italic text-xl sm:text-2xl text-[#f3f4f6] leading-snug drop-shadow-md">
              {t.body1}
            </p>
            <p className="font-sans text-base sm:text-lg text-[#d1d5db] leading-relaxed drop-shadow-md">
              {t.body2}
            </p>

            {/* Scroll Cue Prompt */}
            <div className="indarra-scroll-cue pt-2 flex items-center gap-2.5 font-mono text-[11px] sm:text-xs text-[#d49b42] uppercase tracking-[0.25em] animate-pulse">
              <ArrowDown className="w-3.5 h-3.5" />
              <span>{t.scrollCue}</span>
            </div>
          </div>

          {/* MOMENT 3 TEXT: The Gastronomic Continuation in Zutarri */}
          <div ref={textMoment3Ref} className="space-y-6 absolute inset-0">
            <p className="font-editorial italic text-xl sm:text-2xl text-[#f3f4f6] leading-snug drop-shadow-md">
              «{t.transformTitle}»
            </p>
            <p className="font-sans text-base sm:text-lg text-[#d1d5db] leading-relaxed drop-shadow-md">
              {t.transformBody}
            </p>

            {/* Kinetic Principles Floating Cleanly in 2 Columns (Zero Boxes, Zero Lines) */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-1.5">
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

              <div className="space-y-1.5">
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
        </div>
      </div>

      {/* Bottom Scene Footnote: Floating gracefully without divider lines */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs font-mono text-[#9ca3af]">
        <div className="flex items-center gap-2">
          <span className="text-[#d49b42]">✦</span>
          <span>
            {currentLang === 'eu'
              ? 'Aizkolariaren enborretik sukaldeko zurezko oholera: Zutarriren Kruntxitalo erreala.'
              : 'Del tronco del aizkolari a la tabla de cocina: el Kruntxitalo real de Zutarri.'}
          </span>
        </div>
        <span className="text-[#6b7280] uppercase tracking-widest hidden md:inline">
          HERRI KIROLAK &rarr; ZUTARRI SUKALDARITZA
        </span>
      </div>
    </section>
  );
};
