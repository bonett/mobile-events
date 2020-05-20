import * as React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function EventDetailsScreen({ navigation }) {
    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Android Meet</Text>
                <Text style={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                <View style={styles.media}>
                    <Image source={{ uri: 'https://www.kindpng.com/picc/m/73-737324_abstract-submission-nutrition-congress-circle-meeting-icon-png.png' }} style={styles.itemPicture} />
                </View>
            </ScrollView>
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
        </>
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
