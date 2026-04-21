# 📱 FitControl - Frontend

```
┌─────────────────────────────────────────────────────────────────┐
│          GESTIÓN DE ACTIVIDADES DE GIMNASIO                     │
│                    FitControl v0.0.0                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Descripción del Proyecto

**FitControl** es una aplicación web desarrollada con **React** y **Vite** para la gestión integral de actividades en un gimnasio. Sistema diseñado para uso en recepción (presencial y telefónico) permitiendo la inscripción de usuarios en clases.

---

## 🏗️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **React** | 19.2.4 | Framework UI |
| **Vite** | 8.0.4 | Build tool & Dev server |
| **Tailwind CSS** | 4.2.2 | Estilos y componentes |
| **React Router** | 7.14.1 | Enrutamiento |
| **Axios** | 1.15.0 | Cliente HTTP |
| **Heroicons** | 2.2.0 | Iconos UI |

---

## 📋 Características Implementadas

### ✅ Módulo de Profesores (Teachers)

#### Funcionalidades:
- ✅ **Listado de profesores activos** - Visualización de todos los profesores contratados
- ✅ **Crear profesor** - Formulario con validaciones
- ✅ **Editar profesor** - Modal para modificar datos
- ✅ **Ver horario** - Acceso a calendario de actividades
- ✅ **Búsqueda** - Filtrar por nombre

#### Campos del Formulario:
```javascript
{
  nombre: String       // Obligatorio - Nombre completo
  dni: String         // Obligatorio - Formato: 8 números + 1 letra (ej: 12345678A)
  email: String       // Obligatorio - Validación de email
  contratado: Boolean // Obligatorio - Checkbox
  imagen: String      // Opcional - URL de Cloudinary
}
```

#### Validaciones:
- ✅ DNI: Regex `/^\d{8}[A-Z]$/`
- ✅ Email: Validación de formato estándar
- ✅ Campos obligatorios
- ✅ Mensajes de toast para feedback

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
```sql
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

## 📁 Estructura del Proyecto

```
src/
├── pages/
│   ├── teachers/
│   │   └── Teachers.jsx          (Página principal Teachers)
│   └── Activities.jsx
│
├── components/
│   ├── teachers/
│   │   ├── TeachersCard.jsx      (Tarjeta de profesor)
│   │   ├── EditTeacherModal.jsx  (Modal editar)
│   │   ├── ScheduleModal.jsx     (Modal horario)
│   │   └── Toast.jsx             (Notificaciones)
│   └── ActivityCard.jsx
│
├── services/
│   └── api.js                    (Servicios HTTP)
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

## 🎨 Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| **Neon Green** | `#D4FF00` | Primario, botones destacados |
| **Orange** | `#FF5722` | Secundario, acciones |
| **Dark** | `#262626` | Fondo |
| **Mist** | `#0F0F0F` / `#1a1a1a` | Fondos secundarios |
| **Zinc** | `#3f3f46` - `#71717a` | Bordes, textos secundarios |

---

## 🚀 Scripts Disponibles

```bash
npm run dev        # Iniciar servidor de desarrollo
npm run build      # Compilar para producción
npm run lint       # Verificar código
npm run preview    # Vista previa de build
```

---

## 🔄 Reglas de Negocio (Backend)

| Error | Código | Descripción |
|-------|--------|-------------|
| Usuario inactivo en inscripción | `403` | Miembro sin cuota anual |
| Inscripción duplicada | `409` | Miembro ya inscrito |
| Límite de actividades | `409` | Máximo 3 actividades futuras |
| Profesor inactivo | `409` | No puede crear actividad |
| DNI duplicado | `409` | Email/DNI único |
| ID no existe | `404` | Recurso no encontrado |
| Validación fallida | `400` | Campos obligatorios/formato |

---

## 📝 Roadmap

- [ ] Conectar API real (http://localhost:8080)
- [ ] CRUD completo Users (Usuarios)
- [ ] CRUD completo Activities
- [ ] Módulo de Inscripciones
- [ ] Vistas especializadas:
  - [ ] Cursos futuros
  - [ ] Mis actividades (users)
  - [ ] Alumnos por actividad
  - [ ] Actividades por profesor
- [ ] Integración Cloudinary
- [ ] Autenticación/Autorización
- [ ] Responsive design
- [ ] Pruebas unitarias

---

## 🛠️ Instalación y Setup

```bash
# Clonar repositorio
git clone <repo-url>
cd FitControl-Frontend

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build
```

---

## 🌐 Conexión Backend

**Base URL:** `http://localhost:8080`

### Próximo paso:
Reemplazar servicios mock en `src/services/api.js` con llamadas reales a los endpoints del backend.

---

## 👥 Entidades Relacionadas

```
TEACHERS  (1) ─────→ (M) ACTIVITIES
              (1:M)

USERS   (M) ←─────→ (M) ACTIVITIES
              (M:M via ACTIVITY_USERS)
```

---

## 📊 Criterios de Aceptación

- ✖️ Usuario sin pago no puede inscribirse
- ✖️ No doble inscripción en misma actividad
- ✖️ Máximo 3 actividades futuras por usuario
- ✖️ Profesor inactivo → no puede tener actividades
- ✖️ No duplicar DNI/email

---

## 📄 Licencia

Proyecto educativo - Bootcamp

---

**Última actualización:** 16 de Abril de 2026  
**Versión:** 0.0.0 (Desarrollo)
