// Datos mock para desarrollo
const mockTeachers = [
  {
    id: 1,
    name: 'Carlos Ramírez',
    dni: '11111111A',
    hiringYear: 2020,
    imageUrl: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=CR',
    specialties: ['CrossFit', 'Spinning'],
    activities: [1, 2],
    activityCount: 2,
    isActive: true,
    active: true,
  },
  {
    id: 2,
    name: 'María González',
    dni: '22222222B',
    hiringYear: 2019,
    imageUrl: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=MG',
    specialties: ['Yoga', 'Pilates'],
    activities: [3, 4],
    activityCount: 2,
    isActive: true,
    active: true,
  },
  {
    id: 3,
    name: 'Roberto Sánchez',
    dni: '33333333C',
    hiringYear: 2021,
    imageUrl: 'https://via.placeholder.com/150/FF6B35/FFFFFF?text=RS',
    specialties: ['Boxeo', 'HIIT'],
    activities: [5, 6],
    activityCount: 2,
    isActive: true,
    active: true,
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
