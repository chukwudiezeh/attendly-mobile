import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LecturerStackParamList } from '@/src/config/types';

const dummyClasses = [
  {
    id: '1',
    date: '2025-09-14',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    status: 'Ongoing',
    location: 'Lecture Hall 2',
  },
  {
    id: '2',
    date: '2025-09-07',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    status: 'Completed',
    location: 'Lecture Hall 2',
  },
];

const ViewClassesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LecturerStackParamList>>();
  const route = useRoute();

  const { userCourse } = route.params as { userCourse: any };
  // You can get courseId from route.params if needed
  // const { courseId } = route.params as { courseId: string };

  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState(dummyClasses);

  const renderClass = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center justify-between"
      onPress={() => navigation.navigate('ViewClassDetailScreen', { userCourse, classId: item.id })}
    >
      <View>
        <Text className="font-semibold">{item.date}</Text>
        <Text className="text-xs text-gray-500">
          {item.startTime} - {item.endTime} | {item.location}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Ionicons
          name={item.status === 'Ongoing' ? 'play-circle-outline' : 'checkmark-circle-outline'}
          size={22}
          color={item.status === 'Ongoing' ? '#22c55e' : '#0057A0'}
        />
        <Text className={`ml-2 text-xs font-semibold ${item.status === 'Ongoing' ? 'text-green-600' : 'text-primary-700'}`}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
      <BackHeader title="Classes" />
      <Text className="text-lg font-bold mb-4">Classes for this Course</Text>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0057A0" />
        </View>
      ) : (
        <FlatList
          data={classes}
          keyExtractor={item => item.id}
          renderItem={renderClass}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Ionicons name="folder-open-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
              <Text className="text-gray-500 text-base">No classes found for this course</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default ViewClassesScreen;