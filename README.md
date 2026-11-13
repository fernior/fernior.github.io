# Fernando Junior Hernández · CIO / CTO Executive Website & Portfolio

> **Sitio Web Personal y Portafolio Ejecutivo C-Level (CIO / CTO / AI & Digital Transformation Director)**  
> Arquitectura 100% Estática (Zero-Build / Zero-Node), lista para funcionar de forma nativa e inmediata en **GitHub Pages** o abriendo directamente `index.html` en el navegador.

---

## 💎 Visión y Estética del Proyecto

- **Executive Cyber-Luxury & Command Center:** Paleta Obsidian Navy (`#070B14`) con superficies glassmorphism translúcidas (`backdrop-filter: blur(16px)`), bordes de micro-precisión, acentos en *Electric Cyan* (`#38BDF8`), *Gold* (`#F59E0B`) y *Crimson* (`#E11D48`).
- **Efecto Spotlight en Tarjetas Bento:** Implementación en JavaScript nativo que calcula las coordenadas `--mouse-x` y `--mouse-y` para crear un haz de luz interactivo que sigue el puntero.
- **Fondo Interactivo 3D / Canvas Neural Mesh:** Red de nodos interconectados en el Hero que reacciona con gravedad y atracción al cursor a 60 FPS constantes, con auto-pausa fuera de viewport para eficiencia de batería.
- **Modo Oscuro & Modo Claro Corporativo:** Conmutador fluido entre Dark Mode ejecutivo y Light Mode institucional.
- **Bilingüe Instantáneo (`ES` / `EN`):** Conmutación en tiempo real sin recargar la página, alimentado por el diccionario de datos en `js/data.js` y persistido en `localStorage`.
- **Redacción Ejecutiva Impecable:** Cumplimiento riguroso de la regla de estilo: cero guiones largos (em-dashes), utilizando comas, dos puntos, puntos medios (`·`) o paréntesis para una lectura natural y de alta dirección.

---

## ⚡ Arquitectura Técnica (100% Estático / Zero-Node)

Este proyecto no requiere Node.js, npm, package.json ni pasos de compilación. Funciona con estándares web nativos y librerías de alto impacto cargadas vía CDN:

- **Tailwind CSS (Play CDN):** Configurado en el `<head>` con paleta personalizada y utilidades corporativas.
- **GSAP 3 + ScrollTrigger (CDN):** Animaciones de entrada cinematográficas, revelado progresivo en scroll, contadores numéricos y línea de tiempo interactiva.
- **Lenis Smooth Scroll (CDN):** Desplazamiento ultra fluido con inercia de nivel agencia creativa sincronizado con GSAP.
- **Lucide Icons (CDN):** Iconografía ejecutiva SVG renderizada de forma nativa.
- **Canvas Confetti (CDN):** Retroalimentación visual al descargar o copiar el CV en formato ATS.
- **Google Fonts:** `Plus Jakarta Sans` para cuerpo, `Space Grotesk` para titulares y `JetBrains Mono` para datos técnicos.

---

## 📁 Estructura del Proyecto

```text
fernior/
├── index.html              # Estructura semántica, metadatos SEO/OpenGraph y carga de CDNs
├── css/
│   └── styles.css          # Variables CSS, glassmorphism, spotlight, keyframes y print styles
├── js/
│   ├── data.js             # Diccionario bilingüe (ES/EN) con todo el contenido ejecutivo
│   └── main.js             # Lógica de animaciones GSAP, Canvas, Lenis, contadores y DOM i18n
├── assets/
│   ├── profile.jpg         # Fotografía ejecutiva en alta resolución de Fernando Junior Hernández
│   └── favicon.svg         # Monograma ejecutivo FJH en formato vectorial
├── .github/
│   └── workflows/
│       └── deploy.yml      # Despliegue estático automatizado en GitHub Pages
└── README.md               # Documentación ejecutiva del proyecto
```

---

## 🏛️ Secciones del Portafolio

1. **Navbar Flotante Glassmorphic:** Monograma `FJH`, navegación con anclas suaves, switch de idioma `ES | EN`, toggle `Dark/Light` y botón CTA `"Descargar CV"`.
2. **Hero Section de Alto Impacto:**
   - Badge superior animado con pulso verde: `● Disponible para Posiciones de Dirección de TI (CIO / CTO) · CDMX & Nacional`
   - Headline rotativo dinámico sincronizado con GSAP
   - Sub-headline y pitch ejecutivo (+15 años de trayectoria, misión crítica, BCP/DRP, CAPEX/OPEX y +100 ingenieros)
   - Fotografía ejecutiva con marco iluminado y 3 tarjetas flotantes: `+15 Años Exp. Directiva`, `Misión Crítica 99.9%`, `CNBV & Farma Compliance`
3. **Cinta de Métricas de Impacto (Contadores Animados con ScrollTrigger):**
   - **4 días → 30 min (-95%):** Reducción en suscripción de pólizas mediante Cloud & IA en MetLife México
   - **+100 Ingenieros / 6 Subdirecciones:** Liderazgo de misión crítica para +100M de registros en el INE
   - **4x Ancho de Banda ($0 OPEX extra):** Enlaces dedicados de 25 a 100 Mbps y ERP Intelisis en Grupo Lefarma
   - **$40 MDP / Semana:** Operación transaccional cloud en Azure para Starbucks y Domino's (Alsea)
   - **100% Cumplimiento Regulado:** Ciberseguridad FortiGate, BCP/DRP y normativa CNBV + Política IA POL-019 en OFINSA
4. **Los 4 Pilares del CIO Moderno (Bento Grid con Spotlight Hover):**
   - Gobierno de TI, Finanzas y Proveedores
   - Infraestructura, Redes y Ciberseguridad
   - Sistemas Corporativos (ERP), Salud y Finanzas
   - Transformación Digital, BI e Inteligencia Artificial
5. **Casos de Éxito Ejecutivos:** Desglose interactivo `Reto · Estrategia Ejecutada · Impacto de Negocio` con KPIs destacados.
6. **Línea de Tiempo Interactiva:** Trazo vertical con barra luminosa que se ilumina con el scroll para seguir la trayectoria directiva.
7. **Educación, Certificaciones y Credenciales:** Grados Universitarios (INFOTEC Maestría, IPN UPIICSA Licenciatura con cédulas federales), Certificaciones Internacionales (SAFe, Google, Azure, Scrum) y Diplomados Ejecutivos (Univ. of Chicago, CENTRO, CISO Club, ITESM), con enlace directo a Credly.
8. **Contacto Ejecutivo Directo & Footer:** Accesos rápidos de un clic a WhatsApp, correo corporativo, LinkedIn, Credly y compositor interactivo de mensajes pre-estructurados.
9. **Modal de CV Ejecutivo:** Modal con doble opción:
   - *CV Ejecutivo Visual:* Formato diagramado de alta gama listo para imprimir o guardar como PDF (`window.print()`).
   - *CV Optimizado para ATS:* Formato de texto estructurado para sistemas Workday, Taleo y Greenhouse, con copia al portapapeles y descarga de archivo `.txt`.

---

## 🚀 Despliegue en GitHub Pages (Inmediato)

### Opción 1: Despliegue Directo desde la Rama (Recomendada)
1. Sube tu código al repositorio en GitHub:
   ```bash
   git add .
   git commit -m "feat: 100% static zero-build C-Level executive portfolio"
   git push -u origin main
   ```
2. En tu repositorio en GitHub, ve a **Settings** > **Pages**.
3. En **Build and deployment** > **Source**, selecciona **Deploy from a branch**.
4. En **Branch**, selecciona `main` y la carpeta `/ (root)`. Haz clic en **Save**.
5. ¡Listo! Tu sitio estará activo en `https://<tu-usuario>.github.io/<tu-repo>/`.

### Opción 2: Despliegue vía GitHub Actions
El repositorio ya incluye el archivo `.github/workflows/deploy.yml`. Si en **Settings** > **Pages** seleccionas **GitHub Actions**, el workflow publicará el sitio automáticamente en cada push.

---

## 💻 Visualización Local

Para ver el sitio en tu máquina local, no necesitas instalar nada:
- **Doble clic:** Haz doble clic en `index.html` para abrirlo directamente en tu navegador favorito.
- **O mediante un servidor estático ligero:**
  ```bash
  # Con Python (si lo tienes instalado):
  python -m http.server 8000

  # O simplemente ábrelo con la extensión Live Server de VS Code.
  ```

---

## 👤 Contacto Directo

- **Nombre:** Fernando Junior Hernández
- **Rol:** Director de Tecnologías de la Información (CIO / CTO)
- **Ubicación:** Ciudad de México, CDMX (Disponibilidad para viajar)
- **Teléfono / WhatsApp:** [+52 55 2297 3001](https://wa.me/525522973001)
- **Correo:** [fernior@gmail.com](mailto:fernior@gmail.com)
- **LinkedIn:** [linkedin.com/in/fernior](https://linkedin.com/in/fernior)
- **Credly:** [credly.com/users/fernando-junior-hernandez](https://credly.com/users/fernando-junior-hernandez)
