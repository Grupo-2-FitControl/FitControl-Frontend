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
  - enrollmentService

---

## 📁 Estructura del proyecto

```
src/
├── pages/
│   ├── home/
│   │   └── Home.jsx
│   ├── teachers/
│   │   └── Teachers.jsx
│   ├── activities/
│   │   └── Activities.jsx
│
├── components/
│   ├── home/
│   │   ├── StatCard.jsx
│   │   ├── DashboardChart.jsx
│   │   ├── RecentActivity.jsx
│   │   ├── AlertsPanel.jsx
│   │   └── WelcomeHeader.jsx
│   │
│   ├── teachers/
│   │   ├── TeachersCard.jsx
│   │   ├── EditTeacherModal.jsx
│   │   ├── ScheduleModal.jsx
│   │   └── Toast.jsx
│   │
│   ├── activities/
│   │   ├── ActivityCard.jsx
│   │   ├── CreateActivityModal.jsx
│   │   ├── EditActivityModal.jsx
│   │   └── ViewUsersModal.jsx
│
├── services/
│   └── api.js
│
├── context/
├── hooks/
├── assets/
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

- Listado de profesores activos
- Creación de profesores
- Edición mediante modal
- Visualización de horarios
- Búsqueda por nombre

### 📋 Modelo de datos

```js
{
  nombre: String,
  dni: String,
  email: String,
  contratado: Boolean,
  imagen: String
}
```

### 🔐 Validaciones

- DNI → `/^\d{8}[A-Z]$/`
- Email → formato válido
- Campos obligatorios
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

| Regla | Código |
|------|--------|
| Usuario inactivo | 403 |
| Inscripción duplicada | 409 |
| Máx. 3 actividades | 409 |
| Profesor inactivo | 409 |
| DNI/email duplicado | 409 |

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

- CRUD Users
- Autenticación
- Backend real integration
- Paginación
- Filtros avanzados
- Testing

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
