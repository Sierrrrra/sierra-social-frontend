import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default SocialButton = ({ icon, label, onPress, style }) => (
    <Pressable style={[styles.socialButton, style]} onPress={onPress}>
        {icon}
        <Text style={styles.socialButtonText}>{label}</Text>
    </Pressable>
);
const styles = StyleSheet.create({
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
});