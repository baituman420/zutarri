import React from 'react';
import { ArrowUpRight, CheckCircle2, BookOpen } from 'lucide-react';
import { Language } from '../types';
import { menuItems, translations } from '../data/translations';

interface SukaldaritzaSectionProps {
  currentLang: Language;
  onOpenMenuModal: () => void;
}

export const SukaldaritzaSection: React.FC<SukaldaritzaSectionProps> = ({
  currentLang,
  onOpenMenuModal,
}) => {
  const t = translations[currentLang].sukaldaritza;

  return (
    <section
      id="sukaldaritza"
      className="relative w-full bg-[#0e0f12] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#1d1f25] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#22252c]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block mb-2">
              {t.index}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#f3f4f6] uppercase">
              {t.title}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-editorial text-lg sm:text-xl text-[#9ca3af] italic max-w-md text-left md:text-right">
              {t.lead}
            </p>
            <button
              onClick={onOpenMenuModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#0c0d0e] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm cursor-pointer shadow-md"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.viewFullMenu}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Master Plating Hero Feature: Grand Asymmetric Editorial Composition */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-sm overflow-hidden bg-[#16181c] border border-[#282a32] shadow-2xl mb-16 group">
          {/* Selective Color Image: Slate and background in rich charcoal monochrome, the talo dish in rich natural warm hues */}
          <img
            src="./assets/sukaldaritza-master-talo.jpg"
            alt="Zutarriren arto-talo garaikidea: txistorra txingartua, tipula motela eta Idiazabal ardi-gazta ketua"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />

          {/* Technique Tag */}
          <div className="absolute top-4 left-4 bg-[#0c0d0e]/90 backdrop-blur-sm border border-[#2b2d35] px-3 py-1 rounded-[2px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d49b42]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e7eb]">
              Plater Nagusia · Kolore Naturala
            </span>
          </div>

          {/* Master Callout Badge */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md bg-[#0c0d0e]/95 backdrop-blur-md border border-[#2b2d35] p-5 rounded-sm shadow-xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d49b42] block mb-1">
              SUKALDEBURUAREN SORKUNTZA // BILDUMA BEREZIA
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#f3f4f6] uppercase tracking-tight">
              Talo Tradizionala & Idiazabal
            </h3>
            <p className="font-editorial text-sm sm:text-base text-[#9ca3af] italic mt-1 leading-snug">
              {t.masterCaption}
            </p>
            <div className="mt-3 pt-3 border-t border-[#22252c] flex items-center justify-between text-xs font-mono text-[#6b7280]">
              <span className="text-[#15803d] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% Gluten-Free</span>
              </span>
              <span className="uppercase tracking-widest">ZUTARRI JATETXEA</span>
            </div>
          </div>
        </div>

        {/* Editorial Menu Breakdown: Handcrafted Editorial Rows (NOT generic rounded cards!) */}
        <div className="border-t border-[#22252c] divide-y divide-[#22252c]">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline group hover:bg-white/[0.01] transition-colors px-2 sm:px-4"
            >
              {/* Item Index & Badge */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <span className="font-mono text-xs text-[#d49b42] font-bold">
                  0{index + 1}
                </span>
                <span className="px-2 py-0.5 rounded-[2px] bg-[#18191c] border border-[#282a30] font-mono text-[10px] uppercase tracking-wider text-[#9ca3af]">
                  {item.badge[currentLang]}
                </span>
                {item.glutenFree && (
                  <span className="text-[10px] font-mono text-[#15803d] uppercase font-bold tracking-wider">
                    GF
                  </span>
                )}
              </div>

              {/* Item Name & Details */}
              <div className="lg:col-span-5">
                <h3 className="font-display font-bold text-xl text-[#f3f4f6] group-hover:text-[#d49b42] transition-colors uppercase tracking-tight">
                  {item.name}
                </h3>
                <p className="font-sans text-sm text-[#9ca3af] mt-1.5 leading-relaxed">
                  {item.description[currentLang]}
                </p>
              </div>

              {/* Cultural Context / Craft Note */}
              <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-4 text-xs font-editorial italic text-[#6b7280]">
                <span>{item.notes?.[currentLang]}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#2a2d36] group-hover:bg-[#d49b42] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Editorial Allergen / Sourcing Note */}
        <div className="mt-12 p-6 bg-[#141518] border border-[#252830] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <p className="font-mono text-xs text-[#9ca3af]">
              {t.editorialNote}
            </p>
          </div>
          <button
            onClick={onOpenMenuModal}
            className="text-xs font-mono uppercase tracking-widest text-[#d49b42] hover:text-[#f3f4f6] underline cursor-pointer whitespace-nowrap"
          >
            {t.viewFullMenu} &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
