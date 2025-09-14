import axios from 'axios';
const apiBaseUrl = 'https://attendly-backend.onrender.com/api';

export const getDepartments = async () => {
  const response = await axios.get(`${apiBaseUrl}/utilities/departments`);

  return response.data;
};

export const getAcademicYears = async () => {
  const response = await axios.get(`${apiBaseUrl}/utilities/academic-years`);

  return response.data;
};
