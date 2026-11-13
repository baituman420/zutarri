import { useState } from 'react';
import { Language } from './types';
import { useSoundEffect } from './hooks/useSoundEffect';
import { Header } from './components/Header';
import { TxalapartaHero } from './components/TxalapartaHero';
import { SustraiakSection } from './components/SustraiakSection';
import { IndarraSection } from './components/IndarraSection';
import { SukaldaritzaSection } from './components/SukaldaritzaSection';
import { GureEtxeaSection } from './components/GureEtxeaSection';
import { KontaktuaSection } from './components/KontaktuaSection';
import { Footer } from './components/Footer';
import { MenuModal } from './components/MenuModal';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('eu');
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const { isSoundEnabled, toggleSound, playWoodStrike } = useSoundEffect();

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#f3f4f6] selection:bg-[#33363e] selection:text-white flex flex-col font-sans">
      {/* Navigation Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
        onOpenMenuModal={() => setIsMenuModalOpen(true)}
      />

      {/* Main Landing Flow */}
      <main className="flex-grow">
        {/* Bloque 01: Txalaparta Interactiva Hero */}
        <TxalapartaHero
          currentLang={currentLang}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={toggleSound}
          playWoodStrike={playWoodStrike}
          onOpenMenuModal={() => setIsMenuModalOpen(true)}
        />

        {/* Bloque 02: Sustraiak (Orígenes & Amona) */}
        <SustraiakSection currentLang={currentLang} />

        {/* Bloque 03: Indarra (Herri Kirolak & Aizkolari) */}
        <IndarraSection currentLang={currentLang} />

        {/* Bloque 04: Gure Sukaldaritza (Talo Contemporáneo & Carta) */}
        <SukaldaritzaSection
          currentLang={currentLang}
          onOpenMenuModal={() => setIsMenuModalOpen(true)}
        />

        {/* Bloque 05: Gure Etxea (Restaurante, Interior & Mural) */}
        <GureEtxeaSection currentLang={currentLang} />

        {/* Bloque 06: Kontaktua (Canales Verificados & Reservas) */}
        <KontaktuaSection currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Verified Editorial Menu Modal */}
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}

export default App;
