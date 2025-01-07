import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function Btn({ title, onPress, width = "100%", }) {
    const theme = useColorScheme() ?? 'light';
  return (
    <TouchableOpacity style={[styles.button, { width, backgroundColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon }]} onPress={onPress}>
      <ThemedText style={styles.buttonText}>{title}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // width: "100%",
    height: 50,
    // backgroundColor: '#0c2a3f',
    padding: 10,
    // margin: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    // color: Colors.light.icon,
    fontSize: 16,
    fontWeight: "bold",
  },
});
