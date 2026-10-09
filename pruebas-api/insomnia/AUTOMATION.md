# Automatización de Pruebas de API

Sistema de automatización completo para las pruebas de API de ReqRes usando Node.js.

## Script de Automatización

El script `scripts/test-api.js` ejecuta automáticamente toda la colección de Insomnia y genera reportes detallados.

### Características

- **Ejecución Automática**: Ejecuta los 14 requests de la colección
- **Validación de Respuestas**: Verifica códigos de estado HTTP esperados
- **Reporte en Tiempo Real**: Output con colores en consola
- **Reporte JSON**: Genera archivo JSON con resultados detallados
- **Agrupación por Categorías**: Organiza resultados por grupos funcionales
- **Estadísticas Completas**: Total, pasadas, fallidas, duración, porcentaje de éxito

## Uso

### Ejecutar Todas las Pruebas

```bash
pnpm test:api
```

### Ejecutar con Node Directamente

```bash
node scripts/test-api.js
```

## Output de Ejemplo

```
==============================================
API Testing - ReqRes Collection
Base URL: https://reqres.in
Total Requests: 14
==============================================

[Usuarios (CRUD)]

  [PASS] GET GET - Listar Usuarios (Paginado) (200) - 209ms
  [PASS] GET GET - Obtener Usuario por ID (200) - 67ms
  [PASS] GET GET - Usuario No Encontrado (404) - 162ms
  [PASS] POST POST - Crear Usuario (201) - 272ms
  [PASS] PUT PUT - Actualizar Usuario (Completo) (200) - 160ms
  [PASS] PATCH PATCH - Actualizar Usuario (Parcial) (200) - 159ms
  [PASS] DELETE DELETE - Eliminar Usuario (204) - 158ms

[Recursos]

  [PASS] GET GET - Listar Recursos (200) - 60ms
  [PASS] GET GET - Obtener Recurso por ID (200) - 59ms

[Autenticacion]

  [PASS] POST POST - Registro Exitoso (200) - 155ms
  [PASS] POST POST - Registro Fallido (Sin Password) (400) - 156ms
  [PASS] POST POST - Login Exitoso (200) - 161ms
  [PASS] POST POST - Login Fallido (Sin Password) (400) - 157ms

[Testing de Performance]

  [PASS] GET GET - Respuesta Diferida (3 segundos) (200) - 3166ms

==============================================
Test Summary
==============================================
Total:    14
Passed:   14
Failed:   0
Duration: 5101ms
Success:  100.0%
==============================================
```

## Reporte JSON

El script genera automáticamente un reporte JSON en `evidencias/insomnia/test-report.json` con:

```json
{
  "timestamp": "2026-10-09T20:58:00.000Z",
  "stats": {
    "total": 14,
    "passed": 14,
    "failed": 0,
    "duration": 5101
  },
  "results": [
    {
      "name": "GET - Listar Usuarios (Paginado)",
      "method": "GET",
      "url": "https://reqres.in/api/users?page=2",
      "status": 200,
      "statusText": "OK",
      "duration": 209,
      "passed": true,
      "expectedStatuses": [200],
      "responseBody": { ... }
    }
  ]
}
```

## Validaciones Implementadas

El script valida automáticamente los códigos de estado HTTP esperados para cada tipo de request:

| Tipo de Request | Código Esperado |
|-----------------|-----------------|
| GET (exitoso) | 200 |
| POST Crear Usuario | 201 |
| PUT/PATCH | 200 |
| DELETE | 204 |
| Registro/Login exitoso | 200 |
| Registro/Login fallido | 400 |
| Recurso no encontrado | 404 |

## Integración con CI/CD

El script retorna exit code según el resultado:
- **Exit 0**: Todas las pruebas pasaron
- **Exit 1**: Una o más pruebas fallaron

Esto permite integración directa con pipelines de CI/CD.

## Estructura del Script

1. **Carga de Colección**: Lee `reqres-api-collection.json`
2. **Configuración**: Extrae baseURL y variables de entorno
3. **Ejecución**: Itera por todos los requests
4. **Validación**: Compara status code con el esperado
5. **Reporte**: Muestra resultados en tiempo real
6. **Persistencia**: Guarda reporte JSON para análisis

## Ventajas sobre inso-cli

- ✅ **Sin dependencias externas**: Solo Node.js nativo
- ✅ **Personalizable**: Fácil de extender con más validaciones
- ✅ **Reportes detallados**: Output formateado y JSON estructurado
- ✅ **Control total**: Manejo completo de requests y respuestas
- ✅ **Integración simple**: Compatible con cualquier CI/CD
- ✅ **Debugging**: Acceso completo a request/response para análisis

## Extensiones Futuras

El script puede extenderse para incluir:
- Validación de schema JSON con JSON Schema
- Assertions sobre el body de respuesta
- Tests de performance (tiempo de respuesta)
- Retry logic para requests fallidos
- Parallel execution para mayor velocidad
- Coverage reports detallados
