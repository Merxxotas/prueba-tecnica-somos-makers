import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const bddTestDir = defineBddConfig({
  features: './automatizacion-web-playwright/features/**/*.feature',
  steps: './automatizacion-web-playwright/ui/**/*.ts',
});

/**
 * Configuración de Playwright para pruebas automatizadas
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: bddTestDir,
  
  // Tiempo máximo de espera para cada prueba
  timeout: 30 * 1000,
  
  // Configuración de expect
  expect: {
    timeout: 5000
  },
  
  // Ejecutar pruebas en paralelo
  fullyParallel: true,
  
  // Fallar el build si quedan test.only en el código
  forbidOnly: !!process.env.CI,
  
  // Reintentar pruebas fallidas solo en CI
  retries: process.env.CI ? 2 : 0,
  
  // Número de workers en paralelo
  workers: process.env.CI ? 1 : undefined,
  
  // Configuración de reportes
  reporter: [
    ['html', { outputFolder: 'automatizacion-web-playwright/playwright-report' }],
    ['json', { outputFile: 'automatizacion-web-playwright/test-results/results.json' }],
    ['list']
  ],
  
  // Opciones compartidas para todos los proyectos
  use: {
    // URL base para facilitar navegación
    baseURL: 'https://www.saucedemo.com',
    
    // Capturar trazas en el primer reintento de una prueba fallida
    trace: 'on-first-retry',
    
    // Capturar screenshots al fallar
    screenshot: 'only-on-failure',
    
    // Capturar video al fallar
    video: 'retain-on-failure',
    
    // Viewport por defecto
    viewport: { width: 1280, height: 720 },
  },

  // Configuración de proyectos (navegadores)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
