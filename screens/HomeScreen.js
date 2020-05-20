import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, FlatList, View, ScrollView, TouchableOpacity } from 'react-native';
import ItemEvent from './../components/itemEvent';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function HomeScreen({ navigation }) {

    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/events`)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                setEvents(response);
            })
            .catch(error => console.log(error));
    }, []);

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
