import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { menuItems, translations } from '../data/translations';

interface SukaldaritzaSectionProps {
  currentLang: Language;
  onOpenMenuModal: () => void;
}

type CategoryFilter = 'all' | 'talo' | 'pintxo' | 'postre';

export const SukaldaritzaSection: React.FC<SukaldaritzaSectionProps> = ({
  currentLang,
  onOpenMenuModal,
}) => {
  const t = translations[currentLang].sukaldaritza;
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');

  const filteredItems = activeTab === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeTab);

  // Specific items for editorial showcase
  const kruntxitalo = menuItems.find(i => i.id === 'kruntxitalo');
  const taloRabas = menuItems.find(i => i.id === 'talo-rabas');
  const taloPanceta = menuItems.find(i => i.id === 'talo-panketa');
  const gildas = menuItems.find(i => i.id === 'gildas-zutarri');
  const totopos = menuItems.find(i => i.id === 'arto-platerak');
  const tartaQueso = menuItems.find(i => i.id === 'tarta-queso');

  return (
    <section
      id="sukaldaritza"
      className="relative w-full bg-[#0b0c0e] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#1d1f25] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#22252c]">
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

        {/* Category Tabs: Editorial Filter */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 border-b border-[#1f2127] pb-4">
          {[
            { id: 'all' as CategoryFilter, label: t.allTab },
            { id: 'talo' as CategoryFilter, label: t.talosTab },
            { id: 'pintxo' as CategoryFilter, label: t.pintxosTab },
            { id: 'postre' as CategoryFilter, label: t.dessertsTab },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#f3f4f6] text-[#0c0d0e] font-bold shadow-md'
                  : 'bg-[#141518] text-[#9ca3af] hover:text-white border border-[#252830] hover:border-[#3d414a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] text-[#6b7280] hidden md:inline">
            100% GLUTEN-FREE TALO AUKERA
          </span>
        </div>

        {/* Dynamic Editorial Layout when 'all' is active: Magazine Rhythm */}
        {activeTab === 'all' && (
          <div className="space-y-16">
            {/* Feature 01: Grand Hero Spread for KRUNTXITALOA (Zutarri's Exclusive Dish) */}
            {kruntxitalo && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111215] border border-[#242730] rounded-sm p-6 sm:p-10 shadow-2xl">
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-sm overflow-hidden bg-[#16181c] border border-[#2e313c] group">
                  <img
                    src={kruntxitalo.image}
                    alt={kruntxitalo.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-[#0c0d0e]/90 backdrop-blur-sm border border-[#2b2d35] px-3 py-1 rounded-[2px] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#d49b42]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e7eb]">
                      {kruntxitalo.badge[currentLang]}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2.5 py-1 rounded-[2px] font-mono text-[10px] text-[#15803d] font-bold uppercase tracking-wider">
                    Gluten-Free
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#d49b42]">
                    <span>01 // SORKUNTZA BEREZIA</span>
                    <span className="text-[#3c404d]">·</span>
                    <span>ZUTARRI RECIPE</span>
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#f3f4f6] uppercase tracking-tight leading-tight">
                    {kruntxitalo.name}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#9ca3af] leading-relaxed">
                    {kruntxitalo.description[currentLang]}
                  </p>
                  <p className="font-editorial italic text-base text-[#d1d5db] border-l-2 border-[#d49b42] pl-3 py-1">
                    {kruntxitalo.notes?.[currentLang]}
                  </p>
                  <div className="pt-4 flex items-center gap-4 text-xs font-mono">
                    <button
                      onClick={onOpenMenuModal}
                      className="text-[#d49b42] hover:text-[#f3f4f6] underline cursor-pointer"
                    >
                      Kartan ikusi &rarr;
                    </button>
                    <span className="text-[#4b505c]">·</span>
                    <span className="text-[#6b7280]">Egunero eskuz oratua</span>
                  </div>
                </div>
              </div>
            )}

            {/* Feature 02: Asymmetric Two-Column Spread: Talo de Rabas vs. Talo de Hirugiharra */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Talo de Rabas */}
              {taloRabas && (
                <div className="bg-[#121316] border border-[#22252d] rounded-sm p-6 sm:p-8 flex flex-col justify-between group hover:border-[#383c47] transition-all">
                  <div className="space-y-4">
                    <div className="relative aspect-[16/11] rounded-sm overflow-hidden bg-[#16181c] border border-[#272a33]">
                      <img
                        src={taloRabas.image}
                        alt={taloRabas.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2.5 py-0.5 rounded-[2px] font-mono text-[9px] uppercase tracking-wider text-[#d49b42]">
                        {taloRabas.badge[currentLang]}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest block mb-1">
                        02 // ITSASOA ETA BURDINA
                      </span>
                      <h4 className="font-display font-bold text-xl sm:text-2xl text-[#f3f4f6] uppercase tracking-tight">
                        {taloRabas.name}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mt-2 leading-relaxed">
                        {taloRabas.description[currentLang]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1f2127] flex items-center justify-between text-xs font-editorial italic text-[#6b7280]">
                    <span>{taloRabas.notes?.[currentLang]}</span>
                    <span className="font-mono text-[10px] uppercase text-[#d49b42] not-italic">Bizkaia</span>
                  </div>
                </div>
              )}

              {/* Talo de Hirugiharra Glazeatua */}
              {taloPanceta && (
                <div className="bg-[#121316] border border-[#22252d] rounded-sm p-6 sm:p-8 flex flex-col justify-between group hover:border-[#383c47] transition-all">
                  <div className="space-y-4">
                    <div className="relative aspect-[16/11] rounded-sm overflow-hidden bg-[#16181c] border border-[#272a33]">
                      <img
                        src={taloPanceta.image}
                        alt={taloPanceta.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2.5 py-0.5 rounded-[2px] font-mono text-[9px] uppercase tracking-wider text-[#d49b42]">
                        {taloPanceta.badge[currentLang]}
                      </div>
                      <div className="absolute top-3 right-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#15803d] font-bold uppercase">
                        GF
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest block mb-1">
                        03 // MAR Y MONTAÑA
                      </span>
                      <h4 className="font-display font-bold text-xl sm:text-2xl text-[#f3f4f6] uppercase tracking-tight">
                        {taloPanceta.name}
                      </h4>
                      <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mt-2 leading-relaxed">
                        {taloPanceta.description[currentLang]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1f2127] flex items-center justify-between text-xs font-editorial italic text-[#6b7280]">
                    <span>{taloPanceta.notes?.[currentLang]}</span>
                    <span className="font-mono text-[10px] uppercase text-[#d49b42] not-italic">Basauri</span>
                  </div>
                </div>
              )}
            </div>

            {/* Feature 03: Rhythmic Triad: Gildak + Totopos con Idiazabal + Basque Cheesecake */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Gildas */}
              {gildas && (
                <div className="bg-[#121316] border border-[#22252d] rounded-sm p-6 flex flex-col justify-between group hover:border-[#383c47] transition-all">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#16181c] border border-[#272a33]">
                      <img
                        src={gildas.image}
                        alt={gildas.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#d49b42] uppercase">
                        {gildas.badge[currentLang]}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#f3f4f6] uppercase">
                        {gildas.name}
                      </h4>
                      <p className="font-sans text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
                        {gildas.description[currentLang]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1f2127] text-[11px] font-editorial italic text-[#6b7280]">
                    {gildas.notes?.[currentLang]}
                  </div>
                </div>
              )}

              {/* Totopos Idiazabal */}
              {totopos && (
                <div className="bg-[#121316] border border-[#22252d] rounded-sm p-6 flex flex-col justify-between group hover:border-[#383c47] transition-all">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#16181c] border border-[#272a33]">
                      <img
                        src={totopos.image}
                        alt={totopos.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#d49b42] uppercase">
                        {totopos.badge[currentLang]}
                      </div>
                      <div className="absolute top-3 right-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#15803d] font-bold uppercase">
                        GF
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#f3f4f6] uppercase">
                        {totopos.name}
                      </h4>
                      <p className="font-sans text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
                        {totopos.description[currentLang]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1f2127] text-[11px] font-editorial italic text-[#6b7280]">
                    {totopos.notes?.[currentLang]}
                  </div>
                </div>
              )}

              {/* Tarta de Queso */}
              {tartaQueso && (
                <div className="bg-[#121316] border border-[#22252d] rounded-sm p-6 flex flex-col justify-between group hover:border-[#383c47] transition-all">
                  <div className="space-y-4">
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#16181c] border border-[#272a33]">
                      <img
                        src={tartaQueso.image}
                        alt={tartaQueso.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#d49b42] uppercase">
                        {tartaQueso.badge[currentLang]}
                      </div>
                      <div className="absolute top-3 right-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#15803d] font-bold uppercase">
                        GF
                      </div>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-[#f3f4f6] uppercase">
                        {tartaQueso.name}
                      </h4>
                      <p className="font-sans text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
                        {tartaQueso.description[currentLang]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1f2127] text-[11px] font-editorial italic text-[#6b7280]">
                    {tartaQueso.notes?.[currentLang]}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Filtered View (when a specific category is selected) */}
        {activeTab !== 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-[#121316] border border-[#22252d] rounded-sm p-6 flex flex-col justify-between group hover:border-[#383c47] transition-all"
              >
                <div className="space-y-4">
                  {item.image && (
                    <div className="relative aspect-[16/10] rounded-sm overflow-hidden bg-[#16181c] border border-[#272a33]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#d49b42] uppercase">
                        {item.badge[currentLang]}
                      </div>
                      {item.glutenFree && (
                        <div className="absolute top-3 right-3 bg-[#0c0d0e]/90 border border-[#2b2d35] px-2 py-0.5 rounded-[2px] font-mono text-[9px] text-[#15803d] font-bold uppercase">
                          GF
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <span className="font-mono text-[10px] text-[#6b7280] uppercase tracking-widest block mb-1">
                      0{index + 1} // {item.category?.toUpperCase()}
                    </span>
                    <h4 className="font-display font-bold text-xl text-[#f3f4f6] uppercase">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-[#9ca3af] mt-2 leading-relaxed">
                      {item.description[currentLang]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#1f2127] flex items-center justify-between text-xs font-editorial italic text-[#6b7280]">
                  <span>{item.notes?.[currentLang]}</span>
                  <button
                    onClick={onOpenMenuModal}
                    className="not-italic font-mono text-[10px] uppercase text-[#d49b42] hover:underline"
                  >
                    Xehetasunak &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Editorial Allergen / Sourcing Bar */}
        <div className="mt-16 p-6 sm:p-8 bg-[#131418] border border-[#252832] rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#15803d] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                100% Gluten-Free Arto-Oinarria
              </h4>
              <p className="font-mono text-xs text-[#9ca3af] mt-1 leading-relaxed">
                {t.editorialNote}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenMenuModal}
            className="px-6 py-3 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#0c0d0e] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm cursor-pointer whitespace-nowrap shadow-md"
          >
            {t.viewFullMenu} &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
