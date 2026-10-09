# Pruebas Funcionales - MakersPay

Documentación completa de pruebas funcionales para la billetera digital MakersPay.

---

## Contenido

Este módulo contiene todos los artefactos de testing funcional para MakersPay:

1. **escenarios-gherkin.md** - Escenarios BDD en formato Gherkin
2. **casos-de-prueba.md** - Casos de prueba detallados con técnicas aplicadas
3. **matriz-trazabilidad.md** - Trazabilidad entre requerimientos y casos
4. **reporte-bugs.md** - Bugs identificados durante el análisis

---

## Producto: MakersPay

**Descripción**: Billetera digital que permite a los usuarios realizar transacciones de dinero utilizando números de celular.

### Funcionalidades Principales

- Registro e inicio de sesión
- Consulta de saldo
- Envío de dinero entre usuarios
- Historial de transacciones

### Reglas de Negocio Clave

- Monto mínimo por transacción: $5.000 COP
- Monto máximo por transacción: $2.000.000 COP
- No se permite enviar más dinero del saldo disponible
- No se permiten transferencias al propio número
- Actualización automática de saldos en transacciones exitosas
- Registro en historial de ambos usuarios (remitente y destinatario)

---

## Enfoque de Testing

### Técnicas Aplicadas

1. **Partición de Equivalencia**
   - Dividir entradas en clases válidas e inválidas
   - Aplicado en: validaciones de campos, rangos de montos, estados de usuario

2. **Análisis de Valores Límite**
   - Probar límites inferiores y superiores de rangos
   - Aplicado en: montos mínimos/máximos, saldo disponible

3. **Tablas de Decisión**
   - Evaluar combinaciones de condiciones
   - Aplicado en: validación de transferencias (5 condiciones evaluadas)

4. **Pruebas Positivas y Negativas**
   - Validar comportamiento esperado y manejo de errores
   - Cobertura: 8 casos positivos, 15 casos negativos, 2 validaciones

---

## Cobertura de Testing

### Estadísticas Generales

- **Total de Escenarios Gherkin**: 25
- **Total de Casos de Prueba Detallados**: 25
- **Total de Requerimientos**: 13
- **Cobertura de Requerimientos**: 100%
- **Bugs Identificados**: 7

### Distribución por Feature

| Feature | Escenarios | Casos de Prueba | Prioridad Alta |
|---------|------------|-----------------|----------------|
| Inicio de Sesión | 5 | 5 | 3 |
| Consulta de Saldo | 2 | 2 | 1 |
| Envío de Dinero | 10 | 10 | 7 |
| Historial | 4 | 4 | 2 |
| Registro | 4 | 4 | 2 |

### Distribución por Técnica

| Técnica | Casos Aplicados | Porcentaje |
|---------|-----------------|------------|
| Partición de Equivalencia | 12 | 48% |
| Análisis de Valores Límite | 6 | 24% |
| Reglas de Negocio | 5 | 20% |
| Validaciones | 2 | 8% |

---

## Documentos Principales

### 1. Escenarios Gherkin

**Archivo**: `escenarios-gherkin.md`

Contiene 25 escenarios en formato Gherkin organizados por features:
- Sintaxis estándar Given-When-Then
- Datos de prueba específicos
- Resultados esperados claros
- Cobertura de flujos positivos y negativos

**Ejemplo**:
```gherkin
Escenario: Transferencia exitosa con monto válido
  Dado que el usuario tiene un saldo disponible de "$1.000.000 COP"
  Cuando el usuario ingresa el número del destinatario "3009876543"
  Y ingresa el monto "$100.000 COP"
  Y confirma la transacción
  Entonces el sistema debe procesar la transferencia exitosamente
```

### 2. Casos de Prueba Detallados

**Archivo**: `casos-de-prueba.md`

Casos de prueba completos con:
- ID único de caso
- Prioridad y tipo
- Técnica aplicada
- Precondiciones
- Pasos detallados
- Resultado esperado
- Espacio para resultado real

**Incluye**:
- Tabla de decisión para validación de transferencias
- 25 casos documentados completamente
- Clasificación por prioridad (15 alta, 10 media)

### 3. Matriz de Trazabilidad

**Archivo**: `matriz-trazabilidad.md`

Relaciona:
- 13 requerimientos de negocio
- 25 casos de prueba
- Cobertura por requerimiento (promedio 4.6 casos/req)
- Análisis de riesgos
- Recomendaciones

**Cobertura destacada**:
- REQ-010 (Mensajes de error): 13 casos
- REQ-003 (Enviar dinero): 10 casos
- REQ-009 (Historial): 6 casos

### 4. Reporte de Bugs

**Archivo**: `reporte-bugs.md`

7 bugs identificados durante análisis:
- 2 severidad alta (confirmación de transacciones, conectividad)
- 4 severidad media (validaciones, formato)
- 1 severidad baja (documentación)

Cada bug incluye:
- Descripción detallada
- Pasos para reproducir
- Resultado actual vs esperado
- Impacto
- Recomendación de solución

---

## Casos de Prueba Prioritarios

### Top 10 Casos Críticos

1. **CP-008**: Transferencia exitosa con monto válido
2. **CP-011**: Transferencia fallida por saldo insuficiente
3. **CP-009**: Validación de monto mínimo
4. **CP-010**: Validación de monto máximo
5. **CP-001**: Login exitoso
6. **CP-015**: Transferencia en límite mínimo
7. **CP-016**: Transferencia en límite máximo
8. **CP-013**: Validación de destinatario no registrado
9. **CP-012**: Validación de auto-transferencia
10. **CP-025**: Transferencia con saldo exacto

---

## Riesgos Identificados

### Alto Riesgo

1. **Pérdida de conectividad durante transacción**
   - Severidad: Alta
   - Impacto: Inconsistencias en saldos
   - Mitigación: Bug #006

2. **Sin confirmación antes de transferencia**
   - Severidad: Alta
   - Impacto: Transacciones erróneas
   - Mitigación: Bug #005

### Riesgo Medio

1. **Validaciones de formato insuficientes**
   - Severidad: Media
   - Impacto: Errores en transacciones
   - Mitigación: Bug #003

2. **Información limitada en historial**
   - Severidad: Media
   - Impacto: Experiencia de usuario degradada
   - Mitigación: Bug #004

---

## Recomendaciones

### Para Desarrollo

1. Implementar todas las validaciones frontend en tiempo real
2. Agregar pantalla de confirmación obligatoria para transferencias
3. Implementar manejo robusto de pérdida de conectividad
4. Agregar nombres de usuarios en historial

### Para Testing

1. Ejecutar casos en orden de prioridad (alta primero)
2. Automatizar casos críticos de regresión
3. Realizar pruebas de concurrencia en transacciones
4. Validar comportamiento offline/online

### Para QA

1. Documentar con screenshots cada ejecución
2. Actualizar matriz de trazabilidad con resultados
3. Reportar bugs nuevos siguiendo el formato establecido
4. Mantener casos actualizados con cambios de requerimientos

---

## Próximos Pasos

1. Validar requerimientos con stakeholders
2. Priorizar corrección de bugs de alta severidad
3. Ejecutar suite de pruebas en ambiente de QA
4. Automatizar casos críticos con Cypress/Playwright
5. Realizar pruebas de seguridad y performance
6. Documentar resultados de ejecución

---

## Métricas de Calidad Objetivo

- **Cobertura de Requerimientos**: 100% (Logrado)
- **Cobertura de Código**: Objetivo 80%
- **Tasa de Defectos**: < 5% en producción
- **Tiempo de Ejecución**: < 30 minutos suite completa
- **Casos Automatizados**: Objetivo 70% de casos críticos

---

## Contacto

Para consultas sobre los casos de prueba o requerimientos adicionales, contactar al equipo de QA.

**Última Actualización**: 2026-10-09
