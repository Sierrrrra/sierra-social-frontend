import { useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  View,
  Text,
  TextInput,
  Animated,
  Easing,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import events from "@/utils/eventData";
import EventList from "@/components/EventList";

const categories = [
  "All Events",
  "Tech & Innovation",
  "Career",
  "Wellness",
  "Entertainment",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const theme = useColorScheme() ?? "light";
  const router = useRouter();
  const searchBoxHeight = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;

  // Filter events based on category or search text
  const filteredEvents = isSearchActive
    ? events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchText.toLowerCase()) ||
          event.summary.toLowerCase().includes(searchText.toLowerCase()) ||
          event.location.toLowerCase().includes(searchText.toLowerCase()) ||
          event.category.toLowerCase().includes(searchText.toLowerCase()) ||
          event.creator.toLowerCase().includes(searchText.toLowerCase())
      )
    : selectedCategory === "All Events"
    ? events
    : events.filter((event) => event.category === selectedCategory);

  const handleCategory = (category) => setSelectedCategory(category);

  const handleNavigateAddEvent = () => {
    router.push({
      pathname: "/form/[form]",
      params: {
        event: "Add New Event",
      },
    });
  };

  const handleSearchToggle = () => {
    if (isSearchActive) {
      Animated.timing(searchBoxHeight, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(() => {
        setIsSearchActive(false);
        setSearchText("");
      });
    } else {
      setIsSearchActive(true);
      Animated.timing(searchBoxHeight, {
        toValue: 40,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [filteredEvents]);

  return (
    <ThemedView style={styles.screenContainer}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/sira-home.jpg")}
            style={styles.reactLogo}
          />
        }
        headerTitle="sierra"
        headerTitleFontSize={50}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Search and Category Filter */}
          <View style={styles.categoryContainer}>
            <Animated.View
              style={[styles.searchBoxContainer, { height: searchBoxHeight }]}
            >
              {isSearchActive && (
                <TextInput
                  style={styles.searchBox}
                  placeholder="search events by title, creator, location etc."
                  placeholderTextColor="#aaa"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              )}
              {isSearchActive && (
                <Pressable
                  onPress={handleSearchToggle}
                  style={styles.closeIcon}
                >
                  <AntDesign name="close" size={20} color="#333" />
                </Pressable>
              )}
            </Animated.View>
            {!isSearchActive && (
              <ScrollView
                style={styles.categoryScrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <Pressable
                  style={styles.searchIconContainer}
                  onPress={handleSearchToggle}
                >
                  <AntDesign
                    name="search1"
                    size={20}
                    color={theme === "light" ? "#333" : "#fff"}
                  />
                </Pressable>
                {categories.map((category) => (
                  <Pressable
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category && styles.activeCategory,
                    ]}
                    onPress={() => handleCategory(category)}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === category &&
                          styles.activeCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>

          {/* Render Filtered Events */}
          <Animated.View style={{ opacity: contentOpacity }}>
            {filteredEvents.map((event) => (
              <EventList event={event} key={event.id} />
            ))}
          </Animated.View>
        </ScrollView>
      </ParallaxScrollView>

      {/* Floating Button */}
      <Pressable
        style={[
          styles.floatingButton,
          { backgroundColor: theme === "light" ? "#fff" : "#333" },
        ]}
        onPress={handleNavigateAddEvent}
      >
        <AntDesign
          name="plus"
          size={24}
          color={theme === "light" ? "black" : "#fff"}
        />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingBottom: 100,
  },
  scrollViewContainer: {
    gap: 10,
  },
  categoryContainer: {
    marginVertical: 10,
    marginBottom: 0,
  },
  categoryScrollView: {
    flexDirection: "row",
  },
  searchIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  categoryButton: {
    backgroundColor: "#333",
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeCategory: {
    backgroundColor: "#fff",
  },
  activeCategoryText: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 12,
    color: "#fff",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  searchBox: {
    flex: 1,
    height: 30,
    fontSize: 14,
    color: "#333",
  },
  closeIcon: {
    marginLeft: 10,
  },
  floatingButton: {
    position: "absolute",
    bottom: 85,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});
