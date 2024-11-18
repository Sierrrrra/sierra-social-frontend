import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Pressable, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { globalStyles } from "../../styles/global";
import { signIn } from "../../features/auth/auth";
import { Colors } from "../../constants/colors";
import LoginInput from "../../components/LoginInput";
import SocialButton from "../../components/SocialButton";

export default function Login({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [emailError, setEmailError] = useState("");
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const dispatch = useDispatch();

    const saveToken = async (value) => {
        try {
            await AsyncStorage.setItem("@token", value);
            dispatch(signIn(value));
            console.log("Token saved");
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogin = () => {
        navigation.navigate("onHome");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <View style={styles.formContainer}>
                    <LoginInput
                        iconName="user"
                        placeholder="Email"
                        value={credentials.email}
                        onChangeText={(val) => setCredentials({ ...credentials, email: val })}
                        keyboardType="email-address"
                    />
                    <LoginInput
                        iconName="lock"
                        placeholder="Password"
                        value={credentials.password}
                        onChangeText={(val) => setCredentials({ ...credentials, password: val })}
                        secureTextEntry={passwordVisible}
                        onToggleVisibility={() => setPasswordVisible((prev) => !prev)}
                    />

                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <TouchableOpacity
                        style={{ alignSelf: "flex-end" }}
                        onPress={() => console.log("forget Password")}
                    >
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogin} style={globalStyles.primaryBtn}>
                        <Text style={globalStyles.primaryBtnText}>Sign In</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>Or</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <SocialButton
                            icon={<Image source={require("../../../assets/googleLogo.png")}
                                style={styles.socialIcon} />}
                            label="Google"
                            style={styles.googleButton}
                            onPress={() => console.log("Google login")}
                        />
                        <SocialButton
                            icon={<FontAwesome5 name="facebook-f" size={24} color="#000" style={styles.socialIcon} />}
                            label="Facebook"
                            style={styles.appleButton}
                            onPress={() => console.log("Apple login")}
                        />
                    </View>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("GetStarted")}>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    formContainer: {
        width: "80%",
        alignItems: "center",
    },

    forgotPassword: {
        color: Colors.primary,
        fontWeight: "500",
        marginBottom: 20,
    },
    signupContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    signupText: {
        color: "#666",
    },
    signupLink: {
        color: Colors.primary,
        fontWeight: "bold",
        textDecorationLine: "underline",
        marginLeft: 5,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#ddd",
    },
    orText: {
        marginHorizontal: 10,
        color: "#888",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
    socialButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 44,
        width: "50%",
        borderRadius: 10,
        marginVertical: 5,
    },
    socialButtonText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000",
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    googleButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
    },
    appleButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
    },
});
