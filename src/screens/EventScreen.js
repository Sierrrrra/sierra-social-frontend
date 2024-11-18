import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from "react-native";
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  Ionicons,
  Feather,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import MyButton from "../components/MyButton";
import MapView, { Marker } from "react-native-maps";

export default function EventScreen({ route }) {
  const navigation = useNavigation();
  const { event } = route.params;


  return (
    <View style={[globalStyles.screenContainer, { paddingBottom: 30 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={styles.eventImage}
          source={require("../../assets/event.jpeg")}
        />
        <View style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <Image
              style={globalStyles.userAvatar}
              source={require("../../assets/memojis/2.png")}
            />
            <View>
              <Text style={[globalStyles.h2]}>{event.title}</Text>
              <View style={{ marginTop: 15, gap: 10 }}>
                <View style={styles.row}>
                  <Ionicons name="location-sharp" size={22} color="#ccc" />
                  <Text style={globalStyles.textSmall}>{event.location}</Text>
                </View>

                <View style={styles.row}>
                  <FontAwesome5 name="calendar-alt" size={20} color="#ccc" />
                  <Text style={globalStyles.textSmall}>
                    {event.date} at {event.time}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ gap: 10, marginTop: 25 }}>
            <Text style={globalStyles.h3}>About</Text>

            <Text style={globalStyles.text}>{event.summary}</Text>
            <Text style={globalStyles.text}>{event.details}</Text>
          </View>

          <View style={{ gap: 10, marginTop: 25, marginBottom: 25 }}>
            <Text style={globalStyles.h3}>Location</Text>

            {/* Map View */}
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: event.latitude || 37.78825, // Default to an example coordinate
                longitude: event.longitude || -122.4324, // Default to an example coordinate
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            />
            <Marker
              coordinate={{
                latitude: event.latitude || 37.78825,
                longitude: event.longitude || -122.4324,
              }}
              title={event.title}
              description={event.location}
            />
          </View>
        </View>
      </ScrollView>

      <MyButton title={"Join"} />
    </View>
  );
}

const styles = StyleSheet.create({
  // screenContainer: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 20,
  // },
  scrollViewContainer: {
    gap: 20,
  },

  contentContainer: {
    paddingTop: 20,
    gap: 10,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  eventImage: {
    width: "100%",
    height: 210,
    marginTop: 10,
    resizeMode: "cover",
  },
  map: {
    // width: '100%',
    // height: '100%',

    width: "100%",
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
});
