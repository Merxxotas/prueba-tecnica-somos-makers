# Evidencias de Pruebas - Somos Makers

Este directorio contiene las evidencias de ejecución de todas las pruebas automatizadas realizadas para la prueba técnica.

## Estructura

```
evidencias/
├── cypress/
│   ├── videos/           # Videos de ejecución Cypress
│   ├── screenshots/      # Capturas de pantalla Cypress
│   └── cucumber-report/  # Reportes HTML/JSON de Cucumber
├── playwright/
│   ├── videos/           # Videos de ejecución Playwright
│   ├── screenshots/      # Capturas de pantalla Playwright
│   └── cucumber-report/  # Reportes HTML/JSON de Cucumber
└── insomnia/
    └── screenshots/      # Capturas de colecciones y resultados API
```

## Reportes Disponibles

### Cypress - Automatización Web
- **Reporte HTML:** [`cypress/cucumber-report/cucumber-report.html`](cypress/cucumber-report/cucumber-report.html)
- **Datos JSON:** [`cypress/cucumber-report/cucumber-report.json`](cypress/cucumber-report/cucumber-report.json)
- **Escenarios:** 18 escenarios de login cubiertos
- **Tecnología:** Cypress 16 + Cucumber + TypeScript

### Playwright - Automatización Web
- **Reporte HTML:** [`playwright/cucumber-report/cucumber-report.html`](playwright/cucumber-report/cucumber-report.html)
- **Datos JSON:** [`playwright/cucumber-report/cucumber-report.json`](playwright/cucumber-report/cucumber-report.json)
- **Escenarios:** 18 escenarios de login cubiertos
- **Tecnología:** Playwright + Cucumber + TypeScript

## Cómo Visualizar las Evidencias

### Reportes HTML
Los reportes de Cucumber son interactivos y muestran:
- ✅ Escenarios ejecutados con su estado (passed/failed)
- 📝 Pasos detallados de cada escenario
- ⏱️ Tiempos de ejecución
- 🏷️ Tags y metadata

**Para visualizar:**
```bash
# Abrir reporte de Cypress
open evidencias/cypress/cucumber-report/cucumber-report.html

# Abrir reporte de Playwright
open evidencias/playwright/cucumber-report/cucumber-report.html
```

### Videos
Los videos capturan la ejecución completa de los escenarios de prueba, mostrando:
- Navegación del navegador
- Interacciones con elementos
- Validaciones realizadas
- Tiempos reales de ejecución

### Screenshots
Las capturas de pantalla documentan:
- Estados específicos de la aplicación
- Errores y validaciones
- Casos de prueba particulares
- Evidencia visual de cobertura

## Generación de Evidencias

Las evidencias se generan automáticamente al ejecutar las pruebas:

```bash
# Generar evidencias de Cypress
pnpm test:cypress

# Generar evidencias de Playwright
pnpm test:playwright
```

## Resumen de Cobertura

### Funcionalidad de Login (SauceDemo)

**Escenarios Cubiertos:**
1. ✅ Login exitoso con credenciales válidas
2. ✅ Login fallido con contraseña incorrecta
3. ✅ Validación de campo vacío - usuario
4. ✅ Validación de campo vacío - contraseña
5. ✅ Validación de ambos campos vacíos
6. ✅ Intento con usuario bloqueado
7. ✅ Login con usuario problema
8. ✅ Login con usuario de problema de rendimiento
9. ✅ Login con usuario de error
10. ✅ Login con usuario visual
11. ✅ Login con espacio al inicio del usuario
12. ✅ Login con espacio al final del usuario
13. ✅ Login con caracteres especiales
14. ✅ Login con formato de email
15. ✅ Login con usuario numérico
16. ✅ Login con usuario en mayúsculas
17. ✅ Intento de inyección SQL
18. ✅ Intento de ataque XSS

**Total:** 36 pruebas ejecutadas (18 en Cypress + 18 en Playwright)  
**Tasa de éxito:** 100% (36/36 passed)

## Notas

- Las evidencias se actualizan con cada ejecución de pruebas
- Los reportes HTML son la fuente principal de evidencia visual
- Videos y screenshots complementan la documentación
- Todos los archivos están versionados en el repositorio

---

**Fecha de última actualización:** 9 de Octubre, 2024  
**Autor:** Merxxotas  
**Proyecto:** Prueba Técnica QA Full Stack - Somos Makers
