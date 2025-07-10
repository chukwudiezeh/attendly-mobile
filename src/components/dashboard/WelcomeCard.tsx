import React from 'react';
import { View, Text, Image } from 'react-native';

export const WelcomeCard = () => {
  return (
    <View className="bg-gray-100 p-4 rounded-xl flex-row justify-between items-center">
      <View>
        <Text className="text-lg font-bold">Eliana Brian</Text>
        <View className="flex-row space-x-2 mt-1">
          <Text className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Class IX - A</Text>
          <Text className="text-xs text-gray-600">Roll No: 12</Text>
        </View>
        <Text className="text-xs text-gray-500 mt-2">Attendance</Text>
        <View className="w-40 h-2 bg-gray-300 rounded-full mt-1">
          <View className="w-[53%] h-2 bg-green-600 rounded-full" />
        </View>
      </View>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
        className="w-14 h-14 rounded-full"
      />
    </View>
  );
};
