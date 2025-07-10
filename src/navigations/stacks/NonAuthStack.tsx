import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen  from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../../screens/auth/reset-password/ForgotPasswordScreen';
import ResetPasswordScreen from '../../screens/auth/reset-password/ResetPasswordScreen';
import VerifyForgotPasswordScreen from '../../screens/auth/reset-password/VerifyForgotPasswordScreen';
import { NonAuthStackParamList } from '@/src/config/types';

const Stack = createNativeStackNavigator<NonAuthStackParamList>();

const NonAuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyForgotPassword"
        component={VerifyForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default NonAuthStack;