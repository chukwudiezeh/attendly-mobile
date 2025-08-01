import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { useNavigation } from '@react-navigation/native';

const mockCourseRegistrations = [
  // Example data structure
  {
    session: '2023/2024',
    level: '200',
    semester: '2nd Semester',
    courses: ['GST 101 - Use of English', 'PHY 101 - Physics I'],
  },
];

const CourseIndexScreen = () => {
    const navigation = useNavigation();

  const handleAddCourse = () => {
    // Navigation or logic to add new course registration
    console.log('Add new course registration');
  };

  const renderRegistration = ({ item }: { item: any }) => (
    <View className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center justify-between">
      <View>
        <Text className="font-bold text-base mb-1">{item.session}</Text>
        <Text className="text-sm text-gray-700 mb-1">{item.level} Level, {item.semester}</Text>
      </View>
      <View className="flex-row space-x-4">
        <TouchableOpacity onPress={() => console.log('View', item)} style={{ marginLeft: 20 }}>
          <Ionicons name="eye-outline" size={22} color="#6366f1" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Edit', item)} style={{ marginLeft: 20 }}>
          <Ionicons name="create-outline" size={22} color="#f59e42" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Delete', item)} style={{ marginLeft: 20 }}>
          <Ionicons name="trash-outline" size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-16" contentContainerStyle={{ paddingBottom: 64 }}>
      {/* Header with Add Button */}
        <ScreenHeader />
      <View className="flex-row justify-end mt-4 mb-4">
        <TouchableOpacity
          className="bg-primary-600 p-2 rounded-lg flex-row items-center"
          onPress={() => navigation.navigate('CourseRegScreen' as never)}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text className="text-white ml-1 text-sm">New Course Reg.</Text>
        </TouchableOpacity>
      </View>

      {/* Course Registration List */}
      {mockCourseRegistrations.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-20">
          <Ionicons name="folder-open-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
          <Text className="text-gray-500 text-base">No Course registration done yet</Text>
        </View>
      ) : (
        <FlatList
          data={mockCourseRegistrations}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderRegistration}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </ScrollView>
  );
};

export default CourseIndexScreen;