import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Colors } from "../constants/colors";
import Home from "../screens/Home";
import Contact from "../screens/Contact";
import ContactRedux from "../screens/ContactRedux";

const Tab = createMaterialTopTabNavigator();

export default function TopNav() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { color: Colors.secondary },
                tabBarIndicatorStyle: { backgroundColor: Colors.primary }
            }}
            // tabBarPosition="bottom"
            initialRouteName="Home"
        >
            {/* <Tab.Screen name="Home" component={Home} /> */}
            <Tab.Screen name="Contact" component={Contact} />
            <Tab.Screen name="Redux" component={ContactRedux} />
        </Tab.Navigator>
    )
}