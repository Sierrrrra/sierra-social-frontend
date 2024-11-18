import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MyButton from "../../components/MyButton";
import MyInput from "../../components/MyInput";
import Entypo from "@expo/vector-icons/Entypo";

export default function PhoneNumberScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={40} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={{ gap: 7 }}>
          <Text style={styles.title}>What's your phone number?</Text>
          <Text style={styles.subtitle}>Enter your Phone Number</Text>
        </View>

        <MyInput label={"Phone"} width="100%" keyboardType={"phone-pad"} />
        <MyButton title={"Next"} onPress={() => navigation.navigate("Town")} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 50,
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  content: {
    paddingBottom: 40,
    gap: 30,
    marginTop: 170,
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 19,
    fontWeight: "500",
    width: "90%",
  },
  subtitle: {
    fontSize: 16,
    width: "97%",
    color: "gray"
  },
});
