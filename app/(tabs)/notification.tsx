import React, { useState, useRef } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Animated,
  StatusBar,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Bell, MessageCircle, Users, MoreHorizontal } from "lucide-react";

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

export default function NotificationScreen() {
  const [activeFilter, setActiveFilter] = useState("All");
  const theme = useColorScheme() ?? "light";
  const isDark = theme === "dark";
  const scrollY = useRef(new Animated.Value(0)).current;

  // Filter notifications based on the active tab
  const filteredNotifications =
    activeFilter === "All"
      ? [...notifications, ...sampleMessages, ...sampleGroups]
      : activeFilter === "Messages"
      ? [...notifications, ...sampleMessages].filter(
          (notification) => notification.type === "message"
        )
      : sampleGroups;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        onPress={() => setActiveFilter("All")}
        style={[
          styles.filterButton,
          activeFilter === "All" && styles.activeFilterButton,
        ]}
      >
        <Bell size={16} color={activeFilter === "All" ? "#fff" : "#0c2a3f"} />
        <ThemedText
          style={[
            styles.filterButtonText,
            activeFilter === "All" && styles.activeFilterText,
          ]}
        >
          All
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveFilter("Messages")}
        style={[
          styles.filterButton,
          activeFilter === "Messages" && styles.activeFilterButton,
        ]}
      >
        <MessageCircle size={16} color={activeFilter === "Messages" ? "#fff" : "#0c2a3f"} />
        <ThemedText
          style={[
            styles.filterButtonText,
            activeFilter === "Messages" && styles.activeFilterText,
          ]}
        >
          Messages
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setActiveFilter("Groups")}
        style={[
          styles.filterButton,
          activeFilter === "Groups" && styles.activeFilterButton,
        ]}
      >
        <Users size={16} color={activeFilter === "Groups" ? "#fff" : "#0c2a3f"} />
        <ThemedText
          style={[
            styles.filterButtonText,
            activeFilter === "Groups" && styles.activeFilterText,
          ]}
        >
          Groups
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderNotification = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.notificationCard}
      activeOpacity={0.7}
    >
      <Image source={item.profileImage} style={styles.profileImage} />
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <ThemedText style={styles.boldText}>{item.name}</ThemedText>
          <ThemedText style={styles.timestamp}>{item.time}</ThemedText>
        </View>
        <ThemedText style={styles.notificationText}>
          {item.action}
        </ThemedText>
        <ThemedText style={styles.notificationMessage} numberOfLines={2}>
          {item.text}
        </ThemedText>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <MoreHorizontal size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <Animated.View style={[
        styles.headerBackground,
        { opacity: headerOpacity, backgroundColor: isDark ? "#1a1a1a" : "#fff" }
      ]} />
      
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Notifications</ThemedText>
      </View>

      {renderFilterButtons()}

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {filteredNotifications.map(renderNotification)}
        
        <View style={styles.endOfList}>
          <ThemedText style={styles.endOfListText}>
            You're all caught up!
          </ThemedText>
        </View>
      </Animated.ScrollView>
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
    height: 100,
    zIndex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
    zIndex: 2,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "rgba(140, 140, 140, 0.1)",
  },
  activeFilterButton: {
    backgroundColor: "#0c2a3f",
  },
  filterButtonText: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#fff",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  notificationCard: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "rgba(140, 140, 140, 0.1)",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 13,
    opacity: 0.7,
  },
  boldText: {
    fontWeight: "600",
    fontSize: 15,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  moreButton: {
    padding: 5,
    alignSelf: "flex-start",
  },
  endOfList: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  endOfListText: {
    fontSize: 14,
    opacity: 0.6,
  },
});