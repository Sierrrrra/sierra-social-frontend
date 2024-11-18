import "react-native-gesture-handler";

// Patch for crypto.getRandomValues in Expo
import * as Crypto from 'expo-crypto';

if (!global.crypto) {
  global.crypto = {
    getRandomValues: (buffer) => Crypto.getRandomValues(buffer),
  };
}

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./src/navigation/AuthStack";
import store from './src/store/configureStore'


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
}

