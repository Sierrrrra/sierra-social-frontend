import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 150;
const DEFAULT_FONT_SIZE = 24;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
  headerBackgroundColor?: { dark: string; light: string };
  headerTitle?: string;
  headerTitleFontSize?: number;
  headerIcon?: ReactElement;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerTitle,
  headerTitleFontSize = DEFAULT_FONT_SIZE,
  headerIcon,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <Animated.View
          style={[
            styles.header,
            headerBackgroundColor
              ? { backgroundColor: headerBackgroundColor[colorScheme] }
              : {},
            headerAnimatedStyle,
          ]}
        >
          {headerImage && headerImage}
          {headerTitle && (
            <Text
              style={[
                styles.headerTitle,
                { fontSize: headerTitleFontSize },
                { flexShrink: 1, maxWidth: "70%" }, // Prevent title from overflowing
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {headerTitle}
            </Text>
          )}
          {headerIcon && <View style={styles.headerIcon}>{headerIcon}</View>}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "left",
    // fontStyle: "italic",
    fontFamily: "LiberRegular",
    // fontFamily: "Inter_600SemiBold",
  },
  headerIcon: {
    position: "absolute",
    right: 15,
    top: 60,
  },
  content: {
    flex: 1,
    padding: 15,
    paddingTop: 10,
    gap: 16,
    overflow: "visible",
  },
});
