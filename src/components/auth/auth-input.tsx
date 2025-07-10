import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

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
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      {validationFeedback.isValid ? null : (
        <Text className="text-red-500 text-xs mt-1">{ validationFeedback.message }</Text>
      )}
    </View>
  );
};
