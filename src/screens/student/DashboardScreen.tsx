import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { WelcomeCard } from '@/src/components/dashboard/WelcomeCard';
// import { AcademicTile } from '@/src/components/dashboard/AcademicTile';
// import { HomeworkCard } from '@/src/components/dashboard/HomeworkCard';
// import { EventUpdate } from '@/src/components/dashboard/EventUpdate';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DashboardScreen = () => {
  // const { authData } = useAuth();
  type DrawerParamList = {
    Dashboard: undefined;
    Profile: undefined;
    Settings: undefined;
  };
  const drawerNavigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const { logout } = useAuth();

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-16 pb-16" contentContainerStyle={{ paddingBottom: 64 }}>
      <View className="flex-row items-center justify-between pb-4 shadow-md">
        <TouchableOpacity onPress={() => drawerNavigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={28} color="#002147" /> {/* gray-800 */}
        </TouchableOpacity>
  
        <TouchableOpacity onPress={() => drawerNavigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="notifications" size={25} color="#002147" /> {/* gray-800 */}
        </TouchableOpacity>
      </View>

      {/* Greeting and profile */}
      <Text className="text-l mb-3">Hi there, Welcome!</Text>

      {/* Welcome Card */}
      <WelcomeCard />


      <View className="mb-6 bg-white shadow rounded-xl p-4">
        <View className="flex-row justify-between mb-2">
          <Text className="font-semibold">Classes Done Today</Text>
          <View className="bg-purple-200 px-2 rounded-full">
            <Text className="text-xs text-purple-800 font-semibold">2</Text>
          </View>
        </View>
        <Text className="text-gray-500 text-xs mb-2">Classes completed today</Text>

        {/* Meeting Card */}
        {['GST 101 - Use of English', 'PHY 101 - Physics I'].map((title, idx) => (
          <View
            key={idx}
            className="bg-white shadow rounded-xl p-4 mb-3 border border-gray-100"
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center space-x-2">
                <Ionicons name="school-outline" size={18} color="#6B21A8" />
                <Text className="font-semibold">{title}</Text>
              </View>
              <Text className="text-xs text-gray-500">01:30 AM - 02:00 AM</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row">
                <Text className="text-sm text-gray-500">Class No: </Text>
                <Text className="text-sm text-gray-500 ml-1">3</Text>
              </View>
              <View className="flex-row">
                <Text className="text-sm text-gray-500">Status: </Text>
                <Text className="text-sm bg-green-100 text-green-700 px-3 py-0.5 rounded-full ml-1">
                  Present
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row">
                <Text className="text-sm text-gray-500">Lecturer: </Text>
                <Text className="text-sm text-gray-500 ml-1">Dr. Smith</Text>
              </View>
              
            </View>
          </View>
        ))}
        <View className="mt-4 items-center justify-center">
          <TouchableOpacity
            className="bg-primary-600 px-4 py-2 rounded-lg w-1/2 flex-row items-center justify-center"
            onPress={() => console.log('View all classes')}
          >
            <Text className="text-white text-xs">View all</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Task Section */}
     <View className="mb-6 bg-white shadow rounded-xl p-4">
        <View className="flex-row justify-between mb-2">
          <Text className="font-semibold">Upcoming classes</Text>
          <View className="bg-purple-200 px-2 rounded-full">
            <Text className="text-xs text-purple-800 font-semibold">2</Text>
          </View>
        </View>
        <Text className="text-gray-500 text-xs mb-2">Your schedule for the day</Text>

        {/* Meeting Card */}
        {['GST 101 - Use of English', 'PHY 101 - Physics I'].map((title, idx) => (
          <View
            key={idx}
            className="bg-white shadow rounded-xl p-4 mb-3 border border-gray-100"
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center space-x-2">
                <Ionicons name="school-outline" size={18} color="#6B21A8" />
                <Text className="font-semibold">{title}</Text>
              </View>
              <Text className="text-xs text-gray-500">01:30 AM - 02:00 AM</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row">
                <Text className="text-sm text-gray-500">Class No: </Text>
                <Text className="text-sm text-gray-500 ml-1">3</Text>
              </View>
              <TouchableOpacity className="bg-primary-600 px-3 py-1 rounded-full">
                <Text className="text-white text-xs">View details</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row">
                <Text className="text-sm text-gray-500">Lecturer: </Text>
                <Text className="text-sm text-gray-500 ml-1">Dr. Smith</Text>
              </View>
              
            </View>
          </View>
        ))}
        <View className="mt-4 items-center justify-center">
          <TouchableOpacity
            className="bg-primary-600 px-4 py-2 rounded-lg w-1/2 flex-row items-center justify-center"
            onPress={() => console.log('View all classes')}
          >
            <Text className="text-white text-xs">View all</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
