import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';

const dummyCourse = {
  code: 'GST 101',
  name: 'Use of English',
  location: 'Lecture Hall 2',
  date: '2025-09-14',
  startTime: '09:00 AM',
  endTime: '10:00 AM',
};

const tabs = [
  { key: 'details', label: 'Details' },
  { key: 'members', label: 'Members' },
  { key: 'attendance', label: 'Attendance' },
];

const ViewClassDetailScreen = () => {
  const route = useRoute();
  const { userCourse, classId } = route.params as { userCourse: any; classId: string };

  const [activeTab, setActiveTab] = useState('details');

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
      <BackHeader title="Class Details" />

      {/* Course/Class Details Card */}
      <View className="bg-primary-100 rounded-xl shadow p-4 mb-6 flex-row items-center">
        <Ionicons name="school-outline" size={32} color="#fff" />
        <View className="ml-4 flex-1">
          <Text className="text-base font-bold text-white">{dummyCourse.code}</Text>
          <Text className="text-sm text-white mb-1">{dummyCourse.name}</Text>
          <Text className="text-xs text-white">
            {dummyCourse.date} | {dummyCourse.startTime} - {dummyCourse.endTime}
          </Text>
          <Text className="text-xs text-white mt-1">Location: {dummyCourse.location}</Text>
        </View>
      </View>

      {/* Top Tabs */}
      <View className="flex-row bg-white rounded-xl shadow mb-4">
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.key}
            className={`flex-1 py-3 items-center ${activeTab === tab.key ? 'bg-primary-600' : ''}`}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text className={`font-semibold ${activeTab === tab.key ? 'text-white' : 'text-primary-700'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView className="flex-1">
        {activeTab === 'details' && (
          <View className="p-2">
            <Text className="text-base font-bold mb-2">Class Information</Text>
            <Text className="mb-1">Course: {dummyCourse.name}</Text>
            <Text className="mb-1">Code: {dummyCourse.code}</Text>
            <Text className="mb-1">Date: {dummyCourse.date}</Text>
            <Text className="mb-1">Time: {dummyCourse.startTime} - {dummyCourse.endTime}</Text>
            <Text className="mb-1">Location: {dummyCourse.location}</Text>
          </View>
        )}
        {activeTab === 'members' && (
          <View className="p-2">
            <Text className="text-base font-bold mb-2">Members</Text>
            <Text>No members data yet.</Text>
          </View>
        )}
        {activeTab === 'attendance' && (
          <View className="p-2">
            <Text className="text-base font-bold mb-2">Attendance</Text>
            <Text>No attendance data yet.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewClassDetailScreen;