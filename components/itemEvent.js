import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ItemEvent = (props) => {

    const { event } = props;

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Details') }} style={styles.itemContent}>
            <View>
                <View style={styles.itemCard}>
                    <Image source={{ uri: event.picture }} style={styles.itemPicture} />
                    <Text style={styles.text}>{event.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemEvent

const styles = StyleSheet.create({
    itemContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    itemCard: {
        borderWidth: 1,
        borderColor: "#ededed",
        borderRadius: 4,
        paddingStart: 20,
        paddingEnd: 20,
        width: wp('47%'),
    },
    itemPicture: {
        marginTop: 10,
        width: 140,
        height: 140,
    },
    text: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    }
});