import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AuthInput } from '@/src/components/auth/auth-input';
import { AuthHeader } from '@/src/components/auth/auth-header';
import { AuthButton } from '@/src/components/auth/auth-button';
import { NonAuthStackParamList } from '@/src/config/types';
import Toast from 'react-native-toast-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { validatePassword, validatePasswordsMatch } from '@/src/utils/validators/auth-validator';
import { ValidationFeedback } from '@/src/config/types';
import { resetPassword } from '@/src/services/authService';

type NavigationProp = NativeStackNavigationProp<NonAuthStackParamList, 'ResetPassword'>;

const ResetPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<NonAuthStackParamList, 'ResetPassword'>>();
  const { token } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidationFeedback, setPasswordValidationFeedback] = useState<ValidationFeedback>({});
  const [confirmPasswordValidationFeedback, setConfirmPasswordValidationFeedback] = useState<ValidationFeedback>({});
  
  const handlePasswordChange = (password: string) => {
    setPassword(password);
    setPasswordValidationFeedback(validatePassword(password));
  };
  const handleConfirmPasswordChange = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    setConfirmPasswordValidationFeedback(validatePasswordsMatch(password, confirmPassword));
  };

  const handleReset = async () => {
    if (!passwordValidationFeedback.isValid || !confirmPasswordValidationFeedback.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid password or confirmation',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetPassword(token, password);

      if (response.success === true) {
        Toast.show({
          type: 'success',
          text1: response.message || 'Password reset successfully',
        });
        
        navigation.navigate('Login');
      }
    } catch (error: any) {
      console.error('Error resetting password:', error);
      Toast.show({
        type: 'error',
        text1: error?.response?.data?.message || 'Failed to reset password',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 bg-white px-6 pt-12 justify-center"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AuthHeader
          title="Reset Password"
          subtitle="Enter and confirm your new password"
        />
        <AuthInput
          placeholder="New Password"
          secureTextEntry
          value={password}
          autoCapitalize="none"
          editable={!isLoading}
          validationFeedback={passwordValidationFeedback}
          onChangeText={handlePasswordChange}
        />
        <AuthInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          autoCapitalize="none"
          editable={!isLoading}
          validationFeedback={confirmPasswordValidationFeedback}
          onChangeText={handleConfirmPasswordChange}
        />
        <AuthButton label="Reset Password" onPress={handleReset} />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ResetPasswordScreen;
