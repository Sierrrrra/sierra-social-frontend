import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

import ProgressBar from "@/components/ProgressBar";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { signupUser } from "@/redux/authSlice";

export default function UserPermissionScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { loading, error } = useSelector((state) => state.auth);
  const signupData = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const theme = useColorScheme() ?? "light";

  const [locationGranted, setLocationGranted] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationGranted(true);
        // Alert.alert("Success", "Location access granted!");
      } else {
        Alert.alert(
          "Permission Denied",
          "Location access is required for this feature."
        );
      }
    } catch (error) {
      console.error("Error requesting location permission:", error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        setNotificationsGranted(true);
        // Alert.alert("Success", "Notifications enabled!");
      } else {
        Alert.alert(
          "Permission Denied",
          "Notification access is required for this feature."
        );
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const handleNext = async () => {
    if (!locationGranted || !notificationsGranted) {
      Alert.alert(
        "Permissions Required",
        "Please enable location and notification permissions to continue."
      );
      return;
    }

    const response = await dispatch(signupUser(signupData));

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "(tabs)" }],
      })
    );

    // if (response.payload?.success) {
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{ name: '(tabs)' }],
    //     })
    //   );
    // }
  };

  return (
    <ThemedView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ThemedView style={styles.content}>
        <ThemedView>
          <ThemedView style={styles.headerContainer}>
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Entypo
                name="chevron-small-left"
                size={45}
                color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
              />
            </TouchableOpacity>
            <ThemedText style={styles.headerText}>Finishing Up</ThemedText>
          </ThemedView>

          {/* ProgressBar */}
          <ProgressBar progress={1} />

          <ThemedText type="title">Set some permissions</ThemedText>

          <ThemedText type="info">
            We use your location to ensure you see hangouts and other users in
            your area.
          </ThemedText>
          <TouchableOpacity
            style={[
              styles.button,
              locationGranted && { backgroundColor: "#0c2a3f" },
            ]}
            onPress={requestLocationPermission}
          >
            <ThemedText style={styles.buttonText}>
              {locationGranted
                ? "Location Access Granted"
                : "Allow Location Services"}
            </ThemedText>
          </TouchableOpacity>

          <ThemedText style={[styles.description, { marginTop: 50 }]}>
            Enable notifications to get updated about new hangouts, messages,
            and other activity.
          </ThemedText>
          <TouchableOpacity
            style={[
              styles.button,
              notificationsGranted && { backgroundColor: "#0c2a3f" },
            ]}
            onPress={requestNotificationPermission}
          >
            <ThemedText style={styles.buttonText}>
              {notificationsGranted
                ? "Notifications Enabled"
                : "Enable Notifications"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {loading && <ActivityIndicator size="large" />}
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}

        {/* Next Button */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: "#0c2a3f",
            },
          ]}
          onPress={handleNext}
        >
          <FontAwesome name="chevron-right" size={24} color="#fff" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  italicText: {
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    //   color: "#6c6c6c",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0c2a3f",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 20 : 20,
    marginBottom: 100,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    //   color: Colors.primary,
  },
  backButton: {
    position: "absolute",
    left: -10,
  },
  nextButton: {
    alignSelf: "center",
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  error: {
    color: "red",
    marginBottom: 10,
    alignSelf: "center",
  },
});
