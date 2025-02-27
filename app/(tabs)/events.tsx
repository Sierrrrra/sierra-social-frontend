import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import events from "@/utils/eventData";

const createdEvents = events.slice(1, 3);
const joinedEvents = events.slice(4, 6);

export default function EventsScreen() {
  const [selectedTab, setSelectedTab] = useState("Created");
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const isDark = theme === "dark";

  const handleNavigate = (item) => {
    router.push({
      pathname: "/event/[event]",
      params: {
        event: item.id,
        data: JSON.stringify(item),
      },
    });
  };

  const renderEventCard = (item) => (
    <TouchableOpacity
      style={styles.eventCard}
      onPress={() => handleNavigate(item)}
      key={item.id}
      activeOpacity={0.8}
    >
      <Image 
        source={item.image || require("@/assets/images/sira-party.jpg")} 
        style={styles.eventImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.eventContent}>
        <ThemedText style={styles.eventTitle}>{item.title}</ThemedText>
        
        <View style={styles.eventDetails}>
          <View style={styles.detailItem}>
            <Calendar size={14} color="#fff" />
            <ThemedText style={styles.detailText}>{item.date}</ThemedText>
          </View>
          
          <View style={styles.detailItem}>
            <MapPin size={14} color="#fff" />
            <ThemedText style={styles.detailText}>{item.location}</ThemedText>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={14} color="#fff" />
            <ThemedText style={styles.detailText}>{item.attendees || "12"} attending</ThemedText>
          </View>
        </View>
      </View>
      <View style={styles.cardOverlay} />
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>My Events</ThemedText>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Created" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Created")}
        >
          <ThemedText
            style={[
              styles.tabText,
              selectedTab === "Created" && styles.activeTabText,
            ]}
          >
            Created
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "Joined" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Joined")}
        >
          <ThemedText
            style={[
              styles.tabText,
              selectedTab === "Joined" && styles.activeTabText,
            ]}
          >
            Joined
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.eventsContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === "Created"
          ? createdEvents.map(renderEventCard)
          : joinedEvents.map(renderEventCard)}
          
        <TouchableOpacity style={styles.createEventButton}>
          <ThemedText style={styles.createEventText}>
            {selectedTab === "Created" ? "Create New Event" : "Find More Events"}
          </ThemedText>
          <ChevronRight size={18} color="#0c2a3f" />
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "rgba(140, 140, 140, 0.1)",
  },
  activeTab: {
    backgroundColor: "#0c2a3f",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  eventsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  eventCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    height: 200,
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    zIndex: 1,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  eventContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    zIndex: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: "column",
    gap: 5,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 5,
  },
  createEventButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(140, 140, 140, 0.1)",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  createEventText: {
    fontWeight: "600",
    marginRight: 5,
  },
});