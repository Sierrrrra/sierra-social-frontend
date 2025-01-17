import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

// Sample Data for Notifications
const notifications = [
  {
    id: "1",
    name: "Brigette Hyacinth",
    action: "reposted",
    type: "message",
    text: "Do you intend to look for a new job in the New Year?",
    time: "16m",
    profileImage: require("@/assets/images/starter-bg-01.jpg"),
  },
  {
    id: "2",
    name: "Charles George",
    action: "viewed your profile",
    type: "message",
    text: "See all views.",
    time: "16m",
    profileImage: require("@/assets/images/starter-bg-02.jpg"),
  },
  {
    id: "3",
    name: "Vermon Washington",
    action: "commented on",
    type: "message",
    text: "Thank you so much for all of your support. I am grateful...",
    time: "46m",
    profileImage: require("@/assets/images/starter-bg-03.jpg"),
  },
  {
    id: "4",
    name: "Recommended Group",
    action: 'Join the "Scrum Masters" group for more updates.',
    type: "group",
    text: "Group for Business Analysts and Scrum Masters.",
    time: "1h",
    profileImage: require("@/assets/images/starter-bg-04.jpg"),
  },
  {
    id: "5",
    name: "Recommended Group",
    action: 'Join the "Developers Hub" group for coding tips.',
    type: "group",
    text: "A community for developers to share ideas.",
    time: "2h",
    profileImage: require("@/assets/images/starter-bg-05.jpg"),
  },
];

const sampleMessages = [
  {
    id: "m1",
    name: "John Doe",
    action: "sent you a message",
    type: "message",
    text: "Hi, I'd like to connect and discuss opportunities.",
    time: "1h",
    profileImage: require("@/assets/images/starter-bg-06.jpg"),
  },
  {
    id: "m2",
    name: "Jane Smith",
    action: "sent you a message",
    type: "message",
    text: "Can we collaborate on a project?",
    time: "3h",
    profileImage: require("@/assets/images/starter-bg-01.jpg"),
  },
];

const sampleGroups = [
  {
    id: "g1",
    name: "Scrum Masters",
    action: "Join this group for updates.",
    type: "group",
    text: "Collaborate with Scrum Masters and Agile professionals.",
    time: "2h",
    profileImage: require("@/assets/images/starter-bg-03.jpg"),
  },
  {
    id: "g2",
    name: "Developers Hub",
    action: "Join this group for coding tips.",
    type: "group",
    text: "A community for developers to share ideas.",
    time: "5h",
    profileImage: require("@/assets/images/starter-bg-02.jpg"),
  },
];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const theme = useColorScheme() ?? "light";

  // Filter notifications based on the active tab
  const filteredNotifications =
    activeFilter === "All"
      ? [...notifications, ...sampleMessages, ...sampleGroups]
      : activeFilter === "Messages"
      ? [...notifications, ...sampleMessages].filter(
          (notification) => notification.type === "message"
        )
      : sampleGroups;

  const renderFilterButtons = () => (
    <ThemedView style={styles.filterContainer}>
      {["All", "Messages", "Groups"].map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => setActiveFilter(filter)}
          style={[
            styles.filterButton,
            {
              backgroundColor: theme === "light" ? "#E0E0E0" : "#333",
            },
            activeFilter === filter && {
              backgroundColor: theme === "light" ? "#fff" : "#fff",
            },
          ]}
        >
          <ThemedText
            style={[
              styles.filterButtonText,
              activeFilter === filter && {
                color: "black",
                fontWeight: "bold",
              },
            ]}
          >
            {filter}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );

  const renderNotification = (item) => (
    <View
      key={item.id}
      style={[
        styles.notificationCard,
        { backgroundColor: theme === "light" ? "#fff" : "#333" },
      ]}
    >
      <Image source={item.profileImage} style={styles.profileImage} />
      <View style={styles.notificationContent}>
        <ThemedText style={styles.notificationText}>
          <ThemedText style={styles.boldText}>{item.name} </ThemedText>
          {item.action}: <Text>{item.text}</Text>
        </ThemedText>
        <Text style={styles.timestamp}>{item.time}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.moreOptions}>•••</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/sira-notf.jpg")}
          style={styles.reactLogo}
        />
      }
      headerTitle="sierra"
      headerTitleFontSize={50}
    >
      {renderFilterButtons()}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredNotifications.map((item) => renderNotification(item))}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    // backgroundColor: '#E0E0E0',
  },
  filterButtonText: {
    fontSize: 14,
    // color: '#333',
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  moreOptions: {
    fontSize: 20,
    color: "#999",
    fontWeight: "600",
  },
});
