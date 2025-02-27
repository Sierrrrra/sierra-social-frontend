import React, { useState, useLayoutEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  View,
  Animated,
  StatusBar,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker from "react-native-country-picker-modal";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import GooglePlacesInput from "@/components/GooglePlacesInput";
import { 
  ChevronLeft, 
  Save, 
  Calendar, 
  Phone, 
  MapPin, 
  Home, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  GraduationCap, 
  User, 
  Mail, 
  Edit,
  Camera
} from "lucide-react";

export default function EditProfileScreen() {
  // User data state
  const [name, setName] = useState("Israel Kollie");
  const [email, setEmail] = useState("israelkollie@gmail.com");
  const [date, setDate] = useState(new Date(1990, 0, 1));
  const [phone, setPhone] = useState("+1 555-123-4567");
  const [countryCode, setCountryCode] = useState("US");
  const [city, setCity] = useState("San Francisco, CA");
  const [homeTown, setHomeTown] = useState("Monrovia, Liberia");
  const [neighborhood, setNeighborhood] = useState("Mission District");
  const [college, setCollege] = useState("University of California");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [workplace, setWorkplace] = useState("Tech Innovations Inc.");
  const [about, setAbout] = useState("I'm passionate about technology and connecting with like-minded individuals. I enjoy hiking, photography, and exploring new restaurants in my free time.");
  
  // UI state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMoreSection, setShowMoreSection] = useState(false);
  const [isCountryPickerOpen, setCountryPickerOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  // Animation and theme
  const theme = useColorScheme() ?? "light";
  const isDark = theme === "dark";
  const navigation = useNavigation();
  const router = useRouter();
  const { event } = useGlobalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Track changes to enable save button
  const handleChange = () => {
    if (!isChanged) setIsChanged(true);
  };

  // Date picker handlers
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      handleChange();
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Format date for display
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Handle profile image selection
  const handleSelectProfileImage = () => {
    Alert.alert(
      "Change Profile Photo",
      "Choose an option",
      [
        { text: "Take Photo", onPress: () => console.log("Take photo") },
        { text: "Choose from Library", onPress: () => console.log("Choose from library") },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  // Handle save profile
  const handleSaveProfile = () => {
    // Here you would save the profile data to your backend
    console.log("Saving profile data");
    Alert.alert(
      "Profile Updated",
      "Your profile has been successfully updated.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Animated Header Background */}
      <Animated.View 
        style={[
          styles.headerBackground, 
          { 
            opacity: headerOpacity,
            backgroundColor: isDark ? "#1a1a1a" : "#fff" 
          }
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
          <TouchableOpacity 
            style={[
              styles.saveButton, 
              !isChanged && styles.saveButtonDisabled
            ]}
            onPress={handleSaveProfile}
            disabled={!isChanged}
          >
            <Save size={20} color={isChanged ? (isDark ? "#fff" : "#0c2a3f") : "#8da9bc"} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* Header */}
          <View style={styles.pageHeader}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButtonTop}>
              <ChevronLeft size={24} color={isDark ? "#fff" : "#333"} />
            </TouchableOpacity>
            <ThemedText style={styles.pageTitle}>Edit Profile</ThemedText>
          </View>
          
          {/* Profile Image Section */}
          <View style={styles.profileImageSection}>
            <View style={styles.profileImageContainer}>
              <Image 
                source={profileImage || require("@/assets/images/starter-bg-01.jpg")} 
                style={styles.profileImage} 
              />
              <TouchableOpacity 
                style={styles.editImageButton}
                onPress={handleSelectProfileImage}
              >
                <Camera size={18} color="#fff" />
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.profileName}>{name}</ThemedText>
            <ThemedText style={styles.profileEmail}>{email}</ThemedText>
          </View>
          
          {/* Basic Information Section */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Basic Information</ThemedText>
            
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <User size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                <ThemedText style={styles.inputLabel}>Full Name</ThemedText>
              </View>
              <Input
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  handleChange();
                }}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Mail size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                <ThemedText style={styles.inputLabel}>Email Address</ThemedText>
              </View>
              <Input
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  handleChange();
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Calendar size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                <ThemedText style={styles.inputLabel}>Date of Birth</ThemedText>
              </View>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={toggleDatePicker}
              >
                <ThemedText style={styles.dateText}>{formatDate(date)}</ThemedText>
                <Calendar size={18} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1920, 0, 1)}
                />
              )}
            </View>
            
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Phone size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                <ThemedText style={styles.inputLabel}>Phone Number</ThemedText>
              </View>
              <View style={styles.phoneInputContainer}>
                <TouchableOpacity 
                  style={styles.countryPickerButton}
                  onPress={() => setCountryPickerOpen(true)}
                >
                  <CountryPicker
                    countryCode={countryCode}
                    withFlag
                    withFilter
                    withCountryNameButton={false}
                    withAlphaFilter
                    onSelect={(country) => {
                      setCountryCode(country.cca2);
                      handleChange();
                    }}
                    visible={isCountryPickerOpen}
                    onClose={() => setCountryPickerOpen(false)}
                    containerButtonStyle={styles.countryPickerContainer}
                  />
                  <ChevronDown size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.phoneInput,
                    isDark && styles.phoneInputDark
                  ]}
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    handleChange();
                  }}
                  keyboardType="phone-pad"
                  placeholder="Phone number"
                  placeholderTextColor={isDark ? "#8da9bc" : "#999"}
                />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <MapPin size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                <ThemedText style={styles.inputLabel}>Current City</ThemedText>
              </View>
              <GooglePlacesInput
                placeholder="Where do you live now?"
                onPlaceSelected={(place) => {
                  setCity(place);
                  handleChange();
                }}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Home size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                <ThemedText style={styles.inputLabel}>Hometown</ThemedText>
              </View>
              <GooglePlacesInput
                placeholder="Where are you from?"
                onPlaceSelected={(place) => {
                  setHomeTown(place);
                  handleChange();
                }}
              />
            </View>
          </View>
          
          {/* More About You Section */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => setShowMoreSection(!showMoreSection)}
            >
              <ThemedText style={styles.sectionTitle}>More About You</ThemedText>
              {showMoreSection ? (
                <ChevronUp size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              ) : (
                <ChevronDown size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              )}
            </TouchableOpacity>
            
            {showMoreSection && (
              <>
                <View style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <MapPin size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                    <ThemedText style={styles.inputLabel}>Neighborhood</ThemedText>
                  </View>
                  <Input
                    value={neighborhood}
                    onChangeText={(text) => {
                      setNeighborhood(text);
                      handleChange();
                    }}
                    placeholder="Your current neighborhood"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <GraduationCap size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                    <ThemedText style={styles.inputLabel}>College/University</ThemedText>
                  </View>
                  <Input
                    value={college}
                    onChangeText={(text) => {
                      setCollege(text);
                      handleChange();
                    }}
                    placeholder="Where did you study?"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <Briefcase size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                    <ThemedText style={styles.inputLabel}>Job Title</ThemedText>
                  </View>
                  <Input
                    value={jobTitle}
                    onChangeText={(text) => {
                      setJobTitle(text);
                      handleChange();
                    }}
                    placeholder="What do you do?"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <Briefcase size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                    <ThemedText style={styles.inputLabel}>Workplace</ThemedText>
                  </View>
                  <Input
                    value={workplace}
                    onChangeText={(text) => {
                      setWorkplace(text);
                      handleChange();
                    }}
                    placeholder="Where do you work?"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <View style={styles.labelContainer}>
                    <User size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                    <ThemedText style={styles.inputLabel}>About Me</ThemedText>
                  </View>
                  <Input
                    value={about}
                    onChangeText={(text) => {
                      setAbout(text);
                      handleChange();
                    }}
                    placeholder="Tell us about yourself..."
                    multiline={true}
                    height={120}
                  />
                </View>
              </>
            )}
          </View>
        </Animated.ScrollView>
      </KeyboardAvoidingView>
      
      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.saveButtonLarge,
            !isChanged && styles.saveButtonLargeDisabled
          ]}
          onPress={handleSaveProfile}
          disabled={!isChanged}
        >
          <Save size={20} color="#fff" style={styles.saveButtonIcon} />
          <ThemedText style={styles.saveButtonText}>Save Profile</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButtonTop: {
    marginRight: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0c2a3f',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 16,
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dateText: {
    fontSize: 16,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginRight: 10,
  },
  countryPickerContainer: {
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  phoneInputDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  saveButtonLarge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c2a3f',
    borderRadius: 12,
    paddingVertical: 15,
  },
  saveButtonLargeDisabled: {
    backgroundColor: 'rgba(12, 42, 63, 0.5)',
  },
  saveButtonIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
