import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const HomeworkCard = () => {
  return (
    <View className="bg-cyan-700 p-4 rounded-xl mb-3">
      <Text className="text-white font-semibold">Maths</Text>
      <Text className="text-white text-xs mt-1">6 days left</Text>
      <TouchableOpacity className="mt-4 bg-white py-1 px-3 rounded-full self-start">
        <Text className="text-cyan-700 font-semibold text-sm">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
