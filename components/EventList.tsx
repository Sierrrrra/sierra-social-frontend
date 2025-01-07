import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
    TouchableWithoutFeedback,
    Button
  } from "react-native";
  import { Entypo, Ionicons, Feather, FontAwesome } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  import { ThemedText } from "@/components/ThemedText";
  import { useColorScheme } from "@/hooks/useColorScheme";
  
  export default function EventList({ event }) {
    const theme = useColorScheme() ?? "light";
    const router = useRouter();
  
    const handleNavigate = () => {
      router.push({
        pathname: "/event/[event]",
        params: {
          event: event.id,
          data: JSON.stringify(event),
        },
      });
    };
  
    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: theme === "light" ? "#fff" : "#333" },
        ]}
        onPress={handleNavigate}
        activeOpacity={1}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            style={styles.userAvatar}
            source={require("@/assets/images/user.png")}
          />
          <View style={styles.headerText}>
            <ThemedText style={styles.userName}>{event.creator}</ThemedText>
            <ThemedText style={styles.timeAgo}>32 min ago</ThemedText>
          </View>
        </View>
  
        {/* Post Content */}
        <ThemedText type="title" style={styles.postTitle}>
          {event.title}
        </ThemedText>
        <View style={styles.infoRow}>
          <Ionicons name="location-sharp" size={18} color="gray" />
          <ThemedText style={styles.infoText}>{event.location}</ThemedText>
        </View>
        <View style={styles.infoRow}>
          <Feather name="clock" size={18} color="gray" />
          <ThemedText style={styles.infoText}>{event.time}</ThemedText>
        </View>
        <ThemedText style={styles.postDescription}>{event.summary}</ThemedText>
  
        {/* Image */}
        <Image
          style={styles.postImage}
          source={require("@/assets/images/search-events.jpg")}
        />
  
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <FontAwesome name="users" size={20} color="gray" />
            <ThemedText style={styles.footerText}>
              <ThemedText style={{ fontWeight: "bold" }}>10+ </ThemedText>
              Joined
            </ThemedText>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.footerButton}>
            <FontAwesome name="bookmark-o" size={20} color="gray" />
            <ThemedText style={styles.footerText}>Save</ThemedText>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.footerButton} onPress={handleNavigate}>
            <Entypo name="plus" size={20} color="gray" />
            <ThemedText style={styles.footerText}>Join</ThemedText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      marginVertical: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      padding: 15,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    userAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    headerText: {
      marginLeft: 10,
    },
    userName: {
      fontSize: 16,
      fontWeight: "bold",
      // color: "#A9A9A9",
    },
    timeAgo: {
      fontSize: 12,
      // color: "gray",
    },
    postTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      // color: "#A9A9A9",
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    infoText: {
      fontSize: 14,
      // color: "gray",
      marginLeft: 5,
    },
    postDescription: {
      fontSize: 14,
      // color: "gray",
      marginBottom: 10,
    },
    postImage: {
      width: "100%",
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: "#eee",
    },
    footerButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    footerText: {
      fontSize: 14,
      // color: "gray",
      marginLeft: 5,
    },
  });
  