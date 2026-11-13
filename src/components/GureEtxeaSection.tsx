import React from 'react';
import { MapPin, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface GureEtxeaSectionProps {
  currentLang: Language;
}

export const GureEtxeaSection: React.FC<GureEtxeaSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].gureEtxea;

  const muralPanels = [
    {
      id: 'mural-manos',
      image: './assets/mural-manos.jpg',
      title: {
        eu: '01 // Eskuen Memoria',
        es: '01 // Memoria de las Manos',
      },
      desc: {
        eu: 'Muralaren xehetasuna: esku kementsuak arto-orea oratzen zurezko taulan.',
        es: 'Detalle del mural: manos curtidas amasando el talo sobre madera noble.',
      },
    },
    {
      id: 'mural-maiz',
      image: './assets/mural-maiz.jpg',
      title: {
        eu: '02 // Artoaren Uzta',
        es: '02 // La Siembra y la Mazorca',
      },
      desc: {
        eu: 'Bizkaiko baserrietako arto-landaketa eta uzta oparoa.',
        es: 'El ciclo agrícola del maíz en los valles y caseríos de Bizkaia.',
      },
    },
    {
      id: 'mural-molino',
      image: './assets/mural-molino.jpg',
      title: {
        eu: '03 // Uraren Errota',
        es: '03 // El Molino de Agua',
      },
      desc: {
        eu: 'Harrizko gurpilak eta ibai-ura arto-irin mehea lortzeko.',
        es: 'La fuerza fluvial y las piedras de moler para obtener harina pura.',
      },
    },
  ];

  return (
    <section
      id="gure-etxea"
      className="relative w-full bg-[#0e0f12] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 border-t border-[#1d1f25] overflow-hidden"
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

        {/* Real Restaurant Interior: Bentako Plaza 3 Dining Room */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[22/9] rounded-sm overflow-hidden bg-[#16181c] border border-[#262932] shadow-2xl mb-16 group">
          <img
            src="./assets/restaurante-comedor-real.jpg"
            alt="Zutarri Jatetxearen jantokia Bentako Plazan: harrizko hormak, giro beroa eta mahaiak"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0f12]/80 via-transparent to-transparent pointer-events-none" />

          {/* Verification Pill */}
          <div className="absolute top-4 left-4 bg-[#0c0d0e]/90 backdrop-blur-sm border border-[#2b2d35] px-3 py-1 rounded-[2px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803d]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#e5e7eb]">
              Establezimendu Erreala · Bentako Plaza, 3
            </span>
          </div>

          {/* Caption Card */}
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-lg bg-[#0c0d0e]/95 backdrop-blur-md border border-[#2b2d35] p-5 rounded-sm">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#d49b42] block mb-1">
              GURE ESPAZIOA // BASAURI
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#f3f4f6] uppercase tracking-wide">
              {currentLang === 'eu' ? 'Jantokia & Herri Giroa' : 'Comedor y Ambiente Cercano'}
            </h3>
            <p className="font-mono text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
              {t.locationDetail}
            </p>
          </div>
        </div>

        {/* The Illustrated Mural Feature: Triptych Showcase */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-4 border-b border-[#1f2127] mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#d49b42]" />
              <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#f3f4f6] font-bold">
                {t.muralTitle}
              </h3>
            </div>
            <span className="font-mono text-[11px] text-[#6b7280] uppercase tracking-widest hidden sm:inline">
              Zutarriko hormetan eskuz margotutako harribitxia
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {muralPanels.map((panel) => (
              <div
                key={panel.id}
                className="bg-[#121316] border border-[#22252c] rounded-sm p-4 flex flex-col justify-between group hover:border-[#383c47] transition-all"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#16181c] border border-[#262832] mb-4">
                    <img
                      src={panel.image}
                      alt={panel.title[currentLang]}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f12]/70 to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 right-2 p-1 bg-[#0c0d0e]/80 rounded-[2px] text-[#9ca3af]">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#d49b42] font-semibold">
                    {panel.title[currentLang]}
                  </h4>
                  <p className="font-mono text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
                    {panel.desc[currentLang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1c1e24] flex items-center justify-between text-[10px] font-mono text-[#6b7280]">
                  <span>MURAL HANDIA</span>
                  <span>ZUTARRI BASAURI</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative & Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-6 border-t border-[#1f2127]">
          <div className="space-y-6">
            <p className="font-editorial text-xl sm:text-2xl text-[#f3f4f6] italic leading-relaxed border-l-2 border-[#d49b42] pl-4">
              {t.body1}
            </p>
            <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
              {t.body2}
            </p>
          </div>

          <div className="p-8 bg-[#141518] border border-[#252830] rounded-sm space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#1b1c20] border border-[#2e313a] rounded-sm text-[#d49b42] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                  Bentako Plaza, 3 · Basauri
                </h3>
                <p className="font-mono text-xs text-[#9ca3af] mt-1 leading-relaxed">
                  {currentLang === 'eu'
                    ? 'Arizko metro geltokitik 3 minutura oinez (L2 Metro Bilbao). Plaza lasaia eta aparkaleku erosoak inguruan.'
                    : 'A 3 minutos a pie del metro Ariz (L2 Metro Bilbao). Plaza peatonal tranquila y aparcamientos cercanos.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#1b1c20] border border-[#2e313a] rounded-sm text-[#d49b42] flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                  {currentLang === 'eu' ? 'Herriari Lotutako Proiektua' : 'Proyecto con Arraigo Popular'}
                </h3>
                <p className="font-mono text-xs text-[#9ca3af] mt-1 leading-relaxed">
                  {currentLang === 'eu'
                    ? 'Zutarri Kultura Elkartearen ekimena: herriaren nortasuna, elkartasuna eta euskal kultura gastronomiaren bidez bizirik mantentzea.'
                    : 'Impulsado por Zutarri Kultura Elkartea: mantener viva la identidad de pueblo, la cultura vasca y la convivencia a través de la mesa.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
