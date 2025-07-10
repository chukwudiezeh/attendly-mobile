import React from 'react';
import { View, Text } from 'react-native';

export const AcademicTile = ({ label, color }: { label: string; color: string }) => {
  return (
    <View className={`w-[22%] aspect-square ${color} rounded-xl items-center justify-center`}>
      {/* Use icon here later */}
      <Text className="text-xs text-gray-700 text-center">{label}</Text>
    </View>
  );
};
