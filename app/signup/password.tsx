import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

import Input from '@/components/Input';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SignupHeader from '@/components/SignupHeader';
import NextButton from '@/components/NextButton';
import { updateSignupData } from '@/redux/signupSlice';
import { Check, X } from 'lucide-react';

export default function Password() {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: true,
    uppercase: true,
    number: true,
    special: true,
    match: false,
  });
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    validatePassword(password, rePassword);
  }, [password, rePassword]);

  const validatePassword = (pass: string, confirmPass: string) => {
    const hasLength = pass.length >= 8;
    const hasUppercase = /[A-Z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecial = /[@$!%*?&]/.test(pass);
    const doPasswordsMatch = pass === confirmPass && pass !== '';

    setPasswordErrors({
      length: !hasLength,
      uppercase: !hasUppercase,
      number: !hasNumber,
      special: !hasSpecial,
      match: !doPasswordsMatch && confirmPass !== '',
    });

    return hasLength && hasUppercase && hasNumber && hasSpecial && doPasswordsMatch;
  };

  const isButtonDisabled = !password || !rePassword || 
    Object.values(passwordErrors).some(error => error === true);

  const handleNext = () => {
    if (isButtonDisabled) return;

    dispatch(
      updateSignupData({
        password: password,
      })
    );

    router.push('/signup/interests');
  };

  const ValidationItem = ({ isError, text }: { isError: boolean; text: string }) => (
    <View style={styles.validationItem}>
      {isError ? (
        <X size={16} color="#e74c3c" />
      ) : (
        <Check size={16} color="#2ecc71" />
      )}
      <ThemedText style={[styles.validationText, isError ? styles.errorText : styles.successText]}>
        {text}
      </ThemedText>
    </View>
  );

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
              <SignupHeader title="Get To Know You" progress={0.7} />

              <ThemedText type="title" style={styles.title}>Choose a password</ThemedText>
              <ThemedText style={styles.subtitle}>
                Create a secure password for your account
              </ThemedText>

              <ThemedView style={styles.inputContainer}>
                <Input
                  label="Enter Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoFocus
                  returnKeyType="next"
                />
                <Input
                  label="Re-enter Password"
                  value={rePassword}
                  onChangeText={setRePassword}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleNext}
                />
                
                <ThemedView style={styles.validationContainer}>
                  <ValidationItem 
                    isError={passwordErrors.length} 
                    text="At least 8 characters" 
                  />
                  <ValidationItem 
                    isError={passwordErrors.uppercase} 
                    text="At least 1 uppercase letter" 
                  />
                  <ValidationItem 
                    isError={passwordErrors.number} 
                    text="At least 1 number" 
                  />
                  <ValidationItem 
                    isError={passwordErrors.special} 
                    text="At least 1 special character (@$!%*?&)" 
                  />
                  {rePassword && (
                    <ValidationItem 
                      isError={passwordErrors.match} 
                      text="Passwords match" 
                    />
                  )}
                </ThemedView>
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
  validationContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  validationText: {
    marginLeft: 8,
    fontSize: 14,
  },
  errorText: {
    color: '#e74c3c',
  },
  successText: {
    color: '#2ecc71',
  },
});