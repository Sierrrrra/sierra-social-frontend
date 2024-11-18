import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../../components/MyButton";
import AntDesign from '@expo/vector-icons/AntDesign';
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../../constants/colors";

export default function FirstStartupScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/starter-bg-06.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={{ gap: 7 }}>
            <Text style={styles.titleText}>Starting Fresh? Build Your Community Here!</Text>
            <Text style={styles.descriptionText}>
              Make lasting connections in your new environment.
            </Text>
          </View>

          <MyButton
            title="Continue"
            onPress={() => navigation.navigate("second")}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  skipText: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
  },
  contentContainer: {
    paddingBottom: 50,
    gap: 30,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    width: "90%",
  },
  descriptionText: {
    fontSize: 16,
    color: "#fff",
  },

});
