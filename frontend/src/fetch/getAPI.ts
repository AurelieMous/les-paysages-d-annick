// Dans votre fichier API
export const API_URL = 'http://localhost:3000';

const getAPI = async (endpoint = '') => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        throw error;
    }
};

export default getAPI;