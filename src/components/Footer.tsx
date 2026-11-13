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

        {/* Social Links & Review Tag */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://www.instagram.com/zutarri_jatetxea/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#848a96] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>
            <span className="text-[#2b2d35]">·</span>
            <a
              href="https://www.facebook.com/zutarrijatetxea"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#848a96] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>

          {/* Linguistic Review Tag */}
          {t.reviewTag && (
            <div className="max-w-xs p-2 bg-[#121316] border border-[#262832] rounded-sm text-[10px] font-mono text-[#d49b42]/80 leading-normal">
              {t.reviewTag}
            </div>
          )}
        </div>

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
