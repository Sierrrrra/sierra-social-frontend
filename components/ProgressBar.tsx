import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const ProgressBar = ({ progress }) => {
    const theme = useColorScheme() ?? 'light';
    return (
        <ThemedView style={styles.progressBar}>
            <ThemedView style={[styles.progressFilled, { flex: progress }, {backgroundColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]} />
            <ThemedView style={[styles.progressEmpty, { flex: 1 - progress }]} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    progressBar: {
        flexDirection: 'row',
        height: 7,
        borderRadius: 2,
        marginBottom: 50,
    },
    progressFilled: {
        // backgroundColor: Colors.primary,
        borderRadius: 2,
    },
    progressEmpty: {
        // backgroundColor: Colors.gray3,
        borderRadius: 2,
    },
});

export default ProgressBar;
