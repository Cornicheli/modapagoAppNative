import React from 'react';
import { Text, StyleSheet, GestureResponderEvent, Pressable } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: object;
}

export const CustomButton = ({ title, onPress, disabled = false, style }: CustomButtonProps) => {
  return (
    <Pressable
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272F4D',
    borderRadius: 4,
    width: 370,
    height: 45,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

