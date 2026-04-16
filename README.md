# 🏋️‍♂️ FitControl Frontend

```
┌──────────────────────────────────────────────────────────────┐
│           GESTIÓN DE ACTIVIDADES DE GIMNASIO                 │
│                  FitControl v0.0.0                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Overview

**FitControl** es una aplicación web diseñada para la **gestión integral de actividades en gimnasios**, enfocada en entornos de recepción (presencial y telefónica).

Permite gestionar profesores, usuarios y actividades, facilitando la inscripción y el control operativo diario.

---

## 🎯 Objetivo

Optimizar la operativa del gimnasio mediante una interfaz rápida, clara y eficiente para:

* Gestión de profesores
* Gestión de actividades
* Inscripción de usuarios
* Control de estado de miembros

---

## 🛠️ Tech Stack

| Tecnología   | Versión | Uso                |
| ------------ | ------- | ------------------ |
| React        | 19.2.4  | UI                 |
| Vite         | 8.0.4   | Dev server & build |
| TailwindCSS  | 4.2.2   | Estilos            |
| React Router | 7.14.1  | Routing            |
| Axios        | 1.15.0  | HTTP client        |
| Heroicons    | 2.2.0   | Iconografía        |

---

## 📦 Arquitectura

* Arquitectura basada en componentes
* Separación clara de responsabilidades:

  * UI (`components`)
  * Vistas (`pages`)
  * Lógica (`services`)
* Comunicación con backend mediante API REST

---

## 📁 Estructura del Proyecto

```
src/
├── pages/
│   ├── teachers/
│   │   └── Teachers.jsx
│   └── Activities.jsx
│
├── components/
│   ├── teachers/
│   │   ├── TeachersCard.jsx
│   │   ├── EditTeacherModal.jsx
│   │   ├── ScheduleModal.jsx
│   │   └── Toast.jsx
│   └── ActivityCard.jsx
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
├── index.css
└── App.css
```

---

## 🌿 Estrategia de ramas

| Rama     | Uso                    |
| -------- | ---------------------- |
| `main`   | Producción             |
| `dev`    | Desarrollo             |
| `feat/*` | Nuevas funcionalidades |
| `fix/*`  | Correcciones           |

Ejemplo:

```
feat/teachers
```

---

## ✨ Funcionalidades

### 👨‍🏫 Módulo Teachers

#### ✔️ Implementado

* Listado de profesores activos
* Creación de profesores
* Edición mediante modal
* Visualización de horarios
* Búsqueda por nombre

#### 📋 Modelo de datos

```js
{
  nombre: String,
  dni: String,
  email: String,
  contratado: Boolean,
  imagen: String
}
```

#### 🔐 Validaciones

* DNI → `/^\d{8}[A-Z]$/`
* Email → formato válido
* Campos obligatorios
* Feedback visual (toasts)

---

## 🔌 API Backend

### Base URL

```
http://localhost:8080
```

### Principales recursos

#### Teachers

```
GET    /api/teachers
GET    /api/teachers/active
POST   /api/teachers
PUT    /api/teachers/{id}
DELETE /api/teachers/{id}
```

#### Activities

```
GET    /api/activities
GET    /api/activities/future
POST   /api/activities
```

#### Members

```
GET    /api/members
POST   /api/members
```

#### Enrollments

```
POST   /api/enrollments/{activityId}/{memberId}
DELETE /api/enrollments/{activityId}/{memberId}
```

---

## 🧠 Reglas de negocio

| Regla                 | Resultado |
| --------------------- | --------- |
| Usuario inactivo      | 403       |
| Inscripción duplicada | 409       |
| Máx. 3 actividades    | 409       |
| Profesor inactivo     | 409       |
| DNI/email duplicado   | 409       |

---

## 🎨 Diseño

| Color      | Código    |
| ---------- | --------- |
| Primary    | `#D4FF00` |
| Secondary  | `#FF5722` |
| Dark       | `#262626` |
| Background | `#0F0F0F` |
| Neutral    | `#3f3f46` |

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
TEACHERS  (1) ─────→ (M) ACTIVITIES
MEMBERS   (M) ←────→ (M) ACTIVITIES
```

---

## 🗺️ Roadmap

* Integración con backend real
* CRUD completo (Members, Activities)
* Sistema de inscripciones
* Autenticación
* Responsive design
* Testing

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

---

## 👥 Equipo

**Grupo 2 - FitControl**

---

## 🕓 Última actualización

16 Abril 2026
