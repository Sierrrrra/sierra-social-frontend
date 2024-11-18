import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import ImagePickerComponent from "../components/ImagePickerComponent";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "../constants/colors";
import SwitchButton from "../components/SwitchButton";
import GooglePlacesInput from "../components/GooglePlacesInput";
import LocationSearch from "../components/LocationSearch";



export default function AddEventScreen() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());

  const [isFreeEvent, setIsFreeEvent] = useState(true);
  const [eventCost, setEventCost] = useState("");

  const [location, setLocation] = useState(""); // To store the location name
  const [latLng, setLatLng] = useState({}); // To store latitude and longitude

  const handleLocationSelect = (data, details) => {
    // When the user selects a location, set it in state
    setLocation(data.description);
    setLatLng({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
  };

  const handleCreateEvent = () => {
    console.log("Event created!");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    // keyboardVerticalOffset={90} // Adjust this value as needed
    >
      <ScrollView showsVerticalScrollIndicator={false} >
        <Text style={styles.label}>Event Title</Text>
        <MyInput label={"Enter event title"} />

        <Text style={styles.label}>Location</Text>
        <LocationSearch onLocationSelect={handleLocationSelect} />

        <Text style={styles.label}>Summary</Text>
        <MyInput label={"Brief summary of the event"} multiline={true} height={70} />

        <DateTimePickerComponent label="Start Date" mode="date" value={startDate} onChange={setStartDate} />
        <DateTimePickerComponent label="End Date" mode="date" value={endDate} onChange={setEndDate} />
        <DateTimePickerComponent label="Time" mode="time" value={eventTime} onChange={setEventTime} />

        {/* Switch to toggle Free Event */}
        <View style={styles.switchContainer}>
          <SwitchButton
            label={"Free Event"}
            value={isFreeEvent}
            onValueChange={setIsFreeEvent}
          />

          {!isFreeEvent && (
            <>
              <MyInput
                label={"Event Cost"}
                value={eventCost}
                onChangeText={setEventCost}
                keyboardType="numeric"
              />
            </>
          )}
        </View>

        <Text style={styles.label}>Details</Text>
        <MyInput label={"Enter event details"} multiline={true} height={120} />

        <ImagePickerComponent onImageSelect={(uri) => console.log("Selected image:", uri)} />
      </ScrollView>

      <View style={{ paddingTop: 10 }}>
        <MyButton title={"Create Event"} onPress={handleCreateEvent} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
  switchContainer: {
    marginTop: 15,
    borderColor: "#eee",
  },
});
