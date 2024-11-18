// import { View, Text, Button } from "react-native";
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '../constants/colors';

export default function ProfileScreen({ navigation }) {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={require("../../assets/memojis/5.png")} // Replace with actual profile image URL
        />
        <View>
          <Text style={styles.profileName}>Israel Kollie</Text>
          <Text style={styles.profileEmail}>israelkollie@gmail.com</Text>
        </View>

      </View>

      {/* General Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("EditProfile")}>
          <Feather name="user" size={20} color={Colors.primary} />
          <Text style={styles.rowText}>Edit Profile</Text>
          <Feather name="chevron-right" size={20} color="#BEBEBE" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Feather name="lock" size={20} color={Colors.primary} />
          <Text style={styles.rowText}>Change Password</Text>
          <Feather name="chevron-right" size={20} color="#BEBEBE" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Feather name="file-text" size={20} color={Colors.primary} />
          <Text style={styles.rowText}>Terms of Use</Text>
          <Feather name="chevron-right" size={20} color="#BEBEBE" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Feather name="credit-card" size={20} color={Colors.primary} />
          <Text style={styles.rowText}>Add Card</Text>
          <Feather name="chevron-right" size={20} color="#BEBEBE" />
        </TouchableOpacity>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.row}>
          <Feather name="bell" size={20} color={Colors.primary} />
          <Text style={styles.rowText}>Notification</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: "#BEBEBE", true: "#3B82F6" }}
          />
        </View>
        <TouchableOpacity style={styles.row}>
          <Feather name="info" size={20} color={Colors.primary} />
          <Text style={styles.rowText}>FAQ</Text>
          <Feather name="chevron-right" size={20} color="#BEBEBE" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Feather name="log-out" size={20} color="#FF4C4C" />
          <Text style={[styles.rowText, { color: '#FF4C4C' }]}>Log Out</Text>
          <Feather name="chevron-right" size={20} color="#BEBEBE" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 15,
    gap: 20,
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
  section: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
});

// export default ProfileScreen;