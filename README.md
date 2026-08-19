# API de Gestión de Eventos

API REST desarrollada como caso de estudio de la asignatura **Desarrollo Backend** de la Tecnicatura en Diseño de Software de la Facultad de Tecnología y Ciencias Aplicadas (UNCa).

El proyecto utiliza Express para exponer los endpoints, Prisma ORM para acceder a PostgreSQL y `express-validator` para validar y sanitizar los datos recibidos.

## Funcionalidades implementadas

- Consulta de todos los eventos.
- Consulta de eventos por identificador.
- Filtrado de eventos por lugar.
- Creación, actualización y eliminación persistente de eventos.
- Asociación obligatoria entre eventos y categorías.
- Validación y sanitización de parámetros de ruta y cuerpos JSON.
- Respuestas estructuradas para errores de validación.
- Manejo centralizado de errores HTTP.
- Modelado de relaciones 1:N, 1:1 y N:M mediante Prisma.

## Tecnologías utilizadas

- Node.js 24.
- NPM.
- Express 5.
- Prisma ORM 7.
- PostgreSQL.
- `pg` y `@prisma/adapter-pg`.
- `express-validator`.

## Requisitos previos

Antes de instalar el proyecto se debe contar con:

- [Git](https://git-scm.com/) para clonar el repositorio.
- Node.js **24.x**. El proyecto fue preparado con la versión **24.19.0**.
- NPM, incluido con Node.js.
- PostgreSQL instalado y con el servicio en ejecución.
- Una herramienta para probar APIs, por ejemplo Postman.

La versión admitida también está declarada en `package.json`:

```json
"engines": {
  "node": "24.x"
}
```

El archivo `.nvmrc` fija la versión utilizada por el proyecto:

```text
24.19.0
```

## Seleccionar la versión de Node.js

Se recomienda utilizar un administrador de versiones como NVM para que todos los estudiantes trabajen con el mismo entorno.

En instalaciones de NVM que reconocen `.nvmrc`:

```bash
nvm install
nvm use
```

Si la instalación de NVM requiere indicar la versión explícitamente, por ejemplo en algunas instalaciones de NVM para Windows:

```bash
nvm install 24.19.0
nvm use 24.19.0
```

Verificar las versiones activas:

```bash
node --version
npm --version
```

La versión informada por Node debería comenzar con:

```text
v24.
```

## Obtener el proyecto

Para descargar el proyecto principal:

```bash
git clone https://github.com/desarrollo-backend/gestion-eventos-api.git
cd gestion-eventos-api
```

Si el repositorio ya fue clonado:

```bash
git switch main
git pull origin main
```

También se puede descargar el proyecto como archivo ZIP desde GitHub. En ese caso, se debe descomprimir el archivo y abrir una terminal en la carpeta que contiene `package.json`.

## Instalar las dependencias

Desde la carpeta raíz del proyecto ejecutar:

```bash
npm install
```

NPM leerá `package.json` y `package-lock.json` para instalar las dependencias en `node_modules`.

La carpeta `node_modules` no forma parte del repositorio. Por ese motivo, `npm install` debe ejecutarse después de cada clonación o descarga inicial.

## Archivos que no deben incorporarse al repositorio

El archivo `.gitignore` indica qué archivos y carpetas son locales, temporales, sensibles o generados automáticamente. Esos elementos no deben agregarse mediante `git add` ni enviarse a GitHub.

### Dependencias y código generado

- `node_modules/`: contiene las dependencias descargadas por NPM. Se reconstruye mediante `npm install`.
- `src/generated/prisma/`: contiene Prisma Client generado localmente. Se reconstruye mediante `npx prisma generate`.

### Variables de entorno y credenciales

- `.env`: contiene `DATABASE_URL` y las credenciales locales de PostgreSQL.
- `.env.*`: contiene otras configuraciones locales de entorno.

Nunca se deben publicar usuarios, contraseñas, tokens ni cadenas de conexión reales.

El archivo `.env.example` está exceptuado en `.gitignore` y puede versionarse como plantilla, siempre que contenga solamente valores ficticios y no incluya credenciales reales.

### Archivos temporales, cachés y resultados locales

- `*.log`, `logs/` y archivos de depuración de NPM.
- `.tmp/` y `.codex-tmp/`.
- `.cache/`, `.npm/`, `coverage/` y otras carpetas de caché o cobertura.
- archivos de procesos como `*.pid` y `*.pid.lock`.

### Configuraciones locales de herramientas

- `.vscode/` y `.vscode-test/`.
- `.agents/`, `.claude/` y `.windsurf/`.
- `docs/`, utilizada localmente para materiales de planificación y clases.

### Archivos que sí deben versionarse

Los siguientes archivos forman parte de la configuración reproducible del proyecto y no deben agregarse a `.gitignore`:

- `package.json`: dependencias, scripts y versión compatible de Node.js.
- `package-lock.json`: versiones exactas resueltas por NPM.
- `.nvmrc`: versión de Node.js utilizada por el proyecto.
- `.gitignore`: reglas compartidas de exclusión.
- `prisma.config.ts`: configuración de Prisma.
- `prisma/schema.prisma`: definición del modelo de datos.
- `prisma/migrations/`: historial versionado de cambios de la base de datos.
- `src/`: código fuente de la API, excepto `src/generated/prisma/`.

Antes de confirmar cambios conviene revisar:

```bash
git status
```

No se debe utilizar `git add .` sin comprobar primero que no se estén incorporando archivos sensibles o generados por error.

## Preparar PostgreSQL

El proyecto espera una base de datos PostgreSQL local. El nombre utilizado durante las clases es:

```text
gestion_eventos_db
```

Puede crearse desde pgAdmin o mediante una sesión SQL con permisos suficientes:

```sql
CREATE DATABASE gestion_eventos_db;
```

El servicio de PostgreSQL debe estar iniciado antes de ejecutar comandos de Prisma o iniciar la API.

## Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto, al mismo nivel que `package.json` y `prisma.config.ts`.

Contenido de referencia:

```env
DATABASE_URL="postgresql://USUARIO:CONTRASENA@localhost:5432/gestion_eventos_db?schema=public"
```

Reemplazar `USUARIO` y `CONTRASENA` por las credenciales de la instalación local de PostgreSQL.

Ejemplo solamente ilustrativo:

```env
DATABASE_URL="postgresql://postgres:mi_clave@localhost:5432/gestion_eventos_db?schema=public"
```

El archivo `.env` contiene información local y está excluido del repositorio mediante `.gitignore`. Cada estudiante debe crear su propio archivo después de descargar el proyecto.

## Preparar Prisma y la base de datos

Una vez instaladas las dependencias y configurada `DATABASE_URL`, ejecutar:

```bash
npx prisma validate
npx prisma migrate dev
npx prisma generate
```

Estos comandos cumplen las siguientes funciones:

- `prisma validate`: comprueba la sintaxis y configuración de `schema.prisma`.
- `prisma migrate dev`: aplica sobre la base de desarrollo las migraciones versionadas del proyecto.
- `prisma generate`: genera Prisma Client en `src/generated/prisma`.

La carpeta `src/generated/prisma` está excluida del repositorio. Por lo tanto, la generación del cliente es obligatoria después de clonar el proyecto.

Para comprobar el estado de las migraciones:

```bash
npx prisma migrate status
```

Para inspeccionar los datos mediante una interfaz gráfica:

```bash
npx prisma studio
```

En una instalación nueva, la migración de relaciones crea una categoría inicial denominada `Jornada`. Su identificador puede verificarse mediante Prisma Studio antes de crear eventos.

## Ejecutar la API

### Modo desarrollo

```bash
npm run dev
```

El proceso se reiniciará automáticamente cuando se modifique un archivo del proyecto.

### Ejecución normal

```bash
npm start
```

La API se inicia en:

```text
http://localhost:3000
```

Una respuesta correcta en la ruta raíz tiene esta forma:

```json
{
  "mensaje": "API de Gestión de Eventos!!",
  "version": "1.0"
}
```

## Instalación rápida

Para una copia recién descargada, el flujo completo es:

```bash
nvm install 24.19.0
nvm use 24.19.0
npm install
npx prisma validate
npx prisma migrate dev
npx prisma generate
npm run dev
```

Antes de ejecutar los comandos de Prisma se debe haber creado la base de datos y configurado el archivo `.env`.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Ejecuta la API con observación de cambios. |
| `npm start` | Ejecuta la API sin observación de cambios. |

Los scripts utilizan `--experimental-strip-types` porque Prisma Client se genera en archivos TypeScript dentro de un proyecto cuya aplicación está escrita en JavaScript.

## Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/` | Comprueba que la API esté disponible. |
| `GET` | `/eventos` | Recupera todos los eventos. |
| `GET` | `/eventos/filtrados?lugar=...` | Filtra eventos por coincidencia exacta del lugar. |
| `GET` | `/eventos/:id` | Recupera un evento e incluye su categoría. |
| `POST` | `/eventos` | Crea un evento. |
| `PUT` | `/eventos/:id` | Actualiza completamente un evento. |
| `DELETE` | `/eventos/:id` | Elimina un evento. |

## Cuerpo JSON para crear o actualizar un evento

Las operaciones `POST` y `PUT` esperan el siguiente formato:

```json
{
  "nombre": "Congreso de Tecnología",
  "descripcion": "Encuentro sobre desarrollo de software.",
  "lugar": "Auditorio Principal",
  "fecha": "2026-09-20T18:00:00.000Z",
  "categoriaId": 1
}
```

Consideraciones:

- `nombre` es obligatorio y no puede contener solamente espacios.
- `descripcion` es opcional y también puede enviarse como `null`.
- `lugar` es obligatorio.
- `fecha` debe tener un formato ISO 8601 válido.
- `categoriaId` debe ser un entero positivo y debe identificar una categoría existente.
- `PUT` requiere el cuerpo completo; no está implementado como una actualización parcial.

## Códigos HTTP principales

| Código | Uso en el proyecto |
|-------:|--------------------|
| `200 OK` | Consulta o actualización exitosa. |
| `201 Created` | Evento creado correctamente. |
| `204 No Content` | Evento eliminado correctamente. |
| `400 Bad Request` | Datos inválidos o categoría inexistente. |
| `404 Not Found` | Evento o ruta inexistente. |
| `500 Internal Server Error` | Error inesperado del servidor. |

## Estructura principal

```text
gestion-eventos-api/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── prisma.js
│   ├── controllers/
│   │   └── eventos.controller.js
│   ├── generated/
│   │   └── prisma/                 # generado localmente
│   ├── middlewares/
│   │   └── validarSolicitud.js
│   ├── routes/
│   │   └── eventos.routes.js
│   ├── validators/
│   │   └── eventos.validator.js
│   └── app.js
├── .env                            # configuración local, no versionada
├── .nvmrc
├── package.json
├── package-lock.json
└── prisma.config.ts
```

## Modelos definidos

El schema de Prisma contiene los siguientes modelos:

- `Evento`.
- `Categoria`.
- `ConfiguracionEvento`.
- `Institucion`.
- `Participante`.
- `Inscripcion`.

En esta etapa, las rutas HTTP implementan el CRUD de `Evento` y su asociación con `Categoria`. Los demás modelos están definidos y migrados, pero todavía no poseen endpoints propios.

## Problemas frecuentes

### La versión de Node no es compatible

Comprobar:

```bash
node --version
```

Si no se está utilizando Node 24, seleccionar la versión indicada en `.nvmrc` y volver a ejecutar `npm install`.

### `DATABASE_URL` no está definida

Verificar que exista un archivo `.env` en la raíz y que contenga la variable `DATABASE_URL`.

### Prisma no puede conectarse con PostgreSQL

Comprobar que:

- el servicio de PostgreSQL esté iniciado;
- el host y el puerto sean correctos;
- la base `gestion_eventos_db` exista;
- el usuario y la contraseña de `DATABASE_URL` sean válidos.

### No se encuentra Prisma Client generado

Ejecutar:

```bash
npx prisma generate
```

### El puerto 3000 está ocupado

Cerrar el proceso que utiliza ese puerto antes de iniciar nuevamente la API.

## Flujo habitual después de descargar cambios

Cuando se actualiza la rama y pueden haber cambiado las dependencias, el schema o las migraciones:

```bash
git pull
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

## Repositorio

[https://github.com/desarrollo-backend/gestion-eventos-api](https://github.com/desarrollo-backend/gestion-eventos-api)
