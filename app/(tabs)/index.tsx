import { useState, useRef, useEffect } from "react";
import axios from "axios";
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

const EVENTBRITE_PRIVATE_TOKEN = "CQYEEBJJYWBI7MZJ2AJA";
const BASE_URL = "https://www.eventbriteapi.com/v3";

const keywords = [
  "tech",
  "bars",
  "food",
  "concerts",
  "fitness",
  "cooking",
  "dating",
  "networking",
];

const categories = [
  "All Events",
  "Food & Drinks",
  "Music",
  "Bars",
  "Nightlife",
  "Travel & Adventure",
  "Entertainment",
  "Weekend Trips",
  "Education",
  "Fitness & Wellness",
  "Arts & Culture",
  "Dating",
  "Business & Networking",
  "Technology & Innovation",
  "Crafting",
  "Tech-Free Connections",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Events");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const theme = useColorScheme() ?? "light";
  const router = useRouter();

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

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    setSearchText("");
  };

  const handleNavigateAddEvent = () => {
    router.push({
      pathname: "/form/[form]",
      params: {
        event: "Add New Event",
      },
    });
  };

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
        <View style={styles.categoryContainer}>
          {isSearchActive ? (
            <View style={styles.searchBoxContainer}>
              <TextInput
                style={styles.searchBox}
                placeholder="search events by title, creator, location, etc."
                placeholderTextColor="#aaa"
                value={searchText}
                onChangeText={setSearchText}
              />
              <Pressable onPress={handleSearchToggle} style={styles.closeIcon}>
                <AntDesign name="close" size={20} color="#333" />
              </Pressable>
            </View>
          ) : (
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

        <View style={{ flex: 1, height: 540, marginBottom: 20 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {filteredEvents.map((event) => (
              <EventList event={event} key={event.id} />
            ))}
          </ScrollView>
        </View>
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
  },
  categoryContainer: {
    height: 30,
    justifyContent: "center",
    // backgroundColor: "#f5f5f5",
    paddingHorizontal: 10,
  },
  categoryScrollView: {
    flexDirection: "row",
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
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
  categoryButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 20,
    marginHorizontal: 4,
    // height: 40,
  },
  activeCategory: {
    backgroundColor: "#fff",
  },
  activeCategoryText: {
    fontSize: 10,
    color: "black",
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 10,
    color: "#fff",
  },
  searchIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
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
