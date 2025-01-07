import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { updateSignupData } from '@/redux/signupSlice';

export default function Password() {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const dispatch = useDispatch();

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.');
      return false;
    }
    if (password !== rePassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (!validatePassword()) return;

    dispatch(updateSignupData({ 
      password: password 
    }));

    router.push('/signup/interests');
  };

  return (
    <ThemedView style={[styles.container]}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={styles.inner}>
            {/* Header */}
            <ThemedView>
              <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Entypo name="chevron-small-left" size={45} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
                </TouchableOpacity>
                <ThemedText style={styles.headerText}>Get To Know You</ThemedText>
              </ThemedView>

              {/* ProgressBar */}
              <ProgressBar progress={0.7} />

              {/* Title and Subtitle */}
              <ThemedText type='title'>
                Choose a password
              </ThemedText>
              <ThemedText style={[styles.subtitle]}>
                To continue, choose a password
              </ThemedText>

              {/* Input Fields */}
              <ThemedView style={styles.inputContainer}>
                <Input label="Enter Password" value={password} onChangeText={setPassword} secureTextEntry />
                <Input label="Re-enter Password" value={rePassword} onChangeText={setRePassword} secureTextEntry />
                {error ? <ThemedText type='info' style={styles.errorText}>{error}</ThemedText> : null}
              </ThemedView>
            </ThemedView>

            {/* Next Button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                { backgroundColor: (!password || !rePassword) ? Colors.dark.icon : Colors.light.icon },
              ]}
              onPress={handleNext}
            >
              <FontAwesome name="chevron-right" size={28} color="#fff" />
            </TouchableOpacity>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 6,
    marginBottom: 100,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: -10,
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'flex-end',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});
