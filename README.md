# Prueba Técnica - QA Full Stack
## Somos Makers

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
- **Herramientas:** Insomnia + inso-cli + scripts automatizados
- **Cobertura:** Operaciones CRUD + casos adicionales
- Carpeta: `pruebas-api/`

### 3. Testing Funcional (MakersPay)
- **Producto:** Billetera digital ficticia
- **Entregables:** Escenarios Gherkin, casos de prueba, reporte de bugs
- **Técnicas:** Partición de equivalencia, valores límite, tablas de decisión
- Carpeta: `pruebas-funcionales/`

---

## Tecnologías Utilizadas

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-4000BF?style=for-the-badge&logo=insomnia&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## Estructura del Proyecto

```
prueba-tecnica-somos-makers/
├── automatizacion-web-cypress/      # Smoke tests Cypress + Gherkin
├── automatizacion-web-playwright/   # Smoke tests Playwright + Gherkin
├── pruebas-api/
│   ├── insomnia/                   # Colecciones de Insomnia
│   └── automatizadas/              # Scripts automatizados de API
├── pruebas-funcionales/            # Documentación MakersPay
├── documentacion/                  # Documentación técnica
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
pnpm test:playwright       # Modo headless
pnpm test:playwright:ui    # Interfaz interactiva
```

**Pruebas de API (Insomnia):**
```bash
pnpm test:api
```

---

## Reportes y Evidencias

- **Grabaciones de Video:** Capturadas automáticamente en cada ejecución
- **Capturas de Pantalla:** En fallos y puntos clave
- **Reportes HTML:** Generados por Cypress y Playwright
- **Artefactos de CI:** Disponibles en ejecuciones de GitHub Actions

---

## Seguimiento de Bugs

Este proyecto utiliza **GitHub Projects** con:
- Vista **Kanban** para gestión de tareas
- Vista **Bug Tracker** para seguimiento de defectos
- Labels personalizados por severidad, módulo y tipo

[Ver GitHub Projects](https://github.com/Merxxotas/prueba-tecnica-somos-makers/projects)

---

## CI/CD

Los pipelines de GitHub Actions se ejecutan automáticamente en:
- **Pull Requests:** Tests completos + linting
- **Push a main:** Suite completa + generación de reportes

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
