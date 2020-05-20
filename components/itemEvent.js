import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ItemEvent = (props) => {

    const { event } = props;
    return (
        <View style={styles.card}>
            <Image source={{ uri: event.picture }} style={styles.picture} />
            <Text style={styles.text}>{event.title}</Text>
        </View>
    )
}

export default ItemEvent

const styles = StyleSheet.create({
    card: {
        minWidth: 140,
        maxWidth: 160,
        minHeight: 140,
        marginVertical: 8,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: "#ededed",
        borderRadius: 4,
        paddingStart: 8,
        paddingEnd: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        paddingHorizontal: 10,
        paddingVertical: 10,
    }
});