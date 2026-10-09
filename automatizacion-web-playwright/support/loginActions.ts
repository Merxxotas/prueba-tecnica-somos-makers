import { LoginPage } from './pages/LoginPage';

/**
 * Completa y envía el formulario, esperando el resultado observable del login.
 */
export async function submitLogin(loginPage: LoginPage): Promise<void> {
  await loginPage.loginButton.click();
  await waitForLoginOutcome(loginPage);
}

export async function waitForLoginOutcome(loginPage: LoginPage): Promise<void> {
  // La URL puede cambiar antes del renderizado con performance_glitch_user.
  await loginPage.inventoryList.or(loginPage.errorMessage).first().waitFor({
    state: 'visible',
    timeout: 15000,
  });
}
