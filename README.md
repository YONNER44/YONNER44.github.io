# Portafolio Personal - Yonner Vargas

Portafolio web construido con Astro y Tailwind CSS para presentar proyectos, experiencia y hoja de vida.

## Caracteristicas

- Diseno responsive (mobile, tablet, desktop)
- Modo claro/oscuro
- Galeria de proyectos con carrusel
- Busqueda de contenido
- Blog y CV en pagina dedicada
- Boton de descarga de CV (`/documents/CV-YONNER-VARGAS-BERNATE.pdf`)
- SEO, RSS y sitemap

## Stack

- Astro 4
- TypeScript
- Tailwind CSS
- React (componentes interactivos)
- React Icons
- React Syntax Highlighter

## Documentacion Frontend

### Arquitectura general

- Framework principal: `Astro` (`src/pages` para rutas basadas en archivos).
- UI estatica con `.astro`, interactividad puntual en componentes `.tsx` (React).
- Estilos globales en `src/styles/global.css`.
- Tokens y extensiones de Tailwind en `tailwind.config.mjs`.
- Contenido editorial (blog, projects, legal, work) en `src/content/*` usando `astro:content`.

### Estructura de carpetas (front)

- `src/pages/`: paginas y rutas del sitio.
- `src/layouts/`: layouts reutilizables para estructura de pagina.
- `src/components/`: componentes visuales (`.astro` y `.tsx`).
- `src/content/`: contenido markdown/MDX versionado en repo.
- `src/assets/`: imagenes procesadas por Astro.
- `public/`: archivos estaticos sin procesamiento (fonts, js, documentos, favicon).

### Rutas principales

- `src/pages/index.astro`: home.
- `src/pages/projects/index.astro`: listado de proyectos.
- `src/pages/projects/[...slug].astro`: detalle dinamico de proyectos desde contenido.
- `src/pages/blog/index.astro`: listado de blog.
- `src/pages/blog/[...slug].astro`: detalle dinamico de posts.
- `src/pages/cv.astro`: hoja de vida.
- `src/pages/work/index.astro`: experiencia laboral.
- `src/pages/legal/[...slug].astro`: paginas legales.

### Componentes clave

- `src/components/Header.astro` y `src/components/Footer.astro`: navegacion y pie global.
- `src/components/Modal.astro`: modal reutilizable.
- `src/components/Carrousel.tsx`: galeria de imagenes interactiva.
- `src/components/Search.tsx`, `src/components/SearchBar.tsx`, `src/components/SearchCollection.tsx`: busqueda de contenido.
- `src/components/CodeBlock.tsx`: bloque de codigo con boton de copiado.

### Estilos y theming

- Tailwind se carga con `@astrojs/tailwind` y `applyBaseStyles: false` en `astro.config.mjs`.
- Fuente principal `Atkinson` definida via `@font-face` en `src/styles/global.css`.
- Modo dark por clase (`darkMode: ["class"]`) definido en `tailwind.config.mjs`.
- Scripts utilitarios en `public/js/` para efectos visuales y comportamiento de UI.

### Contenido dinamico

- Esquemas de contenido en `src/content/config.ts`.
- Colecciones activas:
  - `blog`
  - `projects`
  - `work`
  - `legal`
- Para crear nuevas entradas, agregar un `index.md` con frontmatter valido dentro de la coleccion correspondiente.

### Como agregar una nueva pagina frontend

1. Crear el archivo de ruta en `src/pages/` (por ejemplo `src/pages/contact.astro`).
2. Reutilizar un layout de `src/layouts/` para mantener consistencia.
3. Extraer UI repetida a `src/components/` si aplica.
4. Agregar enlaces en `Header.astro` o secciones de navegacion si es necesario.
5. Ejecutar `npm run build` para validar tipos y build.

### Como agregar un nuevo componente interactivo

1. Crear componente `.tsx` en `src/components/`.
2. Importarlo desde una pagina o componente `.astro`.
3. Usar directivas de hidratacion de Astro cuando aplique (`client:load`, `client:visible`, etc.).
4. Mantener estilos con utilidades Tailwind y reglas globales minimas.

## Proyectos mostrados

- DS24/7
- Internship
- Div-manager

## Estructura relevante

- `src/pages/index.astro`: home
- `src/pages/projects/*`: paginas de proyectos
- `src/pages/cv.astro`: hoja de vida
- `src/components/Carrousel.tsx`: galeria de imagenes
- `src/components/CodeBlock.tsx`: bloques de codigo con copiar
- `src/data/internshipConfig.ts`: contenido de guia de instalacion
- `public/documents/`: documentos descargables (CV en PDF)

## Comandos

| Comando | Descripcion |
| :-- | :-- |
| `npm install` | Instala dependencias |
| `npm run dev` | Levanta entorno local en `localhost:4321` |
| `npm run dev:network` | Levanta entorno local en red |
| `npm run build` | Ejecuta `astro check` y build de produccion |
| `npm run preview` | Previsualiza build local |
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Corrige problemas de lint |

## Deploy (GitHub Pages)

Este proyecto despliega con GitHub Actions usando:
- `.github/workflows/Deploy-pages.yml`

Configuracion necesaria en GitHub:
1. `Settings -> Pages`
2. `Source: GitHub Actions`

Nota importante:
- No usar `Deploy from a branch` para este flujo.
- El deploy de produccion se hace desde la rama `main`.

## Actualizacion de CV PDF

1. Colocar el archivo en:
- `public/documents/CV-YONNER-VARGAS-BERNATE.pdf`

2. El boton de descarga en `src/pages/cv.astro` ya apunta a esa ruta.

## Licencia

MIT
