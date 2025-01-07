import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function index() {
  return (
    <>
      <Stack.Screen options={{ title: 'Welcome to Sierra' }} />
      <ImageBackground
        source={require('@/assets/images/sierra.jpeg')} // Replace with your image path
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          {/* Main Content */}
          <ThemedView style={styles.overlay}>
            <ThemedText type="title">sierra</ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>choose chance</ThemedText>
          </ThemedView>

          <ThemedView style={styles.contentContainer}>
            <Link href="/login" style={styles.button}>
              <ThemedText style={styles.buttonText}>Get Started</ThemedText>
            </Link>

            <ThemedText type="footer" style={styles.footerText}>
              By tapping 'Get Started' you agree to our{' '}
              <ThemedText style={styles.link}>Terms of Service</ThemedText>. Learn how we process
              your data in our <ThemedText style={styles.link}>Privacy Policy</ThemedText>.
            </ThemedText>
          </ThemedView>

        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: 'none'
  },
  title: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 25,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'none'
  },
  link: {
    // color: '#00f',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  contentContainer: {
    paddingBottom: 50,
    gap: 30,
    backgroundColor: 'none'
  },
});
