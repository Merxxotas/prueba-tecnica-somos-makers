/**
 * LoginPage - Page Object Model para la página de login de SauceDemo
 * Encapsula todos los elementos e interacciones de la página de inicio de sesión
 */
export class LoginPage {
  // Selectores
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';
  private readonly errorButton = '.error-button';

  // URLs y elementos esperados
  private readonly baseUrl = 'https://www.saucedemo.com/';
  private readonly inventoryUrl = 'https://www.saucedemo.com/inventory.html';
  private readonly productsTitle = '.title';

  /**
   * Navegar a la página de login de SauceDemo
   */
  visit(): void {
    cy.visit(this.baseUrl);
  }

  /**
   * Ingresar nombre de usuario en el campo de username
   * @param username - El nombre de usuario a ingresar
   */
  enterUsername(username: string): void {
    cy.get(this.usernameInput).clear().type(username);
  }

  /**
   * Ingresar contraseña en el campo de password
   * @param password - La contraseña a ingresar
   */
  enterPassword(password: string): void {
    cy.get(this.passwordInput).clear().type(password);
  }

  /**
   * Hacer clic en el botón de login
   */
  clickLoginButton(): void {
    cy.get(this.loginButton).click();
  }

  /**
   * Verificar que el usuario sea redirigido a la página de inventario
   */
  verifyInventoryPageUrl(): void {
    cy.url().should('eq', this.inventoryUrl);
  }

  /**
   * Verificar que el usuario permanezca en la página de login
   */
  verifyLoginPageUrl(): void {
    cy.url().should('eq', this.baseUrl);
  }

  /**
   * Verificar que el título de productos sea visible
   */
  verifyProductsTitle(): void {
    cy.get(this.productsTitle).should('be.visible').and('contain', 'Products');
  }

  /**
   * Verificar que se muestre un mensaje de error con texto específico
   * @param expectedMessage - El texto esperado del mensaje de error
   */
  verifyErrorMessage(expectedMessage: string): void {
    cy.get(this.errorMessage)
      .should('be.visible')
      .and('contain.text', expectedMessage);
  }

  /**
   * Verificar que el botón de error sea visible
   */
  verifyErrorButtonVisible(): void {
    cy.get(this.errorButton).should('be.visible');
  }

  /**
   * Limpiar el campo de nombre de usuario
   */
  clearUsername(): void {
    cy.get(this.usernameInput).clear();
  }

  /**
   * Limpiar el campo de contraseña
   */
  clearPassword(): void {
    cy.get(this.passwordInput).clear();
  }

  /**
   * Completar flujo de login (nombre de usuario + contraseña + clic)
   * @param username - El nombre de usuario a utilizar
   * @param password - La contraseña a utilizar
   */
  login(username: string, password: string): void {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  /**
   * Verificar login exitoso (redirección + título de productos)
   */
  verifySuccessfulLogin(): void {
    this.verifyInventoryPageUrl();
    this.verifyProductsTitle();
  }
}
