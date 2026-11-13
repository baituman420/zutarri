import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Phone } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#sustraiak', label: t.nav.sustraiak },
    { href: '#indarra', label: t.nav.indarra },
    { href: '#sukaldaritza', label: t.nav.sukaldaritza },
    { href: '#gure-etxea', label: t.nav.gureEtxea },
    { href: '#kontaktua', label: t.nav.kontaktua },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0c0d0e]/95 backdrop-blur-md border-b border-[#25272c] py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0c0d0e]/90 via-[#0c0d0e]/50 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none focus:ring-1 focus:ring-white/40"
          aria-label="Zutarri Jatetxea Basauri"
        >
          <div className="w-10 h-10 rounded-sm bg-[#16181b] border border-[#2e3138] flex items-center justify-center p-1 group-hover:border-white/40 transition-colors">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
              <rect x="4" y="10" width="32" height="4" rx="1" fill="#f3f4f6" />
              <rect x="7" y="18" width="26" height="4" rx="1" fill="#d49b42" />
              <circle cx="16" cy="28" r="2.5" fill="#9ca3af" />
              <circle cx="24" cy="28" r="2.5" fill="#9ca3af" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-[0.25em] text-[#f3f4f6] group-hover:text-white transition-colors leading-tight">
              ZUTARRI
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-[#9ca3af]">
              Jatetxea · Basauri
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-[0.18em] text-[#9ca3af]">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onOpenMenuModal}
            className="text-[#d49b42] hover:text-[#f3f4f6] transition-colors py-1 font-semibold flex items-center gap-1 cursor-pointer"
          >
            {t.nav.carta}
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>
        </nav>

        {/* Controls: Sound, Language, Reservations */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
              isSoundEnabled
                ? 'bg-[#1e1c18] border-[#d49b42]/60 text-[#d49b42] shadow-[0_0_12px_rgba(212,155,66,0.15)]'
                : 'bg-[#141518]/80 border-[#282a30] text-[#717682] hover:text-[#d1d5db] hover:border-[#3d414a]'
            }`}
            title={isSoundEnabled ? t.nav.soundOn : t.nav.soundOff}
            aria-label={isSoundEnabled ? t.nav.soundOn : t.nav.soundOff}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#d49b42]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline font-mono text-[10px]">
              {isSoundEnabled ? 'SOINUA ON' : 'SOINUA OFF'}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#131416] p-0.5 rounded-sm border border-[#282a30] text-[11px] font-mono tracking-wider">
            <button
              onClick={() => onLanguageChange('eu')}
              className={`px-2 py-1 rounded-[2px] transition-all duration-200 cursor-pointer ${
                currentLang === 'eu'
                  ? 'bg-[#f3f4f6] text-[#0c0d0e] font-bold shadow-sm'
                  : 'text-[#848a96] hover:text-[#e5e7eb]'
              }`}
              aria-label="Euskera"
            >
              EUS
            </button>
            <span className="text-[#3a3d46] px-0.5 select-none">/</span>
            <button
              onClick={() => onLanguageChange('es')}
              className={`px-2 py-1 rounded-[2px] transition-all duration-200 cursor-pointer ${
                currentLang === 'es'
                  ? 'bg-[#f3f4f6] text-[#0c0d0e] font-bold shadow-sm'
                  : 'text-[#848a96] hover:text-[#e5e7eb]'
              }`}
              aria-label="Castellano"
            >
              ES
            </button>
          </div>

          {/* Social Links: Instagram & Facebook */}
          <div className="hidden sm:flex items-center gap-1.5">
            <a
              href="https://www.instagram.com/zutarri_jatetxea/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-sm border border-[#282a30] bg-[#141518]/80 text-[#848a96] hover:text-[#e5e7eb] hover:border-[#3d414a] transition-colors"
              aria-label="Instagram Zutarri Jatetxea"
              title="Instagram @zutarri_jatetxea"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/zutarrijatetxea"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-sm border border-[#282a30] bg-[#141518]/80 text-[#848a96] hover:text-[#e5e7eb] hover:border-[#3d414a] transition-colors"
              aria-label="Facebook Zutarri Jatetxea"
              title="Facebook Zutarri Jatetxea"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>

          {/* Quick Reservation Button */}
          <a
            href="tel:+34688766398"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f3f4f6] text-[#0c0d0e] hover:bg-[#d49b42] hover:text-white transition-all duration-300 font-mono text-[11px] uppercase tracking-widest font-semibold rounded-sm"
          >
            <Phone className="w-3 h-3" />
            <span>{t.nav.erreserbatu}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 text-[#9ca3af] hover:text-white rounded-sm border border-[#282a30] bg-[#141518]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0d0e]/98 border-b border-[#25272c] px-6 py-6 flex flex-col gap-5 text-sm font-mono uppercase tracking-[0.18em]">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#9ca3af] hover:text-white transition-colors py-1 border-b border-[#1b1c20]"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenMenuModal();
            }}
            className="text-left text-[#d49b42] font-semibold flex items-center justify-between py-1 border-b border-[#1b1c20]"
          >
            <span>{t.nav.carta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <a
            href="tel:+34688766398"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-2.5 bg-[#f3f4f6] text-[#0c0d0e] font-mono text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 mt-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.nav.erreserbatu} (688 76 63 98)</span>
          </a>
          <div className="flex items-center justify-center gap-6 pt-2 border-t border-[#1b1c20]">
            <a
              href="https://www.instagram.com/zutarri_jatetxea/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9ca3af] hover:text-white flex items-center gap-2"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <span className="text-[#3a3d46]">·</span>
            <a
              href="https://www.facebook.com/zutarrijatetxea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9ca3af] hover:text-white flex items-center gap-2"
            >
              <span>Facebook</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
