import axios from 'axios';
// import { useAuth } from '@/src/context/AuthContext'; // or trigger logout another way
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://attendly-backend.onrender.com/api',
});

// Optional: attach token if stored
api.interceptors.request.use(async (config) => {
  const authString = await AsyncStorage.getItem('auth');
  const authData = authString ? JSON.parse(authString) : null;

  if (authData?.token) {
    config.headers.Authorization = `Bearer ${authData.token}`;
  }

  config.headers['Content-Type'] = 'application/json';

  return config;
});

// Handle 401s globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if(error.response?.message === 'Unauthorized! Token has expired') {
        const { logout } = useAuth();
        logout();
    }
    return Promise.reject(error); // forward error to catch()
  }
);

export default api;
