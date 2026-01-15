# 🚀 Guía de Despliegue - Astro Portfolio

Este proyecto utiliza un flujo de trabajo con 3 ramas para desarrollo, pruebas y producción.

## 📋 Estructura de Ramas

- **`dev`** - Rama de desarrollo (trabajo local)
- **`staging`** - Rama de pruebas en GitHub Pages
- **`main`** - Rama de producción final en GitHub Pages

---

## 🔄 Flujo de Trabajo Completo

### 1️⃣ Desarrollo en `dev`

Trabaja normalmente en la rama `dev`:

```bash
# Asegúrate de estar en dev
git switch dev

# Desarrolla tu código
npm run dev

# Cuando termines, guarda cambios
git add .
git commit -m "Descripción de los cambios"
git push origin dev
```

---

### 2️⃣ Desplegar a STAGING (Pruebas en la nube)

Una vez que tus cambios estén listos para probar en línea:

```bash
# 1. Asegúrate de estar en dev
git switch dev

# 2. Construye el proyecto
npm run build

# 3. Crea una rama temporal solo con dist/
git subtree split --prefix dist -b staging-temp

# 4. Cambia a staging y actualízala
git switch staging
git reset --hard staging-temp

# 5. Sube a GitHub Pages (staging)
git push --force origin staging

# 6. Limpia y vuelve a dev
git branch -D staging-temp
git switch dev
```

**Verifica en:** `https://yonner44.github.io/` (configurado para apuntar a staging)

---

### 3️⃣ Desplegar a MAIN (Producción)

Si staging funciona correctamente y estás listo para producción:

```bash
# 1. Cambia a staging (lo que ya probaste)
git switch staging

# 2. Cambia a main y copia TODO desde staging
git switch main
git reset --hard staging

# 3. Sube a producción
git push --force origin main

# 4. Vuelve a dev para seguir trabajando
git switch dev
```

> ⚠️ **Importante:** Main debe ser una copia EXACTA de staging, no un nuevo build desde dev. Esto garantiza que produces lo que ya probaste.

---

## 📝 Comandos Rápidos

### Script completo para STAGING:

```bash
git switch dev && npm run build && git subtree split --prefix dist -b staging-temp && git switch staging && git reset --hard staging-temp && git push --force origin staging && git branch -D staging-temp && git switch dev
```

### Script completo para MAIN (Producción):

```bash
git switch staging && git switch main && git reset --hard staging && git push --force origin main && git switch dev
```

---

## ⚠️ Notas Importantes

1. **Siempre desarrolla en `dev`** - Nunca edites directamente `staging` o `main`

2. **`.gitignore` en staging/main** - Ambas ramas tienen un `.gitignore` que ignora `src/`, `node_modules/` y `.astro/`. Esto evita conflictos al cambiar de rama, ya que estas carpetas solo deben existir en `dev`

3. **El archivo `.nojekyll`** en `public/` es necesario para que GitHub Pages sirva la carpeta `_astro`

4. **GitHub Pages tarda 1-2 minutos** en actualizar después del push

5. **Limpia caché del navegador** con `Ctrl + Shift + R` después de desplegar

6. **La configuración actual:**
   - `site: "https://yonner44.github.io"`
   - **NO usar** `base:` porque es un sitio de usuario, no de proyecto

---

## 🐛 Solución de Problemas

### Error 404 en archivos CSS/JS

- Verifica que existe `public/.nojekyll`
- Verifica que NO tengas `base:` en `astro.config.mjs`

### Los estilos no se actualizan

- Limpia caché: `Ctrl + Shift + R`
- Abre ventana de incógnito
- Espera 2-3 minutos después del push

### Cambios no aparecen en GitHub Pages

- Verifica que `dist/` esté en staging/main
- Revisa en GitHub → Settings → Pages que apunte a la rama correcta
- Chequea Actions → pages build and deployment

---

## 📦 Estructura del Proyecto

```
astro-sphere/
├── src/              # Código fuente
├── public/           # Archivos estáticos (fonts, js, svgs)
│   └── .nojekyll    # ⚠️ IMPORTANTE para GitHub Pages
├── dist/             # Build generado (solo en staging/main)
├── astro.config.mjs  # Configuración de Astro
└── package.json
```

---

## ✅ Checklist de Despliegue

Antes de desplegar a producción, verifica:

- [ ] Los cambios funcionan en local (`npm run dev`)
- [ ] El build se genera sin errores (`npm run build`)
- [ ] Los cambios se probaron en staging
- [ ] No hay errores en la consola del navegador
- [ ] Todos los estilos e imágenes cargan correctamente
- [ ] La navegación funciona en todas las páginas

---

**Última actualización:** 14 de enero de 2026
