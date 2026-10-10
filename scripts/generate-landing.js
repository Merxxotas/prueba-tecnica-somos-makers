const fs = require('fs');
const path = require('path');

const targetDir = process.argv[2] || path.join(__dirname, '..', 'public');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prueba Técnica QA Full Stack | Dashboard de Reportes</title>
  <link rel="icon" href="https://github.githubassets.com/favicons/favicon.svg" type="image/svg+xml">
  <style>
    :root {
      --bg: #0f172a;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-hover: #0284c7;
      --success: #22c55e;
      --success-bg: rgba(34, 197, 94, 0.12);
      --font: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: var(--bg);
      color: var(--text-main);
      font-family: var(--font);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.5rem 1.25rem;
    }

    .container {
      max-width: 1080px;
      width: 100%;
    }

    header {
      text-align: center;
      margin-bottom: 2.5rem;
    }

    .badge-container {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--success-bg);
      color: var(--success);
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--success);
    }

    h1 {
      font-size: 2.4rem;
      font-weight: 800;
      letter-spacing: -0.025em;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    p.subtitle {
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 650px;
      margin: 0 auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1rem;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
      transform: translateY(-3px);
      border-color: var(--accent);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }

    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .card-pill {
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
      border-radius: 0.375rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .pill-green {
      background: var(--success-bg);
      color: var(--success);
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    .pill-blue {
      background: rgba(56, 189, 248, 0.12);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.2);
    }

    .card-desc {
      color: var(--text-muted);
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
    }

    .card-stats {
      list-style: none;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .card-stats li {
      font-size: 0.9rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .card-stats li strong {
      color: var(--text-main);
    }

    .btn-group {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.15s ease, transform 0.1s ease;
      cursor: pointer;
    }

    .btn-primary {
      background: var(--accent);
      color: #0f172a;
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      color: #ffffff;
    }

    .btn-secondary {
      background: #334155;
      color: var(--text-main);
    }

    .btn-secondary:hover {
      background: #475569;
    }

    footer {
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
      border-top: 1px solid var(--card-border);
      padding-top: 2rem;
      width: 100%;
    }

    footer a {
      color: var(--accent);
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge-container">
        <span class="badge-dot"></span>
        CI/CD Suite: 100% Pasada
      </div>
      <h1>Dashboard de Reportes de Testing</h1>
      <p class="subtitle">Prueba Técnica QA Full Stack para Somos Makers • Visualización interactiva de ejecuciones automatizadas</p>
    </header>

    <div class="grid">
      <!-- Cypress Card -->
      <div class="card">
        <div>
          <div class="card-header">
            <span class="card-title">Cypress E2E</span>
            <span class="card-pill pill-green">18/18 Pasados</span>
          </div>
          <p class="card-desc">Smoke tests de inicio de sesión sobre SauceDemo implementados con BDD Gherkin/Cucumber y Page Object Model en TypeScript.</p>
          <ul class="card-stats">
            <li><span>✓</span> <strong>18 escenarios</strong> ejecutados con éxito</li>
            <li><span>✓</span> <strong>0 fallos</strong> registrados</li>
            <li><span>✓</span> Reporte interactivo con pasos Gherkin</li>
          </ul>
        </div>
        <div class="btn-group">
          <a href="cypress/cucumber-report.html" class="btn btn-primary" target="_blank">
            Ver Reporte Cypress (HTML) ↗
          </a>
        </div>
      </div>

      <!-- Playwright Card -->
      <div class="card">
        <div>
          <div class="card-header">
            <span class="card-title">Playwright E2E</span>
            <span class="card-pill pill-green">18/18 Pasados</span>
          </div>
          <p class="card-desc">Suite automatizada de SauceDemo con Playwright, soporte BDD nativo, runner Cucumber y pruebas de regresión.</p>
          <ul class="card-stats">
            <li><span>✓</span> <strong>18 escenarios Cucumber</strong> validados</li>
            <li><span>✓</span> <strong>18 tests BDD nativos</strong> validados</li>
            <li><span>✓</span> <strong>2 tests de regresión</strong> de timing</li>
          </ul>
        </div>
        <div class="btn-group">
          <a href="playwright/cucumber-report.html" class="btn btn-primary" target="_blank">
            Ver Reporte Cucumber (HTML) ↗
          </a>
          <a href="playwright-report/index.html" class="btn btn-secondary" target="_blank">
            Ver Reporte Playwright Nativo ↗
          </a>
        </div>
      </div>

      <!-- API Card -->
      <div class="card">
        <div>
          <div class="card-header">
            <span class="card-title">API ReqRes</span>
            <span class="card-pill pill-blue">14/14 Requests</span>
          </div>
          <p class="card-desc">Colección de pruebas para la API ReqRes ejecutada automáticamente con Kong inso-cli v13.3.1 y runner Node.js custom.</p>
          <ul class="card-stats">
            <li><span>✓</span> <strong>14 endpoints</strong> cubiertos (CRUD, Auth, Delay)</li>
            <li><span>✓</span> <strong>100% de aserciones</strong> HTTP exitosas</li>
            <li><span>✓</span> Reporte JSON generado en CI/CD</li>
          </ul>
        </div>
        <div class="btn-group">
          <a href="api/test-report.json" class="btn btn-primary" target="_blank">
            Ver Reporte JSON de API ↗
          </a>
        </div>
      </div>
    </div>

    <footer>
      <p>Repositorio: <a href="https://github.com/Merxxotas/prueba-tecnica-somos-makers" target="_blank">Merxxotas/prueba-tecnica-somos-makers</a> • Desarrollado por <strong>Merxxotas</strong></p>
    </footer>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
console.log(`Landing page generated at: ${path.join(targetDir, 'index.html')}`);
