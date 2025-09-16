// AcademicInfoModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AcademicInfoModalProps } from '@/src/config/types';

const AcademicInfoModal: React.FC<AcademicInfoModalProps> = ({
  visible,
  academicYears,
  semesters,
  selectedAcademicYear,
  selectedSemester,
  isLoading,
  onSelectAcademicYear,
  onSelectSemester,
  onSave,
  userRole,
  levels,
  selectedLevel,
  onSelectLevel
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={() => {}}
  >
    <View className="flex-1 bg-black/40 items-center justify-center">
      <View className="bg-white rounded-xl p-6 w-11/12">
        <Text className="text-lg font-bold mb-2 text-center">Academic Info Required</Text>
        <Text className="text-gray-700 mb-4 text-center">
          Please select your current Academic Year and Semester to continue.
        </Text>
        {userRole === 'student' ? (
          <>
          <View style={{ marginBottom: 16 }}>
            <Dropdown
              data={academicYears}
              labelField="label"
              valueField="value"
              value={selectedAcademicYear}
              onChange={item => onSelectAcademicYear(item.value)}
              placeholder="Academic Year"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
            />
          </View>
          <View className="flex-row mb-4 justify-between">
          <View style={{ flex: 1, marginRight: 8 }}>
            <Dropdown
              data={levels || []}
              labelField="label"
              valueField="value"
              value={selectedLevel}
              onChange={item => onSelectLevel(item.value)}
              placeholder="Level"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown
              data={semesters}
              labelField="label"
              valueField="value"
              value={selectedSemester}
              onChange={item => onSelectSemester(item.value)}
              placeholder="Semester"
              style={{ marginLeft: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
            />
          </View>
        </View>
        </>
        ) : (
          <View className="flex-row mb-4 justify-between">
          <View style={{ flex: 1, marginRight: 8 }}>
            <Dropdown
              data={academicYears}
              labelField="label"
              valueField="value"
              value={selectedAcademicYear}
              onChange={item => onSelectAcademicYear(item.value)}
              placeholder="Academic Year"
              style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Dropdown
              data={semesters}
              labelField="label"
              valueField="value"
              value={selectedSemester}
              onChange={item => onSelectSemester(item.value)}
              placeholder="Semester"
              style={{ marginLeft: 8, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 8, height: 44, backgroundColor: '#fff' }}
            />
          </View>
        </View>
        )}
        
        <TouchableOpacity
          className="bg-primary-600 px-4 py-2 rounded-lg flex-row items-center justify-center"
          onPress={onSave}
          disabled={!selectedAcademicYear || !selectedSemester || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Save & Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default AcademicInfoModal;