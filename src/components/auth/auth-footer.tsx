import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  onPress: () => void;
   questionText?: string;
   actionText?: string;
};

export const AuthFooter = ({ onPress, questionText, actionText }: Props) => {
  return (
    <View className="flex-row justify-center mt-6">
      <Text className="text-gray-500 text-sm">
        { questionText }{' '}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="text-tertiary-600 font-semibold text-sm">
          { actionText }
        </Text>
      </TouchableOpacity>
    </View>
  );
};
