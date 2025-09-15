/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import "./global.css";
import { GluestackUIProviderWrapper } from '@/src/components/ui/gluestack-ui-provider';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import React, { useEffect } from 'react';
import AppNavigator from '@/src/navigations/AppNavigator';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/src/components/common/Toasts';
import { AuthProvider } from "./src/context/AuthContext";
import Geolocation from "@react-native-community/geolocation";

function App() {
  const isDarkMode = useColorScheme() === 'dark';

 useEffect(() => {
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always', // or 'whenInUse'
      enableBackgroundLocationUpdates: true,
      locationProvider: 'auto',
    });

    Geolocation.requestAuthorization();
    const prepareApp = async () => {
      // Any async task like loading fonts, checking auth, etc.
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate 3s delay
    };

    prepareApp().finally(async () => {
      await BootSplash.hide({ fade: true }); // Hide native splash screen
    });
  }, []);

  return (
    <GluestackUIProviderWrapper mode="light">
      <AuthProvider>
        <View style={styles.container}>
            <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } />
            <AppNavigator />
            <Toast config={toastConfig} />
        </View>
      </AuthProvider>
    </GluestackUIProviderWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
