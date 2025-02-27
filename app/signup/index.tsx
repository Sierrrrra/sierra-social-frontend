import React, { useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

import Input from '@/components/Input';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SignupHeader from '@/components/SignupHeader';
import NextButton from '@/components/NextButton';
import { updateSignupData } from '@/redux/signupSlice';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const isButtonDisabled = !firstName.trim() || !lastName.trim();

  const handleNext = () => {
    if (isButtonDisabled) return;
    
    dispatch(
      updateSignupData({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })
    );

    router.push('/signup/email');
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={styles.inner}>
            <ThemedView>
              <SignupHeader title="Get To Know You" progress={0.3} />

              <ThemedText type="title" style={styles.title}>What's your name?</ThemedText>
              <ThemedText style={styles.subtitle}>
                To continue, enter your full name
              </ThemedText>

              <ThemedView style={styles.inputContainer}>
                <Input
                  label="First name"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoFocus
                  autoCapitalize="words"
                  returnKeyType="next"
                />
                <Input
                  label="Last name"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  returnKeyType="done"
                  onSubmitEditing={handleNext}
                />
              </ThemedView>
            </ThemedView>

            <NextButton onPress={handleNext} disabled={isButtonDisabled} />
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
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 20,
    opacity: 0.8,
  },
  inputContainer: {
    marginTop: 10,
  },
});