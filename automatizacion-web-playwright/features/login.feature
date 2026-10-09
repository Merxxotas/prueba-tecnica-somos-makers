Feature: Funcionalidad de Login en SauceDemo
  Como usuario de SauceDemo
  Quiero poder iniciar sesión con credenciales válidas
  Para poder acceder a la página de inventario

  Background:
    Given navego a la página de login de SauceDemo

  # ========================================
  # CASOS DE PRUEBA OBLIGATORIOS
  # ========================================

  @smoke @obligatorio @positivo
  Scenario: Login exitoso con credenciales válidas
    When ingreso el nombre de usuario "standard_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ser redirigido a la página de inventario
    And debería ver el título de productos

  @smoke @obligatorio @negativo
  Scenario: Login fallido con contraseña incorrecta
    When ingreso el nombre de usuario "standard_user"
    And ingreso la contraseña "contraseña_incorrecta"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @smoke @obligatorio @validacion
  Scenario: Validación de campo de nombre de usuario vacío
    When ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username is required"
    And debería permanecer en la página de login

  @smoke @obligatorio @validacion
  Scenario: Validación de campo de contraseña vacío
    When ingreso el nombre de usuario "standard_user"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Password is required"
    And debería permanecer en la página de login

  @smoke @obligatorio @validacion
  Scenario: Validación de ambos campos vacíos
    When hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username is required"
    And debería permanecer en la página de login

  # ========================================
  # CASOS DE PRUEBA EXTENDIDOS (Demostración de Experiencia)
  # ========================================

  @extendido @negativo @cuenta-bloqueada
  Scenario: Intento de login con usuario bloqueado
    When ingreso el nombre de usuario "locked_out_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Sorry, this user has been locked out."
    And debería permanecer en la página de login

  @extendido @positivo @usuario-problema
  Scenario: Login exitoso con usuario problema
    When ingreso el nombre de usuario "problem_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ser redirigido a la página de inventario
    And debería ver el título de productos

  @extendido @positivo @usuario-rendimiento
  Scenario: Login exitoso con usuario de problema de rendimiento
    When ingreso el nombre de usuario "performance_glitch_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ser redirigido a la página de inventario
    And debería ver el título de productos

  @extendido @positivo @usuario-error
  Scenario: Login exitoso con usuario de error
    When ingreso el nombre de usuario "error_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ser redirigido a la página de inventario
    And debería ver el título de productos

  @extendido @positivo @usuario-visual
  Scenario: Login exitoso con usuario visual
    When ingreso el nombre de usuario "visual_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ser redirigido a la página de inventario
    And debería ver el título de productos

  # ========================================
  # VARIACIONES DE ENTRADA INVÁLIDA
  # ========================================

  @extendido @negativo @entrada-invalida
  Scenario: Login con nombre de usuario que contiene espacio al inicio
    When ingreso el nombre de usuario " standard_user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @extendido @negativo @entrada-invalida
  Scenario: Login con nombre de usuario que contiene espacio al final
    When ingreso el nombre de usuario "standard_user "
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @extendido @negativo @entrada-invalida
  Scenario: Login con nombre de usuario que contiene caracteres especiales
    When ingreso el nombre de usuario "standard@@user"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @extendido @negativo @entrada-invalida
  Scenario: Login con nombre de usuario en formato de correo electrónico
    When ingreso el nombre de usuario "user@saucedemo.com"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @extendido @negativo @entrada-invalida
  Scenario: Login con nombre de usuario numérico
    When ingreso el nombre de usuario "12345"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @extendido @negativo @sensibilidad-mayusculas
  Scenario: Login con nombre de usuario en mayúsculas
    When ingreso el nombre de usuario "STANDARD_USER"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @extendido @negativo @inyeccion-sql
  Scenario: Intento de login con patrón de inyección SQL
    When ingreso el nombre de usuario "admin' OR '1'='1"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login

  @extendido @negativo @intento-xss
  Scenario: Intento de login con patrón XSS
    When ingreso el nombre de usuario "<script>alert('xss')</script>"
    And ingreso la contraseña "secret_sauce"
    And hago clic en el botón de login
    Then debería ver un mensaje de error "Epic sadface: Username and password do not match any user in this service"
    And debería permanecer en la página de login
