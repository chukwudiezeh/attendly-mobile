import axios from 'axios';
const apiBaseUrl = 'https://attendly-backend.onrender.com/api';

export const getAttendanceSummary = async (courseRegId: string, userId: string, token: string | undefined) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/class-attendances/summary/user/${userId}/usercourse/${courseRegId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching attendance summary:', error);
        throw error;
    }
}

export const handleClockIn = async (classId: string, geolocationData: any, token: string | undefined) => {
    try {
        const payload = {
            class: classId,
            checkInCoordinates: geolocationData
        };
        const response = await axios.put(`${apiBaseUrl}/class-attendances/clockin`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error clocking in to class:', error);
        throw error;
    }
}

export const handleClockOut = async (classId: string, geolocationData: any, token: string | undefined) => {
    try {
        const payload = { class: classId, geolocationData: geolocationData };
        const response = await axios.put(`${apiBaseUrl}/class-attendances/clockout`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error clocking out of class:', error);
        throw error;
    }
}

export const getClassAttendance = async (token: string, classId: string) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/class-attendances/class/${classId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching class attendance:', error);
        throw error;
    }
}
