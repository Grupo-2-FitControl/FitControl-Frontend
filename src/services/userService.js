import api from './api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data || [];
  },

  create: async (userData) => {
    const payload = {
      name: userData.name,
      lastName: userData.lastName,
      dni: userData.dni,
      isActive: true,
      registrationYear: new Date().getFullYear(),
    };
    if (userData.email) payload.email = userData.email;
    if (userData.phone) payload.phone = userData.phone;
    try {
      const response = await api.post('/users', payload);
      return response.data;
    } catch (err) {
      console.error('CREATE ERROR:', err.response?.data || err.message);
      throw err;
    }
  },

  update: async (id, userData) => {
    const payload = {
      name: userData.name,
      lastName: userData.lastName,
      dni: userData.dni,
      registrationYear: userData.registrationYear || new Date().getFullYear(),
      isActive: userData.isActive ?? true,
    };
    if (userData.email) payload.email = userData.email;
    if (userData.phone) payload.phone = userData.phone;
    try {
      const response = await api.put(`/users/${id}`, payload);
      return response.data;
    } catch (err) {
      console.error('UPDATE ERROR:', err.response?.data || err.message);
      throw err;
    }
  },

  delete: async (id) => {
    await api.delete(`/users/${id}`);
  },

  getEnrolledActivities: async (userId) => {
    const response = await api.get(`/users/${userId}/activities`);
    return response.data || [];
  },
};