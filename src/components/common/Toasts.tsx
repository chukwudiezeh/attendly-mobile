import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckIcon = () => (
  <View style={styles.iconContainer}>
    <Icon name="check" size={16} color="#FFFFFF" />
  </View>
);

const ErrorIcon = () => (
  <View style={styles.iconContainer}>
    <Icon name="error-outline" size={16} color="#FFFFFF" />
  </View>
);

const CustomToast = ({ text1, type }: { text1: string; type: string }) => {
  const isSuccess = type === 'success';
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isSuccess ? '#10B981' : '#EF4444' }
    ]}>
      <View style={styles.content}>
        {isSuccess ? <CheckIcon /> : <ErrorIcon />}
        <Text style={styles.message}>{text1}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 0,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '400',
    flex: 1,
  },
});

export const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />,
};