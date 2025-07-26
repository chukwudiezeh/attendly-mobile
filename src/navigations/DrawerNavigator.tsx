import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NewAppScreen } from "@react-native/new-app-screen";
import CustomDrawerContent from '@/src/components/common/CustomDrawerContent';
import BottomNavigator from './BottomTabsNavigator'; // Assuming you have a BottomTabsNavigator
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
        <Drawer.Screen name="Home" component={BottomNavigator} />
      <Drawer.Screen name="Profile" component={NewAppScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
