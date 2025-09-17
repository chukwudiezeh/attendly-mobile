// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { useAuth } from '@/src/context/AuthContext';

// // Student Screens
// import AttendanceSummaryScreen from '@/src/screens/student/attendance/AttendanceSummaryScreen';
// import StudentClassesScreen from '@/src/screens/student/class/ClassesScreen';
// // Lecturer Screens
// // import LecturerAttendanceSummaryScreen from '@/src/screens/lecturer/attendance/LecturerAttendanceSummaryScreen';

// const Tab = createMaterialTopTabNavigator();

// const ClassNavigator = ({ userCourse }: { userCourse: any }) => {
//   const { authData } = useAuth();
//   const isStudent = authData?.user?.role === 'student';

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: '#0057A0',       
//         tabBarInactiveTintColor: '#ccc',
//         tabBarIndicatorStyle: { backgroundColor: '#0057A0' },
//         tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
//         tabBarStyle: { backgroundColor: '#fff' },
//       }}
//     >
//       {isStudent ? (
//         <>
//           <Tab.Screen
//             name="Summary"
//             component={AttendanceSummaryScreen}
//             initialParams={{ userCourse, classDetails }}
//             options={{ title: 'Summary' }}
//           />
//         <Tab.Screen
//           name="Classes"
//           component={StudentClassesScreen}
//           initialParams={{ userCourse, classDetails }}
//           options={{ title: 'Classes' }}
//         />
//         </>
//       ) : (<></>
//         // <Tab.Screen
//         //   name="Summary"
//         //   component={LecturerAttendanceSummaryScreen}
//         //   options={{ title: 'Attendance Summary' }}
//         // />
//       )}
//     </Tab.Navigator>
//   );
// }

// export default ClassNavigator;