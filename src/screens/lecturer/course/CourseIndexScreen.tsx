import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getUserCourseRegs } from '@/src/services/courseService';
import { useAuth } from '@/src/context/AuthContext';
import { LecturerStackParamList } from '@/src/config/types';

const LecturerCourseIndexScreen = () => {
  const { authData } = useAuth();
  const token = authData?.token;

  const [userCourseRegs, setUserCourseRegs] = useState<any[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserCourseRegs = async () => {
      try {
        const response = await getUserCourseRegs(token);
        setUserCourseRegs(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    if (isFocused) {
      fetchUserCourseRegs();
    }
  }, [isFocused]);

  const navigation = useNavigation<NativeStackNavigationProp<LecturerStackParamList>>();

  const renderRegistration = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('LecturerViewCourseRegScreen', {
          semester: item.semester,
          academicYear: item.academicYear,
        })
      }
      className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center justify-between"
    >
      <View>
        <Text className="font-bold text-base mb-1">
          {item.academicYear.code}
        </Text>
        <Text className="text-sm text-gray-700 mb-1">
          {item.semester == 'first' ? '1st' : '2nd'} Semester
        </Text>
      </View>
      <View className="flex-row space-x-4">
        <TouchableOpacity
          onPress={() => console.log('View', item)}
          style={{ marginLeft: 20 }}
        >
          <Ionicons
            name="ellipsis-vertical-outline"
            size={22}
            color="#6366f1"
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => console.log('Edit', item)} style={{ marginLeft: 20 }}>
          <Ionicons name="create-outline" size={22} color="#f59e42" />
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => console.log('Delete', item)} style={{ marginLeft: 20 }}>
          <Ionicons name="trash-outline" size={22} color="#ef4444" />
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16">
      {/* Header with Add Button */}
      <ScreenHeader />
      <View className="flex-row justify-end mt-4 mb-4">
        <TouchableOpacity
          className="bg-primary-600 p-2 rounded-lg flex-row items-center"
          onPress={() =>
            navigation.navigate('LecturerCourseRegScreen' as never)
          }
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text className="text-white ml-1 text-sm">New Course Reg.</Text>
        </TouchableOpacity>
      </View>

      {/* Course Registration List */}
      {userCourseRegs.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-20">
          <Ionicons
            name="folder-open-outline"
            size={64}
            color="#d1d5db"
            style={{ marginBottom: 12 }}
          />
          <Text className="text-gray-500 text-base">
            No Course Selection done yet for the current session
          </Text>
        </View>
      ) : (
        <FlatList
          data={userCourseRegs}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={renderRegistration}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      )}
    </View>
  );
};

export default LecturerCourseIndexScreen;