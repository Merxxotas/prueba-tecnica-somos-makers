import { Before, After, Given, When, Then, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "playwright";
import { LoginPage } from "../pages/LoginPage";
import { expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;

// Directorio para screenshots de evidencias
const evidenciasDir = path.join(process.cwd(), 'evidencias', 'playwright', 'screenshots');

// Asegurar que existe el directorio
if (!fs.existsSync(evidenciasDir)) {
  fs.mkdirSync(evidenciasDir, { recursive: true });
}

// Hook BEFORE: Configurar navegador antes de cada escenario
Before(async function () {
  browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  context = await browser.newContext({
    baseURL: 'https://www.saucedemo.com',
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: path.join(process.cwd(), 'evidencias', 'playwright', 'videos'),
      size: { width: 1280, height: 720 }
    }
  });
  page = await context.newPage();
  loginPage = new LoginPage(page);
});

// Hook AFTER: Limpiar y capturar evidencia en caso de fallo
After(async function (scenario: any) {
  // Capturar screenshot si el escenario falló
  if (scenario.result?.status === Status.FAILED) {
    const screenshotName = `FAILED-${scenario.pickle.name.replace(/\s+/g, '_')}-${Date.now()}.png`;
    const screenshotPath = path.join(evidenciasDir, screenshotName);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot de fallo guardado: ${screenshotName}`);
  }
  
  await context.close();
  await browser.close();
});

// ========================================
// Pasos GIVEN (Precondiciones)
// ========================================

Given("navego a la página de login de SauceDemo", async function () {
  await loginPage.goto();
  
  // Capturar screenshot de la página inicial
  const screenshotName = `01-pagina-login-${Date.now()}.png`;
  await page.screenshot({ 
    path: path.join(evidenciasDir, screenshotName),
    fullPage: true 
  });
});

// ========================================
// Pasos WHEN (Acciones)
// ========================================

When("ingreso el nombre de usuario {string}", async function (username: string) {
  await loginPage.usernameInput.fill(username);
});

When("ingreso la contraseña {string}", async function (password: string) {
  await loginPage.passwordInput.fill(password);
});

When("hago clic en el botón de login", async function () {
  // Capturar antes de hacer clic
  const screenshotName = `02-antes-click-login-${Date.now()}.png`;
  await page.screenshot({ 
    path: path.join(evidenciasDir, screenshotName) 
  });
  
  await loginPage.loginButton.click();
  
  // Esperar navegación o mensaje de error
  await page.waitForTimeout(1000);
  
  // Capturar después del clic
  const screenshotNameAfter = `03-despues-click-login-${Date.now()}.png`;
  await page.screenshot({ 
    path: path.join(evidenciasDir, screenshotNameAfter),
    fullPage: true 
  });
});

// ========================================
// Pasos THEN (Aserciones)
// ========================================

Then("debería ser redirigido a la página de inventario", async function () {
  await expect(page).toHaveURL(/inventory.html/);
});

Then("debería ver el título de productos", async function () {
  const isOnProducts = await loginPage.isOnProductsPage();
  expect(isOnProducts).toBe(true);
  
  // Capturar evidencia de éxito
  const screenshotName = `SUCCESS-pagina-inventario-${Date.now()}.png`;
  await page.screenshot({ 
    path: path.join(evidenciasDir, screenshotName),
    fullPage: true 
  });
});

Then("debería ver un mensaje de error {string}", async function (expectedMessage: string) {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).toContain(expectedMessage);
  
  // Capturar evidencia del error
  const screenshotName = `ERROR-mensaje-error-${Date.now()}.png`;
  await page.screenshot({ 
    path: path.join(evidenciasDir, screenshotName) 
  });
});

Then("debería permanecer en la página de login", async function () {
  await expect(page).toHaveURL(/saucedemo.com/);
  await expect(page).not.toHaveURL(/inventory.html/);
});
