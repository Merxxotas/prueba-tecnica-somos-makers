# Colecciones de Insomnia - API ReqRes

Colecciones completas de Insomnia para testing de la API ReqRes (https://reqres.in).

## Contenido

### Colección Principal: `reqres-api-collection.json`

La colección incluye 14 requests organizadas en 4 grupos:

#### 1. Usuarios (CRUD)
- **GET - Listar Usuarios (Paginado)**: Obtiene lista de usuarios con paginación
- **GET - Obtener Usuario por ID**: Obtiene detalles de usuario específico
- **GET - Usuario No Encontrado**: Caso de prueba para usuario inexistente (404)
- **POST - Crear Usuario**: Crea nuevo usuario con nombre y trabajo
- **PUT - Actualizar Usuario (Completo)**: Actualización completa de usuario
- **PATCH - Actualizar Usuario (Parcial)**: Actualización parcial de campos
- **DELETE - Eliminar Usuario**: Elimina usuario (retorna 204)

#### 2. Recursos
- **GET - Listar Recursos**: Obtiene lista de recursos genéricos
- **GET - Obtener Recurso por ID**: Obtiene recurso específico

#### 3. Autenticación
- **POST - Registro Exitoso**: Registra usuario con email y password
- **POST - Registro Fallido**: Intenta registro sin password (retorna 400)
- **POST - Login Exitoso**: Inicia sesión y retorna token
- **POST - Login Fallido**: Intenta login sin password (retorna 400)

#### 4. Testing de Performance
- **GET - Respuesta Diferida (3 segundos)**: Simula respuesta lenta para testing de timeouts

## Configuración

### Variables de Entorno

La colección usa variables de entorno para la configuración:

```json
{
  "baseURL": "https://reqres.in",
  "publicKey": "pub_...",
  "serverKey": "pro_..."
}
```

- `baseURL`: URL base de la API ReqRes
- `publicKey`: API key pública (250 requests/día)
- `serverKey`: API key de servidor (límite mayor)

**Nota sobre API Keys:** La colección incluye configuración para usar API keys de ReqRes y evitar el límite de 40 requests/día. Las keys se pasan como query parameter `api_key` en cada request. Para obtener tus propias keys, crear cuenta en https://app.reqres.in/sign-up

### Importar en Insomnia

1. Abrir Insomnia
2. Click en "Create" → "Import From" → "File"
3. Seleccionar `reqres-api-collection.json`
4. La colección se importará con todos los requests y variables configuradas

## Uso

### Ejecutar Requests Individuales

1. Navegar al request deseado en la barra lateral
2. Click en "Send"
3. Verificar respuesta en el panel derecho

### Casos de Prueba Cubiertos

#### Casos Positivos
- Listar usuarios con paginación
- Obtener usuario existente
- Crear usuario nuevo
- Actualizar usuario (PUT y PATCH)
- Eliminar usuario
- Registro exitoso
- Login exitoso

#### Casos Negativos
- Usuario no encontrado (404)
- Registro sin password (400)
- Login sin password (400)

#### Casos de Performance
- Respuesta diferida para testing de timeouts

## Estructura de Respuestas

### GET /api/users?page=2
```json
{
  "page": 2,
  "per_page": 6,
  "total": 12,
  "total_pages": 2,
  "data": [
    {
      "id": 7,
      "email": "michael.lawson@reqres.in",
      "first_name": "Michael",
      "last_name": "Lawson",
      "avatar": "https://reqres.in/img/faces/7-image.jpg"
    }
  ]
}
```

### POST /api/users
```json
{
  "name": "Juan Pérez",
  "job": "QA Automation Engineer",
  "id": "123",
  "createdAt": "2026-10-09T20:50:00.000Z"
}
```

### POST /api/register (exitoso)
```json
{
  "id": 4,
  "token": "QpwL5tke4Pnpja7X4"
}
```

### POST /api/register (fallido)
```json
{
  "error": "Missing password"
}
```

## Códigos de Estado Esperados

| Endpoint | Método | Código Exitoso | Código Error |
|----------|--------|----------------|--------------|
| /api/users | GET | 200 | - |
| /api/users/:id | GET | 200 | 404 |
| /api/users | POST | 201 | - |
| /api/users/:id | PUT | 200 | - |
| /api/users/:id | PATCH | 200 | - |
| /api/users/:id | DELETE | 204 | - |
| /api/register | POST | 200 | 400 |
| /api/login | POST | 200 | 400 |

## Evidencias

Los screenshots de las pruebas ejecutadas manualmente se encuentran en `evidencias/insomnia/screenshots/`, organizados por grupos:

- **1-Autenticacion/**: 4 screenshots de endpoints de registro y login
- **2-Recursos/**: 2 screenshots de endpoints de recursos
- **3-Testing-Performance/**: 1 screenshot de respuesta diferida
- **4-Usuarios-(CRUD)/**: 7 screenshots de operaciones CRUD

**Total: 14 screenshots** capturados desde Insomnia mostrando requests y responses completos.

Ver documentación completa en `evidencias/insomnia/screenshots/README.md`

## Notas Importantes

1. **ReqRes es una API mock**: Los datos no se persisten realmente. Las operaciones POST/PUT/PATCH/DELETE retornan respuestas simuladas.

2. **Autenticación**: Los endpoints de registro y login usan emails predefinidos en la base de datos de ReqRes. Para pruebas exitosas usar:
   - Email: `eve.holt@reqres.in`
   - Password: cualquier string

3. **Paginación**: La API soporta parámetro `page` para paginar resultados (6 items por página).

4. **Delay**: Se puede agregar `?delay=N` a cualquier request para simular latencia de red.

## Automatización

Para automatizar estas pruebas, ver Issue #4 que implementa testing con `inso-cli`.
