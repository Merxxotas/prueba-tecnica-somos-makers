import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/LoginPage";

// Inicializar Page Object
const loginPage = new LoginPage();

// ========================================
// Pasos GIVEN (Precondiciones)
// ========================================

Given("navego a la página de login de SauceDemo", () => {
  loginPage.visit();
});

// ========================================
// Pasos WHEN (Acciones)
// ========================================

When("ingreso el nombre de usuario {string}", (username: string) => {
  loginPage.enterUsername(username);
});

When("ingreso la contraseña {string}", (password: string) => {
  loginPage.enterPassword(password);
});

When("hago clic en el botón de login", () => {
  loginPage.clickLoginButton();
});

// ========================================
// Pasos THEN (Aserciones)
// ========================================

Then("debería ser redirigido a la página de inventario", () => {
  loginPage.verifyInventoryPageUrl();
});

Then("debería ver el título de productos", () => {
  loginPage.verifyProductsTitle();
});

Then("debería ver un mensaje de error {string}", (expectedMessage: string) => {
  loginPage.verifyErrorMessage(expectedMessage);
});

Then("debería permanecer en la página de login", () => {
  loginPage.verifyLoginPageUrl();
});
