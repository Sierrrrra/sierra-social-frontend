import { useState } from 'react';
import { StyleSheet, Image, Platform, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();

  const toggleSwitch = () => setNotificationsEnabled((previousState) => !previousState);

  const handleNavigateEditProfile = () => {
    router.push({
        pathname: '/profile/[form]',
        params: {
            event: 'Edit Profile', // Dynamic parameter for the event
            // data: JSON.stringify(event), // Serialized event data
        },
    });
};

const handleNavigateEditInterests = () => {
  router.push({
      pathname: '/interests/[form]',
      params: {
          event: 'Edit Interests', // Dynamic parameter for the event
          // data: JSON.stringify(event), // Serialized event data
      },
  });
};

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/sira-notf.jpg')}
          style={styles.reactLogo}
        />
      }
      headerTitle="Israel Kollie"
      headerTitleFontSize={50}
      >
      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView> */}

      {/* Profile Header */}
      {/* <ThemedView style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={require('@/assets/images/memojis/5.png')}
        />
        <ThemedView>
          <ThemedText style={styles.profileName}>Israel Kollie</ThemedText>
        </ThemedView>
      </ThemedView> */}

      {/* General Settings */}
      <ThemedView style={{paddingBottom: 50}}>
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>General</ThemedText>

        <TouchableOpacity style={styles.row} onPress={handleNavigateEditProfile}>
          <Feather name="user" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Edit Profile</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={handleNavigateEditInterests}>
          <Ionicons name="happy-outline" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Interests</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Feather name="file-text" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Terms of Use</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>

        <ThemedView style={styles.row}>
          <Feather name="bell" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Notification</ThemedText>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: theme === 'light' ? Colors.light.icon : Colors.dark.icon, true: '#3B82F6' }}
          />
        </ThemedView>

        <TouchableOpacity style={styles.row}>
          <Feather name="info" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>FAQ</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>
      </ThemedView>

      {/* Settings */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Settings</ThemedText>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="card-outline" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Card</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="lock-closed-outline" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Change Password</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="close-circle-outline" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Delete Account</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Ionicons name="help-circle-outline" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
          <ThemedText style={styles.rowText}>Contact Team</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Feather name="log-out" size={20} color="#FF4C4C" />
          <ThemedText style={[styles.rowText, { color: '#FF4C4C' }]}>Log Out</ThemedText>
          <Feather name="chevron-right" size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>
      </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  profileHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 15,
    gap: 20,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    // backgroundColor: '#FFF',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#353636',
  },
  rowText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
