// =======================
// MOCK DATA (TEACHERS)
// =======================

let mockTeachers = [
  {
    id: 1,
    name: 'Alberto García',
    dni: '12345678A',
    hiring_year: 2020,
    is_active: true,
    image_url: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166675/Alberto_dtofxc.png',
    activities: [1, 2],
  },
  {
    id: 2,
    name: 'Melissa Gómez',
    dni: '23456789B',
    hiring_year: 2021,
    is_active: true,
    image_url: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166674/Melissa_r6i9cr.png',
    activities: [3, 4],
  },
  {
    id: 3,
    name: 'Javier Galván',
    dni: '34567890C',
    hiring_year: 2022,
    is_active: true,
    image_url: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166673/Javier_wx64jj.png',
    activities: [5, 6],
  },
  {
    id: 4,
    name: 'María Regueiro',
    dni: '45678901D',
    hiring_year: 2023,
    is_active: true,
    image_url: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166672/Maria_z1drrf.png',
    activities: [7, 8],
  },
  {
    id: 5,
    name: 'Ana Morandeira',
    dni: '56789012E',
    hiring_year: 2024,
    is_active: true,
    image_url: 'https://res.cloudinary.com/dltofstl9/image/upload/v1776166671/Ana_tsudsq.png',
    activities: [9, 10],
  },
];

// =======================
// OPTIONAL: SIMULATE LATENCY
// =======================
const delay = (ms = 200) => new Promise(res => setTimeout(res, ms));

// =======================
// TEACHER SERVICE (CRUD)
// =======================
export const teacherService = {
  // GET ALL
  getAll: async () => {
    await delay();
    return { data: mockTeachers };
  },

  // GET BY ID
  getById: async (id) => {
    await delay();
    const teacher = mockTeachers.find(t => t.id === id);
    return { data: teacher ?? null };
  },

  // CREATE
  create: async (data) => {
    await delay();

    const newTeacher = {
      id: Date.now(),
      name: data.name,
      dni: data.dni,
      hiring_year: data.hiring_year,
      is_active: data.is_active ?? true,
      image_url: data.image_url || '',
      activities: [],
    };

    mockTeachers = [...mockTeachers, newTeacher];

    return { data: newTeacher };
  },

  // UPDATE
  update: async (id, data) => {
    await delay();

    let updated = null;

    mockTeachers = mockTeachers.map(t => {
      if (t.id === id) {
        updated = { ...t, ...data };
        return updated;
      }
      return t;
    });

    return { data: updated };
  },

  // DELETE
  delete: async (id) => {
    await delay();

    const exists = mockTeachers.some(t => t.id === id);
    mockTeachers = mockTeachers.filter(t => t.id !== id);

    return {
      data: { success: exists }
    };
  },
};