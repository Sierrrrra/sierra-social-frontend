import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from '@react-native-community/datetimepicker';

import MyButton from "../../components/MyButton";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { Colors } from "../../constants/colors";

export default function DOBScreen() {
  const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // const timeOptions = {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // };

  const onChange = (event, selectedDate) => {
    if (mode === "date") {
      setDate(selectedDate || date);
    } else if (mode === "time") {
      setTime(selectedDate || time);
    }

    if (Platform.OS === 'android') {
      setShow(false);
    }
  };

  const toggleDatepicker = () => {
    setMode("date");
    setShow((prevShow) => !prevShow);
  };

  // const toggleTimepicker = () => {
  //   setMode("time");
  //   setShow((prevShow) => !prevShow);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name="chevron-small-left" size={40} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={{ gap: 7 }}>
          <Text style={styles.title}>What's your birthday?</Text>
          <Text style={styles.subtitle}>Choose your date of birth</Text>
        </View>

        {/* Date Picker Field */}
        <TouchableOpacity style={styles.datefield} onPress={toggleDatepicker}>
          <Text style={styles.dateText}>
            {date.toLocaleDateString(undefined, options)}
          </Text>
        </TouchableOpacity>

        {/* Time Picker Field
        <TouchableOpacity style={styles.datefield} onPress={toggleTimepicker}>
          <Text style={styles.dateText}>
            {time.toLocaleTimeString([], timeOptions)}
          </Text>
        </TouchableOpacity> */}

        <MyButton title={"Next"} onPress={() => navigation.navigate("PhoneNumber")} />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="spinner"
            onChange={onChange}
            style={{ backgroundColor: "#fff" }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    color: "gray",
  },
  datefield: {
    height: 45,
    justifyContent: "center",
    padding: 10,
    backgroundColor: Colors.ligth,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  dateText: {
    fontSize: 18,
  },
});
