import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Aumentar el timeout por defecto a 60 segundos para performance_glitch_user
setDefaultTimeout(60 * 1000);

// Variables globales para mantener el estado del navegador
let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;

/**
 * Hook que se ejecuta antes de cada escenario
 * Inicializa el navegador y el contexto
 */
Before(async function() {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://www.saucedemo.com'
  });
  page = await context.newPage();
  loginPage = new LoginPage(page);
});

/**
 * Hook que se ejecuta después de cada escenario
 * Cierra el navegador y limpia recursos
 */
After(async function() {
  await page?.close();
  await context?.close();
  await browser?.close();
});

// ==================== STEPS DE NAVEGACIÓN ====================

Given('que estoy en la página de login de SauceDemo', async function() {
  await loginPage.goto();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

Given('navego a la página de login de SauceDemo', async function() {
  await loginPage.goto();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

// ==================== STEPS DE ACCIÓN ====================

When('ingreso el usuario {string}', async function(username: string) {
  await loginPage.usernameInput.fill(username);
});

When('ingreso el nombre de usuario {string}', async function(username: string) {
  await loginPage.usernameInput.fill(username);
});

When('ingreso la contraseña {string}', async function(password: string) {
  await loginPage.passwordInput.fill(password);
});

When('hago clic en el botón de login', async function() {
  await loginPage.loginButton.click();
  // Esperar un poco más para usuarios con glitch de rendimiento
  await page.waitForTimeout(1000);
});

When('ingreso credenciales válidas', async function() {
  await loginPage.login('standard_user', 'secret_sauce');
});

When('ingreso el usuario {string} y la contraseña {string}', async function(username: string, password: string) {
  await loginPage.login(username, password);
});

When('dejo el campo de usuario vacío', async function() {
  await loginPage.usernameInput.clear();
});

When('dejo el campo de contraseña vacío', async function() {
  await loginPage.passwordInput.clear();
});

When('dejo ambos campos vacíos', async function() {
  await loginPage.clearFields();
});

// ==================== STEPS DE VERIFICACIÓN ====================

Then('debería ver la página de productos', async function() {
  // Esperar hasta 30 segundos a que aparezca el inventario (performance_glitch_user es muy lento)
  try {
    await page.waitForSelector('.inventory_list', { timeout: 30000 });
  } catch (e) {
    // Si no aparece, capturar para debug
    console.log('URL actual:', page.url());
  }
  
  const isOnProducts = await loginPage.isOnProductsPage();
  expect(isOnProducts).toBe(true);
  await expect(page).toHaveURL(/.*inventory\.html/);
});

Then('debería ser redirigido a la página de inventario', async function() {
  // Esperar hasta 30 segundos a que aparezca el inventario (performance_glitch_user es muy lento)
  try {
    await page.waitForSelector('.inventory_list', { timeout: 30000 });
  } catch (e) {
    // Si no aparece, capturar screenshot para debug
    console.log('URL actual:', page.url());
  }
  
  const isOnProducts = await loginPage.isOnProductsPage();
  expect(isOnProducts).toBe(true);
  await expect(page).toHaveURL(/.*inventory\.html/);
});

Then('debería permanecer en la página de login', async function() {
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  const isOnProducts = await loginPage.isOnProductsPage();
  expect(isOnProducts).toBe(false);
});

Then('debería ver el título de productos', async function() {
  const title = page.locator('.title');
  await expect(title).toBeVisible();
  await expect(title).toHaveText('Products');
});

Then('debería ver el mensaje de error {string}', async function(expectedMessage: string) {
  const isErrorVisible = await loginPage.isErrorVisible();
  expect(isErrorVisible).toBe(true);
  
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain(expectedMessage);
});

Then('debería ver un mensaje de error {string}', async function(expectedMessage: string) {
  const isErrorVisible = await loginPage.isErrorVisible();
  expect(isErrorVisible).toBe(true);
  
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain(expectedMessage);
});

Then('no debería poder acceder a la página de productos', async function() {
  // Verificar que seguimos en la página de login
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  
  // Verificar que NO estamos en la página de productos
  const isOnProducts = await loginPage.isOnProductsPage();
  expect(isOnProducts).toBe(false);
});

Then('debería ver un mensaje indicando que el usuario está bloqueado', async function() {
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('locked out');
});

Then('debería ver un mensaje de error genérico', async function() {
  const isErrorVisible = await loginPage.isErrorVisible();
  expect(isErrorVisible).toBe(true);
  
  const errorText = await loginPage.getErrorMessage();
  expect(errorText.length).toBeGreaterThan(0);
});

Then('el sistema debería rechazar las credenciales', async function() {
  // Verificar que hay un mensaje de error
  const isErrorVisible = await loginPage.isErrorVisible();
  expect(isErrorVisible).toBe(true);
  
  // Verificar que seguimos en la página de login
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
