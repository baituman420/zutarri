import { Phone, MessageCircle, MapPin, Clock, Train, ArrowUpRight, ShieldAlert } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface KontaktuaSectionProps {
  currentLang: Language;
}

export const KontaktuaSection: React.FC<KontaktuaSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].kontaktua;

  return (
    <section
      id="kontaktua"
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
          <p className="font-editorial text-lg sm:text-xl text-[#9ca3af] italic max-w-md">
            {t.lead}
          </p>
        </div>

        {/* 3-Column Editorial Grid: Location, Direct Booking, Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Direct Verified Booking (NO fake forms!) */}
          <div className="bg-[#141518] border border-[#252830] p-6 sm:p-8 rounded-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#d49b42] mb-3">
                <Phone className="w-3.5 h-3.5" />
                <span>ERRESERBA ZUZENAK</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#f3f4f6] uppercase">
                {currentLang === 'eu' ? 'Mahaiak & Kontsultak' : 'Mesas y Reservas'}
              </h3>
              <p className="font-editorial text-base text-[#9ca3af] italic mt-2 leading-relaxed">
                {t.bookingNote}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#22252c]">
              <a
                href={t.phoneLink}
                className="w-full py-3 px-4 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#0c0d0e] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{t.callCta}</span>
              </a>

              <a
                href={t.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#1b1d22] hover:bg-[#252830] text-[#f3f4f6] border border-[#2e313b] font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#15803d]" />
                <span>{t.whatsappText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Card 2: Location, Metro & Google Maps */}
          <div className="bg-[#141518] border border-[#252830] p-6 sm:p-8 rounded-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9ca3af] mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#d49b42]" />
                <span>KOKAPENA & IRISGARRITASUNA</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#f3f4f6] uppercase">
                Bentako Plaza, 3
              </h3>
              <p className="font-mono text-xs text-[#9ca3af] mt-1">
                48970 Basauri, Bizkaia
              </p>

              <div className="mt-4 pt-4 border-t border-[#22252c] space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#e5e7eb]">
                  <Train className="w-4 h-4 text-[#d49b42]" />
                  <span>{t.metroDesc}</span>
                </div>
                <p className="font-mono text-[11px] text-[#6b7280]">
                  Bilboko erdigunetik 12 minutura metroz (Ariz geltokia).
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#22252c]">
              <a
                href={t.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#1b1d22] hover:bg-[#252830] text-[#f3f4f6] border border-[#2e313b] font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#d49b42]" />
                <span>Google Maps-en Ireki</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Card 3: Opening Hours & Official Instagram */}
          <div className="bg-[#141518] border border-[#252830] p-6 sm:p-8 rounded-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#9ca3af] mb-3">
                <Clock className="w-3.5 h-3.5 text-[#d49b42]" />
                <span>{t.hoursTitle}</span>
              </div>
              <div className="space-y-2 font-mono text-xs text-[#e5e7eb]">
                <div className="pb-2 border-b border-[#22252c]">
                  <span className="text-[#9ca3af] block text-[10px] uppercase">Bazkariak / Comidas</span>
                  <span>{t.hoursLunch}</span>
                </div>
                <div className="pb-2 border-b border-[#22252c]">
                  <span className="text-[#9ca3af] block text-[10px] uppercase">Afariak / Cenas</span>
                  <span>{t.hoursDinner}</span>
                </div>
                <div>
                  <span className="text-[#dc2626] block text-[10px] uppercase">Atsedena / Descanso</span>
                  <span className="text-[#6b7280] italic">{t.hoursClosed}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#22252c]">
              <a
                href={t.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#1b1d22] hover:bg-[#252830] text-[#f3f4f6] border border-[#2e313b] font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-sm flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-[#d49b42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>{t.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Public Legal / Author note regarding demo images */}
        <div className="mt-12 p-4 bg-[#111215] border border-[#22242a] rounded-sm flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-[#d49b42] flex-shrink-0 mt-0.5" />
          <p className="font-mono text-[11px] text-[#6b7280] leading-relaxed">
            {t.legalNotice}
          </p>
        </div>
      </div>
    </section>
  );
};
