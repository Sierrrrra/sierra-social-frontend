import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function MyInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  width = '100%',
  height = 50,
  multiline,
  Ionicons,
}) {
    const theme = useColorScheme() ?? 'light';
  return (
    <ThemedView style={[styles.inputRow, { width, height }, {borderBottomColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]}>
      {/* Render the icon if passed */}
      {Ionicons && <ThemedView style={styles.iconContainer}>{Ionicons}</ThemedView>}

      <TextInput
        placeholder={label}
        placeholderTextColor={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        style={[styles.textInput, {color: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]}
        value={value}
        multiline={multiline}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    // borderBottomColor: Colors.primary,
    marginBottom: 15,
    paddingBottom: 5,
  },
  iconContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    // color: Colors.text,
  },
});
