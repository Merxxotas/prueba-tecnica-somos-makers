import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium, type Browser } from 'playwright';
import { submitLogin } from '../support/loginActions';
import { LoginPage } from '../support/pages/LoginPage';

let browser: Browser;

before(async () => {
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  await browser?.close();
});

test('espera el inventario aunque la URL cambie antes de renderizarlo', async (t) => {
  const page = await browser.newPage();
  t.after(() => page.close());
  await page.route('http://login.test/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: `<button data-test="login-button" onclick="
      history.replaceState({}, '', '/inventory.html');
      setTimeout(() => {
        document.body.innerHTML = '<div class=inventory_list>Products</div>';
      }, 300);
    ">Login</button>`,
  }));
  await page.goto('http://login.test/');

  await submitLogin(new LoginPage(page));

  assert.equal(await page.locator('.inventory_list').isVisible(), true);
});

test('espera el mensaje de error cuando el login no navega', async (t) => {
  const page = await browser.newPage();
  t.after(() => page.close());
  await page.route('http://login.test/**', (route) => route.fulfill({
    contentType: 'text/html',
    body: `<button data-test="login-button" onclick="
      setTimeout(() => {
        document.body.innerHTML = '<div data-test=error>Invalid credentials</div>';
      }, 300);
    ">Login</button>`,
  }));
  await page.goto('http://login.test/');
  const loginPage = new LoginPage(page);

  await submitLogin(loginPage);

  assert.equal(await loginPage.errorMessage.isVisible(), true);
  assert.equal(page.url(), 'http://login.test/');
});
