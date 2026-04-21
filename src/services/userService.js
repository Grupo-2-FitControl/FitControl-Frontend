import axios from 'axios';


const API_URL = "http://localhost:8080/api/users";

export const userService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },

  create: async (userData) => {
    try {
      const res = await axios.post(API_URL, userData);
      return res.data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  },

  update: async (id, userData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, userData);
      return res.data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al borrar usuario:", error);
      throw error;
    }
  }
};