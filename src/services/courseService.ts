import axios from 'axios';
const apiBaseUrl = 'https://attendly-backend.onrender.com/api';

export const getUserCourseRegs = async (token: string | undefined) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/user-courses/all`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user course registrations:', error);
        throw error;
    }
};

export const getCurriculumCourses = async (department: string | undefined, session: string, level: string, semester: string, token: string | undefined) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/department-curricula/${department}/courses`, {
            params: { academicYear: session, level, semester },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching curriculum courses:', error);
        throw error;
    }
};

export const RegisterUserCourses = async (data: any, token: string | undefined) => {
    try {
        const response = await axios.post(`${apiBaseUrl}/user-courses/register`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user courses:', error);
        throw error;
    }
}

export const getUserCoursesInCourseReg = async (queryParams: any, token: string | undefined) => {
    try {
        const response = await axios.get(`${apiBaseUrl}/user-courses`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: queryParams
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching courses in course registration:', error);
        throw error;
    }
}
