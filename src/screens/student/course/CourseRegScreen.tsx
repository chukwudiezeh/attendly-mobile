import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { BackHeader } from '@/src/components/common/BackHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { CheckBox } from 'react-native-elements'; // or any checkbox package you use

const sessions = ['2022/2023', '2023/2024'];
const levels = ['100', '200', '300', '400'];
const semesters = ['1st Semester', '2nd Semester'];

const fetchCourses = (session: string, level: string, semester: string) => {
  if (session && level && semester) {
    return [
      { code: 'GST 101', title: 'Use of English', unit: 2 },
      { code: 'PHY 101', title: 'Physics I', unit: 3 },
    ];
  }
  return [];
};

const CourseRegScreen = () => {
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  React.useEffect(() => {
    if (selectedSession && selectedLevel && selectedSemester) {
      setCourses(fetchCourses(selectedSession, selectedLevel, selectedSemester));
    } else {
      setCourses([]);
    }
  }, [selectedSession, selectedLevel, selectedSemester]);

  const handleSelectCourse = (code: string) => {
    setSelectedCourses(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  // Convert to dropdown data format
  const sessionItems = sessions.map(s => ({ label: s, value: s }));
  const levelItems = levels.map(l => ({ label: l, value: l }));
  const semesterItems = semesters.map(s => ({ label: s, value: s }));

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-16 pb-16" contentContainerStyle={{ paddingBottom: 64 }}>
      <BackHeader />

      {/* Dropdowns */}
      <View className="mb-4 z-10 bg-white p-4 rounded-lg shadow">
        <Text className="text-base font-semibold mb-3">Course Selection Paramters</Text>
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
        {courses.length === 0 ? (
            <View className="flex-1 items-center justify-center mt-20">
                <Ionicons name="folder-open-outline" size={64} color="#d1d5db" style={{ marginBottom: 12 }} />
                <Text className="text-gray-500 text-base">Course Selection Parameters not set</Text>
            </View>
        ) : (
          <FlatList
            data={courses}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <View className="bg-white rounded-lg p-3 mb-2 flex-row items-center justify-between">
                {/* Checkbox column */}
                <View style={{ width: 40, alignItems: 'center' }}>
                  {/* <CheckBox
                    checked={selectedCourses.includes(item.code)}
                    onPress={() => handleSelectCourse(item.code)}
                    containerStyle={{ padding: 0, margin: 0 }}
                  /> */}
                </View>
                {/* Course name column */}
                <View style={{ flex: 1, paddingLeft: 8 }}>
                  <Text className="font-semibold">{item.title}</Text>
                </View>
                {/* Unit column */}
                <View style={{ width: 40, alignItems: 'flex-end' }}>
                  <Text className="text-gray-700">{item.unit}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CourseRegScreen;