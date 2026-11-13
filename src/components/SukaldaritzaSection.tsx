import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, CheckCircle2 } from 'lucide-react';
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

  const kruntxitalo = menuItems.find(i => i.id === 'kruntxitalo');
  const taloRabas = menuItems.find(i => i.id === 'talo-rabas');
  const taloPanceta = menuItems.find(i => i.id === 'talo-panketa');
  const gildas = menuItems.find(i => i.id === 'gildas-zutarri');
  const totopos = menuItems.find(i => i.id === 'arto-platerak');
  const tartaQueso = menuItems.find(i => i.id === 'tarta-queso');

  return (
    <section
      id="sukaldaritza"
      className="relative w-full bg-[#08090c] py-28 sm:py-36 px-4 sm:px-8 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Subtle Slate Texture */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header: Pure Editorial Typography (No Cards) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block mb-2">
              {t.index}
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f3f4f6] uppercase leading-none">
              {t.title}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="font-editorial text-lg sm:text-xl text-[#9ca3af] italic max-w-md text-left md:text-right">
              {t.lead}
            </p>
            <button
              onClick={onOpenMenuModal}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d49b42] hover:text-white transition-colors cursor-pointer pt-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.viewFullMenu}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimalist Typographic Category Selector (No pill cards) */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 mb-20 text-xs font-mono uppercase tracking-[0.25em] border-b border-white/10 pb-4">
          {[
            { id: 'all' as CategoryFilter, label: t.allTab },
            { id: 'talo' as CategoryFilter, label: t.talosTab },
            { id: 'pintxo' as CategoryFilter, label: t.pintxosTab },
            { id: 'postre' as CategoryFilter, label: t.dessertsTab },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`transition-all duration-300 cursor-pointer relative py-1 ${
                activeTab === tab.id
                  ? 'text-[#f3f4f6] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#d49b42]'
                  : 'text-[#6b7280] hover:text-[#d1d5db]'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-[#15803d] font-semibold tracking-wider hidden sm:inline">
            100% GLUTEN-FREE TALO AUKERA
          </span>
        </div>

        {/* Editorial Presentation: Full-Width Photographic Spreads */}
        {activeTab === 'all' && (
          <div className="space-y-32">
            {/* SPREAD 1: Kruntxitaloa (Exclusive Author Creation) */}
            {kruntxitalo && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden group">
                  <img
                    src={kruntxitalo.image}
                    alt={kruntxitalo.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42]">
                    <span>01 // SORKUNTZA BEREZIA</span>
                    <span className="text-[#3c404d]">·</span>
                    <span className="text-[#15803d] font-bold">GLUTEN-FREE</span>
                  </div>
                  <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#f3f4f6] uppercase tracking-tight leading-[0.98]">
                    {kruntxitalo.name}
                  </h3>
                  <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
                    {kruntxitalo.description[currentLang]}
                  </p>
                  <p className="font-editorial italic text-lg text-[#d1d5db] border-l-2 border-[#d49b42] pl-4 py-1">
                    {kruntxitalo.notes?.[currentLang]}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onOpenMenuModal}
                      className="text-xs font-mono uppercase tracking-widest text-[#d49b42] hover:text-white underline cursor-pointer"
                    >
                      Kartan ikusi &rarr;
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SPREAD 2: Talo de Rabas & Talo de Hirugiharra (Alternating Rhythm) */}
            <div className="space-y-28">
              {/* Talo de Rabas */}
              {taloRabas && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className="lg:col-span-5 order-2 lg:order-1 space-y-5">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block">
                      02 // ITSASOA ETA BURDINA
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-[#f3f4f6] uppercase tracking-tight leading-tight">
                      {taloRabas.name}
                    </h3>
                    <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
                      {taloRabas.description[currentLang]}
                    </p>
                    <p className="font-editorial italic text-base text-[#6b7280]">
                      {taloRabas.notes?.[currentLang]}
                    </p>
                  </div>

                  <div className="lg:col-span-7 order-1 lg:order-2 relative aspect-[16/10] overflow-hidden group">
                    <img
                      src={taloRabas.image}
                      alt={taloRabas.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Talo de Hirugiharra Glazeatua */}
              {taloPanceta && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden group">
                    <img
                      src={taloPanceta.image}
                      alt={taloPanceta.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42]">
                      <span>03 // HARAGIA ETA ITSASOA</span>
                      <span className="text-[#3c404d]">·</span>
                      <span className="text-[#15803d] font-bold">GLUTEN-FREE</span>
                    </div>
                    <h3 className="font-display font-black text-3xl sm:text-4xl text-[#f3f4f6] uppercase tracking-tight leading-tight">
                      {taloPanceta.name}
                    </h3>
                    <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
                      {taloPanceta.description[currentLang]}
                    </p>
                    <p className="font-editorial italic text-base text-[#6b7280]">
                      {taloPanceta.notes?.[currentLang]}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* SPREAD 3: Tríada de Barra, Pikoteoa & Postrea (No Cards, Pure Plates) */}
            <div className="pt-8 border-t border-white/10">
              <div className="mb-12">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block mb-1">
                  04 // BARRAKO TRADIZIOA & GOZOA
                </span>
                <h4 className="font-display font-bold text-2xl text-[#f3f4f6] uppercase">
                  Pikoteoa eta Etxeko Postrea
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {gildas && (
                  <div className="space-y-4 group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={gildas.image}
                        alt={gildas.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <h5 className="font-display font-bold text-lg text-[#f3f4f6] uppercase">
                      {gildas.name}
                    </h5>
                    <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                      {gildas.description[currentLang]}
                    </p>
                  </div>
                )}

                {totopos && (
                  <div className="space-y-4 group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={totopos.image}
                        alt={totopos.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h5 className="font-display font-bold text-lg text-[#f3f4f6] uppercase">
                        {totopos.name}
                      </h5>
                      <span className="text-[10px] font-mono text-[#15803d] font-bold">GF</span>
                    </div>
                    <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                      {totopos.description[currentLang]}
                    </p>
                  </div>
                )}

                {tartaQueso && (
                  <div className="space-y-4 group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={tartaQueso.image}
                        alt={tartaQueso.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/70 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <div className="flex items-center justify-between">
                      <h5 className="font-display font-bold text-lg text-[#f3f4f6] uppercase">
                        {tartaQueso.name}
                      </h5>
                      <span className="text-[10px] font-mono text-[#15803d] font-bold">GF</span>
                    </div>
                    <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                      {tartaQueso.description[currentLang]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab Filtered View (When category is selected) */}
        {activeTab !== 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredItems.map(item => (
              <div key={item.id} className="space-y-4 group">
                {item.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090c]/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-xl text-[#f3f4f6] uppercase">
                    {item.name}
                  </h4>
                  {item.glutenFree && (
                    <span className="text-[10px] font-mono text-[#15803d] font-bold">GF</span>
                  )}
                </div>
                <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                  {item.description[currentLang]}
                </p>
                {item.notes && (
                  <p className="font-editorial italic text-xs text-[#6b7280]">
                    {item.notes[currentLang]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sourcing Footnote & Modal Action */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0" />
            <p className="font-mono text-xs text-[#9ca3af]">
              {t.editorialNote}
            </p>
          </div>

          <button
            onClick={onOpenMenuModal}
            className="px-6 py-3.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#07080a] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm cursor-pointer whitespace-nowrap shadow-xl"
          >
            {t.viewFullMenu} &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
