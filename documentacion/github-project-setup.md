# GitHub Project - Configuración Manual

## Crear el Project

1. Ir a: https://github.com/Merxxotas/prueba-tecnica-somos-makers/projects
2. Hacer clic en "New project"
3. Nombre: `Prueba Técnica QA Full Stack`
4. Descripción: `Gestión de tareas y seguimiento de bugs para la prueba técnica de Somos Makers`

## Vista 1: Kanban (Gestión de Tareas)

### Configuración
- **Nombre**: Board
- **Layout**: Board
- **Group by**: Status

### Columnas
1. **Backlog** - Tareas pendientes de iniciar
2. **Ready** - Tareas listas para trabajar
3. **In Progress** - Tareas en desarrollo
4. **In Review** - Tareas en revisión/testing
5. **Done** - Tareas completadas

### Campos Personalizados
- **Módulo**: Select (Cypress, Playwright, API, Funcional, Documentación)
- **Prioridad**: Select (Alta, Media, Baja)
- **Estimación**: Number (horas)

## Vista 2: Bug Tracker

### Configuración
- **Nombre**: Bug Tracker
- **Layout**: Table
- **Filter**: Label = "bug"

### Columnas Visibles
1. Title
2. Status
3. Severity (Custom field)
4. Module (Custom field)
5. Assignee
6. Created
7. Updated

### Campos Personalizados Adicionales
- **Severidad**: Select (Crítica, Alta, Media, Baja)
- **Tipo**: Select (Bug, Mejora, Tarea, Documentación)
- **Ambiente**: Select (Cypress, Playwright, API, Local, CI/CD)

## Labels a Crear

### Por Tipo
- `bug` - Defectos encontrados
- `enhancement` - Mejoras
- `documentation` - Documentación
- `test` - Relacionado con pruebas

### Por Módulo
- `cypress` - Automatización con Cypress
- `playwright` - Automatización con Playwright
- `api` - Pruebas de API
- `functional` - Pruebas funcionales

### Por Severidad
- `severity: critical` - Bloqueante
- `severity: high` - Alta prioridad
- `severity: medium` - Prioridad media
- `severity: low` - Prioridad baja

### Por Estado
- `status: blocked` - Bloqueado
- `status: in-progress` - En progreso
- `status: review` - En revisión

## Tareas Iniciales para Backlog

### Módulo Cypress (Completado)
- [x] Configurar estructura base del proyecto
- [x] Configurar Cypress con preprocesador Cucumber
- [x] Escribir escenarios Gherkin para login
- [x] Implementar Page Object Model
- [x] Verificar pruebas localmente

### Módulo Playwright (Siguiente)
- [ ] Configurar Playwright con TypeScript
- [ ] Configurar Playwright con Cucumber
- [ ] Replicar escenarios de login en Playwright
- [ ] Implementar Page Object Model para Playwright
- [ ] Verificar pruebas localmente

### Módulo API
- [ ] Crear colecciones de Insomnia para ReqRes API
- [ ] Implementar pruebas CRUD básicas
- [ ] Agregar casos extendidos de API
- [ ] Automatizar con inso-cli
- [ ] Documentar endpoints y respuestas

### Módulo Funcional
- [ ] Diseñar casos de prueba para MakersPay
- [ ] Escribir escenarios Gherkin funcionales
- [ ] Crear matriz de técnicas de testing
- [ ] Documentar bugs encontrados
- [ ] Generar reporte de testing

### CI/CD
- [ ] Configurar GitHub Actions para Cypress
- [ ] Configurar GitHub Actions para Playwright
- [ ] Configurar GitHub Actions para API tests
- [ ] Configurar artifacts de reportes
- [ ] Configurar notificaciones

### Documentación
- [ ] Completar README principal
- [ ] Documentar arquitectura de pruebas
- [ ] Crear guía de contribución
- [ ] Documentar convenciones de código
- [ ] Crear documentación de resultados

## Automatización con PR

Cuando se cree un PR, automáticamente:
1. Se agrega al Project
2. Se mueve a columna "In Review"
3. Al mergear, se mueve a "Done"

## Notas

- Usar conventional commits en español
- Sin emojis en ninguna parte
- Todo profesional y documentado
- Seguir las mejores prácticas de QA
