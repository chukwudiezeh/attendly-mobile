import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { ProgressCircle } from 'react-native-svg'; // or any progress library

import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StudentStackParamList } from '@/src/config/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAttendanceSummary } from '@/src/services/attendanceService';
import { useAuth } from '@/src/context/AuthContext';

const AttendanceSummaryScreen = () => {
  const { authData } = useAuth();
  const user = authData?.user;
  const token = authData?.token;

  const route = useRoute();
  const { userCourse } = route.params as { userCourse: any };

  const [summaryData, setSummaryData] = React.useState<any>(null);  
  // Mock data - replace with real data
  const overallAttendance = 85;
  const totalClasses = 45;
  const present = 38;
  const absent = 7;
  const requiredAttendance = 75;

  const navigation = useNavigation<NativeStackNavigationProp<StudentStackParamList>>();
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


  useEffect(() => {
    // Fetch attendance data from API if needed
    console.log('User Course:', userCourse);
    console.log('User token:', token);
    console.log('User ID:', user?.id);

    const fetchAttendanceData = async () => {
      try {
        const summary = await getAttendanceSummary(userCourse.id, user?.id || '', token);
        setSummaryData(summary.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []);
  function chunkArray(array: any[], size: number) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 pt-16" contentContainerStyle={{ paddingBottom: 64, paddingHorizontal: 16 }}>
      {summaryData &&
        chunkArray(Object.entries(summaryData), 2).map((pair, rowIdx) => (
          <View key={rowIdx} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            {pair.map(([key, value]) => (
              <View
                key={key}
                className="bg-white rounded-xl shadow p-4"
                style={{ width: '48%' }}
              >
                <Text className="text-xs text-gray-500 mb-2">{key.replace(/_/g, ' ').toUpperCase()}</Text>
                <Text className="text-xl font-bold text-primary-600">{String(value)}</Text>
              </View>
            ))}
            {pair.length < 2 && <View style={{ width: '48%' }} />} {/* Empty space for single card in last row */}
          </View>
        ))
      }
    </ScrollView>
  );
};

export default AttendanceSummaryScreen;