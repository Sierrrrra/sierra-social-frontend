import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface NextButtonProps {
  onPress: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function NextButton({ onPress, disabled = false, fullWidth = false }: NextButtonProps) {
  const theme = useColorScheme() ?? 'light';
  
  return (
    <TouchableOpacity
      style={[
        styles.nextButton,
        fullWidth && styles.fullWidth,
        {
          backgroundColor: disabled ? 
            (theme === 'light' ? '#a0a0a0' : '#505050') : 
            '#0c2a3f',
          opacity: disabled ? 0.7 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel="Continue to next step"
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <FontAwesome name="chevron-right" size={fullWidth ? 24 : 28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'flex-end',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  fullWidth: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 50,
    padding: 15,
  },
});