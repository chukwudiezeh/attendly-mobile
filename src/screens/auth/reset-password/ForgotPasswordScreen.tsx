import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthHeader } from '@/src/components/auth/auth-header';
import { AuthInput } from '@/src/components/auth/auth-input';
import { AuthButton } from '@/src/components/auth/auth-button';
import { validateEmail } from '@/src/utils/validators/auth-validator';
import { ValidationFeedback } from '@/src/config/types';
import Toast from 'react-native-toast-message';
import { forgotPassword } from '@/src/services/authService';
import { NonAuthStackParamList } from '@/src/config/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ForgotPasswordScreen = () => {
  type NavigationProp = NativeStackNavigationProp<NonAuthStackParamList, 'ForgotPassword'>;
  const navigation = useNavigation<NavigationProp>();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidationFeedback, setEmailValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });

  const handleEmailChange = (email: string) => {
    setEmail(email);
    setEmailValidationFeedback(validateEmail(email));
  }

  const handleSubmit = async () => {
    if (!emailValidationFeedback.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password'
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await forgotPassword(email);
      console.log('Forgot Password Response:', response);
      if (response.success === true) {
        Toast.show({
          type: 'success',
          text1: response.message || 'Verification code sent successfully',
        });
      }
      setIsLoading(false);
      navigation.navigate('VerifyForgotPassword', { email }); // Navigate to the verification screen with the email
    } catch (error: any) {
      console.error('Forgot Password Error:', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'Failed to send verification code',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 bg-white px-6 pt-12 justify-center"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AuthHeader
          title="Forgot Password"
          subtitle="Enter your email and we'll send you a verification code"
        />
        <AuthInput
          placeholder="Email Address"
          value={email}
          validationFeedback={emailValidationFeedback}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AuthButton label="Submit" onPress={handleSubmit} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;
