import React, { useState, useLayoutEffect, useRef } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  View,
  Animated,
  TextInput,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { 
  ChevronLeft, 
  Search, 
  Tag, 
  Check, 
  Save,
  Coffee,
  Music,
  Wine,
  Moon,
  Plane,
  Tv,
  Tent,
  GraduationCap,
  Dumbbell,
  Palette,
  Briefcase,
  Cpu,
  Heart,
  Utensils,
  Users
} from "lucide-react";

// Interest categories with icons
const interestCategories = [
  { id: "food", name: "Food & Drinks", icon: Coffee },
  { id: "music", name: "Music", icon: Music },
  { id: "bars", name: "Bars", icon: Wine },
  { id: "nightlife", name: "Nightlife", icon: Moon },
  { id: "travel", name: "Travel & Adventure", icon: Plane },
  { id: "entertainment", name: "Entertainment", icon: Tv },
  { id: "outdoors", name: "Weekend Trips", icon: Tent },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "fitness", name: "Fitness & Wellness", icon: Dumbbell },
  { id: "arts", name: "Arts & Culture", icon: Palette },
  { id: "business", name: "Business & Networking", icon: Briefcase },
  { id: "technology", name: "Technology & Innovation", icon: Cpu },
  { id: "dating", name: "Dating", icon: Heart },
  { id: "dining", name: "Dining", icon: Utensils },
  { id: "social", name: "Tech-Free Connections", icon: Users }
];

export default function EditInterestsScreen() {
  const theme = useColorScheme() ?? "light";
  const isDark = theme === "dark";
  const navigation = useNavigation();
  const router = useRouter();
  const { event } = useGlobalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // State
  const [selectedInterests, setSelectedInterests] = useState([
    "food", "music", "bars", "nightlife", "fitness"
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  
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

  const toggleSelection = (interestId) => {
    let newSelected;
    if (selectedInterests.includes(interestId)) {
      newSelected = selectedInterests.filter((item) => item !== interestId);
    } else {
      newSelected = [...selectedInterests, interestId];
    }
    setSelectedInterests(newSelected);
    setIsChanged(true);
  };

  const handleSave = async () => {
    try {
      // Here you would save the interests to your backend
      console.log("Saving interests:", selectedInterests);
      
      // Show success message and navigate back
      router.back();
    } catch (error) {
      console.error("Error saving interests:", error);
    }
  };
  
  // Filter interests based on search query
  const filteredInterests = searchQuery
    ? interestCategories.filter(interest => 
        interest.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : interestCategories;

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
          <ThemedText style={styles.headerTitle}>Edit Interests</ThemedText>
          <TouchableOpacity 
            style={[
              styles.saveButton, 
              !isChanged && styles.saveButtonDisabled
            ]}
            onPress={handleSave}
            disabled={!isChanged}
          >
            <Save size={20} color={isChanged ? (isDark ? "#fff" : "#0c2a3f") : "#8da9bc"} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
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
          <ThemedText style={styles.pageTitle}>Edit Interests</ThemedText>
        </View>
        
        {/* Profile Image and Name */}
        <View style={styles.profileSection}>
          <Image 
            source={require("@/assets/images/starter-bg-01.jpg")} 
            style={styles.profileImage} 
          />
          <ThemedText style={styles.profileName}>Israel Kollie</ThemedText>
          <ThemedText style={styles.profileBio}>
            Customize your experience by selecting interests that match your preferences
          </ThemedText>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color={isDark ? "#8da9bc" : "#666"} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search interests..."
            placeholderTextColor={isDark ? "#8da9bc" : "#999"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity 
              style={styles.clearSearch}
              onPress={() => setSearchQuery("")}
            >
              <ChevronLeft size={18} color={isDark ? "#8da9bc" : "#666"} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Selected Count */}
        <View style={styles.selectedCountContainer}>
          <Tag size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
          <ThemedText style={styles.selectedCountText}>
            {selectedInterests.length} interests selected
          </ThemedText>
        </View>
        
        {/* Interests Grid */}
        <View style={styles.interestsGrid}>
          {filteredInterests.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            const IconComponent = interest.icon;
            
            return (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestCard,
                  isSelected && styles.interestCardSelected,
                  isDark && isSelected && styles.interestCardSelectedDark
                ]}
                onPress={() => toggleSelection(interest.id)}
                activeOpacity={0.7}
              >
                <View style={[
                  styles.interestIconContainer,
                  isSelected && styles.interestIconContainerSelected
                ]}>
                  <IconComponent 
                    size={24} 
                    color={isSelected ? "#fff" : (isDark ? "#8da9bc" : "#0c2a3f")} 
                  />
                </View>
                <ThemedText 
                  style={[
                    styles.interestName,
                    isSelected && styles.interestNameSelected
                  ]}
                  numberOfLines={2}
                >
                  {interest.name}
                </ThemedText>
                {isSelected && (
                  <View style={styles.checkmarkContainer}>
                    <Check size={14} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        
        {filteredInterests.length === 0 && (
          <View style={styles.noResultsContainer}>
            <ThemedText style={styles.noResultsText}>
              No interests found matching "{searchQuery}"
            </ThemedText>
          </View>
        )}
      </Animated.ScrollView>
      
      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.saveButtonLarge,
            !isChanged && styles.saveButtonLargeDisabled
          ]}
          onPress={handleSave}
          disabled={!isChanged}
        >
          <Save size={20} color="#fff" style={styles.saveButtonIcon} />
          <ThemedText style={styles.saveButtonText}>Save Interests</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  profileBio: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  clearSearch: {
    padding: 5,
  },
  selectedCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  selectedCountText: {
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.7,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  interestCard: {
    width: '48%',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    position: 'relative',
  },
  interestCardSelected: {
    backgroundColor: '#0c2a3f',
  },
  interestCardSelectedDark: {
    backgroundColor: '#1e3a5f',
  },
  interestIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  interestIconContainerSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  interestName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    height: 40,
  },
  interestNameSelected: {
    color: '#fff',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
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
