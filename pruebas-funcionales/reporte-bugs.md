# Reporte de Bugs - MakersPay

Reporte de defectos encontrados durante el análisis y diseño de casos de prueba para MakersPay.

**Nota**: Este es un reporte hipotético basado en el análisis de requerimientos y bugs comunes en aplicaciones similares.

---

## Bug #001: Validación insuficiente en monto de transferencia

**Severidad**: Media  
**Prioridad**: Media  
**Estado**: Abierto  
**Módulo**: Envío de Dinero  
**Tipo**: Funcional

**Descripción**:
El sistema no valida correctamente cuando el usuario intenta ingresar montos con decimales o caracteres especiales en el campo de monto de transferencia.

**Pasos para Reproducir**:
1. Iniciar sesión en la aplicación
2. Navegar a "Enviar Dinero"
3. Ingresar número destinatario válido
4. Ingresar monto con decimales: "$50.000,50"
5. Intentar confirmar transacción

**Resultado Actual**:
- Sistema acepta el valor y procesa solo la parte entera
- No muestra mensaje de advertencia al usuario

**Resultado Esperado**:
- Sistema debe mostrar mensaje: "Solo se permiten montos enteros sin decimales"
- Campo debe aceptar solo números enteros

**Impacto**:
- Confusión para el usuario
- Posibles discrepancias en transacciones

**Recomendación**:
- Implementar validación de entrada que permita solo números enteros
- Bloquear caracteres especiales y decimales en tiempo real
- Mostrar formato esperado como placeholder: "Ej: 50000"

---

## Bug #002: Mensaje de error genérico en login fallido

**Severidad**: Baja  
**Prioridad**: Baja  
**Estado**: Abierto  
**Módulo**: Autenticación  
**Tipo**: Usabilidad

**Descripción**:
Cuando el usuario ingresa credenciales incorrectas, el sistema muestra el mismo mensaje de error "Credenciales inválidas" tanto para número de celular no registrado como para contraseña incorrecta.

**Pasos para Reproducir**:
1. Abrir aplicación en pantalla de login
2. Caso A: Ingresar número no registrado + contraseña cualquiera
3. Caso B: Ingresar número registrado + contraseña incorrecta
4. Observar mensajes de error

**Resultado Actual**:
- Ambos casos muestran: "Credenciales inválidas"

**Resultado Esperado**:
- Por seguridad, mantener mensaje genérico es correcto
- Sin embargo, podría mejorarse UX con:
  - "Verifica tu número de celular y contraseña"
  - Indicador de intentos fallidos restantes

**Impacto**:
- Menor frustración del usuario
- Dificulta ataques de enumeración de usuarios (positivo desde seguridad)

**Recomendación**:
- Mantener mensaje genérico por seguridad
- Agregar contador de intentos fallidos
- Implementar bloqueo temporal después de N intentos

---

## Bug #003: Sin validación de formato de número de celular

**Severidad**: Media  
**Prioridad**: Alta  
**Estado**: Abierto  
**Módulo**: Envío de Dinero, Registro  
**Tipo**: Funcional

**Descripción**:
El sistema no valida el formato del número de celular antes de procesar transacciones o registros. Acepta números con menos o más de 10 dígitos.

**Pasos para Reproducir**:
1. Navegar a "Enviar Dinero"
2. Ingresar número con formato inválido: "123"
3. Ingresar monto válido
4. Intentar confirmar

**Resultado Actual**:
- Sistema permite continuar y luego muestra error genérico
- Validación ocurre muy tarde en el flujo

**Resultado Esperado**:
- Validación en tiempo real mientras el usuario escribe
- Mensaje inmediato: "El número debe tener 10 dígitos"
- Máscara de entrada: (300) 123-4567

**Impacto**:
- Frustración del usuario
- Errores en transacciones
- Llamadas innecesarias al backend

**Recomendación**:
- Implementar validación frontend en tiempo real
- Formato automático con máscara
- Validación en backend como capa adicional
- Regex: ^3[0-9]{9}$ (números colombianos)

---

## Bug #004: Historial no muestra información del remitente/destinatario

**Severidad**: Media  
**Prioridad**: Media  
**Estado**: Abierto  
**Módulo**: Historial de Transacciones  
**Tipo**: Funcional

**Descripción**:
El historial de transacciones solo muestra números de celular, sin nombres de los usuarios involucrados, dificultando la identificación de transacciones.

**Pasos para Reproducir**:
1. Realizar transferencia a "3009876543"
2. Navegar a historial de transacciones
3. Observar detalles de la transacción

**Resultado Actual**:
- Solo muestra: "Enviaste $100.000 a 3009876543"

**Resultado Esperado**:
- Mostrar: "Enviaste $100.000 a Juan Pérez (3009876543)"
- Incluir nombre del usuario asociado al número

**Impacto**:
- Dificultad para identificar transacciones
- Experiencia de usuario degradada
- Necesidad de memorizar números

**Recomendación**:
- Incluir nombre del usuario en el historial
- Mostrar formato: "Nombre (Número)"
- Considerar agregar avatar o inicial

---

## Bug #005: Sin confirmación visual antes de transferencia

**Severidad**: Alta  
**Prioridad**: Alta  
**Estado**: Abierto  
**Módulo**: Envío de Dinero  
**Tipo**: Usabilidad / Seguridad

**Descripción**:
No existe una pantalla de confirmación que muestre el resumen de la transacción antes de ejecutarla, aumentando el riesgo de errores.

**Pasos para Reproducir**:
1. Navegar a "Enviar Dinero"
2. Ingresar destinatario: "3009876543"
3. Ingresar monto: "$500.000"
4. Presionar "Enviar"

**Resultado Actual**:
- Transacción se ejecuta inmediatamente
- No hay pantalla de confirmación

**Resultado Esperado**:
- Pantalla de confirmación mostrando:
  - Destinatario: Juan Pérez (3009876543)
  - Monto: $500.000 COP
  - Saldo después: $500.000 COP
  - Botones: "Confirmar" y "Cancelar"

**Impacto**:
- Alto riesgo de transacciones erróneas
- No hay oportunidad de corregir antes de ejecutar
- Potencial pérdida de dinero por error humano

**Recomendación**:
- Agregar pantalla de confirmación obligatoria
- Mostrar todos los detalles claramente
- Considerar PIN o biometría para confirmar
- Agregar opción de guardar destinatarios frecuentes

---

## Bug #006: Sin manejo de pérdida de conectividad durante transacción

**Severidad**: Alta  
**Prioridad**: Alta  
**Estado**: Abierto  
**Módulo**: Envío de Dinero  
**Tipo**: Técnico / Funcional

**Descripción**:
Si se pierde la conexión a internet durante una transacción, el sistema no maneja correctamente el estado, pudiendo generar inconsistencias.

**Pasos para Reproducir**:
1. Iniciar transferencia de $100.000
2. Desactivar conexión de red en el dispositivo justo después de confirmar
3. Observar comportamiento del sistema

**Resultado Actual**:
- Error genérico sin indicar qué pasó con la transacción
- Usuario no sabe si la transferencia se procesó o no
- Posible duplicación si el usuario intenta de nuevo

**Resultado Esperado**:
- Mensaje claro: "Se perdió la conexión. Verificando estado de tu transacción..."
- Sistema verifica automáticamente con el servidor
- Notificación clara del estado final
- Prevención de duplicación

**Impacto**:
- Inconsistencias en saldos
- Duplicación de transacciones
- Pérdida de confianza del usuario

**Recomendación**:
- Implementar sistema de verificación de estado
- Transacciones idempotentes con ID único
- Cola de reintentos con validación
- Notificaciones push del resultado

---

## Bug #007: Límite de transacciones diarias no documentado

**Severidad**: Baja  
**Prioridad**: Media  
**Estado**: Abierto  
**Módulo**: Envío de Dinero  
**Tipo**: Documentación

**Descripción**:
Los requerimientos no especifican si existe un límite de transacciones diarias o un monto máximo acumulado por día.

**Impacto**:
- Falta de claridad en reglas de negocio
- Potencial para abuso o fraude
- Experiencia inesperada del usuario

**Recomendación**:
- Definir límites diarios:
  - Número máximo de transacciones por día (ej: 10)
  - Monto máximo acumulado por día (ej: $5.000.000)
- Documentar en requerimientos
- Implementar validaciones correspondientes
- Notificar al usuario cuando se acerque a los límites

---

## Resumen de Bugs

| ID | Módulo | Severidad | Prioridad | Estado |
|----|--------|-----------|-----------|--------|
| BUG-001 | Envío de Dinero | Media | Media | Abierto |
| BUG-002 | Autenticación | Baja | Baja | Abierto |
| BUG-003 | Envío/Registro | Media | Alta | Abierto |
| BUG-004 | Historial | Media | Media | Abierto |
| BUG-005 | Envío de Dinero | Alta | Alta | Abierto |
| BUG-006 | Envío de Dinero | Alta | Alta | Abierto |
| BUG-007 | Envío de Dinero | Baja | Media | Abierto |

**Total de Bugs**: 7

**Por Severidad**:
- Alta: 2
- Media: 4
- Baja: 1

**Por Prioridad**:
- Alta: 3
- Media: 3
- Baja: 1

---

## Notas

1. Estos bugs fueron identificados durante el análisis de requerimientos
2. Se recomienda validar cada uno durante la implementación real
3. Algunos bugs representan mejores prácticas más que defectos críticos
4. La priorización puede ajustarse según el contexto del negocio
