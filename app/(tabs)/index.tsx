import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Animated,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Filter,
  ChevronRight
} from "lucide-react";
import events from "@/utils/eventData";

// Sample categories
const categories = [
  { id: "1", name: "All", icon: "grid" },
  { id: "2", name: "Dinner", icon: "utensils" },
  { id: "3", name: "Outdoors", icon: "tree" },
  { id: "4", name: "Music", icon: "music" },
  { id: "5", name: "Sports", icon: "activity" },
  { id: "6", name: "Art", icon: "palette" },
];

// Featured events
const featuredEvents = events.slice(0, 3);

// Upcoming events
const upcomingEvents = events.slice(3, 7);

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("1");
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const isDark = theme === "dark";
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleNavigate = (item) => {
    router.push({
      pathname: "/event/[event]",
      params: {
        event: item.id,
        data: JSON.stringify(item),
      },
    });
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        activeCategory === item.id && styles.activeCategoryButton,
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <ThemedText
        style={[
          styles.categoryText,
          activeCategory === item.id && styles.activeCategoryText,
        ]}
      >
        {item.name}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderFeaturedEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredEventCard}
      onPress={() => handleNavigate(item)}
      activeOpacity={0.9}
    >
      <Image
        source={item.image || require("@/assets/images/sira-party.jpg")}
        style={styles.featuredEventImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />
      <View style={styles.featuredEventContent}>
        <View style={styles.eventBadge}>
          <Calendar size={12} color="#fff" />
          <ThemedText style={styles.eventBadgeText}>Featured</ThemedText>
        </View>
        <ThemedText style={styles.featuredEventTitle}>{item.title}</ThemedText>
        <View style={styles.eventDetails}>
          <View style={styles.detailItem}>
            <MapPin size={12} color="#fff" />
            <ThemedText style={styles.detailText}>{item.location}</ThemedText>
          </View>
          <View style={styles.detailItem}>
            <Clock size={12} color="#fff" />
            <ThemedText style={styles.detailText}>{item.date}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderUpcomingEvent = ({ item }) => (
    <TouchableOpacity
      style={styles.upcomingEventCard}
      onPress={() => handleNavigate(item)}
      activeOpacity={0.8}
    >
      <Image
        source={item.image || require("@/assets/images/sira-party.jpg")}
        style={styles.upcomingEventImage}
      />
      <View style={styles.upcomingEventContent}>
        <ThemedText style={styles.upcomingEventTitle} numberOfLines={1}>
          {item.title}
        </ThemedText>
        <View style={styles.upcomingEventDetails}>
          <View style={styles.upcomingDetailItem}>
            <Calendar size={12} color={isDark ? "#8da9bc" : "#666"} />
            <ThemedText style={styles.upcomingDetailText}>{item.date}</ThemedText>
          </View>
          <View style={styles.upcomingDetailItem}>
            <Users size={12} color={isDark ? "#8da9bc" : "#666"} />
            <ThemedText style={styles.upcomingDetailText}>{item.attendees || "12"}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <Animated.View style={[
        styles.headerBackground,
        { opacity: headerOpacity, backgroundColor: isDark ? "#1a1a1a" : "#fff" }
      ]} />
      
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Hello, Israel</ThemedText>
            <ThemedText style={styles.subtitle}>Discover events near you</ThemedText>
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color={isDark ? "#8da9bc" : "#666"} />
            <ThemedText style={styles.searchPlaceholder}>Search events, people...</ThemedText>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Featured Events</ThemedText>
          <TouchableOpacity style={styles.seeAllButton}>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
            <ChevronRight size={16} color={isDark ? "#8da9bc" : "#666"} />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={featuredEvents}
          renderItem={renderFeaturedEvent}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
          snapToInterval={280}
          decelerationRate="fast"
        />
        
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Upcoming Events</ThemedText>
          <TouchableOpacity style={styles.seeAllButton}>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
            <ChevronRight size={16} color={isDark ? "#8da9bc" : "#666"} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.upcomingEventsGrid}>
          {upcomingEvents.map((item) => renderUpcomingEvent({ item }))}
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
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    zIndex: 2,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(140, 140, 140, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    zIndex: 2,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(140, 140, 140, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontSize: 14,
    opacity: 0.6,
  },
  filterButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "rgba(140, 140, 140, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "rgba(140, 140, 140, 0.1)",
  },
  activeCategoryButton: {
    backgroundColor: "#0c2a3f",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeAllText: {
    fontSize: 14,
    marginRight: 5,
    opacity: 0.7,
  },
  featuredList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  featuredEventCard: {
    width: 280,
    height: 180,
    borderRadius: 16,
    marginRight: 15,
    overflow: "hidden",
    position: "relative",
  },
  featuredEventImage: {
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
  featuredEventContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    zIndex: 2,
  },
  eventBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(12, 42, 63, 0.8)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  eventBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
  },
  featuredEventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  detailText: {
    fontSize: 12,
    color: "#fff",
    marginLeft: 4,
  },
  upcomingEventsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  upcomingEventCard: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(140, 140, 140, 0.1)",
  },
  upcomingEventImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  upcomingEventContent: {
    padding: 12,
  },
  upcomingEventTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  upcomingEventDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upcomingDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  upcomingDetailText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.7,
  },
});