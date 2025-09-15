import axios from 'axios';
const apiBaseUrl = 'https://attendly-backend.onrender.com/api';


export const updateUserInfo = async (token: string | undefined, userId: string | undefined, payload: any) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/users/${userId}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user info:', error);
        throw error;
    }
};