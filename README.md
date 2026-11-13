# Fernando Junior Hernández · CIO / CTO Executive Website & Portfolio

> **Sitio Web Personal y Portafolio Ejecutivo C-Level (CIO / CTO / AI & Digital Transformation Director)**  
> Diseñado bajo la estética **Executive Cyber-Luxury & Command Center** (nivel Apple Pro / Stripe / Linear / Vercel Executive), optimizado para despliegue estático de alto rendimiento en **GitHub Pages**.

---

## 💎 Visión y Estética del Proyecto

- **Executive Cyber-Luxury:** Paleta *Obsidian Navy* (`#070B14`) con superficies glassmorphism translúcidas (`backdrop-blur-xl`), bordes de precisión con *spotlight hover* reactivo al cursor y acentos en *Electric Cyan* (`#38BDF8`), *Gold* (`#F59E0B`) y *Crimson* (`#E11D48`).
- **Modo Oscuro & Modo Claro Corporativo:** Switch fluido entre Dark Mode ejecutivo y Light Mode de alta legibilidad.
- **Bilingüe Instantáneo (`ES` / `EN`):** Conmutación sin recargar la página, conservando la preferencia en memoria local.
- **Redacción Ejecutiva Impecable:** Cumplimiento estricto de la regla de estilo: cero guiones largos (em-dashes), utilizando comas, dos puntos, puntos medios (`·`) y paréntesis para una lectura natural y de alta dirección.

---

## ⚡ Stack Tecnológico y Arquitectura

- **Core:** [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) + [TypeScript 5+](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) con `@tailwindcss/vite`
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/) + [Lenis Smooth Scroll](https://lenis.darkroom.engineering/) para un scroll cinemático ultra fluido
- **Fondo Interactivo 3D / Canvas:** Red neuronal reactiva al puntero en tiempo real a 60 FPS con auto-pausa fuera de viewport para eficiencia de batería
- **Iconografía:** [Lucide React](https://lucide.dev/) + Iconos vectoriales personalizados
- **Micro-interacciones:** Bento Grid con bordes *Spotlight* sensibles a coordenadas del mouse y confeti ejecutivo para descargas

---

## 🏛️ Estructura de Secciones

1. **Navbar Flotante Glassmorphic:** Monograma `FJH`, navegación suave a secciones, toggle de idioma `ES | EN`, toggle de tema y botón destacado para descargar el CV Ejecutivo.
2. **Hero Section de Alto Impacto:**
   - Beacon en vivo con estatus: `● Disponible para Posiciones de Dirección de TI (CIO / CTO) · CDMX & Nacional`
   - Headline rotativo dinámico con roles directivos
   - Pitch ejecutivo sintetizado (+15 años de trayectoria, misión crítica, BCP/DRP, CAPEX/OPEX y +100 ingenieros)
   - Fotografía ejecutiva en marco de cristal con badges flotantes en vivo (`+15 Años Exp. Directiva`, `Misión Crítica 99.9%`, `CNBV & Farma Compliance`)
3. **Barra de Métricas de Impacto (Animated Number Counters):**
   - **4 días → 30 min (-95%):** Reducción en suscripción de pólizas en MetLife México
   - **+100 Ingenieros / 6 Subdirecciones:** Misión crítica para +100M de registros en el INE
   - **4x Ancho de Banda ($0 OPEX extra):** Enlaces dedicados y ERP Intelisis en Grupo Lefarma
   - **$40 MDP / Semana:** Transacciones cloud en Azure para Starbucks y Domino's (Alsea)
   - **100% Cumplimiento Regulado:** Ciberseguridad FortiGate, BCP/DRP y normativa CNBV + Política IA POL-019 en OFINSA
4. **Los 4 Pilares del CIO Moderno (Interactive Bento Grid):**
   - Gobierno de TI, Finanzas y Proveedores (CAPEX/OPEX, ITIL, COBIT, SAFe, RFPs)
   - Infraestructura, Redes y Ciberseguridad (99.9% SLA, SOC/NOC, FortiGate, Win Server 2025, M365)
   - Sistemas Corporativos (ERP), Salud y Finanzas (ERP Intelisis, CRM, CNBV, LGPDP)
   - Transformación Digital, BI e Inteligencia Artificial (Política IA POL-019, Agentes LLM, n8n, Qdrant)
5. **Casos de Éxito Ejecutivos:** Desglose detallado `Reto → Estrategia → Resultado Medible` con pestañas interactivas y KPIs destacados.
6. **Línea de Tiempo C-Level:** Línea vertical con nodo luminoso que traza la trayectoria directiva completa desde 2014 hasta 2026+.
7. **Educación, Certificaciones & Credenciales:** Filtros por Grados Académicos (INFOTEC Maestría, IPN UPIICSA Licenciatura con cédulas federales), Certificaciones Internacionales (SAFe, Google, Azure, Scrum) y Diplomados Ejecutivos (Univ. of Chicago, CENTRO, CISO Club, ITESM), con enlace directo a insignias verificadas en Credly.
8. **Contacto Directo & Footer:** Accesos rápidos de un clic a WhatsApp (+52 55 2297 3001), correo corporativo, LinkedIn, Credly y compositor interactivo de mensajes pre-estructurados para directores y reclutadores.
9. **Modal de CV Ejecutivo:** Selector con doble modalidad:
   - *Versión Visual Ejecutiva:* Formato estilizado listo para impresión o guardado directo como PDF (`window.print()`).
   - *Versión ATS Optimizada:* Texto plano estructurado para sistemas de seguimiento de candidatos (Workday, Greenhouse, Lever), con copia al portapapeles y descarga de archivo `.txt`.

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
- Node.js 18+ (recomendado Node 20+)
- npm 9+

### Instalación y Ejecución
```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/fernior.git
cd fernior

# 2. Instalar dependencias
npm install

# 3. Iniciar entorno de desarrollo
npm run dev
```

La aplicación estará disponible localmente en `http://localhost:5173`.

---

## 📦 Construcción y Despliegue en GitHub Pages

El proyecto ya incluye el flujo de trabajo automatizado en `.github/workflows/deploy.yml` y la configuración de rutas relativas `base: './'` en `vite.config.ts`.

### Pasos para Activar en GitHub:

1. **Crear el repositorio en GitHub:**
   Crea un nuevo repositorio en tu cuenta de GitHub llamado `fernior` (o el nombre de tu preferencia).

2. **Subir el código:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial C-Level executive portfolio launch"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
   git push -u origin main
   ```

3. **Habilitar GitHub Pages en el repositorio:**
   - En tu repositorio de GitHub, ve a **Settings** > **Pages**.
   - En la sección **Build and deployment** > **Source**, selecciona **GitHub Actions**.
   - ¡Listo! Cada vez que hagas `git push` a la rama `main`, la GitHub Action compilará y publicará el sitio automáticamente en `https://<tu-usuario>.github.io/<tu-repo>/`.

---

## 🏷️ Metadatos SEO y Tarjetas OpenGraph

El archivo `index.html` cuenta con metadatos optimizados para compartir en WhatsApp, LinkedIn, X y Slack:
- **Título:** `Fernando Junior Hernández · Director de TI (CIO / CTO)`
- **Descripción:** *Infraestructura de Misión Crítica · Ciberseguridad & Cumplimiento (CNBV / Farma) · Transformación Digital & ERP · IA Generativa y Agéntica.*
- **Imagen OpenGraph:** `./fernando-junior-hernandez.jpg` (fotografía ejecutiva de alta resolución).

---

## 👤 Contacto Directo

- **Nombre:** Fernando Junior Hernández
- **Rol:** Director de Tecnologías de la Información (CIO / CTO)
- **Ubicación:** Ciudad de México, CDMX (Disponibilidad para viajar)
- **Teléfono / WhatsApp:** [+52 55 2297 3001](https://wa.me/525522973001)
- **Correo:** [fernior@gmail.com](mailto:fernior@gmail.com)
- **LinkedIn:** [linkedin.com/in/fernior](https://linkedin.com/in/fernior)
- **Credly:** [credly.com/users/fernando-junior-hernandez](https://credly.com/users/fernando-junior-hernandez)
