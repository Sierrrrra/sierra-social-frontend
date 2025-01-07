import 'react-native-get-random-values';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import 'react-native-reanimated';
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

import { useColorScheme } from '@/hooks/useColorScheme';
import store from '@/redux/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          {/* <Stack.Screen name="event" options={{ headerShown: false }} /> */}
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="signup/email" options={{ headerShown: false }} />
          <Stack.Screen name="signup/password" options={{ headerShown: false }} />
          <Stack.Screen name="signup/interests" options={{ headerShown: false }} />
          <Stack.Screen name="signup/permission" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        </GestureHandlerRootView>
      </ThemeProvider>
    </Provider>
  );
}
