import axios from 'axios';
const apiBaseUrl = 'https://attendly-backend.onrender.com/api';

export const createClassSetting = async (token: string | undefined, payload: any) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/class-settings`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating class setting:', error);
        throw error;
    }
}

export const createClassSchedule = async (token: string | undefined, payload: any) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/class-schedules`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating class setting:', error);
        throw error;
    }
}

export const getClassSetting = async (token: string | undefined, curriculumCourse: string) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/class-settings/curriculum-course/${curriculumCourse}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching class settings for course id: ${curriculumCourse}`, error);
        throw error;
    }
}

export const getClassSchedule = async (token: string | undefined, curriculumCourse: string) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/class-schedules/curriculum-course/${curriculumCourse}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching class schedule for course id: ${curriculumCourse}`, error);
        throw error;
    }
}

export const getClassesByCourse = async (token: string | undefined, curriculumCourse: string) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/classes/curriculum-course/${curriculumCourse}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching classes for course id: ${curriculumCourse}`, error);
        throw error;
    }
};

export const updateClass = async (token: string | undefined, classId: string, payload: any) => {
    try {
        const response = await axios.put(`${apiBaseUrl}/classes/${classId}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating class info:', error);
        throw error;
    }
};