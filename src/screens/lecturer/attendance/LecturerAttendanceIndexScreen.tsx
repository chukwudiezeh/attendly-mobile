import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';
import { Dropdown } from 'react-native-element-dropdown';
import { LecturerStackParamList } from '@/src/config/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const dummyAttendanceSessions = [
  {
    id: '1',
    courseCode: 'GST 101',
    courseName: 'Use of English',
    date: '2025-09-14',
    time: '09:00 AM',
    status: 'Open',
  },
  {
    id: '2',
    courseCode: 'PHY 201',
    courseName: 'Physics II',
    date: '2025-09-13',
    time: '11:00 AM',
    status: 'Closed',
  },
];

// Dummy dropdown data
const academicSessions = [
  { label: '2024/2025', value: '2024/2025' },
  { label: '2023/2024', value: '2023/2024' },
];
const semesters = [
  { label: '1st Semester', value: 'first' },
  { label: '2nd Semester', value: 'second' },
];

const LecturerAttendanceIndexScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LecturerStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState(dummyAttendanceSessions);

  // Academic session and semester state
  const [academicSession, setAcademicSession] = useState('');
  const [semester, setSemester] = useState('');

  const handleLoadData = () => {
    setLoading(true);
    // Replace with your API call using academicSession and semester
    setTimeout(() => {
      setSessions(dummyAttendanceSessions); // Replace with fetched data
      setLoading(false);
    }, 1200);
  };

  const renderSession = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center justify-between"
      onPress={() => navigation.navigate('ViewClassesScreen', { userCourse: item })}
    >
      <View>
        <Text className="font-semibold">{item.courseCode} - {item.courseName}</Text>
        <Text className="text-xs text-gray-500">{item.date} | {item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
      <BackHeader title="Attendance Sessions" />
      <Text className="text-lg font-bold mb-4">Attendance Sessions</Text>

      {/* Dropdowns and Search Button */}
      <View className="flex-row mb-4 items-center justify-between">
        <View style={{ flex: 1, marginRight: 8 }}>
          <Dropdown
            data={academicSessions}
            labelField="label"
            valueField="value"
            value={academicSession}
            onChange={item => setAcademicSession(item.value)}
            placeholder="Academic Year"
            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
          />
        </View>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Dropdown
            data={semesters}
            labelField="label"
            valueField="value"
            value={semester}
            onChange={item => setSemester(item.value)}
            placeholder="Semester"
            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
          />
        </View>
        <TouchableOpacity
          className="bg-primary-600 p-3 rounded-lg flex-row items-center justify-center"
          onPress={handleLoadData}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="search" size={22} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0057A0" />
        </View>
      ) : (
        <FlatList
          data={sessions}
          keyExtractor={item => item.id}
          renderItem={renderSession}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Ionicons name="folder-open-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
              <Text className="text-gray-500 text-base">No attendance sessions found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

export default LecturerAttendanceIndexScreen;