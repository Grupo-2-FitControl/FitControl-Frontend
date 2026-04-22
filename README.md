# 🏋️‍♂️ FitControl Frontend

![Vite](https://img.shields.io/badge/Vite-8.0.4-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.2-38B2AC?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-in--development-orange)

---

## 🚀 Overview

**FitControl** es una aplicación web para la gestión integral de gimnasios, combinando un **dashboard analítico** con módulos operativos para la administración diaria.

Permite gestionar profesores, actividades y miembros, facilitando la operativa de recepción y el control del negocio en tiempo real.

---

## 🎯 Objetivo

Centralizar la gestión del gimnasio en una plataforma única que permite:

- 📊 Visualización de métricas en tiempo real (dashboard)
- 👨‍🏫 Gestión de profesores
- 🏋️ Gestión de actividades
- 👥 Control de miembros e inscripciones
- ⚡ Operativa rápida desde recepción

---

## 🧠 Arquitectura

Arquitectura basada en componentes reutilizables:

### 📦 Capas del sistema

- **Pages**
  - Homepage ( Landing )
  - Teachers
  - Activities
  - Users

- **Components**
  - Layout (Navbar, Footer, Layout)
  - Homepage (Banner, FeatureCard, SummaryPhilosophy)
  - Teachers (Cards, Modals, Toast)
  - Activities (Cards, Modals)
  - Users

- **Services**
  - api.js
  - teacherService
  - activityService
  - userService

---

## 🗄️ Estructura de Datos (Backend)

### Teachers (Profesores)
```js
{
  id: Number,
  name: String,
  dni: String,
  hiringYear: Number,
  isActive: Boolean,
  imageUrl: String (optional)
}
```

### Users (Usuarios)
```js
{
  id: Number,
  name: String,
  lastName: String,
  dni: String,
  email: String (optional),
  phone: String (optional),
  registrationYear: Number,
  isActive: Boolean,
  imageUrl: String (optional)
}
```

### Activities (Actividades)
```js
{
  id: Number,
  title: String,
  description: String,
  price: Number,
  teacherId: Number (FK),
  teacher: Teacher (relation),
  capacity: Number (optional)
}
```

---

## 🔌 Endpoints Disponibles (Backend)

Base URL: `http://localhost:8080/api`

### TEACHERS - `/api/teachers`
```
GET    /api/teachers              - Listar todos
GET    /api/teachers/active       - Solo contratados
GET    /api/teachers/{id}         - Obtener uno
GET    /api/teachers/{id}/activities

POST   /api/teachers              - Crear
PUT    /api/teachers/{id}         - Actualizar
DELETE /api/teachers/{id}         - Eliminar
```

### ACTIVITIES - `/api/activities`
```
GET    /api/activities            - Listar todas
POST   /api/activities            - Crear
PUT    /api/activities/{id}        - Actualizar
DELETE /api/activities/{id}       - Eliminar
```

### USERS - `/api/users`
```
GET    /api/users                - Listar todos
POST   /api/users                - Crear
PUT    /api/users/{id}            - Actualizar
DELETE /api/users/{id}           - Eliminar
```

---

## 📁 Estructura del proyecto

```
src/
├── pages/
│   ├── homepage/
│   │   └── Homepage.jsx
│   ├── teachers/
│   │   └── Teachers.jsx
│   ├── Activity/
│   │   ├── Activities.jsx
│   │   └── ActivityDetail.jsx
│   └── Users/
│       └─�� Users.jsx
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── homepage/
│   │   ├── Banner.jsx
│   │   ├── featurecard/
│   │   │   ├── Features.jsx
│   │   │   └── FeatureCard.jsx
│   │   └── summaryInfo/
│   │       └── SummaryPhilosophy.jsx
│   │
│   ├── teachers/
│   │   ├── TeachersCard.jsx
│   │   ├── EditTeacherModal.jsx
│   │   ├── ScheduleModal.jsx
│   │   └── Toast.jsx
│   │
│   ├── Activity/
│   │   ├── ActivityCard.jsx
│   │   ├── CreateActivityModal.jsx
│   │   ├── EditActivityModal.jsx
│   │   └── ViewUsersModal.jsx
│
├── services/
│   ├── api.js
│   ├── teacherService.js
│   ├── activityService.js
│   └── userService.js
│
├── assets/
│
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

---

## 🏠 Módulo Homepage (Landing)

### 📊 Funcionalidades

- Landing page con Banner principal
- Sección de características del sistema
- Filosofía y resumen del servicio
- Navegación a los diferentes módulos

---

## 👨‍🏫 Módulo Teachers

### ✔️ Funcionalidades

- Listado de profesores activos
- Creación de profesores
- Edición mediante modal
- Visualización de horarios
- Búsqueda por nombre

### 📋 Modelo de datos

```js
{
  name: String,
  dni: String,
  hiringYear: Number,
  isActive: Boolean,
  imageUrl: String (optional)
}
```

### 🔐 Validaciones

- DNI → `/^\d{8}[A-Z]$/`
- Campos obligatorios (name, dni)
- Feedback visual (toasts)

---

## 🏋️ Módulo Activities

### ✨ Funcionalidades

- CRUD completo de actividades
- Filtros por profesor, fecha y estado
- Buscador integrado
- Gestión de capacidad
- Inscripción de miembros
- Visualización de asistentes
- Detalle de actividad

### 📋 Campos principales

```js
{
  // según backend
}
```

---

## 👥 Módulo Users

### ✨ Funcionalidades

- Listado de miembros activos
- CRUD de usuarios
- Gestión de inscripciones
- Búsqueda y filtros
- Estado activo/inactivo

### 📋 Campos principales

```js
{
  name: String,
  lastName: String,
  dni: String,
  email: String (optional),
  phone: String (optional),
  registrationYear: Number,
  isActive: Boolean
}
```

---

## 🔌 API Backend

### Base URL

```
http://localhost:8080/api
```

### Teachers

```
GET    /api/teachers
GET    /api/teachers/active
POST   /api/teachers
PUT    /api/teachers/{id}
DELETE /api/teachers/{id}
```

### Activities

```
GET    /api/activities
POST   /api/activities
PUT    /api/activities/{id}
DELETE /api/activities/{id}
```

### Users

```
GET    /api/users
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

---

## 🧠 Reglas de negocio

| Regla | Código |
|------|--------|
| DNI duplicado | 409 |
| Error de servidor | 500 |

---

## 🎨 Diseño

| Color | Código |
|------|--------|
| Primary | `#D4FF00` |
| Secondary | `#FF5722` |
| Dark | `#262626` |
| Background | `#0F0F0F` |
| Neutral | `#3f3f46` |

---

## 🚀 Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## ⚙️ Setup

```bash
git clone <repo-url>
cd FitControl-Frontend
npm install
npm run dev
```

---

## 🧩 Modelo relacional

```
TEACHERS (1) ─────→ (M) ACTIVITIES
USERS  (M) ←──→ (M) ACTIVITIES
```

---

## 🗺️ Roadmap

- [x] CRUD Users
- [x] Landing page
- [x] Detalle de actividades
- [ ] Autenticación
- [ ] Backend real integration
- [ ] Paginación
- [ ] Filtros avanzados
- [ ] Testing

---

## 🤝 Contribución

1. Crear rama desde `dev`
2. Commit (`feat:` / `fix:`)
3. Push
4. Pull Request

---

## 📄 Licencia

Proyecto educativo (Bootcamp)

---

## 📌 Estado del proyecto

🚧 En desarrollo activo (rama `dev`)

![Build](https://img.shields.io/github/actions/workflow/status/Grupo-2-FitControl/FitControl-Frontend/main.yml)
![Last Commit](https://img.shields.io/github/last-commit/Grupo-2-FitControl/FitControl-Frontend)
![Repo Size](https://img.shields.io/github/repo-size/Grupo-2-FitControl/FitControl-Frontend)

---

## 👥 Equipo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Alberto García | Developer | [AlbertoDeveloper9](https://github.com/AlbertoDeveloper9) |
| Melissa Gómez | Developer | [ResilenteMG](https://github.com/ResilenteMG) |
| Ana Morandeira | Developer | [@ana-morandeira](https://github.com/ana-morandeira) |
| Javier Galvañ | Scrum Master | [javiertunsi7](https://github.com/javiertunsi7) |
| María Regueiro | Product Owner | [@Mariaregue-spec](https://github.com/Mariaregue-spec) |

---

## 🕓 Última actualización

Abril 2026