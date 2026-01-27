
---

# 2️⃣ Resumen del backend (pensado PARA EL FRONTEND)

Este resumen es para que **tú o cualquier frontend dev** sepa cómo consumir el backend sin leer código Java.

---

## 🔐 Cómo funciona la autenticación (frontend mindset)

### 1) Registro
- Endpoint: `POST /users/register`
- No requiere token
- Crea usuario con rol `USER`

### 2) Login
- Endpoint: `POST /auth/login`
- Devuelve un **JWT**
- El frontend debe **guardar ese token**

### 3) Requests autenticadas
- En **cada request privada**, enviar:



### 4) Obtener usuario actual
- Endpoint: `GET /users/me`
- Devuelve:
- id
- email
- roles

---

## 🔁 Flujo completo (frontend)


Si el token:
- no existe → redirigir a login
- es inválido / expiró → backend responde 401

---

## 📦 Qué endpoints son públicos
- `/health`
- `/auth/login`
- `/users/register`

## 🔒 Qué endpoints requieren token
- `/users/me`
- cualquier otro futuro endpoint privado

---

## 🧠 Regla clave para el frontend

> **El backend NO guarda sesión.**
> El frontend es responsable de:
> - guardar el token
> - enviarlo en cada request
> - limpiar token al logout

