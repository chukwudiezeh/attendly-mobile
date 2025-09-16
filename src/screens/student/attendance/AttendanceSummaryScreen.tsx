import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { ProgressCircle } from 'react-native-svg'; // or any progress library
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScreenHeader} from '@/src/components/common/ScreenHeader';

const AttendanceSummaryScreen = () => {
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
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-16" contentContainerStyle={{ paddingBottom: 64 }}>
      <ScreenHeader />
      
      {/* Overall Attendance Card */}
      <View className="bg-white rounded-xl shadow p-6 mb-4">
        <Text className="text-lg font-bold mb-4 text-center">Overall Attendance</Text>
        
        {/* Progress Circle */}
        <View className="items-center mb-4">
          <View className="relative">
            {/* You can use any circular progress component here */}
            <View className="w-24 h-24 rounded-full border-8 border-gray-200 items-center justify-center">
              <Text className="text-xl font-bold">{overallAttendance}%</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-600">{present}</Text>
            <Text className="text-sm text-gray-600">Present</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-red-600">{absent}</Text>
            <Text className="text-sm text-gray-600">Absent</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-blue-600">{totalClasses}</Text>
            <Text className="text-sm text-gray-600">Total</Text>
          </View>
        </View>

        {/* Warning if below required attendance */}
        {overallAttendance < requiredAttendance && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
            <View className="flex-row items-center">
              <Ionicons name="warning" size={20} color="#DC2626" />
              <Text className="text-red-700 ml-2 text-sm">
                Attendance below required {requiredAttendance}%
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity className="flex-1 bg-blue-600 py-3 rounded-lg mr-2 flex-row items-center justify-center">
          <Ionicons name="calendar-outline" size={20} color="white" />
          <Text className="text-white ml-2 font-semibold">View Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-green-600 py-3 rounded-lg ml-2 flex-row items-center justify-center">
          <Ionicons name="list-outline" size={20} color="white" />
          <Text className="text-white ml-2 font-semibold">Full History</Text>
        </TouchableOpacity>
      </View>

      {/* Course-wise Attendance */}
      <View className="bg-white rounded-xl shadow p-4 mb-4">
        <Text className="text-lg font-bold mb-3">Course Attendance</Text>
        {courseAttendance.map((course, index) => (
          <View key={index} className="mb-3">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="font-semibold text-sm flex-1">{course.course}</Text>
              <Text className="font-bold">{course.percentage}%</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                <View 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${course.percentage}%` }}
                />
              </View>
              <Text className="text-xs text-gray-600">{course.present}/{course.total}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Attendance */}
      <View className="bg-white rounded-xl shadow p-4">
        <Text className="text-lg font-bold mb-3">Recent Attendance</Text>
        {recentAttendance.map((record, index) => (
          <View key={index} className="flex-row justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
            <View>
              <Text className="font-semibold">{record.course}</Text>
              <Text className="text-sm text-gray-600">{record.date}</Text>
            </View>
            <View className={`px-3 py-1 rounded-full ${
              record.status === 'Present' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Text className={`text-xs font-semibold ${
                record.status === 'Present' ? 'text-green-700' : 'text-red-700'
              }`}>
                {record.status}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AttendanceSummaryScreen;