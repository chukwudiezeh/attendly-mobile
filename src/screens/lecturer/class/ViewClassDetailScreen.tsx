import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';
import {updateClass} from '@/src/services/classService';
import { useAuth } from '@/src/context/AuthContext';
import Geolocation from '@react-native-community/geolocation';
import RNFS from 'react-native-fs';
import { getClassAttendance } from '@/src/services/attendanceService';
import Toast from 'react-native-toast-message';

const tabs = [
  { key: 'details', label: 'Details' },
  { key: 'members', label: 'Members' },
  { key: 'attendance', label: 'Attendance' },
];

const ViewClassDetailScreen = () => {
  const route = useRoute();
  const { userCourse, class: classDetail } = route.params as { userCourse: any; class: any };
  const [classInfo, setClassInfo] = useState(classDetail);
  const [startButtonLoading, setStartButtonLoading] = useState(false);
  
  const { authData } = useAuth();
  const token = authData?.token;

  useEffect(() => {
    console.log('ClassDetailScreen mounted with class:', classInfo);
  }, [token]);

  const handleStartClass = async () => {
    setStartButtonLoading(true);
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          const payload = {
            status: 'in_progress',
            actualStartTime: new Date(Date.now()),
            geolocationData: position.coords
          };
          try {
            const updatedClass = await updateClass(token || '', classInfo.id, payload);
            console.log('Class started:', updatedClass);
            setClassInfo(updatedClass.data);
          } catch (err) {
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

  const handleEndClass = async () => {
    setStartButtonLoading(true);
    try {
      const payload = { status: 'completed', actualEndTime: new Date(Date.now()), };
      try {
        const updatedClass = await updateClass(token || '', classInfo.id, payload);
        console.log('Class ended:', updatedClass);
        setClassInfo(updatedClass.data);
      } catch (err) {
        console.error('Error updating class:', err);
      }
      setStartButtonLoading(false);
    } catch (error) {
      console.error('Error ending class:', error);
      setStartButtonLoading(false);
    }
  };
  
  const [activeTab, setActiveTab] = useState('details');

  const handleExportAttendance = async () => {
    try {
      // Fetch all attendance for this class
      const response = await getClassAttendance(token || '', classInfo.id);
      const attendanceList = response.data; // Adjust based on your API response

      // Format attendance data as CSV
      const csvHeader = 'Name,Matric No,Clock-in,Clock-out,Status,Comment\n';
      const csvRows = attendanceList.map((att: any) =>
        `"${att.studentName}","${att.matricNo}","${att.clockInTime}","${att.clockOutTime}","${att.status}","${att.comment || ''}"`
      );
      const csvContent = csvHeader + csvRows.join('\n');

      // Save CSV to device
      const filePath = `${RNFS.DocumentDirectoryPath}/attendance_${classInfo.id}.csv`;
      await RNFS.writeFile(filePath, csvContent, 'utf8');

      // Optionally, show a success message
      Toast.show({
        type: 'success',
        text1: 'Attendance exported!',
        text2: `Saved to ${filePath}`,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Export failed',
        text2: error.message || 'Could not export attendance.',
      });
      console.error('Export error:', error);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
      <BackHeader title="Class Details" />

      {/* Course/Class Details Card */}
      <View className="bg-primary-100 rounded-xl shadow p-4 mb-6 flex-row items-center">
        <Ionicons name="school-outline" size={32} color="#fff" />
        <View className="ml-4 flex-1">
          <Text className="text-base font-bold text-white">{userCourse.curriculumCourse.course.code}</Text>
          <Text className="text-sm text-white mb-1">{userCourse.curriculumCourse.course.name}</Text>
          <Text className="text-xs text-white">
            {classInfo.actualDate || 'N/A'} | {classInfo.classSchedule.startTime} - {classInfo.classSchedule.endTime}
          </Text>
          <Text className="text-xs text-white mt-1">Location: {classInfo.classSchedule.location}</Text>
        </View>
      </View>

      {/* Start/End Class Button */}
      {classInfo.status !== 'completed' && (
        <View className="mb-4 items-end">
          <TouchableOpacity
            className="bg-primary-600 px-4 py-2 rounded-lg flex-row items-center justify-center"
            onPress={classInfo.status === 'scheduled' ? handleStartClass : handleEndClass}
            disabled={startButtonLoading}
          >
            {startButtonLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name={classInfo.status === 'scheduled' ? 'play' : 'stop'} size={18} color="#fff" />
                <Text className="text-white font-semibold ml-2">
                  {classInfo.status === 'scheduled' ? 'Start Class' : 'End Class'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

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
            <Text className="mb-1">Course: {userCourse.curriculumCourse.course.name}</Text>
            <Text className="mb-1">Code: {userCourse.curriculumCourse.course.code}</Text>
            <Text className="mb-1">Date: {classInfo.actualDate || 'N/A'}</Text>
            <Text className="mb-1">Time: {classInfo.classSchedule.startTime} - {classInfo.classSchedule.endTime}</Text>
            <Text className="mb-1">Location: {classInfo.classSchedule.location}</Text>

            <Text className="mb-1">Status: {classInfo.status}</Text>
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
            <TouchableOpacity
              className="bg-primary-600 px-4 py-2 rounded-lg flex-row items-center justify-center mb-4"
              onPress={handleExportAttendance}
            >
              <Ionicons name="download-outline" size={18} color="#fff" />
              <Text className="text-white font-semibold ml-2">Export Attendance</Text>
            </TouchableOpacity>
            {/* ...other attendance content... */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ViewClassDetailScreen;