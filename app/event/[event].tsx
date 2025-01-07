import React, { useLayoutEffect } from 'react';
import { StyleSheet, Image, Platform, Share, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, useRouter } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";

import Btn from '@/components/Btn';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';
  const router = useRouter()

  const { event, data } = useGlobalSearchParams();
    // const { event } = route.params;
    const eventObject = data ? JSON.parse(data) : null;
    console.log(event)
    console.log(eventObject)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleShare = async () => {
    const eventLink = `https://sierra.com/event/${eventObject.id}`; // Temp event link

    try {
      const result = await Share.share({
        message: `Check out this event: ${eventObject.title}\n\nLink: ${eventLink}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing event:", error.message);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/event.jpeg')}
          style={styles.reactLogo}
        />
      }
      >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Entypo name="chevron-small-left" size={50} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>
        <ThemedText type='title' style={styles.headerText}>{eventObject.title}</ThemedText>
      </ThemedView>

      {/* <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{eventObject.title}</ThemedText>
      </ThemedView> */}
      <ThemedText>{eventObject.details}</ThemedText>
      <ThemedText type="defaultSemiBold">Host: {eventObject.creator}</ThemedText>
      <ThemedText type="defaultSemiBold">Event Date: {eventObject.date}</ThemedText>
      <ThemedText type="defaultSemiBold">Time: {eventObject.time}</ThemedText>
      <ThemedText type="defaultSemiBold">Location: {eventObject.location}</ThemedText>
      {/* <Collapsible title="Host">
        <ThemedText type="defaultSemiBold">{eventObject.creator}</ThemedText>
      </Collapsible> */}
      {/* <Collapsible title="Event Date">
        <ThemedText>
          <ThemedText type="defaultSemiBold">{eventObject.date}</ThemedText>
        </ThemedText>
      </Collapsible> */}
      {/* <Collapsible title="Time">
        <ThemedText type="defaultSemiBold">{eventObject.time}</ThemedText>
      </Collapsible> */}
      {/* <Collapsible title="Location">
        <ThemedText type="defaultSemiBold">{eventObject.location}</ThemedText>
      </Collapsible> */}
      {/* <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/event.jpeg')} style={{ alignSelf: 'center', height: 200, width: 200 }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible> */}
      <Collapsible title="Direction">
          <MapView
                style={styles.map}
                initialRegion={{
                  latitude: eventObject.latitude || 37.78825, // Default to an example coordinate
                  longitude: eventObject.longitude || -122.4324, // Default to an example coordinate
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: eventObject.latitude || 37.78825,
                    longitude: eventObject.longitude || -122.4324,
                  }}
                  title={eventObject.title}
                  description={eventObject.location}
                />
            </MapView>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      {/* <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible> */}
      {/* <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible> */}
      <ThemedView style={[styles.row, { justifyContent: "center" }]}>
          <Btn title={"Join"} width="80%" />
          <Btn
            title={<Ionicons name="share-social-sharp" size={24} color="#fff" />}
            width="50"
            onPress={handleShare}
          />
        </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  map: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 5 : 6,
    // marginBottom: 100,
  },
  backButton: {
    position: 'absolute',
    left: -20,
  },
  headerText: {
    // fontSize: 25,
    // fontWeight: 'bold',
    marginLeft: 30
    // color: Colors.primary,
  },
});