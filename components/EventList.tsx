import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Bookmark, 
  Share2, 
  Heart, 
  MessageCircle,
  Plus,
  ChevronRight
} from "lucide-react";

const { width } = Dimensions.get('window');
const cardWidth = width - 40;

export default function EventList({ event }) {
  // State
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.attendees || 12);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20) + 5);
  
  // Animation values
  const saveScale = useRef(new Animated.Value(1)).current;
  const likeScale = useRef(new Animated.Value(1)).current;
  const saveOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;
  
  // Hooks
  const theme = useColorScheme() ?? "light";
  const isDark = theme === "dark";
  const router = useRouter();
  
  // Check if event is already saved
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const savedEvents = await AsyncStorage.getItem("savedEvents");
        if (savedEvents) {
          const events = JSON.parse(savedEvents);
          const isEventSaved = events.some(e => e.id === event.id);
          setIsSaved(isEventSaved);
        }
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    
    checkSavedStatus();
  }, [event.id]);

  // Handle navigation to event details
  const handleNavigate = () => {
    // Animate card press
    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.push({
        pathname: "/event/[event]",
        params: {
          event: event.id,
          data: JSON.stringify(event),
        },
      });
    });
  };

  // Handle save event
  const handleSave = async () => {
    // Animate save button
    Animated.sequence([
      Animated.spring(saveScale, {
        toValue: 1.3,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(saveScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Show save confirmation
    Animated.sequence([
      Animated.timing(saveOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(saveOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Toggle saved state
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    
    // Save/remove the event in AsyncStorage
    try {
      const savedEvents = await AsyncStorage.getItem("savedEvents");
      let events = savedEvents ? JSON.parse(savedEvents) : [];
      
      if (newSavedState) {
        // Add event if not already saved
        if (!events.some(e => e.id === event.id)) {
          events.push(event);
        }
      } else {
        // Remove event if saved
        events = events.filter(e => e.id !== event.id);
      }
      
      await AsyncStorage.setItem("savedEvents", JSON.stringify(events));
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };
  
  // Handle like event
  const handleLike = () => {
    // Animate like button
    Animated.sequence([
      Animated.spring(likeScale, {
        toValue: 1.3,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(likeScale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Toggle like state and update count
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prevCount => newLikedState ? prevCount + 1 : prevCount - 1);
  };
  
  // Handle join event
  const handleJoin = () => {
    // Increase attendee count
    setAttendeeCount(prevCount => prevCount + 1);
    
    // Navigate to event details
    router.push({
      pathname: "/event/[event]",
      params: {
        event: event.id,
        data: JSON.stringify(event),
      },
    });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString(undefined, options);
  };

  return (
    <Animated.View style={[
      styles.cardContainer,
      { transform: [{ scale: cardScale }] }
    ]}>
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: isDark ? "#1a1a1a" : "#fff" }
        ]}
        onPress={handleNavigate}
        activeOpacity={0.95}
      >
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Image
            source={event.image || require("@/assets/images/search-events.jpg")}
            style={styles.eventImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          
          {/* Event Date Badge */}
          <View style={styles.dateBadge}>
            <Calendar size={12} color="#fff" />
            <ThemedText style={styles.dateBadgeText}>
              {formatDate(event.date)}
            </ThemedText>
          </View>
          
          {/* Save Indicator */}
          <Animated.View 
            style={[
              styles.savedIndicator,
              { 
                opacity: saveOpacity,
                transform: [{ scale: saveOpacity.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.5, 1.2, 1]
                }) }]
              }
            ]}
          >
            <ThemedText style={styles.savedIndicatorText}>
              {isSaved ? "Saved" : "Removed"}
            </ThemedText>
          </Animated.View>
        </View>
        
        {/* Event Content */}
        <View style={styles.contentContainer}>
          {/* Host Info */}
          <View style={styles.hostContainer}>
            <Image
              style={styles.hostAvatar}
              source={require("@/assets/images/starter-bg-01.jpg")}
            />
            <View>
              <ThemedText style={styles.hostName}>{event.creator || "Event Host"}</ThemedText>
              <ThemedText style={styles.timeAgo}>Posted 2h ago</ThemedText>
            </View>
          </View>
          
          {/* Event Title */}
          <ThemedText style={styles.eventTitle}>
            {event.title}
          </ThemedText>
          
          {/* Event Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <MapPin size={14} color={isDark ? "#8da9bc" : "#666"} />
              <ThemedText style={styles.detailText} numberOfLines={1}>
                {event.location}
              </ThemedText>
            </View>
            
            <View style={styles.detailItem}>
              <Clock size={14} color={isDark ? "#8da9bc" : "#666"} />
              <ThemedText style={styles.detailText}>
                {event.time || "7:00 PM"}
              </ThemedText>
            </View>
            
            <View style={styles.detailItem}>
              <Users size={14} color={isDark ? "#8da9bc" : "#666"} />
              <ThemedText style={styles.detailText}>
                {attendeeCount} attending
              </ThemedText>
            </View>
          </View>
          
          {/* Event Description */}
          {event.summary && (
            <ThemedText style={styles.description} numberOfLines={2}>
              {event.summary}
            </ThemedText>
          )}
          
          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <View style={styles.leftActions}>
              {/* Like Button */}
              <Animated.View style={{ transform: [{ scale: likeScale }] }}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={handleLike}
                >
                  <Heart 
                    size={20} 
                    color={isLiked ? "#e74c3c" : (isDark ? "#8da9bc" : "#666")} 
                    fill={isLiked ? "#e74c3c" : "none"}
                  />
                  <ThemedText style={styles.actionText}>{likeCount}</ThemedText>
                </TouchableOpacity>
              </Animated.View>
              
              {/* Comment Button */}
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color={isDark ? "#8da9bc" : "#666"} />
                <ThemedText style={styles.actionText}>3</ThemedText>
              </TouchableOpacity>
              
              {/* Share Button */}
              <TouchableOpacity style={styles.actionButton}>
                <Share2 size={20} color={isDark ? "#8da9bc" : "#666"} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.rightActions}>
              {/* Save Button */}
              <Animated.View style={{ transform: [{ scale: saveScale }] }}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={handleSave}
                >
                  <Bookmark 
                    size={20} 
                    color={isDark ? "#8da9bc" : "#666"} 
                    fill={isSaved ? (isDark ? "#8da9bc" : "#666") : "none"}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
        
        {/* Join Button */}
        <TouchableOpacity 
          style={styles.joinButton}
          onPress={handleJoin}
        >
          <Plus size={16} color="#fff" />
          <ThemedText style={styles.joinButtonText}>Join Event</ThemedText>
          <ChevronRight size={16} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
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
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(12, 42, 63, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  savedIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -40,
    marginTop: -20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  savedIndicatorText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hostAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  hostName: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
    opacity: 0.6,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 24,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(140, 140, 140, 0.1)',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 4,
    opacity: 0.8,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c2a3f',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
});

