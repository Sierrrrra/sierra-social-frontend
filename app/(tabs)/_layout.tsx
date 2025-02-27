import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { BlurView } from "expo-blur";

import { HapticTab } from "@/components/HapticTab";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

// Icons
import { Home, Calendar, Bell, User, Search } from "lucide-react";

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0c2a3f",
        tabBarInactiveTintColor: isDark ? "#8da9bc" : "#8da9bc",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <BlurView 
            intensity={80} 
            tint={isDark ? "dark" : "light"}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0 
            }}
          />
        ),
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            height: 80,
            paddingBottom: 20,
            borderTopWidth: 0,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          default: {
            height: 70,
            paddingBottom: 10,
            borderTopWidth: 0,
            elevation: 10,
            backgroundColor: isDark ? "rgba(20, 20, 20, 0.9)" : "rgba(255, 255, 255, 0.9)",
          },
        }),
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: -5,
          fontWeight: "500",
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Search size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <Calendar size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color, size }) => (
            <Bell size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User size={24} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}