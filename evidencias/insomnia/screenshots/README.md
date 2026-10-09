# Evidencias de Pruebas de API - ReqRes

Screenshots de la ejecución manual de la colección de Insomnia con todos los requests de la API ReqRes.

## Organización

Las evidencias están organizadas por grupos funcionales, siguiendo la estructura de la colección:

### 1. Autenticacion (4 requests)
- POST - Login Fallido (Sin Password)
- POST - Login Exitoso  
- POST - Registro Fallido (Sin Password)
- POST - Registro Exitoso

### 2. Recursos (2 requests)
- GET - Obtener Recurso por ID
- GET - Listar Recursos

### 3. Testing de Performance (1 request)
- GET - Respuesta Diferida (3 segundos)

### 4. Usuarios CRUD (7 requests)
- DELETE - Eliminar Usuario
- PATCH - Actualizar Usuario (Parcial)
- PUT - Actualizar Usuario (Completo)
- POST - Crear Usuario
- GET - Usuario No Encontrado (404)
- GET - Obtener Usuario por ID
- GET - Listar Usuarios (Paginado)

## Total de Evidencias

- **14 screenshots** capturados manualmente desde Insomnia
- Cada screenshot muestra:
  - Request completo (método, URL, headers, body)
  - Response (status code, headers, body JSON)
  - Timestamp de ejecución

## Configuración Utilizada

Las pruebas fueron ejecutadas usando API key de ReqRes para evitar límites de rate limiting:
- Límite sin API key: 40 requests/día
- Límite con API key: 250 requests/día
- API key configurada como query parameter en la colección

## Validaciones Confirmadas

Todos los requests retornaron los códigos de estado esperados:
- GET exitosos: 200
- POST crear usuario: 201
- PUT/PATCH: 200
- DELETE: 204
- Registro/Login exitosos: 200
- Errores de validación: 400
- Recurso no encontrado: 404

## Formato de Nombres

Los archivos siguen el patrón:
```
[NUMERO]-[METODO]-[NOMBRE-DESCRIPTIVO].png
```

Ejemplo: `1-POST-Login-Exitoso.png`
