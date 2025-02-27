import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  View,
  Dimensions,
  StatusBar,
} from "react-native";
import { Stack, Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import Constants from "expo-constants";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { loginUser } from "@/redux/authSlice";

const { expoClientId, iosClientId, androidClientId, webClientId } =
  Constants.expoConfig?.extra || {};
const { slug, owner } = Constants.expoConfig || {};

const { height } = Dimensions.get("window");

export default function Login() {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // Hooks
  const theme = useColorScheme() ?? "light";
  const isDark = theme === "dark";
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const router = useRouter();

  // Auth configuration
  const redirectUri =
    Platform.OS === "web"
      ? window.location.origin
      : `https://auth.expo.io/@${owner}/${slug}`;

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    webClientId,
    redirectUri: makeRedirectUri({
      useProxy: true,
    }),
  });

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: "YOUR_FACEBOOK_APP_ID",
    scopes: ["public_profile", "email"],
  });

  // Handle auth responses
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      fetchUserInfo(authentication.accessToken, "google");
    }
  }, [response]);

  useEffect(() => {
    if (fbResponse?.type === "success") {
      const { authentication } = fbResponse;
      fetchUserInfo(authentication.accessToken, "facebook");
    }
  }, [fbResponse]);

  // Fetch user info after successful auth
  const fetchUserInfo = async (token, provider) => {
    let userInfo;
    try {
      if (provider === "google") {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        userInfo = await response.json();
      } else if (provider === "facebook") {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,first_name,last_name,bio&access_token=${token}`
        );
        userInfo = await response.json();
      }
      
      await saveToken(token);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "(tabs)" }],
        })
      );
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Save auth token
  const saveToken = async (value) => {
    try {
      await AsyncStorage.setItem("@token", value);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }
    
    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }
    
    return isValid;
  };

  // Handle login
  const handleLogin = async () => {
    if (!validateForm()) return;
    
    try {
      const response = await dispatch(
        loginUser({ email, password })
      );
      
      if (response.payload?.success) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "(tabs)" }],
          })
        );
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <Stack.Screen options={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color={isDark ? "#fff" : "#333"} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Sign In</ThemedText>
        <View style={styles.headerRight} />
      </View>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.contentContainer}>
            {/* Welcome Text */}
            <View style={styles.welcomeContainer}>
              <ThemedText style={styles.welcomeTitle}>Welcome Back</ThemedText>
              <ThemedText style={styles.welcomeSubtitle}>
                Sign in to continue to your account
              </ThemedText>
            </View>
            
            {/* Login Form */}
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <Mail size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                </View>
                <View style={styles.textInputWrapper}>
                  <ThemedText style={styles.inputLabel}>Email</ThemedText>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full bg-transparent outline-none text-base ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
                  />
                </View>
              </View>
              {emailError ? (
                <ThemedText style={styles.errorText}>{emailError}</ThemedText>
              ) : null}
              
              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconContainer}>
                  <Lock size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                </View>
                <View style={styles.textInputWrapper}>
                  <ThemedText style={styles.inputLabel}>Password</ThemedText>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full bg-transparent outline-none text-base ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
                  />
                </View>
                <TouchableOpacity 
                  style={styles.visibilityToggle}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <EyeOff size={20} color={isDark ? "#8da9bc" : "#666"} />
                  ) : (
                    <Eye size={20} color={isDark ? "#8da9bc" : "#666"} />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <ThemedText style={styles.errorText}>{passwordError}</ThemedText>
              ) : null}
              
              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotPasswordContainer}>
                <ThemedText style={styles.forgotPasswordText}>
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>
              
              {/* Error Message */}
              {error && (
                <View style={styles.errorContainer}>
                  <ThemedText style={styles.errorMessage}>{error}</ThemedText>
                </View>
              )}
              
              {/* Login Button */}
              <TouchableOpacity 
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
                )}
              </TouchableOpacity>
              
              {/* Social Login Divider */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText}>or continue with</ThemedText>
                <View style={styles.dividerLine} />
              </View>
              
              {/* Social Login Buttons */}
              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => promptAsync()}
                >
                  <Image 
                    source={require("@/assets/images/googleLogo.png")} 
                    style={styles.socialIcon} 
                  />
                  <ThemedText style={styles.socialButtonText}>Google</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => fbPromptAsync()}
                >
                  <Image 
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png" }} 
                    style={styles.socialIcon} 
                  />
                  <ThemedText style={styles.socialButtonText}>Facebook</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <ThemedText style={styles.signupText}>
                Don't have an account?
              </ThemedText>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <ThemedText style={styles.signupLink}>Sign Up</ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIconContainer: {
    marginRight: 12,
  },
  textInputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  visibilityToggle: {
    padding: 8,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: -8,
    marginBottom: 16,
    marginLeft: 8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#0c2a3f',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(140, 140, 140, 0.2)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.7,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  signupText: {
    fontSize: 14,
    opacity: 0.7,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0c2a3f',
    marginLeft: 4,
  },
});
