import { createStackNavigator } from "@react-navigation/stack";

import StackNav from "./StackNav";
import Login from "../screens/authScreens/Login";
import Signup from "../screens/authScreens/Signup";

import NameScreen from "../screens/onboardingScreens/NameScreen";
import EmailScreen from "../screens/onboardingScreens/EmailScreen";
import PhoneNumberScreen from "../screens/onboardingScreens/PhoneNumberScreen";
import UsernameScreen from "../screens/onboardingScreens/UsernameScreen";
import DOBScreen from "../screens/onboardingScreens/DOBScreen";
import HomeTownScreen from "../screens/onboardingScreens/HomeTownScreen";
import CityScreen from "../screens/onboardingScreens/CityScreen";

import FirstStartupScreen from "../screens/startupScreens/FirstStartupScreen";
import SecondStartupScreen from "../screens/startupScreens/SecondStartupScreen";
import ThirdStartupScreen from "../screens/startupScreens/ThirdStartupScreen";
import GetStartedScreen from "../screens/startupScreens/GetStartedScreen";


const Auth = createStackNavigator();

export default function AuthStack() {
    return (
        <Auth.Navigator
            initialRouteName="first"
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* Auth */}
            <Auth.Screen name="Login" component={Login} />
            <Auth.Screen name="Signup" component={Signup} />

            {/* Onboarding Screens */}
            <Auth.Screen name="Name" component={NameScreen} />
            <Auth.Screen name="Username" component={UsernameScreen} />
            <Auth.Screen name="Email" component={EmailScreen} />
            <Auth.Screen name="DOB" component={DOBScreen} />
            <Auth.Screen name="PhoneNumber" component={PhoneNumberScreen} />
            <Auth.Screen name="Town" component={HomeTownScreen} />
            <Auth.Screen name="City" component={CityScreen} />

            {/*  Starter Screens*/}
            <Auth.Screen name="first" component={FirstStartupScreen} />
            <Auth.Screen name="GetStarted" component={GetStartedScreen} />
            <Auth.Screen name="second" component={SecondStartupScreen} />
            <Auth.Screen name="third" component={ThirdStartupScreen} />

            {/* Temporary Navigate to Home */}
            <Auth.Screen name="onHome" component={StackNav} />
        </Auth.Navigator>
    );
}
