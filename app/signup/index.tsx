import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Entypo, FontAwesome } from '@expo/vector-icons';
// import { updateOnboardingData } from '@/features/onboarding/onboardingSlice';
import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { updateSignupData } from '@/redux/signupSlice';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  const isButtonActive = !firstName || !lastName;

  const theme = useColorScheme() ?? 'light';
  const router = useRouter();

  const handleNext = () => {
    if (isButtonActive) return;
    dispatch(updateSignupData({ 
      firstName: firstName,
      lastName: lastName 
    }));

    // dispatch(updateOnboardingData({ fullName: `${firstName} ${lastName}` }));
    // // Navigate to the Email screen
    router.push('/signup/email');
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
              <ProgressBar progress={0.3} />

              {/* Title and Subtitle */}
              <ThemedText type='title'>
                What's your name?
              </ThemedText>
              <ThemedText style={[styles.subtitle]}>
                To continue, enter your full name
              </ThemedText>

              {/* Input Fields */}
              <ThemedView style={styles.inputContainer}>
                <Input label="First name" value={firstName} onChangeText={setFirstName} />
                <Input label="Last name" value={lastName} onChangeText={setLastName} />
              </ThemedView>
            </ThemedView>

            {/* Next Button */}
            <TouchableOpacity
              style={[
                styles.nextButton,
                { backgroundColor: (isButtonActive && theme === 'light') ? Colors.dark.icon : (isButtonActive && theme === 'dark') ? Colors.dark.icon : Colors.light.icon },
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
    // backgroundColor: Colors.screen,
    paddingTop: 30,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
    marginTop: '20%',
  },
  titleHighlight: {
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 17,
    // color: '#6e6e6e',
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
    // color: Colors.primary,
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
});
