import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView';

export default function ImagePickerComponent({ onImageSelect }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onImageSelect(result.assets[0].uri);
        }
    };

    return (
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
                <Image source={{ uri: image }} style={styles.image} />
            ) : (
                <ThemedView style={styles.UploadButton}>
                    <ThemedText style={styles.buttonText}>Upload Image</ThemedText>
                    <FontAwesome6 name="upload" size={24} color="gray" />
                </ThemedView>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imagePicker: {
        marginTop: 15,
        borderRadius: 15,
        resizeMode: "cover",
        overflow: "hidden",
        width: "100%",
        height: 200,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: 200,
    },
    UploadButton: {
        width: "100%",
        height: 45,
        // backgroundColor: Colors.ligth,
        padding: 10,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "gray",
        fontSize: 16,
        fontWeight: "bold",
    },
});
