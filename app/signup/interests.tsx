import React, { useState } from 'react';
import { 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Check } from 'lucide-react';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import SignupHeader from '@/components/SignupHeader';
import NextButton from '@/components/NextButton';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { updateSignupData } from '@/redux/signupSlice';

const interestsValues = [
  "Food & Drinks",
  "Music",
  "Bars",
  "Nightlife",
  "Travel & Adventure",
  "Entertainment",
  "Weekend Trips",
  "Education",
  "Fitness & Wellness",
  "Arts & Culture",
  "Business & Networking",
  "Technology & Innovation",
  "Dating",
  "Crafting",
  "Tech-Free Connections",
];

export default function Interests() {
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const isButtonDisabled = selectedInterests.length === 0;

  const toggleSelection = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleNext = () => {
    if (isButtonDisabled) return;

    dispatch(
      updateSignupData({
        interests: selectedInterests,
      })
    );

    router.push('/signup/permission');
  };

  const renderInterest = ({ item }: { item: string }) => {
    const isSelected = selectedInterests.includes(item);
    const backgroundColor = isSelected ? '#0c2a3f' : 
      theme === 'light' ? '#f0f5f8' : '#2c3e50';
    const textColor = isSelected ? '#ffffff' : 
      theme === 'light' ? '#0c2a3f' : '#f0f5f8';

    return (
      <TouchableOpacity
        style={[
          styles.interestButton,
          { backgroundColor, borderColor: isSelected ? '#0c2a3f' : 'transparent' }
        ]}
        onPress={() => toggleSelection(item)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isSelected }}
        accessibilityLabel={`${item} interest category`}
      >
        <ThemedText style={[styles.interestText, { color: textColor }]}>
          {item}
        </ThemedText>
        {isSelected && (
          <View style={styles.checkmark}>
            <Check size={14} color="#fff" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SignupHeader title="Finishing Up" progress={0.9} />

      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Choose Your Interests</ThemedText>
        <ThemedText style={styles.subtitle}>
          Select areas you would like to explore
        </ThemedText>

        <FlatList
          data={interestsValues}
          renderItem={renderInterest}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>

      <NextButton 
        onPress={handleNext} 
        disabled={isButtonDisabled} 
        fullWidth={true} 
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
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
  listContainer: {
    paddingBottom: 20,
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  interestButton: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    position: 'relative',
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkmark: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#0c2a3f',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});