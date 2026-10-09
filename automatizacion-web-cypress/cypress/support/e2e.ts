// ***********************************************************
// Este archivo de soporte e2e.ts se procesa y carga
// automáticamente antes de los archivos de prueba.
//
// Este es un excelente lugar para colocar configuración global
// y comportamiento que modifica Cypress.
//
// Puede cambiar la ubicación de este archivo o desactivar
// la carga automática de archivos de soporte con la opción
// de configuración 'supportFile'.
//
// Puede leer más aquí:
// https://on.cypress.io/configuration
// ***********************************************************

// Importar commands.ts usando sintaxis ES2015:
import './commands';

// Alternativamente puede usar sintaxis CommonJS:
// require('./commands')

declare global {
  namespace Cypress {
    interface Chainable {
      // Agregar tipos de comandos personalizados aquí si es necesario
    }
  }
}
