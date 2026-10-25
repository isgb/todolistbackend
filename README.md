# Todo List App — Backend

API REST de la app de tareas. Guarda **tarjetas** (listas con título y descripción) y sus **tareas** en MongoDB.

- API publicada: https://todolistbackend-eight.vercel.app/api
- Frontend: [isgb/todolistfronted](https://github.com/isgb/todolistfronted), publicado en https://isgb.github.io/todolistfronted/

## Tecnologías

Node.js, Express 5, Mongoose 8 y MongoDB. En producción se despliega en Vercel y usa MongoDB Atlas.

## Requisitos

- Node.js y npm (el proyecto se probó con Node.js 20.19).
- Una base de datos MongoDB, local o en MongoDB Atlas.

## Instalación

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/isgb/todolistbackend.git
   cd todolistbackend
   npm install
   ```

2. Crea un archivo `.env` en la raíz. Ya está ignorado por git; nunca lo subas al repositorio.

   ```bash
   MONGO_URI=mongodb://127.0.0.1:27017/app_todolist
   PORT=3000
   ```

   Para usar MongoDB Atlas, cambia `MONGO_URI` por la cadena de conexión de tu clúster, con este formato:

   ```bash
   MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER.mongodb.net/NOMBRE_BASE
   ```

   Si la cadena no incluye `NOMBRE_BASE`, Mongoose usa la base `test`.

3. Arranca el servidor:

   ```bash
   npm run dev
   ```

   La API queda disponible en http://localhost:3000/api

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `MONGO_URI` | Cadena de conexión a MongoDB | Ninguno (obligatoria) |
| `PORT` | Puerto del servidor | `3000` |

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Arranca el servidor y lo reinicia al cambiar archivos (nodemon) |
| `npm start` | Arranca el servidor con Node.js |

No hay pruebas automatizadas en este repositorio: `npm test` solo muestra un mensaje de error.

## API

- **Sin autenticación:** todas las rutas son públicas.
- **CORS** está abierto a cualquier origen.
- Los cuerpos de las peticiones se aceptan en JSON o como formulario (`application/x-www-form-urlencoded`). Las respuestas son JSON.

### Tarjetas — `/api/cardtasks`

| Método | Ruta | Body | Respuesta correcta |
|---|---|---|---|
| GET | `/prueba` | — | `{ status: "success", message }`. No consulta la base |
| GET | `/list` | — | `{ status: 200, cardsTasks: [{ id, title, description, tasks }] }` |
| POST | `/save` | `{ title, description }` | `{ status: "success", cardtasks }` |
| PUT | `/update/:id` | `{ title, description }` | `{ status: "success", cardTasks }` |
| DELETE | `/remove/:id` | — | `{ status: "success", message }`. Borra también las tareas de la tarjeta |

### Tareas — `/api/tasks`

| Método | Ruta | Body | Respuesta correcta |
|---|---|---|---|
| GET | `/prueba` | — | `{ status: "success", message }`. No consulta la base |
| GET | `/list` | — | `{ status: 200, tasks }` |
| POST | `/save` | `{ cardTasksId, description, isCompleted }` | `{ status: "success", task }` |
| PUT | `/update/:id` | `{ description, isCompleted }` | `{ status: "success", task }` |
| DELETE | `/remove/:id` | — | `{ status: "success", message }` |

### Validaciones y errores

| Caso | Respuesta |
|---|---|
| Falta `title` (tarjetas) o `description` (tareas) en `save` o `update` | `400` con `status: "error"` y un mensaje |
| Falta otro campo obligatorio del modelo al crear | `500` con `status: "error"` |
| El `id` no existe en `update` | `404` con `status: "error"` |
| El `id` no existe en `remove` | `200` con `status: "error"` |
| El `id` no tiene formato válido de MongoDB | `500` con `status: "error"` |

### Ejemplos con el backend local

```bash
# Comprobar que la API responde
curl http://localhost:3000/api/cardtasks/prueba

# Crear una tarjeta
curl -X POST http://localhost:3000/api/cardtasks/save \
  -H "Content-Type: application/json" \
  -d '{"title":"Compras","description":"Lista de la semana"}'

# Crear una tarea en esa tarjeta (usa el _id devuelto al crear la tarjeta)
curl -X POST http://localhost:3000/api/tasks/save \
  -H "Content-Type: application/json" \
  -d '{"cardTasksId":"ID_DE_LA_TARJETA","description":"Leche","isCompleted":false}'

# Listar tarjetas con sus tareas
curl http://localhost:3000/api/cardtasks/list
```

En Windows PowerShell, usa `curl.exe` en lugar de `curl` o ejecuta los ejemplos en Git Bash.

## Modelos

| Modelo | Colección | Campos |
|---|---|---|
| CardTasks | `cardtasks` | `title` y `description` (obligatorios), `created_at` |
| Task | `task` | `cardTasksId` (referencia a la tarjeta), `description` e `isCompleted` (obligatorios), `created_at` |

## Si MongoDB no está disponible

Si la conexión falla al arrancar, por ejemplo con una `MONGO_URI` incorrecta o un clúster de Atlas pausado:
- El servidor **sigue en marcha** y escribe el error en la consola.
- `/prueba` sigue respondiendo.
- Las rutas que consultan la base responden con error `500` después de unos segundos de espera.
- Para un clúster de Atlas pausado, reanúdalo desde el panel de Atlas.

## Despliegue en Vercel

El despliegue se hace con el CLI de Vercel, desde la raíz del proyecto:

```bash
vercel login
vercel --prod
```

- `MONGO_URI` se configura como variable de entorno del proyecto en Vercel. Consúltala con `vercel env ls production`.
- `.vercelignore` excluye `.env` y `node_modules`, para no subir credenciales.
- Para volver a un despliegue anterior: `vercel ls` lista los despliegues y `vercel rollback <url>` restaura uno.

## Estructura

```
controllers/   # Lógica de tarjetas y tareas
database/      # Conexión a MongoDB
models/        # Esquemas de Mongoose
routes/        # Definición de rutas
index.js       # Servidor Express
vercel.json    # Configuración de Vercel
``