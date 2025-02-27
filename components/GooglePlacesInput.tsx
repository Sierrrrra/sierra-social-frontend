import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useColorScheme } from '@/hooks/useColorScheme';

interface GooglePlacesInputProps {
  placeholder?: string;
  onPlaceSelected: (data: string) => void;
}

const GooglePlacesInput = ({ 
  placeholder = "Search for a location", 
  onPlaceSelected 
}: GooglePlacesInputProps) => {
  const theme = useColorScheme() ?? 'light';
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          onPlaceSelected(data.description);
        }}
        query={{
          key: 'YOUR_API_KEY', // Replace with your Google Places API key
          language: 'en',
        }}
        fetchDetails={true}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            height: 45,
            color: isDark ? '#fff' : '#000',
            fontSize: 16,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(140, 140, 140, 0.1)',
            borderRadius: 12,
            paddingHorizontal: 15,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            backgroundColor: isDark ? '#1a1a1a' : '#fff',
            borderRadius: 12,
            marginTop: 5,
          },
          row: {
            backgroundColor: isDark ? '#1a1a1a' : '#fff',
            padding: 13,
          },
          separator: {
            height: 1,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          },
          description: {
            color: isDark ? '#fff' : '#000',
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginBottom: 10,
  },
});

export default GooglePlacesInput;