import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUserCoursesInCourseReg } from '@/src/services/courseService';
import { useAuth } from '@/src/context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BackHeader } from '@/src/components/common/BackHeader';
import { StudentStackParamList } from '@/src/config/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ViewCourseRegScreen = () => {
  const { authData } = useAuth();
  const token = authData?.token;
  // If you pass an ID or params, you can get it here: const { regId } = route.params || {};

  const navigation = useNavigation<NativeStackNavigationProp<StudentStackParamList>>();
  const route = useRoute();
  const { semester, academicYear, level } = route.params as { semester: string; academicYear: any, level: string };

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getUserCoursesInCourseReg(
          { academicYear, semester, level },
          token,
        );
        console.log('Fetched courses:', response.data);
        setCourses(response.data || []);
      } catch (error) {
        console.error('Error fetching course registrations:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [academicYear, semester, level]);

  const renderCourse = ({ item }: { item: any }) => (
    <View className="bg-white rounded-lg p-4 mb-2 shadow">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-4">
          <Ionicons name="school-outline" size={18} color="#6B21A8" />
          <View>
            <Text className="font-semibold">{ item.curriculumCourse.course?.code }</Text>
            <Text className="text-xs text-gray-600">{ item.curriculumCourse.course?.name }</Text>
          </View>
        </View>
        {/* Setup/View Class Settings Button */}
        {/* <TouchableOpacity
          className="bg-primary-100 px-3 py-1 rounded-full flex-row items-center"
          onPress={() => navigation.navigate('ClassSettingScreen', { userCourse: item })}
        >
          <Ionicons name="settings-outline" size={18} color="#fff" />
          <Text className="ml-1 text-white text-xs font-semibold">Class Settings</Text>
        </TouchableOpacity> */}
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-row">
          <Text className="text-sm text-gray-500">Level: </Text>
          <Text className="text-sm text-gray-700 ml-1">{ item.level }</Text>
        </View>
        <View className="flex-row">
          <Text className="text-sm text-gray-500">Units: </Text>
          <Text className="text-sm text-gray-700 ml-1">{ item.curriculumCourse.creditUnits }</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-row">
          <Text className="text-sm text-gray-500">Department: </Text>
          <Text className="text-sm text-gray-700 ml-1">{ item.department?.name }</Text>
        </View>
        <View className="flex-row">
          <Text className="text-sm text-gray-500">Course Type: </Text>
          <Text className="text-sm text-gray-700 ml-1">{ item.curriculumCourse.courseType }</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
        <BackHeader title="Selected Courses" />
        <View className="mb-4 flex-row justify-between items-center px-2">
        <Text className="text-gray-600 text-base mb-2">
          Academic Year: <Text className="text-base font-semibold">{academicYear.code}</Text>
        </Text>
        <Text className="text-gray-600 text-base mb-4">
          Semester: <Text className="text-base font-semibold">{semester}</Text>
        </Text>
        </View>
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0057A0" />
        </View>
      ) : courses.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-20">
          <Ionicons name="folder-open-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
          <Text className="text-gray-500 text-base">No courses registered yet</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={item => item.id?.toString() || item.code}
          renderItem={renderCourse}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
};

export default ViewCourseRegScreen;
