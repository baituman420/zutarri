import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowDown, CornerDownRight, Volume2 } from 'lucide-react';
import { Language, TxalapartaZone } from '../types';
import { txalapartaZones, translations } from '../data/translations';

interface TxalapartaHeroProps {
  currentLang: Language;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  playWoodStrike: (frequency: number) => void;
  onOpenMenuModal: () => void;
}

interface FlourParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  drag: number;
  drift: number;
}

export const TxalapartaHero: React.FC<TxalapartaHeroProps> = ({
  currentLang,
  isSoundEnabled,
  onToggleSound,
  playWoodStrike,
  onOpenMenuModal,
}) => {
  const t = translations[currentLang];
  const [activeZone, setActiveZone] = useState<TxalapartaZone | null>(txalapartaZones[0]);
  const [strikingZoneId, setStrikingZoneId] = useState<string | null>(null);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  // Canvas ref for flour dust particle system
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<FlourParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const instrumentRef = useRef<HTMLDivElement | null>(null);

  // Flour dust animation loop
  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx + Math.sin(p.y * 0.05) * p.drift;
      p.y += p.vy;
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + 0.025; // Slight downward gravitational pull after burst
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 242, 235, ${p.alpha})`;
      ctx.shadowColor = 'rgba(235, 230, 220, 0.4)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    }

    if (particles.length > 0) {
      animFrameRef.current = requestAnimationFrame(updateParticles);
    } else {
      animFrameRef.current = null;
    }
  }, []);

  // Trigger fine corn flour dust burst at specific coordinate
  const emitFlourDust = useCallback((originX: number, originY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const count = 45; // Micro particles
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 1.1) + Math.random() * (Math.PI * 0.8); // Mostly upward cone
      const speed = 1.8 + Math.random() * 4.5;
      particlesRef.current.push({
        x: originX + (Math.random() - 0.5) * 20,
        y: originY + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed * 0.7 + (Math.random() - 0.5) * 1.5,
        vy: Math.sin(angle) * speed,
        radius: 0.9 + Math.random() * 2.2,
        alpha: 0.7 + Math.random() * 0.25,
        decay: 0.008 + Math.random() * 0.012,
        drag: 0.95 + Math.random() * 0.02,
        drift: 0.3 + Math.random() * 0.4,
      });
    }

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(updateParticles);
    }
  }, [updateParticles]);

  // Adjust canvas size to match container
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = instrumentRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Handle striking a zone
  const handleStrike = (zone: TxalapartaZone, event?: React.MouseEvent | React.KeyboardEvent) => {
    setStrikingZoneId(zone.id);
    setActiveZone(zone);

    // Play synthesized wood resonance
    playWoodStrike(zone.makilaPitch);

    // Calculate canvas relative coordinates for flour dust
    if (instrumentRef.current && canvasRef.current) {
      const rect = instrumentRef.current.getBoundingClientRect();
      let clickX = 0;
      let clickY = rect.height * 0.52; // Default strike line on timber plank

      if (event && 'clientX' in event && event.clientX) {
        clickX = event.clientX - rect.left;
        clickY = event.clientY - rect.top;
      } else {
        // Fallback to zone's center X
        const zoneIndex = txalapartaZones.findIndex(z => z.id === zone.id);
        const zoneWidth = rect.width / txalapartaZones.length;
        clickX = zoneWidth * (zoneIndex + 0.5);
      }

      emitFlourDust(clickX, clickY);
    }

    // Reset strike animation state
    setTimeout(() => {
      setStrikingZoneId(null);
    }, 450);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#0b0c0e] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden select-none"
    >
      {/* Background Ambient Lighting & Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(35,30,25,0.4),rgba(11,12,14,0.95)_75%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Top Editorial Identity Header */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1f2127]">
        <div>
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[#9ca3af] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d49b42] inline-block animate-pulse" />
            <span>01 // {t.hero.subtitle}</span>
            <span className="text-[#3c404d]">·</span>
            <span>BASAURI BIZKAIA</span>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#f3f4f6] uppercase leading-none">
            ZUTARRI
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-[#d1d5db] mt-3 max-w-xl leading-snug">
            {t.hero.claim}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end text-left md:text-right font-mono text-xs text-[#9ca3af]">
          <span className="text-[#f3f4f6] font-medium tracking-wider">BENTAKO PLAZA, 3</span>
          <span className="text-[#6b7280] mt-0.5 tracking-wider">43.2361° N, 2.8887° W</span>
          <div className="mt-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
            <span className="text-[11px] text-[#9ca3af] uppercase tracking-widest">
              Gaur irekita · Ariz Metroa
            </span>
          </div>
        </div>
      </div>

      {/* Center Stage: Authentic Full-Span Txalaparta Interactive Instrument */}
      <div className="relative z-10 my-auto py-8 sm:py-12 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Interaction hint prompt banner */}
        <div className="mb-4 flex items-center gap-3 px-4 py-1.5 bg-[#141518]/80 border border-[#26282f] rounded-full text-xs font-mono tracking-wider text-[#9ca3af]">
          <span className="inline-block w-2 h-2 bg-[#d49b42] rounded-full animate-ping" />
          <span>{t.hero.interactionGuide}</span>
          {!isSoundEnabled && (
            <button
              onClick={onToggleSound}
              className="ml-2 text-[#d49b42] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Volume2 className="w-3 h-3" />
              <span>Soinua aktibatu</span>
            </button>
          )}
        </div>

        {/* The Instrument Frame spanning 100% of max width */}
        <div
          ref={instrumentRef}
          className="relative w-full aspect-[16/8] sm:aspect-[21/9] lg:aspect-[24/8] max-h-[460px] bg-[#121316] rounded-sm border border-[#22252c] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden group"
        >
          {/* Base Layer: High-Contrast Documentary Txalaparta Photo */}
          <img
            src="./assets/txalaparta-hero.jpg"
            alt="Txalaparta tradizionala zurezko oholekin eta makilekin"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-[0.72] group-hover:brightness-[0.78] transition-all duration-700 pointer-events-none"
          />

          {/* Caravaggio Chiaroscuro Lateral Light Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c0e]/90 via-transparent to-[#0b0c0e]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-[#0b0c0e]/40 pointer-events-none" />

          {/* HTML5 Canvas overlay for realistic fine corn flour dust dispersion */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          />

          {/* Interactive 4 Vertical Strike Zones & Floating Makilak */}
          <div className="absolute inset-0 z-30 flex items-stretch divide-x divide-white/[0.04]">
            {txalapartaZones.map((zone) => {
              const isStriking = strikingZoneId === zone.id;
              const isHovered = hoveredZoneId === zone.id;
              const isSelected = activeZone?.id === zone.id;

              return (
                <div
                  key={zone.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Makila ${zone.number}: ${zone.name[currentLang]}`}
                  onClick={(e) => handleStrike(zone, e)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleStrike(zone);
                    }
                  }}
                  onMouseEnter={() => setHoveredZoneId(zone.id)}
                  onMouseLeave={() => setHoveredZoneId(null)}
                  className={`relative flex-1 h-full cursor-pointer flex flex-col justify-between p-4 sm:p-6 transition-colors duration-300 focus:outline-none focus:bg-white/[0.04] ${
                    isSelected ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Top: The Makila (Wood Baton) Graphic hanging above plank */}
                  <div className="relative w-full flex flex-col items-center pt-2">
                    {/* Baton Shadow */}
                    <div
                      className={`w-3 sm:w-4 h-24 sm:h-32 rounded-full bg-gradient-to-b from-[#4a3a2d] via-[#2d221a] to-[#120d09] border border-[#5c4738]/50 shadow-[0_8px_20px_rgba(0,0,0,0.9)] transition-all duration-300 transform ${
                        isStriking
                          ? 'translate-y-16 sm:translate-y-20 scale-y-95 border-[#d49b42]'
                          : isHovered
                          ? '-translate-y-3 rotate-1'
                          : 'translate-y-0'
                      }`}
                    >
                      {/* Makila Woodgrain texture highlight */}
                      <div className="w-0.5 h-full mx-auto bg-white/20 rounded-full opacity-60" />
                    </div>

                    {/* Makila Marker Badge */}
                    <div
                      className={`mt-2 px-2 py-0.5 rounded-[2px] font-mono text-[9px] uppercase tracking-widest transition-all duration-300 ${
                        isStriking
                          ? 'bg-[#d49b42] text-[#0c0d0e] font-bold'
                          : isHovered || isSelected
                          ? 'bg-[#252830] text-[#f3f4f6]'
                          : 'bg-[#18191c]/80 text-[#717682]'
                      }`}
                    >
                      Makila {zone.number}
                    </div>
                  </div>

                  {/* Mid-Lower: Strike Point on horizontal timber plank */}
                  <div className="relative w-full pb-2">
                    {/* Dynamic shockwave ring on strike */}
                    {isStriking && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 rounded-full border border-[#f3f4f6]/60 animate-ping pointer-events-none" />
                    )}

                    {/* Plank contact indicator */}
                    <div
                      className={`w-full py-2.5 border-b-2 transition-all duration-300 flex items-baseline justify-between ${
                        isStriking
                          ? 'border-[#f3f4f6] translate-y-1'
                          : isHovered
                          ? 'border-[#d49b42]'
                          : isSelected
                          ? 'border-[#8f96a3]'
                          : 'border-[#2d3039]'
                      }`}
                    >
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#d49b42]">
                        {zone.number}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base lg:text-lg uppercase tracking-wider text-[#f3f4f6]">
                        {zone.name[currentLang]}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono text-[#9ca3af]">
                      <span className="truncate">{zone.subtitle[currentLang]}</span>
                      <CornerDownRight className="w-3 h-3 opacity-60 flex-shrink-0 ml-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Editorial Reveal Box beneath the instrument */}
        {activeZone && (
          <div className="w-full max-w-4xl mt-6 p-5 sm:p-6 bg-[#131417]/95 border border-[#25272e] rounded-sm shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all duration-500 animate-fadeIn">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 font-mono text-xs text-[#d49b42] uppercase tracking-widest mb-1">
                <span>{activeZone.number} // ATALA</span>
                <span className="text-[#3c404d]">·</span>
                <span>{activeZone.name[currentLang]}</span>
              </div>
              <p className="font-editorial text-base sm:text-lg text-[#e5e7eb] italic">
                {activeZone.description[currentLang]}
              </p>
            </div>

            <button
              onClick={() => scrollToSection(activeZone.sectionId)}
              className="px-5 py-2.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#0c0d0e] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center gap-2 group/btn cursor-pointer whitespace-nowrap shadow-md"
            >
              <span>{activeZone.name[currentLang]}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* Fallback Fast-Access Conventional Navigation Bar */}
        <div className="w-full max-w-4xl mt-6 pt-4 border-t border-[#1f2127] flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-[#9ca3af]">
          <span className="text-[#6b7280] hidden sm:inline">NABIGAZIO AZKARRA:</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {txalapartaZones.map(zone => (
              <button
                key={zone.id}
                onClick={() => scrollToSection(zone.sectionId)}
                className="hover:text-[#f3f4f6] transition-colors cursor-pointer"
              >
                {zone.number} · {zone.name[currentLang]}
              </button>
            ))}
            <span className="text-[#3c404d]">·</span>
            <button
              onClick={onOpenMenuModal}
              className="text-[#d49b42] hover:underline cursor-pointer font-bold"
            >
              {t.nav.carta}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Quote & Scroll Anchor */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#1f2127] text-xs font-mono text-[#6b7280]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#d49b42] rounded-full inline-block" />
          <span className="uppercase tracking-widest">
            ZUTARRI // {currentLang === 'eu' ? 'HARRI, ARTO ETA EGUR SOINUA' : 'SONIDO DE PIEDRA, MAÍZ Y MADERA'}
          </span>
        </div>
        <button
          onClick={() => scrollToSection('sustraiak')}
          className="flex items-center gap-2 text-[#9ca3af] hover:text-[#f3f4f6] transition-colors cursor-pointer group"
          aria-label={t.hero.scrollDown}
        >
          <span className="uppercase tracking-widest text-[11px]">{t.hero.scrollDown}</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
