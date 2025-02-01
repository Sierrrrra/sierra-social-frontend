import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
import { Entypo, Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function EventList({ event }) {
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [bounceValue] = useState(new Animated.Value(1)); // Initialize bounce animation value

  const handleNavigate = () => {
    router.push({
      pathname: "/event/[event]",
      params: {
        event: event.id,
        data: JSON.stringify(event),
      },
    });
  };

  const handleSave = async () => {
    // Start the bounce animation
    Animated.sequence([
      Animated.spring(bounceValue, {
        toValue: 1.2,
        friction: 3,
        tension: 150,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 3,
        tension: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Save the event in AsyncStorage
    try {
      const savedEvents = await AsyncStorage.getItem("savedEvents");
      const events = savedEvents ? JSON.parse(savedEvents) : [];
      events.push(event);
      await AsyncStorage.setItem("savedEvents", JSON.stringify(events));
    } catch (error) {
      console.error("Error saving event:", error);
    }

    // Show +1 message for 15 seconds
    setIsSaved(true);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme === "light" ? "#fff" : "#333" },
      ]}
      onPress={handleNavigate}
      activeOpacity={1}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.userAvatar}
          source={require("@/assets/images/user.png")}
        />
        <View style={styles.headerText}>
          <ThemedText style={styles.userName}>{event.creator}</ThemedText>
          <ThemedText style={styles.timeAgo}>32 min ago</ThemedText>
        </View>
      </View>

      {/* Post Content */}
      <ThemedText type="title" style={styles.postTitle}>
        {event.title}
      </ThemedText>
      <View style={styles.infoRow}>
        <Ionicons name="location-sharp" size={18} color="gray" />
        <ThemedText style={styles.infoText}>{event.location}</ThemedText>
      </View>
      <View style={styles.infoRow}>
        <Feather name="clock" size={18} color="gray" />
        <ThemedText style={styles.infoText}>{event.time}</ThemedText>
      </View>
      <ThemedText style={styles.postDescription}>{event.summary}</ThemedText>

      {/* Image */}
      <Image
        style={styles.postImage}
        source={require("@/assets/images/search-events.jpg")}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="users" size={20} color="gray" />
          <ThemedText style={styles.footerText}>
            <ThemedText style={{ fontWeight: "bold" }}>10+ </ThemedText>
            Joined
          </ThemedText>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.animatedButton,
            { transform: [{ scale: bounceValue }] },
          ]}
        >
          <TouchableOpacity style={styles.footerButton} onPress={handleSave}>
            <FontAwesome name="bookmark-o" size={20} color="gray" />
            <ThemedText style={styles.footerText}>Save</ThemedText>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity style={styles.footerButton} onPress={handleNavigate}>
          <Entypo name="plus" size={20} color="gray" />
          <ThemedText style={styles.footerText}>Join</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Show +1 message for 15 seconds */}
      {showMessage && (
        <View style={styles.savedMessageContainer}>
          <Text style={styles.savedMessage}>+1</Text>
        </View>
      )}

      {/* Animated Save Button */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeAgo: {
    fontSize: 12,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 5,
  },
  postDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    marginLeft: 5,
  },
  savedMessageContainer: {
    position: "absolute",
    top: 10,
    left: "50%",
    transform: [{ translateX: -25 }],
    backgroundColor: "#0c2a3f",
    padding: 5,
    borderRadius: 5,
  },
  savedMessage: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  animatedButton: {
    // You can add styles for animated button if needed
  },
});
