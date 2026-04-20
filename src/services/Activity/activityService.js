const API_URL = "http://localhost:8080/api/activities";

export const activityService = {
    // Listar todas las actividades
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar actividades');
        return await response.json();
    },

    // Crear una nueva (POST)
    create: async (activityData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData)
        });
        if (!response.ok) throw new Error('Error al crear actividad');
        return await response.json();
    },

    // Eliminar (DELETE)
    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar');
        return true;
    },

    // Actualizar (PUT)
    update: async (id, activityData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activityData)
        });
        if (!response.ok) throw new Error('Error al actualizar');
        return await response.json();
    }
};