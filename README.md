# Zutarri Jatetxea — Web de Autor

> **Euskal sustraiak. Gaurko sukaldaritza.**  
> Web de autor para **Zutarri Jatetxea** (Bentako Plaza, 3, 48970 Basauri, Bizkaia).  
> Una experiencia digital sobria, cinematográfica y culturalmente arraigada en torno al maíz, el talo tradicional y la gastronomía contemporánea.

---

## 1. Concepto Artístico y Regla Visual

- **Universo Monocromático**: Fondos, personas, arquitectura, piedra, madera e instrumentos se mantienen en escala de grises de alto contraste (estética documental y chiaroscuro).
- **Color Selectivo Exclusivo**: La gastronomía real de Zutarri conserva exclusivamente sus colores naturales, integrada orgánicamente en las escenas.
- **Hero Txalaparta Interactiva**:
  - Tablas horizontales de roble a pantalla completa.
  - 4 makilak que percuten físicamente sobre las zonas interactivas (*Sustraiak*, *Sukaldaritza*, *Gure Etxea*, *Kontaktua*).
  - Nube de harina fina (*arto-irin hautsa*) dispersada mediante simulación física en HTML5 Canvas.
  - Resonancia acústica de madera sintetizada mediante Web Audio API (opcional, desactivada por defecto).
  - Revelación de tarjetas editoriales y acceso directo a cada sección.

---

## 2. Estructura de la Landing

1. **Bloque 01 — Txalaparta**: Hero interactivo a pantalla completa, selector de idioma EUS/ES, toggle de sonido y navegación rápida.
2. **Bloque 02 — Sustraiak**: Fotografía documental de amona amasando maíz con elaboraciones de Zutarri a color sobre tabla de madera. Transmisión del oficio e historia de Zutarri Kultura Elkartea.
3. **Bloque 03 — Indarra**: Aizkolari en acción en plaza vasca, fuerza física, madera, chapa viva a 280°C y ritmo.
4. **Bloque 04 — Gure Sukaldaritza**: Composición editorial asimétrica con el plato estrella y desglose de elaboraciones reales verificadas (*Kruntxitaloa*, *Taloa Rabekin*, *Taloa Hirugihar Glazeatuarekin*, *Talo Tradizionala*). Incluye modal interactivo con la carta completa.
5. **Bloque 05 — Gure Etxea**: Fotografía del comedor de piedra y del gran mural artístico en blanco y negro dedicado a la historia del maíz y el talo.
6. **Bloque 06 — Kontaktua & Erreserbak**: Canales de contacto directos y verificados: teléfono `688 76 63 98`, WhatsApp directo, Google Maps, Metro Ariz e Instagram oficial `@zutarri_jatetxea`. Sin reservas simuladas.

---

## 3. Idiomas

- **Euskera (EUS)**: Idioma principal por defecto.
- **Castellano (ES)**: Alternativa accesible mediante el selector en cabecera.
- Todos los textos de navegación, títulos, relatos y carta cambian de forma instantánea y reactiva.
- Incluye el aviso de revisión lingüística para validación previa a publicación comercial.

---

## 4. Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar para producción (Zero warnings, TypeScript estricto)
npm run build

# Previsualizar el bundle compilado
npm run preview
```

El proyecto está preparado con rutas relativas (`base: './'`) para su despliegue directo en **GitHub Pages** o cualquier alojamiento estático.

---

## 5. Procedencia de Recursos y Fotografías

| Archivo | Contenido | Procedencia | Estado Legal / Permisos |
| :--- | :--- | :--- | :--- |
| `txalaparta-hero.jpg` | Txalaparta tradicional en claroscuro con makilak | Archivo visual Stitch / Demo Zutarri | Recurso provisional para demo privada. Pendiente de autorización comercial. |
| `sustraiak-amona.jpg` | Amona amasando talo con elaboraciones reales a color | Archivo visual Stitch / Demo Zutarri | Recurso provisional para demo privada. Pendiente de autorización comercial. |
| `indarra-aizkolari.jpg` | Aizkolari en plena competición de Herri Kirolak | Archivo visual Stitch / Demo Zutarri | Recurso provisional para demo privada. Pendiente de autorización comercial. |
| `sukaldaritza-master-talo.jpg` | Talo de autor de Zutarri con txistorra e Idiazabal | Archivo visual Stitch / Demo Zutarri | Recurso provisional para demo privada. Pendiente de autorización comercial. |
| `gure-etxea-mural.jpg` | Comedor de piedra y mural de maíz de Zutarri Jatetxea | Archivo visual Stitch / Demo Zutarri | Recurso provisional para demo privada. Pendiente de autorización comercial. |
| `zutarri-logo.svg` | Identidad tipográfica e isotipo de tablas de txalaparta | Identidad original Zutarri Jatetxea | Vectorial original del proyecto. |
| `favicon.svg` | Isotipo simplificado en piedra y maíz | Diseño original del proyecto | Listo para producción. |

---

## 6. Verificación Técnica

- **TypeScript**: Verificación estricta sin errores (`tsc -b`).
- **Build**: Bundle Vite optimizado en `dist/`.
- **Preferencia de movimiento**: Respeta `prefers-reduced-motion` silenciando partículas y acelerando transiciones.
- **Web Audio**: Síntesis acústica nativa sin peticiones a ficheros externos de audio.
