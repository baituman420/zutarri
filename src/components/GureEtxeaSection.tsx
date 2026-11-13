import React from 'react';
import { MapPin, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface GureEtxeaSectionProps {
  currentLang: Language;
}

export const GureEtxeaSection: React.FC<GureEtxeaSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].gureEtxea;

  return (
    <section
      id="gure-etxea"
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

        {/* Grand Architectural & Mural Image */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[22/9] rounded-sm overflow-hidden bg-[#16181c] border border-[#262932] shadow-2xl mb-16 group">
          <img
            src="./assets/gure-etxea-mural.jpg"
            alt="Zutarri Jatetxearen jantokia, harrizko hormak eta artoaren mural zuri-beltz artistikoa"
            className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent pointer-events-none" />

          {/* Mural Caption Card */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-lg bg-[#0c0d0e]/95 backdrop-blur-md border border-[#2b2d35] p-5 rounded-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d49b42] block mb-1">
              ARGAZKI DOKUMENTALA // GURE ESPAZIOA
            </span>
            <h3 className="font-display font-bold text-lg text-[#f3f4f6] uppercase tracking-wide">
              {t.muralDetail}
            </h3>
            <p className="font-mono text-xs text-[#9ca3af] mt-1">
              {t.locationDetail}
            </p>
          </div>
        </div>

        {/* Narrative & Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="font-editorial text-xl sm:text-2xl text-[#f3f4f6] italic leading-relaxed border-l-2 border-[#d49b42] pl-4">
              {t.body1}
            </p>
            <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
              {t.body2}
            </p>
          </div>

          <div className="p-8 bg-[#141518] border border-[#252830] rounded-sm space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#1b1c20] border border-[#2e313a] rounded-sm text-[#d49b42] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                  Bentako Plaza, 3 · Basauri
                </h3>
                <p className="font-mono text-xs text-[#9ca3af] mt-1">
                  Arizko metro geltokitik 3 minutura oinez. Aparkaleku erosoak inguruan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#1b1c20] border border-[#2e313a] rounded-sm text-[#d49b42] flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                  Herriari Lotutako Proiektua
                </h3>
                <p className="font-mono text-xs text-[#9ca3af] mt-1">
                  Zutarri Kultura Elkartearen ekimena: herriaren nortasuna, elkartasuna eta euskal kultura bizirik mantentzea.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
