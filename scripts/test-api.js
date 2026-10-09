#!/usr/bin/env node

/**
 * Script de automatización de pruebas de API usando la colección de Insomnia
 * Ejecuta todos los requests y valida respuestas
 */

const fs = require('fs');
const path = require('path');

// Colores para output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Cargar colección
const collectionPath = path.join(__dirname, '..', 'pruebas-api', 'insomnia', 'reqres-api-collection.json');
const collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));

// Extraer configuración
const baseURL = collection.resources.find(r => r._id === 'env_base')?.data?.baseURL || 'https://reqres.in';
const requests = collection.resources.filter(r => r._type === 'request');
const folders = collection.resources.filter(r => r._type === 'request_group');

// Estadísticas
let stats = {
  total: 0,
  passed: 0,
  failed: 0,
  duration: 0
};

const results = [];

console.log(`${colors.cyan}==============================================`);
console.log(`API Testing - ReqRes Collection`);
console.log(`Base URL: ${baseURL}`);
console.log(`Total Requests: ${requests.length}`);
console.log(`==============================================\n${colors.reset}`);

/**
 * Ejecuta un request HTTP
 */
async function executeRequest(request) {
  const startTime = Date.now();
  
  try {
    // Resolver URL reemplazando variables
    let url = request.url.replace('{{ _.baseURL }}', baseURL);
    
    // Preparar opciones de fetch
    const options = {
      method: request.method,
      headers: {}
    };
    
    // Agregar headers
    if (request.headers) {
      request.headers.forEach(header => {
        options.headers[header.name] = header.value;
      });
    }
    
    // Agregar body para POST/PUT/PATCH
    if (request.body && request.body.text) {
      options.body = request.body.text;
    }
    
    // Ejecutar request
    const response = await fetch(url, options);
    const duration = Date.now() - startTime;
    
    // Leer body de respuesta
    let responseBody;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }
    
    // Determinar si pasó
    const expectedStatuses = getExpectedStatus(request);
    const passed = expectedStatuses.includes(response.status);
    
    return {
      name: request.name,
      method: request.method,
      url: url,
      status: response.status,
      statusText: response.statusText,
      duration,
      passed,
      expectedStatuses,
      responseBody
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      name: request.name,
      method: request.method,
      url: request.url.replace('{{ _.baseURL }}', baseURL),
      status: 0,
      statusText: 'ERROR',
      duration,
      passed: false,
      error: error.message
    };
  }
}

/**
 * Determina el código de estado esperado según el request
 */
function getExpectedStatus(request) {
  const name = request.name.toLowerCase();
  
  if (name.includes('eliminar') || name.includes('delete')) return [204];
  if (name.includes('crear usuario') || (name.includes('post') && name.includes('crear'))) return [201];
  if (name.includes('fallido') || name.includes('no encontrado')) return [400, 404];
  if (name.includes('registro exitoso') || name.includes('login exitoso')) return [200];
  
  return [200]; // Default
}

/**
 * Obtiene el nombre de la carpeta padre
 */
function getFolderName(parentId) {
  const folder = folders.find(f => f._id === parentId);
  return folder ? folder.name : 'Sin Grupo';
}

/**
 * Ejecuta todas las pruebas
 */
async function runTests() {
  // Agrupar requests por carpeta
  const grouped = {};
  
  requests.forEach(req => {
    const folderName = getFolderName(req.parentId);
    if (!grouped[folderName]) {
      grouped[folderName] = [];
    }
    grouped[folderName].push(req);
  });
  
  // Ejecutar por grupo
  for (const [folderName, reqs] of Object.entries(grouped)) {
    console.log(`${colors.blue}\n[${folderName}]${colors.reset}\n`);
    
    for (const request of reqs) {
      stats.total++;
      const result = await executeRequest(request);
      results.push(result);
      
      if (result.passed) {
        stats.passed++;
        console.log(`  ${colors.green}[PASS]${colors.reset} ${result.method} ${result.name} (${result.status}) - ${result.duration}ms`);
      } else {
        stats.failed++;
        console.log(`  ${colors.red}[FAIL]${colors.reset} ${result.method} ${result.name} (${result.status}, expected: ${result.expectedStatuses.join('/')}) - ${result.duration}ms`);
        if (result.error) {
          console.log(`    Error: ${result.error}`);
        }
      }
      
      stats.duration += result.duration;
      
      // Pequeño delay entre requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Reporte final
  console.log(`${colors.cyan}\n==============================================`);
  console.log(`Test Summary`);
  console.log(`==============================================`);
  console.log(`Total:    ${stats.total}`);
  console.log(`${colors.green}Passed:   ${stats.passed}${colors.cyan}`);
  console.log(`${colors.red}Failed:   ${stats.failed}${colors.cyan}`);
  console.log(`Duration: ${stats.duration}ms`);
  console.log(`Success:  ${((stats.passed / stats.total) * 100).toFixed(1)}%`);
  console.log(`==============================================\n${colors.reset}`);
  
  // Guardar reporte JSON
  const reportPath = path.join(__dirname, '..', 'evidencias', 'insomnia', 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    stats,
    results
  }, null, 2));
  
  console.log(`${colors.green}[OK] Reporte guardado en: evidencias/insomnia/test-report.json${colors.reset}\n`);
  
  // Exit code
  process.exit(stats.failed > 0 ? 1 : 0);
}

// Ejecutar
runTests().catch(err => {
  console.error(`${colors.red}[ERROR] Error fatal:${colors.reset}`, err);
  process.exit(1);
});
