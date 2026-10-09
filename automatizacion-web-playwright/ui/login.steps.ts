import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { submitLogin } from '../support/loginActions';
import { LoginPage } from '../support/pages/LoginPage';

const { Given, When, Then } = createBdd();

Given('navego a la página de login de SauceDemo', async ({ page }) => {
  await page.goto('/');
});

When('ingreso el nombre de usuario {string}', async ({ page }, username: string) => {
  await new LoginPage(page).usernameInput.fill(username);
});

When('ingreso la contraseña {string}', async ({ page }, password: string) => {
  await new LoginPage(page).passwordInput.fill(password);
});

When('hago clic en el botón de login', async ({ page }) => {
  await submitLogin(new LoginPage(page));
});

Then('debería ser redirigido a la página de inventario', async ({ page }) => {
  await expect(page).toHaveURL(/inventory\.html/);
});

Then('debería ver el título de productos', async ({ page }) => {
  await expect(new LoginPage(page).inventoryList).toBeVisible();
});

Then('debería ver un mensaje de error {string}', async ({ page }, expectedMessage: string) => {
  await expect(new LoginPage(page).errorMessage).toContainText(expectedMessage);
});

Then('debería permanecer en la página de login', async ({ page }) => {
  await expect(page).not.toHaveURL(/inventory\.html/);
});
