import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = TextInputProps & {
  placeholder: string;
  secureTextEntry?: boolean;
  validationFeedback: {
    isValid: boolean | null;
    message: string | null;
  }
};

export const AuthInput = ({ placeholder, secureTextEntry, validationFeedback, ...rest }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const borderColor = isFocused
    ? 'border-[#0057A0]'
    : validationFeedback.isValid == false
    ? 'border-red-500'
    : 'border-gray-300';

  return (
    <View className="mb-4">
      <TextInput
        className={`border rounded-lg px-4 py-3 text-base text-gray-900 ${borderColor}`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {secureTextEntry && (
        <TouchableOpacity
          className="absolute right-4 top-3"
          onPress={togglePasswordVisibility}
        >
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={18} className="text-gray-200" />
        </TouchableOpacity>
      )}
      {validationFeedback.isValid ? null : (
        <Text className="text-red-500 text-xs mt-1">{ validationFeedback.message }</Text>
      )}
    </View>
  );
};
