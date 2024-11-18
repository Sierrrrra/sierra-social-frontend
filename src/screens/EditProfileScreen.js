import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { globalStyles } from "../styles/global";
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '../constants/colors';
import MyInput from '../components/MyInput';

export default function EditProfileScreen() {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.profileHeader}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/memojis/5.png")} // Replace with actual profile image URL
          />
          <Text style={styles.profileName}>Israel Kollie</Text>
          <Text style={styles.profileEmail}>israelkollie@gmail.com</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Name</Text>
          <MyInput label={"Israel Kollie"} />

          <Text style={styles.label}>Email</Text>
          <MyInput label={"israelkollie@gmail.com"} />

          <Text style={styles.label}>Date of Birth</Text>
          <MyInput label={"May 18, 2000"} />

          <Text style={styles.label}>Phone Number</Text>
          <MyInput label={"555 1234 679"} />

          <Text style={styles.label}>City</Text>
          <MyInput label={"Madrid"} />

          <Text style={styles.label}>Home Town</Text>
          <MyInput label={"Madrid"} />

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  profileHeader: {
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  formSection: {
    padding: 20,
    backgroundColor: "#fff",
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 5,
  },
});
