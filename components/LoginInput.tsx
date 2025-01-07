import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function LoginInput ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  onToggleVisibility,
}) {
    const theme = useColorScheme() ?? 'light';
    return (
            <ThemedView style={[styles.inputWrapper, {borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]}>
              <Icon name={iconName} size={20} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} style={styles.icon} />
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={[styles.input, {color: theme === 'light' ? Colors.light.icon : Colors.dark.icon}]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
              />
              {onToggleVisibility && (
                <TouchableOpacity onPress={onToggleVisibility}>
                  <Icon
                    name={secureTextEntry ? 'eye' : 'eye-slash'}
                    size={20}
                    color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}
            </ThemedView>
    )
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#0c2a3f',
    borderRadius: 10,
    width: '100%',
    backgroundColor: 'none'
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    // color: '#333',
    paddingVertical: 10,
  },
});
