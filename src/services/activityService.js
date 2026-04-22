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

  getEnrolledUsers: async (activityId) => {
    const response = await api.get(`/activities/${activityId}/users`);
    return response.data || [];
  },

  enrollUser: async (activityId, userId) => {
    const response = await api.post(`/activities/${activityId}/users/${userId}`);
    return response.data;
  },

  unenrollUser: async (activityId, userId) => {
    const response = await api.delete(`/activities/${activityId}/users/${userId}`);
    return response.data;
  },
};