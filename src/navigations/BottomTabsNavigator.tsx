// src/navigation/BottomTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@/src/context/AuthContext';

import ProfileScreen from '@/src/screens/user/ProfileScreen';

//Student Screens
import DashboardScreen from '@/src/screens/student/DashboardScreen';
import CourseIndexScreen from '@/src/screens/student/course/CourseIndexScreen';
import AttendanceCourseScreen from '@/src/screens/student/attendance/AttendanceCourseScreen';

//Lecturer Screens
import LecturerDashboardScreen from '@/src/screens/lecturer/DashboardScreen';
import LecturerCourseIndexScreen from '@/src/screens/lecturer/course/CourseIndexScreen';
import LecturerAttendanceIndexScreen from '@/src/screens/lecturer/attendance/LecturerAttendanceIndexScreen';

// Example screens
// const HomeScreen = () => <View className="flex-1 items-center justify-center"><Text>Home</Text></View>;
// const ProfileScreen = () => <View className="flex-1 items-center justify-center"><Text>Profile</Text></View>;
const SettingsScreen = () => <View className="flex-1 items-center justify-center"><Text>Settings</Text></View>;

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { authData } = useAuth();
  const isStudent = authData?.user?.role === 'student';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0057A0',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Course') iconName = 'book-outline';
          if (route.name === 'Attendance') iconName = 'checkmark-outline';
          if (route.name === 'Profile') iconName = 'person-outline';

          return <Icon name={iconName} size={size} color={color} />;
        }
      })}
    >
      {isStudent ? (
        <>
        <Tab.Screen name="Dashboard" component={ DashboardScreen } />
        <Tab.Screen name="Course" component={ CourseIndexScreen } />
        <Tab.Screen name="Attendance" component={ AttendanceCourseScreen } />
        </>
      ) : (
        <>
          <Tab.Screen name="Dashboard" component={ LecturerDashboardScreen } />
          <Tab.Screen name="Course" component={ LecturerCourseIndexScreen } />
          <Tab.Screen name="Attendance" component={ LecturerAttendanceIndexScreen } />
        </>
      )}

      <Tab.Screen name="Profile" component={ ProfileScreen } />
    </Tab.Navigator>
  );
};

export default BottomTabs;
