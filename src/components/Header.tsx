import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUpRight, Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onOpenMenuModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  isSoundEnabled,
  onToggleSound,
  onOpenMenuModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy to highlight active section in mobile and desktop
  useEffect(() => {
    const sectionIds = ['sustraiak', 'indarra', 'sukaldaritza', 'gure-etxea', 'kontaktua'];
    const handleScrollSpy = () => {
      const viewportHeight = window.innerHeight;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportHeight * 0.45 && rect.bottom >= viewportHeight * 0.2) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const navLinks = [
    { href: '#sustraiak', id: 'sustraiak', label: t.nav.sustraiak },
    { href: '#indarra', id: 'indarra', label: t.nav.indarra },
    { href: '#sukaldaritza', id: 'sukaldaritza', label: t.nav.sukaldaritza },
    { href: '#gure-etxea', id: 'gure-etxea', label: t.nav.gureEtxea },
    { href: '#kontaktua', id: 'kontaktua', label: t.nav.kontaktua },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#07080a]/95 backdrop-blur-md py-2 sm:py-3 shadow-2xl'
          : 'bg-transparent py-3 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity: Hidden while resting in hero to let the central stone & ZUTARRI shine; reveals seamlessly on scroll */}
        <div className="flex items-center min-w-[140px] sm:min-w-[180px]">
          <a
            href="#"
            className={`group flex items-center gap-3 transition-all duration-500 ${
              isScrolled
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
            aria-label="Zutarri Jatetxea"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#16181b] border border-white/20 flex items-center justify-center p-0.5 shadow-md group-hover:border-[#d49b42] transition-colors">
              <img
                src="./assets/logo-piedras-isolated.webp"
                alt="Zutarri ikurra"
                className="w-full h-full object-contain grayscale contrast-125"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base sm:text-lg tracking-[0.22em] text-[#f3f4f6] leading-tight">
                ZUTARRI
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#9ca3af]">
                Basauri
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation: Minimal, spaced, sophisticated (UNTOUCHED) */}
        <nav className="hidden lg:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-[#9ca3af]">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-[#d49b42] after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-white after:w-full font-semibold'
                    : 'hover:text-white after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <button
            onClick={onOpenMenuModal}
            className="text-[#d49b42] hover:text-[#f3f4f6] transition-colors py-1 font-semibold flex items-center gap-1 cursor-pointer tracking-[0.22em]"
          >
            {t.nav.carta}
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>
        </nav>

        {/* Controls: Audio Toggle, Language Switcher, Reservation CTA */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* Audio Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-[10px] font-mono tracking-wider transition-all duration-300 cursor-pointer backdrop-blur-sm ${
              isSoundEnabled
                ? 'bg-[#1e1c18]/90 border-[#d49b42]/60 text-[#d49b42] shadow-[0_0_12px_rgba(212,155,66,0.18)]'
                : 'bg-[#141518]/70 border-white/10 text-[#888e9b] hover:text-[#e5e7eb] hover:border-white/25'
            }`}
            title={isSoundEnabled ? t.nav.soundOn : t.nav.soundOff}
            aria-label={isSoundEnabled ? t.nav.soundOn : t.nav.soundOff}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#d49b42]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline font-mono">
              {isSoundEnabled ? 'SOINUA ON' : 'SOINUA'}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#131416]/75 backdrop-blur-sm p-0.5 rounded-sm border border-white/10 text-[10px] font-mono tracking-wider">
            <button
              onClick={() => onLanguageChange('eu')}
              className={`px-2 py-1 rounded-[2px] transition-all duration-200 cursor-pointer ${
                currentLang === 'eu'
                  ? 'bg-[#f3f4f6] text-[#07080a] font-bold shadow-sm'
                  : 'text-[#848a96] hover:text-[#e5e7eb]'
              }`}
              aria-label="Euskera"
            >
              EUS
            </button>
            <span className="text-white/20 px-0.5 select-none">/</span>
            <button
              onClick={() => onLanguageChange('es')}
              className={`px-2 py-1 rounded-[2px] transition-all duration-200 cursor-pointer ${
                currentLang === 'es'
                  ? 'bg-[#f3f4f6] text-[#07080a] font-bold shadow-sm'
                  : 'text-[#848a96] hover:text-[#e5e7eb]'
              }`}
              aria-label="Castellano"
            >
              ES
            </button>
          </div>

          {/* Reservation CTA Desktop / Tablet */}
          <a
            href="tel:+34688766398"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#07080a] hover:text-white transition-all duration-300 font-mono text-[10px] uppercase tracking-widest font-bold rounded-sm shadow-sm"
          >
            <Phone className="w-3 h-3" />
            <span>{t.nav.erreserbatu}</span>
          </a>

          {/* Reservation CTA Mobile Phone Icon */}
          <a
            href="tel:+34688766398"
            className="sm:hidden p-1.5 text-[#d49b42] hover:text-white rounded-sm border border-[#d49b42]/30 bg-[#1e1c18]/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
            aria-label="Deitu eta erreserbatu: 688 76 63 98"
            title="688 76 63 98"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Navigation: Single line, swipeable, scrollbar hidden, non-blocking touch */}
      <nav
        aria-label="Nabigazio mugikorra"
        className="lg:hidden w-full overflow-x-auto whitespace-nowrap scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-contain px-4 py-2 mt-1.5 flex items-center gap-5 border-t border-white/10 bg-[#07080a]/90 backdrop-blur-md"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`text-[11px] font-mono uppercase tracking-[0.18em] transition-all duration-200 py-1 flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'text-[#d49b42] font-bold border-b-2 border-[#d49b42]'
                  : 'text-[#9ca3af] hover:text-white'
              }`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42] animate-pulse" />
              )}
              {link.label}
            </a>
          );
        })}
        <button
          onClick={onOpenMenuModal}
          className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#d49b42] hover:text-[#f3f4f6] font-semibold py-1 flex items-center gap-1 shrink-0 cursor-pointer ml-1"
        >
          <span>{t.nav.carta}</span>
          <ArrowUpRight className="w-3 h-3 opacity-80" />
        </button>
      </nav>
    </header>
  );
};
