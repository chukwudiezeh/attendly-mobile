import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LecturerStackParamList } from '@/src/config/types';
import { getClassesByCourse } from '@/src/services/classService';
import { useAuth } from '@/src/context/AuthContext';


const ViewClassesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LecturerStackParamList>>();
  const route = useRoute();

  const { userCourse } = route.params as { userCourse: any };

  const { authData } = useAuth();
  const token = authData?.token;

  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes for the selected course
    const fetchClasses = async () => {
      setLoading(true);
      try {
        // Replace with your API call
        const classesResponse = await getClassesByCourse(token, userCourse.curriculumCourse.id);
        console.log('Classes response:', classesResponse);
  
        setClasses(classesResponse.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);
  const renderClass = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center justify-between"
      onPress={() => navigation.navigate('ViewClassDetailScreen', { userCourse, class: item })}
    >
      <View>
        <Text className="font-semibold">{item.name} - {item.actualDate || 'N/A'}</Text>
        <Text className="text-xs text-gray-500">
          {item.classSchedule.startTime} - {item.classSchedule.endTime} | {item.classSchedule.location}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Ionicons
          name={item.status === 'in_progress' ? 'play-circle-outline' : 'checkmark-circle-outline'}
          size={22}
          color={item.status === 'in_progress' ? '#22c55e' : '#0057A0'}
        />
        <Text className={`ml-2 text-xs font-semibold ${item.status === 'in_progress' ? 'text-green-600' : 'text-primary-700'}`}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
      <BackHeader title="Classes" />
      <Text className="text-lg font-bold mb-4">Classes for this Course - {userCourse.curriculumCourse.course.code}</Text>
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