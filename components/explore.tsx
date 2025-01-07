import React, { useState } from 'react';
import { StyleSheet, Image, Platform, TextInput, ScrollView, Pressable } from 'react-native';
import { Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router'

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import events from "@/utils/eventData";
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useColorScheme() ?? 'light';

  const handleSearch = (text) => {
    setSearchQuery(text);
};

const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/search-events.jpg')}
          style={styles.reactLogo}
        />
      }
      headerTitle="Explore new events"
      headerTitleFontSize={30}
      >
      <ThemedView style={[styles.searchContainer, {
        backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background,
        borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon
        } ]}>
        <Ionicons name="search" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        <TextInput
          style={[styles.searchInput, {color: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]}
          placeholder="Search events here..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </ThemedView>
      <ScrollView 
        contentContainerStyle={styles.eventsListContainer} // Apply consistent padding around the list
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.map((event) => (
          <Link
            href={{
              pathname: '/event/[event]',
              params: {
                event: '12345', // Dynamic parameter for the event
                data: JSON.stringify(event), // Serialized event data
              },
            }}
            key={event.id}
          >
            <ThemedView style={[styles.eventCard, { backgroundColor: theme === 'light' ? "#fff" : "#333" }]}>
              <ThemedView style={styles.imageContainer}>
                <Image source={require("@/assets/images/event.jpeg")} style={styles.eventImage} />
              </ThemedView>

              <ThemedView style={[styles.detailsContainer, {backgroundColor: 'none'}]}>
                <ThemedText type="subtitle" style={styles.h3}>{event.title}</ThemedText>
                <ThemedView style={{ backgroundColor: 'none' }}>
                  <ThemedView style={[styles.row, {backgroundColor: 'none'}]}>
                    <Ionicons name="location-sharp" size={19} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
                    <ThemedText type="info">{event.location}</ThemedText>
                  </ThemedView>

                  <ThemedView style={[styles.row, {backgroundColor: 'none'}]}>
                    <Feather name="calendar" size={17} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
                    <ThemedText type="info">{event.date} at {event.time}</ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </Link>
        ))}
      </ScrollView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  eventsListContainer: {
    gap: 10
    // padding: 15, // Adds padding around the entire list
    // backgroundColor: '#f9f9f9', // Subtle background to separate content
  },
  eventCard: {
    flexDirection: 'row',
    borderRadius: 10,
    // backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    padding: 10,
    gap: 12,
    alignItems: 'center',
    // marginTop: 30, // Consistent spacing between cards
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  h3: {
    fontSize: 16,
    fontWeight: '600',
    // color: '#333',
    marginBottom: 6,
    lineHeight: 20,
    maxWidth: '90%', // Prevents overflowing content
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  textSmall: {
    fontSize: 14,
    color: '#666',
    flexShrink: 1, // Prevents text overflow
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});


