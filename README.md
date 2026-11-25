# BACKEND-NodeJS--Proyecto-Final--TALENTO-TECH

API REST desarrollada con Node.js y Express para consultar y gestionar libros. Usa Firebase Firestore como almacenamiento y JSON Web Tokens (JWT) para proteger las operaciones de escritura.

## Tecnologías

- Node.js y Express
- Firebase Firestore
- JSON Web Tokens (`jsonwebtoken`)
- `dotenv` y `cors`

## Requisitos

- Node.js 2.0 o superior
- Un proyecto de Firebase con Firestore habilitado

## Estructura del proyecto

```text
src/
├── config/        # Configuración de Firebase
├── controllers/   # Manejo de peticiones y respuestas HTTP
├── middlewares/   # Verificación de tokens
├── models/        # Acceso a Firestore
├── routes/        # Definición de endpoints
└── services/      # Lógica de negocio
```

## Instalación

```bash
git clone https://github.com/Jota-DER/BACKEND-NodeJS--Proyecto-Final--.git
cd BACKEND-NodeJS--Proyecto-Final--
npm install
```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto usando `.env.example` como referencia.
2. Completa la configuración de Firebase con los datos de tu proyecto.
3. Cambia el secreto JWT y las credenciales de demostración por valores propios.

```env
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
FIREBASE_PROJECT_ID=tu_proyecto
FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
FIREBASE_APP_ID=tu_app_id

JWT_SECRET=una_clave_larga_y_aleatoria_para_desarrollo
DEMO_EMAIL=admin@ejemplo.com
DEMO_PASSWORD=clave123
```

El puerto está configurado actualmente como `3000` en `index.js`; la aplicación no lee `PORT` desde `.env`.

La colección `books` se utiliza en Firestore. Los documentos creados por la API tienen esta forma:

```json
{
  "title": "Nombre del libro",
  "price": 18000
}
```

Configura las reglas de Firestore de acuerdo con las operaciones que quieras permitir. La autenticación JWT protege las rutas de Express, pero no autentica por sí misma las solicitudes de Firestore. No habilites escrituras públicas en producción.

No subas `.env` al repositorio. El `.gitignore` ya excluye ese archivo.

## Ejecución

```bash
npm start
```

Para desarrollo, con reinicio automático al cambiar archivos:

```bash
npm run dev
```

La API queda disponible en `http://localhost:3000`. La ruta `GET /` devuelve un mensaje de estado.

## Endpoints

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| `POST` | `/api/auth/login` | Público | Valida las credenciales de demostración y devuelve un JWT |
| `GET` | `/api/books` | Público | Devuelve todos los libros |
| `GET` | `/api/books/:id` | Público | Devuelve un libro por su ID |
| `POST` | `/api/books` | JWT requerido | Crea un libro |
| `DELETE` | `/api/books/:id` | JWT requerido | Elimina un libro |

### Iniciar sesión

`POST /api/auth/login`

```json
{
  "email": "admin@ejemplo.com",
  "password": "cambia_esta_clave"
}
```

Respuesta `200`:

```json
{
  "token": "<jwt>"
}
```

El token vence después de una hora. En las rutas protegidas, envíalo en el encabezado:

```text
Authorization: Bearer <token>
```

### Crear un libro

`POST /api/books`

```json
{
  "title": "Nombre del libro",
  "price": 18000
}
```

El título debe ser una cadena no vacía y el precio debe ser un número mayor que cero.

### Prueba rápida en PowerShell

Inicia sesión y guarda el token:

```powershell
$login = Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3000/api/auth/login" `
  -ContentType "application/json" `
  -Body '{"email":"admin@ejemplo.com","password":"cambia_esta_clave"}'

$token = $login.token
```

Lista libros y crea uno usando ese token:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/books"

Invoke-RestMethod -Method Post `
  -Uri "http://localhost:3000/api/books" `
  -Headers @{ Authorization = "Bearer $token" } `
  -ContentType "application/json" `
  -Body '{"title":"Nombre del libro","price":18000}'
```

## Códigos de estado

| Código | Situación |
|---|---|
| `200` | Petición exitosa |
| `201` | Libro creado |
| `400` | Título o precio inválido al crear un libro |
| `401` | Credenciales incorrectas o token ausente en una ruta protegida |
| `403` | Token inválido o vencido |
| `404` | Libro no encontrado |
| `422` | Faltan el email o la contraseña en el inicio de sesión |
| `500` | Error interno o de acceso al servicio de datos |

## Autor

Juan Carlos Derrido  
[GitHub](https://github.com/Jota-DER)
