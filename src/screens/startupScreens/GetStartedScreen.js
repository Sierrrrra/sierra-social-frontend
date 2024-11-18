import { View, Text, Button, StyleSheet, ImageBackground } from "react-native";
import { globalStyles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../../components/MyButton";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function GetStartedScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/images/starter-bg-05.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" size={40} color="#fff" />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={{ gap: 7 }}>
            <Text style={styles.titleText}>Let's Get Started</Text>
            <Text style={styles.descriptionText}>
              Instantly connect with others who are new to the area.
            </Text>
          </View>

          <MyButton
            title={"Get Started"}
            onPress={() => navigation.navigate("Name")}
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
    paddingHorizontal: 40,
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
