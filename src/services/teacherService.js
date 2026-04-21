import api from './api';

export const teacherService = {
  getAll: async () => {
    const response = await api.get('/teachers');
    return response.data || [];
  },

  getActive: async () => {
    const response = await api.get('/teachers/active');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  },

  getActivities: async (teacherId) => {
    const response = await api.get(`/teachers/${teacherId}/activities`);
    return response.data || [];
  },

  create: async (data) => {
    const payload = {
      name: data.name,
      dni: data.dni,
      hiringYear: data.hiringYear,
      isActive: data.isActive ?? true,
    };
    if (data.imageUrl) {
      payload.imageUrl = data.imageUrl;
    }
    console.log('Creating teacher:', payload);
    const response = await api.post('/teachers', payload);
    console.log('Teacher created:', response.data);
    return response.data;
  },

  update: async (id, data) => {
    const payload = {
      name: data.name,
      dni: data.dni,
      hiring_year: data.hiringYear || data.hiring_year || data.hiringYear,
      is_active: data.isActive ?? data.is_active,
      image_url: data.imageUrl || data.image_url,
    };
    const response = await api.put(`/teachers/${id}`, payload);
    return response.data || response;
  },

  delete: async (id) => {
    await api.delete(`/teachers/${id}`);
  },
};