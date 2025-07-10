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
import { OTPInput } from '@/src/components/auth/otp-input';
import { useAuth } from '@/src/context/AuthContext';
import { verifyEmail, resendVerificationEmail } from '@/src/services/authService'; // Adjust the import path as necessary
import Toast from 'react-native-toast-message';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Uncomment if you need navigation

type RootStackParamList = {
  Dashboard: undefined;
  // add other routes here if needed
};

const VerifyEmailScreen = () => {
  const [otp, setOtp] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { authData, setAuthData } = useAuth();

  const handleConfirm = async () => {
    if (otp.length === 6) {
      // Call your OTP verification logic here
      try {
        if (!authData?.token) {
          Toast.show({
            type: 'error',
            text1: 'No authentication token found. Please log in again.',
          });
          return;
        }

        const response = await verifyEmail(otp, authData.token);
        console.log('OTP Verification Response:', response);
      
        setAuthData({ user: {...authData.user, emailVerified: true}, token: authData.token });

        console.log('Updated Auth Data:', authData);
          Toast.show({
            type: 'success',
            text1: 'Email verified successfully!',
          });

        navigation.navigate('Dashboard'); // Adjust the target screen as necessary
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

  const handleResendOTP = async () => {
    if (!authData?.token) {
      Toast.show({
        type: 'error',
        text1: 'No authentication token found. Please log in again.',
      });
      return;
    }
    //console.log('Resending OTP with token:', authData.token);
    try {
      const response = await resendVerificationEmail(authData.token);

      console.log('Resend OTP Response:', response);
      Toast.show({
        type: 'success',
        text1: 'OTP resent! Please check your email.',
      });
    } catch (error: any) {
      console.error('Resend OTP Error:', error);
      Toast.show({
        type: 'error',
        text1: error.response?.data?.message || 'An error occurred while resending the OTP. Please try again.',
      });
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
            <Text className="text-tertiary-600 font-semibold" onPress={() => handleResendOTP()}>
              Resend
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default VerifyEmailScreen;
