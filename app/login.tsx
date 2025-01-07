import { Stack, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDispatch } from 'react-redux';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import Constants from 'expo-constants';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';


import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import LoginInput from '@/components/LoginInput';
import SocialButton from '@/components/SocialButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { loginUser } from '@/redux/authSlice';

const { expoClientId, iosClientId, androidClientId, webClientId } = Constants.expoConfig.extra;
const { slug, owner } = Constants.expoConfig

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const theme = useColorScheme() ?? 'light';
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const redirectUri =
  Platform.OS === 'web'
    ? window.location.origin
    : `https://auth.expo.io/@${owner}/${slug}`;

console.log('Redirect URI:', redirectUri);

console.log(slug, owner)


  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
    redirectUri: makeRedirectUri({
      useProxy: true
    }),
  });

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: 'YOUR_FACEBOOK_APP_ID',
    scopes: ['public_profile', 'email'],
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken, 'google');
    }
  }, [response]);

  useEffect(() => {
    if (fbResponse?.type === 'success') {
      const { authentication } = fbResponse;
      fetchUserInfo(authentication.accessToken, 'facebook');
    }
  }, [fbResponse]);

  const fetchUserInfo = async (token, provider) => {
    let userInfo;
    if (provider === 'google') {
      const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response?.error);
      userInfo = await response.json();
    } else if (provider === 'facebook') {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,first_name,last_name,bio&access_token=${token}`
      );
      userInfo = await response.json();
    }
    saveToken(token);
    console.log(userInfo);
  };

  const saveToken = async (value: string) => {
    try {
      await AsyncStorage.setItem('@token', value);
      console.log('Token saved');
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (): Promise<void> => {
    const response = await dispatch(loginUser({ email: credentials.email, password: credentials.password }));
    if (response.payload?.success) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: '(tabs)' }],
        })
      );
    }
  };

  const handleGoogleLogin = () => {
    promptAsync();
  };

  const handleFacebookLogin = () => {
    fbPromptAsync();
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ThemedView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.innerContainer}
          >
            <View style={styles.formContainer}>
              <LoginInput
                iconName="user"
                placeholder="Email"
                value={credentials.email}
                onChangeText={(val) => setCredentials({ ...credentials, email: val })}
                keyboardType="email-address"
              />
              
              <LoginInput
                iconName="lock"
                placeholder="Password"
                value={credentials.password}
                onChangeText={(val) => setCredentials({ ...credentials, password: val })}
                secureTextEntry={passwordVisible}
                onToggleVisibility={() => setPasswordVisible((prev) => !prev)}
              />

              {emailError ? (
                <ThemedText type="error" style={styles.errorText}>
                  {emailError}
                </ThemedText>
              ) : null}

              <TouchableOpacity
                style={{ alignSelf: 'flex-end' }}
                onPress={() => console.log('forget Password')}
              >
                <ThemedText style={styles.forgotPassword}>
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>

              {loading && <ActivityIndicator size="large" />}
              {error && <ThemedText style={styles.error}>{error}</ThemedText>}

              <TouchableOpacity onPress={handleLogin} style={styles.primaryBtn}>
                <ThemedText type="button" style={[styles.primaryBtnText, {color: 'white'}]}>
                  Sign In
                </ThemedText>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.line} />
                <ThemedText type="info" style={styles.orText}>
                  Or
                </ThemedText>
                <View style={styles.line} />
              </View>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <SocialButton
                  icon={
                    <Image
                      source={require('@/assets/images/googleLogo.png')}
                      style={styles.socialIcon}
                    />
                  }
                  label="Google"
                  style={[styles.googleButton, {borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]}
                  onPress={handleGoogleLogin}
                />
                <SocialButton
                  icon={
                    <FontAwesome5
                      name="facebook-f"
                      size={24}
                      color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                      style={styles.socialIcon}
                    />
                  }
                  label="Facebook"
                  style={[styles.facebookButton, {borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]}
                  onPress={handleFacebookLogin}
                />
              </View>

              <View style={styles.signupContainer}>
                <ThemedText style={styles.signupText}>
                  Signup with email 
                </ThemedText >
                <Link href="/signup" style={styles.signupLink}>
                    <ThemedText >Here</ThemedText>
                </Link>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#faf0e6',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'none'
  },
  forgotPassword: {
    // color: '#0c2a3f',
    fontWeight: '500',
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    // color: '#666',
  },
  signupLink: {
    // color: '#0c2a3f',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    // color: '#888',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  googleButton: {
    // backgroundColor: '#faf0e6',
    borderWidth: 1,
    // borderColor: '#eee',
  },
  facebookButton: {
    // backgroundColor: '#faf0e6',
    borderWidth: 1,
    // borderColor: '#eee',
  },
  primaryBtn: {
    width: "100%",
    backgroundColor: '#0c2a3f',
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center'
  },
  primaryBtnText: {
    // color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: { 
    color: 'red', 
    marginBottom: 10 
  },
});
