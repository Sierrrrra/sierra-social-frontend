import { View, Text, Button } from "react-native";
import { globalStyles } from "../../styles/global";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";


export default function Signup({ navigation }) {
    return (
        <View style={globalStyles.screenContainer}>
            <Text style={globalStyles.title}>Sign Up</Text>
            <MyInput label={"Email"} />
            <MyInput label={"Password"} />
            <MyButton title={"Sign Up"} />
            <MyButton title={"Log In"}
                onPress={() => navigation.navigate("Login")}
            />

        </View>
    )
}