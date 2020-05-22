import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SessionContext from './../context/session.context';
import MapView, { Marker } from 'react-native-maps';

export default function EventDetailsScreen({ route, navigation }) {

    const { event } = route.params;

    const removeEvent = async (event) => {

        const id_event = event && event.id_event;
        const token = await AsyncStorage.getItem('TOKEN') || 'none';

        const response = await fetch(`http://localhost:8080/events/${id_event}`, {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json',
                'access-token': token
            }),
        }),
            data = await response.json();

        if (data.status === 'OK') {
            navigation.navigate('Home Events');
        }
    }

    return (
        <SessionContext.Consumer>
            {
                value => (
                    <View style={styles.container}>
                        <View style={styles.body}>
                            <ScrollView contentContainerStyle={styles.contentContainer}>
                                <Text style={styles.title}>{event.title}</Text>
                                <Text style={styles.description}>{event.description}</Text>
                                <View style={styles.media}>
                                    <Image source={{ uri: event.picture }} style={styles.itemPicture} />
                                </View>
                                <View style={styles.mapContainer}>
                                    <MapView style={styles.map} initialRegion={{ latitude: parseFloat(event.latitude), longitude: parseFloat(event.longitude), latitudeDelta: parseFloat(event.latitude_delta), longitudeDelta: parseFloat(event.longitude_delta) }}>
                                        <Marker coordinate={{ latitude: parseFloat(event.latitude), longitude: parseFloat(event.longitude) }} title={event.title} />
                                    </MapView>
                                </View>
                            </ScrollView>
                        </View>
                        {
                            value === event.id_user ?
                                <View style={styles.footer}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Event', { event: event }) }}>
                                        <View style={styles.buttonContent} >
                                            <Text style={styles.buttonText}>Edit Event</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { removeEvent(event) }}>
                                        <View style={styles.buttonContent} >
                                            <Text style={styles.buttonText}>Remove Event</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View> :
                                null
                        }
                    </View>
                )}
        </SessionContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    body: {
        flex: 8,
        justifyContent: 'center'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#2433AC",
    },
    buttonContent: {
        width: wp('50%'),
        backgroundColor: "#2433AC",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        textTransform: "uppercase"
    },
    contentContainer: {
        paddingVertical: 10,
        width: wp('100%'),
        paddingHorizontal: 26
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        marginVertical: 4,
        paddingVertical: 4
    },
    description: {
        fontSize: 16,
        fontWeight: "300",
        marginVertical: 4,
        paddingVertical: 4,
        textAlign: "justify"
    },
    media: {
        height: 160,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        paddingVertical: 10
    },
    mapContainer: {
        marginVertical: 20,
        height: 200
    },
    map: {
        height: 200
    },
    itemPicture: {
        marginTop: 10,
        width: 140,
        height: 140,
        borderRadius: 80
    }
});
