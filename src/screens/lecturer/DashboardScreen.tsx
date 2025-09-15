import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { WelcomeCard } from '@/src/components/dashboard/WelcomeCard';
import { ScreenHeader } from '@/src/components/common/ScreenHeader';
import { useAuth } from '@/src/context/AuthContext';
import { Dropdown } from 'react-native-element-dropdown';
import { getAcademicYears } from '@/src/services/utilityService';
import { updateUserInfo } from '@/src/services/userService';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AcademicInfoModal from '@/src/components/dashboard/AcademicInfoModal';

const LecturerDashboardScreen = () => {
  const { authData, setAuthData } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [academicYears, setAcademicYears] = useState<any[]>([]);


  const semesters = [
    { label: '1st Semester', value: 'first' },
    { label: '2nd Semester', value: 'second' },
  ];

  useEffect(() => {
    fetchAcademicYears();
    
    if (!authData?.user?.academicYear || !authData?.user?.semester) {
      setShowModal(true);
    }
  }, [authData]);

  const fetchAcademicYears = async () => {
      try {
        const academicYears = await getAcademicYears();
        console.log('Academic Years:', academicYears);
        // Format academic years to { label, value }
      const academicYearsOptions = academicYears.data
        ? academicYears.data.map((item: any) => ({
            label: item.code,
            value: item.id,   
          }))
        : [];
        setAcademicYears(academicYearsOptions);
      } catch (error) {
        console.error('Error fetching academic years:', error);
      }
    };
  
  const handleUpdateUserInfo = async () => {
    try {
      setIsLoading(true);
      // Call API to update user info with selectedAcademicYear and selectedSemester
      const updateUserInfoResponse = await updateUserInfo(authData?.token, authData?.user?.id, { academicYear: selectedAcademicYear, semester: selectedSemester });
      await setAuthData({
        token: authData?.token || '',
        user: updateUserInfoResponse.data
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user info:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ScrollView className="flex-1 bg-gray-100 px-4 pt-16 pb-16" contentContainerStyle={{ paddingBottom: 64 }}>
        {/* Header */}
        <ScreenHeader />

        {/* Greeting and profile */}
        <Text className="text-l mb-3">Hi there, Welcome!</Text>

        {/* Welcome Card */}
        <WelcomeCard />

        <View className="mb-6 bg-white shadow rounded-xl p-4">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold">Classes Done Today</Text>
            <View className="bg-purple-200 px-2 rounded-full">
              <Text className="text-xs text-purple-800 font-semibold">2</Text>
            </View>
          </View>
          <Text className="text-gray-500 text-xs mb-2">Classes completed today</Text>

          {/* Meeting Card */}
          {['GST 101 - Use of English', 'PHY 101 - Physics I'].map((title, idx) => (
            <View
              key={idx}
              className="bg-white shadow rounded-xl p-4 mb-3 border border-gray-100"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center space-x-2">
                  <Ionicons name="school-outline" size={18} color="#6B21A8" />
                  <Text className="font-semibold">{title}</Text>
                </View>
                <Text className="text-xs text-gray-500">01:30 AM - 02:00 AM</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row">
                  <Text className="text-sm text-gray-500">Class No: </Text>
                  <Text className="text-sm text-gray-500 ml-1">3</Text>
                </View>
                <View className="flex-row">
                  <Text className="text-sm text-gray-500">Status: </Text>
                  <Text className="text-sm bg-green-100 text-green-700 px-3 py-0.5 rounded-full ml-1">
                    Present
                  </Text>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row">
                  <Text className="text-sm text-gray-500">Lecturer: </Text>
                  <Text className="text-sm text-gray-500 ml-1">Dr. Smith</Text>
                </View>
                
              </View>
            </View>
          ))}
          <View className="mt-4 items-center justify-center">
            <TouchableOpacity
              className="bg-primary-600 px-4 py-2 rounded-lg w-1/2 flex-row items-center justify-center"
              onPress={() => console.log('View all classes')}
            >
              <Text className="text-white text-xs">View all</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Task Section */}
       <View className="mb-6 bg-white shadow rounded-xl p-4">
          <View className="flex-row justify-between mb-2">
            <Text className="font-semibold">Upcoming classes</Text>
            <View className="bg-purple-200 px-2 rounded-full">
              <Text className="text-xs text-purple-800 font-semibold">2</Text>
            </View>
          </View>
          <Text className="text-gray-500 text-xs mb-2">Your schedule for the day</Text>

          {/* Meeting Card */}
          {['GST 101 - Use of English', 'PHY 101 - Physics I'].map((title, idx) => (
            <View
              key={idx}
              className="bg-white shadow rounded-xl p-4 mb-3 border border-gray-100"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center space-x-2">
                  <Ionicons name="school-outline" size={18} color="#6B21A8" />
                  <Text className="font-semibold">{title}</Text>
                </View>
                <Text className="text-xs text-gray-500">01:30 AM - 02:00 AM</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row">
                  <Text className="text-sm text-gray-500">Class No: </Text>
                  <Text className="text-sm text-gray-500 ml-1">3</Text>
                </View>
                <TouchableOpacity className="bg-primary-600 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs">View details</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row">
                  <Text className="text-sm text-gray-500">Lecturer: </Text>
                  <Text className="text-sm text-gray-500 ml-1">Dr. Smith</Text>
                </View>
                
              </View>
            </View>
          ))}
          <View className="mt-4 items-center justify-center">
            <TouchableOpacity
              className="bg-primary-600 px-4 py-2 rounded-lg w-1/2 flex-row items-center justify-center"
              onPress={() => console.log('View all classes')}
            >
              <Text className="text-white text-xs">View all</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Academic Info Modal */}
      <AcademicInfoModal
        visible={showModal}
        academicYears={academicYears}
        semesters={semesters}
        selectedAcademicYear={selectedAcademicYear}
        selectedSemester={selectedSemester}
        isLoading={isLoading}
        onSelectAcademicYear={setSelectedAcademicYear}
        onSelectSemester={setSelectedSemester}
        onSave={handleUpdateUserInfo}
      />
    </>
  );
};

export default LecturerDashboardScreen;
