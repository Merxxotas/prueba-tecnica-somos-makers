# Ejecutar Colección con inso-cli

Guía para ejecutar la colección de Insomnia usando inso-cli desde la línea de comandos.

## Instalación de inso-cli

inso-cli ya no está disponible vía npm. Se instala descargando el binario desde el sitio oficial.

### Linux

1. Descargar el archivo tar desde: https://developer.konghq.com/inso-cli/
2. Extraer el archivo:
   ```bash
   tar -xzf inso-cli-linux.tar.gz
   ```
3. Mover el binario a un directorio en tu PATH:
   ```bash
   mv inso-cli/inso ~/.local/bin/inso-cli
   chmod +x ~/.local/bin/inso-cli
   ```
4. Verificar instalación:
   ```bash
   inso-cli --version
   ```

### Windows

1. Descargar el archivo .zip desde: https://developer.konghq.com/inso-cli/
2. Extraer el archivo
3. Agregar la carpeta extraída al PATH de Windows
4. Abrir nueva terminal y verificar:
   ```bash
   inso-cli --version
   ```

### macOS

1. Instalar con Homebrew:
   ```bash
   brew install inso
   ```
2. Verificar instalación:
   ```bash
   inso --version
   ```

## Ejecutar la Colección

Una vez instalado inso-cli, ejecutar desde la raíz del proyecto:

```bash
cd /home/merxx/Projects/prueba-tecnica-somos-makers

# Ejecutar toda la colección
inso-cli run collection wrk_main \
  -w pruebas-api/insomnia/reqres-api-collection.json \
  -e env_base
```

### Parámetros

- `wrk_main`: ID del workspace en la colección
- `-w`: Path al archivo de la colección
- `-e`: Environment a usar (env_base contiene baseURL y API keys)

### Output Esperado

inso-cli ejecutará los 14 requests y mostrará:
- Estado de cada request (pasó/falló)
- Tiempos de respuesta
- Códigos de estado HTTP
- Resumen final de resultados

## Notas

- inso-cli requiere que todos los requests tengan tests definidos para validaciones
- Actualmente la colección no tiene tests de Insomnia, solo se ejecutan los requests
- Para agregar validaciones, editar la colección en Insomnia y agregar tests en cada request

## Alternativa: Script Automatizado

El proyecto incluye un script Node.js custom que ejecuta la colección con validaciones:

```bash
pnpm test:api
```

Este script:
- No requiere inso-cli
- Valida códigos de estado HTTP automáticamente
- Genera reporte JSON en `evidencias/insomnia/test-report.json`
- Output con colores en consola
- Exit codes para CI/CD

Ver documentación completa en `pruebas-api/insomnia/AUTOMATION.md`
