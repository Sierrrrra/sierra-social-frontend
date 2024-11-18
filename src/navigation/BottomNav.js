import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome6, FontAwesome5, Feather } from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

import Home from "../screens/Home";
import ProfileScreen from "../screens/ProfileScreen";
import AddEventScreen from "../screens/AddEventScreen";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" size={22} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="AddEvent"
        component={AddEventScreen}
        options={{
          title: "Add Event",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="add" size={24} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
