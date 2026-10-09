// ***********************************************
// Este archivo commands.ts muestra cómo crear
// varios comandos personalizados y sobrescribir
// comandos existentes.
//
// Para ejemplos más completos de comandos
// personalizados, por favor lea más aquí:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

// Ejemplo de comando personalizado para login (puede extenderse más adelante)
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Comando personalizado para iniciar sesión en SauceDemo
       * @example cy.login('standard_user', 'secret_sauce')
       */
      login(username: string, password: string): Chainable<void>;
    }
  }
}

export {};
