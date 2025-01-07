import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function DatePicker({ label, mode, value, onChange }) {
    const [show, setShow] = useState(false);
    const togglePicker = () => setShow((prevShow) => !prevShow);

    const theme = useColorScheme() ?? 'light';

    return (
        <ThemedView>
            <ThemedText style={styles.label}>{label}</ThemedText>
            <TouchableOpacity style={styles.dateInputContainer} onPress={togglePicker}>
                <ThemedText style={styles.dateText}>
                    {mode === "date"
                        ? value.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
                        : value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </ThemedText>
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
                    style={{ backgroundColor: theme === 'light' ? "#687076" : "#333" }}
                />
            )}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 20,
        marginBottom: 5,
    },
    dateInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        // padding: 13,
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 15,
        paddingBottom: 5,
    },
    iconContainer: {
        position: "absolute",
        right: 10,
    },
    dateText: {
        fontSize: 16,
    },
});
