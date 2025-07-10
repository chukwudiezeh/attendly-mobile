import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyEmailScreen from '../../screens/auth/VerifyEmailScreen';
// import DashboardScreen from '../../screens/student/DashboardScreen';
import { useAuth } from '../../context/AuthContext';
import BottomTabsNavigator from '../BottomTabsNavigator';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { authData } = useAuth();

  return (
    <Stack.Navigator initialRouteName={authData?.user?.emailVerified ? 'Tabs' : 'VerifyEmail' }>
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={BottomTabsNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;