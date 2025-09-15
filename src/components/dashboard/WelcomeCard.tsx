import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';
  
export const WelcomeCard = () => {
  const { authData } = useAuth();
  const user = authData?.user;

  return (
    <View className="bg-tertiary-100 p-4 rounded-2xl flex-row justify-between items-center mb-6">
      <View>
        <Text className="text-lg font-bold text-white">{user?.firstName + ' '+ user?.lastName}</Text>
        {
          user?.role === 'student' && (
            <Text className="text-sm text-gray-500 mt-2 text-white">Matric No: {user?.matricNumber || 'N/A'}</Text>
          )
        }
        {
          user?.role === 'student' && user?.level ? (
          <View className="flex-row space-x-2 mt-1">
            <Text className="text-sm text-white">200 Level, </Text>
            <Text className="text-sm text-white">2nd Semester</Text>
          </View>
          ) : user?.role === 'lecturer'  && user?.semester ? (
            <Text className="mt-1 text-sm text-white">{user?.semester == 'first' ? '1st' : '2nd'} Semester</Text>
          ) : null
        }
        <Text className="text-sm text-white mt-1">{user?.department.name || 'N/A'}</Text>
        <Text className="text-sm text-white mt-1">{ user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || 'N/A' }</Text>

      </View>
      <Image
        source={{ uri: user?.profilePicture}}
        className="w-14 h-14 rounded-full"
      />
    </View>
  );
};
