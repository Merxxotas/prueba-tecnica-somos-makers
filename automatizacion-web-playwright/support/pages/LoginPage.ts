import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model para la página de login de SauceDemo
 * Encapsula los elementos y acciones de la página de autenticación
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;
  readonly inventoryList: Locator;

  /**
   * Constructor de la clase LoginPage
   * @param page - Instancia de la página de Playwright
   */
  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('[data-test="error-button"]');
    this.inventoryList = page.locator('.inventory_list');
  }

  /**
   * Navega a la página de login
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Realiza el login con credenciales proporcionadas
   * @param username - Nombre de usuario
   * @param password - Contraseña
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Obtiene el texto del mensaje de error
   * @returns Promise con el texto del error
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Verifica si el mensaje de error es visible
   * @returns Promise con booleano indicando visibilidad
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Verifica si estamos en la página de productos (login exitoso)
   * @returns Promise con booleano indicando si el login fue exitoso
   */
  async isOnProductsPage(): Promise<boolean> {
    return await this.inventoryList.isVisible();
  }

  /**
   * Cierra el mensaje de error
   */
  async closeError() {
    await this.errorButton.click();
  }

  /**
   * Limpia los campos de entrada
   */
  async clearFields() {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}
