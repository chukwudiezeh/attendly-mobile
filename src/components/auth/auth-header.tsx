import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
};

export const AuthHeader = ({ title, subtitle }: Props) => {
  return (
    <View className="mb-8">
      <Text className="text-3xl font-bold text-center text-gray-900">
        {title}
      </Text>
      {subtitle && (
        <Text className="text-base text-gray-500 text-center mt-2">
          {subtitle}
        </Text>
      )}
    </View>
  );
};
