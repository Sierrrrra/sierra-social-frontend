import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Animated,
  Alert,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePickerExpo from 'expo-image-picker';
import { format } from "date-fns";

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  ChevronLeft, 
  Image as ImageIcon, 
  Tag,
  DollarSign,
  Plus,
  X,
  Check,
  Search,
  Camera,
  Upload,
  UserPlus,
  Globe,
  Lock
} from "lucide-react";

// Sample data for categories
const categories = [
  { id: "1", name: "Dinner", icon: "utensils" },
  { id: "2", name: "Outdoors", icon: "tree" },
  { id: "3", name: "Music", icon: "music" },
  { id: "4", name: "Sports", icon: "activity" },
  { id: "5", name: "Art", icon: "palette" },
  { id: "6", name: "Business", icon: "briefcase" },
  { id: "7", name: "Education", icon: "book" },
  { id: "8", name: "Technology", icon: "cpu" },
  { id: "9", name: "Wellness", icon: "heart" },
];

// Sample data for users
const usersSampleData = [
  { id: "1", name: "John Doe", avatar: require("@/assets/images/starter-bg-01.jpg") },
  { id: "2", name: "Jane Smith", avatar: require("@/assets/images/starter-bg-02.jpg") },
  { id: "3", name: "Alice Johnson", avatar: require("@/assets/images/starter-bg-03.jpg") },
  { id: "4", name: "Bob Brown", avatar: require("@/assets/images/starter-bg-04.jpg") },
  { id: "5", name: "Charlie White", avatar: require("@/assets/images/starter-bg-05.jpg") },
  { id: "6", name: "Diana Prince", avatar: require("@/assets/images/starter-bg-06.jpg") },
  { id: "7", name: "Ethan Hunt", avatar: require("@/assets/images/starter-bg-01.jpg") },
  { id: "8", name: "Fiona Apple", avatar: require("@/assets/images/starter-bg-02.jpg") },
  { id: "9", name: "George Clooney", avatar: require("@/assets/images/starter-bg-03.jpg") },
  { id: "10", name: "Hannah Montana", avatar: require("@/assets/images/starter-bg-04.jpg") },
];

export default function CreateEventScreen() {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const isDark = theme === "dark";
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Event details state
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [eventImage, setEventImage] = useState(null);
  const [isFreeEvent, setIsFreeEvent] = useState(true);
  const [eventPrice, setEventPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Date/time picker state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Group modal state
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupVisibility, setGroupVisibility] = useState("Private");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Image picker modal state
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  
  // Form validation
  const isFormValid = eventTitle.trim() !== "" && 
                      eventLocation.trim() !== "" && 
                      eventDescription.trim() !== "" &&
                      selectedCategories.length > 0;
  
  // Header animation
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  // Handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };
  
  // Handle time change
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || eventTime;
    setShowTimePicker(false);
    setEventTime(currentTime);
  };
  
  // Handle category selection
  const toggleCategory = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  // Handle user selection for group
  const handleUserSelect = (user) => {
    if (!selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  
  // Handle user removal from group
  const handleUserRemove = (userId) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== userId));
  };
  
  // Filter users based on search query
  const filteredUsers = searchQuery
    ? usersSampleData.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : usersSampleData;
  
  // Handle image picking
  const pickImage = async (source) => {
    let result;
    
    if (source === 'camera') {
      const { status } = await ImagePickerExpo.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Camera permission is required to take photos');
        return;
      }
      
      result = await ImagePickerExpo.launchCameraAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
    } else {
      const { status } = await ImagePickerExpo.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Media library permission is required to select photos');
        return;
      }
      
      result = await ImagePickerExpo.launchImageLibraryAsync({
        mediaTypes: ImagePickerExpo.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });
    }
    
    if (!result.canceled) {
      setEventImage(result.assets[0].uri);
      setImagePickerVisible(false);
    }
  };
  
  // Handle create event submission
  const handleCreateEvent = () => {
    if (!isFormValid) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in all required fields (title, location, description, and at least one category)."
      );
      return;
    }
    
    // Combine date and time
    const eventDateTime = new Date(eventDate);
    eventDateTime.setHours(eventTime.getHours());
    eventDateTime.setMinutes(eventTime.getMinutes());
    
    const eventData = {
      title: eventTitle,
      location: eventLocation,
      description: eventDescription,
      date: eventDate.toISOString(),
      time: eventTime.toISOString(),
      price: isFreeEvent ? 0 : parseFloat(eventPrice),
      isFree: isFreeEvent,
      categories: selectedCategories,
      image: eventImage,
      createdAt: new Date().toISOString(),
    };
    
    console.log("Event created:", eventData);
    
    // Show success message and navigate back
    Alert.alert(
      "Success!",
      "Your event has been created successfully.",
      [
        { 
          text: "OK", 
          onPress: () => router.back() 
        }
      ]
    );
  };
  
  // Handle create group submission
  const handleCreateGroup = () => {
    if (!groupName.trim() || !groupDescription.trim() || selectedUsers.length === 0) {
      Alert.alert(
        "Incomplete Group",
        "Please provide a name, description, and select at least one member for your group."
      );
      return;
    }
    
    const groupData = {
      name: groupName,
      description: groupDescription,
      visibility: groupVisibility,
      members: selectedUsers,
      createdAt: new Date().toISOString(),
    };
    
    console.log("Group created:", groupData);
    setGroupModalVisible(false);
    
    // Reset group form
    setGroupName("");
    setGroupDescription("");
    setGroupVisibility("Private");
    setSelectedUsers([]);
    setSearchQuery("");
    
    // Show success message
    Alert.alert("Success!", "Your group has been created successfully.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Animated Header Background */}
      <Animated.View 
        style={[
          styles.headerBackground, 
          { 
            opacity: headerOpacity,
            backgroundColor: isDark ? "#1a1a1a" : "#fff" 
          }
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Create Event</ThemedText>
          <View style={styles.placeholderView} />
        </View>
      </Animated.View>
      
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButtonTop}>
            <ChevronLeft size={24} color={isDark ? "#fff" : "#333"} />
          </TouchableOpacity>
          <ThemedText style={styles.pageTitle}>Create Event</ThemedText>
        </View>
        
        {/* Event Image */}
        <TouchableOpacity 
          style={styles.imageContainer}
          onPress={() => setImagePickerVisible(true)}
        >
          {eventImage ? (
            <Image source={{ uri: eventImage }} style={styles.eventImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <ImageIcon size={40} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.imagePlaceholderText}>
                Add Event Cover Image
              </ThemedText>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Event Details Form */}
        <View style={styles.formContainer}>
          {/* Event Title */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Tag size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.inputLabel}>Event Title</ThemedText>
            </View>
            <TextInput
              style={[
                styles.textInput,
                isDark && styles.textInputDark
              ]}
              placeholder="Enter a catchy title for your event"
              placeholderTextColor={isDark ? "#8da9bc" : "#999"}
              value={eventTitle}
              onChangeText={setEventTitle}
            />
          </View>
          
          {/* Event Location */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <MapPin size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.inputLabel}>Location</ThemedText>
            </View>
            <TextInput
              style={[
                styles.textInput,
                isDark && styles.textInputDark
              ]}
              placeholder="Where will this event take place?"
              placeholderTextColor={isDark ? "#8da9bc" : "#999"}
              value={eventLocation}
              onChangeText={setEventLocation}
            />
          </View>
          
          {/* Event Date */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <CalendarIcon size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.inputLabel}>Date</ThemedText>
            </View>
            <TouchableOpacity 
              style={[
                styles.dateTimeButton,
                isDark && styles.dateTimeButtonDark
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <ThemedText style={styles.dateTimeText}>
                {format(eventDate, "EEEE, MMMM d, yyyy")}
              </ThemedText>
              <CalendarIcon size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={eventDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
          
          {/* Event Time */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Clock size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.inputLabel}>Time</ThemedText>
            </View>
            <TouchableOpacity 
              style={[
                styles.dateTimeButton,
                isDark && styles.dateTimeButtonDark
              ]}
              onPress={() => setShowTimePicker(true)}
            >
              <ThemedText style={styles.dateTimeText}>
                {format(eventTime, "h:mm a")}
              </ThemedText>
              <Clock size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
            </TouchableOpacity>
            
            {showTimePicker && (
              <DateTimePicker
                value={eventTime}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
          
          {/* Event Price */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <DollarSign size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.inputLabel}>Price</ThemedText>
            </View>
            
            <View style={styles.priceContainer}>
              <TouchableOpacity 
                style={[
                  styles.priceOption,
                  isFreeEvent && styles.priceOptionSelected,
                  isDark && isFreeEvent && styles.priceOptionSelectedDark
                ]}
                onPress={() => setIsFreeEvent(true)}
              >
                <ThemedText 
                  style={[
                    styles.priceOptionText,
                    isFreeEvent && styles.priceOptionTextSelected
                  ]}
                >
                  Free
                </ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.priceOption,
                  !isFreeEvent && styles.priceOptionSelected,
                  isDark && !isFreeEvent && styles.priceOptionSelectedDark
                ]}
                onPress={() => setIsFreeEvent(false)}
              >
                <ThemedText 
                  style={[
                    styles.priceOptionText,
                    !isFreeEvent && styles.priceOptionTextSelected
                  ]}
                >
                  Paid
                </ThemedText>
              </TouchableOpacity>
            </View>
            
            {!isFreeEvent && (
              <View style={styles.priceInputContainer}>
                <View style={styles.currencySymbol}>
                  <ThemedText style={styles.currencyText}>$</ThemedText>
                </View>
                <TextInput
                  style={[
                    styles.priceInput,
                    isDark && styles.priceInputDark
                  ]}
                  placeholder="0.00"
                  placeholderTextColor={isDark ? "#8da9bc" : "#999"}
                  keyboardType="decimal-pad"
                  value={eventPrice}
                  onChangeText={setEventPrice}
                />
              </View>
            )}
          </View>
          
          {/* Event Categories */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Tag size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.inputLabel}>Categories</ThemedText>
            </View>
            
            <View style={styles.categoriesContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryChip,
                    selectedCategories.includes(category.id) && styles.categoryChipSelected,
                    isDark && selectedCategories.includes(category.id) && styles.categoryChipSelectedDark
                  ]}
                  onPress={() => toggleCategory(category.id)}
                >
                  <ThemedText 
                    style={[
                      styles.categoryText,
                      selectedCategories.includes(category.id) && styles.categoryTextSelected
                    ]}
                  >
                    {category.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Event Description */}
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Info size={16} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.inputLabel}>Description</ThemedText>
            </View>
            <TextInput
              style={[
                styles.textArea,
                isDark && styles.textAreaDark
              ]}
              placeholder="Describe your event. What should attendees expect?"
              placeholderTextColor={isDark ? "#8da9bc" : "#999"}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              value={eventDescription}
              onChangeText={setEventDescription}
            />
          </View>
          
          {/* Create Group Button */}
          <TouchableOpacity 
            style={styles.createGroupButton}
            onPress={() => setGroupModalVisible(true)}
          >
            <UserPlus size={20} color="#fff" />
            <ThemedText style={styles.createGroupButtonText}>
              Create Group for this Event
            </ThemedText>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
      
      {/* Create Event Button */}
      <View style={styles.createButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.createButton,
            !isFormValid && styles.createButtonDisabled
          ]}
          onPress={handleCreateEvent}
          disabled={!isFormValid}
        >
          <ThemedText style={styles.createButtonText}>Create Event</ThemedText>
        </TouchableOpacity>
      </View>
      
      {/* Image Picker Modal */}
      <Modal
        visible={imagePickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setImagePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.imagePickerModal,
            isDark && styles.imagePickerModalDark
          ]}>
            <ThemedText style={styles.modalTitle}>Add Event Image</ThemedText>
            
            <TouchableOpacity 
              style={styles.imagePickerOption}
              onPress={() => pickImage('camera')}
            >
              <Camera size={24} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.imagePickerOptionText}>
                Take Photo
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.imagePickerOption}
              onPress={() => pickImage('gallery')}
            >
              <Upload size={24} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              <ThemedText style={styles.imagePickerOptionText}>
                Choose from Gallery
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setImagePickerVisible(false)}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Create Group Modal */}
      <Modal
        visible={groupModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setGroupModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.groupModal,
            isDark && styles.groupModalDark
          ]}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Create Group</ThemedText>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setGroupModalVisible(false)}
              >
                <X size={24} color={isDark ? "#8da9bc" : "#0c2a3f"} />
              </TouchableOpacity>
            </View>
            
            {/* Group Name */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Group Name</ThemedText>
              <TextInput
                style={[
                  styles.textInput,
                  isDark && styles.textInputDark
                ]}
                placeholder="Enter group name"
                placeholderTextColor={isDark ? "#8da9bc" : "#999"}
                value={groupName}
                onChangeText={setGroupName}
              />
            </View>
            
            {/* Group Description */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Description</ThemedText>
              <TextInput
                style={[
                  styles.textArea,
                  isDark && styles.textAreaDark,
                  { height: 80 }
                ]}
                placeholder="What is this group about?"
                placeholderTextColor={isDark ? "#8da9bc" : "#999"}
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                value={groupDescription}
                onChangeText={setGroupDescription}
              />
            </View>
            
            {/* Group Visibility */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Group Visibility</ThemedText>
              <View style={styles.visibilityContainer}>
                <TouchableOpacity 
                  style={[
                    styles.visibilityOption,
                    groupVisibility === "Private" && styles.visibilityOptionSelected,
                    isDark && groupVisibility === "Private" && styles.visibilityOptionSelectedDark
                  ]}
                  onPress={() => setGroupVisibility("Private")}
                >
                  <Lock size={16} color={groupVisibility === "Private" ? "#fff" : (isDark ? "#8da9bc" : "#0c2a3f")} />
                  <ThemedText 
                    style={[
                      styles.visibilityText,
                      groupVisibility === "Private" && styles.visibilityTextSelected
                    ]}
                  >
                    Private
                  </ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    styles.visibilityOption,
                    groupVisibility === "Public" && styles.visibilityOptionSelected,
                    isDark && groupVisibility === "Public" && styles.visibilityOptionSelectedDark
                  ]}
                  onPress={() => setGroupVisibility("Public")}
                >
                  <Globe size={16} color={groupVisibility === "Public" ? "#fff" : (isDark ? "#8da9bc" : "#0c2a3f")} />
                  <ThemedText 
                    style={[
                      styles.visibilityText,
                      groupVisibility === "Public" && styles.visibilityTextSelected
                    ]}
                  >
                    Public
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Search Users */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Add Members</ThemedText>
              <View style={[
                styles.searchContainer,
                isDark && styles.searchContainerDark
              ]}>
                <Search size={16} color={isDark ? "#8da9bc" : "#999"} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search users"
                  placeholderTextColor={isDark ? "#8da9bc" : "#999"}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>
            
            {/* Selected Users */}
            {selectedUsers.length > 0 && (
              <View style={styles.selectedUsersContainer}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.selectedUsersScroll}
                >
                  {selectedUsers.map(user => (
                    <View key={user.id} style={styles.selectedUserChip}>
                      <Image source={user.avatar} style={styles.userAvatar} />
                      <ThemedText style={styles.selectedUserName} numberOfLines={1}>
                        {user.name}
                      </ThemedText>
                      <TouchableOpacity 
                        style={styles.removeUserButton}
                        onPress={() => handleUserRemove(user.id)}
                      >
                        <X size={14} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            
            {/* User List */}
            <FlatList
              data={filteredUsers}
              keyExtractor={item => item.id}
              style={styles.userList}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.userItem}
                  onPress={() => handleUserSelect(item)}
                >
                  <Image source={item.avatar} style={styles.userAvatar} />
                  <ThemedText style={styles.userName}>{item.name}</ThemedText>
                  {selectedUsers.some(user => user.id === item.id) ? (
                    <View style={styles.userSelectedIndicator}>
                      <Check size={14} color="#fff" />
                    </View>
                  ) : (
                    <Plus size={20} color={isDark ? "#8da9bc" : "#0c2a3f"} />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <ThemedText style={styles.emptyListText}>
                  No users found matching your search
                </ThemedText>
              }
            />
            
            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelGroupButton}
                onPress={() => setGroupModalVisible(false)}
              >
                <ThemedText style={styles.cancelGroupText}>Cancel</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.createGroupModalButton,
                  (!groupName.trim() || !groupDescription.trim() || selectedUsers.length === 0) && 
                  styles.createGroupModalButtonDisabled
                ]}
                onPress={handleCreateGroup}
                disabled={!groupName.trim() || !groupDescription.trim() || selectedUsers.length === 0}
              >
                <ThemedText style={styles.createGroupModalText}>Create Group</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 60,
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderView: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButtonTop: {
    marginRight: 15,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  imageContainer: {
    height: 200,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 10,
    fontSize: 16,
    opacity: 0.7,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  textInput: {
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  textInputDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  dateTimeButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  dateTimeButtonDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dateTimeText: {
    fontSize: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  priceOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    marginRight: 10,
    borderRadius: 12,
  },
  priceOptionSelected: {
    backgroundColor: '#0c2a3f',
  },
  priceOptionSelectedDark: {
    backgroundColor: '#1e3a5f',
  },
  priceOptionText: {
    fontSize: 16,
  },
  priceOptionTextSelected: {
    color: '#fff',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    width: 40,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  currencyText: {
    fontSize: 18,
    fontWeight: '500',
  },
  priceInput: {
    flex: 1,
    height: 45,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  priceInputDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryChipSelected: {
    backgroundColor: '#0c2a3f',
  },
  categoryChipSelectedDark: {
    backgroundColor: '#1e3a5f',
  },
  categoryText: {
    fontSize: 14,
  },
  categoryTextSelected: {
    color: '#fff',
  },
  textArea: {
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 120,
    color: '#000',
  },
  textAreaDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c2a3f',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 10,
  },
  createGroupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  createButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  createButton: {
    backgroundColor: '#0c2a3f',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: 'rgba(12, 42, 63, 0.5)',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerModal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  imagePickerModalDark: {
    backgroundColor: '#1a1a1a',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePickerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  imagePickerOptionText: {
    fontSize: 16,
    marginLeft: 15,
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#e74c3c',
  },
  groupModal: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  groupModalDark: {
    backgroundColor: '#1a1a1a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
  },
  visibilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  visibilityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    marginRight: 10,
    borderRadius: 12,
  },
  visibilityOptionSelected: {
    backgroundColor: '#0c2a3f',
  },
  visibilityOptionSelectedDark: {
    backgroundColor: '#1e3a5f',
  },
  visibilityText: {
    fontSize: 16,
    marginLeft: 8,
  },
  visibilityTextSelected: {
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(140, 140, 140, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  searchContainerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 16,
  },
  selectedUsersContainer: {
    marginBottom: 15,
  },
  selectedUsersScroll: {
    paddingVertical: 10,
  },
  selectedUserChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c2a3f',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  selectedUserName: {
    color: '#fff',
    marginLeft: 5,
    marginRight: 5,
    maxWidth: 100,
  },
  removeUserButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userList: {
    maxHeight: 200,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    flex: 1,
    fontSize: 16,
  },
  userSelectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    textAlign: 'center',
    padding: 20,
    opacity: 0.6,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelGroupButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    marginRight: 10,
  },
  cancelGroupText: {
    fontSize: 16,
  },
  createGroupModalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0c2a3f',
    borderRadius: 12,
  },
  createGroupModalButtonDisabled: {
    backgroundColor: 'rgba(12, 42, 63, 0.5)',
  },
  createGroupModalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});