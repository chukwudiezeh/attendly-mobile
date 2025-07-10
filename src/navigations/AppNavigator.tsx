import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NewAppScreen } from '@react-native/new-app-screen';
// import LoginScreen  from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './stacks/AuthStack';
import NonAuthStack from './stacks/NonAuthStack';
// import RegisterScreen from '../screens/auth/RegisterScreen';
// import ForgotPasswordScreen from '../screens/auth/reset-password/ForgotPasswordScreen';
// import ResetPasswordScreen from '../screens/auth/reset-password/ResetPasswordScreen';
// import VerifyForgotPasswordScreen from '../screens/auth/reset-password/VerifyForgotPasswordScreen';

// const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  const {authData, isLoading } = useAuth();

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={ SplashScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={ LoginScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={ RegisterScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ ForgotPasswordScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ ResetPasswordScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyForgotPassword"
          component={ VerifyForgotPasswordScreen }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={ NewAppScreen }
          options={{ headerShown: false }}
        />
      </Stack.Navigator> */}
      { authData ? <AuthStack /> : <NonAuthStack /> }
    </NavigationContainer>
  );
};

export default AppNavigator;
