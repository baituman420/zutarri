import { useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import { Language } from '../types';
import { menuItems, translations } from '../data/translations';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const t = translations[currentLang].sukaldaritza;

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#07080a]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#121316] border border-[#2b2e38] rounded-sm shadow-2xl p-6 sm:p-10 my-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#22252c]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#d49b42] mb-1">
              <span>ZUTARRI JATETXEA</span>
              <span>·</span>
              <span>BASAURI</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#f3f4f6] uppercase tracking-tight">
              {currentLang === 'eu' ? 'Gure Karta Garaikidea' : 'Carta Gastronómica'}
            </h2>
            <p className="font-editorial text-sm sm:text-base text-[#9ca3af] italic mt-1">
              {currentLang === 'eu'
                ? 'Artoa, artisau oratzea eta bertako lehengaia oinarri hartuta.'
                : 'Elaborada sobre la base del maíz, el amasado artesano y el producto local.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9ca3af] hover:text-white rounded-sm border border-[#2a2d36] hover:border-white transition-colors cursor-pointer"
            aria-label={t.closeMenu}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Talo Bereziak */}
        <div className="mt-8">
          <div className="flex items-center justify-between pb-2 border-b border-[#22252c]">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
              01 // {currentLang === 'eu' ? 'TALO BEREZIAK' : 'TALOS DE AUTOR'}
            </h3>
            <span className="font-mono text-[10px] uppercase text-[#15803d] font-semibold">
              Eskuz oratuak · 100% Maíz
            </span>
          </div>

          <div className="mt-4 divide-y divide-[#1f2229]">
            {menuItems.map(item => (
              <div key={item.id} className="py-4 space-y-1">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-lg text-[#f3f4f6]">
                      {item.name}
                    </h4>
                    {item.highlight && (
                      <span className="px-1.5 py-0.5 rounded-[2px] bg-[#221c16] border border-[#d49b42]/40 text-[#d49b42] font-mono text-[9px] uppercase tracking-wider">
                        {item.badge[currentLang]}
                      </span>
                    )}
                  </div>
                  {item.glutenFree && (
                    <span className="text-[10px] font-mono text-[#15803d] font-bold">
                      [GF]
                    </span>
                  )}
                </div>
                <p className="font-sans text-xs text-[#9ca3af] leading-relaxed">
                  {item.description[currentLang]}
                </p>
                {item.notes && (
                  <p className="font-editorial text-[11px] text-[#6b7280] italic">
                    {item.notes[currentLang]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Upategia & Edariak */}
        <div className="mt-8 pt-6 border-t border-[#22252c]">
          <div className="flex items-center justify-between pb-2 border-b border-[#22252c]">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
              02 // {currentLang === 'eu' ? 'UPATEGIA & EDARIAK' : 'BODEGA Y BEBIDAS'}
            </h3>
            <span className="font-mono text-[10px] uppercase text-[#9ca3af]">
              Bertako ekoizleak
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-[#16171b] border border-[#252830] rounded-sm">
              <span className="text-[#f3f4f6] font-bold block">Bizkaiko Txakolina D.O.</span>
              <span className="text-[#9ca3af] block mt-0.5">
                {currentLang === 'eu'
                  ? 'Zuria eta gorria, mahatsondo autoktonoak.'
                  : 'Blanco y ojo de gallo de viñedos autóctonos.'}
              </span>
            </div>

            <div className="p-3 bg-[#16171b] border border-[#252830] rounded-sm">
              <span className="text-[#f3f4f6] font-bold block">
                {currentLang === 'eu' ? 'Euskal Sagardo Naturala' : 'Sidra Natural Vasca'}
              </span>
              <span className="text-[#9ca3af] block mt-0.5">
                {currentLang === 'eu'
                  ? 'Kupelako ukitu tradizionala taloari laguntzeko.'
                  : 'Trago fresco y tradicional para acompañar el talo.'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer info & direct call */}
        <div className="mt-8 pt-6 border-t border-[#22252c] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-[#6b7280] text-center sm:text-left">
            {currentLang === 'eu'
              ? 'Alergeno edo dieta bereziei buruz galdetu lasai gure taldeari.'
              : 'Consulta a nuestro equipo ante cualquier duda sobre alérgenos o dietas.'}
          </p>

          <a
            href="tel:+34688766398"
            className="px-5 py-2.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#0c0d0e] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{currentLang === 'eu' ? 'Mahai Erreserba: 688 76 63 98' : 'Reservar: 688 76 63 98'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
