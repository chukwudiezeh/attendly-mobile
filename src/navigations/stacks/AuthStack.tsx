import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerifyEmailScreen from '../../screens/auth/VerifyEmailScreen';
// import DashboardScreen from '../../screens/student/DashboardScreen';
import { useAuth } from '../../context/AuthContext';

// Navigations
// import BottomTabsNavigator from '../BottomTabsNavigator';
import DrawerNavigator from '../DrawerNavigator';
// import TopNavigator from '../TopNavigator';

// Student Screens
import CourseRegScreen from '@/src/screens/student/course/CourseRegScreen';
import ViewCourseRegScreen from '@/src/screens/student/course/ViewCourseRegScreen';
import AttendanceBaseScreen from '@/src/screens/student/attendance/AttendanceBaseScreen';
import ViewClassScreen from '@/src/screens/student/class/ViewClassScreen';
//Lecturer Screens
import LecturerCourseRegScreen from '@/src/screens/lecturer/course/CourseRegScreen';
import LecturerViewCourseRegScreen from '@/src/screens/lecturer/course/ViewCourseRegScreen';
import ClassSettingScreen from '@/src/screens/lecturer/class/ClassSetting';
import ViewClassesScreen from '@/src/screens/lecturer/class/ViewClassesScreen';
import ViewClassDetailScreen from '@/src/screens/lecturer/class/ViewClassDetailScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const { authData } = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {authData?.user?.emailVerified ? (
        <>
        <Stack.Screen
          name="Drawer"
          component={ DrawerNavigator } // Assuming Dashboard is part of BottomTabsNavigator
          options={{ headerShown: false }}
        />
        {
          authData?.user?.role === 'student' ? (
            <>
              <Stack.Screen
                name="CourseRegScreen"
                component={CourseRegScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewCourseRegScreen"
                component={ViewCourseRegScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AttendanceBaseScreen"
                component={AttendanceBaseScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewClassScreen"
                component={ViewClassScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="LecturerCourseRegScreen"
                component={LecturerCourseRegScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LecturerViewCourseRegScreen"
                component={LecturerViewCourseRegScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ClassSettingScreen"
                component={ClassSettingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewClassesScreen"
                component={ViewClassesScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ViewClassDetailScreen"
                component={ViewClassDetailScreen}
                options={{ headerShown: false }}
              />
            </>
          )
        }
        </>

      ) : (
        <Stack.Screen
          name="VerifyEmail"
          component={VerifyEmailScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;