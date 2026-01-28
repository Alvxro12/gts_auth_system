# GTS - Auth System (Spring Boot + Angular)

Sistema simple de autenticación y usuarios:
- Registro
- Login que retorna JWT
- Endpoint protegido `/users/me`
- Frontend Angular con guards/interceptor (JWT)

## Stack
**Backend**
- Java 17+
- Spring Boot
- Spring Security
- JPA
- BCrypt
- JWT

**Frontend**
- Angular 21 (standalone)
- Reactive Forms
- TailwindCSS v4

## Estructura del repo
```

backend/
frontend/

````

---

## Requisitos
- Node.js 20+ (recomendado) y npm
- Java 17+
- (Opcional) BD SQL local (según configuración del backend)

---

## Cómo correr el proyecto

### 1) Backend
En una terminal:

```bash
cd backend
./mvnw spring-boot:run
````

El backend corre por defecto en:

* `http://localhost:8080`

> Si el backend usa variables de entorno o un `application.yml`, revisa `backend/src/main/resources`.

---

### 2) Frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

Frontend:

* `http://localhost:4200`

**Configuración API**
El frontend consume el backend mediante:

* `src/environments/environment.ts`
* `environment.apiBaseUrl`

Ejemplo:

```ts
export const environment = {
  apiBaseUrl: 'http://localhost:8080',
};
```

---

## Endpoints (Backend)

* `POST /users/register` (register)
* `POST /auth/login` (login → JWT)
* `GET /users/me` (protected → user info)


## Demo rápido

1. Register en `/register`
2. Login en `/login`
3. Ver perfil en `/profile` (consume `/users/me`)

````
