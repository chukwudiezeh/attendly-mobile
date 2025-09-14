import React, { use, useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BackHeader } from '@/src/components/common/BackHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon } from '@gluestack-ui/themed';
import { getAcademicYears } from '@/src/services/utilityService';
import { useAuth } from '@/src/context/AuthContext';
import { getCurriculumCourses, RegisterUserCourses } from '@/src/services/courseService';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { getDepartments } from '@/src/services/utilityService';

const levels = ['100', '200', '300', '400'];
const semesters = [{label: '1st Semester', value: 'first'}, {label: '2nd Semester', value: 'second'}];
// const departments: { label: string; value: string }[] = [];

const LecturerCourseRegScreen = () => {
  const { authData } = useAuth();
  const token = authData?.token;
  const user = authData?.user;

  const navigation = useNavigation();
  
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  
  useEffect(() => {
    fetchAcademicYears();
    fetchDepartments();

    if (selectedSession && selectedLevel && selectedSemester) {
      fetchCurriculumCourses(selectedDepartment, selectedSession, selectedLevel, selectedSemester, token);
    } else {
      setCourses([]);
    }
  }, [selectedDepartment, selectedSession, selectedLevel, selectedSemester]);

  const fetchAcademicYears = async () => {
    try {
      const academicYears = await getAcademicYears();
      console.log('Academic Years:', academicYears);
      setAcademicYears(academicYears.data);
    } catch (error) {
      console.error('Error fetching academic years:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      console.log('Fetched Departments:', response);
      // Assuming the response is an array of departments
      const formattedDepartments = response.data.map((dept: any) => ({
        label: dept.name, // Adjust based on your API response structure
        value: dept.id, // Adjust based on your API response structure
      }));
      setDepartments(formattedDepartments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchCurriculumCourses = async (department: string | undefined, session: string, level: string, semester: string, token: string | undefined) => {
    try {
      const courses = await getCurriculumCourses(department, session, level, semester, token);
      setCourses(courses.data);
    } catch (error) {
      console.error('Error fetching curriculum courses:', error);
    }
  };

  const handleSelectCourse = (courseObj: any) => {
    setSelectedCourses(prev => {
      const exists = prev.some(c => c.id === courseObj.id);
      if (exists) {
        return prev.filter(c => c.id !== courseObj.id);
      } else {
        return [...prev, courseObj];
      }
    });
  };

  const handleRemoveCourse = (id: string) => {
    setSelectedCourses(prev => prev.filter(c => c.id !== id));
  };

  const reInitializeSelections = () => {
    setSelectedCourses([]);
    setSelectedSession('');
    setSelectedLevel('');
    setSelectedSemester('');
    setSelectedDepartment('');
    setCourses([]);
  };

  const saveSelectedCourses = async () => {
    // Implement save logic here, e.g., send to backend
    console.log('Saving selected courses:', selectedCourses);
    try {
      const selectedCourseIds = selectedCourses.map(c => c.id);
      const formattedPayload = {
        academicYear: selectedSession,
        level: selectedLevel,
        semester: selectedSemester,
        department: selectedDepartment,
        curriculumCourseRole: user?.role,
        curriculumCourses: selectedCourseIds
      };
  
      const saveUserCourses = await RegisterUserCourses(formattedPayload, token);
      if (saveUserCourses.success) {
        Toast.show({
          type: 'success',
          text1: saveUserCourses.message || 'Courses registered successfully',
        });

        reInitializeSelections();
        navigation.goBack();
      }

    } catch (error: any) {
      console.error('Error saving user courses:', error);
      Toast.show({
        type: 'error',
        text1: error.message || 'Could not register courses. Try again'
      });
    }
    // After saving, close the modal
    setPreviewVisible(false);
  };
  // Convert to dropdown data format
  const sessionItems = academicYears.map(s => ({ label: s.code, value: s.id }));
  const levelItems = levels.map(l => ({ label: l, value: l }));
  const semesterItems = semesters.map(s => ({ label: s.label, value: s.value }));

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
      <View className="mb-4">
        <BackHeader  title='Select your courses'/>

        {/* Dropdowns */}
        <View className="mb-4 z-10 bg-white p-4 rounded-lg shadow">
          <Text className="text-base font-semibold mb-3">Course Selection Parameters</Text>
          <View className="mb-2">
            <Dropdown
              data={sessionItems}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select an academic session"
              value={selectedSession}
              onChange={item => setSelectedSession(item.value)}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
              placeholderStyle={{ color: '#9CA3AF' }}
              style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', paddingHorizontal: 12, height: 50 }}
            />
          </View>
          <View className="mb-2">
            <Dropdown
              data={departments}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Department"
              searchPlaceholder="Search..."
              value={selectedDepartment}
              onChange={item => setSelectedDepartment(item.value)}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
              placeholderStyle={{ color: '#9CA3AF' }}
              style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', paddingHorizontal: 12, height: 50 }}
            />
          </View>
          <View className="mb-2">
            <Dropdown
              data={levelItems}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select level"
              value={selectedLevel}
              onChange={item => setSelectedLevel(item.value)}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
              placeholderStyle={{ color: '#9CA3AF' }}
              style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', paddingHorizontal: 12, height: 50 }}
            />
          </View>
          <View className="mb-2">
            <Dropdown
              data={semesterItems}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select semester"
              value={selectedSemester}
              onChange={item => setSelectedSemester(item.value)}
              itemTextStyle={{ fontSize: 14 }}
              selectedTextStyle={{ fontSize: 14 }}
              placeholderStyle={{ color: '#9CA3AF' }}
              style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', paddingHorizontal: 12, height: 50 }}
            />
          </View>
        </View>

        {/* Courses List */}
        <View className="mt-4 bg-white rounded-lg shadow p-4">
          <Text className="font-bold text-base mb-3">Courses</Text>
          {/* Headings */}
          <View className="flex-row items-center justify-between mb-2 px-1">
            <Text className="text-xs font-semibold" style={{ width: 40, textAlign: 'center' }}>Select</Text>
            <Text className="text-xs font-semibold flex-1 pl-2">Course Name</Text>
            <Text className="text-xs font-semibold" style={{ width: 40, textAlign: 'right' }}>Unit</Text>
          </View>
          {courses.length === 0 ? (
            <View className="items-center justify-center pt-20 pb-20">
              <Ionicons name="folder-open-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
              <Text className="text-gray-500 text-base">Course Selection Parameters not set</Text>
            </View>
          ) : (
            <FlatList
              data={courses}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View className="bg-white rounded-lg p-3 mb-2 flex-row items-center justify-between">
                  {/* Checkbox column */}
                  <View style={{ width: 40, alignItems: 'center' }}>
                    <Checkbox size='md' value={item.id} isChecked={selectedCourses.some(c => c.id === item.id)} onChange={() => handleSelectCourse(item)} className="border-gray-300">
                      <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} />
                      </CheckboxIndicator>
                    </Checkbox>
                  </View>
                  {/* Course name column */}
                  <View style={{ flex: 1, paddingLeft: 8 }}>
                    <Text className="font-semibold">{item.course.name}</Text>
                  </View>
                  {/* Unit column */}
                  <View style={{ width: 40, alignItems: 'flex-end' }}>
                    <Text className="text-gray-700">{item.creditUnits}</Text>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
      {/* Preview Button */}
      { selectedCourses.length > 0 && (
        <View className="left-0 right-0">
          <TouchableOpacity
            className="bg-primary-600 py-3 rounded-lg flex-row items-center justify-center"
            onPress={() => setPreviewVisible(true)}
            disabled={selectedCourses.length === 0}
          >
            <Text className="text-white text-base font-semibold">Preview</Text>
          </TouchableOpacity>
        </View>
    )}

      {/* Preview Modal */}

      <Modal
        visible={previewVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPreviewVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/30">
          <View className="bg-white rounded-t-2xl p-6 min-h-[300px]">
            <Text className="font-bold text-lg mb-4 text-center">Selected Courses</Text>
            {/* Headings */}
            <View className="flex-row items-center justify-between mb-2 px-1">
              <Text className="text-xs font-semibold" style={{ width: 40, textAlign: 'center' }}>Code</Text>
              <Text className="text-xs font-semibold flex-1 pl-2">Course Name</Text>
              <Text className="text-xs font-semibold" style={{ width: 40, textAlign: 'right' }}>Unit</Text>
              <Text className="text-xs font-semibold" style={{ width: 40, textAlign: 'center' }}>Action</Text>
            </View>
            <FlatList
              data={selectedCourses}
              keyExtractor={item => item.id}
              ListEmptyComponent={
                <Text className="text-gray-500 text-center mt-8">No courses selected.</Text>
              }
              renderItem={({ item }) => (
                <View className="bg-white rounded-lg p-3 mb-2 flex-row items-center justify-between">
                  {/*course code column */}
                  <View style={{ width: 40, alignItems: 'center' }}>
                    <Text className="text-gray-700">{item.course.code}</Text>
                  </View>
                  {/* Course name column */}
                  <View style={{ flex: 1, paddingLeft: 8 }}>
                    <Text className="font-semibold">{item.course.name}</Text>
                  </View>
                  {/* Unit column */}
                  <View style={{ width: 40, alignItems: 'flex-end' }}>
                    <Text className="text-gray-700">{item.creditUnits}</Text>
                  </View>
                  {/* Action column */}
                  <View style={{ width: 40, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => handleRemoveCourse(item.id)}>
                      <Ionicons name="trash-outline" size={22} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            {/* Save/Submit Button */}
            <TouchableOpacity
              className="bg-primary-600 py-3 rounded-lg flex-row items-center justify-center mt-6"
              onPress={() => {
                // Handle save/submit logic here
                saveSelectedCourses();
              }}
            >
              <Text className="text-white text-base font-semibold">Save / Submit</Text>
            </TouchableOpacity>
            {/* Close Modal Button */}
            <TouchableOpacity
              className="mt-2 flex-row items-center justify-center"
              onPress={() => setPreviewVisible(false)}
            >
              <Text className="text-primary-600 text-sm">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </View>
  );
};

export default LecturerCourseRegScreen;