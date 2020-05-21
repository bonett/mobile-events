import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SessionContext from './../context/session.context';

export default function EventDetailsScreen({ route, navigation }) {

    const { event } = route.params;

    return (
        <SessionContext.Consumer>
            {
                value => (
                    <>
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            <Text style={styles.title}>{event.title}</Text>
                            <Text style={styles.description}>{event.description}</Text>
                            <View style={styles.media}>
                                <Image source={{ uri: event.picture }} style={styles.itemPicture} />
                            </View>
                        </ScrollView>
                        {
                            value === event.id_user ?
                                <View style={styles.footer}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <View style={styles.button} >
                                            <Text style={styles.customButtonText}>Edit Event</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { }}>
                                        <View style={styles.button} >
                                            <Text style={styles.customButtonText}>Remove Event</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                : null
                        }
                    </>
                )}
        </SessionContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingVertical: 10,
        width: wp('100%'),
        paddingHorizontal: 26
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
        marginVertical: 10,
        paddingVertical: 10
    },
    description: {
        fontSize: 20,
        fontWeight: "300",
        marginVertical: 10,
        paddingVertical: 10
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
    },
    footer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20
    },
    button: {
        backgroundColor: "#2433AC",
        height: 48,
        marginVertical: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "600",
        paddingHorizontal: 20
    },
    customButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: '400',
        textTransform: "uppercase"
    },
});
