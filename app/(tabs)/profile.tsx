import { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Image, 
  Switch, 
  TouchableOpacity, 
  View, 
  ScrollView,
  Animated,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { 
  User, 
  Heart, 
  FileText, 
  Bell, 
  HelpCircle,
  CreditCard,
  Lock,
  XCircle,
  MessageCircle,
  LogOut,
  ChevronRight,
  Settings,
  Edit
} from 'lucide-react';

export default function ProfileScreen() {
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
  const theme = useColorScheme() ?? 'light';
  const router = useRouter();
  const isDark = theme === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => setNotificationsEnabled((previousState) => !previousState);

  const handleNavigateEditProfile = () => {
    router.push({
      pathname: '/profile/[form]',
      params: {
        event: 'Edit Profile',
      },
    });
  };

  const handleNavigateEditInterests = () => {
    router.push({
      pathname: '/interests/[form]',
      params: {
        event: 'Edit Interests',
      },
    });
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 60, 100],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const nameTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const nameScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
  });

  return (
    <ThemedView style={styles.container}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      <Animated.View style={[
        styles.header,
        { height: headerHeight }
      ]}>
        <Animated.Image
          source={require('@/assets/images/sira-notf.jpg')}
          style={[
            styles.coverImage,
            { opacity: imageOpacity }
          ]}
        />
        <View style={styles.headerContent}>
          <Animated.View style={[
            styles.profileInfo,
            { 
              transform: [
                { translateY: nameTranslateY },
                { scale: nameScale }
              ] 
            }
          ]}>
            <Image
              style={styles.profileImage}
              source={require('@/assets/images/starter-bg-01.jpg')}
            />
            <ThemedText style={styles.profileName}>Israel Kollie</ThemedText>
          </Animated.View>
          
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleNavigateEditProfile}
          >
            <Edit size={16} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={20} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* General Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>General</ThemedText>

          <TouchableOpacity style={styles.row} onPress={handleNavigateEditProfile}>
            <View style={styles.iconContainer}>
              <User size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Edit Profile</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={handleNavigateEditInterests}>
            <View style={[styles.iconContainer, { backgroundColor: "#4CAF50" }]}>
              <Heart size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Interests</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#9C27B0" }]}>
              <FileText size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Terms of Use</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>

          <View style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#FF9800" }]}>
              <Bell size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Notifications</ThemedText>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleSwitch}
              trackColor={{ false: "#767577", true: "#0c2a3f" }}
              thumbColor={isNotificationsEnabled ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#2196F3" }]}>
              <HelpCircle size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>FAQ</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Settings</ThemedText>

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#3F51B5" }]}>
              <CreditCard size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Payment Methods</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#607D8B" }]}>
              <Lock size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Change Password</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#F44336" }]}>
              <XCircle size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Delete Account</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#00BCD4" }]}>
              <MessageCircle size={18} color="#fff" />
            </View>
            <ThemedText style={styles.rowText}>Contact Support</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <View style={[styles.iconContainer, { backgroundColor: "#E91E63" }]}>
              <LogOut size={18} color="#fff" />
            </View>
            <ThemedText style={[styles.rowText, { color: '#E91E63' }]}>Log Out</ThemedText>
            <ChevronRight size={18} color={isDark ? "#8da9bc" : "#8da9bc"} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>Version 1.0.0</ThemedText>
        </View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 200,
    position: 'relative',
    overflow: 'hidden',
  },
  coverImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 60,
    backgroundColor: '#0c2a3f',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0c2a3f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rowText: {
    flex: 1,
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
  },
});