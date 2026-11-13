import React from 'react';
import { MapPin, HeartHandshake } from 'lucide-react';
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
      title: { eu: '01 // Eskuen Memoria', es: '01 // Memoria de las Manos' },
      desc: { eu: 'Eskuak arto-orea oratzen zurezko taulan.', es: 'Manos curtidas amasando el talo sobre madera noble.' },
    },
    {
      id: 'mural-maiz',
      image: './assets/mural-maiz.jpg',
      title: { eu: '02 // Artoaren Uzta', es: '02 // La Siembra y la Mazorca' },
      desc: { eu: 'Bizkaiko baserrietako arto-landaketa.', es: 'El ciclo agrícola del maíz en los caseríos de Bizkaia.' },
    },
    {
      id: 'mural-molino',
      image: './assets/mural-molino.jpg',
      title: { eu: '03 // Uraren Errota', es: '03 // El Molino de Agua' },
      desc: { eu: 'Harrizko gurpilak eta ibai-ura arto-irin mehea lortzeko.', es: 'La fuerza fluvial y las piedras de moler para harina pura.' },
    },
  ];

  return (
    <section
      id="gure-etxea"
      className="relative w-full bg-[#07080a] py-28 sm:py-36 px-4 sm:px-8 lg:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block mb-2">
              {t.index}
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#f3f4f6] uppercase leading-none">
              {t.title}
            </h2>
          </div>
          <p className="font-editorial text-lg sm:text-xl text-[#9ca3af] italic max-w-md">
            {t.lead}
          </p>
        </div>

        {/* PROTAGONIST CENTERPIECE: The Monumental Stone Logo of Zutarri */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden group">
            <img
              src="./assets/logo-piedras.webp"
              alt="Zutarriren harrizko logotipo ofiziala harri biribilduz eta arbel beltzean"
              className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/80 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block">
              IDENTITATEA // HARRI-IKURRA
            </span>
            <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#f3f4f6] uppercase tracking-tight leading-[0.96]">
              {currentLang === 'eu' ? 'Harria, Sustraia eta Iraupena' : 'Piedra, Raíz y Permanencia'}
            </h3>
            <p className="font-editorial italic text-xl text-[#d49b42] border-l-2 border-[#d49b42] pl-4">
              {currentLang === 'eu'
                ? '«Zutarri: zuta eta harria. Zutik dirauen herri baten lekukoa.»'
                : '«Zutarri: la columna y la piedra. Testigo de una comunidad que permanece en pie.»'}
            </p>
            <div className="space-y-4 font-sans text-base text-[#9ca3af] leading-relaxed">
              <p>
                {currentLang === 'eu'
                  ? 'Zutarri izenak berak harri zuteari, baserrien zutabeei eta errotetako harri handiei egiten die gorazarre. Gure ikurra ez da marrazki huts bat: bertako erreka-harri biribilduz eta arbel naturalez eskuz eraikitako monumentu bat da.'
                  : 'El nombre Zutarri honra la piedra erguida, los pilares del caserío y las muelas de molino que molían el grano. Nuestro logotipo no es un trazo gráfico abstracto: es un emblema construido con piedras de río y pizarra negra natural.'}
              </p>
              <p>
                {currentLang === 'eu'
                  ? 'Piedrak materia, memoria eta belaunaldien arteko lotura adierazten ditu. Hori da gure nortasunaren oinarri hautsezina.'
                  : 'La piedra representa la materia prima, la memoria del paisaje y la permanencia. Es el núcleo de la personalidad de Zutarri.'}
              </p>
            </div>
          </div>
        </div>

        {/* Real Restaurant Interior: Bentako Plaza 3 Dining Room */}
        <div className="relative w-full aspect-[16/9] lg:aspect-[22/9] overflow-hidden mb-24 group">
          <img
            src="./assets/restaurante-comedor-real.jpg"
            alt="Zutarri Jatetxearen jantokia Bentako Plazan: harrizko hormak eta artoaren mural handia"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/80 via-transparent to-transparent pointer-events-none" />

          {/* Location Caption Overlay Floating Organically */}
          <div className="absolute bottom-8 left-8 sm:left-12 max-w-lg space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block">
              GURE ESPAZIOA // BASAURI
            </span>
            <h4 className="font-display font-black text-2xl sm:text-3xl text-[#f3f4f6] uppercase tracking-tight">
              {currentLang === 'eu' ? 'Jantokia & Herri Giroa' : 'El Comedor en Bentako Plaza, 3'}
            </h4>
            <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
              {t.locationDetail}
            </p>
          </div>
        </div>

        {/* The Hand-Painted Illustrated Mural Frieze */}
        <div className="mb-24 pt-8 border-t border-white/10">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block mb-1">
              ARTEA & ONDAREA
            </span>
            <h4 className="font-display font-black text-2xl sm:text-3xl text-[#f3f4f6] uppercase">
              {t.muralTitle}
            </h4>
            <p className="font-editorial italic text-base text-[#9ca3af] mt-1">
              {t.muralDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {muralPanels.map((panel) => (
              <div key={panel.id} className="space-y-4 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={panel.image}
                    alt={panel.title[currentLang]}
                    className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080a]/70 to-transparent pointer-events-none" />
                </div>
                <h5 className="font-mono text-xs uppercase tracking-wider text-[#d49b42] font-semibold">
                  {panel.title[currentLang]}
                </h5>
                <p className="font-mono text-xs text-[#9ca3af] leading-relaxed">
                  {panel.desc[currentLang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative & Community Roots (Zero Boxed Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start pt-8 border-t border-white/10">
          <div className="space-y-6">
            <p className="font-editorial text-xl sm:text-2xl text-[#f3f4f6] italic leading-relaxed border-l-2 border-[#d49b42] pl-4">
              {t.body1}
            </p>
            <p className="font-sans text-base text-[#9ca3af] leading-relaxed">
              {t.body2}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#d49b42] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                  Bentako Plaza, 3 · Basauri
                </h4>
                <p className="font-mono text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
                  {currentLang === 'eu'
                    ? 'Arizko metro geltokitik 3 minutura oinez (L2 Metro Bilbao). Plaza lasaia eta aparkaleku erosoak inguruan.'
                    : 'A 3 minutos a pie del metro Ariz (L2 Metro Bilbao). Plaza peatonal tranquila y aparcamientos cercanos.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HeartHandshake className="w-5 h-5 text-[#d49b42] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                  {currentLang === 'eu' ? 'Herriari Lotutako Proiektua' : 'Proyecto con Arraigo Popular'}
                </h4>
                <p className="font-mono text-xs text-[#9ca3af] mt-1.5 leading-relaxed">
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
