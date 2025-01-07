import React, { useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router'

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import events from "@/utils/eventData";

const createdEvents = events.slice(1, 3);

const joinedEvents = events.slice(4, 6);

export default function TabTwoScreen() {
  const [selectedTab, setSelectedTab] = useState('Created'); // State for tab switching
  const theme = useColorScheme() ?? 'light'; // Assuming light theme for now
  const router = useRouter();

  const handleNavigate = (item) => {
    router.push({
        pathname: '/event/[event]',
        params: {
            event: item.id, // Dynamic parameter for the event
            data: JSON.stringify(item), // Serialized event data
        },
    });
};

  const renderEventCard = (item) => (
    <TouchableOpacity style={[styles.eventCard, {backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background}]}
    onPress={() => handleNavigate(item)}
    key={item.id}
    >
      <ThemedText style={styles.eventTitle}>{item.title}</ThemedText>
      <ThemedText style={styles.eventDetails}>{item.date}</ThemedText>
      <ThemedText style={styles.eventDetails}>{item.location}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/sira-party.jpg')}
          style={styles.reactLogo}
        />
      }
      headerTitle="My Events"
      headerTitleFontSize={30}
      >
      <ThemedView style={[styles.container, { backgroundColor: theme === 'light' ? "#fff" : "#333" }]}>
        {/* Tabs Below Header Image */}
        <View style={[styles.tabsContainer, { backgroundColor: theme === 'light' ? "#fff" : "#333" }]}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Created' && {borderBottomColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon},
            ]}
            onPress={() => setSelectedTab('Created')}
          >
            <ThemedText
              style={[
                styles.tabText,
                selectedTab === 'Created' && {color: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
                  fontWeight: 'bold'
                },
              ]}
            >
              Created
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'Joined' && {borderBottomColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon},
            ]}
            onPress={() => setSelectedTab('Joined')}
          >
            <ThemedText
              style={[
                styles.tabText,
                selectedTab === 'Joined' && {color: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
                  fontWeight: 'bold'
                },
              ]}
            >
              Joined
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Event List */}
        <ScrollView contentContainerStyle={styles.eventsContainer}>
          {selectedTab === 'Created'
            ? createdEvents.map(renderEventCard)
            : joinedEvents.map(renderEventCard)}
        </ScrollView>
      </ThemedView>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#808080',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  eventsContainer: {
    padding: 16,
  },
  eventCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    // color: '#555',
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});