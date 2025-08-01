// src/navigation/BottomTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DashboardScreen from '@/src/screens/student/DashboardScreen';
import CourseIndexScreen from '@/src/screens/student/course/CourseIndexScreen';
// Example screens
const HomeScreen = () => <View className="flex-1 items-center justify-center"><Text>Home</Text></View>;
// const ProfileScreen = () => <View className="flex-1 items-center justify-center"><Text>Profile</Text></View>;
const SettingsScreen = () => <View className="flex-1 items-center justify-center"><Text>Settings</Text></View>;

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0057A0',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Course') iconName = 'person-outline';
          if (route.name === 'Attendance') iconName = 'settings-outline';
          if (route.name === 'Settings') iconName = 'settings-outline';

          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Dashboard" component={ DashboardScreen } />
      <Tab.Screen name="Course" component={ CourseIndexScreen } />
      <Tab.Screen name="Attendance" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
};

export default BottomTabs;
