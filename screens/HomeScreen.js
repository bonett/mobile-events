import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, FlatList, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import ItemEvent from './../components/itemEvent';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function HomeScreen({ navigation }) {

    const [events, setEvents] = useState(null);

    useEffect(() => {

        async function getToken() {
            try {
                const response = await fetch(`http://localhost:8080/auth/getToken`, { method: "GET" }),
                    data = await response.json(),
                    status = data && data.message,
                    token = data && data.token;

                if (status === 'Granted') {
                    saveToken(token);
                }
            } catch (e) {
                console.error(e);
            }
        }

        async function getEvents() {
            try {
                const token = await AsyncStorage.getItem('TOKEN') || 'none';
                const response = await fetch(`http://localhost:8080/events`, {
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

        getToken();
        getEvents();
    }, []);

    const saveToken = async token => {
        try {
            await AsyncStorage.setItem('TOKEN', token);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>
            {
                events !== null ?
                    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <FlatList
                            data={events}
                            numColumns={2}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => { navigation.push('Detail', { event: item }) }} style={styles.itemContent}>
                                    <ItemEvent event={item} key={index} />
                                </TouchableOpacity>
                            )}
                        />
                    </ScrollView> :
                    null
            }
            <TouchableOpacity onPress={() => { navigation.push('New Event') }}>
                <View style={styles.bottomView} >
                    <Text style={styles.textStyle}>Create Event</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingVertical: 10,
        width: wp('98%'),
        backgroundColor: '#F9F9F9',
        paddingBottom: 70
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
