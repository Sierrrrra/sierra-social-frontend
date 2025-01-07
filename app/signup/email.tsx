import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Stack, Link, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Entypo, FontAwesome } from '@expo/vector-icons';

import Input from '@/components/Input';
import ProgressBar from '@/components/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { updateSignupData } from '@/redux/signupSlice';

export default function Email() {
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  const isButtonActive = !email;

  const theme = useColorScheme() ?? 'light';
  const router = useRouter();

  const handleNext = () => {
    if (isButtonActive) return;

    dispatch(updateSignupData({ 
      email: email 
    }));
    
    router.push('/signup/password');
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
              <ProgressBar progress={0.5} />

              {/* Title and Subtitle */}
              <ThemedText type='title'>
                What's your email?
              </ThemedText>
              <ThemedText style={[styles.subtitle]}>
                Receive new events tailored to you, right in you inbox
              </ThemedText>

              {/* Input Fields */}
              <ThemedView style={styles.inputContainer}>
                <Input label="Your email address" value={email} onChangeText={setEmail} />
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
