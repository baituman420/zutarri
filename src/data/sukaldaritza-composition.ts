/**
 * ZUTARRI JATETXEA — SUKALDARITZA GASTRONOMIC COMPOSITION
 * Definitive approved composition containing the 10 selected dishes.
 * Stored from the visual editor localStorage ("barra 10 platos").
 *
 * Background Canvas Reference: 1671 x 941 px (Aspect ~1.77577)
 * Block Height Reference: 1040 px
 */

export interface GastronomicItem {
  id: string;
  index: string;
  name: { eu: string; es: string };
  badge: { eu: string; es: string };
  zone: { eu: string; es: string };
  description: { eu: string; es: string };
  notes: { eu: string; es: string };
  imageSrc: string;
  shadowSrc?: string;
  nativeCoords: {
    x: number;      // X center in native reference space (0..1671)
    y: number;      // Y center in native reference space (0..941)
    width: number;  // Width in px
    height: number; // Height in px
  };
  zIndex: number;
  tooltipPosition: 'top' | 'top-left' | 'top-right';
}

export const APPROVED_COMPOSITION_METADATA = {
  id: 'custom-1794661426348',
  name: 'barra 10 platos',
  status: 'APPROVED_DEFINITIVE',
  timestamp: '14:03',
  blockHeight: 1040,
  referenceCanvas: {
    width: 1671,
    height: 941,
    aspectRatio: 1671 / 941,
  },
  activeDishesCount: 10,
};

export const APPROVED_10_DISHES: GastronomicItem[] = [
  {
    id: 'kruntxitalo',
    index: '01',
    name: {
      eu: 'Kruntxitaloa Piparrekin',
      es: 'Kruntxitalo con Piparras de Ibarra',
    },
    badge: {
      eu: 'Sorkuntza Karraskaria',
      es: 'Creación Crujiente de Autor',
    },
    zone: {
      eu: 'Amasadora / Barra Sarrera',
      es: 'Mesa Amasadora / Entrada de Barra',
    },
    description: {
      eu: 'Masa bereziki mehe eta karraskaria, hegaluze freskoaren tartarra eta Ibarrako pipar ozpinduak.',
      es: 'Talo crujiente de masa extrafina con tartar de bonito fresco, emulsión suave y piparras encurtidas de Ibarra.',
    },
    notes: {
      eu: 'Zutarriren errezeta bereizgarria, arto tradizionalaren berrinterpretazio modernoa.',
      es: 'Receta insignia y exclusiva de Zutarri: ligereza y textura crujiente de vanguardia.',
    },
    imageSrc: './assets/images/recortes_transparentes/images (2).png',
    nativeCoords: {
      x: 376,
      y: 583,
      width: 133,
      height: 107,
    },
    zIndex: 12,
    tooltipPosition: 'top-left',
  },
  {
    id: 'talo-amasadora',
    index: '02',
    name: {
      eu: 'Amasadorako Talo Artisaua',
      es: 'Talo Artesanal de la Amasadora',
    },
    badge: {
      eu: 'Eskuz Oratua · Amasadora',
      es: 'Amasado a Mano · Amasadora',
    },
    zone: {
      eu: 'Amasadoraren Mahaia (Irin artean)',
      es: 'Mesa de la Amasadora (Entre harina)',
    },
    description: {
      eu: 'Emakumearen eskuek oratutako arto-disko biribil urreztatua, txerri-hirugihar eztiz glazeatu eta emultsio leunarekin.',
      es: 'Disco de maíz circular dorado junto a la mesa enharinada, con panceta ibérica confitada a la sidra y emulsión suave.',
    },
    notes: {
      eu: 'Irin hutsa, ura eta sua: Zutarriren artisautza bereizgarria.',
      es: 'Harina de maíz de caserío, agua hirviendo y fuego: la esencia artesana de Zutarri.',
    },
    imageSrc: './assets/images/sukaldaritza/unnamed8_recorte_limpio.png',
    shadowSrc: './assets/images/sukaldaritza/unnamed8_sombra.png',
    nativeCoords: {
      x: 476,
      y: 712,
      width: 163,
      height: 140,
    },
    zIndex: 10,
    tooltipPosition: 'top-left',
  },
  {
    id: 'croquetas-barra',
    index: '03',
    name: {
      eu: 'Kroketa Kurruskariak & Kalabaza Krema',
      es: 'Trío de Croquetas Crujientes de Autor',
    },
    badge: {
      eu: 'Gure Barra · Pikoteoa',
      es: 'Nuestra Barra · Picoteo',
    },
    zone: {
      eu: 'Barra Aurrealdea (Ezkerrean)',
      es: 'Barra Adelantada (Plano Izquierdo)',
    },
    description: {
      eu: 'Hiru kroketa urreztatu panko finarekin, kalabaza errearen krema gozoarekin eta sukaldeko erredukzio ilunarekin.',
      es: 'Tres croquetas artesanas con rebozado extra crujiente, crema suave de calabaza asada y reducción balsámica de autor.',
    },
    notes: {
      eu: 'Barrako aperitibo kuttuna, euskal ardoarekin edo txakolinarekin dastatzeko.',
      es: 'El aperitivo de barra por excelencia para acompañar txakoli o crianza alavesa.',
    },
    imageSrc: './assets/images/sukaldaritza/caption_recorte_limpio.png',
    shadowSrc: './assets/images/sukaldaritza/caption_sombra.png',
    nativeCoords: {
      x: 584,
      y: 580,
      width: 300,
      height: 123,
    },
    zIndex: 20,
    tooltipPosition: 'top-left',
  },
  {
    id: 'tosta-antxoa',
    index: '04',
    name: {
      eu: 'Kantauriko Antxoa Tosta Artisaua',
      es: 'Tosta de Anchoa del Cantábrico',
    },
    badge: {
      eu: 'Itsasoaren Zaporea',
      es: 'Sabor Marinero y Salazón',
    },
    zone: {
      eu: 'Barra Erdiko Aurrealdea',
      es: 'Barra Media (Centro)',
    },
    description: {
      eu: 'Kantauriko antxoa lodia gatzetan, ogi txigortuan birrindutako tomate naturalarekin eta oliba olio birjina estrarekin.',
      es: 'Anchoa en salazón del Cantábrico sobre tosta de pan rústico de masa madre, tomate natural rallado y aceite de oliva virgen extra.',
    },
    notes: {
      eu: 'Gure portuetako artisautza-kontserba zuzenean barrara eramana.',
      es: 'La nobleza conservera del Cantábrico servida con la sencillez del buen producto.',
    },
    imageSrc: './assets/images/recortes_transparentes/unnamed (23).png',
    nativeCoords: {
      x: 797,
      y: 612,
      width: 109,
      height: 194,
    },
    zIndex: 19,
    tooltipPosition: 'top',
  },
  {
    id: 'cazuelita-beroa',
    index: '05',
    name: {
      eu: 'Buztinezko Kazuelatxo Tradizionala',
      es: 'Cazuelita Marinera de Barro Cocido',
    },
    badge: {
      eu: 'Sutondo Berotasuna',
      es: 'Guiso al Fuego Lento',
    },
    zone: {
      eu: 'Barra Erdiko Gunea',
      es: 'Zona Central de la Barra',
    },
    description: {
      eu: 'Buztin egosian bero-bero zerbitzatutako arrain eta barazki gisatua, baratxuri txigortuaren emultsioarekin.',
      es: 'Guiso marinero caliente servido en cazuela tradicional de barro cocido con reducción concentrada de pescado de lonja y ajo dorado.',
    },
    notes: {
      eu: 'Euskal koilara-sukaldaritzaren memoria eta epeltasuna.',
      es: 'El arraigo de la cocina de cazuela y puchero trasladado al formato de barra.',
    },
    imageSrc: './assets/images/recortes_transparentes/unnamed (21).png',
    nativeCoords: {
      x: 904,
      y: 589,
      width: 100,
      height: 119,
    },
    zIndex: 16,
    tooltipPosition: 'top',
  },
  {
    id: 'broxeta-egurra',
    index: '06',
    name: {
      eu: 'Baserriko Broxeta Berezia',
      es: 'Brocheta de Autor de Caserío',
    },
    badge: {
      eu: 'Txingar Ukitua',
      es: 'Aromas de Brasa',
    },
    zone: {
      eu: 'Barra Zurezko Ohol Nagusia',
      es: 'Barra Centro-Derecha',
    },
    description: {
      eu: 'Zurezko ziri mehean ensartatutako baserriko haragi gozoak eta barazki erreak, txingar-ukitu finarekin.',
      es: 'Brocheta ensartada con dados seleccionados de carne de caserío y vegetales asados a la brasa con glaseado especiado.',
    },
    notes: {
      eu: 'Mendiko egur-suaren usaina eta gaurko aurkezpena.',
      es: 'El eco de la brasa de encina en un bocado vertical y jugoso.',
    },
    imageSrc: './assets/images/recortes_transparentes/unnamed (22).png',
    nativeCoords: {
      x: 1013,
      y: 666,
      width: 147,
      height: 277,
    },
    zIndex: 17,
    tooltipPosition: 'top',
  },
  {
    id: 'talo-idiazabal',
    index: '07',
    name: {
      eu: 'Taloa Idiazabal & Txangurruarekin',
      es: 'Talo con Crema de Idiazabal y Txangurro',
    },
    badge: {
      eu: 'Ardi Latxa & Itsasoa',
      es: 'Idiazabal Ahumado & Centollo',
    },
    zone: {
      eu: 'Barra Eskuinaldea',
      es: 'Barra Lateral Derecha',
    },
    description: {
      eu: 'Arto-talo fin kurruskaria, Idiazabal gazta ketuaren krema epela eta Kantauriko txangurro mamitsua.',
      es: 'Base crujiente de maíz rellena de crema templada de queso Idiazabal D.O. ahumado y centollo del Cantábrico desmigado.',
    },
    notes: {
      eu: 'Mendiko artzaintzaren indarra eta itsasertzeko fintasunaren batasun perfektua.',
      es: 'Equilibrio de intensidades entre el queso de pastor y la frescura marina del marisco.',
    },
    imageSrc: './assets/images/recortes_transparentes/unnamed (24).png',
    nativeCoords: {
      x: 1152,
      y: 658,
      width: 147,
      height: 249,
    },
    zIndex: 9,
    tooltipPosition: 'top',
  },
  {
    id: 'copa-gastronomika',
    index: '08',
    name: {
      eu: 'Aperitibo Bertikala Kopan',
      es: 'Bocado de Autor en Copa Alta',
    },
    badge: {
      eu: 'Formatu Berritzailea',
      es: 'Aperitivo de Degustación',
    },
    zone: {
      eu: 'Barra Eskuinaldea (Bigarren Plana)',
      es: 'Barra Fondo Derecho',
    },
    description: {
      eu: 'Kristalezko ontzi bertikalean aurkeztutako aperitibo hotza: apar leuna, itsaski ñabardurak eta arto-hostore mehea.',
      es: 'Aperitivo frío servido en capas verticales: espuma ligera de emulsión marina, hierbas frescas y lámina crujiente de maíz.',
    },
    notes: {
      eu: 'Freskotasun dotorea tragoen eta plater beroen arteko trantsiziorako.',
      es: 'Un bocado refrescante diseñado para limpiar el paladar entre creaciones calientes.',
    },
    imageSrc: './assets/images/recortes_transparentes/unnamed (15).png',
    nativeCoords: {
      x: 1277,
      y: 643,
      width: 156,
      height: 247,
    },
    zIndex: 14,
    tooltipPosition: 'top-right',
  },
  {
    id: 'gilda-donostiarra',
    index: '09',
    name: {
      eu: 'Egilearen Gilda Tradizionala',
      es: 'Gildas de Autor Zutarri',
    },
    badge: {
      eu: 'Gure Klasiko Handia',
      es: 'El Clásico Donostiarra',
    },
    zone: {
      eu: 'Barra Muturra (Eskuinean)',
      es: 'Extremo Derecho de la Barra',
    },
    description: {
      eu: 'Ibarrako piparra samur hautatua, Kantauriko antxoa mamitsua eta oliba manzanilla oliotan aberastua.',
      es: 'Piparra tierna de Ibarra, anchoa seleccionada del Cantábrico y aceituna gordal bañadas en aceite de oliva virgen extra.',
    },
    notes: {
      eu: 'Euskal taberna ororen nortasun-ikur ukaezina, zentzumenak pizten dituena.',
      es: 'El estandarte indiscutible del aperitivo y el poteo, con vinagreta artesana.',
    },
    imageSrc: './assets/images/recortes_transparentes/479157181_1132919598844251_6811334955080910585_n.png',
    nativeCoords: {
      x: 1479,
      y: 665,
      width: 145,
      height: 191,
    },
    zIndex: 22,
    tooltipPosition: 'top-right',
  },
  {
    id: 'talos-barra',
    index: '10',
    name: {
      eu: 'Hiru Talo Irekien Bandeja',
      es: 'Bandeja Degustación de Tres Talos',
    },
    badge: {
      eu: 'Tradizio Berritua · Hiru Talo',
      es: 'Tradición Renovada · Tres Talos',
    },
    zone: {
      eu: 'Barra Eskuinaldea (Ohol Handia)',
      es: 'Barra Principal Derecha (Tabla Grande)',
    },
    description: {
      eu: 'Bandeja panoramikoa hiru arto-talo irekirekin: hirugihar glazeatua, muskuilu-tartar saltsa eta baratze freskoko belar usaintsuak.',
      es: 'Bandeja panorámica con tres talos artesanos abiertos con panceta glaseada con miel y sidra, emulsión tártara y brotes frescos.',
    },
    notes: {
      eu: 'Zutarriren plater nagusia zurezko ohol zabalean zerbitzatua.',
      es: 'La gran degustación sobre madera que resume la maestría talogile de nuestra casa.',
    },
    imageSrc: './assets/images/sukaldaritza/unnamed3_recorte_limpio.png',
    shadowSrc: './assets/images/sukaldaritza/unnamed3_sombra.png',
    nativeCoords: {
      x: 1517,
      y: 593,
      width: 345,
      height: 132,
    },
    zIndex: 15,
    tooltipPosition: 'top-right',
  },
];
