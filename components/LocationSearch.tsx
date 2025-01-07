// LocationSearch.js
import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

const LocationSearch = ({
    onLocationSelect,
    placeholder,
}) => {
    return (
        <ThemedView style={styles.container}>
            <GooglePlacesAutocomplete
                disableScroll={true}
                placeholder={placeholder}
                fetchDetails={true} // Enable fetching of detailed data
                onPress={(data, details = null) => {
                    if (details) {
                        const { description } = data;
                        const { location } = details.geometry;

                        // Pass the location data to the parent via callback
                        onLocationSelect({
                            description,
                            lat: location.lat,
                            lng: location.lng,
                        });
                    }
                }}
                query={{
                    key: "AIzaSyAJhVEJXghor3TNWfcRvUOJrfhk-n8pI3Q",
                    language: "en",
                }}
                styles={styles}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={200}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'none'
    },
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
      }

});

export default LocationSearch;

// styles={{
//     textInputContainer: styles.textInputContainer,
//     textInput: styles.textInput,
// }}