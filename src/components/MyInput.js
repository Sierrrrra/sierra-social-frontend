import { TextInput, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export default function MyInput({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  width = "100%", // Default width of 100% if not specified
  height = 45,
  multiline,
}) {

  return (
    <View style={[styles.container, { width, height }]}>
      <TextInput
        placeholder={label}
        style={{ fontSize: 16, }}
        value={value}
        multiline={multiline}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    padding: 10,
    backgroundColor: Colors.ligth,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
});
