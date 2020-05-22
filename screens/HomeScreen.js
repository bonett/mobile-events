import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ItemComponent from '../components/itemComponent';
import {settings} from './../constants/settings';

export default function HomeScreen({ navigation }) {

    const [events, setEvents] = useState(null);

    useEffect(() => {

        async function getEvents() {
            try {
                const token = await AsyncStorage.getItem('TOKEN') || 'none';
                const response = await fetch(`${settings.urlApi}/events`, {
                    method: "GET", headers: new Headers({
                        'Content-Type': 'application/json',
                        'access-token': token
                    })
                }),
                    data = await response.json();
                setEvents(data);
            } catch (e) {
                console.error(e);
            }
        }

        getEvents();
    }, [events]);


    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {
                    events !== null ?
                        <FlatList
                            data={events}
                            numColumns={2}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => { navigation.push('Detail', { event: item }) }}>
                                    <ItemComponent event={item} key={index} />
                                </TouchableOpacity>
                            )}
                        /> : null
                }
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => { navigation.push('Event', { event: null }) }}>
                    <View style={styles.buttonContent} >
                        <Text style={styles.buttonText}>Create Event</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#2433AC"
    },
    buttonContent: {
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        textTransform: "uppercase"
    }
});
