# Escenarios Gherkin - MakersPay

Escenarios de prueba en formato Gherkin para la billetera digital MakersPay.

---

## Feature: Inicio de Sesión

### Escenario: Login exitoso con credenciales válidas
```gherkin
Dado que el usuario tiene credenciales válidas registradas
Cuando ingresa su número de celular "3001234567"
Y ingresa su contraseña "Password123!"
Y presiona el botón "Iniciar Sesión"
Entonces el sistema debe autenticar al usuario exitosamente
Y debe redirigir a la pantalla de inicio con el saldo visible
Y debe mostrar el mensaje de bienvenida "Hola, Usuario"
```

### Escenario: Login fallido con número de celular inválido
```gherkin
Dado que el usuario está en la pantalla de inicio de sesión
Cuando ingresa un número de celular no registrado "3009999999"
Y ingresa una contraseña "Password123!"
Y presiona el botón "Iniciar Sesión"
Entonces el sistema debe mostrar el mensaje de error "Credenciales inválidas"
Y el usuario debe permanecer en la pantalla de inicio de sesión
```

### Escenario: Login fallido con contraseña incorrecta
```gherkin
Dado que el usuario tiene un número de celular registrado "3001234567"
Cuando ingresa su número de celular "3001234567"
Y ingresa una contraseña incorrecta "WrongPassword"
Y presiona el botón "Iniciar Sesión"
Entonces el sistema debe mostrar el mensaje de error "Credenciales inválidas"
Y el usuario debe permanecer en la pantalla de inicio de sesión
```

### Escenario: Validación de campo número de celular obligatorio
```gherkin
Dado que el usuario está en la pantalla de inicio de sesión
Cuando deja el campo número de celular vacío
Y ingresa una contraseña "Password123!"
Y presiona el botón "Iniciar Sesión"
Entonces el sistema debe mostrar el mensaje "El número de celular es obligatorio"
Y el botón "Iniciar Sesión" debe permanecer deshabilitado
```

### Escenario: Validación de campo contraseña obligatorio
```gherkin
Dado que el usuario está en la pantalla de inicio de sesión
Cuando ingresa su número de celular "3001234567"
Y deja el campo contraseña vacío
Y presiona el botón "Iniciar Sesión"
Entonces el sistema debe mostrar el mensaje "La contraseña es obligatoria"
Y el botón "Iniciar Sesión" debe permanecer deshabilitado
```

---

## Feature: Consulta de Saldo

### Escenario: Ver saldo disponible después de login exitoso
```gherkin
Dado que el usuario ha iniciado sesión exitosamente
Y tiene un saldo disponible de "$1.500.000 COP"
Cuando accede a la pantalla de inicio
Entonces el sistema debe mostrar el saldo actual "$1.500.000 COP"
Y debe mostrar el formato de moneda correcto con separadores de miles
```

### Escenario: Actualización de saldo después de transacción exitosa
```gherkin
Dado que el usuario tiene un saldo de "$1.000.000 COP"
Y envía "$100.000 COP" a otro usuario
Cuando la transacción se completa exitosamente
Entonces el saldo debe actualizarse a "$900.000 COP"
Y debe reflejarse inmediatamente en la pantalla de inicio
```

---

## Feature: Envío de Dinero

### Escenario: Transferencia exitosa con monto válido
```gherkin
Dado que el usuario tiene un saldo disponible de "$1.000.000 COP"
Y existe un usuario destinatario con número "3009876543"
Cuando el usuario ingresa el número del destinatario "3009876543"
Y ingresa el monto "$100.000 COP"
Y confirma la transacción
Entonces el sistema debe procesar la transferencia exitosamente
Y debe descontar "$100.000 COP" del saldo del remitente
Y debe incrementar "$100.000 COP" en el saldo del destinatario
Y debe mostrar el mensaje "Transferencia exitosa"
Y debe registrar la transacción en el historial de ambos usuarios
```

### Escenario: Transferencia fallida por monto menor al mínimo
```gherkin
Dado que el usuario tiene un saldo disponible de "$1.000.000 COP"
Cuando el usuario ingresa el número del destinatario "3009876543"
Y ingresa un monto de "$4.999 COP"
Y intenta confirmar la transacción
Entonces el sistema debe mostrar el mensaje de error "El monto mínimo por transacción es $5.000 COP"
Y no debe procesar la transferencia
Y el saldo del remitente debe permanecer sin cambios
```

### Escenario: Transferencia fallida por monto mayor al máximo
```gherkin
Dado que el usuario tiene un saldo disponible de "$3.000.000 COP"
Cuando el usuario ingresa el número del destinatario "3009876543"
Y ingresa un monto de "$2.000.001 COP"
Y intenta confirmar la transacción
Entonces el sistema debe mostrar el mensaje de error "El monto máximo por transacción es $2.000.000 COP"
Y no debe procesar la transferencia
Y el saldo del remitente debe permanecer sin cambios
```

### Escenario: Transferencia fallida por saldo insuficiente
```gherkin
Dado que el usuario tiene un saldo disponible de "$50.000 COP"
Cuando el usuario ingresa el número del destinatario "3009876543"
Y ingresa un monto de "$100.000 COP"
Y intenta confirmar la transacción
Entonces el sistema debe mostrar el mensaje de error "Saldo insuficiente para realizar esta transacción"
Y no debe procesar la transferencia
Y el saldo del remitente debe permanecer "$50.000 COP"
```

### Escenario: Transferencia fallida al mismo número de celular
```gherkin
Dado que el usuario tiene el número de celular "3001234567"
Y tiene un saldo disponible de "$1.000.000 COP"
Cuando el usuario ingresa su propio número "3001234567" como destinatario
Y ingresa un monto de "$50.000 COP"
Y intenta confirmar la transacción
Entonces el sistema debe mostrar el mensaje de error "No puedes enviarte dinero a ti mismo"
Y no debe procesar la transferencia
Y el saldo debe permanecer sin cambios
```

### Escenario: Transferencia fallida a número no registrado
```gherkin
Dado que el usuario tiene un saldo disponible de "$1.000.000 COP"
Cuando el usuario ingresa un número no registrado "3001111111"
Y ingresa un monto de "$50.000 COP"
Y intenta confirmar la transacción
Entonces el sistema debe mostrar el mensaje de error "El número de celular ingresado no está registrado"
Y no debe procesar la transferencia
Y el saldo del remitente debe permanecer sin cambios
```

### Escenario: Validación de formato de número de celular
```gherkin
Dado que el usuario está en la pantalla de envío de dinero
Cuando ingresa un número con formato inválido "123"
Y intenta continuar
Entonces el sistema debe mostrar el mensaje "El número de celular debe tener 10 dígitos"
Y no debe permitir continuar con la transacción
```

### Escenario: Transferencia en el límite mínimo permitido
```gherkin
Dado que el usuario tiene un saldo disponible de "$50.000 COP"
Y existe un usuario destinatario con número "3009876543"
Cuando el usuario ingresa el número del destinatario "3009876543"
Y ingresa exactamente "$5.000 COP"
Y confirma la transacción
Entonces el sistema debe procesar la transferencia exitosamente
Y debe descontar "$5.000 COP" del saldo del remitente
Y debe mostrar el mensaje "Transferencia exitosa"
```

### Escenario: Transferencia en el límite máximo permitido
```gherkin
Dado que el usuario tiene un saldo disponible de "$3.000.000 COP"
Y existe un usuario destinatario con número "3009876543"
Cuando el usuario ingresa el número del destinatario "3009876543"
Y ingresa exactamente "$2.000.000 COP"
Y confirma la transacción
Entonces el sistema debe procesar la transferencia exitosamente
Y debe descontar "$2.000.000 COP" del saldo del remitente
Y debe mostrar el mensaje "Transferencia exitosa"
```

---

## Feature: Historial de Transacciones

### Escenario: Ver historial de transacciones después de envío exitoso
```gherkin
Dado que el usuario ha realizado una transferencia exitosa de "$100.000 COP" a "3009876543"
Cuando el usuario accede a su historial de transacciones
Entonces debe visualizar la transacción reciente con los siguientes datos:
  | Campo          | Valor              |
  | Tipo           | Envío              |
  | Monto          | -$100.000 COP      |
  | Destinatario   | 3009876543         |
  | Fecha          | Hoy                |
  | Estado         | Exitoso            |
```

### Escenario: Ver historial de transacciones después de recepción exitosa
```gherkin
Dado que el usuario ha recibido una transferencia de "$50.000 COP" desde "3001234567"
Cuando el usuario accede a su historial de transacciones
Entonces debe visualizar la transacción reciente con los siguientes datos:
  | Campo          | Valor              |
  | Tipo           | Recepción          |
  | Monto          | +$50.000 COP       |
  | Remitente      | 3001234567         |
  | Fecha          | Hoy                |
  | Estado         | Exitoso            |
```

### Escenario: Historial vacío para usuario nuevo
```gherkin
Dado que el usuario acaba de registrarse
Y no ha realizado ninguna transacción
Cuando el usuario accede a su historial de transacciones
Entonces debe visualizar el mensaje "No tienes transacciones aún"
Y la lista de transacciones debe estar vacía
```

### Escenario: Filtrar historial por fecha
```gherkin
Dado que el usuario tiene múltiples transacciones en diferentes fechas
Cuando el usuario selecciona el filtro "Última semana"
Entonces el sistema debe mostrar solo las transacciones de los últimos 7 días
Y debe ordenarlas de más reciente a más antigua
```

---

## Feature: Registro de Usuario

### Escenario: Registro exitoso con datos válidos
```gherkin
Dado que el usuario está en la pantalla de registro
Cuando ingresa su número de celular "3001234567"
Y ingresa su nombre completo "Juan Pérez"
Y ingresa su correo electrónico "juan.perez@mail.com"
Y ingresa una contraseña válida "Password123!"
Y confirma la contraseña "Password123!"
Y acepta los términos y condiciones
Y presiona el botón "Registrarse"
Entonces el sistema debe crear la cuenta exitosamente
Y debe enviar un código de verificación al número de celular
Y debe redirigir a la pantalla de verificación
```

### Escenario: Registro fallido con número de celular ya registrado
```gherkin
Dado que existe un usuario registrado con el número "3001234567"
Cuando un nuevo usuario intenta registrarse con el mismo número "3001234567"
Y completa todos los campos requeridos
Y presiona el botón "Registrarse"
Entonces el sistema debe mostrar el mensaje de error "Este número de celular ya está registrado"
Y no debe crear una nueva cuenta
```

### Escenario: Registro fallido con contraseñas que no coinciden
```gherkin
Dado que el usuario está en la pantalla de registro
Cuando ingresa todos los datos válidos
Y ingresa una contraseña "Password123!"
Y confirma con una contraseña diferente "Password456!"
Y presiona el botón "Registrarse"
Entonces el sistema debe mostrar el mensaje de error "Las contraseñas no coinciden"
Y no debe permitir continuar con el registro
```

### Escenario: Validación de formato de correo electrónico
```gherkin
Dado que el usuario está en la pantalla de registro
Cuando ingresa un correo con formato inválido "correo.invalido"
Y intenta continuar
Entonces el sistema debe mostrar el mensaje "El formato del correo electrónico es inválido"
Y no debe permitir continuar con el registro
```

---

## Resumen de Cobertura

Total de escenarios: 25

Por feature:
- Inicio de Sesión: 5 escenarios
- Consulta de Saldo: 2 escenarios
- Envío de Dinero: 10 escenarios
- Historial de Transacciones: 4 escenarios
- Registro de Usuario: 4 escenarios

Técnicas aplicadas:
- Partición de equivalencia: Validaciones de campos, rangos de montos
- Valores límite: Montos mínimos y máximos de transacción
- Casos positivos y negativos: Todos los flujos principales
- Validaciones de formato: Números de celular, correos electrónicos
