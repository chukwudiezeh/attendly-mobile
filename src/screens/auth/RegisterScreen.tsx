import React, { useState, useEffect, use } from 'react';
import {
  Image,
  View,
  ScrollView,
  SafeAreaView,
  Text,
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
// import { AuthButton } from '@/src/components/auth/auth-button';
import { AuthFooter } from '@/src/components/auth/auth-footer';
import { validateEmail, validatePassword, validateName, validateMatricNumber, validateDepartment, validateRole } from '@/src/utils/validators/auth-validator';
import { Dropdown } from 'react-native-element-dropdown';
import { register } from '@/src/services/authService';
import { getDepartments } from '@/src/services/utilityService';
import { ValidationFeedback } from '@/src/config/types';
import { useContext } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


const roles = [
  { label: 'Student', value: 'student' },
  { label: 'Lecturer', value: 'lecturer' }
];

const departments: { label: string; value: string }[] = [];

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [role, setRole] = useState('');
  const [matricNumber, setMatricNumber] = useState('');
  const [password, setPassword] = useState('');
  const [emailValidationFeedback, setEmailValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });
  const [passwordValidationFeedback, setPasswordValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });
  const [firstNameValidationFeedback, setFirstNameValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });
  const [lastNameValidationFeedback, setLastNameValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });
  const [matricNumberValidationFeedback, setMatricNumberValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });
  const [departmentValidationFeedback, setDepartmentValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });
  const [roleValidationFeedback, setRoleValidationFeedback] = useState<ValidationFeedback>({ isValid: null, message: null });


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        console.log('Fetched Departments:', response);
        // Assuming the response is an array of departments
        const formattedDepartments = response.data.map((dept: any) => ({
          label: dept.name, // Adjust based on your API response structure
          value: dept.id // Adjust based on your API response structure
        }));
        departments.push(...formattedDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

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

  const handleFirstNameChange = (firstName: string) => {
    setFirstName(firstName);
    setFirstNameValidationFeedback(validateName(firstName, 'First Name'));
  }

  const handleLastNameChange = (lastName: string) => {
    setLastName(lastName);
    setLastNameValidationFeedback(validateName(lastName, 'Last Name'));
  }

  const handleMatricNumberChange = (matricNumber: string) => {
    setMatricNumber(matricNumber);
    setMatricNumberValidationFeedback(validateMatricNumber(matricNumber));
  }

  const handleDepartmentChange = (department: string) => {
    setDepartment(department);
    setDepartmentValidationFeedback(validateDepartment(department));
  }

  const handleRoleChange = (role: string) => {
    setRole(role);
    // Reset matric number if role changes to lecturer
    if (role !== 'student') {
      setMatricNumber('');
      setMatricNumberValidationFeedback({ isValid: null, message: null });
    }
    setRoleValidationFeedback(validateRole(role));
  }

  const { setAuthData } = useAuth();

  const handleRegister = async () => {
    
    if (!emailValidationFeedback.isValid || !passwordValidationFeedback.isValid ||
        !firstNameValidationFeedback.isValid || !lastNameValidationFeedback.isValid ||
        (role === 'student' && !matricNumberValidationFeedback.isValid) ||
        !departmentValidationFeedback.isValid || !roleValidationFeedback.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Please fill in all fields correctly'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await register({firstName, lastName, email, password, department, role, matricNumber});
      console.log('Registration Response:', response);
      const { token, user } = response.data;
      await setAuthData({ user, token });

      setIsLoading(false);
      // navigation.navigate('VerifyEmail' as never);
    } catch (error: any) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      });
      
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1 bg-white px-6 justify-center"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
        contentContainerStyle= {{ paddingTop: 65 }}>
          {/* Logo */}
          <View className="items-center mb-10">
            <Image source={require('@/src/assets/logos/attendlylogo.png')}
            resizeMode="contain"/>
          </View>

          {/* Title */}
          <AuthHeader title="Create an Account"
          subtitle="Kindly input your details to get started" />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <AuthInput placeholder="First Name" value={firstName} validationFeedback={firstNameValidationFeedback} onChangeText={handleFirstNameChange} editable={!isLoading} />
            </View>
            <View className="flex-1">
              <AuthInput placeholder="Last Name" value={lastName} validationFeedback={lastNameValidationFeedback} onChangeText={handleLastNameChange} editable={!isLoading} />
            </View>
          </View>

          {/* Email Input */}
          <AuthInput placeholder="Email Address" validationFeedback={emailValidationFeedback}
          placeholderTextColor="#999" autoCapitalize="none" value={email}
          onChangeText={handleEmailChange} editable={!isLoading} />

          {/* Department Dropdown */}
          <View className="mb-4">
            <Dropdown
              data={departments}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Department"
              searchPlaceholder="Search..."
              value={department}
              onChange={item => handleDepartmentChange(item.value)}
              style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', paddingHorizontal: 12, height: 50 }}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
              placeholderStyle={{ color: '#9CA3AF' }}
            />
          </View>

          {/* Role Dropdown */}
          <View className="mb-4">
            <Dropdown
              data={roles}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Role"
              value={role}
              onChange={item => handleRoleChange(item.value)}
              style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', paddingHorizontal: 12, height: 50 }}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
              placeholderStyle={{ color: '#9CA3AF' }}
            />
          </View>
          {/* Conditional Matric Number */}
          {role === 'student' && (
            <AuthInput
              placeholder="Matric Number"
              value={matricNumber}
              validationFeedback={matricNumberValidationFeedback}
              onChangeText={handleMatricNumberChange}
              placeholderTextColor="#999"
            />
          )}

          {/* Password Input */}
          <AuthInput placeholder="Enter Password" secureTextEntry validationFeedback={passwordValidationFeedback} placeholderTextColor="#999"
          autoCapitalize="none" value={password} onChangeText={handlePasswordChange} editable={!isLoading} />

          {/* Register Button */}
          <TouchableOpacity
            className="bg-primary-500 py-4 rounded-xl items-center"
            onPress={handleRegister}
          >
            { isLoading ? (
              <ActivityIndicator size="small" className="text-tertiary-600" />
            ) : (
              <Text className="text-secondary-500 font-semibold">Sign up</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <AuthFooter questionText="Already have an account?" actionText="Sign in"
          onPress={() => navigation.navigate('Login' as never)}/>
      </ScrollView>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;
