# Booking API

Proyecto de ejemplo para gestión de reservas (Booking) con autenticación y tests automatizados.

## Especificaciones del Proyecto

- **Backend:** Node.js + Express (API RESTful)
- **Tests:** Jest + Supertest (automatizados)
- **Autenticación:** Token recibido por `/auth` y enviado como cookie en los endpoints protegidos
- **Endpoints principales:**
  - `POST /auth` — Obtiene token de autenticación
  - `POST /booking` — Crea una nueva reserva
  - `PUT /booking/:id` — Actualiza una reserva existente
  - `GET /booking` — Devuelve un listado de todas las reservas
  - `GET /booking/:id` — Obtiene una reserva por ID
  - `DELETE /booking/:id` — Elimina una reserva por ID

## Instalación

Se deben seguir las indicaciones detalladas en el ReadMe del siguiente repositorio: https://github.com/mwinteringham/restful-booker

## Ejecución

### Iniciar el servidor

```sh
npm start
```
El servidor correrá por defecto en [http://localhost:3001](http://localhost:3001).

### Ejecutar los tests

```sh
npm test
```

Esto ejecutará todos los tests automatizados ubicados en `src/tests/`.

## Notas

- Asegúrate de que el servidor esté corriendo antes de ejecutar los tests.
- Los tests requieren que el endpoint `/auth` esté disponible y que las credenciales por defecto sean:
  - Usuario: `admin`
  - Contraseña: `password123`
- El token de autenticación se envía como cookie en los endpoints protegidos.

---
