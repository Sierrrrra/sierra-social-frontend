import React from 'react';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({
    placeholder = "Search",
    onPlaceSelected,
    apiKey,
    stylesOverride = {},
}) => {
    return (
        <GooglePlacesAutocomplete
            placeholder={placeholder}
            disableScroll={true}
            fetchDetails={true}
            onPress={(data, details = null) => {
                if (details && onPlaceSelected) {
                    const { description } = data;
                    const { location } = details.geometry;

                    onPlaceSelected({
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
            styles={{
                container: { flex: 1, zIndex: 1 },
                textInputContainer: {
                    width: "100%",
                },
                textInput: {
                    height: 45,
                    // padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#e0e0e0",
                    // marginBottom: 15,
                    paddingBottom: 5,
                    fontSize: 17,
                    backgroundColor: "none",
                    color: "gray",
                },
                predefinedPlacesDescription: {
                    color: "#1faadb",
                },
                row: {
                    backgroundColor: "#fff",
                    padding: 13,
                    height: 44,
                    flexDirection: "row",
                },
                listView: { zIndex: 2 },
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, zIndex: 1 },
    textInputContainer: {
        width: "100%",
    },
    textInput: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        marginBottom: 15,
        paddingBottom: 5,
        fontSize: 17,
        color: "gray",
    },
    predefinedPlacesDescription: {
        color: "#1faadb",
    },
    row: {
        backgroundColor: "#fff",
        padding: 13,
        height: 44,
        flexDirection: "row",
    },
    listView: { zIndex: 2 },
});

export default GooglePlacesInput;
