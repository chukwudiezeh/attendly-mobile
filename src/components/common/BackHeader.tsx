import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BackHeaderProps } from '@/src/config/types';

export const BackHeader: React.FC<BackHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center mb-4">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="#002147" />
      </TouchableOpacity>
        <View className="flex-1 items-center">
          <Text className="font-bold text-lg">{ title }</Text>
        </View>
    </View>
  );
};