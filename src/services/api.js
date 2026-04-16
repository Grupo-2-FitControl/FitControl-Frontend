// Datos mock para desarrollo - sincronizado con la base de datos
const mockTeachers = [
  {
    id: 1,
    nombre: 'Alberto García',
    dni: '12345678A',
    email: 'alberto@fitcontrol.es',
    contratado: true,
    imagen: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166675/Alberto_dtofxc.png',
    activities: [1, 2],
    activityCount: 2,
  },
  {
    id: 2,
    nombre: 'Melissa Gómez',
    dni: '23456789B',
    email: 'melissa@fitcontrol.es',
    contratado: true,
    imagen: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166674/Melissa_r6i9cr.png',
    activities: [3, 4],
    activityCount: 2,
  },
  {
    id: 3,
    nombre: 'Javier Galván',
    dni: '34567890C',
    email: 'javier@fitcontrol.es',
    contratado: true,
    imagen: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166673/Javier_wx64jj.png',
    activities: [5, 6],
    activityCount: 2,
  },
  {
    id: 4,
    nombre: 'María Regueiro',
    dni: '45678901D',
    email: 'maria@fitcontrol.es',
    contratado: true,
    imagen: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166672/Maria_z1drrf.png',
    activities: [7, 8],
    activityCount: 2,
  },
  {
    id: 5,
    nombre: 'Ana Morandeira',
    dni: '56789012E',
    email: 'ana@fitcontrol.es',
    contratado: true,
    imagen: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166671/Ana_tsudsq.png',
    activities: [9, 10],
    activityCount: 2,
  },
];

export const teacherService = {
  getAll: () => Promise.resolve({ data: mockTeachers }),
  getById: (id) => Promise.resolve({ data: mockTeachers.find(t => t.id === id) }),
  create: (data) => Promise.resolve({ data: { id: Date.now(), ...data, activities: [], activityCount: 0 } }),
  update: (id, data) => Promise.resolve({ data: { id, ...data } }),
  delete: (id) => Promise.resolve({ data: { success: true } }),
};

export default { get: () => {}, post: () => {}, put: () => {}, delete: () => {} };
