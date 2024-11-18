import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import BottomNav from "./BottomNav";
import { Colors } from "../constants/colors";
import EventScreen from "../screens/EventScreen";
import AddEventScreen from "../screens/AddEventScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const HomeStack = createStackNavigator();

export default function StackNav() {
  const myConfig = {
    headerShown: false,
    headerTitleAlign: "center",
    // presentation: 'modal',
    animationEnabled: true,
    gestureEnabled: true, //Defaults to true on iOS, false on Android.
    animationTypeForReplace: "push", //The type of animation to use when this screen replaces another screen
    keyboardHandlingEnabled: true, //the keyboard will NOT automatically dismiss when navigating to a new screen from this screen. Defaults to true.
    // headerBackTitle: false

    // custom header
    // header: ({ navigation, route, options, back }) => (
    //     <CustomHeader title={route.name} />
    // ),
    // cardStyle: { backgroundColor: 'red' },
  };

  // Custom Nav Header
  function CustomHeader({ title }) {
    return (
      <View
        style={{
          height: 80,
          width: "100%",
          backgroundColor: Colors.secondary,
          padding: 10,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: Colors.ligth,
          }}
        >
          {title}
        </Text>
      </View>
    );
  }

  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={myConfig}>
      <HomeStack.Screen
        name="HomeTab"
        component={BottomNav}
        options={{ headerBackTitle: "Home" }}
      />
      <HomeStack.Screen
        name="EventDetails"
        component={EventScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          title: "Event Details",
        }}
      />
      <HomeStack.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          title: "Create Event",
        }}
      />
      <HomeStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          title: "Edit Profile",
        }}
      />
    </HomeStack.Navigator>
  );
}
