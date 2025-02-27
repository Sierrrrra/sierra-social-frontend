import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Shield, Bell } from 'lucide-react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SignupHeader from '@/components/SignupHeader';
import NextButton from '@/components/NextButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { signupUser } from '@/redux/authSlice';

export default function UserPermissionScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state) => state.auth);
  const signupData = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const theme = useColorScheme() ?? 'light';

  const [locationGranted, setLocationGranted] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationGranted(true);
      } else {
        Alert.alert(
          'Location Access',
          'Location access helps us show you events and people nearby. You can change this later in settings.',
          [
            { text: 'OK', style: 'default' }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setNotificationsGranted(true);
      } else {
        Alert.alert(
          'Notifications',
          'Notifications help you stay updated on new events and messages. You can change this later in settings.',
          [
            { text: 'OK', style: 'default' }
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleNext = async () => {
    if (!locationGranted || !notificationsGranted) {
      Alert.alert(
        'Permissions Required',
        'Please enable both location and notification permissions to continue.',
        [
          { text: 'OK', style: 'default' }
        ]
      );
      return;
    }

    try {
      await dispatch(signupUser(signupData));
      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: '(tabs)' }],
        })
      );
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SignupHeader title="Finishing Up" progress={1} />

      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Set Permissions</ThemedText>
        <ThemedText style={styles.subtitle}>
          We need a few permissions to provide you with the best experience
        </ThemedText>

        <View style={styles.permissionsContainer}>
          <View style={styles.permissionCard}>
            <View style={styles.iconContainer}>
              <Shield size={24} color="#0c2a3f" />
            </View>
            <ThemedText style={styles.permissionTitle}>Location Services</ThemedText>
            <ThemedText style={styles.permissionDescription}>
              We use your location to ensure you see hangouts and other users in your area.
            </ThemedText>
            <TouchableOpacity
              style={[
                styles.permissionButton,
                locationGranted && styles.permissionGrantedButton
              ]}
              onPress={requestLocationPermission}
            >
              <ThemedText style={styles.buttonText}>
                {locationGranted ? 'Location Access Granted' : 'Allow Location Services'}
              </ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.permissionCard}>
            <View style={styles.iconContainer}>
              <Bell size={24} color="#0c2a3f" />
            </View>
            <ThemedText style={styles.permissionTitle}>Notifications</ThemedText>
            <ThemedText style={styles.permissionDescription}>
              Enable notifications to get updated about new hangouts, messages, and other activity.
            </ThemedText>
            <TouchableOpacity
              style={[
                styles.permissionButton,
                notificationsGranted && styles.permissionGrantedButton
              ]}
              onPress={requestNotificationPermission}
            >
              <ThemedText style={styles.buttonText}>
                {notificationsGranted ? 'Notifications Enabled' : 'Enable Notifications'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
      </ThemedView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0c2a3f" />
          <ThemedText style={styles.loadingText}>Creating your account...</ThemedText>
        </View>
      ) : (
        <NextButton 
          onPress={handleNext} 
          disabled={!locationGranted || !notificationsGranted} 
          fullWidth={true} 
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 30,
    opacity: 0.8,
  },
  permissionsContainer: {
    marginTop: 10,
  },
  permissionCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9f0f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  permissionDescription: {
    fontSize: 15,
    marginBottom: 15,
    opacity: 0.8,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#0c2a3f',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    opacity: 0.8,
  },
  permissionGrantedButton: {
    backgroundColor: '#2ecc71',
    opacity: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});