import axios from 'axios';

const API_URL = "http://localhost:8080/api/activities";

export const activityService = {
  
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener actividades:", error);
      throw error;
    }
  },


  create: async (activityData) => {
    try {
    const res = await axios.post(API_URL, activityData);
      return res.data;
    } catch (error) {
      console.error("Error al crear actividad:", error);
      throw error;
    }
  },

  update: async (id, activityData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, activityData);
      return res.data;
    } catch (error) {
      console.error("Error al actualizar actividad:", error);
      throw error;
    }
  },

  
  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al borrar actividad:", error);
      throw error;
    }
  }
};