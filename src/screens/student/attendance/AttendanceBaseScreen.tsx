import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

// import { ProgressCircle } from 'react-native-svg'; // or any progress library
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BackHeader } from '@/src/components/common/BackHeader';
import  TopNavigator from '@/src/navigations/TopNavigator';

const AttendanceBaseScreen = () => {
  // Mock data - replace with real data
  const overallAttendance = 85;
  const totalClasses = 45;
  const present = 38;
  const absent = 7;
  const requiredAttendance = 75;

  const recentAttendance = [
    { course: 'GST 101', date: '2024-08-10', status: 'Present' },
    { course: 'PHY 101', date: '2024-08-09', status: 'Absent' },
    { course: 'MTH 101', date: '2024-08-08', status: 'Present' },
  ];

  const courseAttendance = [
    { course: 'GST 101 - Use of English', percentage: 90, present: 18, total: 20 },
    { course: 'PHY 101 - Physics I', percentage: 80, present: 12, total: 15 },
    { course: 'MTH 101 - Mathematics', percentage: 70, present: 8, total: 10 },
  ];

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16">
      <BackHeader title="Attendance Data" />
      <TopNavigator />
    </View>
  );
};

export default AttendanceBaseScreen;