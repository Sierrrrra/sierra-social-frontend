import React, { useState } from "react";
import { FlatList, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import ProgressBar from '@/components/ProgressBar';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { updateSignupData } from '@/redux/signupSlice';

const interestsValues = [
  "Music",
  "Bars",
  "Nightlife",
  "Fitness & Wellness",
  "Travel & Adventure",
  "Entertainment",
  "Arts & Culture",
  "Dating",
];

export default function Interests() {

  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const dispatch = useDispatch();
//   const onboardingData = useSelector((state) => state.onboarding);

  const [selectedInterests, setSelectedInterests] = useState([]);
  const isButtonActive = selectedInterests.length === 0;

  const toggleSelection = (interestsValues) => {
    if (selectedInterests.includes(interestsValues)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interestsValues));
    } else {
      setSelectedInterests([...selectedInterests, interestsValues]);
    }
  };

  const handleNext = () => {
    if (isButtonActive) return;

    dispatch(updateSignupData({ 
      interests: selectedInterests 
    }));


    router.push("/signup/permission");
  };

  const renderInterest = ({ item }) => {
    const isSelected = selectedInterests.includes(item);

    return (
      <TouchableOpacity
        style={[
          styles.interestButton,
          isSelected && styles.selectedButton || {borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
            backgroundColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon

          },
        ]}
        onPress={() => toggleSelection(item)}
      >
        <ThemedText
          style={[
            styles.interestText,
            isSelected && styles.selectedText,
          ]}
        >
          {item}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Entypo name="chevron-small-left" size={45} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
                </TouchableOpacity>
                <ThemedText style={styles.headerText}>Finishing Up</ThemedText>
              </ThemedView>

      <ProgressBar progress={0.9} />

      <ThemedView style={styles.content}>
        <ThemedText type='title'>
          Choose Your Interests
        </ThemedText>
        <ThemedText type='info'>
          Select areas you would like to explore
        </ThemedText>

        <FlatList
          data={interestsValues}
          renderItem={renderInterest}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
        />

        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: isButtonActive ? Colors.dark.icon : Colors.light.icon },
             
            {
              backgroundColor: selectedInterests.length != 0 ? '#0c2a3f' : '#0c2a3f'
  
            },
          ]}
          onPress={handleNext}
        >
          <FontAwesome name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.screen,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    marginBottom: 75
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 5,
  },
  titleHighlight: {
    fontStyle: "italic",
  },
  subtitle: {
    fontSize: 17,
    color: "#6e6e6e",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
    marginTop: 50
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  interestButton: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    // borderColor: Colors.screen,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    // backgroundColor: Colors.ligth,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: '#0c2a3f',
    borderColor: '#0c2a3f',
  },
  interestText: {
    fontSize: 16,
    color: "#fff",
  },
  selectedText: {
    color: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 20 : 20,
    marginBottom: 100,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    // color: Colors.primary,
  },
  backButton: {
    position: "absolute",
    left: -10,
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    // backgroundColor: '#0c2a3f'
  },
});
