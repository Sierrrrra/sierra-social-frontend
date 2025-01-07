import { useState, useLayoutEffect } from 'react';
import { StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform, Pressable, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useGlobalSearchParams, useRouter } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import Input from '@/components/Input';
import Btn from '@/components/Btn';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function EditProfileScreen() {
  const [name, setName] = useState("Israel Kollie");
  const [email, setEmail] = useState("israelkollie@gmail.com");
  const [username, setUsername] = useState("israel501");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [homeTown, setHomeTown] = useState("");
  const [neighborhood, setNeighborhood] = useState('');
  const [college, setCollege] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [about, setAbout] = useState('');

  const [showSection, setShowSection] = useState(false);
  const theme = useColorScheme() ?? 'light';
  const navigation = useNavigation();
  const router = useRouter();

  const { event } = useGlobalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F7F8FA', dark: '#1A1A1A' }}
      headerImage={
        <Image
          source={require('@/assets/images/sira-notf.jpg')}
          style={styles.reactLogo}
        />
      }
      headerTitle="Israel Kollie"
      headerTitleFontSize={50}
      >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90} // Adjust this value as needed
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
        <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Entypo name="chevron-small-left" size={50} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>
        <ThemedText type='title' style={styles.headerText}>{event}</ThemedText>
      </ThemedView>
          {/* <ThemedView style={styles.profileHeader}>
            <ThemedText style={styles.profileName}>{name}</ThemedText>
            <ThemedText style={styles.profileEmail}>{email}</ThemedText>
          </ThemedView> */}

          <ThemedView style={styles.formSection}>
            <ThemedView style={styles.section}>
              {/* <ThemedText style={styles.sectionTitle}>Basic Information</ThemedText> */}

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
              <Input
                label={"Add your date of birth"}
                value={dob}
                onChangeText={(text) => setDob(text)}
              />

              <ThemedText style={styles.label}>Phone Number</ThemedText>
              <Input
                label={"Add your phone number"}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
              />

              <ThemedText style={styles.label}>City</ThemedText>
              <Input
                label={"Add your city"}
                value={city}
                onChangeText={(text) => setCity(text)}
              />

              <ThemedText style={styles.label}>Home Town</ThemedText>
              <Input
                label={"Add your home town"}
                value={homeTown}
                onChangeText={(text) => setHomeTown(text)}
              />
            </ThemedView>

            <ThemedView style={styles.section}>
              <Pressable
                style={styles.sectionHeader}
                onPress={() => setShowSection(!showSection)}
              >
                <ThemedText style={styles.sectionTitle}>More About You</ThemedText>
                <Feather name="chevron-down" size={30} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
              </Pressable>

              {showSection && (
                <>
                  <ThemedText style={styles.label}>Current Neighborhood</ThemedText>
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

                  <ThemedText style={styles.label}>What Are You Up To?</ThemedText>
                  <Input
                    label={"Tell us about yourself, your hobbies, interests, etc."}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 6,
    // marginBottom: 100,
  },
  backButton: {
    position: 'absolute',
    left: -18,
  },
  headerText: {
    // fontSize: 25,
    // fontWeight: 'bold',
    marginLeft: 30
    // color: Colors.primary,
  },
});
