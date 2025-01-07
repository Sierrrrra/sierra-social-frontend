import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const SocialButton = ({ icon, label, onPress, style }) => (
  <Pressable style={[styles.socialButton, style]} onPress={onPress}>
    {icon}
    <ThemedText style={styles.socialButtonText}>{label}</ThemedText>
  </Pressable>
);

export default SocialButton;

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: '50%',
    borderRadius: 10,
    marginVertical: 5,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: '500',
    // color: '#000',
    marginLeft: 8, // Ensure spacing between icon and text
  },
});
