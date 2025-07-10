import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { OTPInput } from '@/src/components/auth/otp-input';
import { NonAuthStackParamList } from '@/src/config/types';
import Toast from 'react-native-toast-message';
import { verifyForgotPassword } from '@/src/services/authService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<NonAuthStackParamList, 'VerifyForgotPassword'>;

const VerifyForgotPasswordScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<NonAuthStackParamList, 'VerifyForgotPassword'>>();
  const { email } = route.params;

  
  const handleConfirm = async () => {
    if (otp.length === 6) {
      // Call your OTP verification logic here
      console.log('Entered OTP:', otp);
      try {
        const response = await verifyForgotPassword(email, otp);
        if (response.success === true) {
          Toast.show({
            type: 'success',
            text1: 'Forgot password OTP verified!',
          });
          
        }

      navigation.navigate('ResetPassword', { token: otp }); // Navigate to the reset password screen with the email and OTP

      } catch (error: any) {
        console.error('OTP Verification Error:', error);
        Toast.show({
          type: 'error',
          text1: error.response?.data?.message || 'An error occurred during OTP verification. Please try again.',
        });
      }
    } else {
      console.warn('Invalid OTP');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 bg-white px-6 justify-center"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="mb-6">
          <Text className="text-xl font-bold text-center text-primary-900 mb-2">
            Enter OTP
          </Text>
          <Text className="text-sm text-center text-gray-600">
            Enter the 6-digit OTP sent to your email. Please check both your inbox and spam folder.
          </Text>
        </View>

        <OTPInput value={otp} setValue={setOtp} />

        <TouchableOpacity
          disabled={otp.length !== 6}
          onPress={handleConfirm}
          className={`py-4 rounded-xl items-center ${
            otp.length === 6 ? 'bg-primary-500' : 'bg-gray-300'
          }`}
        >
          <Text className="text-white font-semibold">Confirm</Text>
        </TouchableOpacity>

        <View className="mt-6 items-center">
          <Text className="text-sm text-gray-600">
            Didn’t get the OTP?{' '}
            <Text className="text-tertiary-600 font-semibold" onPress={() => console.log('Resend OTP')}>
              Resend
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyForgotPasswordScreen;
