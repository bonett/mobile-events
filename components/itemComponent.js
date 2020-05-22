import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ItemComponent = (props) => {

    const { event } = props;

    return (
        <View style={styles.itemContent}>
            <View style={styles.itemCard}>
                {
                    event.picture !== null ? <Image source={{ uri: event.picture }} style={styles.itemPicture} /> : null
                }
                <Text style={styles.text}>{event.title}</Text>
            </View>
        </View>
    )
}

export default ItemComponent

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
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center'
    }
});