import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type SectionIdentity = 'sustraiak' | 'indarra' | 'sukaldaritza' | 'gure-etxea' | 'kontaktua';

interface SectionTitleProps {
  section: SectionIdentity;
  badge: string;
  title: string;
  subtitle?: string;
  className?: string;
}

/**
 * Reusable Section Title component with identity-driven GSAP entrance animations.
 * For Sustraiak: The title emerges vertically from the depths of the earth/hearth
 * through a masked plane, evoking origin, matter, and deep-rooted permanence.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  section,
  badge,
  title,
  subtitle,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      gsap.set(['.title-badge', '.title-word', '.title-subtitle'], {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'none',
      });
      return;
    }

    if (section === 'sustraiak') {
      // Sustraiak: Raíces, materia profunda que emerge desde la tierra y echa raíces
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        '.title-badge',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          '.title-word',
          {
            yPercent: 115,
            scale: 0.94,
            opacity: 0,
            filter: 'blur(4px) brightness(0.5)',
          },
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px) brightness(1)',
            duration: 0.85,
            ease: 'power3.out',
          },
          '-=0.3'
        )
        .fromTo(
          '.title-subtitle',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        );
    }

    if (section === 'indarra') {
      // Indarra: Impacto seco, rápido y con peso de un hacha cayendo sobre madera noble
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power4.out' },
      });

      tl.fromTo(
        '.title-badge',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
        .fromTo(
          '.title-word',
          {
            yPercent: -130,
            scaleY: 1.12,
            opacity: 0,
          },
          {
            yPercent: 0,
            scaleY: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power4.out',
          },
          '-=0.15'
        )
        .fromTo(
          '.title-subtitle',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          '+=0.05'
        );
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`space-y-3 ${className}`}>
      {/* Index Badge */}
      <div className="title-badge flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] inline-block animate-pulse" />
        <span>{badge}</span>
      </div>

      {/* Masked Emerging Title */}
      <div className="overflow-hidden py-1">
        <h2 className="title-word font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#f3f4f6] uppercase leading-[0.92] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          {title}
        </h2>
      </div>

      {/* Editorial Subtitle / Quote */}
      {subtitle && (
        <p className="title-subtitle font-editorial italic text-lg sm:text-xl md:text-2xl text-[#d49b42] leading-snug drop-shadow-md">
          {subtitle}
        </p>
      )}
    </div>
  );
};
