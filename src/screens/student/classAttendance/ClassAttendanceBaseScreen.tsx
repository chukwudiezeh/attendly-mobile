// import React, {useState} from 'react';
// import { View, Text } from 'react-native';
// import { useRoute } from '@react-navigation/native';

// // import { ProgressCircle } from 'react-native-svg'; // or any progress library
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { BackHeader } from '@/src/components/common/BackHeader';
// import  ClassNavigator from '@/src/navigations/ClassNavigator';

// const AttendanceBaseScreen = () => {
//   const route = useRoute();
//   const { userCourse, class: classDetails } = route.params as { userCourse: any, class: any };
//   const [classInfo, setClassInfo] = useState(classDetails);

//   return (
//     <View className="flex-1 bg-gray-100 px-4 pt-16">
//       <BackHeader title="Attendance Data" />
//         <View className="bg-primary-100 rounded-xl shadow p-4 mb-6 flex-row items-center">
//         <Ionicons name="school-outline" size={32} color="#fff" />
//             <View className="ml-4 flex-1">
//                 <Text className="text-base font-bold text-white">{userCourse.curriculumCourse.course.code}</Text>
//                 <Text className="text-sm text-white mb-1">{userCourse.curriculumCourse.course.name}</Text>
//                 <Text className="text-xs text-white">
//                 {classInfo.actualDate || 'N/A'} | {classInfo.classSchedule.startTime} - {classInfo.classSchedule.endTime}
//                 </Text>
//                 <Text className="text-xs text-white mt-1">Location: {classInfo.classSchedule.location}</Text>
//             </View>
//         </View>

//         <ClassNavigator userCourse={userCourse} classDetails={classInfo} />
//     </View>
//   );
// };

// export default AttendanceBaseScreen;