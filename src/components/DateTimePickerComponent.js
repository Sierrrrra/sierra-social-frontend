import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function DateTimePickerComponent({ label, mode, value, onChange }) {
    const [show, setShow] = useState(false);
    const togglePicker = () => setShow((prevShow) => !prevShow);

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity style={styles.dateInputContainer} onPress={togglePicker}>
                <Text style={styles.dateText}>
                    {mode === "date"
                        ? value.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
                        : value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
                <Entypo name={mode === "date" ? "calendar" : "clock"} size={20} color="gray" style={styles.iconContainer} />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={value}
                    mode={mode}
                    display={label === "Time" ? "spinner" : "inline"}
                    onChange={(event, selectedDate) => {
                        onChange(selectedDate || value);
                        setShow(false);
                    }}
                    style={{ backgroundColor: "#fff" }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 10,
        marginBottom: 5,
    },
    dateInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 13,
        backgroundColor: Colors.ligth,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#eee",
    },
    iconContainer: {
        position: "absolute",
        right: 10,
    },
    dateText: {
        fontSize: 16,
    },
});
