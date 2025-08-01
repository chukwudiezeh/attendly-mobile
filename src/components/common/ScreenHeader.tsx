import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';

type DrawerParamList = {
  Dashboard: undefined;
  Course: undefined;
  Attendance: undefined;
  Settings: undefined;
};

export const ScreenHeader: React.FC = () => {
  const drawerNavigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View className="flex-row items-center justify-between pb-4 shadow-md">
      <TouchableOpacity onPress={() => drawerNavigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="menu" size={28} color="#002147" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => drawerNavigation.dispatch(DrawerActions.openDrawer())}>
        <Ionicons name="notifications" size={25} color="#002147" />
      </TouchableOpacity>
    </View>
  );
};