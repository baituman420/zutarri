import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070809] border-t border-[#1a1c22] py-16 px-4 sm:px-6 lg:px-12 text-[#9ca3af]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Mission */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-lg tracking-[0.25em] text-[#f3f4f6]">
              ZUTARRI
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6b7280]">
              Jatetxea · Basauri
            </span>
          </div>
          <p className="font-editorial text-sm italic text-[#6b7280]">
            {t.authorNote}
          </p>
          <p className="font-mono text-[10px] text-[#4b505c]">
            {t.copyright}
          </p>
        </div>

        {/* Linguistic Review Note (as required by prompt for pre-publication validation) */}
        {t.reviewTag && (
          <div className="max-w-sm p-2.5 bg-[#121316] border border-[#262832] rounded-sm text-[10px] font-mono text-[#d49b42]/80 leading-normal">
            {t.reviewTag}
          </div>
        )}

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          className="p-3 bg-[#131417] hover:bg-[#1f2127] border border-[#252830] hover:border-white/40 text-[#f3f4f6] rounded-sm transition-colors cursor-pointer flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
          aria-label="Itzuli gora"
        >
          <span>Gora</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
