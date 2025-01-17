import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  View,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CountryPicker from "react-native-country-picker-modal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Feather from "@expo/vector-icons/Feather";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import Input from "@/components/Input";
import Btn from "@/components/Btn";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

export default function EditProfileScreen() {
  const [name, setName] = useState("Israel Kollie");
  const [email, setEmail] = useState("israelkollie@gmail.com");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [city, setCity] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [college, setCollege] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [about, setAbout] = useState("");
  const [showSection, setShowSection] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const theme = useColorScheme() ?? "light";
  const navigation = useNavigation();
  const router = useRouter();
  const { event } = useGlobalSearchParams();
  const [isPickerOpen, setPickerOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      setDob(selectedDate || dob);
    }
    setShowDatePicker(false);
  };
  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    if (Platform.OS === "android") setShow(false); // Close picker on Android
  };

  const toggleDatepicker = () => setShow(!show);
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#F7F8FA", dark: "#1A1A1A" }}
      headerImage={
        <Image
          source={require("@/assets/images/sira-notf.jpg")}
          style={styles.reactLogo}
        />
      }
      headerTitle="Israel Kollie"
      headerTitleFontSize={50}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Entypo
                name="chevron-small-left"
                size={50}
                color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
              />
            </TouchableOpacity>
            <ThemedText type="title" style={styles.headerText}>
              {event}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.formSection}>
            <ThemedView style={styles.section}>
              <ThemedText style={styles.label}>Name</ThemedText>
              <Input
                label={"Name"}
                value={name}
                onChangeText={(text) => setName(text)}
              />

              <ThemedText style={styles.label}>Email</ThemedText>
              <Input
                label={"Email"}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <ThemedText style={styles.label}>Date of Birth</ThemedText>
              <TouchableOpacity
                style={styles.dateField}
                onPress={toggleDatepicker}
              >
                <ThemedText style={styles.dateText}>
                  {date.toLocaleDateString(undefined, options)}
                </ThemedText>
              </TouchableOpacity>

              {/* Date Picker */}
              {show && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onChangeDate}
                  style={{ backgroundColor: Colors.screen }}
                />
              )}

              <ThemedText style={styles.label}>Phone Number</ThemedText>
              <View style={styles.phoneContainer}>
                <CountryPicker
                  countryCode={countryCode}
                  withFlag
                  withFilter
                  onSelect={(country) => setCountryCode(country.cca2)}
                  theme={{
                    backgroundColor: "#fff",
                    fontSize: 16,
                    container: {
                      maxHeight: 300, // Limit height of the modal
                    },
                    listView: {
                      maxHeight: 200, // Restrict search results height
                    },
                    searchTextInput: {
                      fontSize: 16,
                      borderWidth: 1,
                      borderColor: "#ccc",
                      padding: 10,
                      borderRadius: 5,
                    },
                  }}
                />

                <TextInput
                  style={styles.phoneInput}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  keyboardType="phone-pad"
                  placeholder="Enter your phone number"
                />
              </View>

              <ThemedText style={styles.label}>City</ThemedText>
              <GooglePlacesAutocomplete
                placeholder="Event Location"
                disableScroll={true}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(data, details);
                  // Update state with the selected location
                  setCity(details?.formatted_address || data.description);
                }}
                query={{
                  key: "AIzaSyAJhVEJXghor3TNWfcRvUOJrfhk-n8pI3Q",
                  language: "en",
                }}
                styles={{
                  container: { flex: 1, zIndex: 1 },
                  textInputContainer: {
                    width: "100%",
                  },
                  textInput: {
                    height: 45,
                    // padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#e0e0e0",
                    marginBottom: 15,
                    paddingBottom: 5,
                    fontSize: 17,
                    backgroundColor: "none",
                    color: "white",
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                  row: {
                    backgroundColor: "#fff",
                    padding: 13,
                    height: 44,
                    flexDirection: "row",
                  },
                  listView: { zIndex: 2 },
                }}
                textInputProps={{
                  value: city, // Bind the state to the input value
                  onChangeText: (text) => setCity(text), // Update state when user types manually
                }}
              />

              <ThemedText style={styles.label}>Home Town</ThemedText>
              <GooglePlacesAutocomplete
                placeholder="Home Town"
                disableScroll={true}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(data, details);
                  // Update state with the selected location
                  setHomeTown(details?.formatted_address || data.description);
                }}
                query={{
                  key: "AIzaSyAJhVEJXghor3TNWfcRvUOJrfhk-n8pI3Q",
                  language: "en",
                }}
                styles={{
                  container: { flex: 1, zIndex: 1 },
                  textInputContainer: {
                    width: "100%",
                  },
                  textInput: {
                    height: 45,
                    // padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#e0e0e0",
                    marginBottom: 15,
                    paddingBottom: 5,
                    fontSize: 17,
                    backgroundColor: "none",
                    color: "white",
                  },
                  predefinedPlacesDescription: {
                    color: "#1faadb",
                  },
                  row: {
                    backgroundColor: "#fff",
                    padding: 13,
                    height: 44,
                    flexDirection: "row",
                  },
                  listView: { zIndex: 2 },
                }}
                textInputProps={{
                  value: homeTown, // Bind the state to the input value
                  onChangeText: (text) => setHomeTown(text), // Update state when user types manually
                }}
              />
            </ThemedView>

            <ThemedView style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setShowSection(!showSection)}
              >
                <ThemedText style={styles.sectionTitle}>
                  More About You
                </ThemedText>
                <Feather
                  name="chevron-down"
                  size={30}
                  color={
                    theme === "light" ? Colors.light.icon : Colors.dark.icon
                  }
                />
              </TouchableOpacity>

              {showSection && (
                <>
                  <ThemedText style={styles.label}>
                    Current Neighborhood
                  </ThemedText>
                  <Input
                    label={"Add your current neighborhood"}
                    value={neighborhood}
                    onChangeText={(text) => setNeighborhood(text)}
                  />

                  <ThemedText style={styles.label}>College</ThemedText>
                  <Input
                    label={"Add your college name"}
                    value={college}
                    onChangeText={(text) => setCollege(text)}
                  />

                  <ThemedText style={styles.label}>Job Title</ThemedText>
                  <Input
                    label={"Add your job title"}
                    value={jobTitle}
                    onChangeText={(text) => setJobTitle(text)}
                  />

                  <ThemedText style={styles.label}>Where You Work</ThemedText>
                  <Input
                    label={"Add your workplace"}
                    value={workplace}
                    onChangeText={(text) => setWorkplace(text)}
                  />

                  <ThemedText style={styles.label}>
                    What Are You Up To?
                  </ThemedText>
                  <Input
                    label={
                      "Tell us about yourself, your hobbies, interests, etc."
                    }
                    multiline={true}
                    height={120}
                    value={about}
                    onChangeText={setAbout}
                  />
                </>
              )}
            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
              <Btn title={"Save"} />
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 14,
    // color: Colors.gray,
  },
  formSection: {
    paddingHorizontal: 15,
    marginBottom: 50,
  },
  section: {
    // backgroundColor: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    marginTop: Platform.OS === "ios" ? 5 : 6,
    // marginBottom: 100,
  },
  backButton: {
    position: "absolute",
    left: -18,
  },
  headerText: {
    // fontSize: 25,
    // fontWeight: 'bold',
    marginLeft: 30,
    // color: Colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  phoneInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  dateField: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
    justifyContent: "center",
  },
  dateText: {
    fontSize: 18,
  },
});
