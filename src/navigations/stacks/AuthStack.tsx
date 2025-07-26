import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyEmailScreen from '../../screens/auth/VerifyEmailScreen';
// import DashboardScreen from '../../screens/student/DashboardScreen';
import { useAuth } from '../../context/AuthContext';
import BottomTabsNavigator from '../BottomTabsNavigator';
import DrawerNavigator from '../DrawerNavigator';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { authData } = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {authData?.user?.emailVerified ? (
        <Stack.Screen
          name="Drawer"
          component={ DrawerNavigator } // Assuming Dashboard is part of BottomTabsNavigator
          options={{ headerShown: false }}
        />

      ) : (
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmailScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;