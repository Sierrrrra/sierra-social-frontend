import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";

export default EventList = ({ event }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.contentContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("EventDetails", { event });
        }}
      >
        <View style={{ paddingHorizontal: 15, gap: 10 }}>
          <View style={globalStyles.row}>
            <View style={[globalStyles.row, { gap: 10 }]}>
              <Image
                style={globalStyles.userAvatar}
                // source={require("../../assets/memojis/2.png")}
                source={require("../../assets/user.png")}
              />
              <Text style={globalStyles.h2}>{event.creator}</Text>
            </View>
            <Text style={{ color: "gray" }}>32Mins</Text>
          </View>

          <Text style={globalStyles.h3}>{event.title}</Text>
          <View style={styles.location}>
            <Ionicons name="location-sharp" size={20} color="gray" />
            <Text style={[globalStyles.textSmall, { color: "gray" }]}>
              {event.location}
            </Text>
          </View>
          <Text style={globalStyles.text}>{event.summary}</Text>

          <View style={[globalStyles.row, { marginTop: 15, marginBottom: 5 }]}>
            <View style={styles.dateTimeRow}>
              <Feather name="calendar" size={20} color="gray" />
              <Text style={globalStyles.textSmall}>{event.date}</Text>
            </View>

            <View style={styles.dateTimeRow}>
              <Feather name="clock" size={20} color="gray" />
              <Text style={globalStyles.textSmall}>{event.time}</Text>
            </View>
          </View>
        </View>

        <Image
          style={styles.eventImage}
          source={require("../../assets/event.jpeg")}
        />

        <View style={[globalStyles.row, { marginTop: 25, marginBottom: 30, paddingHorizontal: 15 }]}>
          <View style={{ width: "70%" }}>
            <Text style={[globalStyles.textSmall, { color: "gray" }]}>
              <Text style={{ fontWeight: "bold" }}>Alice, Michael,</Text>
              and 2 other are joining</Text>
          </View>

          <TouchableOpacity
            style={styles.dateTimeRow}
            onPress={() => {
              navigation.navigate("EventDetails", { event });
            }}
          >
            <Text style={[globalStyles.h3, { color: `${Colors.primary}` }]}>Join</Text>
            <Entypo name="plus" size={30} color={Colors.primary} />
          </TouchableOpacity>

        </View>

      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // backgroundColor: "#F5F7F8",
    // paddingTop: 10,
    gap: 10,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: Colors.ligth,
    padding: 20,
    // borderRadius: 10,
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    // marginVertical: 10,
  },

  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 5,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  eventImage: {
    width: "100%",
    height: 210,
    marginTop: 10,
    resizeMode: "cover",
  },
});
