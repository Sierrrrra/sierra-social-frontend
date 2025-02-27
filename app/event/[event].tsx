import { parse } from "date-fns";
import * as Linking from "expo-linking";
import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  Share,
  TouchableOpacity,
  Alert,
  View,
  ScrollView,
  Animated,
} from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Calendar from "expo-calendar";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Share as ShareIcon, 
  ChevronLeft, 
  Info, 
  Heart, 
  MessageCircle,
  Navigation
} from "lucide-react";

export default function EventDetailScreen() {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const isDark = theme === "dark";
  
  const [isLiked, setIsLiked] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(12);
  const [scrollY] = useState(new Animated.Value(0));

  const { event, data } = useGlobalSearchParams();
  const eventObject = data ? JSON.parse(data) : null;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Calendar permissions are required to add events."
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

      // Use createEventInCalendarAsync to open the calendar interface
      await Calendar.createEventInCalendarAsync({
        title: eventObject.title,
        startDate,
        endDate,
        location: eventObject.location,
        notes: eventObject.details,
      });

      console.log("Event creation interface opened in calendar");
      
      // Update attendee count
      setAttendeeCount(attendeeCount + 1);
      
      // Show success message
      Alert.alert(
        "Success",
        "Event added to your calendar! You're now attending this event.",
        [{ text: "Great!" }]
      );
    } catch (error) {
      console.error("Error handling calendar event:", error.message);
      Alert.alert(
        "Error",
        error.message || "Failed to open calendar for editing."
      );
    }
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  
  const handleGetDirections = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${eventObject.location}`,
      android: `geo:0,0?q=${eventObject.location}`
    });
    
    Linking.openURL(url);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Animated Header Background */}
      <Animated.View 
        style={[
          styles.headerBackground, 
          { 
            opacity: headerOpacity,
            backgroundColor: isDark ? "#1a1a1a" : "#fff" 
          }
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle} numberOfLines={1}>
            {eventObject.title}
          </ThemedText>
          <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
            <ShareIcon size={20} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={eventObject.image || require("@/assets/images/event.jpeg")}
            style={[
              styles.eventImage,
              { transform: [{ scale: imageScale }] }
            ]}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageGradient}
          />
          <TouchableOpacity 
            style={styles.backButtonOverlay} 
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.eventImageContent}>
            <ThemedText style={styles.eventTitle}>{eventObject.title}</ThemedText>
            <View style={styles.hostContainer}>
              <Image 
                source={require("@/assets/images/starter-bg-01.jpg")} 
                style={styles.hostImage} 
              />
              <ThemedText style={styles.hostName}>Hosted by {eventObject.creator}</ThemedText>
            </View>
          </View>
        </View>
        
        {/* Event Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailsSection}>
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <CalendarIcon size={20} color="#0c2a3f" />
              </View>
              <View>
                <ThemedText style={styles.detailLabel}>Date</ThemedText>
                <ThemedText style={styles.detailValue}>{eventObject.date}</ThemedText>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Clock size={20} color="#0c2a3f" />
              </View>
              <View>
                <ThemedText style={styles.detailLabel}>Time</ThemedText>
                <ThemedText style={styles.detailValue}>{eventObject.time}</ThemedText>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <MapPin size={20} color="#0c2a3f" />
              </View>
              <View style={styles.locationContainer}>
                <View>
                  <ThemedText style={styles.detailLabel}>Location</ThemedText>
                  <ThemedText style={styles.detailValue}>{eventObject.location}</ThemedText>
                </View>
                <TouchableOpacity 
                  style={styles.directionsButton}
                  onPress={handleGetDirections}
                >
                  <Navigation size={16} color="#0c2a3f" />
                  <ThemedText style={styles.directionsText}>Directions</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIconContainer}>
                <Users size={20} color="#0c2a3f" />
              </View>
              <View>
                <ThemedText style={styles.detailLabel}>Attendees</ThemedText>
                <ThemedText style={styles.detailValue}>{attendeeCount} people going</ThemedText>
              </View>
            </View>
          </View>
          
          <View style={styles.descriptionSection}>
            <View style={styles.sectionHeader}>
              <Info size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.sectionTitle}>About this event</ThemedText>
            </View>
            <ThemedText style={styles.descriptionText}>
              {eventObject.details || "Join us for an amazing event! Connect with like-minded individuals and enjoy a memorable experience. Don't miss out on this opportunity to expand your network and create lasting memories."}
            </ThemedText>
          </View>
          
          <View style={styles.mapSection}>
            <View style={styles.sectionHeader}>
              <MapPin size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.sectionTitle}>Event Location</ThemedText>
            </View>
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
          </View>
        </View>
      </Animated.ScrollView>
      
      {/* Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]} 
          onPress={handleLike}
        >
          <Heart 
            size={24} 
            color={isLiked ? "#e74c3c" : isDark ? "#8da9bc" : "#666"} 
            fill={isLiked ? "#e74c3c" : "none"} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.commentButton]}
          onPress={() => Alert.alert("Comments", "Comments feature coming soon!")}
        >
          <MessageCircle size={24} color={isDark ? "#8da9bc" : "#666"} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.joinButton} 
          onPress={handleJoin}
        >
          <ThemedText style={styles.joinButtonText}>Join Event</ThemedText>
        </TouchableOpacity>
      </View>
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
    height: 60,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    zIndex: 1,
  },
  backButtonOverlay: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  eventImageContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  hostName: {
    fontSize: 14,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  detailsContainer: {
    padding: 20,
  },
  detailsSection: {
    marginBottom: 25,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 16,
    padding: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(12, 42, 63, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(12, 42, 63, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  directionsText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#0c2a3f',
  },
  descriptionSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  mapSection: {
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    marginRight: 10,
  },
  likeButton: {
    marginRight: 10,
  },
  commentButton: {
    marginRight: 15,
  },
  joinButton: {
    flex: 1,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#0c2a3f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

