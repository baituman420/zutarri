import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BookOpen, Sparkles, X, ArrowUpRight, CheckCircle2, MoveHorizontal } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  APPROVED_10_DISHES,
  GastronomicItem,
  APPROVED_COMPOSITION_METADATA,
} from '../data/sukaldaritza-composition';

export type { GastronomicItem };

export interface DishCoordsOverride {
  id: string;
  nativeCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  zIndex?: number;
}

export interface SukaldaritzaSectionProps {
  currentLang: Language;
  onOpenMenuModal: () => void;
  overrideHeight?: number;
  overrideDishes?: DishCoordsOverride[];
}

const NATIVE_WIDTH = 1671;
const NATIVE_HEIGHT = 941;
const NATIVE_ASPECT = NATIVE_WIDTH / NATIVE_HEIGHT; // ~1.77577

export const SukaldaritzaSection: React.FC<SukaldaritzaSectionProps> = ({
  currentLang,
  onOpenMenuModal,
  overrideHeight,
  overrideDishes,
}) => {
  const t = translations[currentLang].sukaldaritza;
  const sectionRef = useRef<HTMLElement>(null);

  const [containerSize, setContainerSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height:
      typeof window !== 'undefined' && window.innerWidth < 768
        ? 740
        : overrideHeight || APPROVED_COMPOSITION_METADATA.blockHeight,
  }));
  const kitchenCameraRef = useRef<HTMLDivElement>(null);
  const cameraXRef = useRef<number>(0);
  const [hasDragged, setHasDragged] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedMobileItem, setSelectedMobileItem] = useState<GastronomicItem | null>(null);

  const defaultDishes: GastronomicItem[] = useMemo(() => APPROVED_10_DISHES, []);

  const dishes: GastronomicItem[] = useMemo(() => {
    if (!overrideDishes || overrideDishes.length === 0) return defaultDishes;
    return defaultDishes.map((dish) => {
      const override = overrideDishes.find((o) => o.id === dish.id);
      if (!override) return dish;
      return {
        ...dish,
        nativeCoords: { ...override.nativeCoords },
        zIndex: override.zIndex ?? dish.zIndex,
      };
    });
  }, [defaultDishes, overrideDishes]);

  // Measure container dimensions with ResizeObserver to maintain mathematical compensation
  useEffect(() => {
    if (!sectionRef.current) return;

    const updateSize = () => {
      if (sectionRef.current) {
        setContainerSize({
          width: sectionRef.current.clientWidth,
          height: sectionRef.current.clientHeight,
        });
      }
    };

    updateSize();

    const ro = new ResizeObserver(() => {
      updateSize();
    });

    ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, []);

  // Mathematical compensation for background-size: cover & crop alignment
  const geometry = useMemo(() => {
    const cw = containerSize.width;
    const ch = containerSize.height;
    const isMobile = cw < 768;
    const cAspect = cw / ch;

    let renderW: number;
    let renderH: number;
    let defaultCameraX: number;
    let renderY: number;

    if (cAspect >= NATIVE_ASPECT) {
      // Container is wider than the native image (cropped top/bottom)
      renderW = cw;
      renderH = cw / NATIVE_ASPECT;
      defaultCameraX = 0;
      // Anchor to bottom so the wooden counter is always resting perfectly on the bottom
      renderY = ch - renderH;
    } else {
      // Container is taller/narrower than native image (cropped horizontally)
      renderH = ch;
      renderW = ch * NATIVE_ASPECT;
      renderY = 0;

      if (isMobile) {
        // On mobile: initially center the historical kitchen counter (~50% width)
        const minX = cw - renderW;
        const maxX = 0;
        defaultCameraX = Math.max(minX, Math.min(maxX, cw / 2 - 0.50 * renderW));
      } else {
        // Desktop / Tablet:
        // Bias slightly towards the left (0.28) so the woman at the hearth and kneading table are fully visible
        const overflowX = renderW - cw;
        defaultCameraX = -overflowX * 0.28;
      }
    }

    const minX = Math.min(0, cw - renderW);
    const maxX = 0;

    // Compute exact position and size for each dish relative to the kitchen camera canvas
    const dishPositions = dishes.map((dish) => {
      const normX = dish.nativeCoords.x / NATIVE_WIDTH;
      const normY = dish.nativeCoords.y / NATIVE_HEIGHT;
      const normW = dish.nativeCoords.width / NATIVE_WIDTH;

      const left = normX * renderW;
      const top = normY * renderH;
      const width = normW * renderW;

      return {
        id: dish.id,
        left,
        top,
        width,
        zIndex: dish.zIndex,
      };
    });

    return {
      renderW,
      renderH,
      defaultCameraX,
      renderY,
      minX,
      maxX,
      dishPositions,
      isMobile,
    };
  }, [containerSize, dishes]);

  // Sync camera position on geometry changes or container resize
  useEffect(() => {
    if (!hasDragged || !geometry.isMobile) {
      cameraXRef.current = geometry.defaultCameraX;
      if (kitchenCameraRef.current) {
        kitchenCameraRef.current.style.transform = `translate3d(${geometry.defaultCameraX}px, 0, 0)`;
      }
    } else {
      // Clamping within bounds if container resized
      const clampedX = Math.max(geometry.minX, Math.min(geometry.maxX, cameraXRef.current));
      cameraXRef.current = clampedX;
      if (kitchenCameraRef.current) {
        kitchenCameraRef.current.style.transform = `translate3d(${clampedX}px, 0, 0)`;
      }
    }
  }, [geometry.defaultCameraX, geometry.minX, geometry.maxX, geometry.isMobile, hasDragged]);

  // Mobile Touch Drag & Exploration Handlers (Continuous, proportional, zero inertia)
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let isTracking = false;
    let isHorizontalDrag = false;
    let isVerticalScroll = false;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 768 || e.touches.length !== 1) return;
      isTracking = true;
      isHorizontalDrag = false;
      isVerticalScroll = false;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      initialX = cameraXRef.current;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTracking || window.innerWidth >= 768 || e.touches.length !== 1) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      // Determine intent on small initial movement (3px threshold)
      if (!isHorizontalDrag && !isVerticalScroll) {
        if (absX < 3 && absY < 3) return;
        if (absY >= absX) {
          isVerticalScroll = true; // Natural page scroll takes precedence
          return;
        } else {
          isHorizontalDrag = true; // User wants horizontal kitchen exploration
        }
      }

      if (isVerticalScroll) return;

      if (isHorizontalDrag) {
        if (e.cancelable) e.preventDefault();

        const cw = sectionEl.clientWidth || window.innerWidth;
        const renderW = geometry.renderW;
        const minX = Math.min(0, cw - renderW);
        const maxX = 0;

        // Direct, continuous, 1:1 proportional movement
        const targetX = Math.max(minX, Math.min(maxX, initialX + deltaX));
        cameraXRef.current = targetX;

        if (kitchenCameraRef.current) {
          kitchenCameraRef.current.style.transform = `translate3d(${targetX}px, 0, 0)`;
        }

        setHasDragged(true);
      }
    };

    const handleTouchEnd = () => {
      isTracking = false;
      isHorizontalDrag = false;
      isVerticalScroll = false;
    };

    // Pointer / Mouse Fallback (for DevTools emulation & desktop testing)
    let isMouseDown = false;
    const handleMouseDown = (e: MouseEvent) => {
      if (window.innerWidth >= 768 || e.button !== 0) return;
      isMouseDown = true;
      startX = e.clientX;
      initialX = cameraXRef.current;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown || window.innerWidth >= 768) return;
      const deltaX = e.clientX - startX;
      const cw = sectionEl.clientWidth || window.innerWidth;
      const renderW = geometry.renderW;
      const minX = Math.min(0, cw - renderW);
      const maxX = 0;

      const targetX = Math.max(minX, Math.min(maxX, initialX + deltaX));
      cameraXRef.current = targetX;

      if (kitchenCameraRef.current) {
        kitchenCameraRef.current.style.transform = `translate3d(${targetX}px, 0, 0)`;
      }

      setHasDragged(true);
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    sectionEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    sectionEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    sectionEl.addEventListener('touchend', handleTouchEnd, { passive: true });
    sectionEl.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    sectionEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      sectionEl.removeEventListener('touchstart', handleTouchStart);
      sectionEl.removeEventListener('touchmove', handleTouchMove);
      sectionEl.removeEventListener('touchend', handleTouchEnd);
      sectionEl.removeEventListener('touchcancel', handleTouchEnd);

      sectionEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [geometry.renderW]);

  const activeDish = dishes.find(d => d.id === hoveredId);

  return (
    <section
      id="sukaldaritza"
      ref={sectionRef}
      style={overrideHeight ? { height: `${overrideHeight}px`, minHeight: `${overrideHeight}px` } : undefined}
      className={`relative w-full ${overrideHeight ? '' : 'min-h-[740px] sm:min-h-[840px] md:min-h-[940px] lg:h-[1040px] xl:h-[1100px]'} flex flex-col justify-between overflow-hidden bg-[#08090c] text-[#f3f4f6] touch-pan-y select-none`}
    >
      {/* ========================================================================= */}
      {/* 1. PANORAMIC KITCHEN CAMERA LAYER: Photo + 10 Dishes Synchronized         */}
      {/* ========================================================================= */}
      <div
        ref={kitchenCameraRef}
        className="absolute will-change-transform touch-pan-y select-none"
        style={{
          width: `${geometry.renderW}px`,
          height: `${geometry.renderH}px`,
          top: `${geometry.renderY}px`,
          left: 0,
          transform: `translate3d(${geometry.defaultCameraX}px, 0, 0)`,
        }}
      >
        {/* Kitchen background image */}
        <img
          src="./assets/images/Cocina histórica con barra de madera vacía.png"
          alt="Zutarri Sukalde Historikoa eta Barra"
          style={{
            width: `${geometry.renderW}px`,
            height: `${geometry.renderH}px`,
            userSelect: 'none',
            WebkitUserDrag: 'none',
          } as React.CSSProperties}
          className="absolute top-0 left-0 max-w-none select-none pointer-events-none"
          draggable={false}
          loading="eager"
        />

        {/* 10 Independent Gastronomic Product Components (Anchored relative to kitchen canvas) */}
        {dishes.map((dish, idx) => {
          const pos = geometry.dishPositions[idx];
          if (!pos) return null;

          const isHovered = hoveredId === dish.id;
          const isSelected = selectedMobileItem?.id === dish.id;
          const isActive = isHovered || isSelected;

          return (
            <div
              key={dish.id}
              style={{
                left: `${pos.left}px`,
                top: `${pos.top}px`,
                width: `${pos.width}px`,
                zIndex: pos.zIndex,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute pointer-events-auto cursor-pointer group"
              onMouseEnter={() => setHoveredId(dish.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedMobileItem(dish)}
              tabIndex={0}
              role="button"
              aria-label={dish.name[currentLang]}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedMobileItem(dish);
                }
              }}
            >
              {/* Photorealistic Ground Contact Shadow Asset or Organic Shadow */}
              {dish.shadowSrc ? (
                <img
                  src={dish.shadowSrc}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  style={{ userSelect: 'none', WebkitUserDrag: 'none' } as React.CSSProperties}
                  className={`absolute inset-0 w-full h-full pointer-events-none select-none transition-all duration-300 ease-out ${
                    isActive
                      ? 'opacity-50 scale-[0.97] blur-[1.5px]'
                      : 'opacity-100 scale-100 blur-0'
                  }`}
                />
              ) : (
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-[88%] h-3 rounded-full bg-black/75 blur-[4px] pointer-events-none transition-all duration-300 ${
                    isActive ? 'opacity-40 scale-90 blur-[5px]' : 'opacity-85 scale-100'
                  }`}
                />
              )}

              {/* Actual Dish Cutout (Warm Desaturated Idle -> Vibrant Full Color Bloom on Active/Hover) */}
              <div
                className={`relative w-full h-auto transition-transform duration-500 ease-out ${
                  isActive ? '-translate-y-2 scale-[1.03]' : 'translate-y-0 scale-100'
                }`}
              >
                <img
                  src={dish.imageSrc}
                  alt={dish.name[currentLang]}
                  draggable={false}
                  className="w-full h-auto block select-none pointer-events-none"
                  style={{
                    filter: isActive
                      ? 'drop-shadow(0 14px 28px rgba(0,0,0,0.85)) drop-shadow(0 0 16px rgba(212,155,66,0.30)) saturate(1) sepia(0) brightness(1) contrast(1)'
                      : 'drop-shadow(0 3px 6px rgba(0,0,0,0.65)) saturate(0.40) sepia(0.30) brightness(0.92) contrast(1.04)',
                    transition:
                      'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                  } as React.CSSProperties}
                />

                {/* Subtle Beacon Pulse on Idle */}
                {!isActive && (
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#d49b42]/35 animate-ping pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Scrim & Vignette: Seamless continuous transition from Section 03 (Indarra) */}
      <div className="absolute top-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-b from-[#0b0c0e] via-[#0b0c0e]/60 to-transparent pointer-events-none z-10" />

      {/* Bottom Scrim & Vignette: Seamless continuous transition to Section 05 (Gure Etxea) */}
      <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#07080a] via-[#07080a]/60 to-transparent pointer-events-none z-10" />

      {/* ========================================================================= */}
      {/* 2. SECTION HEADER (Editorial Typography Floating Over the Scene)           */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-8 sm:pt-10 md:pt-12 px-4 sm:px-8 lg:px-16 pointer-events-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#d49b42] block mb-2">
              {t.index}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#f3f4f6] uppercase leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {t.title}
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 max-w-lg">
            <p className="font-editorial text-base sm:text-lg md:text-xl text-[#e5e7eb] italic text-left md:text-right leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              {currentLang === 'eu'
                ? 'Eszena gastronomiko bizia: hamar sorkuntza artisau gure sukalde historikoaren gainean, eskuz oratutako artoaren memorian.'
                : 'Escena gastronómica viva: diez creaciones artesanas integradas sobre la barra de nuestra cocina histórica.'}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#d49b42] uppercase tracking-widest drop-shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#d49b42]" />
              <span className="hidden md:inline">
                {currentLang === 'eu' ? 'Pasa kurtsorea plateren gainetik' : 'Pasa el cursor sobre los platos'}
              </span>
              <span className="md:hidden">
                {currentLang === 'eu' ? 'Arrastatu sukaldea eta ukitu platerak' : 'Arrastra la cocina y toca los platos'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DESKTOP EDITORIAL SPOTLIGHT (Floating Naturally Over the Scene)         */}
      {/* ========================================================================= */}
      {activeDish && !geometry.isMobile && (
        <div
          className={`hidden md:block absolute z-30 pointer-events-none transition-all duration-300 ease-out ${
            activeDish.tooltipPosition === 'top-left'
              ? 'left-[8%] top-[34%] max-w-sm text-left'
              : activeDish.tooltipPosition === 'top-right'
              ? 'right-[8%] top-[36%] max-w-sm text-left'
              : 'left-1/2 -translate-x-1/2 top-[32%] max-w-md text-center'
          }`}
        >
          <div className="bg-[#08090c]/90 backdrop-blur-md p-5 rounded-md border border-[#d49b42]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d49b42]">
              <span>{activeDish.index} // {activeDish.badge[currentLang]}</span>
            </div>

            <h3 className="font-display font-black text-xl text-[#f3f4f6] uppercase tracking-tight leading-snug">
              {activeDish.name[currentLang]}
            </h3>

            <p className="font-sans text-xs text-[#d1d5db] leading-relaxed">
              {activeDish.description[currentLang]}
            </p>

            <p className="font-editorial italic text-xs text-[#9ca3af] pt-1">
              {activeDish.notes[currentLang]}
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-[#22262e] text-[11px] font-mono">
              <span className="text-[#6b7280]">
                {activeDish.zone[currentLang]}
              </span>
              <button
                onClick={onOpenMenuModal}
                className="inline-flex items-center gap-1 text-[#d49b42] hover:text-white transition-colors pointer-events-auto uppercase tracking-wider font-semibold cursor-pointer"
              >
                <span>{t.viewFullMenu}</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discreet Mobile Drag Indicator (Disappears permanently once the user drags the kitchen scene) */}
      {!hasDragged && (
        <div
          data-testid="sukaldaritza-drag-indicator"
          className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500"
        >
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08090c]/85 backdrop-blur-md border border-[#d49b42]/30 text-[10px] font-mono uppercase tracking-wider text-[#d49b42] shadow-xl">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#d49b42] animate-pulse" />
            <span>{currentLang === 'eu' ? 'Arrastatu sukaldea' : 'Arrastra la cocina'}</span>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MOBILE BOTTOM-SHEET MODAL (Full Inspection on Tap)                     */}
      {/* ========================================================================= */}
      {selectedMobileItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedMobileItem(null)}
        >
          <div
            className="bg-[#0e1014] border border-[#2a2f3a] rounded-t-xl sm:rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#22262e] pb-3">
              <span className="text-xs font-mono text-[#d49b42] uppercase tracking-widest font-semibold">
                {selectedMobileItem.index} // {selectedMobileItem.badge[currentLang]}
              </span>
              <button
                onClick={() => setSelectedMobileItem(null)}
                className="p-1 rounded-md text-[#9ca3af] hover:text-white hover:bg-[#1a1e26] transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/9] bg-[#07080a] rounded-lg overflow-hidden flex items-center justify-center p-4 border border-[#1a1e26]">
              <img
                src={selectedMobileItem.imageSrc}
                alt={selectedMobileItem.name[currentLang]}
                className="max-h-full max-w-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-black text-2xl text-[#f3f4f6] uppercase tracking-tight">
                {selectedMobileItem.name[currentLang]}
              </h3>
              <p className="font-sans text-sm text-[#d1d5db] leading-relaxed">
                {selectedMobileItem.description[currentLang]}
              </p>
              <p className="font-editorial italic text-xs text-[#d49b42] pt-1">
                {selectedMobileItem.notes[currentLang]}
              </p>
            </div>

            <div className="pt-3 border-t border-[#22262e] flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-[#6b7280]">
                {selectedMobileItem.zone[currentLang]}
              </span>
              <button
                onClick={() => {
                  setSelectedMobileItem(null);
                  onOpenMenuModal();
                }}
                className="px-4 py-2 bg-[#d49b42] text-[#08090c] font-mono text-xs font-bold uppercase tracking-wider rounded hover:bg-[#e5ac55] transition-colors cursor-pointer"
              >
                {t.viewFullMenu} &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SECTION FOOTER (Floating Seamlessly Above the Counter Bottom)          */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-8 lg:px-16 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#d49b42] flex-shrink-0" />
          <p className="font-mono text-xs text-[#e5e7eb] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {currentLang === 'eu'
              ? 'Arto-talo artisauak, egunean bertan eskuz oratuak eta txapa bizian erreak.'
              : 'Talos artesanales de maíz, amasados a mano a diario y cocinados a la chapa.'}
          </p>
        </div>

        <button
          onClick={onOpenMenuModal}
          className="px-6 py-2.5 bg-[#f3f4f6] hover:bg-[#d49b42] text-[#07080a] hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm cursor-pointer whitespace-nowrap shadow-2xl inline-flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.viewFullMenu}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
