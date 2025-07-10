import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { WelcomeCard } from '@/src/components/dashboard/WelcomeCard';
import { AcademicTile } from '@/src/components/dashboard/AcademicTile';
import { HomeworkCard } from '@/src/components/dashboard/HomeworkCard';
import { EventUpdate } from '@/src/components/dashboard/EventUpdate';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  // const { authData } = useAuth();
  // const navigation = useNavigation();
  const { logout } = useAuth();

  const handleTempLogout = async () => {
    await logout();
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      {/* Greeting and profile */}
      <Text className="text-sm text-gray-400 mb-1">Hi there, Welcome!</Text>

      {/* Welcome Card */}
      <WelcomeCard />

      {/* Academics */}
      <Text className="text-base font-semibold mt-6 mb-2">Academics</Text>
      <View className="flex-row justify-between">
        <AcademicTile label="Bus Tracking" color="bg-purple-100" />
        <AcademicTile label="Exams" color="bg-yellow-100" />
        <AcademicTile label="Fee" color="bg-cyan-100" />
        <AcademicTile label="Homework" color="bg-orange-100" />
      </View>

      {/* Homework Section */}
      <View className="flex-row justify-between items-center mt-6 mb-2">
        <Text className="text-base font-semibold">Homeworks</Text>
        <TouchableOpacity onPress={handleTempLogout}>
          <Text className="text-primary-700 text-sm font-medium">View all</Text>
        </TouchableOpacity>
      </View>
      <HomeworkCard />
      <HomeworkCard />

      {/* Event Updates */}
      <Text className="text-base font-semibold mt-6 mb-2">Event updates</Text>
      <EventUpdate />
    </ScrollView>
  );
};

export default DashboardScreen;
