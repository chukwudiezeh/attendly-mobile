import React from 'react';
import { View, Text, Image } from 'react-native';

export const WelcomeCard = () => {
  return (
    <View className="bg-tertiary-100 p-4 rounded-2xl flex-row justify-between items-center mb-6">
      <View>
        <Text className="text-lg font-bold text-white">Eliana Brian</Text>
        <Text className="text-sm text-gray-500 mt-2 text-white">Matric No: 1000012233</Text>

        <View className="flex-row space-x-2 mt-1">
          <Text className="text-sm text-white">200 Level, </Text>
          <Text className="text-sm text-white">2nd Semester</Text>
        </View>
        <Text className="text-sm text-white mt-2">Computer Science</Text>
        
      </View>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
        className="w-14 h-14 rounded-full"
      />
    </View>
  );
};
