# Prueba Técnica - QA Full Stack
## Somos Makers

[![Full Test Suite](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/full-suite.yml/badge.svg)](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/full-suite.yml)
[![Cypress E2E Tests](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/cypress.yml/badge.svg)](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/cypress.yml)
[![Playwright E2E Tests](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/playwright.yml/badge.svg)](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/playwright.yml)
[![API Tests](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/api-tests.yml/badge.svg)](https://github.com/Merxxotas/prueba-tecnica-somos-makers/actions/workflows/api-tests.yml)

Este repositorio contiene la solución completa para la prueba técnica de QA Full Stack, demostrando experiencia en automatización web, testing de APIs, y diseño de casos de prueba funcionales.

---

## Módulos del Proyecto

### 1. Automatización Web (Cypress + Playwright)
- **Aplicación:** [SauceDemo](https://www.saucedemo.com/)
- **Frameworks:** Cypress y Playwright con TypeScript
- **Enfoque:** BDD con Gherkin/Cucumber
- **Cobertura:** Smoke tests de login + casos extendidos
- Carpeta: `automatizacion-web-cypress/`
- Carpeta: `automatizacion-web-playwright/`

### 2. Testing de APIs (Insomnia + Automation)
- **API:** [ReqRes](https://reqres.in/api/)
- **Herramientas:** Insomnia + Script de automatización Node.js
- **Cobertura:** 14 requests (CRUD usuarios, recursos, autenticación, performance)
- **Automatización:** 100% (14/14 pruebas pasadas)
- **Colección:** `pruebas-api/insomnia/reqres-api-collection.json`
- Carpeta: `pruebas-api/`

### 3. Testing Funcional (MakersPay)
- **Producto:** Billetera digital ficticia
- **Entregables:** Escenarios Gherkin, casos de prueba, reporte de bugs
- **Técnicas:** Partición de equivalencia, valores límite, tablas de decisión
- Carpeta: `pruebas-funcionales/`

---

## Tecnologías Utilizadas

[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?style=for-the-badge&logo=insomnia&logoColor=white)](https://insomnia.rest/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

---

## Estructura del Proyecto

```
prueba-tecnica-somos-makers/
├── automatizacion-web-cypress/      # Smoke tests Cypress + Gherkin
├── automatizacion-web-playwright/   # Smoke tests Playwright + Gherkin
├── pruebas-api/
│   └── insomnia/                   # Colección completa de API ReqRes
│       ├── reqres-api-collection.json  # 14 requests organizados
│       ├── README.md               # Documentación de la colección
│       └── AUTOMATION.md           # Guía de automatización
├── pruebas-funcionales/            # Documentación MakersPay
├── evidencias/                     # Videos, screenshots y reportes
│   ├── cypress/                    # Evidencias de Cypress
│   ├── playwright/                 # Evidencias de Playwright
│   ├── insomnia/                   # Evidencias de API + reportes JSON
│   └── seleccion/                  # Evidencias destacadas
├── scripts/                        # Scripts de utilidad
│   ├── test-api.js                 # Automatización de pruebas de API
│   └── capturar-evidencias.js      # Generación de evidencias
├── .github/
│   └── workflows/                  # Pipelines de CI/CD
└── README.md
```

---

## Instalación y Ejecución

### Prerequisitos
- Node.js >= 18.x
- pnpm >= 9.x
- Git

### Instalación
```bash
# Clonar el repositorio
git clone git@github.com:Merxxotas/prueba-tecnica-somos-makers.git
cd prueba-tecnica-somos-makers

# Instalar dependencias
pnpm install
```

### Ejecución de Tests

**Cypress:**
```bash
pnpm test:cypress          # Modo headless
pnpm test:cypress:open     # Interfaz interactiva
```

**Playwright:**
```bash
pnpm test:playwright            # Cucumber headless con reporte HTML y JSON
pnpm test:playwright:headed     # Cucumber con navegador visible
pnpm test:playwright:ui         # Playwright UI con los 18 escenarios de login
pnpm test:playwright:regression # Regresión local de la espera de login, sin red
```

`pnpm test:playwright:ui` genera los casos nativos desde `automatizacion-web-playwright/features/login.feature` y abre la interfaz interactiva de Playwright. La lista se mantiene sincronizada con los escenarios Gherkin existentes. `pnpm test:playwright` conserva el runner Cucumber headless y `pnpm test:playwright:headed` ejecuta ese mismo runner con Chromium visible.

**Pruebas de API (Automatizadas):**
```bash
pnpm test:api
```

Esto ejecuta:
- Los 14 requests de la colección de Insomnia
- Validación automática de códigos de estado HTTP
- Generación de reporte JSON en `evidencias/insomnia/test-report.json`
- Output con colores en consola
- Exit code 0 (todas pasaron) o 1 (alguna falló)

Ver documentación completa en [`pruebas-api/insomnia/AUTOMATION.md`](./pruebas-api/insomnia/AUTOMATION.md)

**Colección de API (Insomnia - Manual):**

1. Importar colección en Insomnia:
   - Abrir Insomnia
   - Create → Import From → File
   - Seleccionar `pruebas-api/insomnia/reqres-api-collection.json`

2. La colección incluye:
   - 7 requests CRUD de usuarios
   - 2 requests de recursos
   - 4 requests de autenticación (registro/login)
   - 1 request de testing de performance

Ver documentación completa en [`pruebas-api/insomnia/README.md`](./pruebas-api/insomnia/README.md)

---

## Reportes y Evidencias

### Evidencias Disponibles

Todas las evidencias de ejecución están disponibles en la carpeta [`evidencias/`](./evidencias/):

- **Videos:** 54 grabaciones de ejecución (3.4 MB)
- **Screenshots:** 108 capturas de pantalla (4.6 MB)
- **Reportes HTML:** Reportes interactivos de Cucumber
- **Tasa de éxito:** 100% (36/36 pruebas pasadas)

### Reportes Interactivos (Online & Local)

> [!TIP]
> **Dashboard Online en GitHub Pages:** Accede a la visualización interactiva y renderizada de todos los reportes en vivo con un solo clic:  
> 🌐 **[https://merxxotas.github.io/prueba-tecnica-somos-makers/](https://merxxotas.github.io/prueba-tecnica-somos-makers/)**

#### Enlaces Directos en GitHub Pages:
- 🌲 **Cypress (Cucumber HTML):** [Ver Reporte Cypress Online](https://merxxotas.github.io/prueba-tecnica-somos-makers/cypress/cucumber-report.html)
- 🎭 **Playwright (Cucumber HTML):** [Ver Reporte Playwright Online](https://merxxotas.github.io/prueba-tecnica-somos-makers/playwright/cucumber-report.html)
- 🎭 **Playwright (Reporte Nativo):** [Ver Reporte Playwright Nativo](https://merxxotas.github.io/prueba-tecnica-somos-makers/playwright-report/index.html)
- ⚡ **API ReqRes (JSON):** [Ver Reporte de API](https://merxxotas.github.io/prueba-tecnica-somos-makers/api/test-report.json)

#### Visualización Local:
Al navegar archivos `.html` directamente en la web de GitHub, la plataforma muestra el código fuente plano por motivos de seguridad. Para verlos renderizados en local:

1. **Abrir directamente en navegador:**
   ```bash
   # Linux
   xdg-open evidencias/cypress/cucumber-report/cucumber-report.html
   # macOS
   open evidencias/cypress/cucumber-report/cucumber-report.html
   # Windows
   start evidencias/cypress/cucumber-report/cucumber-report.html
   ```

2. **Servidor local rápido:**
   ```bash
   pnpm dlx serve evidencias
   ```

3. **Reporte nativo de Playwright:**
   ```bash
   pnpm exec playwright show-report automatizacion-web-playwright/playwright-report
   ```

### Selección de Evidencias Clave

En [`evidencias/seleccion/`](./evidencias/seleccion/) se encuentran las evidencias más representativas:

- **Login exitoso:** Screenshots del flujo completo
- **Mensajes de error:** Validaciones de campos vacíos y credenciales inválidas
- **Videos destacados:** Ejecuciones completas de casos críticos

### Generar Nuevas Evidencias

```bash
# Ejecutar todas las pruebas y generar evidencias
pnpm evidencias

# O ejecutar frameworks por separado
pnpm test:cypress       # Genera reportes de Cypress
pnpm test:playwright    # Genera screenshots y videos de Playwright
```

**Nota:** Los videos y screenshots se generan automáticamente durante la ejecución y se copian a la carpeta `evidencias/` para documentación.

---

## Seguimiento de Bugs

Este proyecto utiliza **GitHub Projects** con:
- Vista **Kanban** para gestión de tareas
- Vista **Bug Tracker** para seguimiento de defectos
- Labels personalizados por severidad, módulo y tipo

[Ver GitHub Projects](https://github.com/Merxxotas/prueba-tecnica-somos-makers/projects)

---

## CI/CD

El proyecto cuenta con una infraestructura de integración continua completa en **GitHub Actions**, organizada en 4 workflows independientes y paralelizados:

### Workflows Configurados (`.github/workflows/`)

1. **`full-suite.yml` (Full Test Suite):**
   - Ejecución en **paralelo** de Cypress, Playwright y API Testing.
   - Generación de resumen consolidado en `$GITHUB_STEP_SUMMARY`.
   - Tiempo estimado de ejecución: **< 3 minutos**.

2. **`cypress.yml` (Cypress E2E Tests):**
   - Ejecuta los 18 escenarios de smoke test de SauceDemo.
   - Publica reportes HTML de Cucumber, capturas de pantalla y videos como artifacts.

3. **`playwright.yml` (Playwright E2E Tests):**
   - Ejecuta suite de regresión (`tsx --test`), suite Cucumber (`cucumber-js`) y suite nativa (`playwright test`).
   - Publica reportes HTML interactivos, traces y videos como artifacts.

4. **`api-tests.yml` (API Tests):**
   - Instala y ejecuta la colección ReqRes con **inso-cli** (Kong Insomnia CLI v13.3.1).
   - Ejecuta las 14 aserciones automatizadas en Node.js (`pnpm test:api`).
   - Publica el reporte de ejecución JSON como artifact.

### Disparadores (Triggers)
- **Pull Requests:** Validación automática contra la rama `main`.
- **Push a `main`:** Ejecución de suites completas y generación de artefactos.
- **Manual (`workflow_dispatch`):** Permite ejecutar cualquier pipeline bajo demanda desde la pestaña de Actions en GitHub.

---

## Convención de Commits

Este proyecto sigue **Conventional Commits** en español:
- `feat:` nuevas funcionalidades
- `test:` nuevos tests o modificaciones
- `docs:` documentación
- `fix:` correcciones de bugs
- `chore:` tareas de mantenimiento

### Ejemplos:
```bash
feat(cypress): agregar smoke tests de login
test(api): agregar casos de prueba para endpoint de usuarios
docs: actualizar guía de instalación
fix(playwright): corregir selector de botón de login
chore: actualizar dependencias de Cypress
```

---

## Autor

**Merxxotas**  
QA Full Stack Engineer

---

## Licencia

Este proyecto es parte de una prueba técnica para Somos Makers.
