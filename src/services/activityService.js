import api from './api';

export const activityService = {
  getAll: async () => {
    const response = await api.get('/activities');
    return response.data;
  },

  create: async (activityData) => {
    const response = await api.post('/activities', activityData);
    return response.data;
  },

  update: async (id, activityData) => {
    const response = await api.put(`/activities/${id}`, activityData);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/activities/${id}`);
  },
};