import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

const CustomDrawerContent = (props: any) => {
  const { logout } = useAuth();
    const handleLogout = async () => {
        try {
        await logout();
        // Optionally, navigate to a login screen or show a success message
        } catch (error) {
        console.error('Logout failed:', error);
        // Handle logout error (e.g., show a toast)
        }
    };
  return (
    <DrawerContentScrollView {...props}>
      <View className="p-4">
        <Text className="text-lg font-bold">Attendly</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => <Text>Logout</Text>}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
