import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function NewEventScreen({ navigation }) {

    const [title, onChangeTitle] = useState();
    const [description, onChangeDescription] = useState();
    const [picture, onChangePicture] = useState();
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const onRegionChange = (region) => {
        setRegion({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        });
    }

    return (
        <>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <TextInput placeholder='Title' style={styles.inputText} onChangeText={title => onChangeTitle(title)} value={title} autoCapitalize="none" />
                    <TextInput placeholder='Description' style={styles.inputText} onChangeText={description => onChangeDescription(description)} value={description} autoCapitalize="none" />
                    <View style={styles.mapContainer}>
                        <MapView style={styles.map} region={region} onRegionChange={onRegionChange}>
                            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                        </MapView>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => { navigation.push('Event') }}>
                <View style={styles.bottomView} >
                    <Text style={styles.textStyle}>Create Event</Text>
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 20,
        paddingStart: 20,
        paddingEnd: 20,
    },
    headingText: {
        fontSize: 30,
        fontWeight: "400"
    },
    descriptionText: {
        fontSize: 36,
        fontWeight: "200",
        paddingVertical: 10
    },
    mapContainer: {
        marginVertical: 20,
        height: 200
    },
    map: {
        height: 200
    },
    inputText: {
        height: 48,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#ededed",
        borderRadius: 4,
        color: "#20232a",
        fontSize: 20,
        fontWeight: "300",
        paddingStart: 8,
        paddingEnd: 8,
    },
    bottomView: {
        width: '100%',
        height: 60,
        backgroundColor: "#2433AC",
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    textStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '400',
        textTransform: "uppercase"
    }
});
