import { parse } from "date-fns";
import * as Linking from "expo-linking";
import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  Share,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { Entypo, Ionicons } from "@expo/vector-icons";
import * as Calendar from "expo-calendar";

import Btn from "@/components/Btn";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? "light";
  const router = useRouter();

  const { event, data } = useGlobalSearchParams();
  const eventObject = data ? JSON.parse(data) : null;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // const handleShare = async () => {
  //   const eventLink = Linking.createURL(`/event/${eventObject.id}`, {
  //     queryParams: {
  //       title: eventObject.title,
  //       date: eventObject.date,
  //       time: eventObject.time,
  //       location: eventObject.location,
  //     },
  //   });

  //   console.log("Generated event link:", eventLink);

  //   try {
  //     const result = await Share.share({
  //       title: `Check out this event: ${eventObject.title}`,
  //       message: `Join me at this event:\n\n${eventObject.title}\nDate: ${eventObject.date}\nTime: ${eventObject.time}\nLocation: ${eventObject.location}\n\nAccess the event here: ${eventLink}`,
  //       url: eventLink, // Important for some platforms like iOS
  //     });

  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         console.log("Shared with activity type:", result.activityType);
  //       } else {
  //         console.log("Shared successfully!");
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       console.log("Share dismissed");
  //     }
  //   } catch (error) {
  //     console.error("Error sharing event:", error.message);
  //   }
  // };

  const handleShare = async () => {
    const eventLink = `sierra://event/${eventObject.id}`; // Deep link to your app's event screen
    const message =
      `Check out this event on sierra:\n\n` +
      `*${eventObject.title}*\n` +
      `📅 Date: ${eventObject.date}\n` +
      `⏰ Time: ${eventObject.time}\n` +
      `📍 Location: ${eventObject.location}\n\n` +
      `👉 Click here to view: ${eventLink}`;

    try {
      const result = await Share.share({
        message,
      });

      if (result.action === Share.sharedAction) {
        console.log("Event shared successfully!");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing event:", error.message);
    }
  };

  const handleJoin = async () => {
    console.log("Join button clicked");

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    console.log("Permission status:", status);

    if (status === "granted") {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();
      console.log("Default calendar:", defaultCalendar);

      if (!defaultCalendar) {
        Alert.alert(
          "No default calendar found",
          "Please set up a default calendar to add events."
        );
        return;
      }

      try {
        // Combine date and time strings
        const dateString = eventObject.date; // Example: "November 12, 2014"
        const timeString = eventObject.time; // Example: "9:00 AM"
        const dateTimeString = `${dateString} ${timeString}`;
        console.log("Combined date and time:", dateTimeString);

        // Parse date and time
        const startDate = parse(
          dateTimeString,
          "MMMM d, yyyy h:mm a",
          new Date()
        );
        console.log("Parsed start date:", startDate);

        if (isNaN(startDate.getTime())) {
          throw new Error("Invalid date or time format");
        }

        // Set end time (2 hours after start time)
        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 2);

        console.log("Event start date:", startDate);
        console.log("Event end date:", endDate);

        // Create the calendar event
        const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
          title: eventObject.title,
          startDate,
          endDate,
          location: eventObject.location,
          notes: eventObject.details,
        });

        console.log("Event created with ID:", eventId);
        Alert.alert("Success", "Event added to your calendar!");
      } catch (error) {
        console.error("Error creating calendar event:", error.message);
        Alert.alert("Error", "Failed to add event to calendar.");
      }
    } else {
      Alert.alert(
        "Permission Denied",
        "Calendar permissions are required to add events."
      );
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/event.jpeg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Entypo
            name="chevron-small-left"
            size={50}
            color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
          />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerText}>
          {eventObject.title}
        </ThemedText>
      </ThemedView>

      <ThemedText>{eventObject.details}</ThemedText>
      <ThemedText type="defaultSemiBold">
        Host: {eventObject.creator}
      </ThemedText>
      <ThemedText type="defaultSemiBold">
        Event Date: {eventObject.date}
      </ThemedText>
      <ThemedText type="defaultSemiBold">Time: {eventObject.time}</ThemedText>
      <ThemedText type="defaultSemiBold">
        Location: {eventObject.location}
      </ThemedText>

      <Collapsible title="Direction">
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: eventObject.latitude || 37.78825,
            longitude: eventObject.longitude || -122.4324,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: eventObject.latitude || 37.78825,
              longitude: eventObject.longitude || -122.4324,
            }}
            title={eventObject.title}
            description={eventObject.location}
          />
        </MapView>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <ThemedView style={[styles.row, { justifyContent: "center" }]}>
        <Btn title={"Join"} width="80%" onPress={handleJoin} />
        <Btn
          title={<Ionicons name="share-social-sharp" size={24} color="#fff" />}
          width="50"
          onPress={handleShare}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 5 : 6,
  },
  backButton: {
    position: "absolute",
    left: -20,
  },
  headerText: {
    marginLeft: 30,
  },
});
