import axios from 'axios';
const apiBaseUrl = 'https://attendly-backend.onrender.com/api';

export const getDepartments = async () => {
  const response = await axios.get(`${apiBaseUrl}/utilities/departments`);

  return response.data;
};
