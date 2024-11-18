import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { globalStyles } from "../styles/global";
import { Colors } from "../constants/colors";
import Event from "../components/Event";

export default function Home() {
  const navigation = useNavigation();

  const handleAddEvent = () => {
    // Navigate to the Add Event screen or trigger the add event functionality
    navigation.navigate("AddEvent"); // Example navigation
  };

  return (
    <SafeAreaView style={globalStyles.screenContainer}>
      <Text style={styles.appName}>{'Sierra'.trim()}</Text>

      <View style={styles.headerContainer}>
        <Image
          style={styles.imageStyles}
          source={require("../../assets/memojis/5.png")}
        />

        <TextInput style={styles.input} placeholder="Search" />

        <View style={styles.notification}>
          <Ionicons name="notifications" size={35} color="black" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <Event />
      </ScrollView>

      {/* Floating Button */}
      <Pressable style={styles.floatingButton} onPress={handleAddEvent}>
        <AntDesign name="plus" size={24} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 27,
    fontWeight: "bold",
    color: "darkgray", // Changed color to dark-gray
    textAlign: "center",
    // marginBottom: 5, // Added marginBottom to reduce space
    fontStyle: "italic", // Added italic style to make the text more meaningful
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: 5, // Reduced marginVertical to reduce space
  },

  imageStyles: {
    width: 50,
    height: 50,
    borderRadius: 15,
    resizeMode: "cover",
  },

  scrollViewContainer: {
    gap: 20,
  },

  input: {
    height: 35,
    // margin: 12,
    borderWidth: 1,
    borderColor: Colors.ligth,
    padding: 10,
    width: "70%",
    borderRadius: 5,
    backgroundColor: Colors.ligth,
  },

  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20, // Adjust to move it to the right side of the screen
    backgroundColor: Colors.primary,
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
});
