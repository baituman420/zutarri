import React, { useRef, useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

gsap.registerPlugin(ScrollTrigger, useGSAP);

if (typeof window !== 'undefined') {
  (window as any).__ScrollTrigger = ScrollTrigger;
  (window as any).__gsap = gsap;
}

interface GureEtxeaSectionProps {
  currentLang: Language;
}

interface MuralPanelConfig {
  id: string;
  orderIndex: string;
  image: string;
  title: { eu: string; es: string };
  desc: { eu: string; es: string };
  native: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  advance: {
    xOffset: number;
    yOffset: number;
    scale: number;
  };
  textAlignment: 'right' | 'left';
}

const NATIVE_WIDTH = 653;
const NATIVE_HEIGHT = 369;
const NATIVE_ASPECT = NATIVE_WIDTH / NATIVE_HEIGHT; // ~1.7696477

export const GureEtxeaSection: React.FC<GureEtxeaSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].gureEtxea;

  // Strict preservation of the three panels from existing codebase and translations
  const muralPanels: MuralPanelConfig[] = useMemo(
    () => [
      {
        id: 'mural-manos',
        orderIndex: '01',
        image: './assets/mural-manos.jpg',
        title: { eu: '01 // Eskuen Memoria', es: '01 // Memoria de las Manos' },
        desc: {
          eu: 'Eskuak arto-orea oratzen zurezko taulan.',
          es: 'Manos curtidas amasando el talo sobre madera noble.',
        },
        native: { x: 262, y: 61, width: 154, height: 154 },
        advance: { xOffset: -85, yOffset: 45, scale: 1.70 },
        textAlignment: 'right',
      },
      {
        id: 'mural-maiz',
        orderIndex: '02',
        image: './assets/mural-maiz.jpg',
        title: { eu: '02 // Artoaren Uzta', es: '02 // La Siembra y la Mazorca' },
        desc: {
          eu: 'Bizkaiko baserrietako arto-landaketa.',
          es: 'El ciclo agrícola del maíz en los caseríos de Bizkaia.',
        },
        native: { x: 107, y: 61, width: 154, height: 154 },
        advance: { xOffset: 70, yOffset: 45, scale: 1.78 },
        textAlignment: 'right',
      },
      {
        id: 'mural-molino',
        orderIndex: '03',
        image: './assets/mural-molino.jpg',
        title: { eu: '03 // Uraren Errota', es: '03 // El Molino de Agua' },
        desc: {
          eu: 'Harrizko gurpilak eta ibai-ura arto-irin mehea lortzeko.',
          es: 'La fuerza fluvial y las piedras de moler para harina pura.',
        },
        native: { x: 417, y: 61, width: 154, height: 154 },
        advance: { xOffset: -70, yOffset: 45, scale: 1.78 },
        textAlignment: 'left',
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLElement>(null);
  const stageTriggerRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const backdropDimRef = useRef<HTMLDivElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLDivElement>(null);
  const introBodyRef = useRef<HTMLDivElement>(null);
  const introMetaRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const worksRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const shadowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [containerSize, setContainerSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: 800,
  }));

  // Track container dimensions to preserve sub-pixel alignment at any screen resolution
  useEffect(() => {
    if (!pinnedStageRef.current) return;

    const updateDimensions = () => {
      if (pinnedStageRef.current) {
        setContainerSize({
          width: pinnedStageRef.current.clientWidth,
          height: pinnedStageRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    const ro = new ResizeObserver(() => updateDimensions());
    ro.observe(pinnedStageRef.current);
    return () => ro.disconnect();
  }, []);

  // Compute exact coordinates of each panel on the background dining room image
  const panelPositions = useMemo(() => {
    const cw = containerSize.width;
    const ch = containerSize.height;
    const cAspect = cw / ch;

    let renderW: number;
    let renderH: number;
    let renderX: number;
    let renderY: number;

    if (cAspect >= NATIVE_ASPECT) {
      renderW = cw;
      renderH = cw / NATIVE_ASPECT;
      renderX = 0;
      renderY = (ch - renderH) / 2;
    } else {
      renderH = ch;
      renderW = ch * NATIVE_ASPECT;
      renderY = 0;
      renderX = (cw - renderW) / 2;
    }

    return muralPanels.map((panel) => {
      const left = renderX + (panel.native.x / NATIVE_WIDTH) * renderW;
      const top = renderY + (panel.native.y / NATIVE_HEIGHT) * renderH;
      const width = (panel.native.width / NATIVE_WIDTH) * renderW;
      const height = (panel.native.height / NATIVE_HEIGHT) * renderH;
      return { left, top, width, height };
    });
  }, [containerSize, muralPanels]);

  // GSAP ScrollTrigger Timeline for Desktop & Reduced Motion Handling
  useGSAP(
    () => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) {
        // Fallback for users with reduced motion: keep elements natural without forced camera pin
        worksRef.current.forEach((el) => {
          if (el) gsap.set(el, { x: 0, y: 0, scale: 1, zIndex: 10 });
        });
        imgRefs.current.forEach((el) => {
          if (el) gsap.set(el, { filter: 'grayscale(0) brightness(1) contrast(1)' });
        });
        textRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 1, y: 0, pointerEvents: 'auto' });
        });
        if (introOverlayRef.current) gsap.set(introOverlayRef.current, { opacity: 1, y: 0 });
        if (hudRef.current) gsap.set(hudRef.current, { opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();

      // DESKTOP (>= 768px): Pinned ScrollTrigger with seamless intro and physical detachment from wall
      mm.add('(min-width: 768px)', () => {
        // Initial state: flush with wall, high contrast B&W, invisible shadow
        if (backdropDimRef.current) gsap.set(backdropDimRef.current, { opacity: 0 });
        if (hudRef.current) gsap.set(hudRef.current, { opacity: 0 });

        // Intro narrative overlay initial state: staggered elements start offset
        if (introOverlayRef.current) gsap.set(introOverlayRef.current, { opacity: 1, y: 0 });
        if (introTitleRef.current) gsap.set(introTitleRef.current, { opacity: 0, y: 25 });
        if (introBodyRef.current) gsap.set(introBodyRef.current, { opacity: 0, y: 25 });
        if (introMetaRef.current) gsap.set(introMetaRef.current, { opacity: 0, y: 25 });

        textRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 0, y: 25, pointerEvents: 'none' });
        });
        worksRef.current.forEach((el) => {
          if (el) gsap.set(el, { x: 0, y: 0, scale: 1, zIndex: 10 });
        });
        imgRefs.current.forEach((el) => {
          if (el) gsap.set(el, { filter: 'grayscale(1) brightness(0.85) contrast(1.15)' });
        });
        shadowRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 0, scale: 0.9 });
        });

        // Master Timeline tied 1:1 to scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageTriggerRef.current,
            start: 'top top',
            end: '+=540%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.40) setActiveStep(0);
              else if (p < 0.65) setActiveStep(0);
              else if (p < 0.85) setActiveStep(1);
              else setActiveStep(2);
            },
          },
        });

        // =========================================================================
        // FASE 1: ENTRADA NARRATIVA GURE ETXEA SOBRE EL COMEDOR
        // Time range: 0.0 -> 0.6 (Entrada suave y escalonada)
        // =========================================================================
        tl.to(introTitleRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.0);
        tl.to(introBodyRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.15);
        tl.to(introMetaRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.30);

        // =========================================================================
        // FASE 2: LECTURA TRANQUILA DE LOS TEXTOS SIN PRISAS
        // Time range: 0.6 -> 1.8 (1.2 unidades de timeline completas)
        // Permite al usuario leer detenidamente la introducción sobre el comedor.
        // =========================================================================

        // =========================================================================
        // FASE 3: DESAPARICIÓN PROGRESIVA DE TEXTOS INTRODUCTORIOS
        // Time range: 1.8 -> 2.3
        // Se desvanecen suavemente hacia arriba (opacity & y: -30) ANTES del primer cuadro.
        // =========================================================================
        tl.to(
          introOverlayRef.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: 'power2.inOut',
            pointerEvents: 'none',
          },
          1.8
        );

        // =========================================================================
        // FASE 4: MOMENTO LIMPIO (COMEDOR DESPEJADO CON LOS 3 CUADROS EN PARED)
        // Time range: 2.3 -> 2.8
        // Ningún texto visible. Solo el comedor real con las sillas a color y los 3 marcos.
        // =========================================================================

        // Al final del momento limpio, emerge el HUD superior y el suave dimming de fondo
        tl.to(hudRef.current, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 2.6);
        tl.to(backdropDimRef.current, { opacity: 0.45, duration: 0.4, ease: 'power1.inOut' }, 2.6);

        // =========================================================================
        // FASE 5: SECUENCIA DE ARTOAREN ZIKLOA (Coordinación sin solapamiento)
        // =========================================================================

        // -------------------------------------------------------------------------
        // CUADRO 01: 01 // Eskuen Memoria (Centro)
        // -------------------------------------------------------------------------
        tl.to(
          worksRef.current[0],
          {
            x: muralPanels[0].advance.xOffset,
            y: muralPanels[0].advance.yOffset,
            scale: muralPanels[0].advance.scale,
            zIndex: 40,
            duration: 0.7,
            ease: 'power2.out',
          },
          2.8
        );
        tl.to(
          shadowRefs.current[0],
          {
            opacity: 1,
            scale: 1.15,
            duration: 0.7,
            ease: 'power2.out',
          },
          2.8
        );
        tl.to(
          imgRefs.current[0],
          {
            filter: 'grayscale(0) brightness(1.04) contrast(1.05)',
            duration: 0.7,
            ease: 'power2.out',
          },
          2.8
        );
        tl.to(
          textRefs.current[0],
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.5,
            ease: 'power2.out',
          },
          3.0
        );

        // Regreso del Cuadro 01 a la pared
        tl.to(
          textRefs.current[0],
          {
            opacity: 0,
            y: -15,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in',
          },
          3.8
        );
        tl.to(
          worksRef.current[0],
          {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 10,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          3.8
        );
        tl.to(
          shadowRefs.current[0],
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          3.8
        );
        tl.to(
          imgRefs.current[0],
          {
            filter: 'grayscale(1) brightness(0.85) contrast(1.15)',
            duration: 0.5,
            ease: 'power2.inOut',
          },
          3.8
        );

        // -------------------------------------------------------------------------
        // CUADRO 02: 02 // Artoaren Uzta (Izquierda)
        // Comienza en 4.4 (tras el regreso completo del Cuadro 01 en 4.3)
        // -------------------------------------------------------------------------
        tl.to(
          worksRef.current[1],
          {
            x: muralPanels[1].advance.xOffset,
            y: muralPanels[1].advance.yOffset,
            scale: muralPanels[1].advance.scale,
            zIndex: 40,
            duration: 0.7,
            ease: 'power2.out',
          },
          4.4
        );
        tl.to(
          shadowRefs.current[1],
          {
            opacity: 1,
            scale: 1.15,
            duration: 0.7,
            ease: 'power2.out',
          },
          4.4
        );
        tl.to(
          imgRefs.current[1],
          {
            filter: 'grayscale(0) brightness(1.04) contrast(1.05)',
            duration: 0.7,
            ease: 'power2.out',
          },
          4.4
        );
        tl.to(
          textRefs.current[1],
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.5,
            ease: 'power2.out',
          },
          4.6
        );

        // Regreso del Cuadro 02 a la pared
        tl.to(
          textRefs.current[1],
          {
            opacity: 0,
            y: -15,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in',
          },
          5.4
        );
        tl.to(
          worksRef.current[1],
          {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 10,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          5.4
        );
        tl.to(
          shadowRefs.current[1],
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          5.4
        );
        tl.to(
          imgRefs.current[1],
          {
            filter: 'grayscale(1) brightness(0.85) contrast(1.15)',
            duration: 0.5,
            ease: 'power2.inOut',
          },
          5.4
        );

        // -------------------------------------------------------------------------
        // CUADRO 03: 03 // Uraren Errota (Derecha)
        // Comienza en 6.0 (tras el regreso completo del Cuadro 02 en 5.9)
        // -------------------------------------------------------------------------
        tl.to(
          worksRef.current[2],
          {
            x: muralPanels[2].advance.xOffset,
            y: muralPanels[2].advance.yOffset,
            scale: muralPanels[2].advance.scale,
            zIndex: 40,
            duration: 0.7,
            ease: 'power2.out',
          },
          6.0
        );
        tl.to(
          shadowRefs.current[2],
          {
            opacity: 1,
            scale: 1.15,
            duration: 0.7,
            ease: 'power2.out',
          },
          6.0
        );
        tl.to(
          imgRefs.current[2],
          {
            filter: 'grayscale(0) brightness(1.04) contrast(1.05)',
            duration: 0.7,
            ease: 'power2.out',
          },
          6.0
        );
        tl.to(
          textRefs.current[2],
          {
            opacity: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.5,
            ease: 'power2.out',
          },
          6.2
        );

        // Regreso del Cuadro 03 a la pared
        tl.to(
          textRefs.current[2],
          {
            opacity: 0,
            y: -15,
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in',
          },
          7.0
        );
        tl.to(
          worksRef.current[2],
          {
            x: 0,
            y: 0,
            scale: 1,
            zIndex: 10,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          7.0
        );
        tl.to(
          shadowRefs.current[2],
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: 'power2.inOut',
          },
          7.0
        );
        tl.to(
          imgRefs.current[2],
          {
            filter: 'grayscale(1) brightness(0.85) contrast(1.15)',
            duration: 0.5,
            ease: 'power2.inOut',
          },
          7.0
        );

        // Cierre suave: desvanecer HUD y dimmer para transicionar a la siguiente sección
        tl.to(backdropDimRef.current, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 7.2);
        tl.to(hudRef.current, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 7.2);

        return () => mm.revert();
      });
    },
    { scope: sectionRef, dependencies: [currentLang] }
  );

  return (
    <section
      id="gure-etxea"
      ref={sectionRef}
      className="relative w-full bg-[#07080a] text-[#f3f4f6] select-none"
    >
      {/* 1. THE IMMERSIVE GURE ETXEA & ARTOAREN ZIKLOA STAGE: Full-Bleed Restaurant Dining Room (Desktop GSAP Stage) */}
      <div ref={stageTriggerRef} className="relative w-full overflow-hidden hidden md:block">
        <div
          ref={pinnedStageRef}
          className="relative w-full h-screen min-h-[720px] max-h-[960px] overflow-hidden bg-[#07080a]"
        >
          {/* Full-Bleed Restaurant Dining Room Background */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="./assets/restaurante-comedor-real.jpg"
              alt="Zutarri Jatetxearen jantokia Bentako Plazan"
              className="w-full h-full object-cover filter grayscale contrast-125 brightness-[0.82] dining-bg select-none pointer-events-none"
            />
            {/* Dining Chairs: Original Warm Color Masked Layer */}
            <img
              src="./assets/restaurante-comedor-real.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover dining-chairs-color select-none pointer-events-none"
              style={{
                WebkitMaskImage: 'url(./assets/comedor-chairs-mask.png)',
                maskImage: 'url(./assets/comedor-chairs-mask.png)',
                WebkitMaskSize: 'cover',
                maskSize: 'cover',
                WebkitMaskPosition: 'center center',
                maskPosition: 'center center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                filter: 'saturate(1.2) contrast(1.05) brightness(0.96)',
              }}
            />
            {/* Top and Bottom atmospheric gradient blends */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]/90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/60 via-transparent to-[#07080a]/60 pointer-events-none" />
          </div>

          {/* Dynamic Backdrop Dimmer: Focuses attention as paintings detach */}
          <div
            ref={backdropDimRef}
            className="absolute inset-0 bg-[#07080a]/65 pointer-events-none z-10 transition-opacity"
          />

          {/* =========================================================================
              NARRATIVA DE ENTRADA GURE ETXEA:
              Integrada directamente sobre el comedor en la escena.
              Sin cajas opacas ni tarjetas: un velo atmosférico global sutil sobre la escena
              que asegura legibilidad editorial nítida y se desvanece al continuar el scroll.
             ========================================================================= */}
          <div
            ref={introOverlayRef}
            className="absolute inset-0 flex flex-col justify-between px-8 sm:px-12 lg:px-20 pt-24 sm:pt-28 pb-12 lg:pb-16 pointer-events-none will-change-transform bg-gradient-to-b from-[#07080a]/90 via-[#07080a]/65 to-[#07080a]/90"
            style={{ zIndex: 35 }}
          >
            {/* Cabecera Superior: GURE ETXEA + Título + Lead (Al frente absoluto) */}
            <div ref={introTitleRef} className="relative z-10 max-w-5xl space-y-3">
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-[#d49b42] block drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {t.index}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-tight text-[#f3f4f6] uppercase leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {t.title}
              </h2>
              <p className="font-editorial text-lg sm:text-xl text-[#e5e7eb] italic max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] pt-1">
                {t.lead}
              </p>
            </div>

            {/* Bloque Inferior: Narrativa de la casa y Arraigo popular (Sin tarjetas ni cajas opacas) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pt-6">
              {/* Narrativa del espacio */}
              <div ref={introBodyRef} className="lg:col-span-7 space-y-3">
                <p className="font-editorial text-base sm:text-lg text-[#f3f4f6] italic leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {t.body1}
                </p>
                <p className="font-sans text-xs sm:text-sm text-[#d1d5db] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  {t.body2}
                </p>
              </div>

              {/* Metadatos de ubicación y proyecto con la comunidad */}
              <div ref={introMetaRef} className="lg:col-span-5 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d49b42] flex-shrink-0 mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]" />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#f3f4f6] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      Bentako Plaza, 3 · Basauri
                    </h4>
                    <p className="font-mono text-[11px] text-[#cbd5e1] mt-0.5 leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      {currentLang === 'eu'
                        ? 'Arizko metro geltokitik 3 minutura (L2 Metro Bilbao). Plaza lasaia eta aparkaleku erosoak.'
                        : 'A 3 minutos a pie del metro Ariz (L2 Metro Bilbao). Plaza peatonal tranquila y aparcamientos.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <HeartHandshake className="w-4 h-4 text-[#d49b42] flex-shrink-0 mt-0.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]" />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-wider text-[#f3f4f6] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      {currentLang === 'eu' ? 'Herriari Lotutako Proiektua' : 'Proyecto con Arraigo Popular'}
                    </h4>
                    <p className="font-mono text-[11px] text-[#cbd5e1] mt-0.5 leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                      {currentLang === 'eu'
                        ? 'Zutarri Kultura Elkartea: nortasuna, elkartasuna eta kultura gastronomiaren bidez bizirik mantentzea.'
                        : 'Zutarri Kultura Elkartea: identidad de pueblo, cultura vasca y convivencia a través de la mesa.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Section Status HUD Header (Visible during mural sequence, cleanly below main navbar) */}
          <div
            ref={hudRef}
            className="absolute top-24 sm:top-28 left-8 sm:left-12 right-8 sm:right-12 z-30 flex items-center justify-between pointer-events-none"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-[#d49b42] block">
                ARTEA & ONDAREA // ARTOAREN ZIKLOA
              </span>
              <h3 className="font-display font-black text-2xl lg:text-3xl text-[#f3f4f6] uppercase tracking-tight">
                {t.muralTitle}
              </h3>
            </div>

            {/* Step Progress Dots Indicator */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#07080a]/80 backdrop-blur-md border border-white/10 font-mono text-xs pointer-events-auto">
              {muralPanels.map((panel, idx) => (
                <div key={panel.id} className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeStep === idx
                        ? 'bg-[#d49b42] scale-125 shadow-[0_0_8px_rgba(212,155,66,0.8)]'
                        : 'bg-white/20'
                    }`}
                  />
                  <span
                    className={`text-[10px] tracking-wider transition-colors duration-300 ${
                      activeStep === idx ? 'text-[#d49b42] font-bold' : 'text-white/40'
                    }`}
                  >
                    {panel.orderIndex}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Pixel Mathematical Canvas: Exact Wall Artwork Placement */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {muralPanels.map((panel, index) => {
              const pos = panelPositions[index] || { left: 0, top: 0, width: 0, height: 0 };
              return (
                <div
                  key={panel.id}
                  ref={(el) => (worksRef.current[index] = el)}
                  className="absolute pointer-events-auto will-change-transform"
                  style={{
                    left: `${pos.left}px`,
                    top: `${pos.top}px`,
                    width: `${pos.width}px`,
                    height: `${pos.height}px`,
                    transformOrigin: 'center center',
                  }}
                >
                  <div className="relative w-full h-full group">
                    {/* The Deep Projection Shadow: Expands as artwork advances forward */}
                    <div
                      ref={(el) => (shadowRefs.current[index] = el)}
                      className="absolute -inset-6 -z-10 rounded-sm pointer-events-none will-change-transform"
                      style={{
                        boxShadow:
                          '0 35px 70px -10px rgba(0, 0, 0, 0.98), 0 0 45px rgba(0, 0, 0, 0.85)',
                        filter: 'blur(6px)',
                      }}
                    />

                    {/* The Artwork Itself: Starts flush on the wall in B&W, blooms to authentic tone */}
                    <img
                      ref={(el) => (imgRefs.current[index] = el)}
                      src={panel.image}
                      alt={panel.title[currentLang]}
                      className="w-full h-full object-cover rounded-none cursor-pointer"
                      style={{
                        transition: 'filter 0.4s ease-out',
                      }}
                    />

                    {/* Subtle micro-rim border */}
                    <div className="absolute inset-0 border border-black/50 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editorial Typography Overlays (Cleanly positioned to NEVER cover the artwork) */}
          {muralPanels.map((panel, index) => {
            const isCenter = index === 0;
            const isLeftArtwork = index === 1;

            // Compute optimal non-overlapping position
            const positionClass = isCenter
              ? 'right-6 lg:right-12 top-1/2 -translate-y-1/2 text-left max-w-sm'
              : isLeftArtwork
              ? 'right-8 lg:right-16 top-1/2 -translate-y-1/2 text-left max-w-sm lg:max-w-md'
              : 'left-8 lg:left-16 top-1/2 -translate-y-1/2 text-left max-w-sm lg:max-w-md';

            return (
              <div
                key={`text-${panel.id}`}
                ref={(el) => (textRefs.current[index] = el)}
                className={`absolute z-50 pointer-events-none select-none ${positionClass}`}
              >
                <div className="space-y-4 bg-[#07080a]/80 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block font-bold">
                      {panel.title[currentLang]}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#f3f4f6] uppercase tracking-tight leading-tight">
                    {panel.title[currentLang].split('// ')[1] || panel.title[currentLang]}
                  </h4>

                  <p className="font-editorial italic text-base sm:text-lg text-[#d49b42] leading-relaxed">
                    «{panel.desc[currentLang]}»
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#9ca3af]">
                    <span>{t.muralDesc}</span>
                    <span className="text-[#d49b42] font-semibold">{panel.orderIndex} / 03</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Adaptation (< 768px): Dedicated responsive narrative flow with authentic color bloom */}
      <div className="md:hidden px-4 sm:px-8 py-16 space-y-12">
        <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-8">
          <img
            src="./assets/restaurante-comedor-real.jpg"
            alt="Zutarri Jatetxearen jantokia"
            className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
          />
          <img
            src="./assets/restaurante-comedor-real.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              WebkitMaskImage: 'url(./assets/comedor-chairs-mask.png)',
              maskImage: 'url(./assets/comedor-chairs-mask.png)',
              WebkitMaskSize: 'cover',
              maskSize: 'cover',
              WebkitMaskPosition: 'center center',
              maskPosition: 'center center',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              filter: 'saturate(1.2) contrast(1.05) brightness(0.96)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 max-w-xs">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#d49b42] block">
              GURE ESPAZIOA // BASAURI
            </span>
            <h4 className="font-display font-black text-xl text-[#f3f4f6] uppercase">
              {t.muralTitle}
            </h4>
          </div>
        </div>

        {/* Mobile Narrative texts */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block">
            {t.index}
          </span>
          <h2 className="font-display font-black text-3xl text-[#f3f4f6] uppercase leading-none">
            {t.title}
          </h2>
          <p className="font-editorial text-base text-[#9ca3af] italic">
            {t.lead}
          </p>
          <p className="font-editorial text-base text-[#f3f4f6] italic leading-relaxed pt-2">
            {t.body1}
          </p>
          <p className="font-sans text-sm text-[#9ca3af] leading-relaxed">
            {t.body2}
          </p>
        </div>

        {/* Mobile Location & Community Info */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#d49b42] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                Bentako Plaza, 3 · Basauri
              </h4>
              <p className="font-mono text-xs text-[#9ca3af] mt-1 leading-relaxed">
                {currentLang === 'eu'
                  ? 'Arizko metro geltokitik 3 minutura oinez (L2 Metro Bilbao). Plaza lasaia eta aparkaleku erosoak inguruan.'
                  : 'A 3 minutos a pie del metro Ariz (L2 Metro Bilbao). Plaza peatonal tranquila y aparcamientos cercanos.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#d49b42] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#f3f4f6] font-bold">
                {currentLang === 'eu' ? 'Herriari Lotutako Proiektua' : 'Proyecto con Arraigo Popular'}
              </h4>
              <p className="font-mono text-xs text-[#9ca3af] mt-1 leading-relaxed">
                {currentLang === 'eu'
                  ? 'Zutarri Kultura Elkartearen ekimena: herriaren nortasuna, elkartasuna eta euskal kultura gastronomiaren bidez bizirik mantentzea.'
                  : 'Impulsado por Zutarri Kultura Elkartea: mantener viva la identidad de pueblo, la cultura vasca y la convivencia a través de la mesa.'}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile 3 Paintings */}
        <div className="space-y-12 pt-6">
          {muralPanels.map((panel) => (
            <div key={`mobile-${panel.id}`} className="space-y-4 group">
              <div className="relative aspect-square overflow-hidden rounded-sm border border-white/10">
                <img
                  src={panel.image}
                  alt={panel.title[currentLang]}
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 active:grayscale-0 group-hover:grayscale-0"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#07080a]/80 font-mono text-[10px] text-[#d49b42] tracking-widest uppercase">
                  {panel.orderIndex} // 03
                </div>
              </div>
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#d49b42] font-semibold">
                {panel.title[currentLang]}
              </h5>
              <p className="font-editorial italic text-base text-[#f3f4f6] leading-snug">
                «{panel.desc[currentLang]}»
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
