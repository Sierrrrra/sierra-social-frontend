import React, { useLayoutEffect, useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Share, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { useLocalSearchParams, useGlobalSearchParams, useRouter } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from "react-native-maps";
import { Entypo, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Btn from '@/components/Btn';
import Input from '@/components/Input';
import DatePicker from '@/components/DatePicker';
import ImagePicker from '@/components/ImagePicker';
import SwitchBtn from '@/components/SwitchBtn';
import LocationSearch from '@/components/LocationSearch';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const usersSampleData = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Bob Brown' },
  { id: '5', name: 'Charlie White' },
  { id: '6', name: 'Diana Prince' },
  { id: '7', name: 'Ethan Hunt' },
  { id: '8', name: 'Fiona Apple' },
  { id: '9', name: 'George Clooney' },
  { id: '10', name: 'Hannah Montana' },
];

export default function TabTwoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [groupVisibility, setGroupVisibility] = useState('Private');


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [isFreeEvent, setIsFreeEvent] = useState(true);
  const [eventCost, setEventCost] = useState(0);
  const [eventTitle, setEventTitle] = useState("");
  const [eventSummary, setEventSummary] = useState("");
  const [eventLocation, setEventLocation] = useState('');
  const [groupLocation, setGroupLocation] = useState('');

  console.log(eventLocation)

  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState({});

  const handleLocationSelect = (locationData) => {
    console.log("Location:", locationData)

    setLocation(locationData.description);
    setLatLng({ lat: locationData.lat, lng: locationData.lng });
  };

  const handleCreateEvent = () => {
    console.log("Event created!");
  };

  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';
  const router = useRouter()

  const { event } = useGlobalSearchParams();
    // const { event } = route.params;
    console.log(event)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleUserSelect = (user) => {
    if (!selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleUserRemove = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };

  const filteredUsers = searchQuery
  ? usersSampleData.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : usersSampleData.slice(0, 5); // Show only the first 5 users initially




  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/sira-add.jpg')}
          style={styles.reactLogo}
        />
      }
      headerTitle="Meet New People"
      headerTitleFontSize={30}
      >
      <ThemedView style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Entypo name="chevron-small-left" size={50} color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} />
        </TouchableOpacity>
        <ThemedText type='title' style={styles.headerText}>{event}</ThemedText>
      </ThemedView>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <ThemedView style={{ paddingTop: 15 }}>
          <ThemedText style={styles.label}>Event Title</ThemedText>
          <Input 
            label="Enter event title" 
            value={eventTitle}
            onChangeText={setEventTitle}
          />

          <ThemedText style={styles.label}>Location</ThemedText>
          {/* <GooglePlacesAutocomplete
            placeholder="Event Location"
            fetchDetails={true} // Ensures detailed information is fetched
            onPress={(data, details = null) => {
              // Update state with the selected location
              setEventLocation(details?.formatted_address || data.description);
            }}
            query={{
              key: 'AIzaSyAJhVEJXghor3TNWfcRvUOJrfhk',
              language: 'en',
            }}
            styles={{
              textInputContainer: {
                width: '100%',
              },
              textInput: {
                height: 45,
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                marginBottom: 15,
                paddingBottom: 5,
                fontSize: 17,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              row: {
                backgroundColor: '#fff',
                padding: 13,
                height: 44,
                flexDirection: 'row',
              },
            }}
            textInputProps={{
              value: eventLocation, // Bind the state to the input value
              onChangeText: setEventLocation, // Update state when user types manually
            }}
          /> */}

        {/* <GooglePlacesAutocomplete
          disableScroll={true}
          placeholder="Enter location"
          onPress={(data, details = null) => {
            console.log('Selected Place:', data, details);
            // Extract and set the selected location
            setGroupLocation(data.description); // Assuming you have a state for the location
          }}
          query={{
            key: 'AIzaSyAJhVEJXghor3TNWfcRvUOJrfhk',
            language: 'en', // Language for the suggestions
          }}
          textInputProps={{
            value: groupLocation, // Bind the input to the state
            onChangeText: (text) => setGroupLocation(text), // Handle manual input
          }}
          styles={{
            textInput: {
              height: 40,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 5,
              paddingHorizontal: 10,
              marginBottom: 15,
              backgroundColor:'none',
               color: 'white'
            },
          }}
          fetchDetails={true} // Ensure place details are fetched if needed
        /> */}




          <GooglePlacesAutocomplete
                  placeholder="Event Location"
                  disableScroll={true}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    console.log(data, details)
                    // Update state with the selected location
                    setEventLocation(details?.formatted_address || data.description);
                  }}
                  query={{
                    key: 'AIzaSyAJhVEJXghor3TNWfcRvUOJrfhk-n8pI3Q',
                    language: 'en',
                  }}
                  styles={{
                    container: { flex: 1, zIndex: 1 },
                    textInputContainer: {
                      width: '100%',
                  },
                  textInput: {
                      height: 45,
                      // padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#e0e0e0',
                      marginBottom: 15,
                      paddingBottom: 5,
                      fontSize: 17,
                      backgroundColor:'none',
                      color: 'white'
                  },
                  predefinedPlacesDescription: {
                      color: '#1faadb',
                  },
                  row: {
                      backgroundColor: '#fff',
                      padding: 13,
                      height: 44,
                      flexDirection: 'row',
                    },
                    listView: { zIndex: 2 },
                  }}
                  textInputProps={{
                    value: eventLocation, // Bind the state to the input value
                    onChangeText: (text) => setEventLocation(text), // Update state when user types manually
                  }}
                />

          <ThemedText style={styles.label}>Summary</ThemedText>
          <Input 
            label={"Brief summary of the event"} 
            multiline={true} 
            height={70} 
            value={eventSummary}
            onChangeText={setEventSummary}
          />

          <DatePicker label="Date" mode="date" value={startDate} onChange={setStartDate} />
          <DatePicker label="Time" mode="time" value={eventTime} onChange={setEventTime} />

          {/* Switch to toggle Free Event */}
          <ThemedView style={styles.switchContainer}>
            <SwitchBtn
              label={"Free Event"}
              value={isFreeEvent}
              onValueChange={setIsFreeEvent}
            />

            {!isFreeEvent && (
              <>
                <Input
                  label={"Event Cost"}
                  value={eventCost}
                  onChangeText={setEventCost}
                  keyboardType="numeric"
                />
              </>
            )}
          </ThemedView>
        </ThemedView>
      </ScrollView>

      <Collapsible title="Add Event Image">
        <ImagePicker onImageSelect={(uri) => console.log("Selected image:", uri)} />
      </Collapsible>
      <Collapsible title="Add Event to Group">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[styles.createGroupButton,
            {
              backgroundColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
            },
          ]}
        >
          <ThemedText style={styles.createGroupButtonText}>Create New Group</ThemedText>
        </TouchableOpacity>
      </Collapsible>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Create New Group</ThemedText>

            <Input
              label="Group Name"
              value={groupName}
              onChangeText={setGroupName}
            />

            <Input
              label="Group Description"
              value={groupDescription}
              onChangeText={setGroupDescription}
            />

          <ThemedText style={styles.modalLabel}>Group Type</ThemedText>
          <ThemedView style={styles.visibilityContainer}>
            <TouchableOpacity
              style={[
                styles.visibilityOption,
                groupVisibility === 'Private' && {
                  backgroundColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
                  borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon
                },
              ]}
              onPress={() => setGroupVisibility('Private')}
            >
              <ThemedText style={styles.optionText}>Private</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.visibilityOption,
                groupVisibility === 'Public' && {
                  backgroundColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
                  borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon
                },
              ]}
              onPress={() => setGroupVisibility('Public')}
            >
              <ThemedText style={styles.optionText}>Public</ThemedText>
            </TouchableOpacity>
          </ThemedView>


            <Input
              label="Search and add people to your group"
              value={searchQuery}
              onChangeText={setSearchQuery}
              // placeholder="Search users"
            />

            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.userItem}
                  onPress={() => handleUserSelect(item)}
                >
                  <ThemedText>{item.name}</ThemedText>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<ThemedText style={styles.noResultsText}>No users found</ThemedText>}
            />


            {/* <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.userItem}
                  onPress={() => handleUserSelect(item)}
                >
                  <ThemedText>{item.name}</ThemedText>
                </TouchableOpacity>
              )}
            /> */}

            <ThemedView style={styles.selectedUsersContainer}>
              {selectedUsers.map((user) => (
                <ThemedView key={user.id} style={[styles.selectedUserChip, {backgroundColor: theme === 'light' ? '#fff' : '#333'}]}>
                  <ThemedText>{user.name}</ThemedText>
                  <TouchableOpacity onPress={() => handleUserRemove(user.id)}>
                    <ThemedText style={styles.removeUser}>✕</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              ))}
            </ThemedView>

            <ThemedView style={styles.modalActions}>
              <Btn width='40%' title="Cancel" onPress={() => setModalVisible(false)} />
              <Btn
              width='40%'
                title="Create Group"
                onPress={() => {
                  console.log('Group Created:', {
                    groupName,
                    groupDescription,
                    members: selectedUsers,
                    groupVisibility
                  });
                  setModalVisible(false);
                  setGroupName('');
                  setGroupDescription('');
                  setGroupVisibility('Private');
                  setSelectedUsers([]);
                  setSearchQuery('');
                }}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>



      
      <ThemedView style={[styles.row, { justifyContent: "center" }]}>
          <Btn title={"Create Event"} width="100%" />
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
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 5,
  },
  textInputContainer: {
    width: "100%",
  },
  textInput: {
    height: 45,
    padding: 10,
    // backgroundColor: Colors.ligth,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  switchContainer: {
    marginTop: 16
  },
  createGroupButton: {
    // backgroundColor: '#007BFF',
    padding: 6,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  createGroupButtonText: {
    // color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    // backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedUsersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectedUserChip: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#333',
    borderRadius: 15,
    padding: 5,
    margin: 5,
  },
  removeUser: {
    marginLeft: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  noResultsText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#888',
  },
  visibilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  visibilityOption: {
    flex: 1,
    alignItems: 'center',
    // padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  // selectedOption: {
  //   backgroundColor: '#007BFF',
  //   borderColor: '#007BFF',
  // },
  optionText: {
    color: '#fff',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
});