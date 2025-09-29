import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@/src/context/AuthContext';
import { BackHeader } from '@/src/components/common/BackHeader';
import { updateUserInfo } from '@/src/services/userService'; // Import your update endpoint
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown'; // Add this import
import { getDepartments } from '@/src/services/utilityService';

const departments: { label: string; value: string }[] = [];
const semesters: { label: string; value: string }[] = [{ label: '1st Semester', value: 'first' }, { label: '2nd Semester', value: 'second' }];

const ProfileScreen = () => {
  const { authData, setAuthData } = useAuth();
  const user = authData?.user;
  const token = authData?.token;

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [department, setDepartment] = useState(user?.department?.id || '');
  const [semester, setSemester] = useState(user?.semester || '');
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      console.log('Fetched Departments:', response);
      // Assuming the response is an array of departments
      const formattedDepartments = response.data.map((dept: any) => ({
        label: dept.name, // Adjust based on your API response structure
        value: dept.id, // Adjust based on your API response structure
      }));
      departments.push(...formattedDepartments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  const handleUpdateUserInfo = async () => {
      try {
        setLoading(true);
        // Call API to update user info with selectedAcademicYear and selectedSemester
        const updateUserInfoResponse = await updateUserInfo(authData?.token, authData?.user?.id, { 
        firstName,
        lastName,
        email,
        department,
        semester
      });

      await setAuthData({
        token: authData?.token || '',
        user: updateUserInfoResponse.data
      });

      Toast.show({ type: 'success', text1: 'Profile updated!' });
      setModalVisible(false);

      } catch (error) {
        console.error('Error updating user info:', error);
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {
    fetchDepartments();
  }, [token]);

  const handleEditProfile = () => {
    setModalVisible(true);
    setFirstName(user?.firstName || '');
    setLastName(user?.lastName || '');
    setEmail(user?.email || '');
    setDepartment(user?.department?.id || '');
    setSemester(user?.semester || '');
    // setAcademicYear(user?.academicYear?.code || '');
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-16 pb-16" contentContainerStyle={{ paddingBottom: 64 }}>
      <BackHeader title="Profile" />

      <View className="items-center mb-8">
        <Image
          source={user?.profilePicture ? { uri: user.profilePicture } : { uri: 'https://i.pravatar.cc/150?img=12' }}
          style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 12 }}
        />
        <Text className="text-xl font-bold text-gray-900 mb-1">{user?.firstName + ' ' + user?.lastName || 'Student Name'}</Text>
        <Text className="text-base text-gray-500">{user?.email || 'student@email.com'}</Text>
      </View>

      <View className="bg-white rounded-xl shadow p-5 mb-8">
        <Text className="text-lg font-bold text-primary-600 mb-4">Profile Details</Text>
        {user?.role === 'student' && (
          <View className="mb-3 flex-row items-center">
            <Ionicons name="school-outline" size={20} color="#0057A0" />
            <Text className="ml-3 text-base text-gray-800">Matric No: {user?.matricNumber || 'N/A'}</Text>
          </View>
        )}
        <View className="mb-3 flex-row items-center">
          <Ionicons name="book-outline" size={20} color="#0057A0" />
          <Text className="ml-3 text-base text-gray-800">Department: {user?.department?.name || 'N/A'}</Text>
        </View>
        <View className="mb-3 flex-row items-center">
          <Ionicons name="layers-outline" size={20} color="#0057A0" />
          <Text className="ml-3 text-base text-gray-800">Level: {user?.level || 'N/A'}</Text>
        </View>
        <View className="mb-3 flex-row items-center">
          <Ionicons name="calendar-outline" size={20} color="#0057A0" />
          <Text className="ml-3 text-base text-gray-800">Semester: {user?.semester || 'N/A'}</Text>
        </View>
        <View className="mb-3 flex-row items-center">
          <Ionicons name="time-outline" size={20} color="#0057A0" />
          <Text className="ml-3 text-base text-gray-800">Academic Year: {user?.academicYear?.code || 'N/A'}</Text>
        </View>
      </View>

      <TouchableOpacity className="bg-primary-600 rounded-xl shadow p-4 mb-8" onPress={handleEditProfile}>
        <Text className="text-center text-white text-lg font-semibold">Edit Profile</Text>
      </TouchableOpacity>

      {/* Edit Profile Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 bg-black/40 items-center justify-center">
          <View className="bg-white rounded-xl p-6 w-11/12">
            <Text className="text-lg font-bold mb-4 text-center text-primary-600">Edit Profile</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              className="border border-gray-300 rounded-lg px-3 py-2 text-base mb-4"
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              className="border border-gray-300 rounded-lg px-3 py-2 text-base mb-4"
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg px-3 py-2 text-base mb-4"
            />
            <Dropdown
              data={departments}
              search
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={department}
              onChange={item => setDepartment(item.value)}
              placeholder="Department"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff', marginBottom: 16 }}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
              placeholderStyle={{ color: '#9CA3AF' }}
            />
            <Dropdown
              data={semesters}
              labelField="label"
              valueField="value"
              value={semester}
              onChange={item => setSemester(item.value)}
              placeholder="Semester"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff', marginBottom: 16 }}
            />
            {/* <TextInput
              value={academicYear}
              onChangeText={setAcademicYear}
              placeholder="Academic Year"
              className="border border-gray-300 rounded-lg px-3 py-2 text-base mb-4"
            /> */}
            <TouchableOpacity
              className="bg-primary-600 py-3 rounded-lg items-center mt-2"
              onPress={handleUpdateUserInfo}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white font-semibold text-base">Save</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity className="mt-4 items-center" onPress={() => setModalVisible(false)}>
              <Text className="text-primary-600 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View className="bg-white rounded-xl shadow p-5">
        <Text className="text-lg font-bold text-primary-600 mb-4">Account Settings</Text>
        {/* <TouchableOpacity className="mb-3 flex-row items-center">
          <Ionicons name="lock-closed-outline" size={20} color="#0057A0" />
          <Text className="ml-3 text-base text-gray-800">Change Password</Text>
        </TouchableOpacity> */}
        <TouchableOpacity className="mb-3 flex-row items-center">
          <Ionicons name="log-out-outline" size={20} color="#0057A0" />
          <Text className="ml-3 text-base text-gray-800">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;