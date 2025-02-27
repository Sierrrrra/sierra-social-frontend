import React from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowRight } from "lucide-react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const { height } = Dimensions.get("window");

export default function WelcomeScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <Stack.Screen options={{ 
        headerShown: false,
        animation: 'fade'
      }} />
      
      <ImageBackground
        source={require("@/assets/images/sierra.jpeg")}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.gradient}
        />
        
        <SafeAreaView style={styles.container}>
          {/* Logo and Tagline */}
          <View style={styles.logoContainer}>
            <ThemedText style={styles.logoText}>chapters</ThemedText>
            <ThemedText style={styles.tagline}>authentic connections</ThemedText>
          </View>
          
          {/* Main Content */}
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <ThemedText style={styles.heading}>
                Discover meaningful connections
              </ThemedText>
              <ThemedText style={styles.subheading}>
                Join a community of like-minded individuals through curated social experiences
              </ThemedText>
            </View>
            
            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Link href="/login" asChild>
                <TouchableOpacity style={styles.primaryButton}>
                  <ThemedText style={styles.primaryButtonText}>Get Started</ThemedText>
                  <ArrowRight size={20} color="#0c2a3f" />
                </TouchableOpacity>
              </Link>
              
              <Link href="/(tabs)" asChild>
                <TouchableOpacity style={styles.secondaryButton}>
                  <ThemedText style={styles.secondaryButtonText}>Explore as Guest</ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
            
            {/* Footer Text */}
            <ThemedText style={styles.footerText}>
              By continuing, you agree to our <ThemedText style={styles.link}>Terms of Service</ThemedText> and acknowledge our <ThemedText style={styles.link}>Privacy Policy</ThemedText>
            </ThemedText>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.12,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
    fontFamily: "LiberRegular",
  },
  tagline: {
    fontSize: 18,
    color: "#fff",
    opacity: 0.9,
    marginTop: 8,
    fontFamily: "LiberRegular",
    letterSpacing: 0.5,
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingBottom: Platform.OS === 'ios' ? 50 : 30,
  },
  textContainer: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#0c2a3f",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 18,
  },
  link: {
    color: "#fff",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

