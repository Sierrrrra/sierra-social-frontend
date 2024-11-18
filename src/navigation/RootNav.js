import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNav from "./StackNav";
// import DrawerNav from "./DrawerNav";
import AuthStack from "./AuthStack";
import { useSelector, useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreToken } from "../features/auth/auth";
import Splash from "../screens/Splash";

export default function RootNav() {
  const { userToken, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(userToken);

  useEffect(() => {
    getValue();
  }, []);

  // Get token value from AsynStorage
  async function getValue() {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        console.log("data restored", value);
        dispatch(restoreToken(value));
      } else {
        console.log("No Data");
        dispatch(restoreToken(null));
      }
    } catch (e) {
      console.log(e);
    }
  }

  // Load Splash Screen
  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {userToken ? <StackNav /> : <AuthStack />}
    </NavigationContainer>
  );
}
