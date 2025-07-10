import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Splash = ({ navigation }: any) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.replace('Login'); // Or 'Onboarding'
        }, 2000);

        return () => clearTimeout(timer);
      }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logos/attendlylogo.svg')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
});
