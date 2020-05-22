import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SessionContext from './../context/session.context';
import MapComponent from './../components/mapComponent';
import TextComponent from '../components/inputs/TextComponent';
import ButtonComponent from '../components/inputs/ButtonComponent';
import { staticText } from '../constants/static';
import { settings } from './../constants/settings';

export default function EventDetailsScreen({ route, navigation }) {

    const { event } = route.params,
        region = {
            latitude: parseFloat(event.latitude),
            longitude: parseFloat(event.longitude),
            latitudeDelta: parseFloat(event.latitude_delta),
            longitudeDelta: parseFloat(event.longitude_delta)
        };

    const removeEvent = async (event) => {

        const id_event = event && event.id_event;
        const token = await AsyncStorage.getItem('TOKEN') || 'none';

        const response = await fetch(`${settings.urlApi}/events/${id_event}`, {
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

    const onRegionChange = (region) => { }

    return (
        <SessionContext.Consumer>
            {
                value => (
                    <View style={styles.container}>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <View style={styles.body}>
                                <View style={styles.formGroup}>
                                    <TextComponent
                                        value={event.title}
                                        size={34}
                                        weight={"700"} />
                                </View>
                                <View style={styles.formGroup}>
                                    <TextComponent
                                        value={event.description}
                                        size={20}
                                        weight={"300"} />
                                </View>
                                <View style={styles.media}>
                                    <Image source={{ uri: event.picture }} style={styles.itemPicture} />
                                </View>
                                <View style={styles.formGroup}>
                                    <MapComponent region={region} getRegion={onRegionChange} />
                                </View>
                            </View>
                        </ScrollView>
                        {
                            value === event.id_user ?
                                <View style={styles.footer}>
                                    <TouchableOpacity onPress={() => { navigation.navigate('Event', { event: event }) }}>
                                        <ButtonComponent
                                            value={staticText.edit} main={true} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { removeEvent(event) }}>
                                        <ButtonComponent
                                            value={staticText.remove} main={true} />
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
    contentContainer: {
        paddingVertical: 10,
        width: wp('100%'),
        paddingHorizontal: 20
    },
    body: {
        flex: 8,
        justifyContent: 'center'
    },
    footer: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#2433AC",
        width: wp('100%'),
    },
    formGroup: {
        marginVertical: 4,
        paddingVertical: 4
    },
    media: {
        height: 160,
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        paddingVertical: 10
    },
    itemPicture: {
        marginTop: 10,
        width: 140,
        height: 140,
        borderRadius: 80
    }
});
