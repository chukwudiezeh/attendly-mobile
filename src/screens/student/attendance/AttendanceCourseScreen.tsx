import React, { useState, useEffect, use } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';
import { Dropdown } from 'react-native-element-dropdown';
import { StudentStackParamList } from '@/src/config/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '@/src/context/AuthContext';
import { getAcademicYears } from '@/src/services/utilityService';
import { getUserCoursesInCourseReg } from '@/src/services/courseService';

// Dummy dropdown data
const academicSessions = [
  { label: '2024/2025', value: '2024/2025' },
  { label: '2023/2024', value: '2023/2024' },
];
const semesters = [
  { label: '1st Semester', value: 'first' },
  { label: '2nd Semester', value: 'second' },
];

const levels = [
  { label: '100', value: '100' },
  { label: '200', value: '200' },
  { label: '300', value: '300' },
  { label: '400', value: '400' },
];

const AttendanceCourseScreen = () => {
  const {authData} = useAuth();
  const user = authData?.user;
  const token = authData?.token;

  const [courses, setCourses] = useState<any[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StudentStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [academicYears, setAcademicYears] = useState<any[]>([]);
  const [userCourses, setUserCourses] = useState<any[]>([]);

  // Academic session and semester state
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [level, setLevel] = useState('');


  useEffect(() => {
    //load academicYear
    fetchAcademicYears();
    handleSemester();
    handleLevel();

    //fetch list data
    fetchCourses();

  }, [])

  const fetchCourses = async () => {
        try {
          const response = await getUserCoursesInCourseReg(
            { academicYear, semester, level },
            token,
          );
          console.log('Fetched courses:', response.data);
          setUserCourses(response.data || []);
        } catch (error) {
          console.error('Error fetching course registrations:', error);
          setCourses([]);
        } finally {
          setLoading(false);
        }
      };

  const handleSemester = () => {
    // console info handled by 
    setSemester(user?.semester || 'first');
  }

  const handleLevel = () => {
    setLevel(user?.level || '100');
  }

  const fetchAcademicYears = async () => {
      try {
        const academicYears = await getAcademicYears();
        console.log('Academic Years:', academicYears);
        const formattedYears = academicYears.data.map((item: any) => ({
          label: item.code, // or item.label if your API uses 'label'
          value: item.id,   // or item.value if your API uses 'value'
        }));
        setAcademicYear(user?.academicYear?.id || '');
        setAcademicYears(formattedYears);
      } catch (error) {
        console.error('Error fetching academic years:', error);
      }
    };

  const handleLoadData = () => {
    setLoading(true);
    fetchCourses();
    setLoading(false);
    
  };

  const renderSession = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow p-4 mb-4 flex-row items-center justify-between"
      onPress={() => navigation.navigate('AttendanceBaseScreen',)}
    >
      <View>
        <Text className="font-semibold">{item.curriculumCourse.course.code} - {item.curriculumCourse.course.name}</Text>
        <Text className="text-sm text-gray-500">{item.level} Level | {item.department.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-16 pb-16">
      <BackHeader title="Attendance Sessions" />
      <Text className="text-lg font-bold mb-4">Attendance Sessions</Text>

      {/* Dropdowns and Search Button */}
      <View className="flex-row mb-4 items-center justify-between">
        <View style={{ flex: 1, marginRight: 8 }}>
          <Dropdown
            data={academicYears}
            labelField="label"
            valueField="value"
            value={academicYear}
            onChange={item => setAcademicYear(item.value)}
            placeholder="Academic Year"
            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Dropdown
            data={semesters}
            labelField="label"
            valueField="value"
            value={semester}
            onChange={item => setSemester(item.value)}
            placeholder="Semester"
            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
          />
        </View>
      </View>
      <View className="flex-row mb-4 items-center justify-between">
        <View style={{ flex: 1, marginRight: 8 }}>
          <Dropdown
            data={levels}
            labelField="label"
            valueField="value"
            value={level}
            onChange={item => setLevel(item.value)}
            placeholder="Level"
            style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
          />
        </View> 
        <TouchableOpacity
          className="bg-primary-600 p-3 rounded-lg flex-row items-center justify-center"
          onPress={handleLoadData}
          disabled={loading}
          style={{ flex: 1, marginLeft: 8 }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Ionicons name="search" size={22} color="#fff" />
              <Text className="text-white text-base font-semibold ml-2">Load data</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0057A0" />
        </View>
      ) : (
        <FlatList
          data={userCourses}
          keyExtractor={item => item.id}
          renderItem={renderSession}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Ionicons name="folder-open-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
              <Text className="text-gray-500 text-base">No attendance sessions found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

export default AttendanceCourseScreen;