import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView, Platform, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import { BackHeader } from '@/src/components/common/BackHeader';
import { MultiSelect } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createClassSetting, createClassSchedule, getClassSetting, getClassSchedule } from '@/src/services/classService';
import { useAuth } from '@/src/context/AuthContext';

const daysOfWeek = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
];

function formatTime(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minStr} ${ampm}`;
}

const ClassSetting = () => {

    const { authData } = useAuth();
    const token = authData?.token;

    const route = useRoute();
    const { userCourse } = route.params as { userCourse: any };

    const [classSetting, setClassSetting] = useState<any>({});
    const [classSchedule, setClassSchedule] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);

    const [location, setLocation] = useState('');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    // Each day has { start: string, end: string }
    const [dayTimes, setDayTimes] = useState<{ [key: string]: { start: string; end: string } }>({});
    const [showPicker, setShowPicker] = useState<{ [key: string]: { start: boolean; end: boolean } }>({});
    const [pickerDate, setPickerDate] = useState<{ [key: string]: { start: Date; end: Date } }>({});
    const [attendanceWindow, setAttendanceWindow] = useState('15');
    const [isRecurring, setIsRecurring] = useState(true);
    const [notifyStudent, setNotifyStudent] = useState(true);
    const [attendancePassMark, setAttendancePassMark] = useState('75');
    const [allowedRadius, setAllowedRadius] = useState('25');

    const isDisabled = isLoading || hasExistingData;

    useEffect(() => {
        if (
            (!classSetting || Object.keys(classSetting).length === 0) &&
            (!classSchedule || classSchedule.length === 0)
        ) {
            fetchClassSettingAndSchedule();
        }
    }, [classSetting, classSchedule]);

    const fetchClassSettingAndSchedule = async () => {
        try {
            const classSetting = await getClassSetting(token, userCourse.curriculumCourse.id);
            const classSchedule = await getClassSchedule(token, userCourse.curriculumCourse.id);
            setClassSetting(classSetting.data);
            setClassSchedule(classSchedule.data);

            if (
            (classSetting.data && Object.keys(classSetting.data).length > 0) ||
            (classSchedule.data && classSchedule.data.length > 0)
        ) {
            setHasExistingData(true);
        } else {
            setHasExistingData(false);
        }

        } catch (error) {
            console.log('Error creating class setting or schedule:', error);
            setHasExistingData(false);
        }
    }
    const handleDaySelect = (days: string[]) => {
        setSelectedDays(days);
        setDayTimes(prev => {
            const updated = { ...prev };
            days.forEach(day => {
                if (!updated[day]) updated[day] = { start: '', end: '' };
            });
            Object.keys(updated).forEach(day => {
                if (!days.includes(day)) delete updated[day];
            });
            return updated;
        });
        setShowPicker({});
        setPickerDate({});
    };

    const handleTimeChange = (day: string, type: 'start' | 'end', event: any, selectedDate?: Date) => {
        setShowPicker(prev => ({
            ...prev,
            [day]: { ...prev[day], [type]: Platform.OS === 'ios' }
        }));
        if (selectedDate) {
            setPickerDate(prev => ({
                ...prev,
                [day]: { ...prev[day], [type]: selectedDate }
            }));
            setDayTimes(prev => ({
                ...prev,
                [day]: { ...prev[day], [type]: formatTime(selectedDate) }
            }));
        }
    };

    const openPicker = (day: string, type: 'start' | 'end') => {
        setShowPicker(prev => ({
            ...prev,
            [day]: { ...(prev[day] || {}), [type]: true }
        }));
        setPickerDate(prev => ({
            ...prev,
            [day]: {
                ...(prev[day] || {}),
                [type]: prev[day]?.[type] || new Date()
            }
        }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const classSettingPayload = {
                curriculumCourse: userCourse.curriculumCourse.id,
                allowedRadius,
                attendancePassMark,
                attendanceWindow,
                recurringClasses: isRecurring,
                shouldSendNotifications: notifyStudent
            };
            const classSettingResponse = await createClassSetting(token, classSettingPayload);
            setClassSetting(classSettingResponse.data);

            selectedDays.forEach(async (item) => {
                const classSchedulePayload = {
                    curriculumCourse: userCourse.curriculumCourse.id,
                    day: item,
                    location,
                    startTime: dayTimes[item].start,
                    endTime: dayTimes[item].end
                };
                const classScheduleResponse = await createClassSchedule(token, classSchedulePayload);
                setClassSchedule(prev => [...prev, classScheduleResponse.data]);
            });

            setHasExistingData(true);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-100 px-4 pt-16 pb-16" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 65 }}>
            <BackHeader title="Class Settings" />

            {/* Course Details Card */}
            <View className="bg-primary-100 rounded-xl shadow p-4 mb-6 flex-row items-center">
                <Ionicons name="school-outline" size={32} color="#fff" />
                <View className="ml-4 flex-1">
                    <Text className="text-base font-bold text-white">
                        {userCourse?.curriculumCourse?.course?.code}
                    </Text>
                    <Text className="text-sm text-white mb-1">
                        {userCourse?.curriculumCourse?.course?.name}
                    </Text>
                    <Text className="text-sm text-white">
                        Level: {userCourse?.level} | Units: {userCourse?.curriculumCourse?.creditUnits}
                    </Text>
                    <Text className="text-sm text-white mt-1">
                        Department: {userCourse?.department?.name}
                    </Text>
                </View>
            </View>

            {/* Class Details Card */}
            <View className="bg-white rounded-xl shadow p-6 mb-6">
                <Text className="text-lg font-bold mb-4">Class Details</Text>

                {/* Recurring Toggle */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-sm text-gray-600">Recurring Class</Text>
                    <Switch
                        value={isRecurring}
                        onValueChange={setIsRecurring}
                        trackColor={{ false: "#d1d5db", true: "#0057A0" }}
                        thumbColor={isRecurring ? "#fff" : "#fff"}
                        disabled={isDisabled}
                    />
                </View>

                {/* Notify Student Toggle */}
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-sm text-gray-600">Notify Student of Class</Text>
                    <Switch
                        value={notifyStudent}
                        onValueChange={setNotifyStudent}
                        trackColor={{ false: "#d1d5db", true: "#0057A0" }}
                        thumbColor={notifyStudent ? "#fff" : "#fff"}
                        disabled={isDisabled}
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-sm text-gray-600 mb-1">Location</Text>
                    <TextInput
                        value={location}
                        onChangeText={setLocation}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                        placeholder="Enter location"
                        editable={!isDisabled}
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-sm text-gray-600 mb-1">Days</Text>
                    <MultiSelect
                        data={daysOfWeek}
                        labelField="label"
                        valueField="value"
                        value={selectedDays}
                        onChange={item => handleDaySelect(item)}
                        placeholder="Select days"
                        style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 6, paddingHorizontal: 8, height: 48 }}
                        selectedTextStyle={{ fontSize: 12, color: '#fff' }}
                        selectedStyle={{ borderRadius: 15, backgroundColor: '#0057A0', paddingHorizontal: 10 }}
                        itemTextStyle={{ fontSize: 14 }}
                        disable={isDisabled}
                    />
                </View>

                {/* Start and End Time for each selected day */}
                {selectedDays.length > 0 && (
                    <View className="mb-4">
                        <Text className="text-sm text-gray-600 mb-2">Set Start & End Time for Each Day</Text>
                        {selectedDays.map(day => (
                            <View key={day} className="flex-row items-center mb-2">
                                <Text className="text-sm text-gray-700 w-20">{day}:</Text>
                                {/* Start Time */}
                                <TouchableOpacity
                                    className="border border-gray-300 rounded-lg px-2 py-1 flex-row items-center"
                                    style={{ minWidth: 80 }}
                                    onPress={() => !isDisabled && openPicker(day, 'start')}
                                    activeOpacity={0.7}
                                    disabled={isDisabled}
                                >
                                    <Ionicons name="time-outline" size={16} color="#0057A0" />
                                    <Text className="ml-1 text-base">
                                        {dayTimes[day]?.start ? dayTimes[day].start : 'Start'}
                                    </Text>
                                </TouchableOpacity>
                                {/* Line between */}
                                <View style={{ width: 18, height: 2, backgroundColor: '#d1d5db', marginHorizontal: 6 }} />
                                {/* End Time */}
                                <TouchableOpacity
                                    className="border border-gray-300 rounded-lg px-2 py-1 flex-row items-center"
                                    style={{ minWidth: 80 }}
                                    onPress={() => !isDisabled && openPicker(day, 'end')}
                                    activeOpacity={0.7}
                                    disabled={isDisabled}
                                >
                                    <Ionicons name="time-outline" size={16} color="#0057A0" />
                                    <Text className="ml-1 text-base">
                                        {dayTimes[day]?.end ? dayTimes[day].end : 'End'}
                                    </Text>
                                </TouchableOpacity>
                                {/* DateTimePickers */}
                                {showPicker[day]?.start && (
                                    <DateTimePicker
                                        value={pickerDate[day]?.start || new Date()}
                                        mode="time"
                                        is24Hour={false}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={(event, selectedDate) => handleTimeChange(day, 'start', event, selectedDate)}
                                    />
                                )}
                                {showPicker[day]?.end && (
                                    <DateTimePicker
                                        value={pickerDate[day]?.end || new Date()}
                                        mode="time"
                                        is24Hour={false}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={(event, selectedDate) => handleTimeChange(day, 'end', event, selectedDate)}
                                    />
                                )}
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* Attendance Settings Card */}
            <View className="bg-white rounded-xl shadow p-6 mb-6">
                <Text className="text-lg font-bold mb-4">Attendance Settings</Text>
                <View className="mb-4">
                    <Text className="text-sm text-gray-600 mb-1">Attendance Window (minutes)</Text>
                    <TextInput
                        value={attendanceWindow}
                        onChangeText={setAttendanceWindow}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                        keyboardType="numeric"
                        placeholder="e.g. 15"
                        editable={!isDisabled}
                    />
                </View>
                <View className="mb-4">
                    <Text className="text-sm text-gray-600 mb-1">Attendance Pass Mark (%)</Text>
                    <TextInput
                        value={attendancePassMark}
                        onChangeText={setAttendancePassMark}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                        keyboardType="numeric"
                        placeholder="e.g. 75"
                        editable={!isDisabled}
                    />
                </View>
                <View className="mb-2">
                    <Text className="text-sm text-gray-600 mb-1">Allowed Radius (meters)</Text>
                    <TextInput
                        value={allowedRadius}
                        onChangeText={setAllowedRadius}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-base"
                        keyboardType="numeric"
                        placeholder="e.g. 50"
                        editable={!isDisabled}
                    />
                    <Text className="text-xs text-gray-500 mt-1">
                        Students must be within this distance from the class location to be marked present. The radius gives more accuracy to the attendance marking process.
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                className="bg-primary-600 py-3 rounded-lg flex-row items-center justify-center mt-2"
                onPress={handleSave}
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text className="text-white text-base font-semibold ml-2">Saving...</Text>
                    </>
                ) : (
                    <>
                        <Ionicons name="save-outline" size={20} color="#fff" />
                        <Text className="text-white text-base font-semibold ml-2">Save Settings</Text>
                    </>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ClassSetting;
