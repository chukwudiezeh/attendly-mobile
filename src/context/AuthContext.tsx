import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, AuthData } from '@/src/config/types';

const AuthContext = createContext<AuthContextType>({
  authData: null,
  isLoading: false,
  setAuthData: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authData, setAuthDataState] = useState<AuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAuthData = async () => {
    const stored = await AsyncStorage.getItem('auth');
    if (stored) {
      setAuthDataState(JSON.parse(stored));
    }
    setIsLoading(false);
  };

  const setAuthData = async (data: AuthData | null) => {
    if (data) {
      await AsyncStorage.setItem('auth', JSON.stringify(data));
      setAuthDataState(data);
    } else {
      await AsyncStorage.removeItem('auth');
      setAuthDataState(null);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('auth');
    setAuthDataState(null);
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ authData, isLoading, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
