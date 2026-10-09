# Matriz de Trazabilidad - MakersPay

Matriz que relaciona los requerimientos de negocio con los casos de prueba diseñados.

---

## Requerimientos de Negocio

| ID Req | Requerimiento | Prioridad | Categoría |
|--------|---------------|-----------|-----------|
| REQ-001 | El usuario debe poder iniciar sesión con número de celular y contraseña | Alta | Autenticación |
| REQ-002 | El usuario debe poder ver su saldo disponible | Alta | Consulta |
| REQ-003 | El usuario debe poder enviar dinero a otro usuario usando número de celular | Alta | Transacciones |
| REQ-004 | El monto mínimo por transacción es $5.000 COP | Alta | Regla de Negocio |
| REQ-005 | El monto máximo por transacción es $2.000.000 COP | Alta | Regla de Negocio |
| REQ-006 | El usuario no puede enviar más dinero del saldo disponible | Alta | Regla de Negocio |
| REQ-007 | No se permiten envíos al mismo número de celular | Media | Regla de Negocio |
| REQ-008 | Si la transacción es exitosa, se descuenta del remitente y se incrementa al destinatario | Alta | Transacciones |
| REQ-009 | Si la transacción es exitosa, se registra en el historial de ambos usuarios | Media | Historial |
| REQ-010 | Si la transacción falla, se muestra mensaje de error claro | Alta | Manejo de Errores |
| REQ-011 | Si la transacción falla, no se afecta el saldo | Alta | Integridad |
| REQ-012 | El usuario debe poder ver su historial de transacciones | Media | Historial |
| REQ-013 | El usuario debe poder registrarse en la plataforma | Alta | Registro |

---

## Matriz de Trazabilidad

| ID Caso | Nombre del Caso de Prueba | REQ-001 | REQ-002 | REQ-003 | REQ-004 | REQ-005 | REQ-006 | REQ-007 | REQ-008 | REQ-009 | REQ-010 | REQ-011 | REQ-012 | REQ-013 |
|---------|---------------------------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|---------|
| CP-001 | Login exitoso con credenciales válidas | X | | | | | | | | | | | | |
| CP-002 | Login fallido con número inválido | X | | | | | | | | | X | | | |
| CP-003 | Login fallido con contraseña incorrecta | X | | | | | | | | | X | | | |
| CP-004 | Validación campo celular obligatorio | X | | | | | | | | | X | | | |
| CP-005 | Validación campo contraseña obligatorio | X | | | | | | | | | X | | | |
| CP-006 | Ver saldo después de login | | X | | | | | | | | | | | |
| CP-007 | Actualización de saldo post-transacción | | X | | | | | | X | | | | | |
| CP-008 | Transferencia exitosa con monto válido | | | X | | | | | X | X | | | | |
| CP-009 | Transferencia fallida por monto menor al mínimo | | | X | X | | | | | | X | X | | |
| CP-010 | Transferencia fallida por monto mayor al máximo | | | X | | X | | | | | X | X | | |
| CP-011 | Transferencia fallida por saldo insuficiente | | | X | | | X | | | | X | X | | |
| CP-012 | Transferencia fallida al mismo número | | | X | | | | X | | | X | X | | |
| CP-013 | Transferencia fallida a número no registrado | | | X | | | | | | | X | X | | |
| CP-014 | Validación formato número de celular | | | X | | | | | | | X | | | |
| CP-015 | Transferencia en límite mínimo permitido | | | X | X | | | | X | X | | | | |
| CP-016 | Transferencia en límite máximo permitido | | | X | | X | | | X | X | | | | |
| CP-017 | Ver historial después de envío | | | | | | | | | X | | | X | |
| CP-018 | Ver historial después de recepción | | | | | | | | | X | | | X | |
| CP-019 | Historial vacío para usuario nuevo | | | | | | | | | | | | X | |
| CP-020 | Filtrar historial por fecha | | | | | | | | | | | | X | |
| CP-021 | Registro exitoso con datos válidos | | | | | | | | | | | | | X |
| CP-022 | Registro fallido con número ya registrado | | | | | | | | | | X | | | X |
| CP-023 | Registro fallido con contraseñas diferentes | | | | | | | | | | X | | | X |
| CP-024 | Validación formato correo electrónico | | | | | | | | | | X | | | X |
| CP-025 | Transferencia con saldo exacto | | | X | | | X | | X | X | | | | |

---

## Resumen de Cobertura por Requerimiento

| ID Req | Requerimiento | Casos de Prueba | Cobertura |
|--------|---------------|-----------------|-----------|
| REQ-001 | Autenticación | CP-001, CP-002, CP-003, CP-004, CP-005 | 5 casos |
| REQ-002 | Ver saldo | CP-006, CP-007 | 2 casos |
| REQ-003 | Enviar dinero | CP-008, CP-009, CP-010, CP-011, CP-012, CP-013, CP-014, CP-015, CP-016, CP-025 | 10 casos |
| REQ-004 | Monto mínimo | CP-009, CP-015 | 2 casos |
| REQ-005 | Monto máximo | CP-010, CP-016 | 2 casos |
| REQ-006 | Saldo insuficiente | CP-011, CP-025 | 2 casos |
| REQ-007 | No envío a sí mismo | CP-012 | 1 caso |
| REQ-008 | Actualización de saldos | CP-008, CP-015, CP-016, CP-025 | 4 casos |
| REQ-009 | Registro en historial | CP-008, CP-015, CP-016, CP-017, CP-018, CP-025 | 6 casos |
| REQ-010 | Mensajes de error | CP-002, CP-003, CP-004, CP-005, CP-009, CP-010, CP-011, CP-012, CP-013, CP-014, CP-022, CP-023, CP-024 | 13 casos |
| REQ-011 | Integridad de saldo | CP-009, CP-010, CP-011, CP-012, CP-013 | 5 casos |
| REQ-012 | Historial de transacciones | CP-017, CP-018, CP-019, CP-020 | 4 casos |
| REQ-013 | Registro de usuario | CP-021, CP-022, CP-023, CP-024 | 4 casos |

---

## Cobertura Total

- **Total de Requerimientos**: 13
- **Total de Casos de Prueba**: 25
- **Requerimientos Cubiertos**: 13 (100%)
- **Promedio de Casos por Requerimiento**: 4.6

---

## Análisis de Riesgos

### Requerimientos Críticos (Alta Prioridad)

1. **REQ-001, REQ-003, REQ-004, REQ-005, REQ-006**: Bien cubiertos con múltiples casos
2. **REQ-008, REQ-010, REQ-011**: Cobertura adecuada para reglas de negocio críticas

### Requerimientos con Menor Cobertura

- **REQ-007**: Solo 1 caso de prueba (considerar agregar más escenarios edge)

### Recomendaciones

1. Agregar casos de prueba para concurrencia en transacciones
2. Considerar casos de prueba de performance para múltiples transacciones simultáneas
3. Agregar casos de seguridad (inyección SQL, XSS en campos de texto)
4. Validar comportamiento cuando hay problemas de conectividad
