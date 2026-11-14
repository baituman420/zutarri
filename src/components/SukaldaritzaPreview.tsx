import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  Move,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Sliders,
  ChevronDown,
  ChevronUp,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Trash2,
  Bookmark,
  Save,
  Eye,
  EyeOff,
  Grid
} from 'lucide-react';
import { SukaldaritzaSection, DishCoordsOverride } from './SukaldaritzaSection';

export interface EditableDish {
  id: string;
  name: string;
  description: string;
  category: 'amasadora' | 'barra-izq' | 'barra-centro' | 'barra-dcha';
  categoryLabel: string;
  source: string;
  imageSrc: string;
  shadowSrc?: string;
  aspect: number; // width / height
  x: number; // Native coordinate (0..1671)
  y: number; // Native coordinate (0..941)
  width: number; // Native width (px)
  height: number; // Native height (px)
  zIndex: number; // Depth layer order (1..50)
  active: boolean; // Whether dish is visible on canvas
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  initialZIndex: number;
  initialActive: boolean;
  color: string;
  hint: string;
}

export interface SavedComposition {
  id: string;
  name: string;
  isBuiltIn?: boolean;
  timestamp: string;
  blockHeight: number;
  dishes: Array<{
    id: string;
    active: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
  }>;
}

const NATIVE_WIDTH = 1671;
const NATIVE_HEIGHT = 941;
const NATIVE_ASPECT = NATIVE_WIDTH / NATIVE_HEIGHT; // ~1.77577

const ALL_11_DISHES: EditableDish[] = [
  {
    id: 'talo-amasadora',
    name: 'Talo Amasadora',
    description: 'Talo artesanal individual de maíz amasado a mano',
    category: 'amasadora',
    categoryLabel: 'Mesa Amasadora',
    source: 'unnamed (8)',
    imageSrc: './assets/images/sukaldaritza/unnamed8_recorte_limpio.png',
    shadowSrc: './assets/images/sukaldaritza/unnamed8_sombra.png',
    aspect: 339 / 292, // ~1.161
    x: 476,
    y: 712,
    width: 163,
    height: 140,
    zIndex: 10,
    active: true,
    initialX: 476,
    initialY: 712,
    initialWidth: 163,
    initialHeight: 140,
    initialZIndex: 10,
    initialActive: true,
    color: '#38bdf8', // Sky blue
    hint: 'Mesa de la amasadora (izquierda, entre harina)',
  },
  {
    id: 'talos-barra',
    name: 'Bandeja Tres Talos',
    description: 'Bandeja degustación de 3 talos abiertos con panceta y emulsión',
    category: 'barra-centro',
    categoryLabel: 'Barra Centro',
    source: 'unnamed (3)',
    imageSrc: './assets/images/sukaldaritza/unnamed3_recorte_limpio.png',
    shadowSrc: './assets/images/sukaldaritza/unnamed3_sombra.png',
    aspect: 680 / 261, // ~2.605
    x: 1517,
    y: 593,
    width: 345,
    height: 132,
    zIndex: 15,
    active: true,
    initialX: 1517,
    initialY: 593,
    initialWidth: 345,
    initialHeight: 132,
    initialZIndex: 15,
    initialActive: true,
    color: '#d49b42', // Amber gold
    hint: 'Barra derecha, sobre la gran tabla de madera',
  },
  {
    id: 'croquetas-barra',
    name: 'Trío de Croquetas',
    description: 'Croquetas crujientes de autor con crema de calabaza asada',
    category: 'barra-dcha',
    categoryLabel: 'Barra Derecha',
    source: 'caption.jpg',
    imageSrc: './assets/images/sukaldaritza/caption_recorte_limpio.png',
    shadowSrc: './assets/images/sukaldaritza/caption_sombra.png',
    aspect: 700 / 288, // ~2.431
    x: 584,
    y: 580,
    width: 300,
    height: 123,
    zIndex: 20,
    active: true,
    initialX: 584,
    initialY: 580,
    initialWidth: 300,
    initialHeight: 123,
    initialZIndex: 20,
    initialActive: true,
    color: '#f97316', // Orange
    hint: 'Barra izquierda, en plano adelantado',
  },
  {
    id: 'kruntxitalo',
    name: 'Kruntxitaloa Piparrekin',
    description: 'Talo crujiente con piparras de Ibarra y emulsión suave',
    category: 'barra-izq',
    categoryLabel: 'Barra Izquierda',
    source: 'images (2).png',
    imageSrc: './assets/images/recortes_transparentes/images (2).png',
    aspect: 490 / 394, // ~1.244
    x: 376,
    y: 583,
    width: 133,
    height: 107,
    zIndex: 12,
    active: true,
    initialX: 376,
    initialY: 583,
    initialWidth: 133,
    initialHeight: 107,
    initialZIndex: 12,
    initialActive: true,
    color: '#4ade80', // Emerald green
    hint: 'Conexión mesa amasadora y barra izquierda',
  },
  {
    id: 'gilda-donostiarra',
    name: 'Gildas de Autor',
    description: 'Gildas artesanas con anchoa del Cantábrico y aceituna gordal',
    category: 'barra-dcha',
    categoryLabel: 'Barra Derecha',
    source: '479157181...n.jpg',
    imageSrc: './assets/images/recortes_transparentes/479157181_1132919598844251_6811334955080910585_n.png',
    aspect: 688 / 908, // ~0.758
    x: 1479,
    y: 665,
    width: 145,
    height: 191,
    zIndex: 22,
    active: true,
    initialX: 1479,
    initialY: 665,
    initialWidth: 145,
    initialHeight: 191,
    initialZIndex: 22,
    initialActive: true,
    color: '#a855f7', // Purple
    hint: 'Extremo derecho de la barra',
  },
  {
    id: 'pintxo-klasikoa',
    name: 'Pintxo Clásico Tosta',
    description: 'Tosta artesana de pan rústico con confitado tradicional',
    category: 'barra-centro',
    categoryLabel: 'Barra Centro',
    source: 'unnamed (1)',
    imageSrc: './assets/images/recortes_transparentes/unnamed (1).png',
    aspect: 366 / 466, // ~0.785
    x: 760,
    y: 759,
    width: 130,
    height: 165,
    zIndex: 18,
    active: false,
    initialX: 760,
    initialY: 759,
    initialWidth: 130,
    initialHeight: 165,
    initialZIndex: 18,
    initialActive: false,
    color: '#ec4899', // Pink
    hint: 'Candidato de reserva (actualmente inactivo)',
  },
  {
    id: 'copa-gastronomika',
    name: 'Bocado en Vaso',
    description: 'Aperitivo frío de autor servido en formato vertical',
    category: 'barra-dcha',
    categoryLabel: 'Barra Derecha',
    source: 'unnamed (15)',
    imageSrc: './assets/images/recortes_transparentes/unnamed (15).png',
    aspect: 311 / 493, // ~0.631
    x: 1277,
    y: 643,
    width: 156,
    height: 247,
    zIndex: 14,
    active: true,
    initialX: 1277,
    initialY: 643,
    initialWidth: 156,
    initialHeight: 247,
    initialZIndex: 14,
    initialActive: true,
    color: '#06b6d4', // Cyan
    hint: 'Barra derecha, formato vertical',
  },
  {
    id: 'cazuelita-beroa',
    name: 'Cazuelita Tradicional',
    description: 'Guiso marinero caliente en cazuela de barro cocido',
    category: 'barra-izq',
    categoryLabel: 'Barra Izquierda',
    source: 'unnamed (21)',
    imageSrc: './assets/images/recortes_transparentes/unnamed (21).png',
    aspect: 230 / 273, // ~0.842
    x: 904,
    y: 589,
    width: 100,
    height: 119,
    zIndex: 16,
    active: true,
    initialX: 904,
    initialY: 589,
    initialWidth: 100,
    initialHeight: 119,
    initialZIndex: 16,
    initialActive: true,
    color: '#eab308', // Yellow
    hint: 'Centro de la barra',
  },
  {
    id: 'broxeta-egurra',
    name: 'Brocheta de Autor',
    description: 'Brocheta ensartada con ingredientes selectos de caserío',
    category: 'barra-centro',
    categoryLabel: 'Barra Centro',
    source: 'unnamed (22)',
    imageSrc: './assets/images/recortes_transparentes/unnamed (22).png',
    aspect: 263 / 495, // ~0.531
    x: 1013,
    y: 666,
    width: 147,
    height: 277,
    zIndex: 17,
    active: true,
    initialX: 1013,
    initialY: 666,
    initialWidth: 147,
    initialHeight: 277,
    initialZIndex: 17,
    initialActive: true,
    color: '#14b8a6', // Teal
    hint: 'Barra centro-derecha',
  },
  {
    id: 'tosta-antxoa',
    name: 'Tosta de Anchoa',
    description: 'Anchoa en salazón del Cantábrico sobre tomate maduro rallado',
    category: 'barra-dcha',
    categoryLabel: 'Barra Derecha',
    source: 'unnamed (23)',
    imageSrc: './assets/images/recortes_transparentes/unnamed (23).png',
    aspect: 282 / 502, // ~0.562
    x: 797,
    y: 612,
    width: 109,
    height: 194,
    zIndex: 19,
    active: true,
    initialX: 797,
    initialY: 612,
    initialWidth: 109,
    initialHeight: 194,
    initialZIndex: 19,
    initialActive: true,
    color: '#f43f5e', // Rose
    hint: 'Barra centro',
  },
  {
    id: 'talo-idiazabal',
    name: 'Talo Idiazabal & Txangurro',
    description: 'Crujiente de maíz con crema de Idiazabal ahumado y txangurro',
    category: 'amasadora',
    categoryLabel: 'Mesa Amasadora',
    source: 'unnamed (24)',
    imageSrc: './assets/images/recortes_transparentes/unnamed (24).png',
    aspect: 289 / 489, // ~0.591
    x: 1152,
    y: 658,
    width: 147,
    height: 249,
    zIndex: 9,
    active: true,
    initialX: 1152,
    initialY: 658,
    initialWidth: 147,
    initialHeight: 249,
    initialZIndex: 9,
    initialActive: true,
    color: '#8b5cf6', // Violet
    hint: 'Barra derecha',
  },
];

const BUILT_IN_PRESETS: SavedComposition[] = [
  {
    id: 'preset-aprobada-10',
    name: '★ Composición Aprobada (10 Platos)',
    isBuiltIn: true,
    timestamp: 'Oficial Definitiva',
    blockHeight: 1040,
    dishes: [
      { id: 'kruntxitalo', active: true, x: 376, y: 583, width: 133, height: 107, zIndex: 12 },
      { id: 'talo-amasadora', active: true, x: 476, y: 712, width: 163, height: 140, zIndex: 10 },
      { id: 'croquetas-barra', active: true, x: 584, y: 580, width: 300, height: 123, zIndex: 20 },
      { id: 'tosta-antxoa', active: true, x: 797, y: 612, width: 109, height: 194, zIndex: 19 },
      { id: 'cazuelita-beroa', active: true, x: 904, y: 589, width: 100, height: 119, zIndex: 16 },
      { id: 'broxeta-egurra', active: true, x: 1013, y: 666, width: 147, height: 277, zIndex: 17 },
      { id: 'talo-idiazabal', active: true, x: 1152, y: 658, width: 147, height: 249, zIndex: 9 },
      { id: 'copa-gastronomika', active: true, x: 1277, y: 643, width: 156, height: 247, zIndex: 14 },
      { id: 'gilda-donostiarra', active: true, x: 1479, y: 665, width: 145, height: 191, zIndex: 22 },
      { id: 'talos-barra', active: true, x: 1517, y: 593, width: 345, height: 132, zIndex: 15 },
      { id: 'pintxo-klasikoa', active: false, x: 760, y: 759, width: 130, height: 165, zIndex: 18 },
    ],
  },
  {
    id: 'preset-trio',
    name: '2. Trío Canónico (3 Platos)',
    isBuiltIn: true,
    timestamp: 'Original',
    blockHeight: 1040,
    dishes: ALL_11_DISHES.map((d) => ({
      id: d.id,
      active: d.id === 'talo-amasadora' || d.id === 'talos-barra' || d.id === 'croquetas-barra',
      x: d.initialX,
      y: d.initialY,
      width: d.initialWidth,
      height: d.initialHeight,
      zIndex: d.initialZIndex,
    })),
  },
  {
    id: 'preset-cinco',
    name: '3. Selección Clásica (5 Platos)',
    isBuiltIn: true,
    timestamp: 'Recomendado',
    blockHeight: 1040,
    dishes: ALL_11_DISHES.map((d) => ({
      id: d.id,
      active: ['talo-amasadora', 'kruntxitalo', 'talos-barra', 'croquetas-barra', 'gilda-donostiarra'].includes(d.id),
      x: d.initialX,
      y: d.initialY,
      width: d.initialWidth,
      height: d.initialHeight,
      zIndex: d.initialZIndex,
    })),
  },
  {
    id: 'preset-siete',
    name: '4. Barra Completa (7 Platos)',
    isBuiltIn: true,
    timestamp: 'Degustación',
    blockHeight: 1040,
    dishes: ALL_11_DISHES.map((d) => ({
      id: d.id,
      active: ['talo-amasadora', 'cazuelita-beroa', 'kruntxitalo', 'talos-barra', 'broxeta-egurra', 'croquetas-barra', 'gilda-donostiarra'].includes(d.id),
      x: d.initialX,
      y: d.initialY,
      width: d.initialWidth,
      height: d.initialHeight,
      zIndex: d.initialZIndex,
    })),
  },
  {
    id: 'preset-once',
    name: '5. Catálogo Íntegro (11 Platos)',
    isBuiltIn: true,
    timestamp: 'Inventario Total',
    blockHeight: 1040,
    dishes: ALL_11_DISHES.map((d) => ({
      id: d.id,
      active: true,
      x: d.initialX,
      y: d.initialY,
      width: d.initialWidth,
      height: d.initialHeight,
      zIndex: d.initialZIndex,
    })),
  },
];

const HEIGHT_PRESETS = [
  { label: '740px (Móvil)', value: 740 },
  { label: '840px (Tablet)', value: 840 },
  { label: '940px (Compacto)', value: 940 },
  { label: '1040px (Estándar)', value: 1040 },
  { label: '1100px (Inmersivo)', value: 1100 },
  { label: '1200px (Gran Altura)', value: 1200 },
];

const WIDTH_PRESETS = [
  { label: '100% Libre', value: '100%', icon: Monitor },
  { label: '1440px Desktop', value: '1440px', icon: Monitor },
  { label: '1200px Laptop', value: '1200px', icon: Laptop },
  { label: '1024px Tablet', value: '1024px', icon: Tablet },
  { label: '390px Móvil', value: '390px', icon: Smartphone },
];

export const SukaldaritzaPreview: React.FC = () => {
  // Navigation tabs: editor, catalog, presets, production, reference
  const [activeTab, setActiveTab] = useState<'editor' | 'catalog' | 'presets' | 'production' | 'reference'>('editor');

  // Height & Width controls
  const [blockHeight, setBlockHeight] = useState<number>(1040);
  const [viewportWidth, setViewportWidth] = useState<string>('100%');

  // All 11 Dishes State
  const [dishes, setDishes] = useState<EditableDish[]>(ALL_11_DISHES);
  const [selectedDishId, setSelectedDishId] = useState<string>('talos-barra');

  // Saved Compositions State (LocalStorage)
  const [savedCompositions, setSavedCompositions] = useState<SavedComposition[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('zutarri_saved_compositions_v1');
        if (stored) return JSON.parse(stored);
      } catch (err) {
        console.error('Error loading saved compositions:', err);
      }
    }
    return [];
  });
  const [newCompositionName, setNewCompositionName] = useState<string>('');

  // Visual helper toggles
  const [showShadows, setShowShadows] = useState<boolean>(true);
  const [showGuides, setShowGuides] = useState<boolean>(true);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState<boolean>(true);
  const [showCodeDrawer, setShowCodeDrawer] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Dragging state tracking
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragRef = useRef<{
    dishId: string;
    startScreenX: number;
    startScreenY: number;
    startNativeX: number;
    startNativeY: number;
    renderW: number;
    renderH: number;
  } | null>(null);

  // Resize state tracking
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const resizeRef = useRef<{
    dishId: string;
    startScreenX: number;
    startNativeW: number;
    renderW: number;
    aspect: number;
  } | null>(null);

  // Canvas element ref for client measurement
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 1440, height: 1040 });

  // Update canvas size on container resize
  useEffect(() => {
    if (!canvasRef.current) return;
    const update = () => {
      if (canvasRef.current) {
        setCanvasSize({
          width: canvasRef.current.clientWidth,
          height: canvasRef.current.clientHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, [blockHeight, viewportWidth, activeTab]);

  // Save compositions to localStorage
  const persistSavedCompositions = (updated: SavedComposition[]) => {
    setSavedCompositions(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('zutarri_saved_compositions_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving compositions:', e);
      }
    }
  };

  // Exact mathematical projection matching SukaldaritzaSection.tsx
  const geometry = useMemo(() => {
    const cw = canvasSize.width;
    const ch = canvasSize.height;
    const cAspect = cw / ch;

    let renderW: number;
    let renderH: number;
    let renderX: number;
    let renderY: number;

    if (cAspect >= NATIVE_ASPECT) {
      renderW = cw;
      renderH = cw / NATIVE_ASPECT;
      renderX = 0;
      renderY = ch - renderH; // Anchored to bottom wood counter
    } else {
      renderH = ch;
      renderW = ch * NATIVE_ASPECT;
      renderY = 0;
      const overflowX = renderW - cw;
      renderX = -overflowX * 0.28; // Left-bias for woman at amasadora
    }

    return { renderW, renderH, renderX, renderY, cw, ch };
  }, [canvasSize]);

  // Active dishes on the canvas
  const activeDishes = useMemo(() => dishes.filter((d) => d.active), [dishes]);

  // Selected dish helper
  const selectedDish = useMemo(
    () => dishes.find((d) => d.id === selectedDishId) || activeDishes[0] || dishes[0],
    [dishes, selectedDishId, activeDishes]
  );

  // Convert native coordinates to screen pixels
  const getScreenCoords = useCallback(
    (dish: EditableDish) => {
      const normX = dish.x / NATIVE_WIDTH;
      const normY = dish.y / NATIVE_HEIGHT;
      const normW = dish.width / NATIVE_WIDTH;
      const normH = dish.height / NATIVE_HEIGHT;

      return {
        screenX: geometry.renderX + normX * geometry.renderW,
        screenY: geometry.renderY + normY * geometry.renderH,
        screenWidth: normW * geometry.renderW,
        screenHeight: normH * geometry.renderH,
      };
    },
    [geometry]
  );

  // Toggle dish active/inactive (Preserves coordinates and sizes!)
  const toggleDishActive = (id: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    );
    setSelectedDishId(id);
  };

  // Drag start handler
  const handlePointerDown = (e: React.PointerEvent, dish: EditableDish) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    setSelectedDishId(dish.id);
    setIsDragging(true);

    dragRef.current = {
      dishId: dish.id,
      startScreenX: e.clientX,
      startScreenY: e.clientY,
      startNativeX: dish.x,
      startNativeY: dish.y,
      renderW: geometry.renderW,
      renderH: geometry.renderH,
    };
  };

  // Drag move handler
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && dragRef.current) {
      const { dishId, startScreenX, startScreenY, startNativeX, startNativeY, renderW, renderH } =
        dragRef.current;

      const deltaScreenX = e.clientX - startScreenX;
      const deltaScreenY = e.clientY - startScreenY;

      const deltaNativeX = (deltaScreenX / renderW) * NATIVE_WIDTH;
      const deltaNativeY = (deltaScreenY / renderH) * NATIVE_HEIGHT;

      const newNativeX = Math.round(Math.max(20, Math.min(NATIVE_WIDTH - 20, startNativeX + deltaNativeX)));
      const newNativeY = Math.round(Math.max(20, Math.min(NATIVE_HEIGHT - 20, startNativeY + deltaNativeY)));

      setDishes((prev) =>
        prev.map((d) => (d.id === dishId ? { ...d, x: newNativeX, y: newNativeY } : d))
      );
    } else if (isResizing && resizeRef.current) {
      const { dishId, startScreenX, startNativeW, renderW, aspect } = resizeRef.current;
      const deltaScreenX = e.clientX - startScreenX;
      const deltaNativeW = (deltaScreenX / renderW) * NATIVE_WIDTH;

      const newWidth = Math.round(Math.max(30, Math.min(650, startNativeW + deltaNativeW)));
      const newHeight = Math.round(newWidth / aspect);

      setDishes((prev) =>
        prev.map((d) => (d.id === dishId ? { ...d, width: newWidth, height: newHeight } : d))
      );
    }
  };

  // Drag / Resize end handler
  const handlePointerUp = () => {
    if (isDragging || isResizing) {
      setIsDragging(false);
      setIsResizing(false);
      dragRef.current = null;
      resizeRef.current = null;
    }
  };

  // Resize handle down
  const handleResizePointerDown = (e: React.PointerEvent, dish: EditableDish) => {
    e.stopPropagation();
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    setSelectedDishId(dish.id);
    setIsResizing(true);

    resizeRef.current = {
      dishId: dish.id,
      startScreenX: e.clientX,
      startNativeW: dish.width,
      renderW: geometry.renderW,
      aspect: dish.aspect,
    };
  };

  // Keyboard navigation fine-tuning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedDishId) return;

      const step = e.shiftKey ? 10 : 1;
      let dx = 0;
      let dy = 0;
      let dw = 0;
      let dz = 0;

      if (e.key === 'ArrowLeft') dx = -step;
      else if (e.key === 'ArrowRight') dx = step;
      else if (e.key === 'ArrowUp' && !e.altKey) dy = -step;
      else if (e.key === 'ArrowDown' && !e.altKey) dy = step;
      else if (e.key === '+' || e.key === '=') dw = step * 2;
      else if (e.key === '-' || e.key === '_') dw = -step * 2;
      else if (e.altKey && e.key === 'ArrowUp') dz = 1;
      else if (e.altKey && e.key === 'ArrowDown') dz = -1;
      else if (e.key === 'Escape') {
        setSelectedDishId('');
        return;
      } else {
        return;
      }

      e.preventDefault();

      setDishes((prev) =>
        prev.map((d) => {
          if (d.id !== selectedDishId) return d;
          const newX = Math.round(Math.max(10, Math.min(NATIVE_WIDTH - 10, d.x + dx)));
          const newY = Math.round(Math.max(10, Math.min(NATIVE_HEIGHT - 10, d.y + dy)));
          const newW = Math.round(Math.max(30, Math.min(650, d.width + dw)));
          const newH = Math.round(newW / d.aspect);
          const newZ = Math.max(1, Math.min(50, d.zIndex + dz));
          return { ...d, x: newX, y: newY, width: newW, height: newH, zIndex: newZ };
        })
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDishId]);

  // Update specific dish parameter
  const updateDishParam = (id: string, param: 'x' | 'y' | 'width' | 'zIndex', val: number) => {
    setDishes((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        if (param === 'width') {
          const w = Math.round(Math.max(30, Math.min(650, val)));
          return { ...d, width: w, height: Math.round(w / d.aspect) };
        }
        if (param === 'zIndex') {
          return { ...d, zIndex: Math.max(1, Math.min(50, Math.round(val))) };
        }
        return { ...d, [param]: Math.round(val) };
      })
    );
  };

  // Adjust z-index shortcuts
  const bringToFront = (id: string) => {
    const maxZ = Math.max(...dishes.map((d) => d.zIndex), 1);
    updateDishParam(id, 'zIndex', maxZ + 1);
  };

  const sendToBack = (id: string) => {
    const minZ = Math.min(...dishes.map((d) => d.zIndex), 1);
    updateDishParam(id, 'zIndex', Math.max(1, minZ - 1));
  };

  // Reset dish
  const resetDish = (id: string) => {
    setDishes((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              x: d.initialX,
              y: d.initialY,
              width: d.initialWidth,
              height: d.initialHeight,
              zIndex: d.initialZIndex,
              active: d.initialActive,
            }
          : d
      )
    );
  };

  // Reset all
  const resetAllDishes = () => {
    setDishes(ALL_11_DISHES);
    setBlockHeight(1040);
  };

  // Load a preset composition
  const loadComposition = (comp: SavedComposition) => {
    setBlockHeight(comp.blockHeight || 1040);
    setDishes((prev) =>
      prev.map((d) => {
        const found = comp.dishes.find((item) => item.id === d.id);
        if (!found) return { ...d, active: false };
        return {
          ...d,
          active: found.active,
          x: found.x,
          y: found.y,
          width: found.width,
          height: found.height,
          zIndex: found.zIndex,
        };
      })
    );
    setCopiedNotification(`Composición "${comp.name}" cargada`);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  // Save custom composition
  const handleSaveCustomComposition = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCompositionName.trim() || `Composición ${savedCompositions.length + 1} (${activeDishes.length} platos)`;
    const newComp: SavedComposition = {
      id: `custom-${Date.now()}`,
      name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      blockHeight,
      dishes: dishes.map((d) => ({
        id: d.id,
        active: d.active,
        x: d.x,
        y: d.y,
        width: d.width,
        height: d.height,
        zIndex: d.zIndex,
      })),
    };

    persistSavedCompositions([newComp, ...savedCompositions]);
    setNewCompositionName('');
    setCopiedNotification(`Composición "${name}" guardada con éxito`);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  // Delete custom composition
  const handleDeleteCustomComposition = (id: string) => {
    persistSavedCompositions(savedCompositions.filter((c) => c.id !== id));
  };

  // Generated TypeScript code for active dishes
  const generatedCode = useMemo(() => {
    const dishSnippets = activeDishes
      .map(
        (d) => `    {
      id: '${d.id}',
      name: '${d.name}',
      source: '${d.source}',
      zIndex: ${d.zIndex},
      nativeCoords: {
        x: ${d.x},
        y: ${d.y},
        width: ${d.width},
        height: ${d.height},
      },
    },`
      )
      .join('\n');

    return `// =========================================================================
// COORDENADAS SUKALDARITZA (Calibradas visualmente en /preview-sukaldaritza)
// Total de platos activos seleccionados: ${activeDishes.length} de ${dishes.length}
// Resolución base de referencia: 1671 x 941 px
// Altura calibrada de la sección: ${blockHeight}px
// =========================================================================

export const CALIBRATED_SUKALDARITZA_COORDS = [
${dishSnippets}
];`;
  }, [activeDishes, dishes.length, blockHeight]);

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopiedNotification('¡Coordenadas copiadas al portapapeles!');
      setTimeout(() => setCopiedNotification(null), 3000);
    } catch {
      setCopiedNotification('Error al copiar. Selecciona el texto manualmente.');
      setTimeout(() => setCopiedNotification(null), 3000);
    }
  };

  // Map to overrides for production preview
  const overridesForSection: DishCoordsOverride[] = useMemo(
    () =>
      activeDishes.map((d) => ({
        id: d.id,
        nativeCoords: {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
        },
      })),
    [activeDishes]
  );

  return (
    <div className="min-h-screen bg-[#07080a] text-[#f3f4f6] font-sans flex flex-col selection:bg-[#d49b42] selection:text-[#07080a]">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & WORKSPACE NAVIGATION                                      */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#0c0e12]/95 backdrop-blur-md border-b border-[#22262e] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9ca3af] hover:text-[#d49b42] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Volver a Zutarri</span>
          </a>
          <span className="text-[#33363e]">|</span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d49b42] animate-pulse" />
            <h1 className="font-mono text-xs uppercase tracking-widest text-[#d49b42] font-bold">
              SUKALDARITZA · BANCO DE COMPOSICIÓN (11 PRODUCTOS)
            </h1>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#14181f] p-1 rounded-md border border-[#2a2f3a] overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-[#d49b42] text-[#07080a] font-bold shadow-md'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            <span>1. Lienzo Interactivo ({activeDishes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'catalog'
                ? 'bg-[#d49b42] text-[#07080a] font-bold shadow-md'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>2. Catálogo (11)</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'presets'
                ? 'bg-[#d49b42] text-[#07080a] font-bold shadow-md'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>3. Composiciones ({BUILT_IN_PRESETS.length + savedCompositions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('production')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'production'
                ? 'bg-[#d49b42] text-[#07080a] font-bold shadow-md'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>4. Sección Real</span>
          </button>

          <button
            onClick={() => setActiveTab('reference')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'reference'
                ? 'bg-[#d49b42] text-[#07080a] font-bold shadow-md'
                : 'text-[#9ca3af] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5. Referencia</span>
          </button>
        </div>

        {/* Primary CTA: Copiar Coordenadas */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#d49b42] hover:bg-[#e5ac55] text-[#08090c] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all shadow-lg cursor-pointer hover:shadow-[#d49b42]/20 hover:scale-[1.02]"
            title={`Copiar coordenadas de los ${activeDishes.length} platos activos`}
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copiar Coordenadas ({activeDishes.length})</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SECONDARY CONTROLS BAR (Height, Viewport, Quick Presets & Overlays)     */}
      {/* ========================================================================= */}
      {activeTab === 'editor' && (
        <div className="bg-[#101217] border-b border-[#22262e] px-4 py-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          {/* Section Height Slider & Presets */}
          <div className="flex items-center gap-3">
            <span className="text-[#9ca3af] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#d49b42]" />
              <span>Altura:</span>
            </span>

            <input
              type="range"
              min={650}
              max={1300}
              step={10}
              value={blockHeight}
              onChange={(e) => setBlockHeight(Number(e.target.value))}
              className="w-28 accent-[#d49b42] cursor-pointer"
            />

            <span className="font-bold text-[#d49b42] w-14">{blockHeight}px</span>

            <div className="hidden xl:flex items-center gap-1">
              {HEIGHT_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setBlockHeight(preset.value)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                    blockHeight === preset.value
                      ? 'bg-[#d49b42]/20 border border-[#d49b42] text-[#d49b42] font-bold'
                      : 'bg-[#181c24] text-[#9ca3af] hover:text-white border border-transparent'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets Selector Pills */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#9ca3af] uppercase tracking-wider hidden md:inline text-[11px]">
              Composiciones Rápidas:
            </span>
            {BUILT_IN_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => loadComposition(p)}
                className="px-2.5 py-1 bg-[#181c24] hover:bg-[#232936] text-[#e5e7eb] rounded text-[11px] font-mono border border-[#2a2f3a] hover:border-[#d49b42]/60 transition-colors cursor-pointer"
              >
                {p.name.split('.')[1]}
              </button>
            ))}
          </div>

          {/* Viewport Width Simulator */}
          <div className="flex items-center gap-2">
            <span className="text-[#9ca3af] uppercase tracking-wider hidden lg:inline">Ancho:</span>
            <div className="flex items-center gap-1 bg-[#181c24] p-0.5 rounded border border-[#2a2f3a]">
              {WIDTH_PRESETS.map((w) => {
                const Icon = w.icon;
                return (
                  <button
                    key={w.value}
                    onClick={() => setViewportWidth(w.value)}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      viewportWidth === w.value
                        ? 'bg-[#d49b42] text-[#08090c] font-bold'
                        : 'text-[#9ca3af] hover:text-white'
                    }`}
                    title={w.label}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden 2xl:inline">{w.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overlay Toggles */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-[#d1d5db] hover:text-white">
              <input
                type="checkbox"
                checked={showShadows}
                onChange={(e) => setShowShadows(e.target.checked)}
                className="accent-[#d49b42] rounded cursor-pointer"
              />
              <span>Sombras</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#d1d5db] hover:text-white">
              <input
                type="checkbox"
                checked={showGuides}
                onChange={(e) => setShowGuides(e.target.checked)}
                className="accent-[#d49b42] rounded cursor-pointer"
              />
              <span>Guías (Farol/Mesa)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-[#d1d5db] hover:text-white">
              <input
                type="checkbox"
                checked={showBoundingBoxes}
                onChange={(e) => setShowBoundingBoxes(e.target.checked)}
                className="accent-[#d49b42] rounded cursor-pointer"
              />
              <span>Cajas</span>
            </label>

            <button
              onClick={resetAllDishes}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#1c222b] hover:bg-[#28303d] text-[#9ca3af] hover:text-[#f87171] rounded border border-[#2a2f3a] transition-colors cursor-pointer"
              title="Restaurar coordenadas y estados iniciales"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE AREA                                                    */}
      {/* ========================================================================= */}
      <main className="flex-1 p-2 sm:p-4 flex flex-col items-center justify-start overflow-auto">
        {/* Floating Notification Toast */}
        {copiedNotification && (
          <div className="fixed top-16 right-6 z-50 bg-[#15803d] text-white px-4 py-2.5 rounded-lg shadow-2xl border border-green-400/30 flex items-center gap-2 font-mono text-xs animate-in fade-in slide-in-from-top-4 duration-200">
            <Check className="w-4 h-4" />
            <span>{copiedNotification}</span>
          </div>
        )}

        {/* TAB 1: INTERACTIVE EDITOR CANVAS */}
        {activeTab === 'editor' && (
          <div className="w-full flex flex-col items-center gap-4">
            {/* Editor Canvas Container (Constrained by Viewport Simulator) */}
            <div
              style={{
                width: viewportWidth,
                maxWidth: '100%',
              }}
              className="transition-all duration-300"
            >
              <div
                ref={canvasRef}
                style={{
                  height: `${blockHeight}px`,
                }}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="relative w-full overflow-hidden bg-[#08090c] border border-[#22262e] rounded-lg shadow-2xl select-none"
              >
                {/* 1. Historical Background Image (Mathematically Anchored to Bottom) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src="./assets/images/Cocina histórica con barra de madera vacía.png"
                    alt="Cocina Histórica Zutarri"
                    style={{
                      width: `${geometry.renderW}px`,
                      height: `${geometry.renderH}px`,
                      transform: `translate3d(${geometry.renderX}px, ${geometry.renderY}px, 0)`,
                    }}
                    className="absolute top-0 left-0 max-w-none select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Vignettes matching production section */}
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#08090c]/90 via-[#08090c]/40 to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#08090c]/80 via-[#08090c]/30 to-transparent pointer-events-none z-10" />
                </div>

                {/* 2. Visual Alignment Guides (Optional) */}
                {showGuides && (
                  <div className="absolute inset-0 pointer-events-none z-15">
                    {/* Lantern Center Plumb Line (X=835 in Native Space) */}
                    <div
                      style={{
                        left: `${geometry.renderX + (835 / NATIVE_WIDTH) * geometry.renderW}px`,
                      }}
                      className="absolute top-0 bottom-0 w-[1px] bg-[#d49b42]/40 border-r border-dashed border-[#d49b42]/60"
                    >
                      <div className="absolute top-14 -left-16 bg-[#08090c]/90 text-[#d49b42] text-[10px] font-mono px-2 py-0.5 rounded border border-[#d49b42]/40 whitespace-nowrap">
                        Farol Histórico (X=835)
                      </div>
                    </div>

                    {/* Counter Baseline (Approx Y=740 in Native Space) */}
                    <div
                      style={{
                        top: `${geometry.renderY + (740 / NATIVE_HEIGHT) * geometry.renderH}px`,
                      }}
                      className="absolute left-0 right-0 h-[1px] bg-[#38bdf8]/30 border-b border-dashed border-[#38bdf8]/50"
                    >
                      <div className="absolute right-4 -top-5 bg-[#08090c]/90 text-[#38bdf8] text-[10px] font-mono px-2 py-0.5 rounded border border-[#38bdf8]/40">
                        Nivel de Barra (Y=740)
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. The Active Draggable Dishes */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  {activeDishes.map((dish) => {
                    const screen = getScreenCoords(dish);
                    const isSelected = selectedDishId === dish.id;

                    return (
                      <div
                        key={dish.id}
                        style={{
                          left: `${screen.screenX}px`,
                          top: `${screen.screenY}px`,
                          width: `${screen.screenWidth}px`,
                          height: `${screen.screenHeight}px`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: dish.zIndex,
                        }}
                        onPointerDown={(e) => handlePointerDown(e, dish)}
                        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing group transition-transform"
                      >
                        {/* Physical Ambient Contact Shadow */}
                        {showShadows && (
                          dish.shadowSrc ? (
                            <img
                              src={dish.shadowSrc}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-90"
                              draggable={false}
                            />
                          ) : (
                            <div className="absolute -bottom-2 inset-x-2 h-4 bg-black/75 rounded-full blur-[6px] pointer-events-none" />
                          )
                        )}

                        {/* Dish Cutout Image */}
                        <img
                          src={dish.imageSrc}
                          alt={dish.name}
                          className="relative w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
                          draggable={false}
                        />

                        {/* Interactive Bounding Box & Drag Indicator */}
                        {showBoundingBoxes && (
                          <div
                            style={{
                              borderColor: isSelected ? dish.color : 'rgba(255,255,255,0.2)',
                            }}
                            className={`absolute inset-0 rounded border transition-all ${
                              isSelected
                                ? 'border-2 shadow-[0_0_15px_rgba(212,155,66,0.4)]'
                                : 'border-dashed hover:border-white/60'
                            }`}
                          >
                            {/* Dish Label Badge */}
                            <div
                              style={{
                                backgroundColor: isSelected ? dish.color : '#0f1115',
                                color: isSelected ? '#08090c' : '#f3f4f6',
                              }}
                              className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-lg flex items-center gap-1.5"
                            >
                              <Move className="w-2.5 h-2.5" />
                              <span>{dish.name}</span>
                              <span className="opacity-80">
                                ({dish.x}, {dish.y})
                              </span>
                              <span className="px-1 py-0.2 bg-black/40 rounded text-[9px]">
                                Z:{dish.zIndex}
                              </span>
                            </div>

                            {/* Resize Handle (Bottom Right Corner) */}
                            {isSelected && (
                              <div
                                onPointerDown={(e) => handleResizePointerDown(e, dish)}
                                className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#d49b42] rounded-full border-2 border-white shadow-lg cursor-nwse-resize flex items-center justify-center pointer-events-auto hover:scale-125 transition-transform"
                                title="Arrastrar para ajustar escala (ancho)"
                              >
                                <div className="w-1.5 h-1.5 bg-[#08090c] rounded-full" />
                              </div>
                            )}

                            {/* Center Alignment Crosshair */}
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                                <div className="w-3 h-[1px] bg-white" />
                                <div className="h-3 w-[1px] bg-white" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* 4. Canvas Floating Status Badges */}
                <div className="absolute top-4 left-4 z-20 pointer-events-none bg-[#08090c]/85 backdrop-blur px-3 py-1.5 rounded border border-[#2a2f3a] text-xs font-mono flex items-center gap-3">
                  <div>
                    <span className="text-[#d49b42] font-bold">Lienzo 1671 × 941</span>
                    <span className="text-[#9ca3af] ml-2">
                      Render: {canvasSize.width} × {canvasSize.height} px
                    </span>
                  </div>
                  <span className="text-[#33363e]">|</span>
                  <div className="text-[#4ade80] font-semibold">
                    {activeDishes.length} platos en escena
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 4. DISH FINE-TUNING INSPECTOR DRAWER                                      */}
            {/* ========================================================================= */}
            <div className="w-full max-w-7xl bg-[#0f1115] border border-[#22262e] rounded-lg p-4 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1f242d] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#d49b42] font-bold">
                    Plato Seleccionado:
                  </span>
                  <div className="flex items-center gap-1.5 overflow-x-auto max-w-2xl py-1">
                    {dishes.map((dish) => (
                      <button
                        key={dish.id}
                        onClick={() => setSelectedDishId(dish.id)}
                        style={{
                          borderColor: selectedDishId === dish.id ? dish.color : 'transparent',
                          color: selectedDishId === dish.id ? '#f3f4f6' : '#9ca3af',
                          opacity: dish.active ? 1 : 0.45,
                        }}
                        className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                          selectedDishId === dish.id
                            ? 'bg-[#1a202c] font-bold shadow'
                            : 'bg-[#141820] hover:text-white'
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: dish.active ? dish.color : '#6b7280' }}
                        />
                        <span>{dish.name}</span>
                        {!dish.active && <span className="text-[10px] text-[#6b7280]">(Oculto)</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleDishActive(selectedDish.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer border ${
                      selectedDish.active
                        ? 'bg-[#15803d]/20 border-green-500/40 text-green-400 hover:bg-[#15803d]/30'
                        : 'bg-[#b91c1c]/20 border-red-500/40 text-red-400 hover:bg-[#b91c1c]/30'
                    }`}
                  >
                    {selectedDish.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{selectedDish.active ? 'Visible en Escena' : 'Oculto (Click para Activar)'}</span>
                  </button>

                  <button
                    onClick={() => setShowCodeDrawer(!showCodeDrawer)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#1a202c] hover:bg-[#252e3e] text-[#d49b42] rounded text-xs font-mono transition-colors cursor-pointer border border-[#2a3444]"
                  >
                    <span>{showCodeDrawer ? 'Ocultar Código TS' : 'Ver Código TS'}</span>
                    {showCodeDrawer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => resetDish(selectedDish.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-[#181c24] hover:bg-[#232936] text-[#9ca3af] hover:text-white rounded text-xs font-mono transition-colors cursor-pointer border border-[#2a2f3a]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restaurar</span>
                  </button>
                </div>
              </div>

              {/* Sliders for Selected Dish */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-mono text-xs">
                {/* Posición X */}
                <div className="bg-[#141820] p-3 rounded border border-[#222732] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#9ca3af]">Posición X:</span>
                    <span className="font-bold text-[#f3f4f6]">{selectedDish.x} px</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={1640}
                    value={selectedDish.x}
                    onChange={(e) => updateDishParam(selectedDish.id, 'x', Number(e.target.value))}
                    className="w-full accent-[#d49b42] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[10px] text-[#6b7280]">
                    <span>0 (Izq)</span>
                    <button
                      onClick={() => updateDishParam(selectedDish.id, 'x', 835)}
                      className="text-[#d49b42] hover:underline cursor-pointer"
                    >
                      Bajo Farol (835)
                    </button>
                    <span>1671 (Der)</span>
                  </div>
                </div>

                {/* Posición Y */}
                <div className="bg-[#141820] p-3 rounded border border-[#222732] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#9ca3af]">Posición Y:</span>
                    <span className="font-bold text-[#f3f4f6]">{selectedDish.y} px</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={900}
                    value={selectedDish.y}
                    onChange={(e) => updateDishParam(selectedDish.id, 'y', Number(e.target.value))}
                    className="w-full accent-[#d49b42] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[10px] text-[#6b7280]">
                    <span>0 (Arriba)</span>
                    <span>740 (Barra)</span>
                    <span>941 (Abajo)</span>
                  </div>
                </div>

                {/* Ancho / Escala */}
                <div className="bg-[#141820] p-3 rounded border border-[#222732] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#9ca3af]">Ancho (Escala):</span>
                    <span className="font-bold text-[#f3f4f6]">{selectedDish.width} px</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={550}
                    value={selectedDish.width}
                    onChange={(e) => updateDishParam(selectedDish.id, 'width', Number(e.target.value))}
                    className="w-full accent-[#d49b42] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[10px] text-[#6b7280]">
                    <span>40px</span>
                    <span>Alto: {selectedDish.height}px</span>
                    <span>550px</span>
                  </div>
                </div>

                {/* Profundidad Z-Index */}
                <div className="bg-[#141820] p-3 rounded border border-[#222732] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#9ca3af]">Capa (Z-Index):</span>
                    <span className="font-bold text-[#38bdf8]">{selectedDish.zIndex}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={selectedDish.zIndex}
                    onChange={(e) => updateDishParam(selectedDish.id, 'zIndex', Number(e.target.value))}
                    className="w-full accent-[#38bdf8] cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[10px]">
                    <button
                      onClick={() => sendToBack(selectedDish.id)}
                      className="text-[#9ca3af] hover:text-white cursor-pointer"
                    >
                      Al Fondo
                    </button>
                    <button
                      onClick={() => bringToFront(selectedDish.id)}
                      className="text-[#38bdf8] hover:underline cursor-pointer"
                    >
                      Al Frente
                    </button>
                  </div>
                </div>

                {/* Nudge Arrow Buttons */}
                <div className="bg-[#141820] p-3 rounded border border-[#222732] flex flex-col justify-between">
                  <span className="text-[#9ca3af] mb-1">Ajuste Fino (1px / Shift 10px):</span>
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => updateDishParam(selectedDish.id, 'x', selectedDish.x - 1)}
                      className="px-2 py-1 bg-[#1e2430] hover:bg-[#2c3547] text-white rounded border border-[#2e3748] cursor-pointer"
                    >
                      ←
                    </button>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => updateDishParam(selectedDish.id, 'y', selectedDish.y - 1)}
                        className="px-2 py-0.5 bg-[#1e2430] hover:bg-[#2c3547] text-white rounded border border-[#2e3748] cursor-pointer"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => updateDishParam(selectedDish.id, 'y', selectedDish.y + 1)}
                        className="px-2 py-0.5 bg-[#1e2430] hover:bg-[#2c3547] text-white rounded border border-[#2e3748] cursor-pointer"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      onClick={() => updateDishParam(selectedDish.id, 'x', selectedDish.x + 1)}
                      className="px-2 py-1 bg-[#1e2430] hover:bg-[#2c3547] text-white rounded border border-[#2e3748] cursor-pointer"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Preview Drawer (Toggleable) */}
              {showCodeDrawer && (
                <div className="pt-3 border-t border-[#1f242d] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#d49b42] font-semibold">
                      Código TypeScript Calibrado ({activeDishes.length} Platos Activos)
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 text-xs text-[#d49b42] hover:text-white transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar al Portapapeles</span>
                    </button>
                  </div>
                  <pre className="bg-[#090b0e] border border-[#1f242d] rounded p-3 text-[11px] font-mono text-[#a5b4fc] overflow-x-auto leading-relaxed max-h-56">
                    {generatedCode}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT CATALOG (All 11 available products with toggle switches) */}
        {activeTab === 'catalog' && (
          <div className="w-full max-w-7xl space-y-6">
            <div className="bg-[#101217] border border-[#22262e] p-4 rounded-lg flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-mono text-sm uppercase tracking-widest text-[#d49b42] font-bold">
                  Catálogo Gastronómico de Zutarri (11 Productos Disponibles)
                </h2>
                <p className="text-xs text-[#9ca3af] mt-1">
                  Activa o desactiva productos individualmente. Las posiciones y escalas se conservan automáticamente.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDishes((prev) => prev.map((d) => ({ ...d, active: true })))}
                  className="px-3 py-1.5 bg-[#1a202c] hover:bg-[#273244] text-[#4ade80] rounded text-xs font-mono border border-green-500/30 transition-colors cursor-pointer"
                >
                  Activar Todos (11)
                </button>
                <button
                  onClick={() => setDishes((prev) => prev.map((d) => ({ ...d, active: false })))}
                  className="px-3 py-1.5 bg-[#1a202c] hover:bg-[#273244] text-[#f87171] rounded text-xs font-mono border border-red-500/30 transition-colors cursor-pointer"
                >
                  Ocultar Todos
                </button>
                <button
                  onClick={() => loadComposition(BUILT_IN_PRESETS[0])}
                  className="px-3 py-1.5 bg-[#d49b42] hover:bg-[#e5ac55] text-[#08090c] rounded text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Trío Canónico (3)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  style={{
                    borderColor: dish.active ? dish.color : '#22262e',
                  }}
                  className={`bg-[#0f1115] border rounded-lg p-4 space-y-3 transition-all ${
                    dish.active ? 'shadow-lg shadow-black/40' : 'opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: dish.color }}
                      className="font-mono text-xs font-bold uppercase tracking-wider"
                    >
                      {dish.categoryLabel}
                    </span>
                    <button
                      onClick={() => toggleDishActive(dish.id)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                        dish.active
                          ? 'bg-[#15803d] text-white'
                          : 'bg-[#22262e] text-[#9ca3af] hover:text-white'
                      }`}
                    >
                      {dish.active ? <Check className="w-3 h-3" /> : null}
                      <span>{dish.active ? 'Activo' : 'Inactivo'}</span>
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative aspect-[4/3] bg-[#07080a] rounded border border-[#1f242d] flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src={dish.imageSrc}
                      alt={dish.name}
                      className="max-h-full max-w-full object-contain select-none drop-shadow-md"
                      draggable={false}
                    />
                    <div className="absolute bottom-1 right-2 font-mono text-[9px] text-[#6b7280]">
                      {dish.source}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-black text-sm text-[#f3f4f6] uppercase tracking-tight">
                      {dish.name}
                    </h3>
                    <p className="text-[11px] text-[#9ca3af] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Coords & Depth Pill */}
                  <div className="pt-2 border-t border-[#1f242d] flex items-center justify-between text-[11px] font-mono text-[#6b7280]">
                    <span>Capa: {dish.zIndex}</span>
                    <span>({dish.x}, {dish.y}) · W:{dish.width}</span>
                  </div>

                  <button
                    onClick={() => {
                      if (!dish.active) toggleDishActive(dish.id);
                      setSelectedDishId(dish.id);
                      setActiveTab('editor');
                    }}
                    className="w-full py-1.5 bg-[#181c24] hover:bg-[#252e3e] text-[#d49b42] rounded text-xs font-mono transition-colors border border-[#2a3444] cursor-pointer"
                  >
                    Ajustar en Lienzo &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAVED COMPOSITIONS MANAGER */}
        {activeTab === 'presets' && (
          <div className="w-full max-w-7xl space-y-6">
            {/* Create Custom Composition Card */}
            <div className="bg-[#101217] border border-[#22262e] p-5 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-mono text-sm uppercase tracking-widest text-[#d49b42] font-bold">
                    Guardar Composición Actual
                  </h2>
                  <p className="text-xs text-[#9ca3af] mt-1">
                    Guarda la distribución actual con sus {activeDishes.length} platos activos, coordenadas exactas y alturas.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#4ade80]">
                  {activeDishes.length} platos activos ahora
                </span>
              </div>

              <form onSubmit={handleSaveCustomComposition} className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Nombre de la composición (ej: Barra de Autor 6 Platos)..."
                  value={newCompositionName}
                  onChange={(e) => setNewCompositionName(e.target.value)}
                  className="flex-1 min-w-[260px] bg-[#141820] border border-[#2a2f3a] rounded px-3 py-2 text-xs font-mono text-white placeholder-[#6b7280] focus:outline-none focus:border-[#d49b42]"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#d49b42] hover:bg-[#e5ac55] text-[#08090c] font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Composición</span>
                </button>
              </form>
            </div>

            {/* Built-in Presets */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] font-semibold">
                Composiciones Preconfiguradas (Oficiales Zutarri)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {BUILT_IN_PRESETS.map((p) => {
                  const activeCount = p.dishes.filter((d) => d.active).length;
                  return (
                    <div
                      key={p.id}
                      className="bg-[#0f1115] border border-[#22262e] rounded-lg p-4 space-y-3 hover:border-[#d49b42]/60 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#d49b42]">
                          {p.timestamp}
                        </span>
                        <span className="font-mono text-[11px] text-[#4ade80] bg-[#15803d]/20 px-2 py-0.5 rounded">
                          {activeCount} Platos
                        </span>
                      </div>

                      <h4 className="font-display font-black text-sm text-[#f3f4f6] uppercase">
                        {p.name}
                      </h4>

                      <button
                        onClick={() => {
                          loadComposition(p);
                          setActiveTab('editor');
                        }}
                        className="w-full py-2 bg-[#181c24] hover:bg-[#d49b42] hover:text-[#08090c] text-white rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors border border-[#2a3444] cursor-pointer"
                      >
                        Cargar en Lienzo
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* User Custom Saved Compositions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#9ca3af] font-semibold">
                  Tus Composiciones Personalizadas ({savedCompositions.length})
                </h3>
              </div>

              {savedCompositions.length === 0 ? (
                <div className="bg-[#0f1115] border border-dashed border-[#22262e] p-8 rounded-lg text-center font-mono text-xs text-[#6b7280]">
                  No tienes composiciones guardadas todavía. Ajusta los platos en el lienzo y guárdalas arriba.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedCompositions.map((comp) => {
                    const count = comp.dishes.filter((d) => d.active).length;
                    return (
                      <div
                        key={comp.id}
                        className="bg-[#0f1115] border border-[#22262e] rounded-lg p-4 space-y-3 hover:border-[#38bdf8]/60 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-[#9ca3af]">
                            Guardado a las {comp.timestamp}
                          </span>
                          <span className="font-mono text-[11px] text-[#38bdf8] bg-[#0284c7]/20 px-2 py-0.5 rounded">
                            {count} Platos · {comp.blockHeight}px
                          </span>
                        </div>

                        <h4 className="font-display font-black text-sm text-[#f3f4f6] uppercase">
                          {comp.name}
                        </h4>

                        <div className="flex items-center gap-2 pt-2 border-t border-[#1f242d]">
                          <button
                            onClick={() => {
                              loadComposition(comp);
                              setActiveTab('editor');
                            }}
                            className="flex-1 py-1.5 bg-[#181c24] hover:bg-[#38bdf8] hover:text-[#08090c] text-white rounded text-xs font-mono font-bold transition-colors border border-[#2a3444] cursor-pointer"
                          >
                            Cargar
                          </button>
                          <button
                            onClick={() => handleDeleteCustomComposition(comp.id)}
                            className="p-1.5 text-[#9ca3af] hover:text-red-400 hover:bg-[#1f242d] rounded transition-colors cursor-pointer"
                            title="Eliminar composición"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTION SECTION PREVIEW (With Real Live Overrides) */}
        {activeTab === 'production' && (
          <div className="w-full max-w-7xl space-y-4">
            <div className="bg-[#14181f] border border-[#2a2f3a] p-3 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d49b42]" />
                <span className="text-[#f3f4f6] font-semibold">
                  Vista de Producción en Vivo: SukaldaritzaSection con tus coordenadas editadas
                </span>
              </div>
              <div className="text-[#9ca3af]">
                Altura: <span className="text-[#d49b42] font-bold">{blockHeight}px</span> · {activeDishes.length} platos activos
              </div>
            </div>

            <SukaldaritzaSection
              currentLang="es"
              onOpenMenuModal={() => {}}
              overrideHeight={blockHeight}
              overrideDishes={overridesForSection}
            />
          </div>
        )}

        {/* TAB 5: REFERENCE COMPARATOR */}
        {activeTab === 'reference' && (
          <div className="w-full max-w-7xl space-y-4">
            <div className="bg-[#14181f] border border-[#2a2f3a] p-3 rounded-lg flex items-center justify-between text-xs font-mono">
              <span className="text-[#d49b42] font-semibold">
                Comparador Visual: Referencia con la propuesta de 3 platos y fondo histórico
              </span>
              <span className="text-[#9ca3af]">Resolución nativa: 1671 × 941 px</span>
            </div>

            <div className="relative border border-[#22262e] rounded-lg overflow-hidden shadow-2xl bg-black">
              <img
                src="./assets/images/sukaldaritza/sukaldaritza-3platos-integracion.png"
                alt="Referencia de integración"
                className="w-full h-auto block select-none"
              />
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Quick HUD (Only in Editor Mode) */}
      {activeTab === 'editor' && (
        <aside className="sticky bottom-0 z-40 bg-[#0a0c10]/95 backdrop-blur-md border-t border-[#22262e] px-4 py-2 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#9ca3af]">
              Plato Activo:
            </span>
            <div className="flex items-center gap-1 overflow-x-auto max-w-sm sm:max-w-md py-1">
              {dishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => setSelectedDishId(dish.id)}
                  style={{
                    backgroundColor: selectedDishId === dish.id ? `${dish.color}25` : '#141820',
                    borderColor: selectedDishId === dish.id ? dish.color : '#222732',
                    color: selectedDishId === dish.id ? dish.color : '#9ca3af',
                    opacity: dish.active ? 1 : 0.4,
                  }}
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-bold border transition-all cursor-pointer hover:text-white whitespace-nowrap"
                >
                  {dish.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Realtime Coordinates Readout */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono bg-[#141820] px-3 py-1 rounded border border-[#222732]">
            <div className="flex items-center gap-1">
              <span className="text-[#9ca3af]">X:</span>
              <span className="font-bold text-[#f3f4f6]">{selectedDish.x}</span>
            </div>
            <span className="text-[#33363e]">|</span>
            <div className="flex items-center gap-1">
              <span className="text-[#9ca3af]">Y:</span>
              <span className="font-bold text-[#f3f4f6]">{selectedDish.y}</span>
            </div>
            <span className="text-[#33363e]">|</span>
            <div className="flex items-center gap-1">
              <span className="text-[#9ca3af]">W:</span>
              <span className="font-bold text-[#f3f4f6]">{selectedDish.width}</span>
            </div>
            <span className="text-[#33363e]">|</span>
            <div className="flex items-center gap-1">
              <span className="text-[#9ca3af]">Z:</span>
              <span className="font-bold text-[#38bdf8]">{selectedDish.zIndex}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleDishActive(selectedDish.id)}
              className={`px-2 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-colors ${
                selectedDish.active
                  ? 'bg-green-600/20 text-green-400 border border-green-500/40'
                  : 'bg-red-600/20 text-red-400 border border-red-500/40'
              }`}
            >
              {selectedDish.active ? 'Visible' : 'Oculto'}
            </button>
            <button
              onClick={() => updateDishParam(selectedDish.id, 'x', 835)}
              className="px-2 py-1 bg-[#1a202c] hover:bg-[#252e3e] text-[#d49b42] rounded text-xs font-mono transition-colors border border-[#2a3444] cursor-pointer"
              title="Alinear directamente bajo el farol (X=835)"
            >
              Farol
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#d49b42] hover:bg-[#e5ac55] text-[#08090c] font-mono text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer shadow"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar ({activeDishes.length})</span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
