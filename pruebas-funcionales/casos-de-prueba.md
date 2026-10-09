# Casos de Prueba Detallados - MakersPay

Casos de prueba funcionales completos con técnicas de testing aplicadas.

---

## Técnicas de Testing Aplicadas

1. **Partición de Equivalencia**: Dividir entradas en clases válidas e inválidas
2. **Análisis de Valores Límite**: Probar los límites de rangos aceptables
3. **Tablas de Decisión**: Evaluar combinaciones de condiciones
4. **Pruebas Positivas y Negativas**: Validar comportamiento esperado e inesperado

---

## Feature: Autenticación

### CP-001: Login exitoso con credenciales válidas

**Prioridad**: Alta  
**Tipo**: Funcional - Positivo  
**Técnica**: Partición de Equivalencia (Clase válida)

**Precondiciones**:
- Usuario registrado con número "3001234567" y contraseña "Password123!"
- Aplicación abierta en pantalla de login

**Datos de Entrada**:
- Número de celular: 3001234567
- Contraseña: Password123!

**Pasos**:
1. Ingresar número de celular "3001234567"
2. Ingresar contraseña "Password123!"
3. Hacer clic en botón "Iniciar Sesión"

**Resultado Esperado**:
- Sistema autentica al usuario exitosamente
- Redirección a pantalla de inicio
- Saldo visible en pantalla
- Mensaje de bienvenida: "Hola, Usuario"

**Resultado Real**: (Pendiente de ejecución)

---

### CP-002: Login fallido con número de celular inválido

**Prioridad**: Alta  
**Tipo**: Funcional - Negativo  
**Técnica**: Partición de Equivalencia (Clase inválida)

**Precondiciones**:
- Aplicación abierta en pantalla de login

**Datos de Entrada**:
- Número de celular: 3009999999 (no registrado)
- Contraseña: Password123!

**Pasos**:
1. Ingresar número no registrado "3009999999"
2. Ingresar contraseña "Password123!"
3. Hacer clic en botón "Iniciar Sesión"

**Resultado Esperado**:
- Sistema muestra mensaje de error "Credenciales inválidas"
- Usuario permanece en pantalla de login
- Campos no se limpian automáticamente

**Resultado Real**: (Pendiente de ejecución)

---

### CP-003: Login fallido con contraseña incorrecta

**Prioridad**: Alta  
**Tipo**: Funcional - Negativo  
**Técnica**: Partición de Equivalencia (Clase inválida)

**Precondiciones**:
- Usuario registrado con número "3001234567"
- Aplicación abierta en pantalla de login

**Datos de Entrada**:
- Número de celular: 3001234567
- Contraseña: WrongPassword (incorrecta)

**Pasos**:
1. Ingresar número registrado "3001234567"
2. Ingresar contraseña incorrecta "WrongPassword"
3. Hacer clic en botón "Iniciar Sesión"

**Resultado Esperado**:
- Sistema muestra mensaje de error "Credenciales inválidas"
- Usuario permanece en pantalla de login
- Campo contraseña se limpia por seguridad

**Resultado Real**: (Pendiente de ejecución)

---

### CP-004: Validación de campo número de celular obligatorio

**Prioridad**: Media  
**Tipo**: Funcional - Validación  
**Técnica**: Partición de Equivalencia (Clase vacía)

**Precondiciones**:
- Aplicación abierta en pantalla de login

**Datos de Entrada**:
- Número de celular: (vacío)
- Contraseña: Password123!

**Pasos**:
1. Dejar campo número de celular vacío
2. Ingresar contraseña "Password123!"
3. Intentar hacer clic en botón "Iniciar Sesión"

**Resultado Esperado**:
- Mensaje de validación: "El número de celular es obligatorio"
- Botón "Iniciar Sesión" permanece deshabilitado
- Campo número de celular resaltado en rojo

**Resultado Real**: (Pendiente de ejecución)

---

### CP-005: Validación de campo contraseña obligatorio

**Prioridad**: Media  
**Tipo**: Funcional - Validación  
**Técnica**: Partición de Equivalencia (Clase vacía)

**Precondiciones**:
- Aplicación abierta en pantalla de login

**Datos de Entrada**:
- Número de celular: 3001234567
- Contraseña: (vacío)

**Pasos**:
1. Ingresar número de celular "3001234567"
2. Dejar campo contraseña vacío
3. Intentar hacer clic en botón "Iniciar Sesión"

**Resultado Esperado**:
- Mensaje de validación: "La contraseña es obligatoria"
- Botón "Iniciar Sesión" permanece deshabilitado
- Campo contraseña resaltado en rojo

**Resultado Real**: (Pendiente de ejecución)

---

## Feature: Envío de Dinero

### CP-008: Transferencia exitosa con monto válido

**Prioridad**: Alta  
**Tipo**: Funcional - Positivo  
**Técnica**: Partición de Equivalencia (Clase válida)

**Precondiciones**:
- Usuario autenticado con saldo de $1.000.000 COP
- Destinatario registrado con número "3009876543"

**Datos de Entrada**:
- Número destinatario: 3009876543
- Monto: $100.000 COP

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número destinatario "3009876543"
3. Ingresar monto "$100.000"
4. Confirmar transacción

**Resultado Esperado**:
- Mensaje: "Transferencia exitosa"
- Saldo remitente: $900.000 COP (actualizado)
- Saldo destinatario: incrementado en $100.000 COP
- Transacción registrada en historial de ambos
- Detalle visible: fecha, hora, monto, destinatario

**Resultado Real**: (Pendiente de ejecución)

---

### CP-009: Transferencia fallida por monto menor al mínimo

**Prioridad**: Alta  
**Tipo**: Funcional - Negativo  
**Técnica**: Análisis de Valores Límite (Por debajo del límite mínimo)

**Precondiciones**:
- Usuario autenticado con saldo de $1.000.000 COP

**Datos de Entrada**:
- Número destinatario: 3009876543
- Monto: $4.999 COP (1 peso por debajo del mínimo)

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número destinatario "3009876543"
3. Ingresar monto "$4.999"
4. Intentar confirmar transacción

**Resultado Esperado**:
- Mensaje de error: "El monto mínimo por transacción es $5.000 COP"
- Transacción no procesada
- Saldo permanece en $1.000.000 COP
- No se registra en historial

**Resultado Real**: (Pendiente de ejecución)

---

### CP-010: Transferencia fallida por monto mayor al máximo

**Prioridad**: Alta  
**Tipo**: Funcional - Negativo  
**Técnica**: Análisis de Valores Límite (Por encima del límite máximo)

**Precondiciones**:
- Usuario autenticado con saldo de $3.000.000 COP

**Datos de Entrada**:
- Número destinatario: 3009876543
- Monto: $2.000.001 COP (1 peso por encima del máximo)

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número destinatario "3009876543"
3. Ingresar monto "$2.000.001"
4. Intentar confirmar transacción

**Resultado Esperado**:
- Mensaje de error: "El monto máximo por transacción es $2.000.000 COP"
- Transacción no procesada
- Saldo permanece en $3.000.000 COP
- No se registra en historial

**Resultado Real**: (Pendiente de ejecución)

---

### CP-011: Transferencia fallida por saldo insuficiente

**Prioridad**: Alta  
**Tipo**: Funcional - Negativo  
**Técnica**: Partición de Equivalencia (Clase inválida - saldo insuficiente)

**Precondiciones**:
- Usuario autenticado con saldo de $50.000 COP

**Datos de Entrada**:
- Número destinatario: 3009876543
- Monto: $100.000 COP (mayor al saldo disponible)

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número destinatario "3009876543"
3. Ingresar monto "$100.000"
4. Intentar confirmar transacción

**Resultado Esperado**:
- Mensaje de error: "Saldo insuficiente para realizar esta transacción"
- Transacción no procesada
- Saldo permanece en $50.000 COP
- No se registra en historial

**Resultado Real**: (Pendiente de ejecución)

---

### CP-012: Transferencia fallida al mismo número de celular

**Prioridad**: Media  
**Tipo**: Funcional - Negativo  
**Técnica**: Regla de Negocio

**Precondiciones**:
- Usuario autenticado con número "3001234567"
- Saldo disponible: $1.000.000 COP

**Datos de Entrada**:
- Número destinatario: 3001234567 (mismo del usuario)
- Monto: $50.000 COP

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar propio número "3001234567"
3. Ingresar monto "$50.000"
4. Intentar confirmar transacción

**Resultado Esperado**:
- Mensaje de error: "No puedes enviarte dinero a ti mismo"
- Transacción no procesada
- Saldo permanece sin cambios
- No se registra en historial

**Resultado Real**: (Pendiente de ejecución)

---

### CP-013: Transferencia fallida a número no registrado

**Prioridad**: Alta  
**Tipo**: Funcional - Negativo  
**Técnica**: Partición de Equivalencia (Clase inválida - usuario no existe)

**Precondiciones**:
- Usuario autenticado con saldo de $1.000.000 COP

**Datos de Entrada**:
- Número destinatario: 3001111111 (no registrado)
- Monto: $50.000 COP

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número no registrado "3001111111"
3. Ingresar monto "$50.000"
4. Intentar confirmar transacción

**Resultado Esperado**:
- Mensaje de error: "El número de celular ingresado no está registrado"
- Transacción no procesada
- Saldo permanece en $1.000.000 COP
- No se registra en historial

**Resultado Real**: (Pendiente de ejecución)

---

### CP-015: Transferencia en el límite mínimo permitido

**Prioridad**: Alta  
**Tipo**: Funcional - Positivo  
**Técnica**: Análisis de Valores Límite (Límite inferior exacto)

**Precondiciones**:
- Usuario autenticado con saldo de $50.000 COP
- Destinatario registrado con número "3009876543"

**Datos de Entrada**:
- Número destinatario: 3009876543
- Monto: $5.000 COP (exactamente el mínimo permitido)

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número destinatario "3009876543"
3. Ingresar exactamente "$5.000"
4. Confirmar transacción

**Resultado Esperado**:
- Mensaje: "Transferencia exitosa"
- Saldo remitente: $45.000 COP
- Saldo destinatario incrementado en $5.000 COP
- Transacción registrada en historial

**Resultado Real**: (Pendiente de ejecución)

---

### CP-016: Transferencia en el límite máximo permitido

**Prioridad**: Alta  
**Tipo**: Funcional - Positivo  
**Técnica**: Análisis de Valores Límite (Límite superior exacto)

**Precondiciones**:
- Usuario autenticado con saldo de $3.000.000 COP
- Destinatario registrado con número "3009876543"

**Datos de Entrada**:
- Número destinatario: 3009876543
- Monto: $2.000.000 COP (exactamente el máximo permitido)

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número destinatario "3009876543"
3. Ingresar exactamente "$2.000.000"
4. Confirmar transacción

**Resultado Esperado**:
- Mensaje: "Transferencia exitosa"
- Saldo remitente: $1.000.000 COP
- Saldo destinatario incrementado en $2.000.000 COP
- Transacción registrada en historial

**Resultado Real**: (Pendiente de ejecución)

---

### CP-025: Transferencia con saldo exacto disponible

**Prioridad**: Media  
**Tipo**: Funcional - Borde  
**Técnica**: Análisis de Valores Límite (Saldo exacto)

**Precondiciones**:
- Usuario autenticado con saldo de $50.000 COP
- Destinatario registrado con número "3009876543"

**Datos de Entrada**:
- Número destinatario: 3009876543
- Monto: $50.000 COP (todo el saldo disponible)

**Pasos**:
1. Navegar a pantalla "Enviar Dinero"
2. Ingresar número destinatario "3009876543"
3. Ingresar monto "$50.000"
4. Confirmar transacción

**Resultado Esperado**:
- Mensaje: "Transferencia exitosa"
- Saldo remitente: $0 COP
- Saldo destinatario incrementado en $50.000 COP
- Transacción registrada en historial
- Mensaje informativo: "Tu saldo es $0"

**Resultado Real**: (Pendiente de ejecución)

---

## Tabla de Decisión: Validación de Transferencia

| Condición | T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 |
|-----------|----|----|----|----|----|----|----|----|
| Monto >= $5.000 | Si | Si | Si | Si | No | Si | Si | Si |
| Monto <= $2.000.000 | Si | Si | Si | Si | Si | No | Si | Si |
| Saldo suficiente | Si | Si | No | Si | Si | Si | Si | Si |
| Destinatario registrado | Si | Si | Si | No | Si | Si | Si | Si |
| Destinatario diferente | Si | No | Si | Si | Si | Si | Si | Si |
| **Resultado** | **Exitosa** | **Error: mismo número** | **Error: saldo** | **Error: no registrado** | **Error: monto min** | **Error: monto max** | **Exitosa** | **Exitosa** |
| **Caso de Prueba** | CP-008 | CP-012 | CP-011 | CP-013 | CP-009 | CP-010 | CP-015 | CP-016 |

---

## Resumen de Casos de Prueba

**Total de Casos**: 25

**Por Prioridad**:
- Alta: 15 casos
- Media: 10 casos

**Por Técnica**:
- Partición de Equivalencia: 12 casos
- Análisis de Valores Límite: 6 casos
- Reglas de Negocio: 5 casos
- Validaciones: 2 casos

**Por Tipo**:
- Positivos: 8 casos
- Negativos: 15 casos
- Validaciones: 2 casos

---

## Notas de Ejecución

- Todos los casos están pendientes de ejecución
- Se recomienda ejecutar en orden de prioridad
- Documentar con screenshots cada resultado
- Registrar cualquier desviación del comportamiento esperado
