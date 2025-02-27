import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ProgressBar from '@/components/ProgressBar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

interface SignupHeaderProps {
  title: string;
  progress: number;
}

export default function SignupHeader({ title, progress }: SignupHeaderProps) {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();

  return (
    <>
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
        >
          <Entypo
            name="chevron-small-left"
            size={45}
            color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          />
        </TouchableOpacity>
        <ThemedText style={styles.headerText}>{title}</ThemedText>
      </ThemedView>

      <ProgressBar progress={progress} />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 6,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: -10,
    padding: 5,
  },
});