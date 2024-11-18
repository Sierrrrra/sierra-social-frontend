// LocationSearch.js
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const LocationSearch = ({ onLocationSelect }) => {
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Enter location"
                fetchDetails={true}
                disableScroll={true}
                onPress={(data, details) => onLocationSelect(data, details)}
                query={{
                    key: 'YOUR_GOOGLE_API_KEY', // Replace with your actual API key
                    language: 'en',
                }}
                styles={{
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    textInputContainer: {
        width: '100%',
    },
    textInput: {
        height: 45,
        // padding: 10,
        // fontSize: 16,
        // backgroundColor: '#f1f1f1',
        // borderRadius: 5,

        padding: 10,
        backgroundColor: Colors.ligth,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#eee",
    },
});

export default LocationSearch;
