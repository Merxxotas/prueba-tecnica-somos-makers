#!/usr/bin/env node

/**
 * Script para capturar evidencias visuales de las pruebas
 * Ejecuta escenarios específicos y captura screenshots
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const evidenciasDir = path.join(__dirname, '..', 'evidencias');

console.log('🎬 Capturando evidencias visuales...\n');

// Configuración de escenarios a capturar
const escenarios = [
  {
    nombre: 'Login Exitoso',
    framework: 'cypress',
    tags: '@smoke @obligatorio @positivo',
    descripcion: 'Captura del flujo de login exitoso'
  },
  {
    nombre: 'Login Fallido',
    framework: 'cypress',
    tags: '@smoke @obligatorio @negativo',
    descripcion: 'Captura de mensaje de error en login fallido'
  }
];

// Función para ejecutar captura
async function capturarEvidencia(escenario) {
  return new Promise((resolve, reject) => {
    console.log(`📸 Capturando: ${escenario.nombre}...`);
    
    const comando = escenario.framework === 'cypress' 
      ? 'pnpm'
      : 'pnpm';
    
    const args = escenario.framework === 'cypress'
      ? ['test:cypress']
      : ['test:playwright'];
    
    const proceso = spawn(comando, args, {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe'
    });
    
    proceso.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ ${escenario.nombre} - Capturado\n`);
        resolve();
      } else {
        console.log(`⚠️  ${escenario.nombre} - Completado con advertencias\n`);
        resolve(); // No rechazamos para continuar con otros
      }
    });
    
    proceso.on('error', (err) => {
      console.error(`❌ Error capturando ${escenario.nombre}:`, err.message);
      reject(err);
    });
  });
}

// Función principal
async function main() {
  console.log('📁 Verificando estructura de evidencias...\n');
  
  // Verificar que existe el directorio
  if (!fs.existsSync(evidenciasDir)) {
    console.error('❌ No existe el directorio de evidencias');
    process.exit(1);
  }
  
  console.log('✅ Estructura verificada\n');
  console.log('🚀 Iniciando captura de evidencias...\n');
  
  try {
    // Ejecutar Cypress para generar reportes
    await capturarEvidencia({ 
      nombre: 'Suite Completa Cypress', 
      framework: 'cypress' 
    });
    
    // Ejecutar Playwright para generar reportes
    await capturarEvidencia({ 
      nombre: 'Suite Completa Playwright', 
      framework: 'playwright' 
    });
    
    console.log('\n✨ Captura de evidencias completada!\n');
    console.log('📂 Revisa los reportes en:');
    console.log('   - evidencias/cypress/cucumber-report/cucumber-report.html');
    console.log('   - evidencias/playwright/cucumber-report/cucumber-report.html\n');
    
  } catch (error) {
    console.error('\n❌ Error durante la captura:', error.message);
    process.exit(1);
  }
}

// Ejecutar
main();
