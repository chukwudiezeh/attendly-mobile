import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';
import {handleClockIn, handleClockOut} from '@/src/services/attendanceService';
import { useAuth } from '@/src/context/AuthContext';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';

const ViewClassScreen = () => {
  const route = useRoute();
  const { userCourse, class: classDetail } = route.params as { userCourse: any; class: any };
  const [classInfo, setClassInfo] = useState(classDetail);
  const [attendanceInfo, setAttendanceInfo] = useState(null);
  const [startButtonLoading, setStartButtonLoading] = useState(false);
  
  const { authData } = useAuth();
  const token = authData?.token;

  useEffect(() => {
    // TODO: Fetch class details using the token
  }, [token]);

  const handleClassClockIn = async () => {
    setStartButtonLoading(true);
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          const payload = {
            class: classInfo.id,
            geolocationData: position.coords
          };
          try {
            const updatedClass = await handleClockIn(classInfo.id, position.coords, token || '');
            console.log('Class started:', updatedClass);
            setClassInfo(updatedClass.data.class);
            setAttendanceInfo(updatedClass.data);
          } catch (err: any) {
            Toast.show({
              type: 'error',
              text1: err.response?.data?.message || 'An error occurred while starting the class. Please try again later.',
            });
            console.error('Error updating class:', err);
          }
          setStartButtonLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);

          setStartButtonLoading(false);
          // Optionally, send status without location if needed
          // const payload = { status: 'in_progress' };
          // updateClass(token || '', classDetail.id, payload);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error('Error starting class:', error);
      setStartButtonLoading(false);
    }
  };

  const handleClassClockOut = async () => {
    setStartButtonLoading(true);
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Pass geolocation data to your clock out service
            const updatedClass = await handleClockOut(classInfo.id, position.coords, token || '');
            console.log('Class ended:', updatedClass);
            setClassInfo(updatedClass.data.class);
            setAttendanceInfo(updatedClass.data);
          } catch (err: any) {
            Toast.show({
              type: 'error',
              text1: err?.response?.data?.message || 'An error occurred while ending the class. Please try again later.',
            });
            console.error('Error updating class:', err);
          }
          setStartButtonLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setStartButtonLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.error('Error ending class:', error);
      setStartButtonLoading(false);
    }
  };
  

  return (
    <ScrollView className="flex-1 bg-gray-100 pt-10 pb-16" contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 }}>
      <BackHeader title="Class Details" />

      {/* Course/Class Details Card */}
      <View className="bg-primary-100 rounded-xl shadow p-4 mb-8 flex-row items-center">
        <Ionicons name="school-outline" size={36} color="#fff" />
        <View className="ml-6 flex-1">
          <Text className="text-lg font-bold text-white mb-1">{userCourse.curriculumCourse.course.code}</Text>
          <Text className="text-base text-white mb-2">{userCourse.curriculumCourse.course.name}</Text>
          <Text className="text-xs text-white mb-1">
            {classInfo.actualDate || 'N/A'} | {classInfo.classSchedule.startTime} - {classInfo.classSchedule.endTime}
          </Text>
          <Text className="text-xs text-white">Location: {classInfo.classSchedule.location}</Text>
        </View>
      </View>

      {/* Attendance Report Card */}
      <View className="bg-white rounded-xl shadow p-5 mb-8">
        <Text className="text-lg font-bold mb-4 text-primary-600">Attendance Report</Text>
        {/* Class Details */}
        <View className="mb-3">
          <Text className="text-base font-semibold text-gray-800 mb-1">
            {userCourse.curriculumCourse.course.code} - {userCourse.curriculumCourse.course.name}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            Date: {classInfo.actualDate || 'N/A'}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            Location: {classInfo.classSchedule.location}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            Actual Start: {classInfo.actualStartTime || 'N/A'}
          </Text>
          <Text className="text-sm text-gray-600">
            Actual End: {classInfo.actualEndTime || 'N/A'}
          </Text>
        </View>
        {/* Attendance Times */}
        <View className="mb-3 flex-row justify-between">
          <View style={{ flex: 1, marginRight: 12 }}>
            <Text className="text-xs text-gray-500 mb-1">Clock-in</Text>
            <Text className="text-base text-gray-800">{classInfo.clockInTime || 'N/A'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text className="text-xs text-gray-500 mb-1">Clock-out</Text>
            <Text className="text-base text-gray-800">{classInfo.clockOutTime || 'N/A'}</Text>
          </View>
        </View>
        {/* Status and Comment */}
        <View className="mt-3">
          <Text className="text-xs text-gray-500 mb-1">Class Status</Text>
          <Text className="text-base font-semibold text-primary-600 mb-2">{classInfo.status || 'N/A'}</Text>
          <Text className="text-xs text-gray-500 mb-1">Attendance Status</Text>
          <Text className="text-base font-semibold text-primary-600 mb-2">{classInfo.attendanceStatus || 'N/A'}</Text>
          <Text className="text-xs text-gray-500 mb-1">Comment</Text>
          <Text className="text-base text-gray-800">{classInfo.comment || 'No comment'}</Text>
        </View>
      </View>

      {/* Start/End Class Button */}
      {classInfo.status !== 'canceled' && (
        <View className="mb-8 items-end">
          <TouchableOpacity
            className="bg-primary-600 px-6 py-3 rounded-lg flex-row items-center justify-center"
            onPress={classInfo.status === 'in_progress' ? handleClassClockIn : handleClassClockOut}
            disabled={startButtonLoading}
          >
            {startButtonLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name={classInfo.status === 'in_progress' ? 'play' : 'stop'} size={20} color="#fff" />
                <Text className="text-white font-semibold ml-3">
                  {classInfo.status === 'in_progress' ? 'Clock In' : 'Clock Out'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
};

export default ViewClassScreen;