import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default LoginInput = ({ iconName, placeholder, value, onChangeText, secureTextEntry, keyboardType, onToggleVisibility }) => (
    <View style={styles.inputWrapper}>
        <Icon name={iconName} size={20} color="#000" style={styles.icon} />
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="gray"
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
        />
        {onToggleVisibility && (
            <TouchableOpacity onPress={onToggleVisibility}>
                <Icon name={secureTextEntry ? "eye" : "eye-slash"} size={20} color="gray" style={styles.icon} />
            </TouchableOpacity>
        )}
    </View>
);
const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 10,
        // paddingHorizontal: 10,
        width: "100%",
    },
    icon: {
        padding: 10,
    },
    input: {
        flex: 1,
        color: "#333",
        paddingVertical: 10,
    },
});