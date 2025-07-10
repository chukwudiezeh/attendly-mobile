import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

export const AuthButton = ({ label, onPress, style }: Props) => {
  return (
    <TouchableOpacity
      className="bg-primary-600 py-4 rounded-lg items-center"
      onPress={onPress}
      style={style}
    >
      <Text className="text-secondary-600 font-semibold">
        {label}
      </Text>
    </TouchableOpacity>
  );
};
