import * as React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

const SwitchButton = ({ label, value, onValueChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "#BEBEBE", true: "#3B82F6" }}
            />
        </View>
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

export default SwitchButton;
