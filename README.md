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
  - Home (Dashboard)
  - Teachers
  - Activities
  - Activity Detail
  - Users

- **Components**
  - Cards
  - Modals
  - Charts
  - Alerts
  - Tables

- **Services**
  - dashboardService
  - activityService
  - teacherService
  - userService
  - api

---

## 🗄️ Estructura de Datos (Backend)

### Teachers (Profesores)
```sql
- id (PK)
- nombre
- dni (UNIQUE)
- email (UNIQUE)
- contratado (boolean)
- imagen (URL)
```

### Users (Usuarios)
```sql
- id (PK)
- nombre
- apellidos
- dni (UNIQUE)
- telefono
- activo (boolean)
- imagen (URL)
```

### Activities (Actividades)
```sql
- id (PK)
- titulo
- descripcion
- precio (decimal)
- fecha_inicio (datetime)
- imagen (URL)
- teacher_id (FK)
```

### Activity_Users (Inscripciones - M2M)
```
- activity_id (FK)
- users_id (FK)
```

---

## 🔌 Endpoints Disponibles (Backend)

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
GET    /api/activities/active
GET    /api/activities/future
GET    /api/activities/{id}
GET    /api/activities/teacher/{teacherId}

POST   /api/activities            - Crear con teacherId
PUT    /api/activities/{id}
DELETE /api/activities/{id}
```

### USERS - `/api/users`
```
GET    /api/users
GET    /api/users/active
GET    /api/users/{id}
GET    /api/users/{id}/activities

POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### ENROLLMENTS - `/api/enrollments`
```
POST   /api/enrollments/{activityId}/{usersId}
DELETE /api/enrollments/{activityId}/{usersId}
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
│       └── Users.jsx
│
├── components/
│   ├── layout/
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── teachers/
│   │   ├── TeachersCard.jsx
│   │   ├── EditTeacherModal.jsx
│   │   ├── ScheduleModal.jsx
│   │   └── Toast.jsx
│   │
│   ├── Activity/
│   │   └── ActivityCard.jsx
│
├── services/
│   ├── api.js
│   ├── activityService.js
│   ├── teacherService.js
│   └── userService.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🏠 Módulo Home (Dashboard)

### 📊 Funcionalidades

- KPIs del gimnasio en tiempo real
- Gráficas de actividad e ingresos
- Alertas del sistema
- Accesos rápidos a módulos
- Últimas actividades y miembros
- Profesores destacados

### 📈 KPIs principales

- Profesores activos
- Miembros activos
- Actividades futuras
- Ingresos mensuales
- Capacidad utilizada
- Nuevas inscripciones

---

## 👨‍🏫 Módulo Teachers

### ✔️ Funcionalidades

- Listado de profesores (activos e inactivos)
- Creación de profesores con imagen
- Edición mediante modal
- Estado (activo/inactivo)
- Visualización de horarios
- Búsqueda por nombre
- Control de profesorado inactivo

### 📋 Modelo de datos

```js
{
  id: Number,
  name: String,
  dni: String,
  email: String,
  hiringYear: Number,
  isActive: Boolean,
  imageUrl: String
}
```

### 🔐 Validaciones

- DNI → `/^\d{8}[A-Z]$/`
- Email → formato válido
- No permite profesor inactivo en actividades
- Campos obligatorios
- Feedback visual (toasts)

---

## 🏋️ Módulo Activities

### ✨ Funcionalidades

- CRUD completo de actividades
- Buscador integrado
- Gestión de capacidad y plazas
- Inscripción de usuarios (modal)
- Visualización de inscritos
- Estado de capacidad (completo/disponible)
- Detalle de actividad (beneficios)
- Control automático de profesores inactivos

### 📋 Campos principales

```js
{
  id: Number,
  title: String,
  name: String,
  description: String,
  price: Number,
  capacity: Number,
  startDate: DateTime,
  schedule: String,
  teacherId: Number,
  imageUrl: String,
  isActive: Boolean
}
```

### 📊 Estados de capacidad

| Estado | Color | Condición |
|--------|------|----------|
| Verde | `#22C55E` | > 3 plazas |
| Amarillo | `#EAB308` | 1-3 plazas |
| Rojo | `#EF4444` | 0 plazas |

### 📋 Campos principales

```js
{
  titulo,
  descripcion,
  precio,
  fecha,
  profesor_id,
  capacidad,
  imagen
}
```

---

## 🔌 API Backend

### Base URL

```
http://localhost:8080
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
GET    /api/activities/future
POST   /api/activities
```

### Users

```
GET    /api/users
POST   /api/users
```

### Enrollments

```
POST   /api/enrollments/{activityId}/{usersId}
DELETE /api/enrollments/{activityId}/{usersId}
```

---

## 🧠 Reglas de negocio

| Regla | Código | Descripción |
|------|--------|-----------|
| Usuario inactivo | 403 | No puede inscribirse si tiene cuota pendiente |
| Inscripción duplicada | 409 | Ya está inscrito en esta actividad |
| Máx. 3 actividades | 409 | Límite por usuario |
| Profesor inactivo | 409 | No se permite asignar a actividades |
| Profesor inactivo en actividad | Warning | Se desasigna automáticamente |
| DNI/email duplicado | 409 | Registro único |

## 🎨 Diseño

| Color | Código | Uso |
|------|--------|-----|
| Primary | `#CCFF00` | Acentos, botones, highlight |
| Secondary | `#FF4500` | Títulos, precios |
| Dark | `#242526` | Cards, elementos |
| Background | `#0A0A0A` | Fondo principal |
| Neutral | `#3f3f46` | Bordes, textos secundarios |
| Success | `#22C55E` | Estados positivos |
| Warning | `#EAB308` | Estados intermedios |
| Error | `#EF4444` | Estados negativos |

---

## 🚀 Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Previsualizar
npm run lint    # Linting
```

---

## 👥 Módulo Users

### ✨ Funcionalidades

- Listado de usuarios (activos e inactivos)
- Búsqueda por nombre, apellido o DNI
- Estado de actividad (cuota al día)
- Ver actividades inscritas
- Gestión de inscripciones

### 📋 Modelo de datos

```js
{
  id: Number,
  name: String,
  lastName: String,
  dni: String,
  phone: String,
  isActive: Boolean,
  imageUrl: String
}
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

## 🔗 Modelo relacional

```
TEACHERS (1) ─────→ (M) ACTIVITIES
USERS  (M) ←─────→ (M) ACTIVITIES
```

### Tablas de relación

- **activity_users**: Relación many-to-many entre Activities y Users
  - activity_id (FK)
  - user_id (FK)
  - created_at (timestamp)

---

## 🔮 Posibles Mejoras Futuras

- Autenticación de usuarios
- Sistema de paginación
- Filtros avanzados
- Testing automático
- Informes y exportación de datos
- Notificaciones push
- App móvil

---

## 📄 Licencia

MIT License

Copyright (c) 2026 FitControl Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.

---

## 🛠️ Funcionalidades Actuales

- Dashboard con KPIs en tiempo real
- Gestión de profesores (CRUD)
- Gestión de actividades (CRUD)
- Gestión de usuarios (CRUD)
- Inscripción de usuarios en actividades
- Control de capacidad por actividad
- Estados de plazas (verde/amarillo/rojo)
- Visualización de horarios
- Búsqueda integrada
- Diseño responsive

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

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|-----------|--------|-----|
| React | 19.x | Framework UI |
| Vite | 8.x | Build tool |
| Tailwind CSS | 4.x | Estilos |
| Heroicons | 24.x | Iconos |
| React Router | 7.x | Enrutamiento |
| Axios | - | HTTP Client |

---

## 📱 Responsive

- Mobile First
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Diseño adaptativo para todos los dispositivos
