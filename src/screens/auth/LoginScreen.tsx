import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthHeader } from '@/src/components/auth/auth-header';
import { AuthInput } from '@/src/components/auth/auth-input';
import { AuthButton } from '@/src/components/auth/auth-button';
import { AuthFooter } from '@/src/components/auth/auth-footer';
import { validateEmail, validatePassword } from '@/src/utils/validators/auth-validator';
import Toast from 'react-native-toast-message';
import { ValidationFeedback } from '@/src/config/types';
import { login } from '@/src/services/authService';
import { useAuth } from '@/src/context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidationFeedback, setEmailValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });
  const [passwordValidationFeedback, setPasswordValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });

  const { setAuthData } = useAuth();

  const handleEmailChange = (email: string) => {
    setEmail(email);
    setEmailValidationFeedback(validateEmail(email));
  }

  const handlePasswordChange = (password: string) => {
      setPassword(password);
      setPasswordValidationFeedback(
          validatePassword(password)
      );
  }

  const handleLogin = async() => {
    // TODO: Login logic
    if(!emailValidationFeedback.isValid || !passwordValidationFeedback.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password'
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(email, password);

      if (response.success === true) {

        await setAuthData({
          user: response.data.user,
          token: response.data.token
        });

        Toast.show({
          type: 'success',
          text1: response.message || 'Login successful',
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      });
      
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      className="flex-1 bg-white px-6 justify-center"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Logo */}
      <View className="items-center mb-10">
        {/* Replace with actual logo image */}
        <Image source={require('@/src/assets/logos/attendlyL.png')}
        resizeMode="contain"
        style={{width: 300, height: 100}}/>
      </View>

      {/* Title */}
      <AuthHeader title="Welcome back" subtitle="Enter your information below" />
      {/* Email Input */}
      <AuthInput placeholder="Email Address" validationFeedback={emailValidationFeedback} placeholderTextColor="#999" autoCapitalize="none"
      value={email} onChangeText={handleEmailChange} editable={!isLoading} />

      {/* Password Input */}
      <AuthInput placeholder="Enter Password" secureTextEntry validationFeedback={passwordValidationFeedback} placeholderTextColor="#999"
      autoCapitalize="none" value={password} onChangeText={handlePasswordChange} editable={!isLoading} />

      {/* Forgot Password */}
      <TouchableOpacity className="self-end mb-6" onPress={() => navigation.navigate('ForgotPassword' as never)}>
          <Text className="text-xs text-tertiary-600 font-semibold">Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-primary-500 py-4 rounded-xl items-center"
        onPress={handleLogin}
        disabled={isLoading}
      >
        { isLoading ? (
          <ActivityIndicator size="small" className="text-tertiary-600" />
        ) : (
          <Text className="text-secondary-500 font-semibold">Login</Text>
        )}
      </TouchableOpacity>

      {/* Register Link */}
      <AuthFooter questionText="Don't have an account?" actionText="Create account"
      onPress={() => navigation.navigate('Register' as never)}/>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
