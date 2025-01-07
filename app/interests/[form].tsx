import React, { useState, useLayoutEffect } from "react";
import { TouchableOpacity, StyleSheet, ScrollView, Platform, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Entypo } from "@expo/vector-icons";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Btn from '@/components/Btn';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const interests = [
  "Food & Drinks",
  "Music",
  "Bars",
  "Nightlife",
  "Fitness & Wellness",
  "Travel & Adventure",
  "Entertainment",
  "Arts & Culture",
  "Dating",
  "Business & Networking",
  "Technology & Innovation",
  "Crafting",
  "Tech-Free Connections",
];

export default function EditInterestsScreen() {
  const theme = useColorScheme() ?? 'light';
  const navigation = useNavigation();
  const router = useRouter();
  const { event } = useGlobalSearchParams();
  const [selectedInterests, setSelectedInterests] = useState([
    "Food & Drinks",
    "Music",
    "Bars",
    "Nightlife",
    "Fitness & Wellness",
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const toggleSelection = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async () => {
    try {
      navigation.navigate("onHome");
    } catch (error) {
      console.error("Error submitting onboarding data:", error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F7F8FA', dark: '#1A1A1A' }}
      headerImage={
        <Image
          source={require('@/assets/images/sira-notf.jpg')}
          style={styles.reactLogo}
        />
      }
      headerTitle="Israel Kollie"
      headerTitleFontSize={50}
    >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Entypo name="chevron-small-left" size={50} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>
        <ThemedText type='title' style={styles.headerText}>{event}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
          {/* <ThemedText style={styles.subtitle}>
            Select areas that align with your university life.
          </ThemedText> */}

          <View style={styles.interestsContainer}>
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.interestButton,
                    isSelected && {
                      backgroundColor: theme === 'light' ? '#fff' : '#333',
                    },
                  ]}
                  onPress={() => toggleSelection(interest)}
                >
                  <ThemedText
                    style={[
                      styles.interestText,
                      isSelected && styles.selectedInterestText,
                    ]}
                  >
                    {interest}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>

          <Btn title={"Save"} onPress={handleSubmit} />
        </ScrollView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 6,
  },
  backButton: {
    position: 'absolute',
    left: -18,
  },
  headerText: {
    marginLeft: 30,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 20,
    textAlign: "center",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start", // Align items from the start
    gap: 10, // Provide spacing between elements
  },
  interestButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#F0F0F0',
    margin: 5,
  },
  selectedInterestButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  interestText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  selectedInterestText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
