import * as React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const SwitchBtn = ({ label, value, onValueChange }) => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>{label}</ThemedText>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "#BEBEBE", true: "#3B82F6" }}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingRight: 6
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
});

export default SwitchBtn;
